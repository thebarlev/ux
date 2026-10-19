import "server-only"
import { Link2, AlertTriangle, Globe } from "lucide-react"

type PlatformStats =
  | { status: "not_configured" }
  | { status: "error" }
  | { status: "ok"; activeSites: number }

/** Expects PLATFORM_STATS_URL to return JSON shaped { activeSites: number }.
 *  PLATFORM_STATS_TOKEN, if set, is sent as a bearer token. Never throws —
 *  an unset URL, a timeout, a bad status, or an unexpected body all fall
 *  back to a state the card renders gracefully. This repo never reaches into
 *  the platform repo directly; the wiring is entirely this one HTTP call. */
async function getPlatformStats(): Promise<PlatformStats> {
  const url = process.env.PLATFORM_STATS_URL
  if (!url) return { status: "not_configured" }

  const token = process.env.PLATFORM_STATS_TOKEN
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)

  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      signal: controller.signal,
      cache: "no-store",
    })
    if (!res.ok) return { status: "error" }
    const data = await res.json()
    if (typeof data?.activeSites !== "number") return { status: "error" }
    return { status: "ok", activeSites: data.activeSites }
  } catch {
    return { status: "error" }
  } finally {
    clearTimeout(timeout)
  }
}

export async function PlatformStatsCard() {
  const stats = await getPlatformStats()

  if (stats.status === "ok") {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-[#747474]">
          <Globe size={16} strokeWidth={2} />
          <span className="text-sm">אתרים פעילים</span>
        </div>
        <div className="mt-2 text-3xl font-bold text-[#151515]">{stats.activeSites}</div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-dashed border-black/10 bg-white/60 p-5">
      <div className="flex items-center gap-2 text-[#747474]">
        {stats.status === "error" ? <AlertTriangle size={16} strokeWidth={2} /> : <Link2 size={16} strokeWidth={2} />}
        <span className="text-sm">אתרים פעילים</span>
      </div>
      <div className="mt-2 text-sm font-medium text-[#747474]">
        {stats.status === "error" ? "לא ניתן להתחבר לפלטפורמה כרגע" : "ממתין לחיבור לפלטפורמה"}
      </div>
    </div>
  )
}
