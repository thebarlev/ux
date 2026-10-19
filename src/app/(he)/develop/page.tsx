import type { Metadata } from "next"

import { ServicePageTemplate } from "@/app/_components/services/ServicePageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { developConfig } from "@/app/_components/services/services.config"

export const metadata: Metadata = {
  ...developConfig.metadata,
  alternates: {
    canonical: "/develop",
    languages: heEnAlternateLanguages("/develop", "/en/develop"),
  },
}

export default function DevelopPage() {
  return <ServicePageTemplate config={developConfig} />
}

