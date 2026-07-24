"use client"

import Image from "next/image"

import { CLIENT_LOGOS } from "@/app/_components/home/home.constants"
import { openLeadPopup } from "@/app/_components/home/leadPopupEvent"

export function PortfolioHero({ locale = "he" }: { locale?: "he" | "en" }) {
  const isEn = locale === "en"
  return (
    <section aria-label={isEn ? "Portfolio" : "כותרת עמוד פורטפוליו"} className="w-full bg-[#F4F1EC]" dir={isEn ? "ltr" : "rtl"}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4 py-[var(--space-section)]">
        <div className="mx-auto max-w-[980px] text-center">
          <h1 className="text-balance text-[44px] font-semibold leading-[1.05] text-black sm:text-[56px] lg:text-[70px]">
            {isEn ? "Our Work" : "דוגמאות מהעבודות שלנו"}
          </h1>

          <p className="mt-4 text-balance text-[22px] font-semibold leading-[1.45] text-[#747474] sm:text-[26px] lg:text-[30px]">
            {isEn ? "AI-powered design, development & marketing that delivers real results" : "עיצוב, פיתוח ושיווק מבוססי AI שמייצרים תוצאות אמיתיות לעסקים"}
          </p>

          <p className="mt-5 text-pretty text-[18px] leading-[30px] text-black/80 sm:text-[20px] sm:leading-[34px]">
            {isEn ? (
              <>
                At Uxellent we build fast sites, AI systems, and digital solutions tied to performance.
                <br />
                From spec to launch - every decision is measured by outcome: more leads, more sales, more ROI.
              </>
            ) : (
              <>
                ב־Uxellent אנחנו בונים אתרים מהירים, מערכות AI ופתרונות דיגיטליים שמחוברים לביצועים.
                <br />
                מהאפיון ועד ההשקה - כל החלטה נמדדת לפי תוצאה: יותר לידים, יותר מכירות, ויותר ROI.
              </>
            )}
          </p>

          <button
            type="button"
            className="vow-btn-primary mt-8 w-full sm:w-auto"
            onClick={() => openLeadPopup({ source: "design_development" })}
          >
            {isEn ? "Want results like these?" : "גם אתם רוצים תוצאה כזו?"}
          </button>


        </div>

        <div className="mt-10">
          <p className="text-center text-[18px] font-semibold text-[#A1A1A1]">{isEn ? "Our partners" : "השותפים שלנו"}</p>
          <div className="mx-auto mt-5 max-w-[1100px]">
            <div className="grid grid-cols-3 gap-x-8 gap-y-6 py-1 sm:grid-cols-3 md:grid-cols-6 md:gap-x-10 md:gap-y-8">
              {CLIENT_LOGOS.map((logo) => (
                <div key={logo.src} className="flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={220}
                    height={50}
                    className="h-auto w-auto max-h-[32px] object-contain brightness-0 sm:max-h-[40px] md:max-h-[46px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

