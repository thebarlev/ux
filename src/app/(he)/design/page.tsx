import type { Metadata } from "next"

import { ServicePageTemplate } from "@/app/_components/services/ServicePageTemplate"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"
import { designConfig } from "@/app/_components/services/services.config"

export const metadata: Metadata = {
  ...designConfig.metadata,
  alternates: {
    canonical: "/design",
    languages: localeAlternates(twinPaths("/design")),
  },
}

export default function DesignPage() {
  return <ServicePageTemplate config={designConfig} />
}

