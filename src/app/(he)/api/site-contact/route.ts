import "server-only"
import nodemailer from "nodemailer"
import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

/**
 * Contact page form (/contact, /en/contact, tbl-022).
 * Sent through Resend (tbl-028), from the sending domain that is verified
 * there (mail.uxellent.site); SMTP stays as the fallback. The address and keys
 * live here, on the server, never in the browser. The sender goes in Reply-To.
 * Spam: a honeypot field and a small per-IP rate limit; no captcha.
 */

export const runtime = "nodejs"

const TO = "support@uxellent.com"
// uxellent.com is not a verified Resend domain; mail.uxellent.site is
const FROM = process.env.SITE_CONTACT_FROM?.trim() || "UXellent Website <site@mail.uxellent.site>"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const TOPICS = [
  "שאלה כללית", "חבילות ותשלום", "עזרה עם האתר שלי", "משהו לא עובד",
  "General question", "Plans and billing", "Help with my site", "Something isn’t working",
] as const

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().max(200).regex(EMAIL_RE),
  topic: z.string().trim().max(80).optional(),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional(), // honeypot
  lang: z.enum(["he", "en"]).optional(),
})

// Per-IP limit: 5 messages per 10 minutes. Kept in memory, so it counts per
// server instance; enough to stop a script hammering the form.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  return false
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

async function sendViaSmtp(params: { replyTo: string; subject: string; text: string }): Promise<boolean> {
  const host = process.env.SMTP_HOST?.trim()
  const port = Number(process.env.SMTP_PORT?.trim())
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim()
  if (!host || !Number.isFinite(port) || !user || !pass || !from) {
    console.warn("[site-contact] smtp fallback skipped: SMTP env incomplete")
    return false
  }
  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
  await transporter.sendMail({ from: `Uxellent Website <${from}>`, to: TO, replyTo: params.replyTo, subject: params.subject, text: params.text })
  return true
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown"
  try {
    const parsed = schema.safeParse(await req.json().catch(() => null))
    if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
    const { name, email, message, website, lang = "he" } = parsed.data
    const topic = TOPICS.includes(parsed.data.topic as (typeof TOPICS)[number]) ? parsed.data.topic! : ""

    // a bot filled in the field people never see: say thanks, send nothing
    if (website) return NextResponse.json({ ok: true })
    if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })

    const page = lang === "en" ? "/en/contact" : "/contact"
    const subject = `צור קשר${topic ? ` · ${topic}` : ""} · ${name}`
    const rows: Array<[string, string]> = [
      ["שם", name],
      ["מייל", email],
      ["נושא", topic || "-"],
      ["עמוד", page],
    ]
    const text = [
      "פנייה חדשה מעמוד צור קשר",
      "",
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      "הודעה:",
      message,
      "",
      "---",
      `זמן: ${new Date().toISOString()}`,
      `IP: ${ip}`,
    ].join("\n")

    const resendKey = process.env.RESEND_API_KEY?.trim()
    if (resendKey) {
      const { error } = await new Resend(resendKey).emails.send({
        from: FROM,
        to: [TO],
        replyTo: `${name.replace(/[<>"]/g, "")} <${email}>`,
        subject,
        text,
        html: `
            <div dir="rtl" style="font-family:Arial;line-height:1.6">
              <h2>פנייה חדשה מעמוד צור קשר</h2>
              ${rows.map(([k, v]) => `<p><b>${k}:</b> ${escapeHtml(v)}</p>`).join("")}
              <p><b>הודעה:</b></p>
              <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
            </div>`,
      })
      if (!error) return NextResponse.json({ ok: true })
      console.error("[site-contact] resend failed:", error.message)
    } else {
      console.error("[site-contact] RESEND_API_KEY missing, trying smtp fallback")
    }

    const sent = await sendViaSmtp({ replyTo: email, subject, text })
    return sent ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
  } catch (err) {
    console.error("[site-contact] error:", err)
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
