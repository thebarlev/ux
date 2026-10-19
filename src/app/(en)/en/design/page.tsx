import type { Metadata } from "next"

import { EnServicePageTemplate } from "../_components/EnServicePageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { designConfigEn } from "../_config/designConfigEn"

export const metadata: Metadata = {
  ...designConfigEn.metadata,
  alternates: {
    canonical: "/en/design",
    languages: heEnAlternateLanguages("/design", "/en/design"),
  },
}

export default function DesignPageEn() {
  return <EnServicePageTemplate config={designConfigEn} dir="ltr" />
}
