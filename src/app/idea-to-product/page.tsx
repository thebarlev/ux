import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { LogoRow } from "@/app/_components/home/LogoRow"
import { PackagesSection } from "@/app/_components/home/PackagesSection"
import type { PricePlan } from "@/app/_components/home/PriceSection"
import { PriceSection } from "@/app/_components/home/PriceSection"
import { SuccessSection } from "@/app/_components/home/SuccessSection"
import { Testimonials } from "@/app/_components/home/Testimonials"
import { VisionToExecutionSection } from "@/app/_components/home/VisionToExecutionSection"
import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { SeoAiProcessSteps, type SeoAiProcessStep } from "@/app/_components/services/SeoAiProcessSteps"
import { ServiceAboutSection } from "@/app/_components/services/ServiceAboutSection"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { ServiceHero } from "@/app/_components/services/ServiceHero"
import { SeoAiStatsBar, type SeoAiStatsBarItem } from "@/app/_components/services/SeoAiStatsBar"
import { PortfolioWorksSection } from "@/app/_components/portfolio/PortfolioWorksSection"
import { getPortfolioImages } from "@/app/_components/portfolio/portfolioImages"
import { GrowthGuidesCard } from "@/components/marketing/GrowthGuidesCard"
import { InlineLeadForm } from "@/app/_components/leads/InlineLeadForm"
import { JsonLd, faqPageSchema } from "@/components/JsonLd"
import { H2 } from "@/components/ui/Heading"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const CANONICAL = "/idea-to-product"

export const metadata: Metadata = {
  title: "פיתוח רעיון לאפליקציה או אתר | אפיון מוצר, UI/UX ופיתוח מלא",
  description:
    "מלווים יזמים, משקיעים ומייסדים בשלב הרעיון - מאפיון מוצר ומסמך דרישות, דרך עיצוב ממשק וחוויית משתמש (UI/UX), ועד פיתוח אפליקציות, בניית אתרים או מערכת מלאה. תהליך ברור, ביצוע מקצועי, פחות בלבול ופחות כסף מבוזר.",
  alternates: {
    canonical: CANONICAL,
    languages: heEnAlternateLanguages("/idea-to-product", "/en/idea-to-product"),
  },
  openGraph: {
    title: "פיתוח רעיון לאפליקציה או אתר | אפיון מוצר, UI/UX ופיתוח מלא",
    description:
      "מכל רעיון - לתכנון, עיצוב UI/UX ופיתוח מלא: אפיון מוצר, בניית אתרים ופיתוח אפליקציות, במסלול אחד ברור.",
    url: CANONICAL,
    type: "website",
  },
}

const IDEA_PRODUCT_STATS: readonly SeoAiStatsBarItem[] = [
  {
    value: "1",
    line1: "מסלול מלא",
    line2: "מאפיון מוצר ועד מוצר חי",
  },
  {
    value: "3",
    line1: "שכבות עומק",
    line2: "מושג, מסמך דרישות, UI/UX",
  },
  {
    value: "0",
    line1: "מקום לניחוש",
    line2: "כשהאפיון לפני הקוד",
  },
]

const IDEA_PRODUCT_PROCESS_STEPS: readonly SeoAiProcessStep[] = [
  {
    id: "itp-step-1",
    number: "1",
    title: "מרעיון גולמי למוצר ברור ומדויק",
    description:
      "מזקקים את הבעיה, מציעים ערך חד, מגדירים שוק ומשתמשים מרכזיים, והופכים רעיון מעורפל למשפט מוצר שאפשר לבדוק, לתעדף ולבנות עליו.",
    timing: "שבוע 1–2",
  },
  {
    id: "itp-step-2",
    number: "2",
    title: "אפיון מוצר ומסמך דרישות (PRD)",
    description:
    "מגדירים את הבסיס לפיתוח: זרימות משתמש, חוקים עסקיים, אינטגרציות והנחות טכניות. אפיון מדויק מצמצם סיכונים ומאפשר להתקדם לפיתוח בצורה בטוחה ויעילה.",
    timing: "שבוע 2–4",
  },
  {
    id: "itp-step-3",
    number: "3",
    title: "עיצוב UI/UX ואב־טיפוס / פרוטוטייפ",
    description:
      "מתרגמים את האפיון לחוויית משתמש מלאה: מסכים, זרימות ומצבי קצה. יוצרים אב־טיפוס שמאפשר לראות, לבדוק ולדייק את המוצר לפני הפיתוח.",
    timing: "שבוע 3–6",
  },
  {
    id: "itp-step-4",
    number: "4",
    title: "פיתוח מוצר מלא",
    description:
      "מיישמים בפועל: בניית אתרים, פיתוח אפליקציות או מערכות Web עם לוגיקה עסקית, על בסיס אפיון ועיצוב מאושרים, ללא ניחושים בדרך.",
    timing: "לפי היקף",
  },
  {
    id: "itp-step-5",
    number: "5",
    title: "השקה, בדיקה ואופטימיזציה",
    description:
      "מעלים את המוצר לאוויר, מנתחים ביצועים ומשפרים על בסיס נתונים. משלבים אסטרטגיית SEO ונראות במנועי AI להגדלת חשיפה וצמיחה מתמשכת.",
    timing: "שוטף",
  },
]

const IDEA_PRODUCT_PRICING: readonly PricePlan[] = [
  {
    title: "מסלול התחלה",
    kicker: "רעיון → אפיון מוצר",
    buttonLabel: "לתיאום שיחה",
    buttonHref: "/contact",
    price: "לפי היקף",
    priceextra: "מתאים ליזמים, מייסדים או משקיעים שצריכים בהירות לפני פיתוח",
    badge: "",
    bullets: [
      "בירור צורך, שוק והצעת ערך",
      "אפיון מוצר ראשוני ותיעוד דרישות",
      "המלצה על צורת מוצר (אתר / אפליקציה / מערכת)",
      "אומדן שלבים וסיכונים",
    ],
  },
  {
    title: "מסלול מקצועי",
    kicker: "אפיון + UI/UX + MVP",
    buttonLabel: "לתיאום שיחה",
    buttonHref: "/contact",
    price: "לפי היקף",
    priceextra: "מתאים למי שרוצה מסכים מאושרים לפני פיתוח מלא",
    badge: "המומלץ ביותר",
    bullets: [
      "כל מה שבמסלול ההתחלה",
      "עיצוב ממשק וחוויית משתמש (UI/UX)",
      "אב טיפוס לבדיקה עם משתמשים או משקיעים",
      "הכנה טכנית לפיתוח אפליקציות או בניית אתרים",
    ],
  },
  {
    title: "מסלול מלא",
    kicker: "תכנון → עיצוב → פיתוח והשקה",
    buttonLabel: "לתיאום שיחה",
    buttonHref: "/contact",
    price: "לפי היקף",
    priceextra: "פתרון מקצה לקצה למוצר דיגיטלי",
    badge: "",
    bullets: [
      "ליווי מקצה לקצה עד מוצר חי",
      "פיתוח אתר, אפליקציה או מערכת Web",
      "השקה, בדיקות וייצוב",
      "אופציה להמשך עם קידום בגוגל וב-AI",
    ],
  },
]

const IDEA_PRODUCT_FAQ = {
  title: "שאלות נפוצות על פיתוח רעיון, אפיון מוצר ופיתוח",
  items: [
    {
      id: "itp-faq-1",
      question: "יש לי רעיון - מה עכשיו?",
      answer:
        "מתחילים בשיחת בירור קצרה: מי הלקוח, איזה כאב בשוק, ומה המוצר אמור לעשות בעבורו. אחר כך מחליטים יחד על צורת המוצר הראשונה (אתר, אפליקציה או מערכת), ומגדירים תכנית עבודה: אפיון מוצר, UI/UX ואז פיתוח - כך שלא משלמים על קוד לפני שהדרישות ברורות.",
    },
    {
      id: "itp-faq-2",
      question: "למי המסלול הזה מתאים?",
      answer:
        "ליזמים ומייסדים בשלב הרעיון, למשקיעים שרוצים מסמך מוצר והיתכנות לפני החלטה, ולצוותים שכבר יודעים מה הם בונים אבל רוצים ביצוע פרימיום במקום לתאם בין כמה ספקים שלא מדברים אותה שפה.",
    },
    {
      id: "itp-faq-3",
      question: "למה חשוב אפיון מוצר לפני פיתוח אפליקציות או בניית אתרים?",
      answer:
        "בלי אפיון מוצר מסודר, פיתוח הופך לניחושים: שינויים באמצע, עלויות עודפות ותסכול בין צוותים. מסמך דרישות וזרימות מיישר קו בין משקיעים, מעצבים ומפתחים, ומבטיח שהביטוי «פיתוח רעיון» מחובר למשהו שניתן למדוד ולהשיק.",
    },
    {
      id: "itp-faq-4",
      question: "איפה בדרך כלל מבזבזים כסף?",
      answer:
        "כשקופרים או מעצבים בנפרד ממפתחים בלי מסמך אחד - כל צד מתרגם את הרעיון אחרת. המסלול המלא מקטין את הפער: UI UX ואפיון לפני קוד, ואז בניית אתרים או אפליקציה שמיישמת בדיוק מה שאושר.",
    },
    {
      id: "itp-faq-5",
      question: "מה ההבדל בין UI/UX לבין הפיתוח בפועל?",
      answer:
        "UI/UX מגדיר איך המשתמש חווה את המוצר - מסכים, זרימות והיררכיה. הפיתוח מיישם את הלוגיקה והמערכת מאחורי המסכים. כשהם מחוברים מאותו תהליך, פחות באגים חווייתיים ופחות הפתעות בעלות.",
    },
    {
      id: "itp-faq-6",
      question: "האם אפשר לשלב גם קידום בגוגל ובמנועי AI אחרי ההשקה?",
      answer:
        "כן. רק מוצר שלא יימצא לא יניב תנועה. אחרי השקה יציבה אפשר לשלב ליווי קידום אורגני בגוגל ובמנועי AI - למשל דרך עמוד השירות הייעודי לכך.",
    },
    {
      id: "itp-faq-7",
      question: "למה כדאי לעבוד עם צוות שמכסה גם תכנון, עיצוב וביצוע?",
      answer:
        "כי אותו גורם אחראי לכל השרשרת - מרעיון דרך אפיון מוצר ועד מוצר חי. זה מוריד בלבול, מקצר זמן תיאום ומייצר תוצאה מקצועית יותר מסט פרויקטורים מבוזרים.",
    },
  ],
} as const

export default function IdeaToProductPage() {
  const portfolioImages = getPortfolioImages("he")
  const faqItems = IDEA_PRODUCT_FAQ.items

  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <JsonLd data={faqPageSchema(faqItems.map((item) => ({ question: item.question, answer: item.answer })))} />
      <SiteHeader />
      <main id="main" role="main">
        <ServiceHero
          ariaLabel="יש לך רעיון? נהפוך אותו למוצר דיגיטלי אמיתי"
          title={<>יש לך רעיון? נהפוך אותו למוצר דיגיטלי אמיתי</>}
          ctaHref="#lead-idea-to-product"
          subtitleClassName="mt-5 text-[25px] font-semibold leading-[30px] text-[color:var(--vow-muted)]"
          subtitle="כל רעיון שתביאו - אפשר לתכנן, לעצב ולבנות, במסלול אחד ברור עד מוצר חי."
          heroSubheading="רוב האנשים לא נתקעים״ברעיון הטוב״ - הם נתקעים באיסוף, באפיון מוצר ובביצוע. אנחנו מקצרים את הדרך: מסמך דרישות, UI/UX שמייצר אמון, ופיתוח שמיישם בניית אתרים, פיתוח אפליקציות או מערכת Web - לפי מה שהרעיון באמת צריך."
          ctaLabel="נתאם שיחת בירור"
          ctaSource="design_development"
          imageSrc="/new-hero.webp"
          imageAlt="מתכננים, מעצבים ומפתחים מוצר דיגיטלי - מאפיון מוצר ועד השקה"
        />
        <LogoRow />
        <SeoAiStatsBar
          ariaLabel="יתרונות מסלול מרעיון למוצר"
          title="מה משתנה כשיש תהליך ברור מהרעיון למוצר"
          subtitle="אפיון מוצר, עיצוב UI/UX ופיתוח שמחובר לדרישות - מעטפת אחת, פחות בלבול, פחות כסף מבוזר בין ספקים."
          items={IDEA_PRODUCT_STATS}
        />
        <SeoAiProcessSteps
          label="התהליך"
          title="מהרעיון למוצר בשטח: שלב אחר שלב"
          subtitle="פיתוח רעיון נכון דורש סדר: ממושג מוצר דרך אפיון ועיצוב ממשק, ועד מימוש טכני והשקה - כך שכל שלב מסביר את הבא אחריו."
          steps={IDEA_PRODUCT_PROCESS_STEPS}
        />
        <VisionToExecutionSection
          title="מסלול מלא - מאפיון דרך UI/UX ועד פיתוח"
          subtitle="אנחנו מחברים בין אסטרטגיה לביצוע: לא רק מסמכים, ולא רק קוד בלי הקשר. אותו קו מתמשך שמיועד ליזמים, משקיעים ומי שמתחיל רק מרעיון - עם דגש על אפיון מוצר, חוויית משתמש ובנייה מקצועית."
          ctaLabel="נתאם שיחת בירור"
          source="design_development"
          cards={[
            {
              id: "itp-vis-1",
              src: "/services/develop/d1.webp",
              alt: "אפיון מוצר ותכנון דרישות",
              caption: "אפיון מוצר ותכנון דרישות",
            },
            {
              id: "itp-vis-2",
              src: "/services/develop/d2.webp",
              alt: "UI/UX ואבות טיפוס",
              caption: "UI/UX ואבות טיפוס",
            },
            {
              id: "itp-vis-3",
              src: "/services/develop/d3.webp",
              alt: "בניית אתרים ופיתוח אפליקציות",
              caption: "בניית אתרים ופיתוח אפליקציות",
            },
            {
              id: "itp-vis-4",
              src: "/services/develop/d4.webp",
              alt: "השקה, ייצוב וצמיחה",
              caption: "השקה, ייצוב וצמיחה",
            },
          ]}
        />
        <ServiceAboutSection
          title="בלי אפיון מוצר - הפיתוח נהיה יקר ובלתי צפוי"
          subtitle={
            <>
              כשמתחילים בלי מסמך דרישות ברור, אנשי מקצוע שונים מתרגמים את הרעיון אחרת. המסלול שלנו מכוון לבהירות, מהירות יחסית וביצוע פרימיום -{" "}
              <strong>מכל נקודת התחלה ועד מוצר שמיש</strong>.
            </>
          }
          ctaLabel="נתאם שיחת בירור"
          ctaSource="design_development"
          items={[
            {
              id: "itp-about-1",
              title: "אפיון לפני שורת קוד",
              description:
                "מסמך אפיון מוצר וזרימות שמיישר קו בין משקיעים, עיצוב ופיתוח - כדי שבניית אתרים או פיתוח אפליקציות לא יהפכו לניחושים באמצע.",
              icon: "/about/2.svg",
            },
            {
              id: "itp-about-2",
              title: "UI/UX שמחובר ללוגיקה",
              description:
                "עיצוב ממשק וחוויית משתמש שמבוסס על הדרישות - לא רק «מסך יפה», אלא זרימה שמובילה להשלמת משימות ולהמרות.",
              icon: "/services/seo-ai/2.svg",
            },
            {
              id: "itp-about-3",
              title: "ביצוע מלא או בשלבים",
              description:
                "אפשר לרוץ מקצה לקצה או לעצור אחרי אפיון ואב טיפוס - בהתאם לשלב העסקי, עם אותה שפה מקצה לקצה.",
              icon: "/about/code.svg",
            },
          ]}
        />

        <PriceSection
          id="price"
          title="מסלולי עבודה - מאפיון מוצר ועד פיתוח"
          subtitle="בחרו נקודת כניסה שמתאימה לשלב שבו הנכם: אפיון והבהרה, עיצוב ו-MVP, או מוצר מלא מוכן להשקה. התמחור נקבע לפי היקף - נשמח לפרט בשיחה."
          plans={IDEA_PRODUCT_PRICING}
          variant="seo-ai"
        />

        <SuccessSection />
        <Testimonials />

        <DoubleHeadingCtaSection
          title="מוכנים להפוך רעיון למוצר אמיתי?"
          subtitle="נתאם שיחה קצרה, נמפה את הרעיון למסלול מעשי - מאפיון מוצר ו-UI/UX ועד בניית אתר או אפליקציה."
          buttonLabel="נתאם שיחה"
          buttonSource="design_development"
          buttonHref="#price"
        />
        <ServiceFaqSection title={IDEA_PRODUCT_FAQ.title} items={[...IDEA_PRODUCT_FAQ.items]} />
        <PortfolioWorksSection
          locale="he"
          images={portfolioImages}
          title="עבודות שמחברות בין אפיון, עיצוב ופיתוח"
          subtitle="מבחר אתרים, אפליקציות ומערכות - מהדגמה איך UI/UX, פיתוח ומוצר שלם נראים בפועל אחרי תהליך מסודר."
        />
        <section aria-label="שירותים משלימים" className="bg-[#F4F1EC] pb-[var(--space-section)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[900px] rounded-[10px] border border-[color:var(--vow-border)] bg-white px-6 py-8 text-right sm:px-10">
              <H2 className="text-right">מוצר טוב נולד מהרחבה נכונה - לא רק מקוד</H2>
              <p className="mt-4 text-[20px] leading-[34px] text-black/80">
                לצד <strong>פיתוח רעיון</strong> ל<strong>אפיון מוצר</strong>, <strong>UI/UX</strong> ו<strong>פיתוח אפליקציות</strong> או{" "}
                <Link href="/develop" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  בניית אתרים
                </Link>
                , אפשר לחזק גם{" "}
                <Link href="/design" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  מיתוג ועיצוב
                </Link>
                , לנהל{" "}
                <Link href="/marketing/ppc" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  קידום ממומן
                </Link>
                , ואחרי ההשקה - להעלות נראות עם{" "}
                <Link href="/seo-ai" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  קידום בגוגל וב-AI
                </Link>{" "}
                ואת{" "}
                <Link href="/roi" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  המדידה וההמרות
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
        <GrowthGuidesCard
          title="מדריכי צמיחה אחרי שהמוצר באוויר"
          description="הרחבה על תנועה, לידים וצמיחה עסקית - משלבים עם מוצר שכבר הוגדר ונבנה נכון."
          dir="rtl"
          sectionClassName="bg-[#F4F1EC] py-[var(--space-section)]"
          containerClassName="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4"
          links={[
            { href: "/growth-guides/how-to-grow-small-business-online", label: "איך לגדול אונליין כעסק קטן" },
            { href: "/growth-guides/how-to-get-leads", label: "איך לייצר לידים" },
          ]}
          indexLink={{ href: "/growth-guides", label: "לכל המדריכים" }}
        />
        <PackagesSection />
        <InlineLeadForm
          title="השארת פרטים"
          subtitle="ספרו בקצרה על הרעיון - נחזור אליכם עם הצעדים הבאים (אפיון מוצר, UI/UX או פיתוח)."
          pagePathOverride="/idea-to-product"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
