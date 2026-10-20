import type { Metadata } from "next"

import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import type { LegalPage } from "./HomePage"

/** Titles and descriptions of the six legal pages (uxb-025, tbl-027 / tbl-028). */
const META: Record<LegalPage, { he: [string, string]; en: [string, string] }> = {
  terms: {
    he: ["תנאי שימוש | UXellent", "תנאי השימוש בפלטפורמת UXellent: החשבון, החבילות והתשלום, החידוש, התוכן שלכם והאחריות."],
    en: ["Terms of use | UXellent", "The terms for using UXellent: your account, plans and payment, renewal, your content and liability."],
  },
  privacy: {
    he: ["מדיניות פרטיות | UXellent", "איזה מידע UXellent אוספת, למה, עם מי הוא משותף, כמה זמן נשמר ואיך מממשים את הזכויות שלכם."],
    en: ["Privacy policy | UXellent", "What UXellent collects, why, who it is shared with, how long it is kept and how to use your rights."],
  },
  cookies: {
    he: ["מדיניות עוגיות | UXellent", "אילו עוגיות פועלות באתר UXellent, איך מבקשים הסכמה ואיך משנים את הבחירה."],
    en: ["Cookie policy | UXellent", "Which cookies run on the UXellent site, how we ask for consent and how to change your choice."],
  },
  accessibility: {
    he: ["הצהרת נגישות | UXellent", "הצהרת הנגישות של אתר UXellent: מה עשינו, מה עוד לא מושלם ואיך פונים אלינו בנושא נגישות."],
    en: ["Accessibility statement | UXellent", "Accessibility on the UXellent site: what we did, known limitations and how to contact us about accessibility."],
  },
  cancel: {
    he: ["ביטול עסקה והחזרים | UXellent", "איך מבטלים מנוי ב-UXellent, מה הזכויות שלכם לפי החוק ומה קורה אחרי הביטול."],
    en: ["Cancellation and refunds | UXellent", "How to cancel a UXellent subscription, your rights under the law and what happens after you cancel."],
  },
  "acceptable-use": {
    he: ["שימוש מותר והסרת תוכן | UXellent", "מה אסור לפרסם באתרים שנבנים ב-UXellent, איך מדווחים על תוכן ואיך אנחנו מטפלים בדיווח."],
    en: ["Acceptable use and content removal | UXellent", "What may not be published on sites built with UXellent, how to report content and how we handle reports."],
  },
}

export function legalMetadata(page: LegalPage, lang: "he" | "en"): Metadata {
  const [title, description] = META[page][lang]
  const he = `/${page}`
  const en = `/en/${page}`
  return {
    metadataBase: new URL("https://uxellent.com"),
    title: { absolute: title },
    description,
    alternates: { canonical: lang === "en" ? en : he, languages: heEnAlternateLanguages(he, en) },
    openGraph: { title, description, url: `https://uxellent.com${lang === "en" ? en : he}`, siteName: "UXellent", locale: lang === "en" ? "en_US" : "he_IL", type: "website" },
    robots: { index: true, follow: true },
  }
}
