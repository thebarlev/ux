import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"

import "@/app/_home/home.he.css"

// 055
const TITLE = "UXellent · אתר, דיוור ואוטומציות ב-AI"
const DESCRIPTION =
  "תוך דקות נבנה לכם אתר מעוצב לעסק, עם טופס לידים, רשימת תפוצה ואוטומציות שעובדות מהיום הראשון. בלי קוד ובלי לחבר מערכות."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/", languages: localeAlternates(twinPaths("/")) },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="he" />
}
