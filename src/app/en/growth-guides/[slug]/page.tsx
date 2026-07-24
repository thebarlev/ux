import type { Metadata } from "next"
import { Fragment } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import type { PricePlan } from "@/app/_components/home/PriceSection"
import { SeoAiTemplateEn } from "@/app/en/_components/SeoAiTemplateEn"
import { EnLink } from "@/app/en/_components/EnLink"
import { RelatedGuides } from "@/components/marketing/growth-guides/RelatedGuides"
import { JsonLd, articleSchema, faqPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import {
  AUDITOR_URL,
  getGrowthGuide,
  growthGuideSlugs,
  type GrowthGuide,
  type GrowthGuideParagraph,
} from "../growthGuides.data"

const SEO_AI_PRICING_EN: readonly PricePlan[] = [
  {
    id: "price-starter-en",
    title: "Starter",
    kicker: "AI search engines",
    buttonLabel: "Free presence audit & join",
    buttonHref: "https://app.uxellent.com/en/auditor?link_id=a_basic",
    price: "$100/month",
    priceextra: "For early-stage businesses or limited budgets",
    badge: "",
    bullets: [
      "Monthly scan + focused report",
      "Top 5 priority actions per month",
      "One content update per month",
      "Basic performance metrics",
      "Chat support",
    ],
  },
  {
    id: "price-pro-en",
    title: "Pro",
    kicker: "Expert support + monthly execution",
    buttonLabel: "Free presence audit & join",
    buttonHref: "https://app.uxellent.com/en/auditor?link_id=a_pro",
    price: "$270/month",
    priceextra: "For businesses that want consistent growth",
    badge: "Most popular",
    bullets: [
      "Everything in Starter +",
      "Deep site scan & work plan",
      "Content & structure upgrades",
      "New pages optimized for Google & AI",
      "Optimization for ChatGPT, Gemini, Copilot",
      "⁠Monthly results report + strategy call",
      "Direct expert support",
    ],
  },
  {
    id: "price-expert-en",
    title: "Expert",
    kicker: "SEO + AI engines + personal expert",
    buttonLabel: "Free presence audit & join",
    buttonHref: "https://app.uxellent.com/en/auditor?link_id=a_premium",
    price: "$670/month",
    priceextra: "For competitive industries (legal, medical, finance)",
    badge: "",
    bullets: [
      "Everything in Pro +",
      "New page creation every month",
      "⁠Full topic & content strategy",
      "Advanced schema & internal linking",
      "Advanced tracking setup",
      "⁠Bi-weekly strategy calls",
      "Priority response + SLA",
    ],
  },
] as const

const GUIDE_CARD_IMAGES = [
  "/services/seo-ai/1.webp",
  "/services/seo-ai/2.webp",
  "/services/seo-ai/3.webp",
  "/services/seo-ai/4.webp",
] as const

const GUIDE_ABOUT_ICONS = [
  "/services/seo-ai/1.svg",
  "/services/seo-ai/2.svg",
  "/services/seo-ai/3.svg",
] as const

function renderParagraph(paragraph: GrowthGuideParagraph) {
  if (typeof paragraph === "string") {
    return paragraph
  }

  return paragraph.map((part, index) => {
    if (part.type === "link" && part.href) {
      return (
        <EnLink key={`${part.text}-${index}`} href={part.href} className="text-[#5389BB] underline hover:no-underline">
          {part.text}
        </EnLink>
      )
    }

    return <Fragment key={`${part.text}-${index}`}>{part.text}</Fragment>
  })
}

function getSectionTimingLabel(index: number) {
  return `Stage ${index + 1}`
}

function normalizeBulletText(text: string) {
  return text.trim().replace(/[.!?]+$/, "")
}

function buildAboutDescriptionEn(keyword: string, index: number) {
  if (index === 0) {
    return `This is an early priority in ${keyword.toLowerCase()} because it helps remove structural friction that limits visibility, trust, and conversion potential.`
  }

  if (index === 1) {
    return `This step improves search intent alignment, strengthens page clarity, and gives visitors a better reason to keep reading and move toward inquiry.`
  }

  return `That is how content, structure, and measurement start working together, so ${keyword.toLowerCase()} becomes a repeatable growth system instead of a one-off fix.`
}

function buildGuideTemplateProps(guide: GrowthGuide) {
  const [problem, solution, actions, cta] = guide.sections
  const combinedBullets = [...(problem.bullets ?? []), ...(solution.bullets ?? []), ...(actions.bullets ?? [])]
  const actionBullets = actions.bullets ?? []

  const visionCards = combinedBullets.slice(0, 4).map((caption, index) => ({
    id: `${guide.slug}-vision-${index + 1}`,
    src: GUIDE_CARD_IMAGES[index % GUIDE_CARD_IMAGES.length],
    alt: `${guide.keyword} - ${caption}`,
    caption,
  }))

  const aboutItems = actionBullets.slice(0, 3).map((bullet, index) => ({
    id: `${guide.slug}-about-${index + 1}`,
    title: normalizeBulletText(bullet),
    description: buildAboutDescriptionEn(guide.keyword, index),
    icon: GUIDE_ABOUT_ICONS[index % GUIDE_ABOUT_ICONS.length],
  }))

  const processSteps = guide.sections.slice(0, 4).map((section, index) => ({
    id: `${guide.slug}-step-${index + 1}`,
    number: String(index + 1),
    title: section.title,
    description: renderParagraph(section.paragraphs[section.paragraphs.length - 1] ?? ""),
    timing: getSectionTimingLabel(index),
  }))

  return {
    hero: {
      title: guide.keyword,
      subtitle: guide.heroIntro,
      tags: guide.heroTags,
      ctaLabel: "Get a free presence audit",
      ctaSource: "digital_marketing" as const,
      ctaHref: "#price",
      imageSrc: "/services/seo-ai/hero1.webp",
      imageAlt: guide.keyword,
    },
    stats: {
      ariaLabel: `${guide.keyword} guide metrics`,
    },
    process: {
      label: "Guide process",
      title: guide.sections[0]?.title ?? guide.keyword,
      subtitle: renderParagraph(problem.paragraphs[0] ?? guide.heroIntro),
      steps: processSteps,
    },
    vision: {
      title: solution.title,
      subtitle: renderParagraph(solution.paragraphs[0] ?? guide.heroIntro),
      ctaLabel: "Plans & pricing",
      ctaHref: "#price",
      source: "digital_marketing" as const,
      cards: visionCards,
    },
    about: {
      title: cta.title,
      subtitle: renderParagraph(cta.paragraphs[0] ?? guide.ctaSubtitle),
      ctaLabel: "Open Auditor",
      ctaSource: "digital_marketing" as const,
      ctaHref: AUDITOR_URL,
      items: aboutItems,
    },
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return growthGuideSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGrowthGuide(slug)

  if (!guide) {
    return {
      title: "Growth Guides | Uxellent",
    }
  }

  return {
    title: `${guide.keyword} | Uxellent`,
    description: guide.metaDescription,
    alternates: {
      canonical: `/en/growth-guides/${guide.slug}`,
      languages: heEnAlternateLanguages(
        `/growth-guides/${guide.slug}`,
        `/en/growth-guides/${guide.slug}`,
      ),
    },
    openGraph: {
      title: `${guide.keyword} | Uxellent Growth Guide`,
      description: guide.metaDescription,
      url: `/en/growth-guides/${guide.slug}`,
      type: "article",
    },
  }
}

export default async function GrowthGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGrowthGuide(slug)

  if (!guide) notFound()

  const template = buildGuideTemplateProps(guide)
  const pageUrl = `https://uxellent.com/en/growth-guides/${guide.slug}`

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: guide.keyword,
          description: guide.metaDescription,
          image: "https://uxellent.com/new-hero.webp",
          url: pageUrl,
          inLanguage: "en",
        })}
      />
      <JsonLd data={faqPageSchema(guide.faq.map((item) => ({ question: item.question, answer: item.answer })))} />
      <SeoAiTemplateEn
        hero={template.hero}
        heroSubtitleClassName="mt-5 text-[25px] font-semibold leading-[32px] text-[color:var(--vow-muted)]"
        stats={template.stats}
        process={template.process}
        vision={template.vision}
        about={template.about}
        price={{
          id: "price",
          title: "Plans & pricing",
          subtitle: "Choose the plan that fits your business stage. Upgrade anytime.",
          plans: SEO_AI_PRICING_EN,
          variant: "seo-ai",
        }}
        doubleHeading={{
          title: guide.ctaTitle,
          subtitle: guide.ctaSubtitle,
          buttonLabel: "Explore AI SEO services",
          buttonSource: "digital_marketing",
          buttonHref: "/en/seo-ai",
        }}
        faq={{
          title: `FAQ: ${guide.keyword}`,
          items: [...guide.faq],
        }}
        extraContent={<RelatedGuides currentSlug={guide.slug} locale="en" />}
        dataKeyword={guide.keyword.toLowerCase()}
      />
    </>
  )
}
