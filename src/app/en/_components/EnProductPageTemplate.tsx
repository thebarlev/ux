import { LogoRow } from "@/app/_components/home/LogoRow"
import { PriceSection } from "@/app/_components/home/PriceSection"
import { PackagesSectionEN } from "@/app/en/_components/home/PackagesSectionEN"
import { VisionToExecutionSection } from "@/app/_components/home/VisionToExecutionSection"

import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { ServiceAboutSection } from "@/app/_components/services/ServiceAboutSection"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { ServiceHero } from "@/app/_components/services/ServiceHero"
import type { ProductPageConfig, ProductSectionType } from "@/app/_components/products/products.config"

function createSectionRenderers(dir: "ltr" | "rtl") {
  const sectionDir = dir
  return {
    SiteHeader: () => null,
    ServiceHero: (config: ProductPageConfig) => <ServiceHero {...config.hero} dir={sectionDir} />,
    LogoRow: () => <LogoRow />,
    VisionToExecutionSection: (config: ProductPageConfig) => (
      <VisionToExecutionSection
        title={config.vision?.title}
        subtitle={config.vision?.subtitle}
        ctaLabel={config.vision?.ctaLabel}
        source={config.vision?.source}
        ctaHref={config.vision?.ctaHref}
        cards={config.vision?.cards}
        dir={sectionDir}
      />
    ),
    AboutSection: (config: ProductPageConfig) =>
      config.about ? (
        <ServiceAboutSection
          title={config.about.title}
          subtitle={config.about.subtitle}
          ctaLabel={config.about.ctaLabel}
          ctaSource={config.about.ctaSource}
          ctaHref={config.about.ctaHref}
          items={config.about.items}
          dir={sectionDir}
        />
      ) : null,
    DoubleHeadingCtaSection: (config: ProductPageConfig) => (
      <DoubleHeadingCtaSection {...config.doubleHeading} dir={sectionDir} />
    ),
    FaqSection: (config: ProductPageConfig) =>
      config.faq ? <ServiceFaqSection {...config.faq} dir={sectionDir} /> : null,
    PriceSection: () => <PriceSection />,
    PackagesSection: () => <PackagesSectionEN />,
    SiteFooter: () => null,
  } as Record<ProductSectionType, (config: ProductPageConfig) => React.ReactNode>
}

export function EnProductPageTemplate({
  config,
  dir = "ltr",
}: {
  config: ProductPageConfig
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
