import type { Metadata } from "next"

import { ServicePageTemplate } from "@/app/_components/services/ServicePageTemplate"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"
import { developConfig } from "@/app/_components/services/services.config"

export const metadata: Metadata = {
  ...developConfig.metadata,
  alternates: {
    canonical: "/develop",
    languages: localeAlternates(twinPaths("/develop")),
  },
}

export default function DevelopPage() {
  return <ServicePageTemplate config={developConfig} />
}

