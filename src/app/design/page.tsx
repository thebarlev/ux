import type { Metadata } from "next"

import { ServicePageTemplate } from "@/app/_components/services/ServicePageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { designConfig } from "@/app/_components/services/services.config"

export const metadata: Metadata = {
  ...designConfig.metadata,
  alternates: {
    canonical: "/design",
    languages: heEnAlternateLanguages("/design", "/en/design"),
  },
}

export default function DesignPage() {
  return <ServicePageTemplate config={designConfig} />
}

