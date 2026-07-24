"use client"

import Image from "next/image"
import { useState } from "react"
import { ABOUT_US_EN } from "./homeEn.constants"
import { PopupEN } from "./PopupEN"
import { POPUP_OVERRIDES_BY_PATH } from "@/app/_components/products/productPopupOverrides"
import type { LeadSource } from "./PopupEN"
import type { PopupIconVariant } from "@/app/_components/products/productPopupOverrides"
import { H2, H3 } from "@/components/ui/Heading"

export function AboutSectionEN() {
  const [open, setOpen] = useState(false)
  const [popupData, setPopupData] = useState<{
    title: string
    description: string
    toptext: string
    source: LeadSource
    iconVariant?: PopupIconVariant
    pagePathOverride?: string
  }>({
    title: "",
    description: "",
    toptext: "",
    source: "smart_accounting_ai",
    iconVariant: "default",
  })

  const handleOpen = (
    title: string,
    description: string,
    toptext: string,
    source: LeadSource,
    iconVariant: PopupIconVariant = "default",
    pagePathOverride?: string
  ) => {
    setPopupData({ title, description, toptext, source, iconVariant, pagePathOverride })
    setOpen(true)
  }

  const openForDevelopAi = () => {
    const o = POPUP_OVERRIDES_BY_PATH["/en/develop-ai"]
    handleOpen(
      o?.title ?? "AI-Powered Custom Development",
      o?.description ?? "We spec, design and build internal systems tailored to your business.",
      o?.toptext ?? "",
      o?.source ?? "design_development",
      o?.iconVariant ?? "develop-ai",
      o?.pagePathOverride ?? "/en/develop-ai"
    )
  }

  return (
    <section aria-label="Branding and development" className="py-[var(--space-section)] mobile-margin-top bg-[#F4F1EC]">
      <div
        data-gs-root
        className="mx-auto max-w-[1440px] rounded-[10px] mx-auto w-full px-4 sm:px-4 lg:px-4 relative"
      >
        <div
          data-gs-grid
          className="relative rounded-[10px] grid bg-white p-4 px-4 main-row gap-4 lg:grid-cols-2"
        >
          <div
            data-gs-card-col
            className="relative z-10 flex justify-start items-center p-6"
          >
            <div className="w-full py-[35px]">
              <H2 className="mt-3 text-left">
                Branding, Websites & AI Systems That Move Your Business Forward
              </H2>
              <H3 className="pt-7 sm:max-w-[90%] lg:max-w-[90%]">
                We combine AI at every step-from spec to marketing, to build a precise, fast, profitable business.
              </H3>
              <button
                type="button"
                className="vow-btn-primary mt-8 w-full max-w-[323px] cursor-pointer"
                onClick={openForDevelopAi}
              >
                Get in touch
              </button>
            </div>
          </div>
          <div className="relative h-full sub-package">
            {ABOUT_US_EN.map((p) => (
              <article key={p.title} className="py-4 sm:p-[3.25rem]">
                <div className="flex items-center gap-3 py-2">
                  <Image
                    src={p.icon}
                    alt={p.title}
                    width={50}
                    height={50}
                    className="max-w-[39px] h-auto"
                    priority
                  />
                  <H3 className="text-left text-black">
                    {p.title}
                  </H3>
                </div>
                <p className="text-left text-[20px] leading-[32px] text-[#000000] sm:max-w-[90%]">
                  {p.kicker}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <PopupEN
          title={popupData.title}
          description={popupData.description}
          toptext={popupData.toptext}
          source={popupData.source}
          iconVariant={popupData.iconVariant}
          pagePathOverride={popupData.pagePathOverride}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  )
}
