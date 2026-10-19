import type { Metadata } from "next"
import { cookies } from "next/headers"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/auth"
import { LoginForm } from "./LoginForm"
import { AdminShell } from "./AdminShell"

export const metadata: Metadata = {
  title: "Uxellent Admin",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies()
  const authed = verifySessionToken(store.get(SESSION_COOKIE)?.value)

  if (!authed) return <LoginForm />

  return <AdminShell>{children}</AdminShell>
}
