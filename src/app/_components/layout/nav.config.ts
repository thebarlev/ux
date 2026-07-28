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
  { href: "/idea-to-product", label: "מאיפיון למוצר" },
  { href: "/design", label: "עיצוב ומיתוג" },
  {
    label: "פיתוח AI",
    children: [
      { href: "/develop", label: "פיתוח אתרים בסביבת AI" },
      { href: "/develop-ai", label: "פיתוח תוכנה בסביבת AI" },
    ],
  },
  {
    label: "שיווק",
    children: [
      { href: "/marketing/ppc", label: "שיווק PPC" },
      { href: "/seo-ai", label: "קידום עסקים בגוגל וב-AI" },
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
 */
export const HEADERLESS_PATTERNS = [/^\/lp(\/|$)/, /^\/checkout(\/|$)/, /^\/thanks(\/|$)/, /^\/en(\/|$)/] as const
