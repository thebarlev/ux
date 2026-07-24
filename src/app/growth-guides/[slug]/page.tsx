import type { Metadata } from "next"
import { Fragment } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import type { PricePlan } from "@/app/_components/home/PriceSection"
import { SeoAiTemplateHe } from "@/app/_components/SeoAiTemplateHe"
import { RelatedGuides } from "@/components/marketing/growth-guides/RelatedGuides"
import { JsonLd, articleSchema, faqPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import {
  AUDITOR_URL_HE,
  getGrowthGuideHe,
  growthGuideSlugsHe,
  type GrowthGuideHe,
  type GrowthGuideParagraphHe,
} from "../growthGuides.data"

const SEO_AI_PRICING_HE: readonly PricePlan[] = [
  {
    title: "מתחילים",
    kicker: "מנועי חיפוש AI",
    buttonLabel: "אבחון נוכחות בחינם והצטרפות",
    buttonHref:
      "https://app.uxellent.com/auditor?link_id=a_basic&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing",
    price: "197 ₪ לחודש",
    priceextra: "מתאים לעסקים בתחילת הדרך או בתקציב מוגבל",
    badge: "",
    bullets: [
      "סריקה חודשית + דו\"ח ממוקד",
      "5 פעולות עדיפות לחודש",
      "עדכון תוכן אחד לחודש",
      "מדדי ביצוע בסיסיים",
      "תמיכה בצ'אט",
    ],
  },
  {
    title: "מקצועי",
    kicker: "ליווי מומחה + ביצוע חודשי",
    buttonLabel: "אבחון נוכחות בחינם והצטרפות",
    buttonHref:
      "https://app.uxellent.com/auditor?link_id=a_pro&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing",
    price: "597 ₪ לחודש",
    priceextra: "מתאים לעסקים שרוצים צמיחה עקבית",
    badge: "המומלץ ביותר",
    bullets: [
      "כל מה שבחבילת מתחילים +",
      "סריקה עמוקה + תוכנית עבודה",
      "שדרוג תוכן ומבנה",
      "עמודים חדשים לגוגל ול־AI",
      "אופטימיזציה ל־ChatGPT, Gemini, Copilot",
      "דו\"ח חודשי + שיחת עדכון",
      "ליווי מומחה ישיר",
    ],
  },
  {
    title: "מומחים",
    kicker: "SEO + מנועי AI + מומחה אישי",
    buttonLabel: "אבחון נוכחות בחינם והצטרפות",
    buttonHref:
      "https://app.uxellent.com/auditor?link_id=a_premium&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing",
    price: "1,497 ₪ לחודש",
    priceextra: "מתאים לתחומים תחרותיים",
    badge: "",
    bullets: [
      "כל מה שבחבילת מקצועי +",
      "יצירת עמודים חדשים",
      "אסטרטגיית תוכן מלאה",
      "סכמות וקישורים פנימיים מתקדמים",
      "מעקב מתקדם",
      "שיחות דו־שבועיות",
      "עדיפות בתגובה",
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

function renderParagraph(paragraph: GrowthGuideParagraphHe) {
  if (typeof paragraph === "string") {
    return paragraph
  }

  return paragraph.map((part, index) => {
    if (part.type === "link" && part.href) {
      return (
        <Link key={`${part.text}-${index}`} href={part.href} className="text-[#5389BB] underline hover:no-underline">
          {part.text}
        </Link>
      )
    }

    return <Fragment key={`${part.text}-${index}`}>{part.text}</Fragment>
  })
}

function getSectionTimingLabel(index: number) {
  return `שלב ${index + 1}`
}

function normalizeBulletText(text: string) {
  return text.trim().replace(/[.!?]+$/, "")
}

function buildAboutDescriptionHe(keyword: string, index: number) {
  if (index === 0) {
    return `זהו צעד פתיחה חשוב ב-${keyword}, כי הוא עוזר לזהות חסמים שמשפיעים על חשיפה, חוויית שימוש והיכולת של העמוד לייצר פניות.`
  }

  if (index === 1) {
    return `המהלך הזה מחזק את ההתאמה לכוונת החיפוש, מוסיף עומק לתוכן ומשפר את הסיכוי שהגולש יתקדם לפנייה ולא יעזוב את העמוד.`
  }

  return `כך בונים תהליך מסודר שבו תוכן, מבנה ומדידה עובדים יחד, ו-${keyword} הופך ממאמץ נקודתי למנוע צמיחה עקבי יותר.`
}

function buildGuideTemplateProps(guide: GrowthGuideHe) {
  const [problem, solution, actions, cta] = guide.sections
  const combinedBullets = [...(problem.bullets ?? []), ...(solution.bullets ?? []), ...(actions.bullets ?? [])]
  const actionBullets = actions.bullets ?? []

  const visionCards = combinedBullets.slice(0, 4).map((caption, index) => ({
    id: `${guide.slug}-vision-he-${index + 1}`,
    src: GUIDE_CARD_IMAGES[index % GUIDE_CARD_IMAGES.length],
    alt: `${guide.keyword} - ${caption}`,
    caption,
  }))

  const aboutItems = actionBullets.slice(0, 3).map((bullet, index) => ({
    id: `${guide.slug}-about-he-${index + 1}`,
    title: normalizeBulletText(bullet),
    description: buildAboutDescriptionHe(guide.keyword, index),
    icon: GUIDE_ABOUT_ICONS[index % GUIDE_ABOUT_ICONS.length],
  }))

  const processSteps = guide.sections.slice(0, 4).map((section, index) => ({
    id: `${guide.slug}-step-he-${index + 1}`,
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
      ctaLabel: "קבל אבחון נוכחות בחינם",
      ctaSource: "digital_marketing" as const,
      ctaHref: "#price",
      imageSrc: "/new-hero.webp",
      imageAlt: guide.keyword,
    },
    stats: {
      ariaLabel: `${guide.keyword} מדדים`,
    },
    process: {
      label: "מפת הדרך",
      title: problem.title,
      subtitle: renderParagraph(problem.paragraphs[0] ?? guide.heroIntro),
      steps: processSteps,
    },
    vision: {
      title: solution.title,
      subtitle: renderParagraph(solution.paragraphs[0] ?? guide.heroIntro),
      ctaLabel: "חבילות ומחירים",
      ctaHref: "#price",
      source: "digital_marketing" as const,
      cards: visionCards,
    },
    about: {
      title: cta.title,
      subtitle: renderParagraph(cta.paragraphs[0] ?? guide.ctaSubtitle),
      ctaLabel: "פתיחת Auditor",
      ctaSource: "digital_marketing" as const,
      ctaHref: AUDITOR_URL_HE,
      items: aboutItems,
    },
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return growthGuideSlugsHe.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGrowthGuideHe(slug)

  if (!guide) {
    return { title: "מדריכי צמיחה | Uxellent" }
  }

  return {
    title: `${guide.keyword} | Uxellent`,
    description: guide.metaDescription,
    alternates: {
      canonical: `/growth-guides/${guide.slug}`,
      languages: heEnAlternateLanguages(
        `/growth-guides/${guide.slug}`,
        `/en/growth-guides/${guide.slug}`,
      ),
    },
    openGraph: {
      title: `${guide.keyword} | מדריך צמיחה של Uxellent`,
      description: guide.metaDescription,
      url: `/growth-guides/${guide.slug}`,
      type: "article",
    },
  }
}

export default async function GrowthGuidePageHe({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGrowthGuideHe(slug)

  if (!guide) notFound()

  const template = buildGuideTemplateProps(guide)
  const pageUrl = `https://uxellent.com/growth-guides/${guide.slug}`

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: guide.keyword,
          description: guide.metaDescription,
          image: "https://uxellent.com/new-hero.webp",
          url: pageUrl,
          inLanguage: "he",
        })}
      />
      <JsonLd data={faqPageSchema(guide.faq.map((item) => ({ question: item.question, answer: item.answer })))} />
      <SeoAiTemplateHe
        hero={template.hero}
        heroSubtitleClassName="mt-5 text-[25px] font-semibold leading-[30px] text-[color:var(--vow-muted)]"
        stats={template.stats}
        process={template.process}
        vision={template.vision}
        about={template.about}
        price={{
          id: "price",
          title: "חבילות ומחירים",
          subtitle: "בחר את החבילה שמתאימה לשלב שבו העסק שלך נמצא. אפשר לשדרג בכל עת.",
          plans: SEO_AI_PRICING_HE,
          variant: "seo-ai",
        }}
        doubleHeading={{
          title: guide.ctaTitle,
          subtitle: guide.ctaSubtitle,
          buttonLabel: "לעמוד SEO / AI",
          buttonSource: "digital_marketing",
          buttonHref: "/seo-ai",
        }}
        faq={{
          title: `שאלות נפוצות: ${guide.keyword}`,
          items: [...guide.faq],
        }}
        extraContent={<RelatedGuides currentSlug={guide.slug} locale="he" />}
        dataKeyword={guide.keyword}
      />
    </>
  )
}
