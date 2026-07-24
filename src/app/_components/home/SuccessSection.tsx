import { H2, H3 } from "@/components/ui/Heading"

export function SuccessSection({ locale = "he" }: { locale?: "he" | "en" }) {
  const isEn = locale === "en"
  return (
    <section aria-label={isEn ? "Success" : "הצלחה"} className="py-[var(--space-section)] bg-[#F4F1EC]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4 ">
        <div className="space-y-3">
          <H2 className={isEn ? "text-left sm:text-center" : "text-right sm:text-center"}>
            {isEn ? "Success isn't built by chance" : "מנוע צמיחה עסקי מבוסס SEO ובינה מלאכותית"}
          </H2>
          <H3 className={isEn ? "text-left sm:text-center" : "text-right sm:text-center"}>
            {isEn
              ? "It's built from right decisions, solid foundation, and smart management over time."
              : "אופטימיזציה חכמה (SEO AI) להגדלת המכירות והחשיפה"}
          </H3>
        </div>
      </div>
    </section>
  )
}