/**
 * Copy and configuration for the three sections added from the approved
 * reference `docs/uxellent-home-sections.html` (v14): #services, #products and
 * #contact.
 *
 * Every Hebrew string here is transcribed verbatim from that file. The brief
 * (`docs/uxellent-home-implementation-brief.md`, §1 and §6) makes the wording
 * binding: it must not be re-phrased, shortened or "improved". The preselect
 * values in particular are load-bearing — the form matches them against the
 * <select> options by exact string, so a single changed character silently
 * breaks the preselect flow.
 */

/** Latin runs and digits need isolating in RTL copy; see LTR_CLASS consumers. */
export type ServicePane = {
  id: string
  /** Two-digit ordinal, rendered LTR in both the tab and the ghost numeral. */
  num: string
  tabLabel: string
  heading: string
  description: string
  /** Rendered after a "למי זה מתאים?" label. */
  fit: string
  ctaLabel: string
  /** Exact text of the matching <select> option. */
  ctaPreselect: string
}

export const SERVICES_HEAD = {
  kicker: "מה אנחנו עושים",
  heading: "ארבעה דברים שאנחנו עושים. עד הסוף.",
  sub: "צוות אחד קטן ומנוסה שמלווה אותך מהרעיון ועד התוצאה, בלי לתאם בין ארבעה ספקים.",
  tablistLabel: "השירותים שלנו",
  fitLabel: "למי זה מתאים?",
} as const

export const SERVICE_PANES: readonly ServicePane[] = [
  {
    id: "svc-p1",
    num: "01",
    tabLabel: "מרעיון למוצר",
    heading: "מרעיון למוצר",
    description:
      "יש לך רעיון? אנחנו מלווים אותו עד מוצר חי ונושם: אפיון, עיצוב, פיתוח והשקה. בשפה פשוטה, בלי מילים מורכבות, עם מי שכבר עבר את הדרך הזאת הרבה פעמים.",
    fit: "לכל מי שיש לו רעיון ולא יודע איפה להתחיל, ומחפש מישהו שיסביר, ילווה אותו בנאמנות ויביא אותו עד המטרה הסופית.",
    ctaLabel: "בוא נדבר על הרעיון",
    ctaPreselect: "פיתוח מוצר מרעיון",
  },
  {
    id: "svc-p2",
    num: "02",
    tabLabel: "חידוש אתר ותחזוקה שוטפת",
    heading: "חידוש אתר ותחזוקה שוטפת",
    description:
      "מסעדה משקיעה מיליוני שקלים בעיצוב, כי ככה נכנסים לקוחות. האתר שלך לא צריך מיליונים, אבל הוא חייב להיבנות נכון: מומחה לפסיכולוגיה של חוויית משתמש עובר על האתר שלך, נותן המלצות, ואנחנו מיישמים ומתחזקים.",
    fit: "לבעלי עסקים שמתפרנסים מהנוכחות הדיגיטלית שלהם, חנות אונליין או אתר של מותג. נגדיל את ההמרות ונביא יותר תוצאות.",
    ctaLabel: "לבדוק מה מצב האתר שלי",
    ctaPreselect: "חידוש או שיפוץ של האתר",
  },
  {
    id: "svc-p3",
    num: "03",
    tabLabel: "אוטומציות ו-AI לעסק",
    heading: "אוטומציות ו-AI לעסק",
    description:
      "פחות עבודה ידנית, פחות דברים שנופלים בין הכיסאות. אנחנו מחברים AI ואוטומציות לתהליכים שכבר קיימים אצלך, והם רצים מעצמם.",
    fit: "לכל מי שרוצה לחסוך שעות עבודה: משימות שחוזרות על עצמן, עבודה שדורשת דיוק בפרטים, סריקת מסמכים, חיבור בין מערכות והעברת מידע ממקום למקום, הכול באופן עצמאי.",
    ctaLabel: "איפה זה יכול לעזור לי",
    ctaPreselect: "אוטומציות ו-AI לעסק",
  },
  {
    id: "svc-p4",
    num: "04",
    tabLabel: "שיווק דיגיטלי",
    heading: "שיווק דיגיטלי",
    // The ROAS acronym is isolated at render time, not here, so the copy stays
    // a plain string that can be diffed against the reference file.
    description:
      "אנחנו לא רק מריצים קמפיינים. מטמיעים אנליטיקס ואירועי מדידה, מזהים הזדמנויות בדאטה, יוצרים קמפיינים חכמים ומנהלים אותם עם ROAS ברור. המטרה: להגדיל את הרווחיות העסקית, לא רק את הקליקים.",
    fit: "לעסקים שכבר מפרסמים ורוצים שכל שקל מדיה יחזיר יותר.",
    ctaLabel: "רוצה יותר תוצאות?",
    ctaPreselect: "שיווק דיגיטלי",
  },
] as const

/** The download link in service tab 01; its own preselect drives the kit flow. */
export const KIT_LINK = {
  label: "להורדת תוכנית העבודה ליזם (PDF)",
  preselect: "הורדת תוכנית העבודה ליזם (PDF)",
} as const

/* ------------------------------------------------------------ #products --- */

export const INITIATIVES_HEAD = {
  kicker: "היוזמות שלנו",
  heading: "בונים כלים חכמים. מפתחים פתרונות שמצמיחים את העסק שלך.",
  sub: "אחרי עשרים וחמש שנה של פיתוח אפליקציות, מערכות מורכבות ואוטומציות, אנחנו יודעים בדיוק מה עסקים צריכים כדי לעבוד חכם יותר. הפכנו את הניסיון הזה לכלים פרקטיים ונגישים, כדי שתוכלו להתנסות, לחסוך זמן ולראות תוצאות בשטח.",
  tablistLabel: "היוזמות שלנו",
} as const

export const INITIATIVE_TABS = [
  { id: "init-p1", num: "01", label: "סריקת האתר שלכם וקבלת ציון" },
  { id: "init-p2", num: "02", label: "חשבוניות דיגיטליות" },
] as const

export const AUDITOR_PANE = {
  heading: "סריקת Auditor לאתר שלכם, בחינם",
  description:
    "המערכת שפיתחנו קוראת את האתר שלכם עמוד אחרי עמוד, בודקת נראות בגוגל ובמנועי ה-AI, ומחזירה ציון לדומיין ותכנית פעולה מסודרת. לא רק דוח.",
  /** Each capability leads with a bold clause, then the explanation. */
  capabilities: [
    {
      bold: "סריקת עומק.",
      rest: " קריאה של כל עמוד באתר: מבנה, תוכן ותקינות טכנית.",
    },
    {
      bold: "בדיקות Lighthouse.",
      rest: " ביצועים, נגישות ו-SEO עם מדדי Core Web Vitals אמיתיים מגוגל.",
    },
    {
      bold: "מילות חיפוש אמיתיות.",
      rest: " מה הקהל שלכם באמת מחפש, על בסיס נתוני חיפוש חיים.",
    },
    {
      bold: "ניתוח AI ותכנית פעולה.",
      rest: " מודל שפה שהופך את הממצאים לרשימת צעדים מדורגת.",
    },
  ],
  ctaLabel: "להריץ סריקה חינם",
  ctaPreselect: "אבחון חינם לאתר ולנראות בגוגל וב-AI",
} as const

/**
 * Real Google review, quoted exactly as the customer wrote it. The brief (§1)
 * forbids editing the wording or the punctuation.
 */
export const DAN_REVIEW = {
  avatarSrc: "/reviews/dan-arami.png",
  name: "דן עראמי",
  starsLabel: "חמישה כוכבים",
  // Straight quotes, exactly as in the reference file.
  quote: '"שירות מקצועי ויעיל!! תוצאות מעל ומעבר למצופה.. מומלץ בחום!!"',
  ctaLabel: "תנו לנו המלצה בגוגל",
  ctaTail: "ושם תמצאו גם את כל ההמלצות שלנו",
} as const

export const INVOICE_PANE = {
  badge: "חי באוויר · SaaS מלא מהדפדפן",
  heading: "חשבוניות דיגיטליות",
  description:
    "מערכת הפקת מסמכים חשבונאיים שבנינו עבורכם, עם ליבה רגולטורית מלאה. עד עשרה מסמכים בחודש בחינם.",
  capabilities: [
    "חתימה דיגיטלית מאובטחת על כל מסמך",
    "מסמך שהופק ננעל ואינו ניתן לשינוי",
    // SHA-256 is isolated at render time.
    "PDF עם טביעת אצבע (SHA-256) לאימות שלמות",
    'לוגיקה חשבונאית מלאה: קבלות, תשלומים ומע"מ',
  ],
  ctaLabel: "להצטרפות חינם",
} as const

/* ------------------------------------------------------------- #contact --- */

export const LEAD_FORM_HEAD = {
  kicker: "מדברים?",
  heading: "ספר לנו מה העסק שלך צריך",
  sub: "משאירים פרטים וחוזרים אליך תוך יום עסקים. שיחה קצרה, בלי התחייבות.",
} as const

export const LEAD_FORM_FIELDS = {
  name: "שם מלא",
  phone: "טלפון",
  email: "אימייל",
  interest: "מה הכי מעניין אותך?",
  interestPlaceholder: "בחר מהרשימה",
  message: "כמה מילים על העסק (לא חובה)",
  messagePlaceholder: "מה יש היום, ומה היית רוצה שיקרה",
  submit: "דברו איתי",
  submitting: "שולח...",
  note: "בלי ספאם ובלי רשימות תפוצה. הפרטים משמשים רק כדי לחזור אליך.",
  phoneAltLead: "מעדיף לדבר עכשיו?",
} as const

/**
 * The <select> options. Six CTAs across the page preselect one of these by
 * exact string match, so the order may change but the text may not.
 */
export const INTEREST_OPTIONS = [
  "אבחון חינם לאתר ולנראות בגוגל וב-AI",
  "הורדת תוכנית העבודה ליזם (PDF)",
  "חידוש או שיפוץ של האתר",
  "תחזוקה שוטפת לאתר",
  "אוטומציות ו-AI לעסק",
  "פיתוח מוצר מרעיון",
  "שיווק דיגיטלי",
  "עוד לא יודע, בואו נדבר",
] as const

export const LEAD_FORM_MESSAGES = {
  missingFields: "חסר שם או טלפון, שנייה לפני ששולחים.",
  // Softened per brief §5א: the original wording promised an emailed copy,
  // which nothing sends — there is no Autoresponder on the free plan. The
  // field is still required, so the reason is stated without the promise.
  // Revert to the promise only if a Web3Forms Pro Autoresponder is set up.
  missingEmailForKit: "כדי להמשיך להורדה, צריך למלא אימייל.",
  successKit: "קיבלנו! מעבירים אותך לעמוד ההורדה...",
  success: "קיבלנו! חוזרים אליך תוך יום עסקים.",
  networkError: "משהו השתבש בשליחה. אפשר להתקשר: 054-5215193",
} as const

/** Phone shown under the form; the display form is isolated LTR. */
export const LEAD_PHONE = { href: "tel:0545215193", display: "054-5215193" } as const

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

/** Hidden field values Web3Forms echoes into the notification email. */
export const WEB3FORMS_FROM_NAME = "אתר Uxellent"

/**
 * Subject prefix. The brief (§3) pins this: Itzik's Zoho filter forwards to the
 * second mailbox by matching it, so changing it silently breaks the forward.
 */
export const LEAD_SUBJECT_PREFIX = "ליד חדש מהאתר"
export const LEAD_INTEREST_FALLBACK = "לא צוין"

/* --------------------------------------------------------- placeholders --- */

/**
 * Unresolved at time of writing — Itzik supplies these before the branch is
 * merged (brief §5). They are deliberately kept as obvious placeholders rather
 * than plausible-looking guesses, so an accidental production deploy fails
 * loudly instead of pointing customers at a wrong URL.
 *
 * `PLACEHOLDERS_RESOLVED` is asserted by scripts/check-placeholders.mjs, which
 * runs in the production build only.
 */
/**
 * Public by design: Web3Forms access keys are client-side credentials, and the
 * brief (§3) confirms exposing this one in the bundle is intended. Spam is
 * handled by the honeypot, not by hiding the key.
 */
export const WEB3FORMS_ACCESS_KEY = "6748f44f-e449-4e3d-8529-a3c69c25f4c8"
/** The live invoicing page. A dedicated LP at /invoices is planned to replace it. */
export const INVOICE_LP_URL = "/invoice"
export const GOOGLE_REVIEWS_URL = "https://share.google/O7QryMswPXvwsNCFh"

/** Resolved: the PDF now lives in the repo under public/downloads. */
export const STARTUP_KIT_URL = "/downloads/startup-kit.pdf"

/** Resolved: the success page built from docs/uxellent-kit-thanks.html. */
export const KIT_THANKS_URL = "/thanks/startup-kit"
