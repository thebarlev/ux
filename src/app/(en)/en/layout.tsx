"use client"

import { usePathname } from "next/navigation"
import { SiteChrome } from "@/app/_home/SiteChrome"

/** The 2026-08 redesign pages under /en own their full page chrome
 *  (RedesignShell → RedesignHeader/RedesignFooter, locale="en") — same
 *  pattern as HEADERLESS_PATTERNS for the Hebrew SiteHeader. Without this,
 *  the old HeaderEN/FooterEN wrap them a second time. */
const REDESIGN_EN_PATTERNS = [
  /^\/en$/,
  /^\/en\/pricing(\/|$)/,
  /^\/en\/contact(\/|$)/,
  /^\/en\/faq(\/|$)/,
  /^\/en\/(privacy|terms|accessibility|account-deletion)(\/|$)/,
  /^\/en\/why-us(\/|$)/,
  /^\/en\/blog(\/|$)/,
  /^\/en\/growth-guides(\/|$)/,
]

/** Breadcrumb names for the English pages that keep their own content (tbl-024). */
const CRUMBS: Record<string, string> = {
  "/en/lp/seo-services": "SEO services",
  "/en/lp/digital-marketing": "Digital marketing",
}

export default function EnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() ?? ""
  if (REDESIGN_EN_PATTERNS.some((re) => re.test(pathname))) {
    return <>{children}</>
  }

  // everything else (the campaign pages, 404) gets the site's header and footer
  const crumb = CRUMBS[pathname]
  return (
    <SiteChrome lang="en" current={crumb ? pathname : undefined} crumbs={crumb ? [{ label: crumb }] : undefined}>
    <div
      dir="ltr"
      className="min-h-screen flex flex-col bg-[#F4F1EC] text-left"
    >

      <main
        id="main"
        role="main"
        className="flex-1"
      >
        {children}
      </main>

    </div>
    </SiteChrome>
  )
}
