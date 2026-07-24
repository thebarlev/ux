import type { ComponentProps, ReactNode } from "react"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { LogoRow } from "@/app/_components/home/LogoRow"
import type { PricePlan } from "@/app/_components/home/PriceSection"
import { PriceSection } from "@/app/_components/home/PriceSection"
import { SuccessSection } from "@/app/_components/home/SuccessSection"
import { Testimonials } from "@/app/_components/home/Testimonials"
import { VisionToExecutionSection } from "@/app/_components/home/VisionToExecutionSection"
import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { SeoAiProcessSteps, type SeoAiProcessStep } from "@/app/_components/services/SeoAiProcessSteps"
import { ServiceAboutSection } from "@/app/_components/services/ServiceAboutSection"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { ServiceHero, type ServiceHeroProps } from "@/app/_components/services/ServiceHero"
import { SeoAiStatsBar, type SeoAiStatsBarItem } from "@/app/_components/services/SeoAiStatsBar"
import { PackagesSection } from "@/app/_components/home/PackagesSection"

type SeoAiTemplateHeProps = {
  hero: Omit<ServiceHeroProps, "dir">
  heroTitle?: ReactNode
  heroSubtitleClassName?: string
  stats?: {
    ariaLabel?: string
    items?: readonly SeoAiStatsBarItem[]
    title?: ReactNode
    subtitle?: ReactNode
  }
  process?: {
    label?: ReactNode
    title?: ReactNode
    subtitle?: ReactNode
    steps?: readonly SeoAiProcessStep[]
  }
  vision: Omit<ComponentProps<typeof VisionToExecutionSection>, "dir">
  about?: Omit<ComponentProps<typeof ServiceAboutSection>, "dir">
  price: {
    id?: string
    title: string
    subtitle: string
    plans: readonly PricePlan[]
    variant?: "default" | "seo-ai"
  }
  doubleHeading: Omit<ComponentProps<typeof DoubleHeadingCtaSection>, "dir">
  faq?: Omit<ComponentProps<typeof ServiceFaqSection>, "dir">
  extraContent?: ReactNode
  dataKeyword?: string
}

export function SeoAiTemplateHe({
  hero,
  heroTitle,
  heroSubtitleClassName,
  stats,
  process,
  vision,
  about,
  price,
  doubleHeading,
  faq,
  extraContent,
  dataKeyword,
}: SeoAiTemplateHeProps) {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl" data-keyword={dataKeyword}>
      <SiteHeader />
      <main id="main" role="main" data-keyword={dataKeyword}>
        <ServiceHero
          {...hero}
          ariaLabel={hero.ariaLabel ?? (typeof hero.title === "string" ? hero.title : undefined)}
          dir="rtl"
          subtitleClassName={heroSubtitleClassName}
          title={heroTitle ?? hero.title}
        />
        <LogoRow />
        <SeoAiStatsBar
          ariaLabel={stats?.ariaLabel}
          items={stats?.items}
          title={stats?.title}
          subtitle={stats?.subtitle}
        />
        <SeoAiProcessSteps
          label={process?.label}
          title={process?.title}
          subtitle={process?.subtitle}
          steps={process?.steps}
        />
        <VisionToExecutionSection {...vision} dir="rtl" />
        {about ? <ServiceAboutSection {...about} dir="rtl" /> : null}
        <PriceSection
          id={price.id}
          title={price.title}
          subtitle={price.subtitle}
          plans={price.plans}
          variant={price.variant ?? "seo-ai"}
        />
        <SuccessSection />
        <Testimonials />
        <DoubleHeadingCtaSection {...doubleHeading} dir="rtl" />
        {faq ? <ServiceFaqSection {...faq} dir="rtl" /> : null}
        {extraContent}
        <PackagesSection />
      </main>
      <SiteFooter />
    </div>
  )
}
