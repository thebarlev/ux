/**
 * nav.config.ts — מקור האמת היחיד לניווט ההאדר בכל האתר.
 *
 * הועבר מילה-במילה מ-newHome.constants.ts (NH_NAV_LINKS + NH_HEADER_CTA),
 * שהיה ההאדר הקנוני של עמוד הבית. מעכשיו כל שינוי בלינקים נעשה כאן בלבד
 * ומשפיע על כל העמודים.
 *
 * שלב 2 (עתידי): להוסיף כאן NAV_LINKS_EN ולאחד גם את HeaderEN.
 */

export type NavChild = { readonly href: string; readonly label: string }
export type NavItem =
  | { readonly href: string; readonly label: string }
  | { readonly label: string; readonly children: readonly NavChild[] }

/** Auditor "website scan" entry point on the app, with campaign tracking. */
const AUDITOR_SCAN_URL =
  "https://app.uxellent.com/auditor?link_id=a_basic&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing"

export const NAV_LINKS = [
  {
    // External absolute URL — Next's <Link> renders it as a plain anchor.
    href: AUDITOR_SCAN_URL,
    label: "סריקת אתר",
  },
  // The five links below used to point at dedicated agency-service pages.
  // Those pages now 301 away (redesign/marketing-2026-08, redirect-map.html),
  // so each href here points straight at the final destination — never at a
  // redirected URL. "קידום עסקים בגוגל וב-AI" is the one exception: its page
  // redirects to /growth-guides (a content hub), not to the home page.
  { href: "/", label: "מאיפיון למוצר" },
  { href: "/", label: "עיצוב ומיתוג" },
  {
    label: "פיתוח AI",
    children: [
      { href: "/", label: "פיתוח אתרים בסביבת AI" },
      { href: "/", label: "פיתוח תוכנה בסביבת AI" },
    ],
  },
  {
    label: "שיווק",
    children: [
      { href: "/", label: "שיווק PPC" },
      { href: "/growth-guides", label: "קידום עסקים בגוגל וב-AI" },
    ],
  },
  { href: "/contact", label: "יצירת קשר" },
] as const satisfies readonly NavItem[]

export const HEADER_CTA = {
  // Auth pages go straight to the app root, not the auditor sub-paths.
  register: { href: "https://app.uxellent.com/register", label: "הצטרפות" },
  login: { href: "https://app.uxellent.com/login", label: "התחברות" },
} as const

/**
 * נתיבים שבהם ההאדר הגלובלי לא מרונדר:
 * - /lp — עמודי קמפיין מתוכננים בלי האדר (החלטה מתועדת).
 * - /checkout — מסך תשלום מינימלי (הכרעת ברירת מחדל 28.7).
 * - /thanks — לעמודי ההצלחה יש שורת "חזרה לאתר" משלהם.
 * - /en — בשלב 1 האנגלית נשארת עם HeaderEN דרך en/layout (שלב 2 יאחד).
 * - /, /pricing, /products, /how-it-works, /included, /blog — עיצוב 2026-08
 *   (redesign/marketing-2026-08): לעמודים האלה יש RedesignHeader משלהם.
 * - /admin — עמוד ניהול פנימי, בלי כרום ציבורי בכלל.
 */
export const HEADERLESS_PATTERNS = [
  /^\/lp(\/|$)/,
  /^\/checkout(\/|$)/,
  /^\/thanks(\/|$)/,
  /^\/en(\/|$)/,
  /^\/$/,
  /^\/pricing(\/|$)/,
  /^\/products(\/|$)/,
  /^\/how-it-works(\/|$)/,
  /^\/included(\/|$)/,
  /^\/blog(\/|$)/,
  /^\/why-us(\/|$)/,
  /^\/admin(\/|$)/,
] as const
