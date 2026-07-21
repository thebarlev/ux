/**
 * Copy + data for the alternative home page (/new-home).
 * Kept separate from home.constants.ts so the live home page is untouched.
 *
 * HERO_A / STORY_A are the approved copy and must stay verbatim.
 * HERO_B / STORY_B are the alternative variants offered for selection.
 */

export type HeroCopy = {
  title: string
  subtitle: string
  cta: string
}

/** Approved, verbatim. Do not edit. */
export const HERO_A: HeroCopy = {
  title: "מרעיון למוצר חי, במקום אחד.",
  subtitle:
    "אנחנו צוות קטן ורעב שמלווה אתכם מהעיצוב והאפיון ועד הפיתוח והשיווק, עם יותר מ-25 שנות ניסיון וצוות מתכנתים מנצח.",
  cta: "בואו נדבר",
}

/** Alternative variant for review. */
export const HERO_B: HeroCopy = {
  title: "הצוות שלוקח את הרעיון עד הסוף.",
  subtitle:
    "אנחנו מלווים אתכם מהשרטוט הראשון ועד המוצר שרץ בשטח, עם יותר מ-25 שנות ניסיון וצוות מתכנתים שיודע לבנות נכון מהפעם הראשונה.",
  cta: "בואו נדבר",
}

/** Approved, verbatim. Do not edit. */
export const ABOUT_TEXT =
  "אנחנו צוות קטן ורעב, מחויבים להצלחה שלכם. כל אתגר שתביאו, אנחנו לוקחים עליו אחריות מלאה: עיצוב, אפיון, פיתוח ושיווק. יותר מ-25 שנות ניסיון מתכנסות כאן למקום אחד, עם צוות מתכנתים מנצח שנותן לכם את החבילה השלמה."

/** Approved, verbatim. Do not edit. */
export const STORY_A =
  "רוב העסקים מפזרים את הפרויקט בין כמה ספקים. מעצב במקום אחד, מאפיין בשני, מתכנת בשלישי, ומישהו נוסף שאמור לדאוג לשיווק. בדרך הזו הרעיון מאבד את עצמו. אצלנו הכל יושב תחת צוות אחד שמכיר את המוצר שלכם מהרגע הראשון, בונה אותו נכון, ומלווה אותו גם אחרי ההשקה. ככה הזמן מתקצר, ההיגיון נשמר, והמוצר יוצא שלם."

/** Alternative variant for review. */
export const STORY_B =
  "כשהפרויקט מתחלק בין ארבעה ספקים, אף אחד מהם לא באמת אחראי על התוצאה. המעצב מסיים את שלו ועובר הלאה, המתכנת מקבל קבצים בלי הקשר, והשיווק נכנס לתמונה כשכבר מאוחר מדי לשנות משהו. אנחנו עובדים אחרת. אותו צוות שמאפיין את המוצר גם מעצב אותו, גם בונה אותו וגם דואג שהוא יגיע ללקוחות שלכם. האחריות נשארת במקום אחד, ואיתה נשמר גם ההיגיון של המוצר."

export type ProjectCard = {
  id: string
  name: string
  description: string
  ctaLabel: string
  href: string
}

export const PROJECTS: readonly ProjectCard[] = [
  {
    id: "auditor",
    name: "Auditor",
    description: "כלי שמנתח את האתר שלכם ומשפר את החשיפה שלו בגוגל ובמנועי ה-AI.",
    ctaLabel: "כניסה",
    href: "#",
  },
  {
    id: "invoices",
    name: "חשבוניות דיגיטליות",
    description: "מערכת להפקת חשבוניות ומסמכים דיגיטליים לעסק.",
    ctaLabel: "כניסה",
    href: "#",
  },
  {
    id: "mioshy",
    name: "Mioshy",
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
