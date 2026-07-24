import type { ReactNode } from "react"
import { H2, H3 } from "@/components/ui/Heading"

export type SeoAiProcessStep = {
  id: string
  number: string
  title: ReactNode
  description: ReactNode
  timing: ReactNode
}

const STEPS_HE: readonly SeoAiProcessStep[] = [
  {
    id: "seo-ai-step-1",
    number: "1",
    title: "אבחון קידום אתרים ויכולת הדירוג של האתר",
    description:
      "אנחנו סורקים תוכן, מבנה, מהירות, כוונת חיפוש ותחרות כדי להבין מה עוצר קידום עסקים בגוגל ובמנועי AI.",
    timing: "יום 1–3",
  },
  {
    id: "seo-ai-step-2",
    number: "2",
    title: "תוכנית קידום אורגני חודשית עם סדר עדיפויות ברור",
    description:
      "מגדירים אילו עמודים לקדם, אילו תכנים לכתוב ואילו שיפורים יבנו קידום אורגני בגוגל בצורה מדידה ולא אקראית.",
    timing: "שבוע 1",
  },
  {
    id: "seo-ai-step-3",
    number: "3",
    title: "ביצוע שיפורי תוכן, FAQ ותשתית SEO בפועל",
    description:
      "משדרגים עמודי שירות, שאלות נפוצות, סכמות וקישורים פנימיים כדי לחזק קידום אתרים SEO גם בגוגל וגם במנועי AI.",
    timing: "שבוע 2–4",
  },
  {
    id: "seo-ai-step-4",
    number: "4",
    title: "מדידה עסקית, לידים ושיפור מתמשך",
    description:
      "בסוף כל חודש רואים אילו שינויים הביאו יותר תנועה, פניות ולידים, ומה יקדם את העסק עוד צעד קדימה.",
    timing: "סוף כל חודש",
  },
] as const

const STEPS_EN: readonly SeoAiProcessStep[] = [
  {
    id: "seo-ai-step-1",
    number: "1",
    title: "Pages built to rank in Google & AI",
    description:
      "Deep scan of your site: content, structure, speed, AI readiness, competition. ",
    timing: "Weekly",
  },
  {
    id: "seo-ai-step-2",
    number: "2",
    title: "Content optimized for ChatGPT answers",
    description:
      "Clear plan. Actual execution. Measurable results. No reports.",
    timing: "Weekly",
  },
  {
    id: "seo-ai-step-3",
    number: "3",
    title: "Ongoing growth system (not one-time SEO)",
    description:
      "Upgrade content, structure, service pages, FAQs, schemas. Optimize for Google and AI engines. We do it, not just recommend.",
    timing: "Weekly",
  },
  {
    id: "seo-ai-step-4",
    number: "4",
    title: "Measurable increase in traffic & leads",
    description:
      "Every month end: how much traffic came, what improved, what's next. Full transparency always.",
    timing: "Weekly",
  },
] as const

export function SeoAiProcessSteps({
  locale = "he",
  label,
  title,
  subtitle,
  steps,
}: {
  locale?: "he" | "en"
  label?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  steps?: readonly SeoAiProcessStep[]
}) {
  const isLtr = locale === "en"
  const resolvedSteps = steps ?? (isLtr ? STEPS_EN : STEPS_HE)
  return (
    <section aria-label={isLtr ? "Process" : "התהליך"} className="py-[var(--space-section)] bg-[#F4F1EC]" dir={isLtr ? "ltr" : "rtl"}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="mx-auto w-full max-w-[620px] rounded-3xl bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
          <div className={isLtr ? "text-left" : "text-right"}>
            <div className="text-[#5389BB] text-[14px] font-semibold">{label ?? (isLtr ? "Process" : "התהליך")}</div>
            <H2 className={`mt-2 ${isLtr ? "text-left" : "text-right"}`}>
              {title ?? (isLtr ? "What you actually get" : "איך נראה קידום אורגני בגוגל וב-AI מהיום הראשון")}
            </H2>
            <H3 className="mt-3">
              {subtitle ?? (isLtr ? "Full transparency. Every month you know exactly what was done and what's next." : "שיווק דיגיטלי לעסקים לא חייב להישען רק על קידום ממומן. אנחנו בונים תהליך ברור של מחקר, תוכן, שדרוג אתר ומדידה.")}
            </H3>
          </div>

          <div className="relative mt-10">
            <div className={`absolute top-2 bottom-2 w-px bg-[#B8CFE4] ${isLtr ? "left-6" : "right-6"}`} aria-hidden="true" />

            <div className="space-y-10">
              {resolvedSteps.map((step) => (
                <div key={step.id} className={`relative ${isLtr ? "pl-20 text-left" : "pr-20 text-right"}`}>
                  <div
                    className={`absolute top-0 flex h-10 w-10 items-center justify-center rounded-md bg-[#5389BB] text-white text-[14px] font-semibold ${isLtr ? "left-2" : "right-2"}`}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>

                  <div className="text-[#5389BB] text-[20px] font-semibold leading-[28px] sm:text-[20px]">
                    {step.title}
                  </div>
                  <div className="mt-1 text-[20px] leading-[24px] text-black/80 sm:text-[20px]">
                    {step.description}
                  </div>
                  <div className="mt-2 text-[#5389BB] text-[16px] font-semibold">
                    {step.timing}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

