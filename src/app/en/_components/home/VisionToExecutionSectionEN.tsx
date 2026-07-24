"use client"

import Image from "next/image"
import { openLeadPopup } from "@/app/_components/home/leadPopupEvent"
import { H2, H3 } from "@/components/ui/Heading"

export type VisionCard = {
  id: string
  src: string
  alt: string
  caption: string
}

type Props = {
  title?: string
  subtitle?: string
  ctaLabel?: string
  source?: "design_development" | "digital_marketing" | "smart_accounting_ai"
  ctaHref?: string
  cards?: VisionCard[]
}

export function VisionToExecutionSectionEN({
  title = "AI-Powered Development That Drives Growth",
  subtitle = "Websites that deliver from day one-leads, sales, and measurable results.",
  ctaLabel = "Get in touch",
  source = "design_development",
  ctaHref,
  cards = [],
}: Props) {
  const onCtaClick = () => {
    document.getElementById("lead-design-development")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    openLeadPopup({ source })
  }

  return (
    <section
      aria-label={title}
      className="py-[var(--space-section)] bg-[#F4F1EC]"
      dir="ltr"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="text-left md:text-center">
          <H2 className="w-full pb-2 text-left md:text-center">{title}</H2>
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
              <figcaption className="mt-1 mb-2 text-left text-[20px] lg:text-[24px] font-semibold leading-tight text-black">
                {card.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
