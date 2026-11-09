import type { Metadata } from "next"

import { ServicePageTemplate } from "@/app/_components/services/ServicePageTemplate"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"
import { marketingPpcConfig } from "@/app/_components/services/services.config"

export const metadata: Metadata = {
  ...marketingPpcConfig.metadata,
  alternates: {
    canonical: "/marketing/ppc",
    languages: localeAlternates(twinPaths("/marketing/ppc")),
  },
}

export default function MarketingPpcPage() {
  return <ServicePageTemplate config={marketingPpcConfig} />
}

