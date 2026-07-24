import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ServiceHero } from "@/app/_components/services/ServiceHero"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { JsonLd, itemListSchema, webPageSchema } from "@/components/JsonLd"
import { H2, H3 } from "@/components/ui/Heading"
import { growthGuides } from "@/lib/growth-guides/topics"

const GUIDE_CARD_IMAGES = [
  "/services/seo-ai/1.webp",
  "/services/seo-ai/2.webp",
  "/services/seo-ai/3.webp",
  "/services/seo-ai/4.webp",
] as const

export const metadata: Metadata = {
  title: "Growth Guides | SEO, Leads, Traffic & AI Search",
  description:
    "Explore Uxellent growth guides on SEO, AI search, traffic, leads, and customer acquisition for growing businesses.",
  alternates: {
    canonical: "/en/growth-guides",
    languages: heEnAlternateLanguages("/growth-guides", "/en/growth-guides"),
  },
  openGraph: {
    title: "Growth Guides | Learn How to Get Leads, Traffic & Growth",
    description:
      "Explore Growth Guides from Uxellent on how to get leads, traffic, customers, and long-term business growth through SEO and AI search.",
    url: "/en/growth-guides",
    type: "website",
  },
}

export default function GrowthGuidesIndexPageEn() {
  const pageUrl = "https://uxellent.com/en/growth-guides"

  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
      <JsonLd
        data={webPageSchema({
          name: "Growth Guides",
          description:
            "Explore Growth Guides from Uxellent on how to get leads, traffic, customers, and long-term business growth through SEO and AI search.",
          url: pageUrl,
        })}
      />
      <JsonLd
        data={itemListSchema({
          name: "Growth Guides",
          url: pageUrl,
          items: growthGuides.map((guide) => ({
            name: guide.title,
            url: `https://uxellent.com/en/growth-guides/${guide.slug}`,
          })),
        })}
      />
      <div id="main" role="main">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:px-4">
          <div className="mx-auto max-w-[1120px] text-left text-[16px] text-[color:var(--vow-muted)]">
            <Link href="/en" className="hover:text-black transition-colors">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-black">Growth Guides</span>
          </div>
        </nav>

        <ServiceHero
          title="Growth Guides"
          subtitle="Short practical guides on traffic, SEO, leads, and growth systems for businesses that want compounding demand."
          tags={["Traffic", "SEO", "Leads", "Growth"]}
          ctaLabel="Browse guides"
          ctaSource="digital_marketing"
          ctaHref="#growth-guides-grid"
          imageSrc="/new-hero.webp"
          imageAlt="Growth Guides"
          dir="ltr"
        />

        <section
          id="growth-guides-grid"
          aria-label="Growth Guides list"
          className="py-[var(--space-section)] bg-[#F4F1EC]"
          dir="ltr"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
            <div className="mx-auto w-full max-w-[1120px] text-left">
              <H2 className="text-balance tracking-[-0.2px]">
                Actionable guides for traffic, leads, and online growth
              </H2>
              <H3 className="mt-5 max-w-[760px]">
                Growth Guides help you learn how to get traffic to your website, improve website SEO,
                get leads, and build stronger digital growth without relying only on ad spend.
              </H3>

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {growthGuides.map((guide, index) => (
                  <Link
                    key={guide.slug}
                    href={`/en/growth-guides/${guide.slug}`}
                    className="rounded-2xl border border-black/[0.07] bg-white p-4 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white">
                      <Image
                        src={GUIDE_CARD_IMAGES[index % GUIDE_CARD_IMAGES.length]}
                        alt={guide.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-2 pb-2 pt-5">
                      <H3 className="text-black">
                        {guide.title}
                      </H3>
                      <p className="mt-4 line-clamp-3 text-[17px] leading-[28px] text-[color:var(--vow-muted)]">
                        {guide.description}
                      </p>
                      <span className="mt-6 inline-flex text-[16px] font-semibold leading-[24px] text-[#5389BB]">
                        Read guide
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DoubleHeadingCtaSection
          title="Want help turning guides into execution?"
          subtitle="Use Uxellent to turn SEO, content, and AI visibility into a structured growth plan."
          buttonLabel="Explore AI SEO services"
          buttonSource="digital_marketing"
          buttonHref="/en/seo-ai"
          dir="ltr"
        />
      </div>
    </div>
  )
}
