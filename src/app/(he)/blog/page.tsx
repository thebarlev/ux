import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"

import "@/app/_home/blog.he.css"

const TITLE = "מאמרים | Uxellent"
const DESCRIPTION = "מאמרים קצרים על אתרים, קידום ו-AI, לעסקים, לחברות ולבעלי מקצוע."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/blog", languages: localeAlternates(twinPaths("/blog")) },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://uxellent.com/blog", siteName: "Uxellent", locale: "he_IL", type: "website" },
  robots: { index: true, follow: true },
}

// Blog index (uxb-019, tbl-024): the featured article, three more, the growth guides.
export default function Page() {
  return <HomePage lang="he" page="blog" />
}
