import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/home.he.css"

const TITLE = "Uxellent | בניית אתר לעסק ב-AI, בעברית"
const DESCRIPTION =
  "אתר מעוצב לעסק שלכם, נבנה ב-AI תוך דקות. כתבו מה העסק עושה, ותראו אותו נבנה מול העיניים. בחינם, בלי ידע טכני."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/", languages: heEnAlternateLanguages("/", "/en") },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://uxellent.com",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <HomePage lang="he" />
}
