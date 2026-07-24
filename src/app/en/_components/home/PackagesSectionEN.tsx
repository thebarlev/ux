"use client"

import Link from "next/link"
import { useCallback, useState } from "react"
import { CheckIcon } from "@/app/_components/home/CheckIcon"
import { OUR_PACKAGES_EN } from "./homeEn.constants"
import { PopupEN } from "./PopupEN"
import { POPUP_OVERRIDES_BY_PATH } from "@/app/_components/products/productPopupOverrides"
import type { LeadSource } from "./PopupEN"
import type { PopupIconVariant } from "@/app/_components/products/productPopupOverrides"
import { H2, H3 } from "@/components/ui/Heading"

export function PackagesSectionEN() {
  const [open, setOpen] = useState(false)
  const [popupData, setPopupData] = useState<{
    title: string
    description: string
    toptext: string
    source: LeadSource
    iconVariant?: PopupIconVariant
  }>({
    title: "",
    description: "",
    toptext: "",
    source: "design_development",
    iconVariant: "default",
  })

  const handleOpen = useCallback(
    (title: string, description: string, toptext: string, source: LeadSource, iconVariant: PopupIconVariant = "default") => {
      setPopupData({ title, description, toptext, source, iconVariant })
      setOpen(true)
    },
    []
  )

  const openPopupWithPossibleOverride = useCallback(
    (fallback: { title: string; description: string; toptext?: string; source: LeadSource }) => {
      const override = POPUP_OVERRIDES_BY_PATH[window.location.pathname]
      if (override) {
        handleOpen(
          override.title,
          override.description,
          override.toptext ?? "",
          override.source ?? fallback.source,
          override.iconVariant ?? "default"
        )
        return
      }

      handleOpen(fallback.title, fallback.description, fallback.toptext ?? "", fallback.source, "default")
    },
    [handleOpen]
  )

  return (
    <section dir="ltr" aria-label="Our services" className="py-[var(--space-section)] bg-[#F4F1EC]">
      <div id="lead-design-development" className="scroll-mt-24" />
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-8">
        <H2 className="pb-0 text-center">
          Our Services
        </H2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-1 lg:place-items-stretch lg:justify-center">
          {OUR_PACKAGES_EN.map((p) => (
            <article
              dir="ltr"
              key={p.title}
              className="rounded-[10px] bg-white w-[98%] max-w-[420px] mx-auto lg:w-full lg:max-w-[400px] lg:mx-auto p-6 shadow-[0_0_24px_10px_rgba(0,0,0,0.07)] flex flex-col items-stretch text-left"
            >
              <p className="text-[20px] font-semibold leading-[32px] text-[color:var(--vow-accent)] text-left">
                {p.kicker}
              </p>
              <H3 className="py-2 text-left text-black">
                {p.title}
              </H3>

              {"ctaHref" in p && p.ctaHref ? (
                <Link
                  href={p.ctaHref}
                  className="vow-btn-primary mt-4 w-full cursor-pointer text-center block"
                >
                  {p.buttonLabel}
                </Link>
              ) : (
                <button
                  type="button"
                  className="vow-btn-primary mt-4 w-full cursor-pointer"
                  onClick={() =>
                    openPopupWithPossibleOverride({
                      title: p.title,
                      description: p.kicker,
                      toptext: p.toppopup ?? "",
                      source: p.source,
                    })
                  }
                >
                  {p.buttonLabel}
                </button>
              )}
              <div className="mt-7 h-px w-full bg-[color:var(--vow-border)]" />

              <ul
                dir="ltr"
                className="mt-4 space-y-1 text-[16px] font-normal leading-[40px] text-black sm:text-[16px] sm:leading-[56px]"
              >
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      alignItems: "center",
                      gap: "8px",
                      textAlign: "left",
                      direction: "ltr",
                    }}
                  >
                    <CheckIcon />
                    <span className="text-[17px] font-normal text-black">{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <PopupEN
          title={popupData.title}
          description={popupData.description}
          toptext={popupData.toptext}
          source={popupData.source}
          iconVariant={popupData.iconVariant}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  )
}