import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/faq.en.css"

const TITLE = "FAQ | Uxellent"
const DESCRIPTION = "Short answers about building, editing, publishing and pricing."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en/faq", languages: heEnAlternateLanguages("/faq", "/en/faq") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/en/faq",
    siteName: "Uxellent",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

// FAQ page (tbl-023), with its FAQPage structured data from the same questions.
export default function Page() {
  return <HomePage lang="en" page="faq" />
}
