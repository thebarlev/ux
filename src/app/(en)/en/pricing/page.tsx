import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/pricing.en.css"

const TITLE = "Pricing | Uxellent · AI website builder, start free"
const DESCRIPTION =
  "AI that designs and writes like an expert, and an editor that changes anything in a click. Start free, with no setup fees and no commitment."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en/pricing", languages: heEnAlternateLanguages("/pricing", "/en/pricing") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/en/pricing",
    siteName: "Uxellent",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="en" page="pricing" />
}
