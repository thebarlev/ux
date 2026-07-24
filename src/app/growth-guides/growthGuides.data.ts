import { growthGuides as growthGuideTopics } from "@/lib/growth-guides/topics"

export type GrowthGuideLinkHe = {
  label: string
  href: string
  description: string
  external?: boolean
}

export type GrowthGuideParagraphPartHe = {
  type: "text" | "link"
  text: string
  href?: string
}

export type GrowthGuideParagraphHe = string | readonly GrowthGuideParagraphPartHe[]

export type GrowthGuideSectionHe = {
  id: string
  title: string
  paragraphs: readonly GrowthGuideParagraphHe[]
  bullets?: readonly string[]
  links?: readonly GrowthGuideLinkHe[]
}

export type GrowthGuideFaqItemHe = {
  id: string
  question: string
  answer: string
}

export type GrowthGuideHe = {
  slug: string
  keyword: string
  metaDescription: string
  shortDescription: string
  heroIntro: string
  heroTags: readonly string[]
  sections: readonly GrowthGuideSectionHe[]
  faq: readonly GrowthGuideFaqItemHe[]
  ctaTitle: string
  ctaSubtitle: string
}

export const AUDITOR_URL_HE = "https://app.uxellent.com/auditor"
export const SEO_AI_URL_HE = "/seo-ai"

const growthGuideContentHe = [
  {
    slug: "how-to-get-traffic-to-my-website",
    keyword: "איך להביא תנועה לאתר",
    metaDescription:
      "איך להביא תנועה לאתר עם SEO, תוכן מדויק ומבנה נכון שמגדילים חשיפה ולידים.",
    shortDescription: "מדריך קצר ומדויק להפיכת האתר למקור תנועה קבוע ולא תלוי קמפיינים.",
    heroIntro:
      "איך להביא תנועה לאתר מתחיל במבנה ברור, עמודים שמותאמים לכוונת חיפוש ותוכן שמגיע לקהל הנכון.",
    heroTags: ["תנועה אורגנית", "SEO", "תוכן", "לידים"],
    sections: [
      {
        id: "traffic-problem-he",
        title: "למה קשה להביא תנועה לאתר",
        paragraphs: [
          "ברוב המקרים אין בעיית ביקוש, אלא בעיית מסר, מבנה או כיסוי נושאים חלש באתר.",
          [
            { type: "text", text: "אם האתר לא ברור למנועי חיפוש, כדאי קודם להבין " },
            {
              type: "link",
              text: "איך לשפר SEO לאתר",
              href: "/growth-guides/how-to-improve-website-seo",
            },
            { type: "text", text: " כדי לייצר בסיס טוב יותר לחשיפה." },
          ],
        ],
        bullets: [
          "עמודי שירות כלליים מדי.",
          "כותרות שלא תואמות חיפוש אמיתי.",
          "אין חיבור ברור בין תנועה ללידים.",
        ],
      },
      {
        id: "traffic-solution-he",
        title: "איך בונים תנועה יציבה לאורך זמן",
        paragraphs: [
          "הדרך היציבה היא לחבר SEO טכני, תוכן ממוקד ועמודים שיודעים להסביר מהר מה הערך שלך.",
          [
            { type: "text", text: "אחרי שמביאים תנועה, חשוב גם להבין " },
            {
              type: "link",
              text: "איך לקבל לקוחות אונליין",
              href: "/growth-guides/how-to-get-customers-online",
            },
            { type: "text", text: " כדי שהכניסות לא יישארו רק מספרים." },
          ],
        ],
        bullets: [
          "למפות נושאים עם כוונה גבוהה.",
          "לבנות עמודים חזקים לכל שירות מרכזי.",
          "לקשר נכון בין עמודים קשורים.",
        ],
      },
      {
        id: "traffic-actions-he",
        title: "צעדים מעשיים להתחלה",
        paragraphs: ["לא צריך עשרות עמודים חדשים. צריך סדר עדיפויות וביצוע עקבי."],
        bullets: [
          "לבדוק מהירות, כותרות ו־H1 בעמודים החשובים.",
          "להוסיף שאלות נפוצות סביב כוונת חיפוש.",
          "לחזק קישורים פנימיים בין עמודים.",
          "לעקוב אחרי תנועה ולידים לפי עמוד נחיתה.",
        ],
      },
      {
        id: "traffic-cta-he",
        title: "איך Uxellent עוזרת להגדיל תנועה",
        paragraphs: [
          "Uxellent מחברת בין SEO, תוכן ומדידה כדי להפוך את האתר למנוע צמיחה.",
          "אפשר להתחיל מעמוד ה־SEO/AI, לפתוח Auditor, או להמשיך למדריכים נוספים.",
        ],
        links: [
          { label: "עמוד SEO / AI", href: SEO_AI_URL_HE, description: "לצפייה בשירות הצמיחה האורגנית." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "בדיקת הזדמנויות צמיחה לעסק.", external: true },
          { label: "איך לשפר SEO לאתר", href: "/growth-guides/how-to-improve-website-seo", description: "לשפר את הבסיס האורגני." },
          { label: "איך לקבל לידים", href: "/growth-guides/how-to-get-leads", description: "לחבר תנועה ללידים איכותיים." },
        ],
      },
    ],
    faq: [
      { id: "traffic-he-faq-1", question: "מתי רואים עלייה בתנועה?", answer: "בדרך כלל מתחילים לראות שינוי תוך כמה שבועות, ותוצאות משמעותיות יותר אחרי עבודה רציפה של כמה חודשים." },
      { id: "traffic-he-faq-2", question: "צריך בלוג בשביל זה?", answer: "לא תמיד. לעיתים עמודי שירות טובים ושאלות נפוצות יספיקו להתחלה." },
      { id: "traffic-he-faq-3", question: "מה חשוב יותר, כמות או איכות?", answer: "איכות. תנועה שלא מייצרת התקדמות עסקית לא באמת עוזרת." },
    ],
    ctaTitle: "רוצים לבנות תנועה יציבה לאתר?",
    ctaSubtitle: "נחבר בין SEO, תוכן ומדידה כדי להגדיל חשיפה ולידים בצורה עקבית.",
  },
  {
    slug: "how-to-improve-website-seo",
    keyword: "איך לשפר SEO לאתר",
    metaDescription: "איך לשפר SEO לאתר עם שדרוג עמודים, מבנה נכון, קישור פנימי חכם ומדידה שמחזקת נראות ופניות.",
    shortDescription: "מדריך ממוקד לשיפור עמודים קיימים כדי להגדיל נראות, דירוגים ותוצאות עסקיות.",
    heroIntro: "איך לשפר SEO לאתר מתחיל בדרך כלל בשיפור מה שכבר קיים, ולא בריצה לכתוב עוד עמודים בלי אסטרטגיה.",
    heroTags: ["SEO טכני", "On-page", "כוונת חיפוש", "קישורים פנימיים"],
    sections: [
      {
        id: "seo-problem-he",
        title: "מה בדרך כלל עוצר SEO טוב",
        paragraphs: [
          "עמודים דומים מדי, מסרים חלשים או חוסר עומק מונעים ממנועי החיפוש להבין למה דווקא אתה צריך להופיע.",
          [
            { type: "text", text: "אם המטרה שלך היא תוצאה מהירה יותר, שווה לקרוא גם על " },
            { type: "link", text: "איך לדרג מהר בגוגל", href: "/growth-guides/how-to-rank-on-google-fast" },
            { type: "text", text: " ולבחור את ההזדמנויות הקרובות ביותר." },
          ],
        ],
        bullets: ["כותרות כלליות.", "חוסר בהוכחות ושאלות נפוצות.", "עמודים מבודדים בלי קישור פנימי."],
      },
      {
        id: "seo-solution-he",
        title: "איך לשפר SEO בצורה חכמה",
        paragraphs: [
          "מתחילים מהעמודים שכבר מקבלים הופעות, משפרים מסר, מבנה ודיוק לכוונת החיפוש.",
          [
            { type: "text", text: "במקביל, כדאי להבין " },
            { type: "link", text: "איך להביא תנועה לאתר", href: "/growth-guides/how-to-get-traffic-to-my-website" },
            { type: "text", text: " כדי להפוך את השיפור לעקבי ולא נקודתי." },
          ],
        ],
        bullets: ["לשפר עמודים קיימים קודם.", "לחזק היררכיית כותרות.", "להוסיף תוכן תומך סביב הנושא."],
      },
      {
        id: "seo-actions-he",
        title: "צעדים מעשיים לשיפור SEO",
        paragraphs: ["התייחסו ל־SEO כמו למוצר: שיפור, מדידה וחזרה על מה שעובד."],
        bullets: [
          "לחדד Title ו־H1.",
          "להוסיף FAQ, הוכחות ותהליך עבודה.",
          "לנקות כפילויות וקישורים שבורים.",
          "למדוד לא רק מיקומים אלא גם פניות.",
        ],
      },
      {
        id: "seo-cta-he",
        title: "איך Uxellent עוזרת לשפר SEO",
        paragraphs: [
          "אנחנו עוזרים לבחור מה לתקן קודם, מה לבנות אחר כך ואיך למדוד השפעה עסקית.",
          "אפשר לעבור לעמוד SEO / AI, לפתוח Auditor, או להמשיך למדריכים משלימים.",
        ],
        links: [
          { label: "עמוד SEO / AI", href: SEO_AI_URL_HE, description: "השירות המלא לשיפור נראות וצמיחה." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "זיהוי נקודות חולשה והזדמנויות.", external: true },
          { label: "איך לדרג מהר בגוגל", href: "/growth-guides/how-to-rank-on-google-fast", description: "לבחור את המהלכים המהירים." },
          { label: "איך לגדול אונליין כעסק קטן", href: "/growth-guides/how-to-grow-small-business-online", description: "לחבר SEO לצמיחה רחבה יותר." },
        ],
      },
    ],
    faq: [
      { id: "seo-he-faq-1", question: "לתקן ישן או לכתוב חדש?", answer: "ברוב המקרים מתחילים בעמודים שכבר מקבלים הופעות." },
      { id: "seo-he-faq-2", question: "טכני מספיק?", answer: "לא. צריך גם תוכן ומסר מדויק." },
      { id: "seo-he-faq-3", question: "כל כמה זמן צריך לשפר עמודים?", answer: "לפחות אחת לכמה שבועות או לפי נתוני ביצועים." },
    ],
    ctaTitle: "רוצים מפת SEO ברורה?",
    ctaSubtitle: "נעזור לכם להבין מה לתקן, מה לבנות, ואיך להפוך SEO למנוע צמיחה אמיתי.",
  },
  {
    slug: "how-to-get-leads",
    keyword: "איך לקבל לידים",
    metaDescription: "איך לקבל לידים עם מסר ברור, עמודים שממירים, SEO חכם ותנועה מדויקת שמביאה יותר פניות איכותיות.",
    shortDescription: "מדריך קצר לבניית מערכת לידים איכותית יותר מהאתר ומהחיפוש האורגני.",
    heroIntro: "איך לקבל לידים באופן עקבי תלוי בעמודים ברורים, הצעה חדה ותנועה שמגיעה עם כוונה נכונה.",
    heroTags: ["לידים", "המרה", "מסר", "עמודי נחיתה"],
    sections: [
      {
        id: "leads-problem-he",
        title: "למה לידים לא מגיעים מספיק",
        paragraphs: [
          "עסקים רבים מייצרים פעילות שיווקית, אבל לא בונים מסלול ברור מהחיפוש ועד לפנייה.",
          [
            { type: "text", text: "כדי לשפר את זה, כדאי להבין גם " },
            { type: "link", text: "איך לקדם את העסק אונליין", href: "/growth-guides/how-to-promote-my-business-online" },
            { type: "text", text: " בצורה שמביאה את הקהל הנכון." },
          ],
        ],
        bullets: ["תנועה רחבה מדי.", "מסר שלא מדבר על התוצאה ללקוח.", "CTA גנרי מדי."],
      },
      {
        id: "leads-solution-he",
        title: "איך בונים מסלול שמייצר לידים",
        paragraphs: [
          "עמוד טוב צריך לפתור בעיה אחת ברורה, לדבר לקהל אחד, ולהסביר בדיוק מה הצעד הבא.",
          [
            { type: "text", text: "אם רוצים גם לשפר את איכות הסגירה, שווה לקרוא על " },
            { type: "link", text: "איך לקבל לקוחות אונליין", href: "/growth-guides/how-to-get-customers-online" },
            { type: "text", text: " ולא רק על נפח פניות." },
          ],
        ],
        bullets: ["לחבר בין מקור התנועה לעמוד.", "להוסיף הוכחות ואמון.", "להפוך את הטופס להמשך טבעי."],
      },
      {
        id: "leads-actions-he",
        title: "צעדים מעשיים לקבלת יותר לידים",
        paragraphs: ["שיפור לידים מגיע לרוב מסדרה של תיקונים קטנים אך חכמים."],
        bullets: [
          "לבנות עמוד נפרד לכל שירות מרכזי.",
          "לפתוח כל עמוד עם כאב ותוצאה.",
          "להוסיף שאלות נפוצות סביב התנגדויות.",
          "למדוד איכות לידים לפי עמוד ומקור.",
        ],
      },
      {
        id: "leads-cta-he",
        title: "איך Uxellent מחזקת מערכת לידים",
        paragraphs: [
          "אנחנו עוזרים לשפר עמודים, מסרים ונראות אורגנית כדי לייצר יותר פניות איכותיות.",
          "אפשר להתחיל מהשירות, מ־Auditor, או ממדריכים נוספים סביב צמיחה דיגיטלית.",
        ],
        links: [
          { label: "עמוד SEO / AI", href: SEO_AI_URL_HE, description: "ליווי לצמיחה אורגנית ולידים." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "סריקה מהירה להזדמנויות שיפור.", external: true },
          { label: "איך לקדם את העסק אונליין", href: "/growth-guides/how-to-promote-my-business-online", description: "לבחור ערוצי צמיחה נכונים." },
          { label: "איך לקבל לקוחות בלי פרסום", href: "/growth-guides/how-to-get-clients-without-ads", description: "להקטין תלות בקמפיינים." },
        ],
      },
    ],
    faq: [
      { id: "leads-he-faq-1", question: "מה ההבדל בין תנועה לליד?", answer: "תנועה היא ביקור. ליד הוא ביקור שמתקדם לפנייה." },
      { id: "leads-he-faq-2", question: "עמוד אחד לכל השירותים מספיק?", answer: "בדרך כלל לא. עמודים נפרדים מייצרים התאמה טובה יותר." },
      { id: "leads-he-faq-3", question: "איך מזהים ליד לא איכותי?", answer: "כשיש הרבה פניות לא מתאימות, לרוב יש בעיית מסר או קהל." },
    ],
    ctaTitle: "רוצים יותר לידים איכותיים?",
    ctaSubtitle: "נעזור לחבר בין תנועה, מסר ועמודים שמייצרים פניות טובות יותר.",
  },
  {
    slug: "how-to-promote-my-business-online",
    keyword: "איך לקדם את העסק אונליין",
    metaDescription: "איך לקדם את העסק אונליין עם ערוצים נכונים, SEO ותוכן שמביא ביקוש איכותי.",
    shortDescription: "מדריך לבחירת ערוצי צמיחה דיגיטלית שמחברים בין חשיפה לתוצאות עסקיות.",
    heroIntro: "איך לקדם את העסק אונליין מתחיל בבחירת ערוצים שמתאימים ללקוחות שלך וליכולת הביצוע שלך לאורך זמן.",
    heroTags: ["שיווק אונליין", "SEO", "ערוצים", "ביקוש"],
    sections: [
      {
        id: "promote-problem-he",
        title: "למה קידום אונליין מרגיש מפוזר",
        paragraphs: [
          "הרבה עסקים מנסים להיות בכל מקום, ובפועל שוחקים זמן, תקציב ומיקוד.",
          [
            { type: "text", text: "כדי לחבר חשיפה לתוצאה, חשוב גם להבין " },
            { type: "link", text: "איך לקבל לידים", href: "/growth-guides/how-to-get-leads" },
            { type: "text", text: " מהעמודים שאליהם שולחים את התנועה." },
          ],
        ],
        bullets: ["יותר מדי ערוצים.", "מסר לא עקבי.", "עמודי יעד חלשים."],
      },
      {
        id: "promote-solution-he",
        title: "איך לקדם נכון עם מיקוד",
        paragraphs: [
          "מתחילים מערוצים שבהם יש כוונת רכישה, וברוב המקרים חיפוש אורגני הוא בסיס חזק במיוחד.",
          [
            { type: "text", text: "אם אתם עסק קטן, כדאי לקרוא גם " },
            { type: "link", text: "איך לגדול אונליין כעסק קטן", href: "/growth-guides/how-to-grow-small-business-online" },
            { type: "text", text: " כדי לבנות אסטרטגיה ריאלית." },
          ],
        ],
        bullets: ["להתמקד ב־1–3 ערוצים.", "לבנות עמוד יעד לכל הצעה.", "לחזק אמון עם תוכן והוכחות."],
      },
      {
        id: "promote-actions-he",
        title: "צעדים מעשיים לקידום אונליין",
        paragraphs: ["המטרה היא לא רק חשיפה, אלא חשיפה שמביאה תנועה נכונה ופניות טובות."],
        bullets: [
          "להגדיר אילו הצעות רוצים לקדם.",
          "לייצר עמודים תואמים להצעות.",
          "להוסיף שאלות, FAQ ותוכן תומך.",
          "למדוד איכות לידים ולא רק קליקים.",
        ],
      },
      {
        id: "promote-cta-he",
        title: "איך Uxellent עוזרת לקדם אונליין",
        paragraphs: [
          [
            { type: "text", text: "אנחנו מחברים בין SEO, תוכן, עמודי יעד ומדידה לתהליך " },
            { type: "link", text: "שיווק דיגיטלי", href: SEO_AI_URL_HE },
            { type: "text", text: " מסודר." },
          ],
          "אפשר לראות את שירות ה־SEO/AI, לפתוח Auditor, או לקרוא מדריכים משלימים.",
        ],
        links: [
          { label: "קידום אורגני", href: SEO_AI_URL_HE, description: "הגישה המלאה לקידום אורגני." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "אבחון ראשוני להזדמנויות צמיחה.", external: true },
          { label: "איך לגדול אונליין כעסק קטן", href: "/growth-guides/how-to-grow-small-business-online", description: "לתכנון צמיחה ממוקד." },
          { label: "איך לקבל לידים", href: "/growth-guides/how-to-get-leads", description: "לחיבור בין קידום ללידים." },
        ],
      },
    ],
    faq: [
      { id: "promote-he-faq-1", question: "SEO או סושיאל קודם?", answer: "ברוב עסקי השירות, SEO הוא בסיס חזק יותר כי הכוונה שם ברורה יותר." },
      { id: "promote-he-faq-2", question: "כמה ערוצים צריך?", answer: "לרוב 1–3 ערוצים מספיקים להתחלה טובה." },
      { id: "promote-he-faq-3", question: "מה הופך קידום לאפקטיבי?", answer: "מסר ברור, עמוד מתאים ואמון שמופיע בזמן הנכון." },
    ],
    ctaTitle: "רוצים אסטרטגיית קידום מסודרת?",
    ctaSubtitle: "נעזור לבנות מערכת שיווק שמחברת בין חשיפה, SEO ותוצאה עסקית.",
  },
  {
    slug: "how-to-get-customers-online",
    keyword: "איך לקבל לקוחות אונליין",
    metaDescription: "איך לקבל לקוחות אונליין עם יותר אמון, המרה טובה יותר ומסלול ברור מהקליק לפנייה.",
    shortDescription: "מדריך מעשי לשיפור רכישת לקוחות דרך האתר והערוצים הדיגיטליים.",
    heroIntro: "איך לקבל לקוחות אונליין תלוי לא רק בתנועה, אלא גם במסר חד, אמון מהיר ועמודים שמובילים לפעולה.",
    heroTags: ["לקוחות", "המרה", "אמון", "צמיחה דיגיטלית"],
    sections: [
      {
        id: "customers-problem-he",
        title: "למה קשה להפוך תנועה ללקוחות",
        paragraphs: [
          "כשכל לקוח חדש תלוי בפרסום, עמודים חלשים או מעקב ידני, העלות מטפסת והתוצאה נשחקת.",
          [
            { type: "text", text: "כדי לשפר את נקודת הכניסה, כדאי להבין גם " },
            { type: "link", text: "איך לקבל לידים", href: "/growth-guides/how-to-get-leads" },
            { type: "text", text: " בצורה ממוקדת יותר." },
          ],
        ],
        bullets: ["עמודים שלא ממירים.", "הצעה לא ברורה.", "אין מסלול ברור להחלטה."],
      },
      {
        id: "customers-solution-he",
        title: "איך מגדילים רכישת לקוחות אונליין",
        paragraphs: [
          "משפרים את העמודים שאנשים רואים לפני שהם פונים: מסר, הוכחות, FAQ ותהליך עבודה ברור.",
          [
            { type: "text", text: "במקביל, צריך לדעת גם " },
            { type: "link", text: "איך להביא תנועה לאתר", href: "/growth-guides/how-to-get-traffic-to-my-website" },
            { type: "text", text: " כדי להביא יותר קהל רלוונטי לעמודים האלה." },
          ],
        ],
        bullets: ["לחזק עמודי רכישה.", "להקטין חוסר ודאות.", "לחבר תוכן תומך לעמודי השירות."],
      },
      {
        id: "customers-actions-he",
        title: "צעדים מעשיים לקבלת יותר לקוחות",
        paragraphs: ["שיפור רכישת לקוחות מתחיל בהורדת חיכוך בכל שלב במסלול הדיגיטלי."],
        bullets: [
          "לשפר את העמודים שמובילים לפנייה.",
          "להציג תועלת והוכחות כבר בתחילת העמוד.",
          "להוסיף השוואות, FAQ ותהליך.",
          "למדוד לא רק פניות, אלא גם איכות סגירה.",
        ],
      },
      {
        id: "customers-cta-he",
        title: "איך Uxellent עוזרת להביא יותר לקוחות",
        paragraphs: [
          "אנחנו מחברים בין נראות, עמודים חזקים ומשפך ברור כדי לשפר רכישת לקוחות אונליין.",
          "אפשר להתחיל משירות ה־SEO/AI, מ־Auditor או ממדריכים נוספים.",
        ],
        links: [
          { label: "עמוד SEO / AI", href: SEO_AI_URL_HE, description: "לראות איך בונים נראות שמביאה לקוחות." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "לבדיקת חסמים בתהליך הצמיחה.", external: true },
          { label: "איך לקבל לידים", href: "/growth-guides/how-to-get-leads", description: "לשפר את שלב הפנייה." },
          { label: "איך להביא תנועה לאתר", href: "/growth-guides/how-to-get-traffic-to-my-website", description: "לחזק את תחילת המשפך." },
        ],
      },
    ],
    faq: [
      { id: "customers-he-faq-1", question: "צריך פרסום כדי לקבל לקוחות?", answer: "לא תמיד. אפשר לבנות גם צמיחה אורגנית שמפחיתה תלות בפרסום." },
      { id: "customers-he-faq-2", question: "איזה עמודים הכי חשובים?", answer: "עמודי שירות, מחירים, השוואות ו־FAQ בדרך כלל משפיעים הכי הרבה." },
      { id: "customers-he-faq-3", question: "מה לשפר קודם?", answer: "את העמודים שכבר מקבלים תנועה ומשפיעים על הכנסות." },
    ],
    ctaTitle: "רוצים יותר לקוחות אונליין?",
    ctaSubtitle: "נבנה יחד עמודים, נראות ומשפך שמגדילים מכירות ולא רק כניסות.",
  },
  {
    slug: "how-to-rank-on-google-fast",
    keyword: "איך לדרג מהר בגוגל",
    metaDescription: "איך לדרג מהר בגוגל עם בחירת הזדמנויות נכונה, שיפור עמודים קיימים ו־SEO חכם.",
    shortDescription: "מדריך קצר להזדמנויות SEO מהירות בלי לרדוף אחרי קיצורי דרך לא יציבים.",
    heroIntro: "איך לדרג מהר בגוגל בדרך כלל לא קשור לטריקים, אלא לבחירת העמודים והביטויים שהכי קרובים להתקדמות.",
    heroTags: ["גוגל", "דירוגים", "הזדמנויות מהירות", "SEO"],
    sections: [
      {
        id: "rank-problem-he",
        title: "למה דירוג מהיר מרגיש קשה",
        paragraphs: [
          "עסקים רבים בוחרים ביטויים תחרותיים מדי עוד לפני שיש לאתר בסיס מספיק חזק.",
          [
            { type: "text", text: "לכן כמעט תמיד כדאי לשלב את זה עם " },
            { type: "link", text: "איך לשפר SEO לאתר", href: "/growth-guides/how-to-improve-website-seo" },
            { type: "text", text: " ולשפר קודם את מה שכבר קיים." },
          ],
        ],
        bullets: ["בחירת מילות מפתח לא ריאלית.", "התעלמות מעמודים עם פוטנציאל.", "מבנה כותרות חלש."],
      },
      {
        id: "rank-solution-he",
        title: "איך בוחרים הזדמנויות מהירות",
        paragraphs: [
          "מחפשים עמודים שכבר מקבלים הופעות או נמצאים קרוב לעמוד הראשון, ומשפרים אותם קודם.",
          [
            { type: "text", text: "כדאי גם להבין " },
            { type: "link", text: "איך להביא תנועה לאתר", href: "/growth-guides/how-to-get-traffic-to-my-website" },
            { type: "text", text: " כדי לחבר את הדירוגים ליותר ביקוש אמיתי." },
          ],
        ],
        bullets: ["לזהות עמודים עם סימני חיים.", "לשפר רלוונטיות לכוונת חיפוש.", "לחזק קישור פנימי לעמודים קרובים לפריצה."],
      },
      {
        id: "rank-actions-he",
        title: "צעדים מעשיים לדירוג מהיר יותר",
        paragraphs: ["המהירות ב־SEO מגיעה ממיקוד נכון, לא מניסיון לכבוש הכול בבת אחת."],
        bullets: [
          "לשפר עמודים שמדורגים 8–25.",
          "לחדד Title ו־H2.",
          "להוסיף FAQ, הוכחות ודוגמאות.",
          "להסיר עמודים חלשים או כפולים.",
        ],
      },
      {
        id: "rank-cta-he",
        title: "איך Uxellent מקדמת עמודים מהר יותר",
        paragraphs: [
          "אנחנו עוזרים לזהות את ההזדמנויות הקרובות ביותר לתוצאה, ואז לבצע עליהן עבודה מדויקת.",
          "אפשר להמשיך לעמוד SEO / AI, ל־Auditor, או למדריכים משלימים.",
        ],
        links: [
          { label: "עמוד SEO / AI", href: SEO_AI_URL_HE, description: "לראות את מסגרת העבודה המלאה." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "לזהות הזדמנויות SEO מהירות.", external: true },
          { label: "איך לשפר SEO לאתר", href: "/growth-guides/how-to-improve-website-seo", description: "לחזק את הבסיס לפני האצה." },
          { label: "איך לקבל לקוחות בלי פרסום", href: "/growth-guides/how-to-get-clients-without-ads", description: "להפוך נראות אורגנית לנכס." },
        ],
      },
    ],
    faq: [
      { id: "rank-he-faq-1", question: "אפשר באמת לדרג מהר?", answer: "לפעמים כן, בעיקר כשמשפרים עמודים שכבר מקבלים הופעות." },
      { id: "rank-he-faq-2", question: "מה ה־fast win הכי טוב?", answer: "שדרוג עמודים קיימים עם פוטנציאל הוא לרוב המהלך המהיר ביותר." },
      { id: "rank-he-faq-3", question: "להתחיל ממילים רחבות או זנב ארוך?", answer: "בדרך כלל מזנב ארוך או בינוני, עם כוונה ברורה יותר." },
    ],
    ctaTitle: "רוצים לזהות הזדמנויות SEO מהירות?",
    ctaSubtitle: "נעזור לבחור את העמודים והביטויים שיכולים לזוז קודם ולהביא תוצאה אמיתית.",
  },
  {
    slug: "how-to-grow-small-business-online",
    keyword: "איך לגדול אונליין כעסק קטן",
    metaDescription: "איך לגדול אונליין כעסק קטן עם מיקוד בערוצים הנכונים, עמודים חזקים ו־SEO עקבי.",
    shortDescription: "מדריך מעשי לעסקים קטנים שרוצים צמיחה דיגיטלית בלי להתפזר על יותר מדי ערוצים.",
    heroIntro: "איך לגדול אונליין כעסק קטן נהיה פשוט יותר כשמצמצמים ערוצים, מחדדים מסר ובונים נכסים שעובדים לאורך זמן.",
    heroTags: ["עסק קטן", "צמיחה", "SEO", "ערוצים"],
    sections: [
      {
        id: "smallbiz-problem-he",
        title: "למה לעסקים קטנים קשה לגדול אונליין",
        paragraphs: [
          "לרוב אין זמן או תקציב לעשות הכול, וכשמתפזרים על יותר מדי פעולות אין אפקט מצטבר.",
          [
            { type: "text", text: "לכן חשוב להבין קודם " },
            { type: "link", text: "איך לקדם את העסק אונליין", href: "/growth-guides/how-to-promote-my-business-online" },
            { type: "text", text: " בצורה שמתאימה למשאבים הקיימים." },
          ],
        ],
        bullets: ["יותר מדי ערוצים.", "עמודים חלשים.", "אין מערכת קבועה ללידים."],
      },
      {
        id: "smallbiz-solution-he",
        title: "איך מייצרים צמיחה מצטברת",
        paragraphs: [
          "עסק קטן לא צריך מערכת מסובכת. הוא צריך עמודים טובים, SEO יציב ומספר ערוצים שאפשר לנהל בעקביות.",
          [
            { type: "text", text: "חלק מהעבודה הזו הוא גם לדעת " },
            { type: "link", text: "איך לשפר SEO לאתר", href: "/growth-guides/how-to-improve-website-seo" },
            { type: "text", text: " כדי להפוך את האתר לנכס אמיתי." },
          ],
        ],
        bullets: ["להתמקד בהצעות שמייצרות הכנסה.", "לבנות עמודים שממירים.", "ליצור מנוף ארוך טווח דרך SEO."],
      },
      {
        id: "smallbiz-actions-he",
        title: "צעדים מעשיים לעסק קטן",
        paragraphs: ["צמיחה טובה באה מפשטות, עקביות ומדידה של מה שבאמת עובד."],
        bullets: [
          "להגדיר 1–3 שירותים מרכזיים.",
          "לשפר את העמודים שלהם.",
          "להוסיף תוכן סביב שאלות של לקוחות.",
          "לחתוך ערוצים שלא מייצרים לידים איכותיים.",
        ],
      },
      {
        id: "smallbiz-cta-he",
        title: "איך Uxellent עוזרת לעסק קטן לצמוח",
        paragraphs: [
          "אנחנו בונים מערכת פשוטה וברורה של נראות, עמודים ולידים, בלי סיבוך מיותר.",
          "אפשר להתחיל מהשירות, מ־Auditor או ממדריכים נוספים בצמיחה דיגיטלית.",
        ],
        links: [
          { label: "עמוד SEO / AI", href: SEO_AI_URL_HE, description: "לראות איך בונים צמיחה אורגנית עקבית." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "לזהות חסמים והזדמנויות לעסק.", external: true },
          { label: "איך לקדם את העסק אונליין", href: "/growth-guides/how-to-promote-my-business-online", description: "לבחור ערוצים ריאליים." },
          { label: "איך לקבל לקוחות אונליין", href: "/growth-guides/how-to-get-customers-online", description: "לחבר חשיפה להכנסה." },
        ],
      },
    ],
    faq: [
      { id: "smallbiz-he-faq-1", question: "איזה ערוץ הכי טוב לעסק קטן?", answer: "לרוב SEO הוא אחד הערוצים המשתלמים ביותר לטווח ארוך." },
      { id: "smallbiz-he-faq-2", question: "צריך הרבה תוכן?", answer: "לא. מעט עמודים חזקים עדיפים על הרבה תוכן חלש." },
      { id: "smallbiz-he-faq-3", question: "מה מודדים קודם?", answer: "לידים איכותיים, שיחות מכירה וערך לקוח." },
    ],
    ctaTitle: "רוצים צמיחה דיגיטלית פשוטה וברורה?",
    ctaSubtitle: "נעזור להתמקד בעמודים, בערוצים וב־SEO שמייצרים תוצאה לעסק קטן.",
  },
  {
    slug: "how-to-get-clients-without-ads",
    keyword: "איך לקבל לקוחות בלי פרסום",
    metaDescription: "איך לקבל לקוחות בלי פרסום עם SEO, נוכחות אורגנית ותוכן שמייצר אמון וביקוש.",
    shortDescription: "מדריך לעסקים שרוצים להפחית תלות בקמפיינים ולבנות מערכת אורגנית יציבה.",
    heroIntro: "איך לקבל לקוחות בלי פרסום מתחיל בבניית נוכחות אורגנית, עמודים חזקים ואמון שמופיע לפני שיחת המכירה.",
    heroTags: ["אורגני", "לקוחות", "SEO", "אמון"],
    sections: [
      {
        id: "clients-problem-he",
        title: "למה קשה לקבל לקוחות בלי פרסום",
        paragraphs: [
          "פרסום נותן מהירות, אבל גם מסתיר בעיות עומק. כשעוצרים, רואים אם באמת יש מערכת שעובדת לבד.",
          [
            { type: "text", text: "כדי לבנות מערכת כזו, חשוב להבין " },
            { type: "link", text: "איך להביא תנועה לאתר", href: "/growth-guides/how-to-get-traffic-to-my-website" },
            { type: "text", text: " ממקורות אורגניים." },
          ],
        ],
        bullets: ["תלות בתנועה ממומנת.", "מעט מדי הוכחות ואמון.", "עמודים שלא בנויים לחיפוש אורגני."],
      },
      {
        id: "clients-solution-he",
        title: "איך בונים ביקוש אורגני",
        paragraphs: [
          "הדרך היציבה היא לבנות עמודים סביב שאלות אמיתיות, לחזק סמכות ולהוביל את הגולש לפעולה ברורה.",
          [
            { type: "text", text: "כדי שזה יתחבר לעסק בפועל, כדאי גם לקרוא " },
            { type: "link", text: "איך לקבל לידים", href: "/growth-guides/how-to-get-leads" },
            { type: "text", text: " ולוודא שהתנועה באמת הופכת לפניות." },
          ],
        ],
        bullets: ["לבנות סביב ביקוש אמיתי.", "להוסיף מומחיות והוכחות.", "להפוך SEO לנכס ארוך טווח."],
      },
      {
        id: "clients-actions-he",
        title: "צעדים מעשיים לצמיחה בלי פרסום",
        paragraphs: ["המטרה היא לא לבטל כל שיווק, אלא לבנות מספיק ביקוש אורגני כדי לא להיות תלויים בו."],
        bullets: [
          "לשפר עמודי שירות קיימים.",
          "להוסיף מדריכים ושאלות נפוצות.",
          "להציג הוכחות, דוגמאות ותהליך.",
          "לעקוב אחרי עמודים אורגניים שמביאים לידים טובים.",
        ],
      },
      {
        id: "clients-cta-he",
        title: "איך Uxellent בונה מנוע לקוחות אורגני",
        paragraphs: [
          "אנחנו עוזרים לעסקים להפחית תלות בפרסום דרך SEO, נראות AI, תוכן וסמכות.",
          "אפשר להמשיך לעמוד SEO / AI, לפתוח Auditor, או לקרוא מדריכים משלימים.",
        ],
        links: [
          { label: "עמוד SEO / AI", href: SEO_AI_URL_HE, description: "לראות איך מייצרים נראות שעובדת לאורך זמן." },
          { label: "פתיחת Auditor", href: AUDITOR_URL_HE, description: "בדיקת חסמים להזדמנויות אורגניות.", external: true },
          { label: "איך להביא תנועה לאתר", href: "/growth-guides/how-to-get-traffic-to-my-website", description: "לחיזוק ראש המשפך האורגני." },
          { label: "איך לקבל לידים", href: "/growth-guides/how-to-get-leads", description: "לחיבור בין חשיפה לפניות." },
        ],
      },
    ],
    faq: [
      { id: "clients-he-faq-1", question: "אפשר באמת בלי פרסום?", answer: "כן, אבל צריך לבנות מערכת אורגנית ולא לצפות לתוצאה מיידית." },
      { id: "clients-he-faq-2", question: "מה הצעד הראשון?", answer: "לבדוק את העמודים שמאחורי ההצעה והמסר הנוכחי." },
      { id: "clients-he-faq-3", question: "כמה זמן לוקח להפחית תלות?", answer: "זה תלוי בשוק ובאתר, אבל לרוב רואים תמיכה אורגנית טובה תוך כמה חודשים." },
    ],
    ctaTitle: "רוצים יותר לקוחות בלי לרדוף אחרי פרסום?",
    ctaSubtitle: "נבנה יחד נוכחות אורגנית, עמודים חזקים ואמון שמייצרים פניות יציבות יותר.",
  },
] as const

const growthGuideContentHeBySlug = new Map(growthGuideContentHe.map((guide) => [guide.slug, guide] as const))

export const growthGuidesHe: readonly GrowthGuideHe[] = growthGuideTopics.map((topic) => {
  const content = growthGuideContentHeBySlug.get(topic.slug)

  if (!content) {
    throw new Error(`Missing Hebrew growth guide content for slug: ${topic.slug}`)
  }

  return {
    ...content,
    slug: topic.slug,
  }
})

export const growthGuideSlugsHe = growthGuideTopics.map((guide) => guide.slug)

export function getGrowthGuideHe(slug: string) {
  return growthGuidesHe.find((guide) => guide.slug === slug)
}
