"use client"

import { useId, useMemo, useState } from "react"
import { H2 } from "@/components/ui/Heading"

export type ServiceFaqItem = {
  id: string
  question: string
  answer: string
}

export type ServiceFaqSectionProps = {
  title: string
  items: ServiceFaqItem[]
  dir?: "ltr" | "rtl"
}

export function ServiceFaqSection({ title, items, dir = "rtl" }: ServiceFaqSectionProps) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const itemIds = useMemo(
    () =>
      items.map((_, idx) => ({
        buttonId: `${baseId}-faq-btn-${idx}`,
        regionId: `${baseId}-faq-region-${idx}`,
      })),
    [baseId, items],
  )

  const onToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  const isLtr = dir === "ltr"
  return (
    <section aria-label={title} className="py-[var(--space-section)] bg-[#F4F1EC]" dir={dir}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={isLtr ? "mx-auto w-full max-w-[777px] px-4 sm:px-0 text-left" : "mx-auto w-full max-w-[777px] px-4 sm:px-0 text-right"}>
          <H2 className="text-balance tracking-[-0.2px]">
            {title}
          </H2>

          <div className="mt-10 border-t border-[color:var(--vow-border)]">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx
              const ids = itemIds[idx]

              return (
                <div key={item.id} className="border-b border-[color:var(--vow-border)]">
                  <button
                    id={ids.buttonId}
                    type="button"
                    className={isLtr ? "flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/15 rounded-sm" : "flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-right focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/15 rounded-sm"}
                    aria-expanded={isOpen}
                    aria-controls={ids.regionId}
                    onClick={() => onToggle(idx)}
                  >
                    <span className="text-[20px] font-semibold leading-[30px] text-black sm:text-[22px] sm:leading-[32px]">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 select-none text-[34px] leading-none text-black sm:text-[38px]"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id={ids.regionId}
                    role="region"
                    aria-labelledby={ids.buttonId}
                    aria-hidden={!isOpen}
                    className={[
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={[
                          "pt-1 pb-6 text-[20px] leading-[34px] text-black transition-opacity duration-200 whitespace-pre-wrap break-words",
                          isOpen ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

