"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Language bar: עברית / אנגלית
 * Renders on all pages. Not in header - dedicated row.
 * Hebrew -> / path, English -> /en path
 */
export function LanguageBar() {
  const pathname = usePathname() ?? "/"

  // /new-home is a single-language review page with its own dark header, and the
  // cream language row above it breaks that header. This bar comes from the root
  // layout, so the only place it can be suppressed is here. Every other route is
  // unaffected.
  if (pathname === "/new-home") return null

  const isEn = pathname.startsWith("/en")
  const hePath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname
  const enPath = isEn ? pathname : `/en${pathname === "/" ? "" : pathname}`

  return (
    <div
      role="navigation"
      aria-label="בחירת שפה"
      className="flex items-center justify-center gap-2 py-2 text-sm bg-[#F4F1EC] border-b border-black/5"
      dir="ltr"
    >
      {isEn ? (
        <>
          <Link
            href={hePath}
            className="text-black/70 hover:text-black hover:underline transition-colors"
          >
            עברית
          </Link>
          <span className="text-black/40" aria-hidden="true">
            /
          </span>
          <span className="font-semibold text-black">English</span>
        </>
      ) : (
        <>
          <span className="font-semibold text-black">עברית</span>
          <span className="text-black/40" aria-hidden="true">
            /
          </span>
          <Link
            href={enPath}
            className="text-black/70 hover:text-black hover:underline transition-colors"
          >
            English
          </Link>
        </>
      )}
    </div>
  )
}
