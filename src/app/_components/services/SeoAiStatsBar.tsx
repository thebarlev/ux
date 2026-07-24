import type { ReactNode } from "react"
import { H2, H3 } from "@/components/ui/Heading"

export type SeoAiStatsBarItem = {
  value: ReactNode
  line1: ReactNode
  line2: ReactNode
}

const DEFAULT_ITEMS = {
  en: [
    { value: <><span className="text-[40px] sm:text-[40px] lg:text-[40px] mr-1"></span>10X</>, line1: "more customers", line2: "" },
    { value: "10X", line1: "more leads", line2: "" },
    { value: "10X", line1: "more sales", line2: "" },
  ],
  he: [
    { value: <><span className="text-[40px] sm:text-[40px] lg:text-[40px] ml-1"></span>10X</>, line1: "יותר מכירות", line2: "" },
    { value: "10X", line1: "יותר לידים", line2: "" },
    { value: "10X", line1: "יותר חשיפה", line2: "" },
  ],
} as const

const DEFAULT_HEADINGS = {
  en: {
    title: "What changes in the first few months",
    subtitle:
      "Consistent SEO and AI visibility work builds more customers, more leads, and more sales over time.",
  },
  he: {
    title: "מה קורה בחודשים הראשונים",
    subtitle:
      "עבודה עקבית על SEO, נראות ומבנה אתר מייצרת יותר חשיפה, יותר לידים ויותר מכירות לאורך זמן.",
  },
} as const

export function SeoAiStatsBar({
  locale = "he",
  ariaLabel,
  items,
  title,
  subtitle,
}: {
  locale?: "he" | "en"
  ariaLabel?: string
  items?: readonly SeoAiStatsBarItem[]
  title?: ReactNode
  subtitle?: ReactNode
}) {
  const isEn = locale === "en"
  const resolvedItems = items ?? DEFAULT_ITEMS[isEn ? "en" : "he"]
  const resolvedTitle = title ?? DEFAULT_HEADINGS[isEn ? "en" : "he"].title
  const resolvedSubtitle = subtitle ?? DEFAULT_HEADINGS[isEn ? "en" : "he"].subtitle
  return (
    <section aria-label={ariaLabel ?? (isEn ? "SEO AI metrics" : "מדדים על SEO AI")} className="bg-[#F4F1EC]" dir={isEn ? "ltr" : "rtl"}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="rounded-[18px] bg-black px-6 py-10 shadow-lg sm:px-10 sm:py-12">
          <div className="mx-auto mb-10 max-w-[860px] text-center">
            <H2 className="text-center text-white">{resolvedTitle}</H2>
            <H3 className="mt-3 text-center text-white/90">
              {resolvedSubtitle}
            </H3>
          </div>
          <div className="flex flex-col items-center gap-16 text-center sm:flex-row sm:justify-center sm:gap-12 sm:px-2 lg:gap-20">
            {resolvedItems.map((item, index) => (
              <div
                key={`${index}-${typeof item.line1 === "string" ? item.line1 : "stat"}`}
                className="w-full max-w-[280px] shrink-0 sm:w-auto sm:min-w-[11rem] lg:min-w-[12rem]"
              >
                <div className="text-white text-[56px] font-semibold leading-none sm:text-[64px] lg:text-[72px] [unicode-bidi:plaintext]">
                  {item.value}
                </div>
                <div className="mt-3 text-white/90 text-[26px] font-semibold leading-[1.3] sm:text-[20px] lg:text-[24px]">
                  <div className={isEn ? "whitespace-nowrap" : undefined}>{item.line1}</div>
                  <div>{item.line2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

