"use client"

import * as React from "react"
import Image from "next/image"
import { openLeadPopup } from "./leadPopupEvent"
import { H2, H3 } from "@/components/ui/Heading"

export type VisionCard = {
  id: string
  src: string
  alt: string
  caption: React.ReactNode
}

type Props = {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  ctaLabel?: string
  source?: "design_development" | "digital_marketing" | "smart_accounting_ai"
  ctaHref?: string
  cards?: VisionCard[]
  dir?: "ltr" | "rtl"
}

const DEFAULT_CARDS: VisionCard[] = [
  { id: "default-4", src: "/4.webp", alt: "Google Ads", caption: "Google Ads" },
  { id: "default-3", src: "/services/develop/d2.webp", alt: "ניהול קמפיינים בפייסבוק", caption: "ניהול קמפיינים בפייסבוק" },
  { id: "default-2", src: "/services/develop/d3.webp", alt: "אנליטיקה ושיפו22ר ביצועים", caption: "אנליטיקה ושיפור ביצועים" },
  { id: "default-1", src: "/5.webp", alt: "קופירייטינג /קריאטיב ו-A/B test", caption: "קופירייטינג /קריאטיב ו-A/B test" },
]

export function VisionToExecutionSection({
  title ="פיתוח אתרים מבוססי AI לעסקים שרוצים לגדול",
  subtitle = "אתרים שמביאים תוצאות מהיום הראשון - מייצרים לידים ומגדילים מכירות",
  ctaLabel = "להשארת פרטים",
  source = "design_development",
  ctaHref,
  cards = DEFAULT_CARDS,
  dir = "rtl",
}: Props) {
  const onCtaClick = () => {
    document.getElementById("lead-design-development")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    openLeadPopup({ source })
  }

  const isLtr = dir === "ltr"
  const sectionAriaLabel = typeof title === "string" ? title : "Vision"
  return (
    <section
      aria-label={sectionAriaLabel}
      className="py-[var(--space-section)] bg-[#F4F1EC]"
      dir={dir}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={isLtr ? "text-left md:text-center" : "text-right md:text-center"}>
          <H2 className={isLtr ? "w-full pb-2 text-left md:text-center" : "w-full pb-2 text-right md:text-center"}>
            {title}
          </H2>

          <H3 className="mx-auto max-w-full sm:max-w-[85%] lg:max-w-[70%]">
            {subtitle}
          </H3>

          {ctaHref ? (
            <a
              href={ctaHref}
              className="mt-7 inline-flex max-w-[260px] items-center justify-center rounded-[10px] bg-black px-10 py-3 text-[18px] font-semibold text-white transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/15"
            >
              {ctaLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={onCtaClick}
              className="mt-7 inline-flex max-w-[260px] items-center justify-center rounded-[10px] bg-black px-10 py-3 text-[18px] font-semibold text-white transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/15"
            >
              {ctaLabel}
            </button>
          )}
        </div>

        <div className="mt-10 mx-auto w-[97%] grid grid-cols-2 gap-6 lg:grid-cols-4 lg:max-w-6xl">
          {cards.map((card) => (
            <figure key={card.id} className="flex flex-col w-full items-start">
              <div className="relative aspect-[1/1] w-full overflow-hidden rounded-none bg-white shadow-sm">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw"
                  className="object-cover"
                />
              </div>

              <figcaption className={isLtr ? "mt-1 mb-2 text-left text-[18px] font-semibold leading-tight text-[#717171] leading-[1.2]" : "mt-1 mb-2 text-right text-[18px] lg:text-[18px] font-semibold leading-tight text-black  leading-[1.2]"}>
                {card.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
