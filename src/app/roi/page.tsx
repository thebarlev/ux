import type { Metadata } from "next"

import { ServicePageTemplate } from "@/app/_components/services/ServicePageTemplate"
import { roiConfig } from "@/app/_components/services/services.config"

export const metadata: Metadata = {
  ...roiConfig.metadata,
  alternates: { canonical: "/roi" },
}

export default function RoiPage() {
  return <ServicePageTemplate config={roiConfig} />
}

