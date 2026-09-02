import "server-only"
import crypto from "node:crypto"

export const SESSION_COOKIE = "admin_session"
const SESSION_TTL_SECONDS = 60 * 60 * 8 // 8h

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

/** Per-instance only — resets on cold start. That's an accepted trade-off
 *  for a single-admin internal tool: the real security boundary is the
 *  timing-safe password compare + signed session, not this counter. A
 *  redeploy or a scaled-out instance gives an attacker a fresh bucket, but
 *  doesn't bypass the password itself. */
const attempts = new Map<string, { count: number; lockedUntil?: number }>()

export function isLockedOut(ip: string): boolean {
  const entry = attempts.get(ip)
  if (!entry?.lockedUntil) return false
  if (Date.now() > entry.lockedUntil) {
    attempts.delete(ip)
    return false
  }
  return true
}

export function recordFailedAttempt(ip: string): void {
  const entry = attempts.get(ip) ?? { count: 0 }
  entry.count += 1
  if (entry.count >= MAX_ATTEMPTS) entry.lockedUntil = Date.now() + LOCKOUT_MS
  attempts.set(ip, entry)
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip)
}

/** Constant-time compare so a wrong-length or wrong-content guess takes the
 *  same time to reject. Hashing first fixes both sides at 32 bytes, so
 *  timingSafeEqual never short-circuits on the attacker-controlled input's
 *  own length. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const a = crypto.createHash("sha256").update(input).digest()
  const b = crypto.createHash("sha256").update(expected).digest()
  return crypto.timingSafeEqual(a, b)
}

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured")
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url")
}

/** Stateless signed session token: base64url(exp) + "." + hmac. No server-
 *  side session store, so it survives cold starts / multiple instances —
 *  the cookie itself (httpOnly, Secure, SameSite=Lax) is the only place the
 *  session lives, never sent as a password-bearing request. */
export function createSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_SECONDS * 1000
  const payload = String(exp)
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return false
  let expected: string
  try {
    expected = sign(payload)
  } catch {
    return false
  }
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false
  const exp = Number(payload)
  return Number.isFinite(exp) && Date.now() < exp
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS
