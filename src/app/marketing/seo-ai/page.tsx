import type { Metadata } from "next"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { ServiceHero } from "@/app/_components/services/ServiceHero"
import { H2 } from "@/components/ui/Heading"

export const metadata: Metadata = {
  title: "SEO אורגני ו-AI Search | Uxellent",
  description:
    "SEO אורגני ו-AI Search לעסקים עם אופטימיזציה טכנית, תוכן ומדידה שמחזקים הופעות, תנועה ולידים.",
  alternates: {
    canonical: "/marketing/seo-ai",
  },
  openGraph: {
    title: "שיווק אורגני SEO / AI | Uxellent",
    description:
      "בונים נוכחות אורגנית שמייצרת לידים לאורך זמן: SEO טכני, תוכן, מדידה והתאמה למנועי חיפוש בעידן ה‑AI.",
    url: "/seo-ai",
    type: "website",
  },
}

const QA_SECTIONS = [
  {
    id: "seo-ai-what",
    question: "מה זה SEO בעידן AI?",
    answer: [
      "פעם קידום אורגני היה בעיקר משחק של מילות מפתח וקישורים. היום, חלק גדול מהחיפוש מתרחש בתוך תשובות (Google AI Overviews, מנועי AI וצ׳אטים), ולכן צריך לבנות אתר שנוח למנוע להבין, לצטט ולהמליץ עליו.",
      "SEO בעידן AI הוא שילוב של 3 שכבות שעובדות יחד: תשתית טכנית נקייה, תוכן שמספק תשובות אמיתיות, וסמכות (אוטוריטה) שמגובה בנתונים וחוויית משתמש.",
    ],
    bullets: [
      "מבנה אתר ותוכן שמאפשרים למנועי AI להבין הקשר (Entities + Intent).",
      "דפים שמייצרים אמון: הוכחות, מומחיות, ושפה ברורה ללקוח.",
      "מדידה: לא רק טראפיק - אלא איכות ליד, יחס סגירה והכנסות.",
    ],
  },
  {
    id: "seo-ai-90-days",
    question: "איך נראית תוכנית 90 יום?",
    answer: [
      "אנחנו עובדים בספרינטים קצרים עם יעד ברור לכל שלב. לא \"נחכה לגוגל\" - נבנה תהליך שמייצר שיפור מצטבר ומדיד.",
    ],
    bullets: [
      "ימים 1–15: מיפוי יעדים, מחקר כוונות חיפוש, בדיקת טכני + אינדוקס, ותעדוף.",
      "ימים 16–45: תיקונים טכניים, שדרוג תבניות (כותרות/סכמה), ותוכן בסיסי שמכסה את ה‑intent.",
      "ימים 46–75: הרחבת תוכן לפי שאלות לקוח, שיפור CTR, וחיזוק סמכות (קישורים/אזכורים איכותיים).",
      "ימים 76–90: אופטימיזציה לפי דאטה, זיקוק דפים שמייצרים לידים, ותוכנית המשך ל‑6 חודשים.",
    ],
  },
  {
    id: "seo-ai-measure",
    question: "מה מודדים?",
    answer: [
      "כדי ש‑SEO יהיה מנוע צמיחה ולא תחביב - מודדים אותו כמו מוצר. המדדים צריכים להתחבר ללידים, מכירות ורווחיות.",
    ],
    bullets: [
      "נראות: אימפרשנים, מיקומים, CTR ודפים שמופיעים בתשובות.",
      "איכות: זמן בדף, מעורבות, והתקדמות במשפך.",
      "תוצאה עסקית: לידים, איכות ליד, יחס סגירה, CAC ו‑LTV (כשאפשר).",
      "ביצועים: מהירות, Core Web Vitals, שגיאות אינדוקס ותקלות טכניות.",
    ],
  },
] as const

const FAQ_ITEMS = [
  {
    id: "seo-ai-faq-1",
    question: "מתי רואים תוצאות ב‑SEO?",
    answer:
      "בד״כ רואים שיפור ראשון בתוך 4–8 שבועות, ותוצאות משמעותיות יותר אחרי 3–6 חודשים. זה תלוי בתחרות, מצב האתר היום והיקף העבודה.",
  },
  {
    id: "seo-ai-faq-2",
    question: "האם צריך בלוג כדי להצליח?",
    answer:
      "לא תמיד. המטרה היא כיסוי כוונת חיפוש. לפעמים דפי שירות/מוצר חזקים + שאלות ותשובות יעשו עבודה מצוינת. בלוג הוא כלי - לא חובה.",
  },
  {
    id: "seo-ai-faq-3",
    question: "איך AI משפיע על התנועה לאתר?",
    answer:
      "חלק מהחיפושים מקבלים תשובה ישירה ולכן פחות קליקים. מצד שני, מי שכן נכנס - מגיע עם יותר כוונה. לכן אנחנו מתמקדים גם בנראות וגם באיכות הליד.",
  },
  {
    id: "seo-ai-faq-4",
    question: "אתם מטפלים גם ב‑SEO טכני וגם בתוכן?",
    answer:
      "כן. טכני (אינדוקס, מבנה, סכמה, ביצועים), תוכן (מסרים, היררכיה, שאלות), ומדידה - כחבילה אחת שמחוברת לתוצאה.",
  },
] as const

export default function MarketingSeoAiPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <SiteHeader />
      <main id="main" role="main">
        <ServiceHero
          title="שיווק אורגני SEO / AI"
          subtitle="בונים נוכחות אורגנית שמייצרת לידים לאורך זמן - עם תשתית טכנית, תוכן שממיר, ומדידה שמחוברת לעסק."
          tags={["SEO טכני", "תוכן ותשובות", "AI Search", "אנליטיקס"]}
          ctaLabel="להשארת פרטים"
          ctaSource="digital_marketing"
          imageSrc="/services/marketing/3.webp"
          imageAlt="שיווק אורגני SEO / AI"
        />

        {/* Q&A sections */}
        {QA_SECTIONS.map((section) => (
          <section
            key={section.id}
            aria-label={section.question}
            className="py-[var(--space-section)] bg-[#F4F1EC]"
            dir="rtl"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
              <div className="mx-auto w-full max-w-[900px] text-right">
                <H2 className="text-balance tracking-[-0.2px]">
                  {section.question}
                </H2>

                <div className="mt-6 space-y-4 text-[18px] leading-[30px] text-black">
                  {section.answer.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <ul className="mt-6 space-y-2 rounded-2xl bg-white border border-black/[0.07] px-6 py-6 text-[18px] leading-[28px] text-black">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#5389BB]" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <ServiceFaqSection title="שאלות נפוצות על SEO / AI" items={[...FAQ_ITEMS]} />

        <DoubleHeadingCtaSection
          title="רוצים לבנות מנוע צמיחה אורגני?"
          subtitle="אם אתם רוצים תהליך מסודר שמחבר טכני, תוכן ומדידה ל‑ROI - נשמח לבדוק יחד מה הכי נכון לעסק שלכם."
          buttonLabel="להשארת פרטים"
          buttonSource="digital_marketing"
        />
      </main>
      <SiteFooter />
    </div>
  )
}

