/**
 * Copy + data for the alternative home page (/new-home).
 * Kept separate from home.constants.ts so the live home page is untouched.
 *
 * The copy here is final and approved. It must stay verbatim.
 */

export type HeroCta = { label: string; href: string }
export type HeroCopy = {
  chips: readonly string[]
  title: string
  subtitle: string
  ctaPrimary: HeroCta
  ctaSecondary: HeroCta
}

/**
 * Hero copy for the single dark ("premium") hero. Approved, verbatim.
 * Do not edit.
 */
export const HERO: HeroCopy = {
  chips: ["מקצה לקצה", "SaaS & AI"],
  title: "מבססים את הרעיון, בונים את המערכת, מביאים את הלקוחות.",
  subtitle:
    "צוות קטן, חד ומנוסה שבונה מוצרי SaaS ואפליקציות AI מקצה לקצה. מעל 25 שנות ניסיון באפיון, עיצוב, פיתוח ושיווק דיגיטלי.",
  ctaPrimary: { label: "בואו נדבר על הפרויקט שלכם", href: "#contact" },
  ctaSecondary: { label: "צפו בעבודות שלנו", href: "#projects" },
}

/* -------------------------------------------------- dark new-home header --- */

/**
 * Navigation for the dedicated dark new-home header. Same links and structure as
 * the shared SiteHeader (which must not be touched), re-declared here so the
 * header can be styled for the dark hero with a light logo.
 */
export const NH_NAV_LINKS = [
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
] as const

export const NH_HEADER_CTA = {
  register: { href: "https://app.uxellent.com/auditor/register", label: "הצטרפות" },
  login: { href: "https://app.uxellent.com/auditor/login", label: "התחברות" },
} as const

/* ----------------------------------------------------- hero theme carousel - */

/** Month columns for the chart, right-to-left starting from December. */
export const CHART_MONTHS = ["דצמ׳", "נוב׳", "אוק׳", "ספט׳", "אוג׳", "יול׳", "יונ׳", "מאי"] as const
export const CHART_BAR_HEIGHTS = [78, 64, 70, 52, 58, 44, 49, 38] as const

export type ThemeKpi = { label: string; value: string; delta: string; deltaNeg?: boolean }
export type ThemeFeedRow = { icon: "check" | "doc" | "mail"; text: string; when: string }
export type ThemeMeatFeedRow = { emoji: string; text: string; when: string }
export type ThemeStore = { kind: "apple" | "google"; small: string; name: string }
export type ThemePhoneDoc = { name: string; kind: string; sum: string }

export type ThemeGauge = { label: string; value: string; tone: "violet" | "amber"; offset: number }
export type ThemeCheck = { status: "ok" | "warn"; title: string; sub: string }
export type ThemeProjBar = { value: string; label: string; h: number }

type ThemeCommon = {
  id: string
  /** Label under the carousel dots. */
  label: string
  /** External floating tag riding the panel's top corner, per theme. */
  floatTag: string
}

/** Theme 1 — green invoices dashboard + phone. */
export type InvoicesTheme = ThemeCommon & {
  kind: "invoices"
  board: {
    title: string
    url: string
    chip: string
    kpis: readonly ThemeKpi[]
    feed: readonly ThemeFeedRow[]
  }
  phone: {
    heading: string
    headingSmall: string
    docs: readonly ThemePhoneDoc[]
    form: { title: string; fields: readonly string[]; cta: string }
    done: { title: string; gov: string; note: string }
    fabHint: string
  }
}

/** Theme 2 — violet + amber "Auditor" deep-scan panel (no browser chrome). */
export type AuditorTheme = ThemeCommon & {
  kind: "auditor"
  scan: {
    title: string
    status: string
    gauges: readonly ThemeGauge[]
    checks: readonly ThemeCheck[]
    proj: {
      title: string
      bars: readonly ThemeProjBar[]
      hook: string
    }
  }
}

/** Theme 3 — Mioshy truth-or-dare spin wheel (plum / magenta / lime), playful. */
export type MioshyTheme = ThemeCommon & {
  kind: "mioshy"
  popup: {
    badge: string
    live: string
    question: string
    cta: string
    note: string
  }
}

/**
 * Theme 4 — MeatBeat community dashboard. The same transparent glass board as
 * the invoices theme (chrome + KPIs + line/bar chart + feed), only more
 * transparent and with a warm amber data accent for MeatBeat's identity. No
 * phone: a "download" row with App Store + Google Play badges signals it's an
 * app instead of an iPhone frame.
 */
export type MeatBeatTheme = ThemeCommon & {
  kind: "meatbeat"
  board: {
    title: string
    url: string
    chartTitle: string
    kpis: readonly ThemeKpi[]
    feed: readonly ThemeMeatFeedRow[]
    downloadLabel: string
    stores: readonly ThemeStore[]
  }
}

export type HeroTheme = InvoicesTheme | AuditorTheme | MioshyTheme | MeatBeatTheme

/**
 * Themes shown in the hero mockup carousel. The hero copy stays fixed; only the
 * mockup skin changes — each theme has its own palette, layout, icons and panel.
 * Built as an array so themes 3–4 slot in later; the carousel renders
 * THEME_TOTAL dots and dims the ones past HERO_THEMES.length.
 */
export const HERO_THEMES: readonly HeroTheme[] = [
  {
    kind: "invoices",
    id: "invoices",
    label: "חשבוניות ירוקות",
    floatTag: "חשבונית דיגיטלית",
    board: {
      title: "לוח חשבוניות",
      url: "app.uxellent.com/invoices",
      chip: "מחובר לרשות המסים",
      kpis: [
        { label: "הכנסות החודש", value: "₪48.2k", delta: "+12%" },
        { label: "הוצאות", value: "₪19.6k", delta: "-4%", deltaNeg: true },
        { label: "חשבוניות שהופקו", value: "132", delta: "+9%" },
      ],
      feed: [
        { icon: "check", text: "מספר הקצאה התקבל מרשות המסים", when: "עכשיו" },
        { icon: "doc", text: "חשבונית מס קבלה 1042# הופקה", when: "לפני דקה" },
        { icon: "mail", text: "הקבלה נשלחה ללקוח במייל", when: "לפני 2 ד׳" },
      ],
    },
    phone: {
      heading: "החשבוניות שלי",
      headingSmall: "יולי",
      docs: [
        { name: "אור עיצובים", kind: "חשבונית מס קבלה", sum: "₪2,400" },
        { name: "סטודיו נגר", kind: "קבלה", sum: "₪860" },
      ],
      form: {
        title: "חשבונית מס קבלה חדשה",
        fields: ["לקוח: אור עיצובים", "סכום: ₪2,400 כולל מע״מ"],
        cta: "הפקה ושליחה",
      },
      done: {
        title: "מספר הקצאה התקבל בהצלחה",
        gov: "רשות המסים · חשבונית ישראל",
        note: "החשבונית הופקה ונשלחה",
      },
      fabHint: "לחיצה אחת ליצירה",
    },
  },
  {
    kind: "auditor",
    id: "auditor",
    label: "Auditor",
    floatTag: "ציון לאתר שלך בתוצאות החיפוש בגוגל + AI",
    scan: {
      title: "סריקת עומק לאתר שלך",
      status: "הסריקה הושלמה",
      // r = 52 → circumference ≈ 327; offset = 327·(1 − score/100).
      gauges: [
        { label: "ציון גוגל", value: "82", tone: "violet", offset: 59 },
        { label: "ציון AI", value: "74", tone: "amber", offset: 85 },
      ],
      checks: [
        { status: "ok", title: "מהירות טעינה", sub: "1.2 שניות, מצוין" },
        { status: "ok", title: "מבנה כותרות ותגיות", sub: "היררכיה תקינה" },
        { status: "ok", title: "נתונים מובנים Schema", sub: "מלא ועדכני" },
        { status: "warn", title: "תוכן וקישורים פנימיים", sub: "14 שיפורים מחכים" },
        { status: "ok", title: "התאמה למובייל", sub: "עוברת בכל המסכים" },
        { status: "ok", title: "אבטחה ו-HTTPS", sub: "תעודה תקינה" },
        { status: "ok", title: "מפת אתר ואינדוקס", sub: "נסרק במלואו" },
        { status: "ok", title: "זמן תגובת שרת", sub: "180ms, מהיר" },
        { status: "warn", title: "תיאורי תמונות Alt", sub: "6 תמונות חסרות" },
        { status: "ok", title: "קריאוּת למנועי AI", sub: "התוכן ניתן לציטוט" },
        { status: "ok", title: "תגיות שיתוף Open Graph", sub: "מוגדרות" },
        { status: "ok", title: "כתובות והפניות", sub: "נקיות, בלי שבורות" },
      ],
      proj: {
        title: "צפי גידול בחשיפות אחרי התיקונים",
        bars: [
          { value: "9%+", label: "שבוע", h: 32 },
          { value: "32%+", label: "חודש", h: 54 },
          { value: "78%+", label: "רבעון", h: 80 },
          { value: "2.4×", label: "שנה", h: 96 },
        ],
        hook: "אתם מפספסים יותר מ-12,000 אנשים שמחפשים אתכם בחודש",
      },
    },
  },
  {
    kind: "mioshy",
    id: "mioshy",
    label: "Mioshy",
    floatTag: "משחקים לזוגות אונליין",
    popup: {
      badge: "כנות",
      live: "טעימה חיה",
      // Hardcoded per Itzik; may become a rotating set later.
      question: "מה היית מוחק/ת מהעבר שלנו אם יכולת?",
      cta: "סיבוב נוסף",
      note: "הסיבוב הבא ממשיך את הערב, בתוך המשחק עצמו.",
    },
  },
  {
    kind: "meatbeat",
    id: "meatbeat",
    label: "MeatBeat",
    floatTag: "הרשת החברתית לחובבי בשר",
    board: {
      title: "לוח הקהילה",
      url: "app.meatbeat.com",
      chartTitle: "מגמת פעילות הקהילה",
      // Metrics + trend are true to the product: /insights aggregates
      // community price reports; the app also has reels, follows and recipes.
      kpis: [
        { label: "עוקבים", value: "12.4K", delta: "+8%" },
        { label: "דיווחי מחיר", value: "1,280", delta: "+5%" },
        { label: "רילס החודש", value: "340", delta: "+12%" },
      ],
      feed: [
        { emoji: "🎬", text: "ריל חדש עלה: איך חותכים פילה נכון", when: "עכשיו" },
        { emoji: "👥", text: "דנה התחילה לעקוב אחריך", when: "לפני דקה" },
        { emoji: "🏷️", text: "דיווח מחיר חדש: אנטריקוט ₪129 לק\"ג", when: "לפני 5 ד׳" },
        { emoji: "📖", text: "מתכון נשמר: אסאדו על האש", when: "לפני 8 ד׳" },
      ],
      downloadLabel: "זמין להורדה",
      stores: [
        { kind: "apple", small: "הורידו מ-", name: "App Store" },
        { kind: "google", small: "זמין ב-", name: "Google Play" },
      ],
    },
  },
]

/** The two Mioshy wheel categories, alternating around the 12 slices from top. */
export const MIO_WHEEL_LABELS = ["כנות", "אתגר"] as const

/** Total dots in the theme carousel (themes past HERO_THEMES.length are dimmed). */
export const THEME_TOTAL = 4

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
  /** Exactly three short points, rendered as a marked list. */
  bullets: readonly string[]
  ctaLabel: string
  href: string
  /** Real artwork once supplied; a placeholder renders while this is absent. */
  image?: string
}

export const PROJECTS: readonly ProjectCard[] = [
  {
    id: "auditor",
    name: "Auditor",
    description: "הכלי שמנתח את האתר שלכם ובודק איך הוא נראה בגוגל ובמנועי ה-AI.",
    // Wording follows what the product actually ships, per SEO_AI_PRICING in
    // src/app/seo-ai/page.tsx: a scan, a focused report with a prioritised
    // action list, and visibility in the named AI engines.
    bullets: [
      "בדיקת נראות בגוגל ובמנועי AI כמו ChatGPT ו-Gemini",
      "סריקה של הדומיין, התוכן והמבנה",
      "דוח ממוקד עם רשימת פעולות לפי סדר עדיפות",
    ],
    ctaLabel: "לבדיקת הדומיין שלכם",
    // Same target as the auditor links in SiteHeader (plain href, no target/rel).
    href: "https://app.uxellent.com/auditor",
  },
  {
    id: "invoices",
    name: "חשבוניות דיגיטליות",
    description: "מערכת להפקת חשבוניות ומסמכים דיגיטליים לעסק, בעברית.",
    bullets: [
      "חשבוניות, קבלות ומסמכים דיגיטליים",
      "ניהול לקוחות והמסמכים שלהם במקום אחד",
      "מסמכי PDF מעוצבים בעברית",
    ],
    ctaLabel: "להצטרפות חינם",
    href: "#",
  },
  {
    // TODO: replace href with the final landing page once it is live.
    id: "mioshy",
    name: "Mioshy",
    description: "מערכת אונליין לייעוץ זוגי דיגיטלי, עם מומחים שמלווים את הזוגות.",
    bullets: [
      "אבחון זוגי אונליין",
      "ליווי אישי של מומחים בצ'אט",
      "פרקים חדשים כל שבוע, בקטגוריות שונות",
    ],
    ctaLabel: "הצטרפות",
    href: "#",
  },
  {
    id: "meatbeat",
    name: "MeatBeat",
    description: "רשת חברתית ואפליקציה לחובבי בשר.",
    bullets: [
      "דיווחים בזמן אמת על מחירי הבשר",
      "פוסטים, סרטונים ומעקב אחרי אנשים",
      "מומחים מעולם הקולינריה ומתכונים",
    ],
    ctaLabel: "הורדת האפליקציה",
    href: "#",
  },
] as const

/** Approved, verbatim. Do not edit. */
export const CONTACT_INTRO =
  "הדרך המהירה היא הודעה בוואטסאפ. אפשר גם להשאיר פרטים כאן ונחזור אליכם לתיאום שיחה."

/**
 * Same number as the floating WhatsAppButton, so both entry points reach the
 * one inbox. "לתאם שיחה" is WhatsApp for now; it becomes a calendar link once
 * one is available.
 */
const WHATSAPP_NUMBER = "972545215193"

const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

export const CONTACT_ACTIONS = {
  whatsapp: {
    label: "דברו איתנו בוואטסאפ",
    href: waLink("היי, הגעתי מהאתר ואשמח לשמוע פרטים."),
  },
  // TODO: swap for the booking-calendar link once it exists.
  call: {
    label: "לתאם שיחה",
    href: waLink("אשמח לתאם שיחה קצרה"),
  },
} as const
