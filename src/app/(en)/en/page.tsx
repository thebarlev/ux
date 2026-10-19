import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/home.en.css"

const TITLE = "Uxellent | AI website builder for service businesses"
const DESCRIPTION =
  "A beautifully designed website for your business, built by AI in minutes. Tell us what you do and watch it come together. Free, no technical skills needed."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en", languages: heEnAlternateLanguages("/", "/en") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/en",
    siteName: "Uxellent",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="en" />
}
