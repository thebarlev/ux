import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { LogoRow } from "@/app/_components/home/LogoRow"
import { PackagesSection } from "@/app/_components/home/PackagesSection"
import { VisionToExecutionSection } from "@/app/_components/home/VisionToExecutionSection"
import { JsonLd, faqPageSchema } from "@/components/JsonLd"

import { DoubleHeadingCtaSection } from "./DoubleHeadingCtaSection"
import { ServiceAboutSection } from "./ServiceAboutSection"
import { ServiceFaqSection } from "./ServiceFaqSection"
import { ServiceHero } from "./ServiceHero"
import type { ServicePageConfig, ServiceSectionType } from "./services.config"

const SECTION_RENDERERS: Record<ServiceSectionType, (config: ServicePageConfig) => React.ReactNode> = {
  SiteHeader: () => <SiteHeader />,
  ServiceHero: (config) => <ServiceHero {...config.hero} />,
  LogoRow: () => <LogoRow />,
  VisionToExecutionSection: (config) => (
    <VisionToExecutionSection
      title={config.vision?.title}
      subtitle={config.vision?.subtitle}
      ctaLabel={config.vision?.ctaLabel}
      source={config.vision?.source}
      cards={config.vision?.cards}
    />
  ),
  AboutSection: (config) =>
    config.about ? (
      <ServiceAboutSection
        title={config.about.title}
        subtitle={config.about.subtitle}
        ctaLabel={config.about.ctaLabel}
        ctaSource={config.about.ctaSource}
        items={config.about.items}
      />
    ) : null,
  DoubleHeadingCtaSection: (config) => <DoubleHeadingCtaSection {...config.doubleHeading} />,
  FaqSection: (config) => (config.faq ? <ServiceFaqSection {...config.faq} /> : null),
  PackagesSection: () => <PackagesSection />,
  SiteFooter: () => <SiteFooter />,
}

export function ServicePageTemplate({ config }: { config: ServicePageConfig }) {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      {config.faq ? (
        <JsonLd
          data={faqPageSchema(config.faq.items.map((i) => ({ question: i.question, answer: i.answer })))}
        />
      ) : null}
      {config.sections.map((section) => (
        <div key={section}>{SECTION_RENDERERS[section](config)}</div>
      ))}
    </div>
  )
}

