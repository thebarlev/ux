"use client"

import { usePathname } from "next/navigation"
import { HeaderEN } from "./_components/HeaderEN"
import { FooterEN } from "./_components/FooterEN"

/** The 2026-08 redesign pages under /en own their full page chrome
 *  (RedesignShell → RedesignHeader/RedesignFooter, locale="en") — same
 *  pattern as HEADERLESS_PATTERNS for the Hebrew SiteHeader. Without this,
 *  the old HeaderEN/FooterEN wrap them a second time. */
const REDESIGN_EN_PATTERNS = [
  /^\/en$/,
  /^\/en\/pricing(\/|$)/,
  /^\/en\/products(\/|$)/,
  /^\/en\/how-it-works(\/|$)/,
  /^\/en\/included(\/|$)/,
  /^\/en\/why-us(\/|$)/,
  /^\/en\/blog(\/|$)/,
]

export default function EnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() ?? ""
  if (REDESIGN_EN_PATTERNS.some((re) => re.test(pathname))) {
    return <>{children}</>
  }

  return (
    <div
      dir="ltr"
      className="min-h-screen flex flex-col bg-[#F4F1EC] text-left"
    >
      <HeaderEN />

      <main
        id="main"
        role="main"
        className="flex-1"
      >
        {children}
      </main>

      <FooterEN />
    </div>
  )
}
