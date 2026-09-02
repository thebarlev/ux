"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.status === 429) {
        setError("יותר מדי ניסיונות — נסה שוב בעוד כמה דקות.")
        return
      }
      if (!res.ok) {
        setError("סיסמה שגויה.")
        return
      }
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={submit} style={{ background: "#fff", padding: 32, borderRadius: 16, width: 320, boxShadow: "0 2px 16px rgba(0,0,0,.08)" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Uxellent Admin</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, fontSize: 14 }}
        />
        {error ? <p style={{ color: "#b91c1c", fontSize: 13, marginBottom: 12 }}>{error}</p> : null}
        <button
          type="submit"
          disabled={busy || password.length === 0}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "#111827", color: "#fff", fontSize: 14, cursor: "pointer" }}
        >
          {busy ? "..." : "Sign in"}
        </button>
      </form>
    </div>
  )
}
