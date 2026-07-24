"use client";
import Image from "next/image"
import { ABOUT_US } from "./home.constants"
import { useState } from "react"
import { Popup, LeadSource } from "./Popup"
import { POPUP_OVERRIDES_BY_PATH, type PopupIconVariant } from "@/app/_components/products/productPopupOverrides"
import { H2, H3 } from "@/components/ui/Heading"

export function AboutSection() {

  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState<{ 
    title: string; 
    description: string; 
    toptext: string; 
    source: LeadSource;
    iconVariant?: PopupIconVariant;
    pagePathOverride?: string;
  }>({
    title: '',
    description: '',
    toptext: '',
    source: 'smart_accounting_ai',
    iconVariant: "default",
  });
  
  const handleOpen = (
    title: string,
    description: string,
    toptext: string,
    source: LeadSource,
    iconVariant: PopupIconVariant = "default",
    pagePathOverride?: string
  ) => {
    setPopupData({ title, description, toptext, source, iconVariant, pagePathOverride });
    setOpen(true);
  };

  return (
    <section aria-label="חתימה ירוקה" className="py-[var(--space-section)] mobile-margin-top bg-[#F4F1EC]">
      <div
        data-gs-root
        className="mx-auto max-w-[1440px] rounded-[10px] mx-auto w-full px-4 sm:px-4 lg:px-4 relative"
      >
        <div
  data-gs-grid
  className="relative rounded-[10px] grid bg-white p-4 px-4 main-row gap-4 lg:grid-cols-2"
>
          {/* Card - ימין */}
          <div
  data-gs-card-col
  className="  relative z-10 flex justify-start items-center p-6"
>
            <div className="w-full  py-[35px]">
              
              <H2 className="mt-3 text-right">
                מיתוג, אתרים ופיתוח מערכות AI שמקדמים את העסק קדימה
              </H2>
              <H3 className="pt-7 sm:max-w-[90%] lg:max-w-[90%]">
                אנחנו משלבים AI בכל שלב, מהאפיון ועד השיווק, כדי לבנות עסק מדויק, מהיר ורווחי יותר.
              </H3>
            <button
  type="button"
  className="vow-btn-primary mt-8 w-full max-w-[323px] cursor-pointer"
  onClick={() =>
    (() => {
      const o = POPUP_OVERRIDES_BY_PATH["/develop-ai"]
      handleOpen(
        o?.title ?? "פיתוח בהתאמה אישית בסביבת AI",
        o?.description ?? "מאפיינים מעצבים ומפתחים מערכת פנימית בהתאמה מלאה",
        o?.toptext ?? "",
        o?.source ?? "design_development",
        o?.iconVariant ?? "develop-ai",
        o?.pagePathOverride ?? "/develop-ai"
      )
    })()
  }
>
  להשארת פרטים
</button>
<p className="text-[20px] text-[#000000] pt-3 font-semibold leading-[26px]  sm:max-w-[90%]">

              </p>
               
            </div>
          </div>
          <div className=" relative h-full sub-package">
  {ABOUT_US.map((p) => (
    <article key={p.title} className="py-4 sm:p-[3.25rem]">
      
      {/* Title with icon */}
      <div className="flex items-center gap-3 py-2">
        <Image
          src={p.icon}
          alt={p.title}
          width={50}
          height={50}
          className="max-w-[39px] h-auto"
          priority
        />
        <H3 className="text-black">
          {p.title}
        </H3>
      </div>

      {/* Description */}
      <p className="text-right text-[20px]  leading-[32px] text-[#000000] sm:max-w-[90%]">
        {p.kicker}
      </p>
      
    </article>
  ))}
</div>

        </div>
      </div>

      {open && (
        <Popup
          title={popupData.title}
          description={popupData.description}
          toptext = {popupData.toptext}
          source={popupData.source}
          iconVariant={popupData.iconVariant}
          pagePathOverride={popupData.pagePathOverride}
          onClose={() => setOpen(false)}
        />
      )}

    </section>
  )
}