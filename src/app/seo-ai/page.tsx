import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { LogoRow } from "@/app/_components/home/LogoRow"
import { PackagesSection } from "@/app/_components/home/PackagesSection"
import type { PricePlan } from "@/app/_components/home/PriceSection"
import { PriceSection } from "@/app/_components/home/PriceSection"
import { SuccessSection } from "@/app/_components/home/SuccessSection"
import { Testimonials } from "@/app/_components/home/Testimonials"
import { VisionToExecutionSection } from "@/app/_components/home/VisionToExecutionSection"
import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { SeoAiProcessSteps } from "@/app/_components/services/SeoAiProcessSteps"
import { ServiceAboutSection } from "@/app/_components/services/ServiceAboutSection"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { ServiceHero } from "@/app/_components/services/ServiceHero"
import { SeoAiStatsBar } from "@/app/_components/services/SeoAiStatsBar"
import { seoAiConfig } from "@/app/_components/services/services.config"
import { PortfolioWorksSection } from "@/app/_components/portfolio/PortfolioWorksSection"
import { getPortfolioImages } from "@/app/_components/portfolio/portfolioImages"
import { GrowthGuidesCard } from "@/components/marketing/GrowthGuidesCard"
import { InlineLeadForm } from "@/app/_components/leads/InlineLeadForm"
import { JsonLd, faqPageSchema } from "@/components/JsonLd"
import { H2 } from "@/components/ui/Heading"

export const metadata: Metadata = {
  ...seoAiConfig.metadata,
  alternates: {
    ...seoAiConfig.metadata.alternates,
    canonical: "/seo-ai",
    languages: heEnAlternateLanguages("/seo-ai", "/en/seo-ai"),
  },
}

const SEO_AI_PRICING: readonly PricePlan[] = [
  {
    title: "מתחילים",
    kicker: "מנועי חיפוש AI",
    buttonLabel: "אבחון נוכחות בחינם והצטרפות",
    buttonHref:
      "https://app.uxellent.com/auditor?link_id=a_basic&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing",
    price: "197 ₪ לחודש",
    priceextra: "מתאים ל: עסקים בתחילת דרך או תקציב מוגבל",
    badge: "",
    bullets: [
 'סריקה חודשית + דו"ח ממוקד',
 "רשימת 5 פעולות עדיפות לחודש",
 "עדכון תוכן אחד לחודש",
 "מדדי ביצוע בסיסיים",
 "תמיכה בצ׳אט",
    ],
  },
  {
    title: "מקצועי",
    kicker: "ליווי מומחה + ביצוע חודשי מלא",
    buttonLabel: "אבחון נוכחות בחינם והצטרפות",
    buttonHref:
      "https://app.uxellent.com/auditor?link_id=a_pro&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing",
    price: "597 ₪ לחודש",
    priceextra: "מתאים ל: עסקים שרוצים תוצאות בלי להתעסק",
    badge: "המומלץ ביותר",
    bullets: [
"כל מה שבבסיסי +",
 "סריקה מעמיקה + תכנית עבודה",
 "שדרוג תוכן ומבנה, 2–4 משימות/חודש",
 "ChatGPT, Gemini, Copilot...",
 "יצירת עמודים חדשים שמביאים תנועה",
 'דו"ח תוצאות חודשי + שיחת עדכון',
 "ליווי מומחה ישיר (לא בוט)",

    ],
  },
  {
    title: "מומחים",
    kicker: "SEO + מנועי AI + מומחה אישי",
    buttonLabel: "אבחון נוכחות בחינם והצטרפות",
    buttonHref:
      "https://app.uxellent.com/auditor?link_id=a_premium&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing",
    price: "1,497 ₪ לחודש",
    priceextra: 'מתאים ל: רפואה / עו"ד / נדל"ן / פיננסים',
    badge: "",
    bullets: [
"כל מה שמקצועי +",
"יצירה של עמודים חדשים",
"אסטרטגיית נושאים ותוכן מלאה",
"סכמות מתקדמות + לינקים פנימיים",
"מעקב מתקדם + שיחה דו-שבועית",
"עדיפות בתגובה + SLA מוגדר",
    ],
  },
] as const

export default function SeoAiServicePage() {
  const faqItems = seoAiConfig.faq?.items ?? []
  const portfolioImages = getPortfolioImages("he")

  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      {faqItems.length ? (
        <JsonLd
          data={faqPageSchema(faqItems.map((item) => ({ question: item.question, answer: item.answer })))}
        />
      ) : null}
      <SiteHeader />
      <main id="main" role="main">
        <ServiceHero
          {...seoAiConfig.hero}
          ariaLabel="קידום אתרים בגוגל וב-AI לעסקים שרוצים יותר לידים"
          ctaHref="#price"
          subtitleClassName="mt-5 text-[25px] font-semibold leading-[30px] text-[color:var(--vow-muted)]"
          subtitle="קידום אורגני בגוגל שמגדיל חשיפה, פניות ולידים איכותיים."
          title={
            <>
              קידום אתרים בגוגל וב-AI לעסקים שרוצים יותר לידים
            </>
          }
        />
        <LogoRow />
        <SeoAiStatsBar />
        <SeoAiProcessSteps />
        <VisionToExecutionSection
          title={seoAiConfig.vision?.title}
          subtitle={seoAiConfig.vision?.subtitle}
          ctaLabel={seoAiConfig.vision?.ctaLabel}
          source={seoAiConfig.vision?.source}
          cards={seoAiConfig.vision?.cards}
        />

        {seoAiConfig.about ? (
          <ServiceAboutSection
            title={seoAiConfig.about.title}
            subtitle={seoAiConfig.about.subtitle}
            ctaLabel={seoAiConfig.about.ctaLabel}
            ctaSource={seoAiConfig.about.ctaSource}
            items={seoAiConfig.about.items}
          />
        ) : null}

        {/* Unique pricing section ONLY for /seo-ai */}
        <PriceSection id="price"
          title="חבילות קידום אתרים ושיווק דיגיטלי לעסקים"
          subtitle="בחרו מסלול קידום אורגני בגוגל שמתאים לשלב שבו העסק שלכם נמצא, עם ליווי, ביצוע ומדידה חודשית."
          plans={SEO_AI_PRICING}
          variant="seo-ai"
        />

        <SuccessSection />
        <Testimonials />

        <DoubleHeadingCtaSection {...seoAiConfig.doubleHeading} buttonHref="#price" />
        {seoAiConfig.faq ? <ServiceFaqSection {...seoAiConfig.faq} /> : null}
        <PortfolioWorksSection
          locale="he"
          images={portfolioImages}
          title="עבודות שממחישות איך SEO, פיתוח ו-AI נראים בפועל"
          subtitle="מבחר אתרים, דפי נחיתה ומערכות שבנינו כדי לחבר בין קידום אורגני, חוויית משתמש ותוצאות עסקיות אמיתיות."
        />
        <section aria-label="שירותים משלימים" className="bg-[#F4F1EC] pb-[var(--space-section)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[900px] rounded-[10px] border border-[color:var(--vow-border)] bg-white px-6 py-8 text-right sm:px-10">
              <H2 className="text-right">שיווק דיגיטלי לעסקים צריך גם מעטפת משלימה</H2>
              <p className="mt-4 text-[20px] leading-[34px] text-black/80">
                לצד קידום אורגני בגוגל, אפשר לשלב גם{" "}
                <Link href="/marketing/ppc" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  שיווק דיגיטלי לעסקים וקידום ממומן
                </Link>
                , לחזק{" "}
                <Link href="/develop" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  בניית אתרים
                </Link>
                , לשפר{" "}
                <Link href="/design" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  חוויית משתמש ועיצוב
                </Link>
                {" "}ולהעמיק{" "}
                <Link href="/roi" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  מדידה והמרות
                </Link>
                {" "}כדי להפוך קידום עסקים בגוגל לצמיחה עסקית יציבה.
              </p>
            </div>
          </div>
        </section>
        <GrowthGuidesCard
          title="מדריכי קידום אתרים וצמיחה"
          description="המשיכו למדריכים שמרחיבים על קידום אורגני בגוגל, SEO וצמיחה עסקית."
          dir="rtl"
          sectionClassName="bg-[#F4F1EC] py-[var(--space-section)]"
          containerClassName="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4"
          links={[
            { href: "/growth-guides/how-to-improve-website-seo", label: "איך לשפר SEO לאתר" },
            { href: "/growth-guides/how-to-get-traffic-to-my-website", label: "איך להביא תנועה לאתר" },
          ]}
          indexLink={{ href: "/growth-guides", label: "לכל המדריכים" }}
        />
        <PackagesSection />
        <InlineLeadForm
          title="השארת פרטים"
          subtitle="ספרו בקצרה על האתר והמטרות - נחזור עם הצעדים הבאים לקידום בגוגל ובמנועי AI."
          pagePathOverride="/seo-ai"
          source="digital_marketing"
          anchorId="lead-seo-ai"
        />
      </main>
      <SiteFooter />
    </div>
  )
}

