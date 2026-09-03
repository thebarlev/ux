"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { flattenStringLeaves } from "@/lib/i18n/dictionaryPath"

type Row = { path: string; he: string; en: string }

export function AdminEditor() {
  const router = useRouter()
  const [rows, setRows] = useState<Row[] | null>(null)
  const [query, setQuery] = useState("")
  const [openPath, setOpenPath] = useState<string | null>(null)
  const [heDraft, setHeDraft] = useState("")
  const [enDraft, setEnDraft] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/dictionary")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { he: unknown; en: unknown }) => {
        const heLeaves = new Map(flattenStringLeaves(data.he).map((l) => [l.path, l.value]))
        const enLeaves = new Map(flattenStringLeaves(data.en).map((l) => [l.path, l.value]))
        const paths = new Set([...heLeaves.keys(), ...enLeaves.keys()])
        setRows(
          [...paths]
            .sort()
            .map((path) => ({ path, he: heLeaves.get(path) ?? "", en: enLeaves.get(path) ?? "" })),
        )
      })
      .catch(() => setStatus("session_expired"))
  }, [])

  const filtered = useMemo(() => {
    if (!rows) return []
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => r.path.toLowerCase().includes(q) || r.he.includes(query) || r.en.toLowerCase().includes(q))
  }, [rows, query])

  function openRow(row: Row) {
    setOpenPath(row.path)
    setHeDraft(row.he)
    setEnDraft(row.en)
    setStatus(null)
  }

  async function save(path: string, original: Row) {
    setSaving(true)
    setStatus(null)
    try {
      const writes: Promise<Response>[] = []
      if (heDraft !== original.he) {
        writes.push(
          fetch("/api/admin/dictionary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale: "he", path, value: heDraft }),
          }),
        )
      }
      if (enDraft !== original.en) {
        writes.push(
          fetch("/api/admin/dictionary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale: "en", path, value: enDraft }),
          }),
        )
      }
      const results = await Promise.all(writes)
      if (results.some((r) => !r.ok)) {
        setStatus("save_failed")
        return
      }
      setRows((prev) => prev?.map((r) => (r.path === path ? { ...r, he: heDraft, en: enDraft } : r)) ?? prev)
      setStatus("saved")
    } finally {
      setSaving(false)
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.refresh()
  }

  if (status === "session_expired") {
    return (
      <div style={{ padding: 32 }}>
        <p>Session expired.</p>
        <button onClick={() => router.refresh()}>Reload</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Uxellent Admin — site copy</h1>
        <button onClick={logout} style={{ fontSize: 13, background: "none", border: "1px solid #ccc", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}>
          Sign out
        </button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search keys or text (he/en)…"
        style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", marginBottom: 16, fontSize: 14 }}
      />

      {rows === null ? (
        <p>Loading…</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((row) => (
            <div key={row.path} style={{ background: "#fff", borderRadius: 10, border: "1px solid #e5e5e5", overflow: "hidden" }}>
              <button
                onClick={() => (openPath === row.path ? setOpenPath(null) : openRow(row))}
                style={{ width: "100%", textAlign: "left", padding: "10px 14px", background: "none", border: "none", cursor: "pointer" }}
              >
                <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>{row.path}</div>
                <div style={{ display: "flex", gap: 16, fontSize: 13, marginTop: 2 }}>
                  <span dir="rtl" style={{ flex: 1, color: "#222" }}>{row.he}</span>
                  <span style={{ flex: 1, color: "#555" }}>{row.en}</span>
                </div>
              </button>

              {openPath === row.path ? (
                <div style={{ padding: "0 14px 14px", display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, color: "#888" }}>Hebrew</label>
                    <textarea
                      dir="rtl"
                      value={heDraft}
                      onChange={(e) => setHeDraft(e.target.value)}
                      rows={2}
                      style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, color: "#888" }}>English</label>
                    <textarea
                      value={enDraft}
                      onChange={(e) => setEnDraft(e.target.value)}
                      rows={2}
                      style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }}
                    />
                  </div>
                  <div style={{ alignSelf: "flex-end" }}>
                    <button
                      onClick={() => save(row.path, row)}
                      disabled={saving}
                      style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#111827", color: "#fff", fontSize: 13, cursor: "pointer" }}
                    >
                      {saving ? "..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {status === "saved" ? <p style={{ position: "fixed", bottom: 20, right: 20, background: "#065f46", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13 }}>Saved — live within a few seconds.</p> : null}
      {status === "save_failed" ? <p style={{ position: "fixed", bottom: 20, right: 20, background: "#991b1b", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13 }}>Save failed.</p> : null}
    </div>
  )
}
