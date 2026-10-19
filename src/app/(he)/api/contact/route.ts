import "server-only"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

function reqEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

function formatUnknownError(e: unknown) {
  if (e instanceof Error) return e.message
  try {
    return JSON.stringify(e)
  } catch {
    return String(e)
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)

    const fullName = String(body?.fullName || "").trim()
    const phone = String(body?.phone || "").trim()
    const email = String(body?.email || "").trim()
    const subject = String(body?.subject || "").trim()
    const category = String(body?.category || "").trim()
    const message = String(body?.message || "").trim()

    if (!fullName || !phone || !email || !subject || !category || !message) {
      return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })
    }

    const host = reqEnv("SMTP_HOST")
    const port = Number(reqEnv("SMTP_PORT"))
    const user = reqEnv("SMTP_USER")
    const pass = reqEnv("SMTP_PASS")
    const from = reqEnv("CONTACT_FROM_EMAIL")
    const to = reqEnv("CONTACT_TO_EMAIL")

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    const now = new Date().toISOString()
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      ""
    const ua = req.headers.get("user-agent") || ""

    const text = [
      `נשלחה פנייה מאתר vow-marketing`,
      ``,
      `שם מלא: ${fullName}`,
      `נייד: ${phone}`,
      `אימייל: ${email}`,
      `נושא: ${subject}`,
      `קטגוריה: ${category}`,
      ``,
      `תוכן:`,
      message,
      ``,
      `---`,
      `זמן: ${now}`,
      `IP: ${ip}`,
      `UA: ${ua}`,
    ].join("\n")

    await transporter.sendMail({
      from: `VOW <${from}>`,
      to,
      replyTo: email,
      subject: `צור קשר: ${subject}`,
      text,
    })

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (e: unknown) {
    console.error("[api/contact] server_error:", formatUnknownError(e))
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
