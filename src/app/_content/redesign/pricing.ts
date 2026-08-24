export const PRICING_HERO = {
  eyebrow: "מחירים",
  title: "מתחילים בחינם. משדרגים כשצריך.",
  lede: "המחירים לחודש, ללא מע״מ. אפשר לעצור מתי שרוצים.",
}

export type Plan = {
  slug: "free" | "start" | "business" | "pro"
  name: string
  forWhom: string
  monthly: number | null
  yearly: number | null
  best?: boolean
  features: string[]
}

export const PLANS: Plan[] = [
  {
    slug: "free",
    name: "חינם",
    forWhom: "לבנות, לנסות ולעלות לאוויר",
    monthly: null,
    yearly: null,
    features: [
      "**5** עריכות AI ביום",
      "כתובת מהמערכת: yourname.uxellent.site",
      "50MB תמונות",
      "בלי כרטיס אשראי",
    ],
  },
  {
    slug: "start",
    name: "התחלה",
    forWhom: "לנוכחות ראשונה רצינית",
    monthly: 60,
    yearly: 48,
    features: ["**10** עריכות AI בחודש", "100MB תמונות", "יעד מייל אחד לפניות"],
  },
  {
    slug: "business",
    name: "עסקי",
    forWhom: "לעסק שמקבל פניות מהאתר",
    monthly: 147,
    yearly: 118,
    best: true,
    features: ["**30** עריכות AI בחודש", "חיבור הדומיין שלכם", "500MB תמונות"],
  },
  {
    slug: "pro",
    name: "מקצועי",
    forWhom: "למי שמעדכן כל שבוע",
    monthly: 257,
    yearly: 206,
    features: [
      "**100** עריכות AI בחודש",
      "חיבור הדומיין שלכם",
      "2GB תמונות",
      "הסרת הקרדיט של Uxellent: כלולה",
    ],
  },
]

export const PLAN_CTA_LABEL: Record<Plan["slug"], string> = {
  free: "להתחיל בחינם",
  start: "להתחיל",
  business: "להתחיל",
  pro: "להתחיל",
}

export const VALUE_CARDS = [
  { title: "אתר תדמית מלא", body: "עמוד לכל שירות, תוכן כתוב בעברית וטופס פניות שמגיע ישירות למייל שלכם." },
  { title: "עיצוב AI ברמה של מעצב", body: "המערכת מעצבת כמו מעצב אתרים מנוסה: היררכיה, צבעים וטיפוגרפיה. אתם לא צריכים להבין בזה." },
  { title: "ניהול פשוט, בעברית", body: "אין לוח בקרה מסובך. כותבים מה רוצים במילים שלכם, והמערכת מבצעת." },
  { title: "פרסום בקליק אחד", body: "האתר עולה לאוויר בלחיצה. בלי שרתים, בלי הגדרות ובלי איש טכני." },
  { title: "אחסון, SSL וגיבויים", body: "האתר מאוחסן, מוצפן ומגובה, עם עדכוני מערכת ואבטחה שוטפים. אין חשבון נפרד לשלם." },
  { title: "אתר מהיר, בכל מכשיר", body: "טעינה מהירה בנייד ובמחשב. זה משפיע גם על גוגל וגם על הלקוחות שמחכים." },
  { title: "עבודה על נגישות", body: "ניגודיות תקינה, מבנה סמנטי נכון וכתב ברור, מובנים באתר כבר מהבסיס." },
  { title: "מבנה טכני לקידום", body: "כותרות תקינות, כתובות נקיות ותיאורי עמוד. הבסיס שמנועי החיפוש צריכים, כלול." },
]

export const PRICING_EXTRA = [
  { title: "מנוי שנתי", body: "20% הנחה על כל החבילות." },
  { title: "דמי הקמה", body: "₪0. גם אין קנס יציאה." },
  { title: "הסרת הקרדיט של Uxellent", body: "כלולה במקצועי. בהתחלה ובעסקי אפשר להוסיף אותה ב-₪19 לחודש." },
]
