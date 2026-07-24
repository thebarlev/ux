import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Fragment } from "react"

import { seoAiConfigEn } from "@/app/en/_config/seoAiConfigEn"
import { PortfolioWorksSection } from "@/app/_components/portfolio/PortfolioWorksSection"
import { getPortfolioImages } from "@/app/_components/portfolio/portfolioImages"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { SEO_AI_PRICING_EN } from "@/app/en/_config/seoAiPricingEn"
import { SeoAiTemplateEn } from "@/app/en/_components/SeoAiTemplateEn"
import { InlineLeadForm } from "@/app/_components/leads/InlineLeadForm"
import { JsonLd, faqPageSchema } from "@/components/JsonLd"

const DailyExecutionBlock = dynamic(
  () => import("@/components/marketing/DailyExecutionBlock").then((m) => m.DailyExecutionBlock),
  { ssr: true },
)
const GrowthGuidesCard = dynamic(
  () => import("@/components/marketing/GrowthGuidesCard").then((m) => m.GrowthGuidesCard),
  { ssr: true },
)

export const metadata: Metadata = {
  ...seoAiConfigEn.metadata,
  alternates: {
    ...seoAiConfigEn.metadata.alternates,
    canonical: "/en/seo-ai",
    languages: heEnAlternateLanguages("/seo-ai", "/en/seo-ai"),
  },
}

export default function SeoAiPageEn() {
  const faqItems = seoAiConfigEn.faq?.items ?? []
  const portfolioImages = getPortfolioImages("en")

  return (
    <>
      {faqItems.length ? (
        <JsonLd
          data={faqPageSchema(
            faqItems.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          )}
        />
      ) : null}
      <SeoAiTemplateEn
        hero={{
          ...seoAiConfigEn.hero,
          subtitle: (
            <>
              We deliver
              {" "}
              <a
                href="https://uxellent.com/en/seo-ai"
                className="text-[#5389BB] underline hover:no-underline"
              >
                SEO services
              </a>
              {" "}
              that combine engine optimization, seo optimisation, and AI search visibility so your business shows up where customers actually look.
            </>
          ),
          ariaLabel: seoAiConfigEn.hero.title,
          ctaHref: "#price",
        }}
        heroTitle={<>Get your business to appear in Google & AI answers</>}
        trustHeading={{
          title: "A seo agency trusted by brands that care about revenue",
          description: (
            <>
              Join the brands that trust our
              {" "}
              <a
                href="https://uxellent.com/en/seo-ai"
                className="text-[#5389BB] underline hover:no-underline"
              >
                AI SEO
              </a>
              {" "}
              execution to drive visibility, traffic, and real results.
            </>
          ),
        }}
        postLogoContent={
          <DailyExecutionBlock
            title="Daily & weekly growth execution (not just strategy)"
            subtitle="We actively grow your visibility every day."
            bullets={[
              {
                label: "Daily execution",
                description: "Daily execution: we improve pages, content, and AI visibility signals",
              },
              {
                label: "Weekly growth pushes",
                description: "Weekly growth pushes: new pages, new keywords, new opportunities",
              },
            ]}
            closingLine="More visibility → more clicks → more customers."
            imageSrc="/services/d-green-invocie.webp"
            imageAlt="Daily SEO and AI visibility execution by Uxellent"
          />
        }
        stats={{
          title: "What engine optimization changes in the first few months",
          subtitle:
            "The first phase focuses on stronger visibility, more qualified leads, and clearer SEO momentum across Google and AI search.",
        }}
        process={{
          title: "What you actually get from seo optimisation for website growth",
          subtitle:
            "Clear delivery across keyword search engine optimization, content, structure, and measurement with no guesswork.",
        }}
        heroSubtitleClassName="mt-5 text-[22px] font-semibold leading-[28px] text-[color:var(--vow-muted)]"
        vision={{
          title: seoAiConfigEn.vision?.title,
          subtitle: seoAiConfigEn.vision?.subtitle,
          ctaLabel: seoAiConfigEn.vision?.ctaLabel,
          ctaHref: seoAiConfigEn.vision?.ctaHref,
          source: seoAiConfigEn.vision?.source,
          cards: seoAiConfigEn.vision?.cards,
        }}
        about={
          seoAiConfigEn.about
            ? {
                title: seoAiConfigEn.about.title,
                subtitle: seoAiConfigEn.about.subtitle,
                ctaLabel: seoAiConfigEn.about.ctaLabel,
                ctaSource: seoAiConfigEn.about.ctaSource,
                ctaHref: seoAiConfigEn.about.ctaHref,
                items: seoAiConfigEn.about.items,
              }
            : undefined
        }
        price={{
          id: "price",
          title: "Plans & pricing",
          subtitle: "Choose the plan that fits your business stage. Upgrade anytime.",
          plans: SEO_AI_PRICING_EN,
          variant: "seo-ai",
        }}
        doubleHeading={{
          ...seoAiConfigEn.doubleHeading,
          buttonHref: "#price",
        }}
        faq={seoAiConfigEn.faq}
        afterPackages={
          <InlineLeadForm
            title="Get in touch"
            subtitle="Tell us briefly about your site and goals-we will follow up with next steps on Google & AI visibility."
            pagePathOverride="/en/seo-ai"
            source="digital_marketing"
            locale="en"
            anchorId="lead-seo-ai-en"
          />
        }
        extraContent={
          <Fragment>
            <PortfolioWorksSection
              locale="en"
              images={portfolioImages}
              title="Selected work behind our SEO, AI, and website execution"
              subtitle="Real client builds across websites, landing pages, and growth projects that show the level of execution behind our SEO and AI work."
            />
            <GrowthGuidesCard
              title="Growth Guides"
              description="Practical guides on traffic, SEO, and customer acquisition to help you grow faster."
              links={[
                { href: "/en/growth-guides/how-to-get-traffic-to-my-website", label: "How to Get Traffic to Your Website" },
                { href: "/en/growth-guides/how-to-get-customers-online", label: "How to Get Customers Online" },
              ]}
              indexLink={{ href: "/en/growth-guides", label: "All Growth Guides" }}
            />
          </Fragment>
        }
      />
    </>
  )
}
