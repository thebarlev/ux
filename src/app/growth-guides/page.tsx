import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { ServiceHero } from "@/app/_components/services/ServiceHero"
import { JsonLd, itemListSchema, webPageSchema } from "@/components/JsonLd"
import { H2, H3 } from "@/components/ui/Heading"

import { growthGuidesHe } from "./growthGuides.data"

export const metadata: Metadata = {
  title: "מדריכי צמיחה | SEO, לידים ותנועה לעסקים",
  description:
    "מדריכי צמיחה של Uxellent על SEO, לידים, קידום אונליין ותנועה אורגנית לעסקים שרוצים יותר לקוחות.",
  alternates: {
    canonical: "/growth-guides",
    languages: heEnAlternateLanguages("/growth-guides", "/en/growth-guides"),
  },
  openGraph: {
    title: "מדריכי צמיחה של Uxellent | Uxellent",
    description:
      "מדריכי צמיחה קצרים ומדויקים של Uxellent על SEO, תנועה, לידים, קידום אונליין וצמיחה דיגיטלית לעסקים.",
    url: "/growth-guides",
    type: "website",
  },
}

export default function GrowthGuidesIndexPageHe() {
  const pageUrl = "https://uxellent.com/growth-guides"

  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <JsonLd
        data={webPageSchema({
          name: "מדריכי צמיחה של Uxellent",
          description:
            "מדריכי צמיחה קצרים ומדויקים של Uxellent על SEO, תנועה, לידים, קידום אונליין וצמיחה דיגיטלית לעסקים.",
          url: pageUrl,
        })}
      />
      <JsonLd
        data={itemListSchema({
          name: "מדריכי צמיחה של Uxellent",
          url: pageUrl,
          items: growthGuidesHe.map((guide) => ({
            name: guide.keyword,
            url: `https://uxellent.com/growth-guides/${guide.slug}`,
          })),
        })}
      />
      <SiteHeader />
      <main id="main" role="main">
        <ServiceHero
          title="מדריכי צמיחה של Uxellent"
          subtitle="מדריכים קצרים ומדויקים על SEO, תנועה, לידים וקידום דיגיטלי לעסקים שרוצים לגדול נכון."
          tags={["SEO", "תנועה", "לידים", "צמיחה דיגיטלית"]}
          ctaLabel="לצפייה במדריכים"
          ctaSource="digital_marketing"
          ctaHref="#guide-grid-he"
          imageSrc="/new-hero.webp"
          imageAlt="מדריכי צמיחה של Uxellent"
        />

        <section
          id="guide-grid-he"
          aria-label="רשימת מדריכי צמיחה"
          className="py-[var(--space-section)] bg-[#F4F1EC]"
          dir="rtl"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
            <div className="mx-auto w-full max-w-[1120px]">
              <div className="max-w-[760px] text-right">
                <H2 className="text-balance tracking-[-0.2px] text-right">
                  מדריכי צמיחה שמחברים בין חיפוש, מסר ותוצאה עסקית
                </H2>
                <p className="mt-5">
                  כל מדריך בנוי סביב שאלה אמיתית של בעלי עסקים: איך להביא תנועה,
                  איך לשפר SEO, איך לקבל לידים ואיך להגדיל צמיחה דיגיטלית בלי להתפזר.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {growthGuidesHe.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/growth-guides/${guide.slug}`}
                    className="rounded-2xl border border-black/[0.07] bg-white px-6 py-6 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <H3 className="block text-black">
                      {guide.keyword}
                    </H3>
                    <span className="mt-4 block text-[17px] leading-[28px] text-[color:var(--vow-muted)]">
                      {guide.shortDescription}
                    </span>
                    <span className="mt-6 inline-flex text-[16px] font-semibold leading-[24px] text-[#5389BB]">
                      לקריאת המדריך
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DoubleHeadingCtaSection
          title="רוצים להפוך ידע לביצוע?"
          subtitle="נחבר בין SEO, תוכן ונראות ב־AI כדי לבנות תוכנית צמיחה מסודרת לעסק."
          buttonLabel="לעמוד SEO / AI"
          buttonSource="digital_marketing"
          buttonHref="/seo-ai"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
