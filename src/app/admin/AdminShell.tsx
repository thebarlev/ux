"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { ADMIN_NAV_ITEMS } from "./nav.config"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/admin"
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function logout() {
    setLoggingOut(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.refresh()
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#f5f9fa] text-[#151515]">
      <aside className="flex w-64 shrink-0 flex-col border-l border-black/10 bg-white">
        <div className="px-5 py-6">
          <div className="text-lg font-bold">Uxellent</div>
          <div className="text-sm text-[#747474]">ניהול תוכן</div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {ADMIN_NAV_ITEMS.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-[#157AB8] text-white" : "text-[#333] hover:bg-[#f0f4f6]"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-black/10 p-3">
          <button
            onClick={logout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#991b1b] transition-colors hover:bg-[#fdecec] disabled:opacity-60"
          >
            <LogOut size={18} strokeWidth={2} />
            {loggingOut ? "מתנתק…" : "התנתקות"}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
    </div>
  )
}
