"use client"
import Image from "next/image"
import type { ReactNode } from "react"
import { openLeadPopup } from "@/app/_components/home/leadPopupEvent"
import type { LeadSource } from "@/app/_components/home/Popup"
import { H2, H3 } from "@/components/ui/Heading"

/** Single string for article padding - avoids SSR vs stale client HMR mismatches in Turbopack. */
const ABOUT_ITEM_ARTICLE_CLASS =
  "py-[14px] px-[10px] sm:py-[3.25rem] sm:px-[3.25rem] lg:py-[1.1rem] lg:px-[1.1rem]"

export type ServiceAboutItem = {
  id: string
  title: string
  description?: ReactNode
  icon?: string
}

export type ServiceAboutSectionProps = {
  title: string
  subtitle: ReactNode
  ctaLabel: string
  ctaSource: LeadSource
  ctaHref?: string
  items: ServiceAboutItem[]
  dir?: "ltr" | "rtl"
}

export function ServiceAboutSection({
  title,
  subtitle,
  ctaLabel,
  ctaSource,
  ctaHref,
  items,
  dir = "rtl",
}: ServiceAboutSectionProps) {
  const onCtaClick = () => {
    document
      .getElementById("lead-design-development")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
    openLeadPopup({ source: ctaSource })
  }

  const isLtr = dir === "ltr"
  return (
    <section aria-label={title} className="py-[var(--space-section)] mobile-margin-top bg-[#F4F1EC]" dir={dir}>
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-4 lg:px-4 relative">
        <div className="relative rounded-[10px] grid bg-white p-1 px-3 main-row gap-4 lg:grid-cols-2">

          {/* Card */}
          <div className="relative z-10 min-w-0 max-w-full overflow-hidden flex justify-start items-center w-full">
            <div className="w-full min-w-0 max-w-full  lg:px-10
              py-[20px] px-[10px]
              sm:py-[35px] sm:px-4 sm:translate-x-0
            ">
              <H2 className={isLtr ? "break-words text-left" : "break-words text-right"}>{title}</H2>
              <H3 className="pt-7 break-words sm:max-w-[90%] lg:max-w-[90%]">
                {subtitle}
              </H3>
              {ctaHref ? (
                <a
                  href={ctaHref}
                  className="vow-btn-primary mt-8 w-full max-w-[323px] cursor-pointer text-center"
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  className="vow-btn-primary mt-8 w-full max-w-[323px] cursor-pointer"
                  onClick={onCtaClick}
                >
                  {ctaLabel}
                </button>
              )}
            </div>
          </div>

          {/* Items - שמאל */}
          <div className="relative h-full sub-package lg:px-6">
            {items.map((item) => (
              <article key={item.id} className={ABOUT_ITEM_ARTICLE_CLASS}>
                <div className="flex items-center gap-3 py-2">
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="max-w-[39px] h-auto"
                    />
                  ) : null}
                  <H3
                    dir={isLtr ? "ltr" : "rtl"}
                    className={isLtr ? "text-left text-black text-[20px] leading-[26px]" : "text-right text-black text-[20px] leading-[26px]"}
                  >
                    {item.title}
                  </H3>
                </div>
                {item.description ? (
                  <p className={isLtr ? "text-left text-[18px] font-normal leading-[26px] text-black sm:max-w-[90%]" : "text-right text-[18px] font-normal leading-[26px] text-black sm:max-w-[90%]"}>
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}