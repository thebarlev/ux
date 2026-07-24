import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Fragment } from "react"

import { seoAiConfigEn } from "@/app/en/_config/seoAiConfigEn"
import { PortfolioWorksSection } from "@/app/_components/portfolio/PortfolioWorksSection"
import { getPortfolioImages } from "@/app/_components/portfolio/portfolioImages"
import { SEO_AI_PRICING_EN } from "@/app/en/_config/seoAiPricingEn"
import { SeoAiTemplateEn } from "@/app/en/_components/SeoAiTemplateEn"
import { GrowthGuidesCard } from "@/components/marketing/GrowthGuidesCard"
import { DailyExecutionBlock } from "@/components/marketing/DailyExecutionBlock"
import { campaignSlugs, getCampaign } from "../campaigns"

export const dynamicParams = false

export function generateStaticParams() {
  return campaignSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const campaign = getCampaign(slug)

  if (!campaign) {
    return { title: "Uxellent" }
  }

  return {
    title: campaign.metaTitle,
    description: campaign.metaDescription,
    robots: { index: false, follow: true },
    alternates: {
      canonical: "/en/seo-ai",
    },
    openGraph: {
      title: campaign.metaTitle,
      description: campaign.metaDescription,
      url: `/en/lp/${campaign.slug}`,
      type: "website",
    },
  }
}

export default async function CampaignLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const campaign = getCampaign(slug)
  const portfolioImages = getPortfolioImages("en")

  if (!campaign) notFound()

  return (
    <SeoAiTemplateEn
      hero={{
        ...seoAiConfigEn.hero,
        subtitle: campaign.heroSubtitle,
        ariaLabel: campaign.heroTitle,
        ctaHref: "#price",
      }}
      heroTitle={<>{campaign.heroTitle}</>}
      trustHeading={{
        title: "Industry leaders chose us. Ready to join them?",
        description: "Join the brands that trust us to drive visibility, traffic, and real results.",
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
        title: "What happens in the first few months",
        subtitle:
          "Early execution strengthens visibility, lead quality, and sales opportunities through consistent SEO and AI search improvements.",
      }}
      heroSubtitleClassName="mt-5 text-[25px] font-semibold leading-[30px] text-[color:var(--vow-muted)]"
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
      extraContent={
        <Fragment>
          <PortfolioWorksSection
            locale="en"
            images={portfolioImages}
            title="Selected work that supports stronger SEO and conversion performance"
            subtitle="A look at real projects across websites, landing pages, and digital builds that prove how execution quality supports visibility, trust, and lead generation."
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
  )
}
