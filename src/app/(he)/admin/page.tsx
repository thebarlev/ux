import Link from "next/link"
import { Suspense } from "react"
import { FileEdit, Clock, CheckCircle2, XCircle, PencilLine } from "lucide-react"
import { getDashboardStats } from "@/lib/admin/dashboardStats"
import { PlatformStatsCard } from "./PlatformStatsCard"
import { StatCard } from "./StatCard"

const SYSTEM_STATUS_LABEL: Record<string, string> = {
  ok: "מחובר",
  not_configured: "לא מוגדר",
  error: "שגיאת חיבור",
}

function formatLastUpdated(iso: string | null): string {
  if (!iso) return "אין עדיין"
  return new Intl.DateTimeFormat("he-IL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso))
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#151515]">דשבורד</h1>
          <p className="mt-1 text-sm text-[#747474]">סקירה כללית של תוכן האתר</p>
        </div>
        <Link
          href="/admin/editor"
          className="flex items-center gap-2 rounded-xl bg-[#157AB8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0C5580]"
        >
          <PencilLine size={18} strokeWidth={2} />
          עריכת טקסטים
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="טקסטים שנערכו" value={String(stats.editedCount)} icon={FileEdit} />
        <StatCard label="עריכה אחרונה" value={formatLastUpdated(stats.lastUpdatedAt)} icon={Clock} />
        <StatCard
          label="מצב המערכת"
          value={SYSTEM_STATUS_LABEL[stats.systemStatus]}
          icon={stats.systemStatus === "ok" ? CheckCircle2 : XCircle}
          tone={stats.systemStatus === "ok" ? "good" : "bad"}
        />
        <Suspense
          fallback={
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="text-sm text-[#747474]">אתרים פעילים</div>
              <div className="mt-2 text-sm text-[#747474]">טוען…</div>
            </div>
          }
        >
          <PlatformStatsCard />
        </Suspense>
      </div>
    </div>
  )
}
