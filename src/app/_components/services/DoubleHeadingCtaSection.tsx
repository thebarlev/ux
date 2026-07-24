"use client"

import Link from "next/link"
import { H2, H3 } from "@/components/ui/Heading"

import { openLeadPopup } from "@/app/_components/home/leadPopupEvent"
import type { LeadSource } from "@/app/_components/home/Popup"

export type DoubleHeadingCtaSectionProps = {
  title: string
  subtitle: string
  buttonLabel: string
  buttonSource: LeadSource
  buttonHref?: string
  dir?: "ltr" | "rtl"
}

export function DoubleHeadingCtaSection({
  title,
  subtitle,
  buttonLabel,
  buttonSource,
  buttonHref,
  dir = "rtl",
}: DoubleHeadingCtaSectionProps) {
  const onHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonHref || !buttonHref.startsWith("#")) return
    const id = buttonHref.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const onClick = () => {
    document
      .getElementById("lead-design-development")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
    openLeadPopup({ source: buttonSource })
  }

  const isLtr = dir === "ltr"
  return (
    <section aria-label={title} className="py-[var(--space-section)] bg-[#F4F1EC]" dir={dir}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className={isLtr ? "mx-auto w-full max-w-[900px] text-left md:text-center" : "mx-auto w-full max-w-[900px] text-right md:text-center"}>
          <H2 className="pb-2">{title}</H2>
          <H3 className="mx-auto max-w-[780px]">
            {subtitle}
          </H3>

          {buttonHref ? (
            buttonHref.startsWith("/") ? (
              <Link href={buttonHref} className="btn-primary mt-7 w-full sm:w-auto mx-auto">
                {buttonLabel}
              </Link>
            ) : (
              <a
                href={buttonHref}
                onClick={buttonHref.startsWith("#") ? onHashLinkClick : undefined}
                className="btn-primary mt-7 w-full sm:w-auto mx-auto"
              >
                {buttonLabel}
              </a>
            )
          ) : (
            <button type="button" className="btn-primary mt-7 w-full sm:w-auto mx-auto" onClick={onClick}>
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

