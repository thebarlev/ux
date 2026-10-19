import "server-only"
import { BrevoClient } from "@getbrevo/brevo"
import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

/**
 * Contact endpoint for the alternative home page (/new-home).
 * Deliberately separate from /api/leads so the live lead flow keeps its own
 * schema, Supabase write and single LEADS_NOTIFY_EMAIL recipient.
 *
 * Reuses the existing mail infrastructure: Brevo first, SMTP as fallback.
 * No new provider is introduced.
 */

export const runtime = "nodejs"

const RECIPIENTS = ["itzik@uxellent.com", "support@uxellent.com"] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\-\s]{9,}$/

const schema = z.object({
  fullName: z.string().trim().min(2),
  contact: z
    .string()
    .trim()
    .min(1)
    .refine((v) => EMAIL_RE.test(v) || PHONE_RE.test(v)),
  message: z.string().trim().min(1).max(1500),
  pagePath: z.string().max(500).optional(),
})

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/**
 * Same SMTP env as /api/contact and /api/leads; used only when Brevo fails.
 * Returns false when SMTP is not configured, so the caller can report the
 * failure honestly instead of claiming the message was delivered.
 */
async function sendViaSmtp(params: {
  to: readonly string[]
  replyTo?: string
  subject: string
  text: string
}): Promise<boolean> {
  const host = process.env.SMTP_HOST?.trim()
  const portRaw = process.env.SMTP_PORT?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim()
  if (!host || !portRaw || !user || !pass || !from) {
    console.warn(
      "[new-home-contact] smtp fallback skipped: need SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM_EMAIL",
    )
    return false
  }
  const port = Number(portRaw)
  if (!Number.isFinite(port)) {
    console.warn("[new-home-contact] smtp fallback skipped: invalid SMTP_PORT")
    return false
  }
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
  await transporter.sendMail({
    from: `Uxellent <${from}>`,
    to: [...params.to],
    replyTo: params.replyTo,
    subject: params.subject,
    text: params.text,
  })
  return true
}

const SEND_FAILED = "לא הצלחנו לשלוח את הפנייה כרגע. אפשר לכתוב לנו ישירות לכתובת itzik@uxellent.com."

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "נתונים לא תקינים" }, { status: 400 })
    }

    const { fullName, contact, message, pagePath } = parsed.data
    const replyTo = EMAIL_RE.test(contact) ? contact : undefined
    const subject = `פנייה חדשה מעמוד הבית • ${fullName}`

    const textBody = [
      "פנייה חדשה מטופס צור קשר",
      "",
      `שם: ${fullName}`,
      `טלפון או מייל: ${contact}`,
      `עמוד: ${pagePath ?? ""}`,
      "",
      "הודעה:",
      message,
    ].join("\n")

    const brevoKey = process.env.BREVO_API_KEY?.trim()

    if (!brevoKey) {
      console.error("[new-home-contact] BREVO_API_KEY missing, trying smtp fallback")
      const sent = await sendViaSmtp({ to: RECIPIENTS, replyTo, subject, text: textBody })
      return sent
        ? NextResponse.json({ ok: true })
        : NextResponse.json({ error: SEND_FAILED }, { status: 500 })
    }

    const brevo = new BrevoClient({ apiKey: brevoKey })

    try {
      await brevo.transactionalEmails.sendTransacEmail({
        sender: { name: "Uxellent Website", email: "support@uxellent.com" },
        to: RECIPIENTS.map((email) => ({ email })),
        replyTo: replyTo ? { email: replyTo } : undefined,
        subject,
        htmlContent: `
          <div dir="rtl" style="font-family: Arial; line-height:1.6">
            <h2>פנייה חדשה מטופס צור קשר</h2>
            <p><b>שם:</b> ${escapeHtml(fullName)}</p>
            <p><b>טלפון או מייל:</b> ${escapeHtml(contact)}</p>
            <p><b>עמוד:</b> ${escapeHtml(pagePath ?? "")}</p>
            <p><b>הודעה:</b></p>
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>
        `,
      })
      return NextResponse.json({ ok: true })
    } catch (brevoErr) {
      const body =
        brevoErr && typeof brevoErr === "object" && "body" in brevoErr
          ? (brevoErr as { body?: { message?: string } }).body
          : undefined
      console.error("[new-home-contact] brevo failed:", body?.message ?? brevoErr)

      const sent = await sendViaSmtp({ to: RECIPIENTS, replyTo, subject, text: textBody })
      return sent
        ? NextResponse.json({ ok: true })
        : NextResponse.json({ error: SEND_FAILED }, { status: 500 })
    }
  } catch (err) {
    console.error("[new-home-contact] error:", err)
    return NextResponse.json(
      { error: "שליחת הפנייה נכשלה. אפשר לנסות שוב עוד רגע." },
      { status: 500 },
    )
  }
}
