import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/contact.he.css"

const TITLE = "צור קשר | Uxellent"
const DESCRIPTION = "שאלה על האתר, על החבילות או על משהו שלא עובד? כתבו לנו ונחזור אליכם בהקדם."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/contact", languages: heEnAlternateLanguages("/contact", "/en/contact") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/contact",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="he" page="contact" />
}
