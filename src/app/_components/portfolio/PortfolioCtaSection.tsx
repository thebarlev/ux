"use client"

import { openLeadPopup } from "@/app/_components/home/leadPopupEvent"
import { H2 } from "@/components/ui/Heading"

export function PortfolioCtaSection({ locale = "he" }: { locale?: "he" | "en" }) {
  const isEn = locale === "en"
  return (
    <section aria-label={isEn ? "Call to action" : "קריאה לפעולה"} className="py-[var(--space-section)] bg-[#F4F1EC]" dir={isEn ? "ltr" : "rtl"}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="mx-auto max-w-[980px] text-center">
          <H2 className="text-balance tracking-[-0.2px]">
            {isEn ? "Ready to be our next project?" : "מוכנים להיות הפרויקט הבא שלנו?"}
          </H2>

          <p className="mt-4 text-pretty text-[18px] leading-[30px] text-black/80 sm:text-[20px] sm:leading-[34px]">
            {isEn
              ? "Let's build a digital asset that delivers measurable ROI: speed, AI-powered accuracy, and cost savings without compromising quality. We work with clear metrics, smart optimization, and a process that drives real growth."
              : "בואו נבנה נכס דיגיטלי שמביא ROI מדיד: מהירות, דיוק מבוסס AI, וחיסכון בעלויות בלי פשרות על איכות. אנחנו עובדים עם מדידה ברורה, אופטימיזציה חכמה, ותהליך שמייצר צמיחה אמיתית."}
          </p>

          <button
            type="button"
            className="vow-btn-primary mt-8 w-full sm:w-auto"
            onClick={() => openLeadPopup({ source: "design_development" })}
          >
            {isEn ? "Get in touch" : "להשארת פרטים"}
          </button>

          <p className="mt-3 text-[16px] font-semibold text-[#747474]">{isEn ? "We respond within 24 hours" : "חוזרים אליכם עד 24 שעות"}</p>
        </div>
      </div>
    </section>
  )
}

