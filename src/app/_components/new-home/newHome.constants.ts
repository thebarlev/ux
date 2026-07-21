/**
 * Copy + data for the alternative home page (/new-home).
 * Kept separate from home.constants.ts so the live home page is untouched.
 *
 * The copy here is final and approved. It must stay verbatim.
 */

export type HeroCopy = {
  title: string
  subtitle: string
  cta: string
}

/** Approved, verbatim. Do not edit. */
export const HERO: HeroCopy = {
  title: "מרעיון למוצר חי, במקום אחד.",
  subtitle:
    "אנחנו צוות קטן ורעב שמלווה אתכם מהעיצוב והאפיון ועד הפיתוח והשיווק, עם יותר מ-25 שנות ניסיון וצוות מתכנתים מנצח.",
  cta: "בואו נדבר",
}

/**
 * Founder story, first person, one entry per rendered paragraph.
 * Approved, verbatim. Do not edit.
 */
export const STORY_PARAGRAPHS: readonly string[] = [
  "למדתי עיצוב שלוש שנים באיטליה, וחזרתי ארצה עם רעב לבנות דברים שאנשים באמת משתמשים בהם. ניהלתי את מחלקת הדיגיטל ב‑Max (לשעבר לאומי קארד), ובהמשך עמדתי בראש אגף העיצוב בחברת פורקס בינלאומית במשך שמונה שנים. בעשור האחרון אני עצמאי, ועבדתי לצד חברות ומותגים כמו אלטשולר שחם, ישראכרט, הורייזון, אנקר, סאונדקור ו‑BuyMe.",
  "כל התחנות האלה לימדו אותי דבר אחד. הפער בין רעיון טוב למוצר חי הוא כמעט אף פעם לא הרעיון עצמו, אלא כל מה שצריך לקרות סביבו כדי שהוא יעבוד. בדיוק את הפער הזה Uxellent באה לסגור.",
] as const

export type ClientLogo = {
  src: string
  alt: string
}

/**
 * Logos for this page only. Separate from CLIENT_LOGOS in home.constants.ts,
 * which serves the live home page and is deliberately left untouched.
 *
 * Each file was opened and rendered to confirm it shows the brand it is
 * credited to here. Anker and BuyMe are named in the story copy but have no
 * asset in public/logos, so they are not listed; six logos fill the 3- and
 * 6-column grids exactly, with no orphan row.
 */
export const NEW_HOME_LOGOS: readonly ClientLogo[] = [
  { src: "/logos/Altshuler_logo-3.svg", alt: "אלטשולר שחם" },
  { src: "/logos/Isracarrd_logo-3.svg", alt: "ישראכרט" },
  { src: "/logos/horizon_svg-3.svg", alt: "הורייזון" },
  { src: "/logos/Soundcore_svg-3.svg", alt: "סאונדקור" },
  { src: "/logos/Logo_Carrefour-5.svg", alt: "Carrefour" },
  { src: "/logos/max_svg1-3.svg", alt: "Max" },
] as const

export type ProjectCard = {
  id: string
  name: string
  description: string
  ctaLabel: string
  href: string
  /** Real artwork once supplied; a placeholder renders while this is absent. */
  image?: string
}

export const PROJECTS: readonly ProjectCard[] = [
  {
    id: "auditor",
    name: "Auditor",
    description: "כלי שמנתח את האתר שלכם ומשפר את החשיפה שלו בגוגל ובמנועי ה-AI.",
    ctaLabel: "לבדיקת הדומיין שלכם",
    href: "#",
  },
  {
    id: "invoices",
    name: "חשבוניות דיגיטליות",
    description: "מערכת להפקת חשבוניות ומסמכים דיגיטליים לעסק.",
    ctaLabel: "להצטרפות חינם",
    href: "#",
  },
  {
    // TODO: replace href with the final landing page once it is live.
    id: "mioshy",
    name: "אבחון זוגיות",
    description: "מערכת אונליין לניהול תהליכי ייעוץ זוגי.",
    ctaLabel: "הצטרפות",
    href: "#",
  },
  {
    id: "meatbeat",
    name: "MeatBeat",
    description: "רשת חברתית ואפליקציה לחובבי בשר.",
    ctaLabel: "הורדת האפליקציה",
    href: "#",
  },
] as const

/** Approved, verbatim. Do not edit. */
export const CONTACT_INTRO =
  "השאירו פרטים ונחזור אליכם לשיחה קצרה. הפרטים מגיעים ישירות למייל שלנו."
