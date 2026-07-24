/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { LegalTemplate } from "@/app/_components/legal/LegalTemplate"
import { JsonLd, webPageSchema } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "מדיניות פרטיות | Uxellent",
  description: "מדיניות הפרטיות של Uxellent מסבירה כיצד אנו אוספים, שומרים ומשתמשים במידע אישי באתר ובשירותים הדיגיטליים.",
  alternates: {
    canonical: "/privacy",
    languages: heEnAlternateLanguages("/privacy", "/en/privacy"),
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <JsonLd
        data={webPageSchema({
          name: "מדיניות פרטיות | Uxellent",
          description: "מדיניות הפרטיות של Uxellent - כיצד אנו שומרים על המידע האישי שלך",
          url: "https://uxellent.com/privacy",
          dateModified: "2026-02-01",
        })}
      />
      <SiteHeader />

      <main id="main" role="main">
        <LegalTemplate
          title="מדיניות פרטיות"
          subtitle="מדיניות הפרטיות של Uxellent - כיצד אנו שומרים על המידע האישי שלך"
          lastUpdated="פברואר 2026"
        >
          <section>
            <p className="text-[18px] leading-relaxed mb-6">
              חברת Bugo Media LTD, ח.פ. 515960508 (להלן: "Uxellent", "אנחנו" או "החברה") מתחייבת לשמור על פרטיותך ולאפשר לך שליטה על המידע האישי שלך.
            </p>
            <p className="text-[18px] leading-relaxed mb-6">
              מדיניות פרטיות זו מסבירה איזה מידע אנחנו אוספים, למה אנחנו משתמשים בו, עם מי אנחנו משתפים אותו, ואיך אתה יכול לשלוט בו.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p><strong>כתובת המערכת:</strong> <a href="https://app.uxellent.com" className="text-blue-600 underline">app.uxellent.com</a></p>
              <p><strong>דוא"ל:</strong> <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">1. למי מדיניות זו מיועדת</h2>
            
            <p>מדיניות פרטיות זו חלה על כל מי שמשתמש בשירותי Uxellent, לרבות:</p>
            <ul className="list-disc mr-6 my-4 space-y-2">
              <li>האתר השיווקי שלנו (<a href="https://uxellent.com" className="text-blue-600 underline">uxellent.com</a>)</li>
              <li>המערכת ליצירת מסמכים חשבונאיים (<a href="https://app.uxellent.com" className="text-blue-600 underline">app.uxellent.com</a>)</li>
              <li>שירות החתימה הדיגיטלית (<a href="https://dsign.uxellent.com" className="text-blue-600 underline">dsign.uxellent.com</a>)</li>
            </ul>

            <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800">
                על ידי שימוש בשירותים שלנו, אתה מסכים למדיניות פרטיות זו. אם אינך מסכים - אל תשתמש בשירותים.
              </p>
            </div>

            <p>מונחים שאינם מוגדרים כאן יפורשו לפי תנאי השימוש שלנו.</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">2. איזה מידע אנחנו אוספים</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.1 מידע שאתה מספק לנו</h3>
            
            <h4 className="text-[18px] font-semibold mb-2 mt-4">בעת יצירת חשבון:</h4>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שם מלא</li>
              <li>תעודת זהות</li>
              <li>כתובת דוא"ל</li>
              <li>מספר טלפון</li>
              <li>פרטי העסק שלך (שם, מספר עוסק או ח.פ., כתובת, תחום פעילות)</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">בעת ביצוע תשלום:</h4>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>פרטי כרטיס אשראי (מועברים ישירות לספק התשלומים - אנחנו לא שומרים מספרי כרטיס אשראי)</li>
              <li>כתובת לחיוב</li>
              <li>פרטי עסקה (סכום, תאריך, סוג מנוי)</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">מסמכים ותוכן עסקי שאתה יוצר:</h4>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>חשבוניות, קבלות ומסמכים חשבונאיים שאתה מייצר במערכת</li>
              <li>פרטי לקוחות שלך (שמות, כתובות, מספרי טלפון, דוא"ל)</li>
              <li>פרטי עסקאות שאתה מזין</li>
              <li>קבצים שאתה מעלה (לוגו, תמונות, מסמכים)</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">פניות שירות:</h4>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>כל מידע שתשתף איתנו בצ'אט, דוא"ל או טלפון</li>
              <li>תיעוד השיחה או ההתכתבות</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.2 מידע שנאסף אוטומטית</h3>
            
            <p>כשאתה משתמש בשירותים שלנו, אנחנו אוספים:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>כתובת IP</li>
              <li>סוג דפדפן ומערכת הפעלה</li>
              <li>מזהה מכשיר (Device ID)</li>
              <li>דפים שביקרת בהם</li>
              <li>זמן ומשך השימוש</li>
              <li>פעולות שביצעת במערכת</li>
            </ul>
            
            <p className="mt-4">מידע זה נאסף באמצעות עוגיות וטכנולוגיות מעקב דומות (ראה סעיף 8).</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">3. למה אנחנו משתמשים במידע שלך</h2>
            
            <p>אנחנו משתמשים במידע שלך למטרות הבאות:</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.1 הפעלת השירות</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>אספקת גישה למערכת ולכלים שלנו</li>
              <li>יצירה ושליחה של מסמכים חשבונאיים</li>
              <li>אחסון המסמכים שלך</li>
              <li>מתן שירות חתימה דיגיטלית (Dsign)</li>
              <li>תמיכה טכנית ושירות לקוחות</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.2 שיפור וביטחון</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>ניתוח דפוסי שימוש לשיפור המערכת</li>
              <li>זיהוי ומניעת ניסיונות הונאה</li>
              <li>טיפול בתקלות ובעיות טכניות</li>
              <li>פיתוח תכונות חדשות על בסיס צרכי המשתמשים</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.3 תקשורת ושיווק</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שליחת עדכונים על השירות (שינויי מחיר, תכונות חדשות)</li>
              <li>משלוח ניוזלטר וטיפים לניהול עסק (אם הסכמת)</li>
              <li>פרסום ממוקד המותאם להעדפותיך</li>
              <li>סקרי שביעות רצון</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.4 חובות משפטיות</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>עמידה בדרישות מס הכנסה ורשויות אחרות</li>
              <li>שמירת רישומים כנדרש בחוק</li>
              <li>שיתוף פעולה עם רשויות אכיפת החוק</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">4. עם מי אנחנו משתפים את המידע שלך</h2>
            
            <p className="font-semibold text-lg mb-4">אנחנו לא מוכרים מידע אישי לצדדים שלישיים.</p>
            <p>אנחנו משתפים מידע רק במקרים הבאים:</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.1 ספקי שירות טכניים</h3>
            
            <p>אנחנו עובדים עם ספקי שירותים חיצוניים שעוזרים לנו להפעיל את המערכת ולספק את השירותים:</p>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">שירותי אחסון ושרתים:</h4>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>אחסון קבצים, תוכניות ומסמכים במערכת</li>
              <li>כל המידע שנאסף מאוחסן אצל ספקי השירות שלנו</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">שירותי עיבוד תשלומים:</h4>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>קבלת תשלומים בכרטיס אשראי</li>
              <li>פרטי כרטיס אשראי מועברים ישירות לספק התשלומים, לא דרכנו</li>
            </ul>

            <div className="bg-blue-50 border-r-4 border-blue-400 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">חשוב לדעת:</p>
              <ul className="text-blue-800 space-y-1">
                <li>• כל ספקי השירות מחויבים בהסכמי סודיות ואבטחת מידע</li>
                <li>• חלק מספקי השירות ממוקמים מחוץ לישראל</li>
                <li>• רמת ההגנה על מידע במדינות אלה עשויה להיות שונה מזו שבישראל</li>
                <li>• בשימוש בשירותי Uxellent, אתה מסכים להעברת המידע האישי שלך לספקים אלה</li>
              </ul>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.2 כלי פרסום ואנליטיקה</h3>
            
            <p className="mb-4">אנחנו משתמשים בשירותי צדדים שלישיים כדי להבין איך משתמשים בשירותים שלנו ולהציג לך פרסום רלוונטי:</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong>Google Analytics</strong> - ניתוח דפוסי שימוש
                <br />
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <strong>Google Ads</strong> - פרסום ממוקד
                <br />
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <strong>Meta (Facebook/Instagram)</strong> - פרסום ברשתות חברתיות
                <br />
                <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <strong>Microsoft Clarity</strong> - ניתוח חוויית משתמש
                <br />
                <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <strong>TikTok</strong> - פרסום ברשת TikTok
                <br />
                <a href="https://www.tiktok.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <strong>Taboola</strong> - פרסום ממוקד
                <br />
                <a href="https://www.taboola.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  מדיניות פרטיות
                </a>
              </li>
            </ul>

            <p className="mt-4">שירותים אלה משתמשים בעוגיות וטכנולוגיות מעקב כדי לאסוף מידע על השימוש שלך במערכת ובאתרים אחרים.</p>
            <p className="mt-2"><strong>איך לנהל פרסום ממוקד:</strong> ראה סעיף 8.4</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.3 הלקוחות שלך</h3>
            
            <p>כשאתה שולח מסמך (חשבונית, קבלה) ללקוחות שלך באמצעות המערכת, הלקוחות רואים:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>פרטי העסק שלך</li>
              <li>תוכן המסמך</li>
              <li>חתימה דיגיטלית</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.4 רשויות ואכיפת חוק</h3>
            
            <p>אנחנו נשתף מידע עם רשויות אכיפה או גורמים משפטיים אם:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>נדרש על פי צו שיפוטי או דרישה חוקית</li>
              <li>יש חשד לפעילות בלתי חוקית או הונאה</li>
              <li>יש צורך להגן על זכויותינו או זכויות אחרים</li>
              <li>יש חשד להפרת תנאי השימוש</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.5 העברת עסק</h3>
            
            <p>
              במקרה של מיזוג, מכירה או העברת נכסי החברה, המידע שלך עשוי לעבור לגורם הרוכש. במקרה כזה, המידע ימשיך להיות כפוף למדיניות פרטיות זו.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">5. איך אנחנו מגנים על המידע שלך</h2>
            
            <p>אנחנו נוקטים באמצעי אבטחה סבירים ומקובלים בתעשייה, כולל:</p>
            <ul className="list-disc mr-6 my-4 space-y-2">
              <li>הצפנת מידע בעת העברה (SSL/TLS)</li>
              <li>הגבלת גישה למידע רק לעובדים מורשים</li>
              <li>גיבוי תקופתי של נתונים</li>
              <li>ניטור פעילות חשודה</li>
            </ul>

            <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">אבל:</p>
              <p className="text-yellow-800">
                אף שיטת אחסון או העברה באינטרנט אינה מאובטחת ב-100%. אנחנו לא יכולים להבטיח אבטחה מוחלטת.
              </p>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">האחריות שלך:</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שמור על סיסמתך בסוד</li>
              <li>אל תשתף גישה לחשבון שלך</li>
              <li>התנתק ממכשירים ציבוריים</li>
              <li>דווח מיד על חשד לפריצה</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">6. הזכויות שלך</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.1 זכות עיון</h3>
            <p>
              לפי סעיף 13 לחוק הגנת הפרטיות, התשמ"א-1981, אתה זכאי לבקש לעיין במידע האישי שלך המצוי אצלנו.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.2 זכות תיקון ומחיקה</h3>
            <p>לפי סעיף 14 לחוק הגנת הפרטיות, אתה זכאי לבקש:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>תיקון מידע שגוי או לא מעודכן</li>
              <li>מחיקת מידע (בכפוף לחובות משפטיות)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.3 איך לממש את הזכויות שלך</h3>
            <p>
              שלח בקשה לכתובת: <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a>
            </p>
            <p className="mt-2">נשיב תוך 21 יום ונעדכן אותך על הפעולות שננקטו.</p>

            <div className="bg-blue-50 border-r-4 border-blue-400 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">חשוב לדעת:</p>
              <ul className="text-blue-800 space-y-1">
                <li>• אנחנו עשויים לבקש אימות זהות לפני מתן מידע רגיש</li>
                <li>• במקרים מסוימים (חובה משפטית, הגנה על זכויות אחרים) לא נוכל למחוק מידע</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">7. כמה זמן אנחנו שומרים את המידע שלך</h2>
            
            <p>נשמור את המידע האישי שלך למשך הזמן הדרוש על מנת:</p>
            <ul className="list-disc mr-6 my-4 space-y-2">
              <li>לממש את מטרות השימוש במידע המפורטות במדיניות הפרטיות</li>
              <li>לעמוד בהתחייבויות המשפטיות שלנו</li>
              <li>לפתור סכסוכים</li>
              <li>לאכוף את ההסכמים שלנו</li>
              <li>או למשך פרק זמן ארוך יותר כפי שיידרש לפי הוראות הדין הרלוונטי</li>
            </ul>

            <p className="mt-4">
              אנו עשויים למחוק את המידע שלך מבלי להודיע לך על כך, ככל שאנו רואים שאין עוד צורך להחזיק בו למטרות המפורטות לעיל.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">8. עוגיות וטכנולוגיות מעקב</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.1 מה זה עוגיות?</h3>
            <p>
              עוגיות הן קבצי טקסט קטנים שנשמרים במכשיר שלך כשאתה גולש באתר. הן עוזרות לנו לזכור אותך, להבין איך אתה משתמש בשירות, ולשפר את החוויה שלך.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.2 סוגי העוגיות שאנחנו משתמשים</h3>
            
            <div className="space-y-4 my-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">עוגיות חיוניות:</h4>
                <ul className="list-disc mr-6 space-y-1">
                  <li>תפעול בסיסי - התחברות, ניווט, זיכרון העדפות</li>
                  <li><strong>לא ניתן לחסום</strong> (בלעדיהן המערכת לא תעבוד)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">עוגיות אבטחה:</h4>
                <ul className="list-disc mr-6 space-y-1">
                  <li>זיהוי משתמש, מניעת התחזות, הגנה מפני התקפות</li>
                  <li><strong>לא ניתן לחסום</strong></li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">עוגיות תפעוליות:</h4>
                <ul className="list-disc mr-6 space-y-1">
                  <li>זיכרון העדפות שלך (שפה, תצוגה)</li>
                  <li><strong>ניתן לחסום</strong></li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">עוגיות אנליטיות:</h4>
                <ul className="list-disc mr-6 space-y-1">
                  <li>הבנת דפוסי שימוש (Google Analytics)</li>
                  <li><strong>ניתן לחסום</strong></li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">עוגיות פרסומיות:</h4>
                <ul className="list-disc mr-6 space-y-1">
                  <li>הצגת פרסום ממוקד</li>
                  <li><strong>ניתן לחסום</strong></li>
                </ul>
              </div>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.3 עוגיות צד שלישי</h3>
            <p>אנחנו משתמשים בעוגיות של הגורמים הבאים:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>Google Analytics - ניתוח תעבורה</li>
              <li>Google Ads, Meta, TikTok, Taboola, Microsoft Clarity - פרסום ממוקד</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.4 איך לנהל עוגיות</h3>
            
            <h4 className="text-[18px] font-semibold mb-2 mt-4">חסימת עוגיות בדפדפן:</h4>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li><strong>Chrome:</strong> הגדרות → פרטיות ואבטחה → עוגיות</li>
              <li><strong>Firefox:</strong> הגדרות → פרטיות ואבטחה → עוגיות</li>
              <li><strong>Safari:</strong> העדפות → פרטיות → חסום עוגיות</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">ביטול פרסום ממוקד:</h4>
            <ul className="space-y-2 my-3">
              <li>
                <strong>Google:</strong>{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  adssettings.google.com
                </a>
              </li>
              <li>
                <strong>Facebook:</strong>{" "}
                <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  facebook.com/ads/preferences
                </a>
              </li>
              <li><strong>TikTok:</strong> הגדרות → פרטיות → פרסומות</li>
            </ul>

            <div className="bg-red-50 border-r-4 border-red-400 p-4 my-6">
              <p className="font-semibold text-red-800">
                חשוב: חסימת עוגיות חיוניות תמנע ממך להשתמש בחלק מהשירותים.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">9. שירותי צד שלישי</h2>
            
            <p>
              המערכת שלנו עשויה לכלול קישורים או אינטגרציות לשירותים חיצוניים (כמו WhatsApp, Google Drive).
            </p>

            <p className="mt-4">
              <strong>אחריות:</strong> השימוש בשירותים אלה הוא על אחריותך הבלעדית ובהתאם למדיניות הפרטיות שלהם. אנחנו לא אחראים על תוכן, מדיניות או פעולות של צדדים שלישיים.
            </p>

            <p className="mt-4">
              <strong>המלצה:</strong> קרא את מדיניות הפרטיות של כל שירות צד שלישי לפני השימוש.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">10. שימוש על ידי קטינים</h2>
            
            <div className="bg-red-50 border-r-4 border-red-400 p-4 my-6">
              <p className="font-semibold text-red-800">
                אין להשתמש בשירותי Uxellent אם אתה מתחת לגיל 18.
              </p>
            </div>

            <p>
              אם אתה הורה או אפוטרופוס וגילית שקטין השתמש בשירות בלי רשותך, צור איתנו קשר מיד ב-<a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a> ונסגור את החשבון.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">11. תקשורת והודעות</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">11.1 הודעות שירות (חובה)</h3>
            <p>אנחנו שומרים את הזכות לשלוח לך הודעות הקשורות לשירות, כגון:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שינויים במדיניות הפרטיות או בתנאי השימוש</li>
              <li>עדכונים על התחייבויות תשלום</li>
              <li>התראות אבטחה</li>
              <li>שינויים בזמינות השירות</li>
            </ul>
            <p className="mt-4"><strong>לא ניתן לבטל הודעות אלה אלא אם תסגור את החשבון.</strong></p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">11.2 דיוור שיווקי (אופציונלי)</h3>
            <p>אם הסכמת לקבל דיוור שיווקי (ניוזלטר, טיפים, הצעות), תוכל לבטל בכל עת:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>לחץ על "הסר עצמי" בתחתית כל דוא"ל</li>
              <li>פנה אלינו ב-<a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">12. שינויים במדיניות זו</h2>
            
            <p>
              אנחנו עשויים לעדכן מדיניות זו מעת לעת כדי לשקף שינויים בשירות או בחוק.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">איך נודיע לך:</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>פרסום הודעה במערכת (<a href="https://app.uxellent.com" className="text-blue-600 underline">app.uxellent.com</a>)</li>
              <li>שליחת דוא"ל למשתמשים רשומים (שינויים מהותיים בלבד)</li>
              <li>עדכון תאריך "עודכן לאחרונה" בראש המסמך</li>
            </ul>

            <p className="mt-4">מומלץ לבקר בדף זה מדי פעם כדי להישאר מעודכן.</p>

            <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800">
                המשך שימוש בשירות לאחר עדכון = הסכמה למדיניות המעודכנת.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">13. צור קשר</h2>
            
            <p className="mb-4">
              יש לך שאלות על מדיניות הפרטיות? רוצה לממש את זכויותיך?
            </p>

            <div className="bg-white p-6 rounded-lg">
              <p><strong>דוא"ל:</strong> <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></p>
              <p><strong>שם החברה:</strong> Bugo Media LTD</p>
              <p><strong>מספר חברה:</strong> 515960508</p>
              <p className="mt-4 text-sm text-gray-600">מאגר מידע רשום</p>
            </div>
          </section>
        </LegalTemplate>
      </main>

      <SiteFooter />
    </div>
  )
}