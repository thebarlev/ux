import { H2 } from "@/components/ui/Heading"
import { PortfolioGrid } from "./PortfolioGrid"
import type { PortfolioImage } from "./portfolioImages"

type PortfolioWorksSectionProps = {
  images: PortfolioImage[]
  locale?: "he" | "en"
  title?: string
  subtitle?: string
}

const DEFAULT_COPY = {
  he: {
    sectionLabel: "עבודות נבחרות",
    title: "עבודות אמיתיות שמראות איך נראות תוצאות",
    subtitle:
      "אתרים, דפי נחיתה ומערכות שבנינו כדי לחבר בין עיצוב, ביצועים, SEO וצמיחה עסקית בפועל.",
  },
  en: {
    sectionLabel: "Selected work",
    title: "Real work that shows what strong execution looks like",
    subtitle:
      "A selection of websites, landing pages, and growth-focused builds designed to combine performance, SEO, and commercial clarity.",
  },
} as const

export function PortfolioWorksSection({
  images,
  locale = "he",
  title,
  subtitle,
}: PortfolioWorksSectionProps) {
  const copy = DEFAULT_COPY[locale]

  if (!images.length) return null

  return (
    <section
      aria-label={copy.sectionLabel}
      className="bg-[#F4F1EC] py-[var(--space-section)]"
      dir={locale === "en" ? "ltr" : "rtl"}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className={locale === "en" ? "mx-auto max-w-[900px] text-center" : "mx-auto max-w-[900px] text-center"}>
          <H2>{title ?? copy.title}</H2>
          <p className="mx-auto mt-4 max-w-[760px] text-[18px] leading-[30px] text-[color:var(--vow-muted)] sm:text-[20px] sm:leading-[32px]">
            {subtitle ?? copy.subtitle}
          </p>
        </div>
        <div className="mt-10">
          <PortfolioGrid images={images} />
        </div>
      </div>
    </section>
  )
}
