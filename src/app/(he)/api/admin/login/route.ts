import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE, SESSION_MAX_AGE, clearAttempts, createSessionToken, isLockedOut, recordFailedAttempt, verifyPassword } from "@/lib/admin/auth"

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown"
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  if (isLockedOut(ip)) {
    return NextResponse.json({ error: "too_many_attempts" }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""

  if (!verifyPassword(password)) {
    recordFailedAttempt(ip)
    return NextResponse.json({ error: "invalid_password" }, { status: 401 })
  }

  clearAttempts(ip)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
