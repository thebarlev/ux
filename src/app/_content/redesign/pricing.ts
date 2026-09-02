export const PRICING_HERO = {
  eyebrow: "מחירים",
  title: ["מתחילים בחינם.", "משדרגים כשצריך."],
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
      "**150** בקשות AI בחודש · עד 15 ביום",
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
    features: ["**300** בקשות AI בחודש · עד 30 ביום", "100MB תמונות", "יעד מייל אחד לפניות"],
  },
  {
    slug: "business",
    name: "עסקי",
    forWhom: "לעסק שמקבל פניות מהאתר",
    monthly: 147,
    yearly: 118,
    best: true,
    features: ["**900** בקשות AI בחודש · עד 90 ביום", "חיבור הדומיין שלכם", "500MB תמונות"],
  },
  {
    slug: "pro",
    name: "מקצועי",
    forWhom: "למי שמעדכן כל שבוע",
    monthly: 257,
    yearly: 206,
    features: [
      "**3,000** בקשות AI בחודש · עד 300 ביום",
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

export const PRICING_NOTES = [
  {
    title: "כלול בכל חבילה, גם בחינם",
    body: "אתר תדמית מלא · עיצוב AI ברמה של מעצב · ניהול בקליק ובעברית · פרסום בלחיצה · אחסון, SSL וגיבויים · אתר מהיר בכל מכשיר · עבודה על נגישות · מבנה טכני לקידום",
  },
  {
    title: "על הדומיין",
    body: "כתובת מהמערכת (yourname.uxellent.site) כלולה בחינם וזה מספיק כדי להיות באוויר. רוצים דומיין משלכם? רוכשים אצל רשם דומיינים (כ-₪82 לשנה) ואנחנו מחברים. אנחנו לא רוכשים דומיין עבורכם.",
  },
  {
    title: "על המכסה",
    body: "חודשית. בקשה נספרת כל פעם שכותבים למערכת מה לבנות או לשנות, והתקרה היומית הרחבה שומרת שהחודש לא ייגמר ביום אחד. עריכה בקליק, סידור חלקים, צבע וגופן ופרסום לא נספרים אף פעם.",
  },
  {
    title: "ועוד",
    body: "מנוי שנתי 20% הנחה · דמי הקמה ₪0 ואין קנס יציאה · הסרת הקרדיט של Uxellent כלולה במקצועי, ובהתחלה ובעסקי ₪19 לחודש",
  },
]
