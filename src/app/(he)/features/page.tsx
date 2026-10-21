import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/features.he.css"

const TITLE = "מה מקבלים | Uxellent · אתר לעסק ב-AI, מתחילים בחינם"
const DESCRIPTION =
  "עיצוב, תוכן, עריכה, חשיפה בגוגל ופניות מלקוחות. הכול באתר אחד, בלי ספקים ובלי ידע טכני."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/features", languages: heEnAlternateLanguages("/features", "/en/features") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/features",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="he" page="features" />
}
