/**
 * Copy + display metadata for /blog and /blog/[slug] (articles.html, article.html).
 * `slug` always points at the real MDX in content/articles/*.mdx — this file only
 * carries the approved index-page teaser copy and cover art, never the article
 * bodies themselves (those stay in the MDX, per agent5-brief.md).
 */

export const BLOG_HERO = {
  eyebrow: "מדריכי צמיחה",
  title: ["דברים שלמדנו", "תוך כדי עבודה."],
  lede: "מדריכים קצרים על קידום, ביצועים ואוטומציה, בגובה העיניים ובלי מילים גבוהות.",
  stats: [
    { value: "4", label: "מדריכים" },
    { value: "2 דק׳", label: "קריאה ממוצעת" },
  ],
}

export type BlogCard = {
  slug: string
  categoryLabel: string
  title: string
  excerpt: string
  readingTime: string
  image: string
}

export const BLOG_FEATURED: BlogCard = {
  slug: "seo-ai-engine",
  categoryLabel: "קידום",
  title: "SEO כבר לא מספיק: איך לקדם עסק במנועי חיפוש מבוססי AI",
  excerpt:
    "החיפוש עובר ל-ChatGPT ולחברים שלו. מה זה אומר על האתר שלכם, ומה עושים כבר עכשיו כדי להיות המקור שמצוטט, לא עוד תוצאה ברשימה.",
  readingTime: "2 דק׳",
  image: "/redesign/blog/seo-ai-engine.webp",
}

export const BLOG_ROWS: BlogCard[] = [
  {
    slug: "fast-slow-web",
    categoryLabel: "ביצועים",
    title: "אתר איטי פוגע במכירות: כך תהפכו אותו למהיר",
    excerpt: "כל שנייה של טעינה עולה לכם בפניות. הסיבות הנפוצות לאתר איטי ומה שאפשר לתקן היום.",
    readingTime: "2 דק׳",
    image: "/redesign/blog/fast-slow-web.webp",
  },
  {
    slug: "wordpress-vs-other",
    categoryLabel: "פלטפורמות",
    title: "וורדפרס מול פלטפורמות אחרות: מה עדיף לעסק שלכם",
    excerpt: "יתרונות, חסרונות ומתי כל פתרון מתאים. השוואה בגובה העיניים, בלי אינטרסים.",
    readingTime: "2 דק׳",
    image: "/redesign/blog/wordpress-vs-other.webp",
  },
  {
    slug: "automatio-make",
    categoryLabel: "אוטומציה",
    title: "אוטומציה לעסק: איך לחסוך שעות עבודה בכל שבוע",
    excerpt: "המשימות שחוזרות על עצמן הן הגזלן הכי גדול של זמן. איך מחברים כלים שעובדים בשבילכם.",
    readingTime: "1 דק׳",
    image: "/redesign/blog/automatio-make.webp",
  },
]

/** green-invoice and negative-receipt were dropped from the index (round10 —
 *  articles.html now lists 4). Their MDX and routes stay live at their URLs;
 *  BlogArticlePage looks them up straight from contentlayer, not from this
 *  array, so removing them here only affects the index and "related" rail. */

export const BLOG_CLOSER = {
  title: "אחרי הקריאה, הכי פשוט לנסות.",
  lede: "משפט אחד בעברית ואתר מלא באוויר. חבילת החינם לא דורשת כרטיס אשראי.",
}

export const ARTICLE_CLOSER = {
  title: "האתר שלכם יכול להיות המקור שמצוטט.",
  lede: "המערכת בונה עמודים במבנה שגם מנועי חיפוש וגם מנועי AI מבינים.",
}
