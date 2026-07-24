"use client";

import Link from "next/link"
import { CheckIcon } from "./CheckIcon";
import { OUR_PRICE } from "./home.constants";
import { useState } from "react";
import { Popup, LeadSource } from "./Popup";
import { inferFunnelPlan, pushEvent } from "@/lib/tracking/events";
import { H2, H3 } from "@/components/ui/Heading"

export type PricePlan = {
  id?: string
  title: string
  toppopup?: string
  kicker: string
  buttonLabel: string
  buttonHref?: string
  price: string
  priceextra?: string
  badge?: string
  bullets: readonly string[]
}

export type PriceSectionProps = {
  id?: string
  title?: string
  subtitle?: string
  plans?: readonly PricePlan[]
  variant?: "default" | "seo-ai"
  locale?: "he" | "en"
}

export function PriceSection({ id, title, subtitle, plans, variant = "default", locale = "he" }: PriceSectionProps) {
  // URL לאפליקציה – עובד בלוקאל ובפרודקשן
  const APP_BASE_URL =
    process.env.NEXT_PUBLIC_APP_BASE_URL ?? "https://app.uxellent.com";

  // נשאר בקובץ אבל לא בשימוש כרגע (אפשר למחוק לגמרי אם לא צריך)
  const [open, setOpen] = useState(false);
  const [popupData] = useState<{
    title: string;
    description: string;
    toptext: string;
    source: LeadSource;
  }>({
    title: "",
    description: "",
    toptext: "",
    source: "smart_accounting_ai",
  });

  const trackPackageClick = (plan: PricePlan) => {
    const planName = inferFunnelPlan(plan.buttonHref ?? plan.id ?? plan.title)
    if (!planName) return

    pushEvent("package_click", {
      plan: planName,
    })
  }

  return (
    <section id={id} aria-label="החבילות שלנו" className="py-[var(--space-section)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-8">
        <H2 className="text-center">
          {title ?? "חשבונית ירוקה מאובטחת"}
        </H2>

        <H3 className="py-3 text-center">
          {subtitle ?? "תמיכה במודל חשבונית ישראל"}
        </H3>

        <div className="mt-8 grid gap-14 all-package lg:grid-cols-3">
          {(plans ?? OUR_PRICE).map((p) => {
            const buttonHref = "buttonHref" in p ? p.buttonHref : undefined
            const isSeoAi = variant === "seo-ai"

            return (
              <article
                key={p.title}
                id={'id' in p ? p.id : undefined}
                dir={locale === "en" ? "ltr" : undefined}
                className="rounded-[18px] relative inline-block border border-[color:var(--vow-border)] bg-white p-6 shadow-sm"
              >
                {p.badge && (
                  <span className={`absolute top-2 bg-[#5389BB] text-white text-[20px] font-semibold px-4 py-2 rounded-[15px] ${locale === "en" ? "right-2" : "left-2"}`}>
                    {p.badge}
                  </span>
                )}

                {isSeoAi ? (
                  <>
                    <H3 className="pt-2 text-bold text-[20px] text-[#5389BB]">
                      {p.title}
                    </H3>
                    <div className="mt-2 text-[20px] font-semibold leading-none text-[#5389BB]">
                      {p.kicker}
                    </div>
                  </>
                ) : (
                  <H3 className="py-2 text-black">{p.title}</H3>
                )}

                {isSeoAi ? (
                  <div className="mt-4">
                    <div className="text-[30px] font-semibold">{p.price}</div>
                    {p.priceextra ? (
                      <div className="mt-1 text-[16px] font-semibold leading-[24px] text-[#747474]">
                        {p.priceextra}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <h4 className="text-[30px] pt-2 font-semibold">
                    {p.price}{" "}
                    <span className="text-[20px] font-normal">
                      {p.priceextra}
                    </span>
                  </h4>
                )}

                {!isSeoAi ? (
                  <p className="text-right -mt-1 text-[20px] font-regular leading-[32px] text-[#000000]">
                    {p.kicker}
                  </p>
                ) : null}

                {buttonHref ? (
                  buttonHref.startsWith("/") ? (
                    <Link
                      href={buttonHref}
                      onClick={() => {
                        if (variant === "seo-ai") trackPackageClick(p)
                      }}
                      className="vow-btn-primary text-[20px] mt-5 mb-8 w-full cursor-pointer justify-center text-center"
                    >
                      {p.buttonLabel}
                    </Link>
                  ) : (
                    <a
                      href={buttonHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (variant === "seo-ai") trackPackageClick(p)
                      }}
                      className="vow-btn-primary text-[18px] mt-5 mb-8 w-full cursor-pointer justify-center text-center"
                    >
                      {p.buttonLabel}
                    </a>
                  )
                ) : (
<button
  type="button"
  className="vow-btn-primary text-[18px] mt-5 mb-8 w-full cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-transform duration-200"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.assign(APP_BASE_URL);
  }}
>
                    {p.buttonLabel}
                  </button>
                )}

                <div className="mb-5 h-px w-full bg-[color:var(--vow-border)]" />

                <ul
                  className={`mt-4 space-y-0 text-[18px] font-normal leading-[30px] text-black sm:text-[18px] sm:leading-[56px] ${
                    locale === "en"
                      ? "text-left [&_li]:!text-left [&_li]:![direction:ltr]"
                      : ""
                  }`}
                  dir={locale === "en" ? "ltr" : undefined}
                >
                  {p.bullets.map((b, idx) => (
                    <li
                      key={`${p.title}-${idx}`}
                      className={`flex items-center gap-1 text-[17px] ${locale === "en" ? "flex-row justify-start" : ""}`}
                    >
                      <CheckIcon className="shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>

      {/* השארנו את ה-Popup כבוי לחלוטין */}
      {false && open && (
        <Popup
          title={popupData.title}
          description={popupData.description}
          toptext={popupData.toptext}
          source={popupData.source}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
