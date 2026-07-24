import type { Metadata } from "next"
import Image from "next/image"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { H2, H3 } from "@/components/ui/Heading"

export const metadata: Metadata = {
  title: "אודות Uxellent | פיתוח, SEO ושיווק דיגיטלי",
  description: "הכירו את Uxellent, חברה לפיתוח אתרים, אוטומציות, SEO ושיווק דיגיטלי לעסקים שרוצים לגדול עם תשתית טכנולוגית נכונה.",
  alternates: {
    canonical: "/about",
    languages: heEnAlternateLanguages("/about", "/en/about"),
  },
}

/* ─── קבועים ─── */
const WRAP_NARROW = "mx-auto max-w-[950px] px-2 sm:px-6"
const WRAP_MID    = "mx-auto max-w-[660px] px-4 sm:px-6"
const LABEL       = "block text-[14px] font-semibold uppercase tracking-[0.22em] text-[#000000] mb-4"

const SERVICES = [
  {
    num: "1",
    title: "פיתוח אתרים ומערכות",
    body: "אתרי תדמית, מערכות SaaS ופלטפורמות מורכבות - עם חשיבה מוצרית. לא רק איך זה נראה, אלא איך זה עובד ומייצר ערך.",
  },
  {
    num: "2",
    title: "אוטומציות עסקיות",
    body: "מזהים תהליכים ידניים שחוזרים על עצמם והופכים אותם למערכות חכמות. פחות טעויות, יותר שליטה.",
  },
  {
    num: "3",
    title: "שיווק מבוסס נתונים",
    body: "לא קמפיינים - מנועי ROI. הכל נמדד, הכל מחובר, הכל מבוסס דאטה.",
  },
  {
    num: "4",
    title: "חשבונית דיגיטלית מאובטחת",
    body: "יצירת חשבוניות, קבלות והצעות מחיר בצורה חכמה ומהירה - שנה שלמה חינם לכל עסק.",
  },
  {
    num: "5",
    title: "רואה חשבון AI",
    body: "יודע מס הכנסה, מע״מ וביטוח לאומי - ומאתר לך הזדמנויות וחיסכון אוטומטית.",
  },
]

const CLIENTS = [
  "אלטשולר שחם", "ישראכרט", "BuyMe", "carrefour", "eufy", "ANKER", "לאומי קארד", "Horizon",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <SiteHeader />
      <main id="main" role="main">

        {/* ════ HERO - ממורכז ════ */}
        <section className="pt-10 pb-7 sm:pt-28 sm:pb-18 lg:pt-16 lg:pb-12 text-center">
          <div className={WRAP_NARROW}>
            <span className={LABEL}>אודות Uxellent</span>
            <h1 className="text-[38px] font-semibold leading-[1.1] text-black sm:text-[52px] lg:text-[64px]">
              אודות Uxellent - פיתוח ושיווק דיגיטלי
            </h1>
            <p className="mt-5 text-[24px] leading-[28px] text-[#000000] sm:text-[22px] sm:leading-[32px]">
              רוב העסקים לא נכשלים בגלל חוסר רעיון - הם נתקעים
              <br className="hidden sm:block" />
              בגלל חוסר בפתרון טכנולוגי. אנחנו כאן לפתור את זה.
            </p>
          </div>
        </section>

        {/* ════ SERVICES ════ */}
        <section className="pb-12" aria-labelledby="services-heading">
  <div className={WRAP_MID}>
    <H2 id="services-heading" className="mb-6 text-right">
      השירותים שלנו
    </H2>
    <div className="rounded-2xl bg-white border border-black/[0.07] overflow-hidden">
      {SERVICES.map((s, i) => (
        <div key={s.num}>
          <div className="flex items-center gap-5 px-6 py-5 sm:px-8 sm:py-6 hover:bg-[#fafafa] transition-colors">
            {/* מספר - ראשון ב-DOM = ימין ב-RTL */}
            <span className="shrink-0 text-[24px] font-semibold text-[#5389BB] tabular-nums pt-[3px] min-w-[24px] text-right">
              {s.num}
            </span>
            {/* תוכן */}
            <div className="flex-1 text-right">
              <H3 className="mb-1 text-[20px] leading-snug text-black sm:text-[24px]">
                {s.title}
              </H3>
              <p className="text-[18px] sm:text-[20px] leading-[26px] text-[#000000]">
                {s.body}
              </p>
            </div>
          </div>
          {i < SERVICES.length - 1 && (
            <div className="border-t border-black/[0.06] mx-6 sm:mx-8" />
          )}
        </div>
      ))}
    </div>
  </div>
</section>

        {/* ════ WHY - ממורכז ════ */}
        <section className="py-4 sm:py-5">
          <div className={WRAP_NARROW}>
            <div className="rounded-2xl bg-white border border-black/[0.07] px-8 py-4 sm:px-12 sm:py-14 text-center">
              <H2 className="mb-5">
                עסקים צריכים פתרונות. לא עוד ספק.
              </H2>
              <p className="text-[17px] leading-[28px] text-[#000000] sm:text-[20px] sm:leading-[30px] mx-auto">
                אחרי יותר מ־20 שנה בעולמות האפיון, הפיתוח וניהול המוצר - הצטברה תובנה אחת:
                הטכנולוגיה התקדמה, AI שינה את חוקי המשחק, אבל רוב בעלי העסקים עדיין עובדים בשיטות
                של עשור קודם. Uxellent הוקמה כדי לסגור את הפער - כבר עכשיו.
              </p>
            </div>
          </div>
        </section>

        {/* ════ FOUNDER - ממורכז עם תמונה ════ */}
        <section className="lg:py-0 py-3 sm:py-14">
  <div className={WRAP_NARROW}>
    <div className="rounded-2xl px-8 py-4 sm:px-14 sm:py-16 text-center">
    <span className={LABEL}>מייסד</span>

      {/* תמונה */}
      <div className="mx-auto mb-4 h-[160px] w-[160px] rounded-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src="/team/itzik.webp"
            alt="Itzik Barlev - Uxellent founder, digital marketing and website development expert"
            fill
            sizes="160px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <H2 className="mb-1 pb-1 lg:py-0">
        איציק ברלב
      </H2>
      <p className="  text-[20px] text-black mb-6 leading-relaxed text-center mx-auto">
        למעלה מ־20 שנה באפיון, UX, פיתוח וניהול מוצר. ארבע שנים באיטליה, שמונה שנים ב־MAX (לאומי קארד).<br />
        <span className="font-medium">עסק שלא מחובר לטכנולוגיה חכמה - נשאר מאחור.</span>
      </p>

      {/* תגיות לקוחות */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CLIENTS.map((co) => (
          <span
            key={co}
            className="rounded-full bg-white px-8 py-[8px] text-[20px] font-medium text-black"
          >
            {co}
          </span>
        ))}
      </div>

    </div>
  </div>
</section>

        {/* ════ CTA - השאירו פרטים ════ */}
        <section className=" lg:py-1 py-0 sm:py-17 lg:pb-19">
          <div className={WRAP_NARROW}>
            <div className="rounded-2xl bg-white border border-black/[0.07] px-8 py-4 sm:px-14 sm:py-16 text-center">
              <H2 className="mb-4">
                השאירו פרטים
              </H2>
              <p className="text-[18px] leading-[24px] text-[#000000] sm:text-[18px] sm:leading-[30px] max-w-[690px] mx-auto mb-8">
                אם אתם בתחילת הדרך - אנחנו מציעים פתרון מלא הכולל מיתוג, אתר ונגישות דיגיטליים מוכנים להשקה.{" "}
                <a href="/portfolio" className="text-[#5389BB] underline hover:no-underline">דוגמאות מהעבודות</a>
                {" "}- כך תוכלו לצאת לשוק מהר, נכון ועם ראות מקצועית.
              </p>
              <a
                href="/contact"
                className="inline-block bg-black text-white text-[15px] font-semibold px-10 py-[14px] rounded-full hover:bg-[#5389BB] transition-colors duration-200"
              >
                בואו נבנה את המותג שלכם
              </a>
            </div>
          </div>
        </section>

        {/* ════ TICKER - פס טקסט רץ ════ */}
        <div
          className="overflow-hidden border-y border-black/[0.08] bg-white py-4 mb-0"
          aria-hidden="true"
        >
          <style>{`
            @keyframes ticker-rtl {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            .ticker-track {
              display: flex;
              width: max-content;
              animation: ticker-rtl 28s linear infinite;
            }
            .ticker-track:hover { animation-play-state: paused; }
          `}</style>
          <div className="ticker-track">
            {[...Array(2)].map((_, gi) => (
              <div key={gi} className="flex items-center gap-0">
                {[
                  "פיתוח AI", "אוטומציות", "שיווק מדיד",
                  "חשבונית דיגיטלית", "רו״ח AI", "UX מתקדם",
                  "מערכות SaaS", "צמיחה עסקית", "דאטה חכם",
                ].map((item, idx) => (
                  <span
                    key={`${gi}-${idx}`}
                    className="flex items-center gap-4 px-6 text-[18px] font-medium text-black/70 whitespace-nowrap"
                  >
                    {item}
                    <span className="text-[#5389BB] text-[10px]">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}