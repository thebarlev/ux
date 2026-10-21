import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/blog.en.css"

const TITLE = "Blog | Uxellent"
const DESCRIPTION = "Short articles on websites, search and AI, for businesses, companies and professionals."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en/blog", languages: heEnAlternateLanguages("/blog", "/en/blog") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://uxellent.com/en/blog", siteName: "Uxellent", locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
}

// Blog index (uxb-019, tbl-024): the featured article, three more, the growth guides.
export default function Page() {
  return <HomePage lang="en" page="blog" />
}
