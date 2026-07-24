import Link from "next/link"

import { growthGuides, getGrowthGuideTopic } from "@/lib/growth-guides/topics"
import { growthGuidesHe } from "@/app/growth-guides/growthGuides.data"
import { H2, H3 } from "@/components/ui/Heading"

type RelatedGuidesProps = {
  currentSlug: string
  locale?: "en" | "he"
}

function getRelatedSlugs(currentSlug: string, limit: number) {
  const current = getGrowthGuideTopic(currentSlug)
  if (!current) return []

  const explicit = current.related.filter((slug) => slug !== currentSlug)
  const seen = new Set([currentSlug, ...explicit])
  const fallback = growthGuides.map((guide) => guide.slug).filter((slug) => !seen.has(slug))
  return [...explicit, ...fallback].slice(0, limit)
}

export function RelatedGuides({
  currentSlug,
  locale = "en",
}: RelatedGuidesProps) {
  const relatedSlugs = getRelatedSlugs(currentSlug, 4)
  const isEn = locale === "en"

  const items = relatedSlugs
    .map((slug) =>
      isEn
        ? growthGuides.find((guide) => guide.slug === slug)
        : growthGuidesHe.find((guide) => guide.slug === slug)
    )
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  if (!items.length) return null

  return (
    <section
      aria-label={isEn ? "More guides" : "עוד מדריכים"}
      className="py-[var(--space-section)] bg-[#F4F1EC]"
      dir={isEn ? "ltr" : "rtl"}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className={`mx-auto w-full max-w-[1120px] ${isEn ? "text-left" : "text-right"}`}>
          <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${isEn ? "" : "sm:flex-row-reverse"}`}>
            <div>
              <H2 className="text-balance tracking-[-0.2px]">
                {isEn ? "More Guides" : "עוד מדריכים"}
              </H2>
              <H3 className="mt-4">
                {isEn
                  ? "Explore additional growth guides that help connect traffic, SEO, leads, and online growth."
                  : "המשך לקרוא מדריכים נוספים שמחברים בין SEO, תנועה, לידים וצמיחה דיגיטלית."}
              </H3>
            </div>

            <Link
              href={isEn ? "/en/growth-guides" : "/growth-guides"}
              className="text-[18px] font-semibold text-[#5389BB] underline hover:no-underline"
            >
              {isEn ? "All guides" : "לכל המדריכים"}
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={isEn ? `/en/growth-guides/${item.slug}` : `/growth-guides/${item.slug}`}
                className="rounded-2xl border border-black/[0.07] bg-white px-6 py-6 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <H3 className="text-black">
                  {"keyword" in item ? item.keyword : item.title}
                </H3>
                <p className="mt-4 text-[18px] leading-[28px] text-black">
                  {"shortDescription" in item ? item.shortDescription : item.description}
                </p>
                <span className="mt-6 inline-flex text-[16px] font-semibold leading-[24px] text-[#5389BB]">
                  {isEn ? "Read guide" : "לקריאת המדריך"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
