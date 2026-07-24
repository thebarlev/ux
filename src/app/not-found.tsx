import Link from "next/link"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"

function CuteLostIcon() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex h-[140px] w-[140px] items-center justify-center rounded-[36px] bg-white border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      <svg width="78" height="78" viewBox="0 0 78 78" fill="none">
        <path
          d="M39 72c18.225 0 33-14.775 33-33S57.225 6 39 6 6 20.775 6 39s14.775 33 33 33Z"
          fill="#F4F1EC"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="2"
        />
        <path
          d="M25.5 34.5c0-2.9 2.1-5.2 4.8-5.2 2.6 0 4.7 2.3 4.7 5.2"
          stroke="#111"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M43 34.5c0-2.9 2.1-5.2 4.8-5.2 2.6 0 4.7 2.3 4.7 5.2"
          stroke="#111"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M29 49.5c2.8 3 6.2 4.5 10 4.5s7.2-1.5 10-4.5"
          stroke="#5389BB"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M17 22.5c4.3-3.7 9-5.6 14-5.6"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M61 22.5c-4.3-3.7-9-5.6-14-5.6"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <SiteHeader />
      <main id="main" role="main">
        <section aria-label="404" className="py-[var(--space-section)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
            <div className="mx-auto w-full max-w-[880px] text-right md:text-center">
              <CuteLostIcon />

              <p className="mt-8 text-[14px] font-semibold tracking-[0.22em] text-black/60">
                404
              </p>

              <h1 className="mt-3 text-balance text-[42px] font-semibold leading-[1.05] text-black sm:text-[56px] lg:text-[64px]">
                אופס… זה לא הדף שחיפשתם.
              </h1>

              <p className="mt-5 text-pretty text-[18px] font-semibold leading-[34px] text-[color:var(--vow-muted)] sm:text-[20px] sm:leading-[36px]">
                יכול להיות שלחצתם על קישור ישן, או שהדף החליט לצאת להפסקת קפה בלי להודיע.
                <br className="hidden sm:block" />
                בכל מקרה - אנחנו כאן כדי להחזיר אתכם למסלול.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/" className="vow-btn-secondary w-full justify-center sm:w-auto">
                  חזרה לעמוד הבית
                </Link>
                <a
                  href="https://app.uxellent.com"
                  className="vow-btn-primary w-full justify-center sm:w-auto"
                >
                  להצטרפות לחשבונית דיגיטלית מאובטחת - שנה חינם
                </a>
              </div>

              <div className="mt-10 rounded-2xl bg-white border border-black/[0.07] px-6 py-6 text-right md:text-center">
                <p className="text-[18px] font-semibold text-black">
                  טיפ קטן:
                </p>
                <p className="mt-2 text-[16px] leading-[28px] text-black/80">
                  אם הגעתם לכאן מתוך האתר - כנראה מצאנו באג. זה בדיוק סוג הדברים שאנחנו מתקנים מהר.
                </p>
                <div className="mt-4">
                  <Link href="/contact" className="underline font-semibold text-black hover:text-[#5389BB] transition-colors">
                    ספרו לנו מה ניסיתם לפתוח
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

