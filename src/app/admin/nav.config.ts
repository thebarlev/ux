import type { LucideIcon } from "lucide-react"
import { LayoutDashboard, PencilLine } from "lucide-react"

export type AdminNavItem = {
  href: string
  label: string
  icon: LucideIcon
}

/** Single source of truth for the admin sidebar. A future admin page is one
 *  entry here plus its route folder under src/app/admin/ — the shell itself
 *  never needs to change. */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { href: "/admin", label: "דשבורד", icon: LayoutDashboard },
  { href: "/admin/editor", label: "עריכת טקסטים", icon: PencilLine },
]
