import type { LucideIcon } from "lucide-react"

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: string
  icon: LucideIcon
  tone?: "default" | "good" | "bad"
}) {
  const iconColor = tone === "good" ? "#0f7a4a" : tone === "bad" ? "#b91c1c" : "#747474"

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-[#747474]">
        <Icon size={16} strokeWidth={2} color={iconColor} />
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-2 text-3xl font-bold text-[#151515]">{value}</div>
    </div>
  )
}
