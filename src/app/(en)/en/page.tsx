import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"

import "@/app/_home/home.en.css"

// 055, 058
const TITLE = "UXellent · AI website, email and automations"
const DESCRIPTION =
  "In minutes, you get a beautifully designed site with a lead form, a mailing list and automations that work from day one."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en", languages: localeAlternates(twinPaths("/")) },
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
