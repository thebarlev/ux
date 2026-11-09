import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"

import "@/app/_home/contact.en.css"

const TITLE = "Contact | Uxellent"
const DESCRIPTION = "A question about your site, our plans, or something that isn’t working? Write to us and we’ll get back to you soon."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en/contact", languages: localeAlternates(twinPaths("/contact")) },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com/en/contact",
    siteName: "Uxellent",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="en" page="contact" />
}
