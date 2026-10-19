import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/pricing.he.css"

const TITLE = "מחירים | Uxellent · אתר לעסק ב-AI, מתחילים בחינם"
const DESCRIPTION =
  "AI שמעצב וכותב כמו מומחה, ועורך שמשנה כל דבר בקליק. מתחילים בחינם, בלי דמי הקמה ובלי התחייבות. המחירים כוללים מע״מ."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/pricing", languages: heEnAlternateLanguages("/pricing", "/en/pricing") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/pricing",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="he" page="pricing" />
}
