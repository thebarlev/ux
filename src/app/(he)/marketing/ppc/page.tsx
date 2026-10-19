import type { Metadata } from "next"

import { ServicePageTemplate } from "@/app/_components/services/ServicePageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { marketingPpcConfig } from "@/app/_components/services/services.config"

export const metadata: Metadata = {
  ...marketingPpcConfig.metadata,
  alternates: {
    canonical: "/marketing/ppc",
    languages: heEnAlternateLanguages("/marketing/ppc", "/en/marketing/ppc"),
  },
}

export default function MarketingPpcPage() {
  return <ServicePageTemplate config={marketingPpcConfig} />
}

