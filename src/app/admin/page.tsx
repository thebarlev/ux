import { cookies } from "next/headers"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/auth"
import { LoginForm } from "./LoginForm"
import { AdminEditor } from "./AdminEditor"

export default async function AdminPage() {
  const store = await cookies()
  const authed = verifySessionToken(store.get(SESSION_COOKIE)?.value)

  return authed ? <AdminEditor /> : <LoginForm />
}
