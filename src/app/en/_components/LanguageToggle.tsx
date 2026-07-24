"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Language toggle for English pages only.
 * English -> current /en path (no change)
 * עברית -> same path without /en prefix
 */
export function LanguageToggle() {
  const pathname = usePathname() ?? "/"
  const hePath = pathname.startsWith("/en") ? pathname.replace(/^\/en/, "") || "/" : pathname

  return (
    <div className="flex items-center gap-3 text-sm" dir="ltr">
      <span className="font-semibold text-black">English</span>
      <span className="text-black/40" aria-hidden="true">
        |
      </span>
      <Link
        href={hePath}
        className="text-black/70 hover:text-black hover:underline transition-colors"
      >
        עברית
      </Link>
    </div>
  )
}
