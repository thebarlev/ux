import { LogoRow } from "@/app/_components/home/LogoRow"
import { PackagesSectionEN } from "@/app/en/_components/home/PackagesSectionEN"
import { VisionToExecutionSection } from "@/app/_components/home/VisionToExecutionSection"

import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { ServiceAboutSection } from "@/app/_components/services/ServiceAboutSection"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { ServiceHero } from "@/app/_components/services/ServiceHero"
import type { ServicePageConfig, ServiceSectionType } from "@/app/_components/services/services.config"

function createSectionRenderers(dir: "ltr" | "rtl") {
  const sectionDir = dir
  return {
    SiteHeader: () => null,
    ServiceHero: (config: ServicePageConfig) => <ServiceHero {...config.hero} dir={sectionDir} />,
    LogoRow: () => <LogoRow />,
    VisionToExecutionSection: (config: ServicePageConfig) => (
      <VisionToExecutionSection
        title={config.vision?.title}
        subtitle={config.vision?.subtitle}
        ctaLabel={config.vision?.ctaLabel}
        source={config.vision?.source}
        cards={config.vision?.cards}
        dir={sectionDir}
      />
    ),
    AboutSection: (config: ServicePageConfig) =>
      config.about ? (
        <ServiceAboutSection
          title={config.about.title}
          subtitle={config.about.subtitle}
          ctaLabel={config.about.ctaLabel}
          ctaSource={config.about.ctaSource}
          items={config.about.items}
          dir={sectionDir}
        />
      ) : null,
    DoubleHeadingCtaSection: (config: ServicePageConfig) => (
      <DoubleHeadingCtaSection {...config.doubleHeading} dir={sectionDir} />
    ),
    FaqSection: (config: ServicePageConfig) =>
      config.faq ? <ServiceFaqSection {...config.faq} dir={sectionDir} /> : null,
    PackagesSection: () => <PackagesSectionEN />,
    SiteFooter: () => null,
  } as Record<ServiceSectionType, (config: ServicePageConfig) => React.ReactNode>
}

export function EnServicePageTemplate({
  config,
  dir = "ltr",
}: {
  config: ServicePageConfig
  dir?: "ltr" | "rtl"
}) {
  const SECTION_RENDERERS = createSectionRenderers(dir)
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir={dir}>
      {config.sections.map((section) => (
        <div key={section}>{SECTION_RENDERERS[section](config)}</div>
      ))}
    </div>
  )
}
