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

  function cancelRow() {
    setOpenPath(null)
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

  if (status === "session_expired") {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-sm text-[#151515]">החיבור פג תוקף.</p>
          <button
            onClick={() => router.refresh()}
            className="mt-3 rounded-lg bg-[#157AB8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0C5580]"
          >
            רענון
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#151515]">עריכת טקסטים</h1>
        <p className="mt-1 text-sm text-[#747474]">חיפוש ועריכה של תוכן האתר בעברית ובאנגלית</p>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חיפוש לפי מפתח או טקסט (עברית/אנגלית)…"
        className="mb-4 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-[#157AB8]"
      />

      {rows === null ? (
        <p className="text-sm text-[#747474]">טוען…</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((row) => (
            <div key={row.path} className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
              <button
                onClick={() => (openPath === row.path ? setOpenPath(null) : openRow(row))}
                className="w-full px-4 py-3 text-start transition-colors hover:bg-[#f5f9fa]"
              >
                <div className="font-mono text-[11px] text-[#9a9a9a]" dir="ltr">
                  {row.path}
                </div>
                <div className="mt-1 flex gap-4 text-sm">
                  <span dir="rtl" className="flex-1 text-[#222]">{row.he}</span>
                  <span dir="ltr" className="flex-1 text-[#666]">{row.en}</span>
                </div>
              </button>

              {openPath === row.path ? (
                <div className="flex flex-col gap-3 border-t border-black/5 p-4 sm:flex-row">
                  <div className="flex-1">
                    <label className="text-xs text-[#747474]">עברית</label>
                    <textarea
                      dir="rtl"
                      value={heDraft}
                      onChange={(e) => setHeDraft(e.target.value)}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-black/10 p-2 text-sm outline-none focus:border-[#157AB8]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-[#747474]">אנגלית</label>
                    <textarea
                      dir="ltr"
                      value={enDraft}
                      onChange={(e) => setEnDraft(e.target.value)}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-black/10 p-2 text-sm outline-none focus:border-[#157AB8]"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <button
                      onClick={cancelRow}
                      disabled={saving}
                      className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-[#333] transition-colors hover:bg-[#f5f9fa] disabled:opacity-60"
                    >
                      ביטול
                    </button>
                    <button
                      onClick={() => save(row.path, row)}
                      disabled={saving}
                      className="rounded-lg bg-[#157AB8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0C5580] disabled:opacity-60"
                    >
                      {saving ? "שומר…" : "שמירה"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {status === "saved" ? (
        <p className="fixed bottom-6 start-6 rounded-lg bg-[#0f7a4a] px-4 py-2 text-sm text-white shadow-lg">
          נשמר — יופיע באתר תוך כמה שניות.
        </p>
      ) : null}
      {status === "save_failed" ? (
        <p className="fixed bottom-6 start-6 rounded-lg bg-[#991b1b] px-4 py-2 text-sm text-white shadow-lg">
          השמירה נכשלה.
        </p>
      ) : null}
    </div>
  )
}
