import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/_components/home/SiteHeader";
import { JsonLd, faqPageSchema } from "@/components/JsonLd";
import { SiteFooter } from "@/app/_components/home/SiteFooter";
import { AboutSection } from "@/app/_components/home/AboutSection";
import { PriceSection } from "@/app/_components/home/PriceSection";
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection";
import { heEnAlternateLanguages } from "@/lib/seo/hreflang";

export const metadata: Metadata = {
  title: "מחירון חשבונית דיגיטלית | Uxellent",
  description: "מחירון חשבונית דיגיטלית מאובטחת עם חיבור לרשות המסים, חתימה דיגיטלית ושנה ראשונה חינם לעסקים.",
  alternates: {
    canonical: "/pricing",
    languages: heEnAlternateLanguages("/pricing", "/en/pricing"),
  },
};

const PRICING_FAQ = [
  {
    id: "pricing-faq-1",
    question: "כמה עולה חשבונית דיגיטלית?",
    answer: "שנה ראשונה חינם. אחר כך מנוי חודשי או שנתי - פרטים בעמוד.",
  },
  {
    id: "pricing-faq-2",
    question: "מה כולל השנה החינמית?",
    answer: "הפקת עד 10 מסמכים בחודש, חתימה דיגיטלית, חיבור לרשות המיסים.",
  },
  {
    id: "pricing-faq-3",
    question: "האם אפשר לבטל?",
    answer: "כן. ביטול מנוי חודשי בתום החודש. מנוי שנתי - לפי מדיניות ההחזרים.",
  },
  {
    id: "pricing-faq-4",
    question: "אילו מסמכים אפשר להפיק?",
    answer: "חשבוניות מס, קבלות, חשבוניות עסקה ועוד - 12 סוגי מסמכים.",
  },
] as const;

export default function PricePage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <JsonLd data={faqPageSchema(PRICING_FAQ.map((i) => ({ question: i.question, answer: i.answer })))} />
      <SiteHeader />

      <main id="main" role="main">
        <section className="py-[var(--space-section)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[720px] text-center">
              <h1 className="text-[44px] font-semibold leading-[1.1] text-black sm:text-[56px] lg:text-[64px]">
                מחירון חשבונית דיגיטלית
              </h1>
              <p className="mt-4 text-[20px] font-semibold leading-[32px] text-[color:var(--vow-muted)]">
                חשבונית דיגיטלית מאובטחת עם חיבור לרשות המיסים. שנה ראשונה חינם לכל עסק.{" "}
                <Link href="/invoice" className="text-[#5389BB] underline hover:no-underline">
                  פרטים על החשבונית הדיגיטלית
                </Link>
              </p>
            </div>
          </div>
        </section>

        <PriceSection />
        <ServiceFaqSection title="שאלות נפוצות על התמחור" items={[...PRICING_FAQ]} />
        <AboutSection />
      </main>

      <SiteFooter />
    </div>
  );
}
