import type { Metadata } from "next"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { JsonLd, faqPageSchema } from "@/components/JsonLd"
import { PortfolioCtaSection } from "@/app/_components/portfolio/PortfolioCtaSection"
import { PortfolioGrid } from "@/app/_components/portfolio/PortfolioGrid"
import { PortfolioHero } from "@/app/_components/portfolio/PortfolioHero"
import { getPortfolioImages } from "@/app/_components/portfolio/portfolioImages"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export const metadata: Metadata = {
  title: "תיק עבודות Uxellent | אתרים, AI ושיווק דיגיטלי",
  description:
    "צפו בפרויקטים של Uxellent בפיתוח אתרים, מערכות AI ושיווק דיגיטלי לעסקים עם דגש על ביצועים, SEO ו-ROI.",
  keywords: "פיתוח אתרים, מערכות AI, עיצוב אתרים, שיווק דיגיטלי, בניית אתרים לעסקים",
  alternates: {
    canonical: "/portfolio",
    languages: heEnAlternateLanguages("/portfolio", "/en/portfolio"),
  },
}

const FAQ_ITEMS = [
  {
    id: "portfolio-faq-1",
    question: "כמה זמן לוקח פרויקט?",
    answer:
      "ברוב המקרים 2–6 שבועות, תלוי בהיקף ובמורכבות. אנחנו עובדים בספרינטים ברורים ומציגים התקדמות מדידה לאורך הדרך - כדי שתדעו בדיוק איפה עומדים ומתי עולה לאוויר.",
  },
  {
    id: "portfolio-faq-2",
    question: "האם אתם עובדים עם עסקים קטנים?",
    answer:
      "כן. אנחנו בונים תהליך שמותאם לתקציב וליעד: להתחיל חכם, למדוד מהר, ולהתרחב. גם לעסק קטן מגיע אתר/מערכת שמייצרים תוצאה אמיתית ולא רק “נראות”.",
  },
  {
    id: "portfolio-faq-3",
    question: "מה היתרון של פיתוח מבוסס AI?",
    answer:
      "AI מאפשר לנו לקצר זמנים, לחדד אפיון, ולשפר איכות - בלי להתפשר על יציבות ואבטחה. התוצאה: פחות סבבי תיקונים, יותר דיוק, והגעה מהירה יותר ל־ROI.",
  },
  {
    id: "portfolio-faq-4",
    question: "האם אתם מספקים גם שיווק?",
    answer:
      "כן. אנחנו משלבים חשיבה שיווקית כבר בשלב האפיון: מסרים, משפכים, מדידה, והטמעת אנליטיקס. אפשר לעלות עם פרויקט פיתוח בלבד, או לקבל מעטפת מלאה של ביצועים וצמיחה.",
  },
  {
    id: "portfolio-faq-5",
    question: "כמה זה עולה?",
    answer:
      "המחיר נקבע לפי היקף, טכנולוגיה, ותוצאות יעד. אחרי שיחה קצרה נוכל להציע טווח מסודר והצעת עבודה מדויקת - עם מה שנכנס, מה לא, ומה מודדים כדי להבטיח הצלחה.",
  },
  {
    id: "portfolio-faq-6",
    question: "האם אפשר להתחיל בפרויקט קטן?",
    answer:
      "בהחלט. הרבה מהפרויקטים מתחילים ב־MVP, דף נחיתה ממיר, או שיפור ביצועים לאתר קיים. עובדים מהר, מודדים, ואז מחליטים יחד על השלב הבא לפי נתונים.",
  },
] as const

export default function PortfolioPage() {
  const images = getPortfolioImages("he")

  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <JsonLd
        data={faqPageSchema(FAQ_ITEMS.map((i) => ({ question: i.question, answer: i.answer })))}
      />
      <SiteHeader />

      <main id="main">
        <PortfolioHero />

        <section aria-label="פרויקטים" className=" bg-[#F4F1EC] py-[var(--space-section)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
            <PortfolioGrid images={images} />
          </div>
        </section>

        <PortfolioCtaSection />

        <ServiceFaqSection title="FAQ" items={[...FAQ_ITEMS]} />
      </main>

      <SiteFooter />
    </div>
  )
}

