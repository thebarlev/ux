import type { Metadata } from "next"

import { EnServicePageTemplate } from "../_components/EnServicePageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { developConfigEn } from "../_config/developConfigEn"

export const metadata: Metadata = {
  ...developConfigEn.metadata,
  alternates: {
    canonical: "/en/develop",
    languages: heEnAlternateLanguages("/develop", "/en/develop"),
  },
}

export default function DevelopPageEn() {
  return <EnServicePageTemplate config={developConfigEn} dir="ltr" />
}
