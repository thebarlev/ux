import "server-only"
import type { NextRequest } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/auth"

export function hasValidSession(req: NextRequest): boolean {
  return verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)
}
