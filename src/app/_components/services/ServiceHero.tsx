"use client"
import Image from "next/image"
import { openLeadPopup } from "@/app/_components/home/leadPopupEvent"
import type { LeadSource } from "@/app/_components/home/Popup"
import { H2 } from "@/components/ui/Heading"

/** Module-level strings so SSR and client bundles always reference the same classes (avoids Turbopack/HMR drift). */
/** Vertically center text vs image on md+. Image box height is capped so `items-center` does not create huge empty space above the headline. */
const HERO_GRID_CLASS = "grid gap-1 md:grid-cols-[40fr_60fr] md:items-center"
const TEXT_COL_LTR =
  "order-1 md:order-1 w-full text-left px-4 sm:px-6 lg:px-4 pt-3 pb-2 lg:pb-5 md:py-2"
const TEXT_COL_RTL =
  "order-2 md:order-1 w-full text-right px-4 sm:px-6 lg:px-4 pt-3 pb-2 lg:pb-5 md:py-2"
const IMAGE_COL_LTR =
  "order-2 md:order-2 md:flex md:items-center md:justify-end md:px-4 py-0 lg:py-0"
const IMAGE_COL_RTL =
  "order-1 md:order-2 md:flex md:items-center md:justify-start md:px-4 py-0 lg:py-0"

export type ServiceHeroProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  heroSubheading?: string
  ariaLabel?: string
  subtitleClassName?: string
  tags?: readonly string[]
  ctaLabel: string
  ctaSource: LeadSource
  ctaHref?: string
  imageSrc?: string
  imageAlt?: string
  dir?: "ltr" | "rtl"
}

export function ServiceHero({
  title,
  subtitle,
  heroSubheading,
  ariaLabel,
  subtitleClassName,
  tags,
  ctaLabel,
  ctaSource,
  ctaHref,
  imageSrc = "/new-hero.webp",
  imageAlt = "",
  dir = "rtl",
}: ServiceHeroProps) {
  const sectionAriaLabel = ariaLabel ?? (typeof title === "string" ? title : "Hero")

  const onHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ctaHref || !ctaHref.startsWith("#")) return
    const id = ctaHref.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const onCtaClick = () => {
    document
      .getElementById("lead-design-development")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
    openLeadPopup({ source: ctaSource })
  }

  const isLtr = dir === "ltr"
  return (
    <section aria-label={sectionAriaLabel} className="w-full bg-[#F4F1EC]" dir={dir}>
      <div className="mx-auto max-w-[1440px]">
        <div className={HERO_GRID_CLASS}>
          {/* Text */}
          <div className={isLtr ? TEXT_COL_LTR : TEXT_COL_RTL}>
            <h1
              className={
                isLtr
                  ? "text-black w-full text-left font-semibold leading-[1.05] text-balance text-[30px] sm:text-[55px] sm:leading-[0.98] lg:text-[55px] lg:leading-[1.0]"
                  : "text-black w-full text-right font-semibold leading-[1.05] text-balance text-[30px] sm:text-[55px] sm:leading-[0.98] lg:text-[55px] lg:leading-[1.0]"
              }
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                className={
                  subtitleClassName ??
                  "mt-5 text-[20px] font-semibold leading-[34px] text-[color:var(--vow-muted)] sm:text-[22px] sm:leading-[36px]"
                }
              >
                {subtitle}
              </p>
            ) : null}
            {heroSubheading ? (
              <H2
                className={
                  isLtr
                    ? "mt-6 w-full text-left text-[24px] font-normal leading-[33px]"
                    : "mt-6 w-full text-right text-[24px] font-normal leading-[33px]"
                }
              >
                {heroSubheading}
              </H2>
            ) : null}
            {ctaHref ? (
              <a
                href={ctaHref}
                onClick={ctaHref.startsWith("#") ? onHashLinkClick : undefined}
                className={[
                  "btn-primary mt-7 !w-auto inline-flex items-center justify-center px-6 text-center",
                  isLtr ? "whitespace-nowrap" : "max-w-full text-center",
                ].join(" ")}
              >
                {ctaLabel}
              </a>
            ) : (
              <button
                type="button"
                className={[
                  "btn-primary mt-7 !w-auto inline-flex items-center justify-center px-6",
                  isLtr ? "whitespace-nowrap" : "max-w-full",
                ].join(" ")}
                onClick={onCtaClick}
              >
                {ctaLabel}
              </button>
            )}
          </div>

          {/* Image - fill inside a sized box so SSR and client render identical markup (avoids next/image hydration mismatches). */}
          <div
            suppressHydrationWarning
            className={isLtr ? IMAGE_COL_LTR : IMAGE_COL_RTL}
          >
            <div className="relative w-full overflow-hidden md:max-w-[110%]">
              <div className="relative aspect-square w-full md:aspect-auto md:h-[min(500px,52vh)] md:w-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  fetchPriority="high"
                  quality={60}
                  className="object-contain object-center"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}