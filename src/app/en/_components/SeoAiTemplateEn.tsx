import type { ComponentProps, ReactNode } from "react"
import dynamic from "next/dynamic"

import type { PricePlan } from "@/app/_components/home/PriceSection"
import { ServiceHero, type ServiceHeroProps } from "@/app/_components/services/ServiceHero"
import type { SeoAiProcessStep } from "@/app/_components/services/SeoAiProcessSteps"
import type { SeoAiStatsBarItem } from "@/app/_components/services/SeoAiStatsBar"
import { H2 } from "@/components/ui/Heading"

const LogoRowEN = dynamic(
  () => import("@/app/en/_components/home/LogoRowEN").then((m) => m.LogoRowEN),
  { ssr: true },
)
const PriceSection = dynamic(
  () => import("@/app/_components/home/PriceSection").then((m) => m.PriceSection),
  { ssr: true },
)
const SuccessSection = dynamic(
  () => import("@/app/_components/home/SuccessSection").then((m) => m.SuccessSection),
  { ssr: true },
)
const Testimonials = dynamic(
  () => import("@/app/_components/home/Testimonials").then((m) => m.Testimonials),
  { ssr: true },
)
const VisionToExecutionSection = dynamic(
  () => import("@/app/_components/home/VisionToExecutionSection").then((m) => m.VisionToExecutionSection),
  { ssr: true },
)
const DoubleHeadingCtaSection = dynamic(
  () => import("@/app/_components/services/DoubleHeadingCtaSection").then((m) => m.DoubleHeadingCtaSection),
  { ssr: true },
)
const SeoAiProcessSteps = dynamic(
  () => import("@/app/_components/services/SeoAiProcessSteps").then((m) => ({ default: m.SeoAiProcessSteps })),
  { ssr: true },
)
const ServiceAboutSection = dynamic(
  () => import("@/app/_components/services/ServiceAboutSection").then((m) => m.ServiceAboutSection),
  { ssr: true },
)
const ServiceFaqSection = dynamic(
  () => import("@/app/_components/services/ServiceFaqSection").then((m) => m.ServiceFaqSection),
  { ssr: true },
)
const SeoAiStatsBar = dynamic(
  () => import("@/app/_components/services/SeoAiStatsBar").then((m) => ({ default: m.SeoAiStatsBar })),
  { ssr: true },
)
const PackagesSectionEN = dynamic(
  () => import("./home/PackagesSectionEN").then((m) => m.PackagesSectionEN),
  { ssr: true },
)

type SeoAiTemplateEnProps = {
  hero: Omit<ServiceHeroProps, "dir">
  heroTitle?: ReactNode
  heroSubtitleClassName?: string
  trustHeading?: { title: ReactNode; description: ReactNode }
  postLogoContent?: ReactNode
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
  /** Rendered after packages (e.g. lead form). */
  afterPackages?: ReactNode
  dataKeyword?: string
}

export function SeoAiTemplateEn({
  hero,
  heroTitle,
  heroSubtitleClassName,
  trustHeading,
  postLogoContent,
  stats,
  process,
  vision,
  about,
  price,
  doubleHeading,
  faq,
  extraContent,
  afterPackages,
  dataKeyword,
}: SeoAiTemplateEnProps) {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr" data-keyword={dataKeyword}>
      <div id="main" role="main" data-keyword={dataKeyword}>
        <ServiceHero
          {...hero}
          ariaLabel={hero.ariaLabel ?? (typeof hero.title === "string" ? hero.title : undefined)}
          dir="ltr"
          subtitleClassName={heroSubtitleClassName}
          title={heroTitle ?? hero.title}
        />

        {trustHeading ? (
          <section className="bg-[#F4F1EC] pb-2 pt-[var(--space-section)]">
            <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-4">
              <H2>{trustHeading.title}</H2>
              <h3 className="mt-3 text-[26px] font-semibold leading-[32px] text-heading-sub mx-auto max-w-full sm:max-w-[85%] lg:max-w-[70%]">
                {trustHeading.description}
              </h3>
            </div>
          </section>
        ) : null}

        <LogoRowEN />
        {postLogoContent}
        <SeoAiStatsBar
          locale="en"
          ariaLabel={stats?.ariaLabel}
          items={stats?.items}
          title={stats?.title}
          subtitle={stats?.subtitle}
        />
        <SeoAiProcessSteps
          locale="en"
          label={process?.label}
          title={process?.title}
          subtitle={process?.subtitle}
          steps={process?.steps}
        />
        <VisionToExecutionSection {...vision} dir="ltr" />

        {about ? <ServiceAboutSection {...about} dir="ltr" /> : null}

        <PriceSection
          id={price.id}
          title={price.title}
          subtitle={price.subtitle}
          plans={price.plans}
          variant={price.variant ?? "seo-ai"}
          locale="en"
        />

        <SuccessSection locale="en" />
        <Testimonials locale="en" />

        <DoubleHeadingCtaSection {...doubleHeading} dir="ltr" />
        {faq ? <ServiceFaqSection {...faq} dir="ltr" /> : null}
        {extraContent}
        <PackagesSectionEN />
        {afterPackages}
      </div>
    </div>
  )
}
