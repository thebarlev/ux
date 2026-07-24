"use client";
import { CheckIcon } from "./CheckIcon"
import { OUR_PACKAGES, OUR_PACKAGES_EN } from "./home.constants"
import { useCallback, useState } from "react"
import { Popup, LeadSource } from "./Popup"
import { POPUP_OVERRIDES_BY_PATH, type PopupIconVariant } from "@/app/_components/products/productPopupOverrides"
import { H2, H3 } from "@/components/ui/Heading"

export function PackagesSection({ locale = "he" }: { locale?: "he" | "en" }) {
  const packages = locale === "en" ? OUR_PACKAGES_EN : OUR_PACKAGES
  const isLtr = locale === "en"

  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState<{ 
    title: string; 
    description: string; 
    toptext: string; 
    source: LeadSource;
    iconVariant?: PopupIconVariant;
  }>({
    title: '',
    description: '',
    toptext: '',
    source: 'design_development',
    iconVariant: "default",
  });

  const handleOpen = useCallback(
    (title: string, description: string, toptext: string, source: LeadSource, iconVariant: PopupIconVariant = "default") => {
      setPopupData({ title, description, toptext, source, iconVariant })
    setOpen(true);
    },
    []
  );

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
    <section aria-label={isLtr ? "Our services" : "החבילות שלנו"} className="py-[var(--space-section)]  bg-[#F4F1EC]">
      <div id="lead-design-development" className="scroll-mt-24" />
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-8">
        <H2 className="pb-0 text-center">
          {isLtr ? "Our services" : "מסלול הבנייה של Uxellent"}
        </H2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-1 lg:place-items-stretch lg:justify-center">
           {packages.map((p) => (
    <article
  key={p.title}
  className="rounded-[10px] bg-white w-[98%] max-w-[386px] mx-auto lg:w-full lg:max-w-[350px] lg:mx-auto p-6 shadow-[0_0_24px_10px_rgba(0,0,0,0.07)] flex flex-col items-stretch"
>
              <p className={`text-[20px] font-semibold leading-[32px] text-[color:var(--vow-accent)] ${isLtr ? "text-left" : "text-right"}`}>
                 {p.kicker}
              </p>
              <H3 className={`py-2 text-black ${isLtr ? "text-left" : "text-right"}`}>
                {p.title}
              </H3>

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
<div className="mt-7 h-px w-full bg-[color:var(--vow-border)]" />

              <ul className="mt-4 space-y-1 text-left text-[18px] font-normal leading-[40px] text-black sm:text-[20px] sm:leading-[56px]">
  {p.bullets.map((b) => (
    <li key={b} className="flex items-center gap-1">
      <CheckIcon className="shrink-0" />
      <span>{b}</span>
    </li>
  ))}
</ul>
            </article>
          ))}
        </div>
      </div>
       {/* Popup */}
      {open && (
        <Popup
          title={popupData.title}
          description={popupData.description}
          toptext = {popupData.toptext}
          source={popupData.source}
          iconVariant={popupData.iconVariant}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  )
}

