import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/who.en.css"

const TITLE = "Who it’s for | UXellent · AI website builder"
const DESCRIPTION = "A brand site, a landing page or a portfolio. UXellent’s AI builds the kind of site that fits your business, with its own content and design."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en/for-who", languages: heEnAlternateLanguages("/for-who", "/en/for-who") },
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://uxellent.com/en/for-who", siteName: "UXellent", locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
}

// Who it's for (uxb-028 v1, tbl-028).
export default function Page() {
  return <HomePage lang="en" page="who" />
}
