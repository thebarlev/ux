# ניקוי שאריות VOW — רשימת מעקב

דברים שזוהו כמתים או כמצביעים על הדומיין הישן, ונשארו במקומם בכוונה כדי לא
להרחיב סבב עבודה. למחיקה או להכרעה בסבב ניקוי ייעודי.

## מתים — מועמדים למחיקה

| פריט | מצב | הערה |
|---|---|---|
| `src/app/api/contact/route.ts` | חי אבל ללא צרכן | היה היעד של טופס `/contact` עד שהוחלף ב-Web3Forms (29.7.2026). שולח SMTP דרך Brevo אל `CONTACT_TO_EMAIL`, שמצביע על `support@vow.co.il` — דומיין שיצא משימוש. לוודא שאף טופס אחר לא קורא לו לפני מחיקה. |
| `src/app/_components/new-home/ContactSection.tsx` | לא מרונדר בשום מקום | קורא ל-`/api/new-home-contact`, ששולח ל-`itzik@uxellent.com` ו-`support@uxellent.com`. אם הקומפוננטה נמחקת, לבדוק אם גם ה-route מיותר. |
| `src/app/_components/new-home/ServiceSection.tsx` | לא מרונדר | הוחלף ב-`ServicesSection` במיזוג עמוד הבית. מחזיק עדיין `max-width` ביחידות `ch`, שהברייף פוסל לעברית. |
| `src/app/_components/home/CookieBanner.tsx` + `CookieBannerEN.tsx` | לא מרונדרים | הרינדור הוסר בקומיט `623fe6b` ("hide cookies", 16.3.2026). כל עוד הם מנותקים, שער ההסכמה ב-`meta-pixel.ts` יכול להחזיר רק `true` — החלטה נפרדת של איציק תלויה ועומדת. |

## משתני סביבה שמצביעים על הדומיין הישן

| משתנה | ערך בפרודקשן | הערה |
|---|---|---|
| `CONTACT_TO_EMAIL` | `support@vow.co.il` | היעד שבגללו פניות מ-`/contact` לא הגיעו. |
| `CONTACT_FROM_EMAIL` | `no-reply@vow.co.il` | כתובת שולח על הדומיין הישן. |
| `NEXT_PUBLIC_APP_BASE_URL` | `https://app.vow.co.il` | לבדוק מול `app.uxellent.com`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-HEX0NQF4WM` | תקין, אך כרגע ללא צרכן — המזהה מקובע בקוד. |

## תיבות שכדאי לוודא שמישהו קורא

`/api/leads` (הפופאפ ו-`InlineLeadForm`, כולל `/en`) שולח ל-`LEADS_NOTIFY_EMAIL`,
שהוא `support@uxellent.com` — תיבה אחרת מזו שאליה מגיעים הלידים של הטפסים
הראשיים (`itzikbab@gmail.com`). שווה לוודא שהיא נקראת.
