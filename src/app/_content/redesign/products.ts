/**
 * Copy for /products (products.html). Kept as a typed data module — not
 * inline JSX — so a future /en/products can reuse this page's structure with
 * translated strings instead of a rebuild (see agent5-brief.md).
 */

export type FeatureViz =
  | { kind: "composer"; typingText: string }
  | { kind: "before-after" }
  | { kind: "landing" }
  | { kind: "chat"; messages: { from: "me" | "ai"; text: string; bold?: string }[] }
  | { kind: "serp"; url: string; title: string; description: string; badges: string[] }
  | { kind: "studio" }

export type Feature = {
  no: string
  title: string
  body: string
  chips: string[]
  cta?: { label: string; href: string }
  flip?: boolean
  viz: FeatureViz
}

export const PRODUCTS_HERO = {
  eyebrow: "מוצרים",
  title: ["מנוע AI אחד.", "כל העסק באוויר."],
  lede: "כותבים בעברית והמערכת עושה את השאר: בונה, מפרסמת ומעדכנת כשצריך. בלי עורך מסובך ובלי מילה באנגלית.",
  stats: [
    { value: "1", label: "משפט כדי להתחיל" },
    { value: "₪0", label: "חבילת חינם אמיתית" },
    { value: "RTL", label: "עברית מהשורש" },
    { value: "24/7", label: "עורכים מתי שרוצים" },
  ],
}

export const PRODUCTS_FEATURES: Feature[] = [
  {
    no: "01 · המוצר המרכזי",
    title: "בניית אתרים ב-AI",
    body: 'מתארים את העיסוק במשפט אחד, נגיד "שיננית בפתח תקווה, מקבלת בתיאום", ומקבלים אתר תדמית שלם: עיצוב, תוכן כתוב בעברית, עמוד נפרד לכל שירות וטופס פניות שמגיע ישירות למייל שלכם.',
    chips: ["תוכן נכתב עבורכם", "עמוד לכל שירות", "כתובת חינם באוויר"],
    cta: { label: "להתחיל בחינם ←", href: "https://uxellent.site" },
    viz: { kind: "composer", typingText: "עורך דין בתל אביב, דיני משפחה והסכמי ממון" },
  },
  {
    no: "02 · לבעלי אתר ישן",
    title: "חידוש אתר קיים",
    body: "האתר הישן שלכם נשאר בגוגל עם כל הוותק שצבר. אנחנו מושכים ממנו את הפרטים (שירותים, טלפון, אזורי פעילות) ובונים סביבם אתר חדש באותה כתובת. המיקום נשמר, המראה מתחלף.",
    chips: ["אותה כתובת בגוגל", "הפרטים נשמרים", "עיצוב עדכני"],
    cta: { label: "לחדש את האתר ←", href: "https://uxellent.site" },
    flip: true,
    viz: { kind: "before-after" },
  },
  {
    no: "03 · למי שמפרסם",
    title: "עמוד נחיתה לקמפיין",
    body: "מטרה אחת ושום הסחה. כל קליק מהמודעה מגיע לעמוד שמוביל לפעולה אחת: שיחה, וואטסאפ או השארת פרטים. מחליפים מסר בקמפיין? כותבים למערכת והעמוד מתעדכן.",
    chips: ["פעולה אחת במרכז", "בלי תפריט מסיח", "מתעדכן בהוראה"],
    cta: { label: "לבנות עמוד קמפיין ←", href: "https://uxellent.site" },
    viz: { kind: "landing" },
  },
  {
    no: "04 · העריכה",
    title: "עריכה בשיחה, בעברית",
    body: "אין עורך שצריך ללמוד. כותבים מה רוצים, והמערכת משנה את האתר בפועל. גם חצי שנה אחרי הפרסום, בלי להיזכר איך עובד שום כלי.",
    chips: ["בלי עקומת למידה", "שינויי עיצוב בלי הגבלה", "גם אחרי הפרסום"],
    cta: { label: "איך זה עובד ←", href: "/how-it-works" },
    flip: true,
    viz: {
      kind: "chat",
      messages: [
        { from: "me", text: "תגדיל את הכותרת ותוסיף כפתור וואטסאפ" },
        { from: "ai", bold: "בוצע.", text: "הכותרת הוגדלה ונוסף כפתור וואטסאפ ליד כפתור החיוג." },
        { from: "me", text: "מעולה. תפרסם" },
        { from: "ai", bold: "האתר באוויר.", text: "אפשר לחזור ולעדכן מתי שתרצו." },
      ],
    },
  },
  {
    no: "05 · הבסיס הטכני",
    title: "בנוי נכון לגוגל",
    body: "כל אתר יוצא עם מבנה כותרות תקין, כתובות נקיות, תיאורי עמוד וטעינה מהירה. זה הבסיס שגוגל ומנועי חיפוש מבוססי AI צריכים, והוא כלול במחיר. דירוג אנחנו לא מבטיחים; מי שמבטיח, מוכר משהו אחר.",
    chips: ["מבנה סמנטי תקין", "טעינה מהירה", "מוכן לחיפוש AI"],
    cta: { label: "מה עוד כלול ←", href: "/included" },
    viz: {
      kind: "serp",
      url: "yourname.uxellent.site",
      title: "עורך דין לדיני משפחה בתל אביב | ליבוביץ׳ ושות׳",
      description: "משרד בוטיק לדיני משפחה, הסכמי ממון וצוואות. פגישת היכרות ראשונה ללא עלות…",
      badges: ["מבנה תקין ✓", "מהירות ✓", "תיאור עמוד ✓"],
    },
  },
  {
    no: "06 · אזור הניהול",
    title: "סטודיו ניהול, למי שרוצה ידיים על ההגה",
    body: "בנוסף לצ׳אט יש אזור ניהול אישי. לוחצים על חלק באתר ועורכים אותו ישירות, מסדרים את חלקי העמוד, מחליפים צבע וגופן, ומפרסמים בלחיצה. שינוי קטן ומהיר? לא חייבים אפילו לכתוב משפט.",
    chips: ["עריכה בקליק על החלק", "סידור חלקי העמוד", "צבע וגופן בהחלפה", "פרסום בלחיצה"],
    cta: { label: "להתחיל בחינם ←", href: "https://uxellent.site" },
    flip: true,
    viz: { kind: "studio" },
  },
]

export const PRODUCTS_CLOSER = {
  title: "הדרך הכי מהירה להבין היא פשוט לנסות.",
  lede: "חבילת החינם לא דורשת כרטיס אשראי.",
  cta: { label: "התחילו בחינם", href: "https://uxellent.site" },
}
