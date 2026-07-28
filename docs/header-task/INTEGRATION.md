# איחוד ההאדר — הנחיות אינטגרציה

שלושת הקבצים בתיקייה הזאת הם המימוש המלא: `nav.config.ts`, `SiteHeader.tsx`, `SiteHeader.module.css`. היעד: `src/app/_components/layout/`. התוכנית אושרה; ההכרעות שנקבעו (28.7): checkout נשאר בלי האדר, עמודי EN נשארים בשלב 1 עם HeaderEN (לוגו משמאל, מוסכמת LTR), והאינטגרציה נכנסת **אחרי מיזוג ענף הסקשנים** (נוגעים באותם קבצים).

## תזמון וענף
ענף חדש מ-origin/main **אחרי** שענף הסקשנים ממוזג. לא לגעת ב-WIP המקומי על feature/new-home ולא ב-feat/pixel-lead-events. Preview → אישור איציק → מיזוג.

## שלבי האינטגרציה

1. **העתקת הקבצים** ל-`src/app/_components/layout/` (שלושתם זה לצד זה — היבוא היחסי `./nav.config` מכוון לזה).
2. **רינדור מה-root layout** (`src/app/layout.tsx`): `<SiteHeader />` בראש ה-body, מעל `{children}` (ומעל/מתחת ל-LanguageBar — לשמר את הסדר הוויזואלי הקיים של LanguageBar; לדווח צילום). הקומפוננטה מחזירה null בעצמה ב-/lp, /checkout, /thanks ו-/en — אין צורך בתנאים ב-layout.
3. **עמוד הבית**: להסיר את `<NewHomeHeader />` ואת היבוא שלו מ-`NewHero.tsx` (שורות 20 ו-175 ב-main של היום). ההאדר החדש במצב dark הוא פס `#0A0F1A` אחיד שיושב מעל ההירו הכהה — לוודא ויזואלית שהמעבר חלק ושאין כפל ריווח בראש ההירו (ייתכן שצריך לקזז padding עליון ב-NewHero).
4. **הסרת SiteHeader הישן** (`_components/home/SiteHeader.tsx`) מכל נקודות השימוש — היבוא והרינדור:
   - עמודים: about, contact, pricing, portfolio, terms, privacy, accessibility, account-deletion, growth-guides, idea-to-product, seo-ai, marketing/seo-ai, not-found.
   - תבניות: ServicePageTemplate, ProductPageTemplate (שתיהן מזינות את design/develop/develop-ai/invoice/account-ai), BlogShell (רק בענף העברית — האנגלית נשארת HeaderEN), SeoAiTemplateHe.
   - את הקבצים הישנים (SiteHeader, NewHomeHeader) לא מוחקים בסבב הזה — רק מנתקים. מחיקה אחרי אישור.
5. **לוגו**: הקומפוננטה משתמשת אך ורק ב-`/white.svg` (כהה) ו-`/black.svg` (בהיר) — הקבצים המתוקנים עם ה-n. אם סבב החלפת הלוגו טרם מוזג, לוודא שהקבצים קיימים ב-public.
6. **עוגנים תחת האדר דביק**: במצב light ההאדר sticky — להוסיף `scroll-margin-top` (~84px) לסקשנים עם עוגנים (services / products / contact) כדי שגלילת עוגן לא תיחתך.

## בדיקות קבלה (בדפדפן אמיתי, דסקטופ 1440 + מובייל 390)
1. עמוד הבית: האדר כהה אחיד מעל ההירו, לוגו לבן "UXellent" (עם n!) בימין, בלי קפיצת layout.
2. עמוד פנימי (about, pricing, blog, invoice): האדר בהיר sticky, לוגו שחור בימין, קו תחתון עדין, נשאר בגלילה.
3. שני הדרופדאונים נפתחים ב-hover וב-focus (מקלדת), הקישורים נכונים.
4. מובייל: בורגר פותח/סוגר, כל הלינקים + שני הפילים, סגירה בלחיצה על לינק.
5. אין האדר כפול ואין האדר בכלל ב: /lp*, /checkout*, /thanks/startup-kit, /en* (שם HeaderEN הקיים בלבד).
6. עוגני #contact מהכפתורים נוחתים נכון מתחת להאדר הדביק.
7. חיפוש שאריות: אפס יבוא פעיל של SiteHeader הישן ו-NewHomeHeader מחוץ לקבצים עצמם.

## שלב 2 (לא בסבב הזה)
איחוד HeaderEN לאותה קומפוננטה (NAV_LINKS_EN ב-nav.config + prop lang), מחיקת הקומפוננטים הישנים, והחלטה אם להעביר גם את הפוטר לאותו דפוס.
