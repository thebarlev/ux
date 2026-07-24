import "server-only"
import { BrevoClient } from "@getbrevo/brevo"
import nodemailer from "nodemailer"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

import { verifyCaptcha } from "@/lib/captcha/verify"
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { z } from "zod"

export const runtime = "nodejs"

const sourceEnum = z.enum([
  "design_development",
  "digital_marketing",
  "smart_accounting_ai",
])

const baseLeadSchema = z.object({
  lead_id: z.string().min(1).optional(),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(9, "מספר טלפון לא תקין"),
  source: sourceEnum,
  pagePath: z.string().optional(),
  userAgent: z.string().optional(),
  captchaToken: z.string().min(1, "CAPTCHA token required"),
  message: z.string().max(1500).optional(),
})

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/** Same SMTP env as /api/contact; used when Brevo fails (e.g. authorised IPs on Vercel). */
async function sendLeadNotifyViaSmtp(params: {
  to: string
  replyTo: string
  subject: string
  text: string
}): Promise<void> {
  const host = process.env.SMTP_HOST?.trim()
  const portRaw = process.env.SMTP_PORT?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim()
  if (!host || !portRaw || !user || !pass || !from) {
    console.warn("[leads] smtp fallback skipped: need SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM_EMAIL")
    return
  }
  const port = Number(portRaw)
  if (!Number.isFinite(port)) {
    console.warn("[leads] smtp fallback skipped: invalid SMTP_PORT")
    return
  }
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
  await transporter.sendMail({
    from: `VOW Leads <${from}>`,
    to: params.to,
    replyTo: params.replyTo,
    subject: params.subject,
    text: params.text,
  })
}

const leadSchemaV1 = baseLeadSchema.extend({
  firstName: z.string().min(1, "שם פרטי חובה"),
  lastName: z.string().min(1, "שם משפחה חובה"),
})

const leadSchemaV2 = baseLeadSchema.extend({
  fullName: z.string().trim().min(2, "שם מלא חובה"),
})

const leadSchema = z.union([leadSchemaV2, leadSchemaV1])

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const normalized = fullName.trim().replace(/\s+/g, " ")
  const parts = normalized.split(" ").filter(Boolean)
  const firstName = parts.shift() ?? normalized
  const lastName = parts.join(" ")
  return { firstName, lastName }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "נתונים לא תקינים", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, phone, source, pagePath, userAgent, captchaToken, lead_id, message: rawMessage } = parsed.data
    const message = rawMessage?.trim() ? rawMessage.trim() : undefined

    const { firstName, lastName } =
      "fullName" in parsed.data
        ? splitFullName(parsed.data.fullName)
        : { firstName: parsed.data.firstName, lastName: parsed.data.lastName }

    const leadId = lead_id ?? randomUUID()

    if (process.env.NODE_ENV !== "production" && captchaToken === "BYPASS") {
      // dev bypass
    } else {
      const captchaResult = await verifyCaptcha(captchaToken)
      if (!captchaResult.success) {
        return NextResponse.json(
          { error: "אימות נכשל. אנא נסה שוב." },
          { status: 403 }
        )
      }
    }

    const supabase = getSupabaseAdmin()

    const rowBase = {
      client_lead_id: leadId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      source,
      page_path: pagePath,
      user_agent: userAgent,
    } as const

    let insertResult = await supabase.from("leads").insert({
      ...rowBase,
      message: message ?? null,
    } as never)

    if (insertResult.error) {
      const em = (insertResult.error.message ?? "").toLowerCase()
      const looksLikeMissingMessageColumn =
        em.includes("message") ||
        em.includes("column") ||
        em.includes("schema cache") ||
        insertResult.error.code === "PGRST204"

      if (looksLikeMissingMessageColumn) {
        console.warn(
          "[leads] insert with message failed; retrying without message (run supabase-migrations/add_leads_message_column.sql):",
          insertResult.error.code,
          insertResult.error.message,
        )
        insertResult = await supabase.from("leads").insert(rowBase as never)
      }
    }

    if (insertResult.error) {
      console.error("[leads] supabase insert failed:", insertResult.error.code, insertResult.error.message)
      return NextResponse.json(
        { error: "שגיאה בשמירת הנתונים" },
        { status: 500 }
      )
    }

    // --- Brevo email (best-effort: lead is already saved) ---
    // If you see 401 "unrecognised IP address": Brevo → Security → Authorised IPs - disable the
    // IP allowlist for serverless (Vercel IPs change), or use a dedicated API key without IP restriction.
    const notifyTo = process.env.LEADS_NOTIFY_EMAIL
    const brevoKey = process.env.BREVO_API_KEY

    if (!notifyTo?.trim() || !brevoKey?.trim()) {
      console.error(
        "[leads] skip email: set LEADS_NOTIFY_EMAIL and BREVO_API_KEY (lead saved, lead_id=",
        leadId,
        ")",
      )
    } else {
      const brevo = new BrevoClient({ apiKey: brevoKey })
      try {
        const displayName = lastName ? `${firstName} ${lastName}` : firstName
        const safeName = escapeHtml(displayName)
        const safeEmailH = escapeHtml(email)
        const safePhone = escapeHtml(phone)
        const safePage = escapeHtml(pagePath ?? "")
        const safeMessage =
          message != null && message.length > 0
            ? `<p><b>הודעה:</b></p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
            : ""
        console.log("[leads] ENV CHECK:", {
          hasApiKey: !!process.env.BREVO_API_KEY,
          hasEmail: !!process.env.LEADS_NOTIFY_EMAIL,
          email: process.env.LEADS_NOTIFY_EMAIL,
          keyStart: process.env.BREVO_API_KEY?.slice(0, 6),
        })
        const res = await brevo.transactionalEmails.sendTransacEmail({
          sender: { name: "VOW Leads", email: "support@uxellent.com" },
          to: [{ email: notifyTo.trim(), name: "VOW Admin" }],
          subject: `ליד חדש ב-VOW • ${source}`,
          htmlContent: `
          <div dir="rtl" style="font-family: Arial; line-height:1.6">
            <h2>ליד חדש התקבל</h2>
            <p><b>שם:</b> ${safeName}</p>
            <p><b>אימייל:</b> ${safeEmailH}</p>
            <p><b>טלפון:</b> ${safePhone}</p>
            <p><b>מקור:</b> ${source}</p>
            <p><b>עמוד:</b> ${safePage}</p>
            ${safeMessage}
          </div>
        `,
        })

        console.log("[leads] brevo sendTransacEmail ok, lead_id:", leadId, "response:", res)
      } catch (e: unknown) {
        const brevoBody =
          e && typeof e === "object" && "body" in e
            ? (e as { body?: { message?: string; code?: string } }).body
            : undefined
        console.error(
          "[leads] brevo sendTransacEmail failed (lead still saved, lead_id=",
          leadId,
          "):",
          brevoBody?.message ?? e,
        )
        const displayName = lastName ? `${firstName} ${lastName}` : firstName
        const textBody = [
          "ליד חדש התקבל (גיבוי SMTP לאחר כשל Brevo)",
          "",
          `שם: ${displayName}`,
          `אימייל: ${email}`,
          `טלפון: ${phone}`,
          `מקור: ${source}`,
          `עמוד: ${pagePath ?? ""}`,
          ...(message ? ["", "הודעה:", message] : []),
        ].join("\n")
        try {
          await sendLeadNotifyViaSmtp({
            to: notifyTo.trim(),
            replyTo: email,
            subject: `ליד חדש ב-VOW • ${source}`,
            text: textBody,
          })
          console.log("[leads] smtp notify ok after brevo failure, lead_id:", leadId)
        } catch (smtpErr) {
          console.error("[leads] smtp notify failed after brevo failure, lead_id:", leadId, smtpErr)
        }
      }
    }

    return NextResponse.json({ ok: true, lead_id: leadId })
  } catch (err) {
    console.error("API /leads error:", err)
    return NextResponse.json(
      { error: "שגיאה כללית" },
      { status: 500 }
    )
  }
}