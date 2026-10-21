"use client"

import { usePathname } from "next/navigation"
import { SiteChrome } from "@/app/_home/SiteChrome"

/** Every /en page brings its own header and footer (the sheet pages, tbl-028),
 *  except the campaign pages, which keep their own content inside SiteChrome.
 *  Anything else (the 404 included) is passed through as it is. */
const CHROME_EN_PATTERNS = [/^\/en\/lp\//]

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
  if (!CHROME_EN_PATTERNS.some((re) => re.test(pathname))) {
    return <>{children}</>
  }

  // the campaign pages get the site's header and footer
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
