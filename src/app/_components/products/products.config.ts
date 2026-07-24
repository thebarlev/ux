import type { Metadata } from "next/types"

import type { LeadSource } from "@/app/_components/home/Popup"
import type { ServiceAboutItem } from "@/app/_components/services/ServiceAboutSection"
import type { ServiceFaqItem } from "@/app/_components/services/ServiceFaqSection"

export type ProductSectionType =
  | "SiteHeader"
  | "ServiceHero"
  | "LogoRow"
  | "VisionToExecutionSection"
  | "AboutSection"
  | "DoubleHeadingCtaSection"
  | "FaqSection"
  | "PriceSection"
  | "PackagesSection"
  | "SiteFooter"

export type ProductPageConfig = {
  slug: "develop-ai" | "invoice" | "account-ai"
  metadata: Metadata
  hero: {
    title: string
    subtitle?: string
    heroSubheading?: string
    tags?: readonly string[]
    ctaLabel: string
    ctaSource: LeadSource
    ctaHref?: string
    imageSrc?: string
    imageAlt?: string
  }
  vision?: {
    title?: string
    subtitle?: string
    ctaLabel?: string
    source?: LeadSource
    ctaHref?: string
    cards?: Array<{ id: string; src: string; alt: string; caption: string }>
  }
  doubleHeading: {
    title: string
    subtitle: string
    buttonLabel: string
    buttonSource: LeadSource
  }
  about?: {
    title: string
    subtitle: string
    ctaLabel: string
    ctaSource: LeadSource
    ctaHref?: string
    items: ServiceAboutItem[]
  }
  faq?: {
    title: string
    items: ServiceFaqItem[]
  }
  sections: readonly ProductSectionType[]
}

const SECTIONS_ORDER: readonly ProductSectionType[] = [
  "SiteHeader",
  "ServiceHero",
  "LogoRow",
  "VisionToExecutionSection",
  "AboutSection",
  "PackagesSection",
  "DoubleHeadingCtaSection",
  "FaqSection",
  "SiteFooter",
] as const

export const developAiConfig: ProductPageConfig = {
  slug: "develop-ai",
  metadata: {
    title: "פיתוח מערכות AI לעסקים | Uxellent",
    description: "פיתוח מערכות AI ותוכנה בהתאמה אישית לעסקים עם ארכיטקטורה נכונה, אוטומציות ופיתוח full-stack מאובטח.",
  },
  hero: {
    title: "פיתוח תוכנה/מערכות בסביבת AI",
    subtitle: "",
    heroSubheading: "Python, React, Node.js - מערכות בהתאמה אישית עם AI בליבה",
    ctaLabel: "להשארת פרטים",
    ctaSource: "design_development",
    imageSrc: "/services/developai/vow1.webp",
    imageAlt: "פיתוח מבוסס AI",
    
  },
  vision: {
    title: "בוטיק טכנולוגי. רמת Enterprise.",
    subtitle: "אנחנו מאפיינים, מעצבים ומפתחים מערכות פנימיות מורכבות בהתאמה מלאה, ברמת Enterprise, עם ארכיטקטורה חכמה ושילוב AI כחלק מהליבה.",
    ctaLabel: "להשארת פרטים",
    source: "design_development",
    cards: [
      { id: "develop-ai-1", src: "/services/developai/1.webp", alt: "מהירות פיתוח גבוהה משמעותית", caption: "מהירות פיתוח גבוהה משמעותית" },
      { id: "develop-ai-2", src: "/services/developai/2.webp", alt: "חיסכון בעלויות", caption: "חיסכון בעלויות" },
      { id: "develop-ai-3", src: "/services/developai/3.webp", alt: "ניתוח נתונים חכם בזמן אמת", caption: "ניתוח נתונים חכם בזמן אמת" },
      { id: "develop-ai-4", src: "/services/developai/4.webp", alt: "גמישות עסקית אמיתית", caption: "גמישות עסקית אמיתית" },
    ],
  },
  doubleHeading: {
    title: "למי זה מתאים?",
    subtitle: "חברות קיימות עם תהליכים מורכבים, ארגונים שרוצים שליטה מלאה, עסקים שצומחים מהר מדי למערכת מדף, חברות שרוצות יתרון תחרותי אמיתי",
    buttonLabel: "להשארת פרטים",
    buttonSource: "design_development",
  },
  about: {
    title: "ניסיון במערכות מורכבות אפיון, עיצוב ופיתוח",
    subtitle: "במשך 20 שנה הובלנו אפיון, עיצוב ופיתוח של מערכות מורכבות בארגונים גדולים.",
    ctaLabel: "להשארת פרטים",
    ctaSource: "design_development",
    items: [
      { id: "develop-ai-about-1", title: "מיפוי עומק עסקי", description: "אנחנו ממפים תהליכים קיימים, נקודות חיכוך, כפילויות עבודה, זרימת מידע, תלויות בין מחלקות, והחלטות קריטיות שמתבצעות ביום-יום.", icon: "/about/briefcase.svg" },
      { id: "develop-ai-about-2", title: "תכנון ארכיטקטורה מותאמת", description: "אנחנו מגדירים מבנה מערכת שמבוסס על תהליכים אמיתיים, עומסים צפויים, אינטגרציות קיימות וצמיחה עתידית.", icon: "/about/1.svg" },
      { id: "develop-ai-about-3", title: "פיתוח מלא, Front, Backend ו-AI", description: "בניית מערכת מלאה מקצה לקצה , חוויית משתמש, לוגיקה עסקית ותשתית AI כחלק מהליבה.", icon: "/about/code.svg" },
    ],
  },
  faq: {
    title: "שאלות נפוצות",
    items: [

      {
        id: "develop-ai-faq-2",
        question: "האם אתם עובדים גם עם AI?",
        answer: "כן. משלבים אוטומציות ויכולות AI לפי הצורך והערך העסקי.",
      },
      {
        id: "develop-ai-faq-3",
        question: "כמה זמן לוקח פרויקט?",
        answer: "מתחייבים לעמוד בזמנים ולמסור את המוצר כפי שהוגדר בבאפיון, אנחנו מתחילים באפיון עומק של הצורך העסקי, תהליכי העבודה והיעדים. רק לאחר מסמך אפיון ברור ומוסכם מתחיל הפיתוח, עם אבני דרך, שקיפות מלאה ואחריות לתוצאה שהוגדרה מראש.",
      },
      {
        id: "develop-ai-faq-4",
        question: "איך מתבצע תהליך האפיון והאם אתם מתחייבים לתוצאה?",
        answer: "תלוי בהיקף. לרוב מתחילים עם שלב הגדרה קצר ואז ריצות פיתוח שבועיות.",
      },
    {
      id: "develop-ai-faq-5",
      question: "האם ניתן להתממשק לכל API או מערכת קיימת?",
      answer: "כן. אנחנו מתממשקים לכל מערכת שמאפשרת API, Webhooks או חיבור ישיר לבסיס נתונים. כולל מערכות CRM, הנהלת חשבונות, סליקה, SaaS, BI ומערכות פנים ארגוניות.",
    },
    {
      id: "develop-ai-faq-6",
      question: "האם אתם מתחייבים לעמידה בזמנים?",
      answer: "הפיתוח מחולק לשלבים ברורים עם לוחות זמנים מוגדרים מראש כל שלב נמסר לבדיקה ואישור כדי להבטיח עמידה ביעדים וללא הפתעות.",
    },
    {
      id: "develop-ai-faq-7",
      question: "האם ניתן להטמיע AI במערכת קיימת?",
      answer: "כן. ניתן לשלב מודלי AI לניתוח נתונים, אוטומציה, תחזיות, עיבוד מסמכים וצ׳אטבוטים, גם על מערכת קיימת.",    },
    {
      id: "develop-ai-faq-8",
      question: "האם אתם מלווים גם לאחר העלייה לאוויר?",
      answer: "כן. אנחנו מספקים תחזוקה, שדרוגים, ניטור וביצועי מערכת לאורך זמן.",
    },
    ],
  },
  sections: SECTIONS_ORDER,
}

export const invoiceConfig: ProductPageConfig = {
  slug: "invoice",
  metadata: {
    title: "חשבונית דיגיטלית מאובטחת | Uxellent",
    description: "מערכת לחשבונית דיגיטלית מאובטחת עם חתימה דיגיטלית, חיבור לרשות המסים וניהול מסמכים עסקיים לעסקים.",
  },
  hero: {
    title: "חשבונית דיגיטלית מאובטחת שנה חינם",
    subtitle: "",
    heroSubheading: "הפקת מסמכים, ניהול לקוחות והפקת דוחות - חתימה דיגיטלית מאובטחת וחיבור לרשות המיסים",
    ctaLabel: "להצטרפות",
    ctaSource: "smart_accounting_ai",
    ctaHref: "https://app.uxellent.com",
    imageSrc: "/services/d-green-invocie.webp",
    imageAlt: "Invoice",
  },
  vision: {
    title: "חשבונית דיגיטלית מאובטחת",
    subtitle: "Uxellent מאפשרת הפקת חשבוניות ו-12 סוגי מסמכים עסקיים, עם חתימה דיגיטלית מאובטחת.",
    ctaLabel: "להצטרפות",
    ctaHref: "https://app.uxellent.com",
    source: "smart_accounting_ai",
    cards: [
      { id: "invoice-1", src: "/services/invoice/vow1.webp", alt: "הפקת 12 סוגי מסמכים לניהול העסק והפקת דוחות", caption: "הפקת 12 סוגי מסמכים לניהול העסק והפקת דוחות" },
      { id: "invoice-2", src: "/services/invoice/vow2.webp", alt: "מערכת שנבנתה סביב חוקי ישראל", caption: "מערכת שנבנתה סביב חוקי ישראל" },
      { id: "invoice-3", src: "/services/invoice/vow3.webp", alt: "דשבורד וכלים מתקדמים לניהול העסק", caption: "דשבורד וכלים מתקדמים לניהול העסק" },
      { id: "invoice-4", src: "/services/invoice/vow4.webp", alt: "חיבור ישיר לרשות המיסים כולל הפקת מספר הקצאה", caption: "חיבור ישיר לרשות המיסים כולל הפקת מספר הקצאה" },
    ],
  },
  doubleHeading: {
    title: "עמידה מלאה בדרישות רשות המסים",
    subtitle: 'כל מסמך מותאם לתקנות המעודכנות של רשות המסים, כולל מספר הקצאה.',
    buttonLabel: "להשארת פרטים",
    buttonSource: "smart_accounting_ai",
  },
  about: {
    title: "כל המסמכים העסקיים שלכם, במקום אחד, בלחיצה אחת.",
    subtitle: "חשבוניות, קבלות ומסמכים רגולטוריים עם חתימה דיגיטלית מאובטחת. בחינם לשנה הראשונה",
    ctaLabel: "להצטרפות",
    ctaSource: "smart_accounting_ai",
    ctaHref: "https://app.uxellent.com",
    items: [
      { id: "invoice-about-1", title: "הפקת קבלות / חשבוניות בקלות", description: "הפיקו חשבוניות מס, קבלות וחשבוניות עסקה בפורמט מקצועי - ישירות מהדשבורד, ללא ידע חשבונאי.", icon: "/services/invoice/invoice.svg" },
      { id: "invoice-about-2", title: "חתימה דיגיטלית מאובטחת", description: "כל מסמך נחתם דיגיטלית ומוגן מפני זיוף / שינוי, אמינות מקסימלית מול לקוחות ורשויות.", icon: "/services/invoice/safe.svg" },
      { id: "invoice-about-3", title: "ארכיון מסמכים חכם", description: "כל המסמכים שלכם שמורים, מאורגנים ונגישים בכל זמן, גם ממכשיר נייד", icon: "/services/invoice/archive.svg" },
    ],
  },
  faq: {
    title: "שאלות נפוצות",
    items: [
      { id: "invoice-faq-1", question: "האם ניתן להפיק חשבוניות ומסמכים חשבונאיים בחינם לשנה?", answer: "כן. ניתן להפיק מסמכים חשבונאיים למשך שנה מלאה ללא עלות. כל המסמכים נשמרים אצלנו על פי חוק, כוללים חתימה דיגיטלית מאובטחת ועומדים בכל הדרישות והתקנות של מס הכנסה." },
      { id: "invoice-faq-2", question: "האם המסמכים עומדים בדרישות החוק והרגולציה?", answer: "בהחלט. כל המסמכים מופקים בהתאם לתקנות מס הכנסה ומע״מ, כולל שמירה, אבטחה וחתימה דיגיטלית מאובטחת תקנית." },
      { 
        id: "invoice-faq-3", 
        question: "האם יש תמיכה ושירות לקוחות?", 
        answer: "כן. יש תמיכה אנושית מלאה:\n• צ'אט באתר\n• מייל: support@uxellent.com\n• טלפון / וואטסאפ: 054-5215193\n\nלכל שאלה – אנחנו זמינים." 
      },

      
    ],
  },
  sections: [
    "SiteHeader",
    "ServiceHero",
    "LogoRow",
    "VisionToExecutionSection",
    "AboutSection",
    "DoubleHeadingCtaSection",
    "FaqSection",
    "PackagesSection",
    "PriceSection",
    "SiteFooter",
  ],
}

export const accountAiConfig: ProductPageConfig = {
  slug: "account-ai",
  metadata: {
    title: "רואה חשבון AI לעסקים קטנים | Uxellent",
    description: "רואה חשבון AI לעוסק פטור ומורשה עם ליווי חשבונאי חכם, דיווחים מדויקים ותובנות עסקיות 24/7.",
  },
  hero: {
    title: "רואה חשבון AI ליגה אחרת",
    subtitle: "ה-AI של Uxellent מזהה הזדמנויות רגולטוריות שאחרים מפספסים. הופך את הניהול הפיננסי שלך למדויק, אוטומטי ורווחי הרבה יותר.",
    heroSubheading: "הנהלת חשבונות, דיווח מע״מ, דוחות שנתיים והצהרת הון - מקצועיות של 1,000 רואי חשבון ב־AI אחד",
    ctaLabel: "להשארת פרטים",
    ctaSource: "smart_accounting_ai",
    imageSrc: "/services/d-account-ai.webp",
    imageAlt: "Account AI",
  },
  vision: {
    title: "רואה החשבון AI לעוסקים פטורים / מורשים",
    subtitle: "הנהלת חשבונות, מע״מ, מס הכנסה וביטוח לאומי - מנוהלים חכם, אוטומטית ובפיקוח רגולטורי מלא.",
    ctaLabel: "להשארת פרטים",
    source: "smart_accounting_ai",
    cards: [
      { id: "account-ai-1", src: "/services/developai/1a.webp", alt: "אלגוריתמים מתקדמים לזיהוי חסכון עסקי", caption: "אלגוריתמים מתקדמים לזיהוי חסכון עסקי" },
      { id: "account-ai-2", src: "/services/developai/2a.webp", alt: "סנכרון מסמכים אוטומטי", caption: "סנכרון מסמכים אוטומטי" },
      { id: "account-ai-3", src: "/services/developai/3a.webp", alt: "עמידה מלאה בדרישות הרגולציה", caption: "עמידה מלאה בדרישות הרגולציה" },
      { id: "account-ai-4", src: "/services/developai/4a.webp", alt: "חיבור למערכות ממשלתיות", caption: "חיבור למערכות ממשלתיות" },
    ],
  },
  doubleHeading: {
    title: "דיווחים חכמים. החלטות חכמות.",
    subtitle: "רו״ח AI חכם שמבצע אוטומטית את רוב העבודה החשבונאית השוטפת, בצורה מדויקת ומהירה יותר. במקרים מורכבים ניתן לשלב ליווי אנושי בהתאם לצורך.",
    buttonLabel: "להשארת פרטים",
    buttonSource: "smart_accounting_ai",
  },
  about: {
    title: "הצטרף למהפכת ה-AI שחוסכת לך כסף ומקצועית כמו רואה חשבון אמיתי",
    subtitle: "למי זה מתאים: עוסקים פטורים בעלי עסקים עם מחזור עד 500,000 ₪ בשנה",
    ctaLabel: "להשארת פרטים",
    ctaSource: "smart_accounting_ai",
    items: [
      { id: "account-ai-about-1", title: "חוסכים אלפי שקלים בשנה", description: "במקום לשלם הון עתק בחודש לרו״ח מסורתי - עם Uxellent רואה חשבון AI ישאר לך ההרבה יותר כסף בכיס.", icon: "/about/1.svg" },
      { id: "account-ai-about-2", title: "אפס טעויות, אפס פחדים", description: "ה-AI למד את כל הרגולציה של מס הכנסה, ביטוח לאומי ומע״מ + את הידע של למעלה מ-1,000 רואי חשבון. אתה מקבל מקצועיות של רמה אחרת.", icon: "/about/2.svg" },
      { id: "account-ai-about-3", title: "דוחות בזמן, בלי עיכובים", description: "דוחות חודשיים ודוחות שנתיים מוכנים בזמן, בלי המתנה, בלי \"אני עסוק\", בלי משחקים.",  icon: "/about/3.svg" },
    ],
  },
  faq: {
    title: "שאלות נפוצות",
    items: [
      { id: "account-ai-faq-1", question: "מה זה בעצם רואה חשבון AI?", answer: "רו״ח AI הוא מערכת חכמה שמנתחת את הפעילות העסקית שלך בזמן אמת, מכירה את חוקי מס הכנסה, מע״מ וביטוח לאומי - ועוזרת לך לקבל החלטות מדויקות בלי לפספס כלום." },
      { id: "account-ai-faq-2", question: "איך זה חוסך לי כסף כל חודש?", answer: "המערכת מזהה הוצאות מוכרות, תכנוני מס חוקיים, חוסכת טעויות בדיווחים ומונעת קנסות מיותרים - כך שאתה משלם רק מה שצריך, ולא שקל יותר." },
      { id: "account-ai-faq-3", question: "איך זה יכול להכניס לי יותר כסף?", answer: "רו״ח AI לא רק מחשב - הוא מנתח רווחיות, מזהה שירותים או מוצרים שמכניסים יותר, מתריע על תמחור נמוך מדי ומציע שיפורים שמגדילים רווח נקי." },
      { id: "account-ai-faq-4", question: "זה מחליף רואה חשבון אנושי?", answer: "בטח, זה לא “עוד דוח בסוף חודש” - זה כלי חכם שעובד בשבילך 24/7. במקום תגובה מאוחרת, אתה מקבל שליטה בזמן אמת." },
      { id: "account-ai-faq-5", question: "האם זה מתאים גם לעסק קטן?", answer: "דווקא עסקים קטנים מרוויחים הכי הרבה - כי כל טעות עולה כסף. רו״ח AI נותן לך כלים של משרד גדול, בעלות חודשית נוחה." },
      { id: "account-ai-faq-6", question: "איך אני יודע שהוא באמת מכיר את החוק?", answer: "המערכת מבוססת על רגולציה עדכנית של מס הכנסה, מע״מ וביטוח לאומי, ומתעדכנת בהתאם לשינויים. הכל פועל לפי חוק ובהתאם לנהלים בישראל." },
      { id: "account-ai-faq-7", question: "כמה זמן לוקח להתחיל?", answer: "חיבור מהיר וקל. תוך זמן קצר אתה כבר מקבל תובנות ברורות על מצב העסק והרווחיות שלך." },
      { id: "account-ai-faq-8", question: "למה זה טוב יותר מהתנהלות רגילה?", answer: "כי במקום לעבוד “בדיעבד”, אתה עובד חכם. במקום לנחש - אתה יודע. ובמקום לשלם יותר - אתה שומר על הכסף שלך ומגדיל אותו." },
    ],
  },
  sections: SECTIONS_ORDER,
}

