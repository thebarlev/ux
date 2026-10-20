import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/faq.he.css"

const TITLE = "שאלות נפוצות | Uxellent"
const DESCRIPTION = "תשובות קצרות על בנייה, עריכה, פרסום ומחירים."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/faq", languages: heEnAlternateLanguages("/faq", "/en/faq") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/faq",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

// FAQ page (tbl-023), with its FAQPage structured data from the same questions.
export default function Page() {
  return <HomePage lang="he" page="faq" />
}
