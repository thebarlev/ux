import type { Metadata } from "next"

import { EnServicePageTemplate } from "../../_components/EnServicePageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { marketingPpcConfigEn } from "../../_config/marketingPpcConfigEn"

export const metadata: Metadata = {
  ...marketingPpcConfigEn.metadata,
  alternates: {
    canonical: "/en/marketing/ppc",
    languages: heEnAlternateLanguages("/marketing/ppc", "/en/marketing/ppc"),
  },
}

export default function MarketingPpcPageEn() {
  return <EnServicePageTemplate config={marketingPpcConfigEn} dir="ltr" />
}
