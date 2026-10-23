import type { Lang } from "../chrome"

/**
 * "With UXellent" (article template v4, tbl-025b): in every article and guide,
 * the topic tied to what the platform already does. Three points each, written
 * only from the facts Itzik listed (tbl-025b); nothing else, no other numbers:
 *  - every enquiry is saved in the system and emailed; saved even if the email fails
 *  - the enquiries address is verified by email
 *  - automatic nightly backup, 30 nights back
 *  - subscription renews automatically; invoices in the account; if it does not
 *    renew, the site moves to the free plan and the content is kept
 *  - every page built with SEO, structured business data, ready for AI search
 *  - fast on every device; hosting and SSL included
 *  - changes in the chat or click-to-edit; import from an existing site;
 *    WhatsApp button; contact form; own domain on Business and Growth; built with
 *    accessibility in mind
 */

export type Ours = {
  /** the heading; the part after the "|" is blue. Default: the template's */
  h?: string
  p: string
  points: readonly (readonly [string, string])[]
}

export const OURS_COPY = {
  he: { kick: "ב-UXellent", h: "כל זה כבר |בנוי באתר שלכם.", btn: "בנו לי אתר בחינם" },
  en: { kick: "With UXellent", h: "All of this is |already built into your site.", btn: "Build my site, free" },
} as const

export const OURS: Record<string, Record<Lang, Ours>> = {
  // ---- blog articles
  "seo-ai-engine": {
    he: {
      p: "אתר שבונים אצלנו מוכן לחיפוש AI מהרגע הראשון. לא צריך לזכור את הרשימה הזו.",
      points: [
        ["SEO בכל עמוד", "כל עמוד נבנה עם SEO, בלי הגדרות ובלי תוספים."],
        ["נתוני עסק מובנים", "פרטי העסק מסודרים בפורמט שגוגל ומנועי AI קוראים."],
        ["מוכן לחיפוש AI", "כל עמוד מוכן לחיפוש AI כבר כשהאתר עולה."],
      ],
    },
    en: {
      p: "A site built with us is ready for AI search from day one. You don’t need to remember this list.",
      points: [
        ["SEO on every page", "Every page is built with SEO. No settings, no plugins."],
        ["Structured business data", "Your business details are laid out in a format Google and AI tools read."],
        ["Ready for AI search", "Every page is ready for AI search the moment your site goes live."],
      ],
    },
  },
  "slow-site": {
    he: {
      p: "אצלנו מהירות היא לא משהו שצריך לתקן. היא חלק מהאתר.",
      points: [
        ["מהיר בכל מכשיר", "האתר נבנה מהיר, במחשב ובטלפון."],
        ["אחסון ו-SSL כלולים", "אין שרת לבחור ואין תעודה לחדש. זה כלול."],
        ["שינויים בלי מפתח", "רוצים להחליף תמונה כבדה? כותבים בצ'אט, או לוחצים ומשנים."],
      ],
    },
    en: {
      p: "With us, speed isn’t something you fix. It’s part of the site.",
      points: [
        ["Fast on every device", "Your site is built fast, on desktop and on mobile."],
        ["Hosting and SSL included", "No server to pick and no certificate to renew. It’s included."],
        ["Changes without a developer", "Want to swap a heavy image? Ask in the chat, or click and change it."],
      ],
    },
  },
  "wordpress-vs": {
    he: {
      h: "מה שבוורדפרס דורש תוסף, |כאן כבר בפנים.",
      p: "אצלנו לא צריך לבחור תוספים או לחפש מפתח לכל שינוי.",
      points: [
        ["גיבוי כל לילה", "גיבוי אוטומטי כל לילה, 30 לילות אחורה."],
        ["SEO, אחסון ו-SSL", "כל עמוד נבנה עם SEO, והאחסון וה-SSL כלולים."],
        ["ייבוא מהאתר הקיים", "עוברים מוורדפרס? מייבאים את התוכן מהאתר הקיים."],
      ],
    },
    en: {
      h: "What WordPress needs a plugin for |is built in here.",
      p: "With us there are no plugins to pick and no developer to chase for every change.",
      points: [
        ["Backed up every night", "Automatic nightly backup, 30 nights back."],
        ["SEO, hosting and SSL", "Every page is built with SEO, and hosting and SSL are included."],
        ["Import your current site", "Moving from WordPress? Import the content from your existing site."],
      ],
    },
  },
  "automation": {
    he: {
      h: "אוטומציה מתחילה |בפנייה שלא הולכת לאיבוד.",
      p: "לפני שמחברים כלים, כל פנייה צריכה להגיע למקום אחד. זה כבר עובד באתר שלכם.",
      points: [
        ["כל פנייה נשמרת", "כל פנייה מהאתר נשמרת במערכת ונשלחת אליכם למייל."],
        ["גם כשמייל נכשל", "אם המייל לא הגיע, הפנייה עדיין שמורה במערכת."],
        ["כתובת מאומתת", "כתובת המייל לפניות מאומתת במייל, כדי שהפניות יגיעו לכתובת הנכונה."],
      ],
    },
    en: {
      h: "Automation starts with |an enquiry that never gets lost.",
      p: "Before you connect tools, every enquiry needs to land in one place. That already works on your site.",
      points: [
        ["Every enquiry is saved", "Every enquiry from your site is saved in the system and emailed to you."],
        ["Even when an email fails", "If the email doesn’t arrive, the enquiry is still saved."],
        ["A verified address", "The address for enquiries is verified by email, so they reach the right inbox."],
      ],
    },
  },

  // ---- growth guides
  "guide-traffic": {
    he: {
      p: "תנועה מגיעה לאתר שגוגל מבין. אצלנו זה בנוי מהיום הראשון.",
      points: [
        ["SEO בכל עמוד", "כל עמוד נבנה עם SEO, בלי הגדרות."],
        ["מוכן לחיפוש AI", "נתוני העסק מובנים, כדי שגם מנועי AI יוכלו להציג אתכם."],
        ["מהיר בכל מכשיר", "מי שמגיע מהטלפון לא מחכה לעמוד שנטען."],
      ],
    },
    en: {
      p: "Traffic goes to sites Google understands. With us that’s built in from day one.",
      points: [
        ["SEO on every page", "Every page is built with SEO. No settings."],
        ["Ready for AI search", "Your business data is structured, so AI tools can show you too."],
        ["Fast on every device", "Visitors on a phone don’t wait for a page to load."],
      ],
    },
  },
  "guide-seo": {
    he: {
      p: "רוב מה שהמדריך הזה מבקש כבר קורה באתר שבונים אצלנו.",
      points: [
        ["SEO מובנה", "כל עמוד נבנה עם SEO, מהרגע שהוא עולה."],
        ["נתוני עסק מובנים", "פרטי העסק מסודרים בפורמט שגוגל קורא."],
        ["שינוי בצ'אט", "רוצים לחדד כותרת או טקסט? כותבים בצ'אט, או לוחצים ומשנים."],
      ],
    },
    en: {
      p: "Most of what this guide asks for already happens on a site built with us.",
      points: [
        ["SEO built in", "Every page is built with SEO from the moment it goes live."],
        ["Structured business data", "Your business details are laid out in a format Google reads."],
        ["Edit in the chat", "Want to sharpen a title or a paragraph? Ask in the chat, or click and change it."],
      ],
    },
  },
  "guide-leads": {
    he: {
      p: "ליד טוב הוא ליד שלא הולך לאיבוד. זה מה שהאתר עושה בשבילכם.",
      points: [
        ["טופס פניות", "כל פנייה נשמרת במערכת ונשלחת אליכם למייל."],
        ["כפתור וואטסאפ", "לקוח שמעדיף לכתוב מגיע אליכם בלחיצה."],
        ["שום פנייה לא הולכת לאיבוד", "גם אם מייל לא הגיע, הפנייה שמורה במערכת."],
      ],
    },
    en: {
      p: "A good lead is one that doesn’t get lost. That’s what your site does for you.",
      points: [
        ["Contact form", "Every enquiry is saved in the system and emailed to you."],
        ["WhatsApp button", "Customers who’d rather message reach you in one tap."],
        ["Nothing gets lost", "Even if an email doesn’t arrive, the enquiry is saved."],
      ],
    },
  },
  "guide-promote": {
    he: {
      p: "קידום עובד טוב יותר כשיש לאן לשלוח אנשים. האתר הזה כבר מוכן.",
      points: [
        ["דומיין משלכם", "בחבילות עסקי וצומח מחברים דומיין משלכם."],
        ["מוכן לגוגל ול-AI", "כל עמוד נבנה עם SEO ונתוני עסק מובנים."],
        ["פניות במקום אחד", "טופס פניות וכפתור וואטסאפ, וכל פנייה נשמרת."],
      ],
    },
    en: {
      p: "Promotion works better when there’s somewhere to send people. This site is ready.",
      points: [
        ["Your own domain", "On Business and Growth, you connect a domain of your own."],
        ["Ready for Google and AI", "Every page is built with SEO and structured business data."],
        ["Enquiries in one place", "A contact form and a WhatsApp button, and every enquiry is saved."],
      ],
    },
  },
  "guide-clients": {
    he: {
      p: "לקוח מחפש, מוצא ופונה. אצלנו כל אחד מהשלבים כבר בנוי.",
      points: [
        ["נמצאים בחיפוש", "כל עמוד נבנה עם SEO ומוכן לחיפוש AI."],
        ["מהיר בטלפון", "האתר מהיר בכל מכשיר, גם כשמגיעים מהנייד."],
        ["קל לפנות", "טופס פניות וכפתור וואטסאפ, וכל פנייה נשלחת אליכם למייל."],
      ],
    },
    en: {
      p: "A customer searches, finds you and gets in touch. Each step is already built in.",
      points: [
        ["Found in search", "Every page is built with SEO and is ready for AI search."],
        ["Fast on a phone", "Your site is fast on every device, mobile included."],
        ["Easy to reach", "A contact form and a WhatsApp button, and every enquiry is emailed to you."],
      ],
    },
  },
  "guide-rank-fast": {
    he: {
      p: "אין קיצור דרך לגוגל. אבל אפשר להתחיל בלי חובות טכניים.",
      points: [
        ["SEO מהיום הראשון", "כל עמוד עולה עם SEO מובנה."],
        ["נתוני עסק מובנים", "גוגל מקבל את פרטי העסק בפורמט מסודר."],
        ["מהיר, עם SSL", "האתר מהיר בכל מכשיר, והאחסון וה-SSL כלולים."],
      ],
    },
    en: {
      p: "There’s no shortcut to Google. But you can start with no technical debt.",
      points: [
        ["SEO from day one", "Every page goes live with SEO built in."],
        ["Structured business data", "Google gets your business details in a tidy format."],
        ["Fast, with SSL", "Your site is fast on every device, and hosting and SSL are included."],
      ],
    },
  },
  "guide-small-business": {
    he: {
      p: "עסק קטן צריך אתר שלא גוזל ממנו זמן. זה מה שבנינו.",
      points: [
        ["שינויים בלי מפתח", "כותבים בצ'אט מה לשנות, או לוחצים ומשנים בעורך."],
        ["גיבוי כל לילה", "גיבוי אוטומטי כל לילה, 30 לילות אחורה."],
        ["התוכן נשמר", "אם המנוי לא מתחדש, האתר עובר לחבילה החינמית והתוכן נשאר."],
      ],
    },
    en: {
      p: "A small business needs a site that doesn’t eat its time. That’s what we built.",
      points: [
        ["Changes without a developer", "Write what to change in the chat, or click and edit."],
        ["Backed up every night", "Automatic nightly backup, 30 nights back."],
        ["Your content stays", "If your subscription doesn’t renew, the site moves to the free plan and your content is kept."],
      ],
    },
  },
  "guide-no-ads": {
    he: {
      p: "בלי מודעות, האתר צריך לעבוד בשבילכם. אצלנו הוא בנוי לזה.",
      points: [
        ["נמצאים בגוגל וב-AI", "כל עמוד נבנה עם SEO ונתוני עסק מובנים."],
        ["כל פנייה נשמרת", "פנייה מהאתר נשמרת במערכת ונשלחת אליכם למייל."],
        ["וואטסאפ בלחיצה", "לקוח שראה את האתר מגיע אליכם בלחיצה אחת."],
      ],
    },
    en: {
      p: "Without ads, your site has to do the work. Ours is built for that.",
      points: [
        ["Found on Google and AI", "Every page is built with SEO and structured business data."],
        ["Every enquiry is saved", "Enquiries from your site are saved in the system and emailed to you."],
        ["WhatsApp in one tap", "A customer who saw your site reaches you in one tap."],
      ],
    },
  },
}
