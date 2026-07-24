/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { LegalTemplate } from "@/app/_components/legal/LegalTemplate"
import { JsonLd, webPageSchema } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "תנאי שימוש | Uxellent",
  description: "תנאי השימוש של Uxellent מסבירים את הכללים, הזכויות והאחריות בשימוש באתר, במערכת ובשירותים הדיגיטליים.",
  alternates: {
    canonical: "/terms",
    languages: heEnAlternateLanguages("/terms", "/en/terms"),
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <JsonLd
        data={webPageSchema({
          name: "תנאי שימוש | Uxellent",
          description: "תנאי השימוש של Uxellent - עדכון אחרון פברואר 2026",
          url: "https://uxellent.com/terms",
          dateModified: "2026-02-16",
        })}
      />
      <SiteHeader />

      <main id="main" role="main">
        <LegalTemplate
          title="תנאי שימוש"
          subtitle="עדכון אחרון: 16 בפברואר 2026"
        >
          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">1. כללי</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.1 אודות Uxellent והשירותים</h3>
            <p>
              חברת Bugo Media LTD, ח.פ. 515960508 ("Uxellent", "אנחנו" או "החברה") מפעילה מערכת מקוונת המאפשרת יצירה, ניהול ושליחה של מסמכים חשבונאיים דיגיטליים, לרבות חשבוניות מס, קבלות, חשבוניות עסקה ומסמכים עסקיים נוספים. המערכת זמינה דרך:
            </p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>אתר האינטרנט שלנו: uxellent.com</li>
              <li>המערכת המקוונת: app.uxellent.com</li>
              <li>שירות החתימה הדיגיטלית: dsign.uxellent.com</li>
            </ul>
            <p>המערכת, האתר ושירות החתימה הדיגיטלית יכונו ביחד להלן: "השירותים" או "המערכת".</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.2 הסכמה לתנאי השימוש</h3>
            <p>
              תנאי שימוש אלה ("תנאי השימוש" או "ההסכם") מסדירים את היחסים בין Uxellent לבין כל מי שעושה שימוש בשירותים ("המשתמש", "אתה" או "הנך").
            </p>
            <p>
              על ידי שימוש בשירותים, אתה מסכים לתנאי שימוש אלה במלואם. אם אינך מסכים לתנאים אלה (כולם או חלקם) - אינך רשאי להשתמש בשירותים.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.3 תנאים פרטניים נוספים</h3>
            <p>
              לצד תנאי שימוש אלה, עשויים להופיע תנאים פרטניים נוספים ביחס לשירותים ספציפיים. תנאים פרטניים כאלה מוסיפים על תנאי השימוש ואינם גורעים מהם.
            </p>
            <p>
              בכל מקרה של סתירה בין תנאי שימוש אלה לבין הוראות אחרות שפורסמו שלא במסגרת תנאי השימוש, יגברו תנאי השימוש.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.4 מדיניות הפרטיות</h3>
            <p>
              מדיניות הפרטיות של Uxellent זמינה בכתובת <a href="https://uxellent.com/privacy" className="text-blue-600 underline">https://uxellent.com/privacy</a> ומהווה חלק בלתי נפרד מתנאי שימוש אלה.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.5 שירותי תמיכה</h3>
            <p>אנחנו מספקים תמיכה טכנית בערוצים הבאים:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>צ'אט במערכת (app.uxellent.com)</li>
              <li>WhatsApp: 0545215193</li>
            </ul>
            <p><strong>שעות פעילות:</strong> ימים א'–ה', 9:00–18:00</p>
            <p><strong>זמן מענה:</strong> עד 48 שעות בימי עסקים</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.6 דיווח על תוכן בעייתי</h3>
            <p>
              אם נתקלת במערכת בתוכן המפר כל דין, אנא הודע לנו בדוא"ל <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a> עם פירוט התוכן ומהות ההפרה.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.7 הערות כלליות</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>תנאי שימוש אלה נכתבו בלשון זכר מטעמי נוחות בלבד, אך הם מיועדים לכל המגדרים.</li>
              <li>כותרות הסעיפים הן לנוחיות בלבד ואין להן משקל בפירוש התנאים.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">2. השירותים ורישיון השימוש</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.1 מהם השירותים</h3>
            <p>Uxellent מספקת רישיון שימוש לביצוע הפעולות הבאות ("הרישיון"):</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>יצירת חשבוניות מס, חשבוניות עסקה וקבלות</li>
              <li>שליחת מסמכים בדוא"ל או ייצוא ל-PDF</li>
              <li>חתימה דיגיטלית מאובטחת (באמצעות שירות Dsign)</li>
              <li>יצירת מסמכים בעברית ובאנגלית</li>
              <li>ניהול פרטי לקוחות ועסקאות</li>
              <li>אחסון מסמכים במערכת</li>
              <li>התאמה אישית של מסמכים (לוגו, הערות, תנאי תשלום)</li>
            </ul>
            <p>הרשימה לעיל אינה ממצה את כל הפעולות שניתן לבצע במערכת. פעולות נוספות עשויות להתווסף מעת לעת.</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.2 מי יכול להשתמש בשירותים</h3>
            <p>הרישיון ניתן למשתמשים העומדים בתנאים הבאים:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>מנהלים פעילות עסקית רשומה כדין בישראל</li>
              <li>בגירים (מעל גיל 18)</li>
              <li>מסכימים לתנאי שימוש אלה</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.3 בחינת התאמת השירותים</h3>
            <p>
              חובתך לבדוק לפני השימוש כי השירותים מתאימים לצרכיך. לא תהיה לך טענה כלפי Uxellent בשל אי התאמת השירותים לצרכיך או לציפיותיך.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.4 אחריות המשתמש על השימוש</h3>
            <p>
              אתה אחראי באופן בלעדי ומלא לכל שימוש שאתה ו/או מי מטעמך עושים במערכת.
            </p>
            <p>
              Uxellent אינה אחראית לשימוש שלך במערכת, לתוכן שאתה מייצר או למסמכים שאתה מפיק.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.5 המערכת אינה ייעוץ חשבונאי</h3>
            <p><strong>חשוב להבין:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>המידע והתוכן במערכת לא נועדו להחליף ייעוץ חשבונאי, מיסויי או משפטי</li>
              <li>Uxellent אינה מספקת שירותי ייעוץ מכל סוג שהוא</li>
              <li>המערכת היא כלי טכנולוגי לניהול מסמכים בלבד</li>
              <li>חובתך לפנות לייעוץ מקצועי לפי הצורך</li>
            </ul>
            <p>
              מענה שתקבל ממנו במסגרת תמיכה טכנית לא ייחשב בשום אופן כייעוץ חשבונאי, מיסויי או משפטי.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.6 בדיקת המלצות המערכת</h3>
            <p>
              המערכת עשויה להציע לך המלצות, ברירות מחדל או סיווגים (למשל: סיווג הכנסות או הוצאות, סוג מסמך, שדות מומלצים).
            </p>
            <p><strong>חובתך לבחון ולבדוק בעצמך כל המלצה שמוצגת לך במערכת.</strong></p>
            <p>
              Uxellent אינה נושאת באחריות לבחירות שביצעת או שיכולת לבצע במערכת. האחריות הבלעדית לדיוק המסמכים, לסיווגים ולתוכן היא שלך.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.7 זכותנו לשנות את השירותים</h3>
            <p>אנחנו רשאים בכל עת לבצע שינויים בשירותים, לרבות:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>מראה ויזואלי ועיצוב גרפי</li>
              <li>פונקציונליות ותכונות</li>
              <li>הוספה או הסרה של שירותים</li>
              <li>תחזוקה ועדכוני תוכנה שעלולים לגרום להפסקה זמנית</li>
            </ul>
            <p>
              <strong>למעט:</strong> אם שינוי מונע ממך באופן מהותי להמשיך להשתמש בשירותים בהם שילמת, תוכל לבטל את המנוי ולקבל החזר יחסי עבור יתרת התקופה ששולמה.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.8 זכותנו להגביל או להפסיק שימוש</h3>
            <p>Uxellent תהיה רשאית:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>להזהיר משתמשים על שימוש בלתי הולם או מפר</li>
              <li>להגביל גישה למערכת של משתמש המפר תנאי שימוש</li>
              <li>להפסיק או למנוע שימוש ברישיון (כולו או חלקו)</li>
              <li>להסיר תוכן או לבטל פעולות שבוצעו בניגוד לתנאי השימוש</li>
              <li>לחסום גישה מכתובות IP או מכשירים החשודים בפעילות מזיקה</li>
            </ul>
            <p>כל האמור לעיל יבוצע לפי שיקול דעתנו הבלעדי וללא צורך בהודעה מוקדמת.</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">3. חשבון המשתמש</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.1 יצירת חשבון</h3>
            <p>
              כדי להשתמש בשירותים, עליך ליצור חשבון משתמש ("החשבון").
            </p>
            <p>בעת יצירת החשבון, חלה עליך חובה למסור:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שם מלא</li>
              <li>תעודת זהות</li>
              <li>כתובת דוא"ל</li>
              <li>מספר טלפון</li>
              <li>פרטי העסק (שם, מספר עוסק/ח.פ., כתובת)</li>
            </ul>
            <p><strong>אסור:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>למסור פרטים שגויים או לא מלאים</li>
              <li>ליצור חשבון בשם אדם אחר ללא הסכמתו (זוהי עבירה פלילית)</li>
              <li>ליצור יותר מחשבון אחד לאותו עסק (אותו מספר רישום)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.2 בעלות על חשבון עסק</h3>
            <p>אתה מצהיר ומתחייב:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>כל עסק שתפתח בחשבון הוא בבעלותך</li>
              <li>העסק רשום כדין בישראל</li>
              <li>יש לך הרשאה חוקית לנהל את העסק במערכת</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.3 סיסמה ואבטחת חשבון</h3>
            <p><strong>חובותיך:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שמור על הסיסמה בסוד ואל תגלה אותה לאחרים</li>
              <li>השתמש בסיסמה חזקה (8–16 תווים)</li>
              <li>אל תזין את הסיסמה בדוא"ל או במסרונים</li>
              <li>הודע לנו מיד על כל חשד לשימוש לא מורשה בחשבונך</li>
            </ul>
            <p><strong>אתה אחראי לכל פעולה שמתבצעת בחשבונך, בין אם בידיעתך ובין אם לאו.</strong></p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.4 שימוש אסור במערכת</h3>
            <p>אסור לבצע את הפעולות הבאות:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שימוש בתוכנות אוטומטיות (Bots, Crawlers) לגלישה או איסוף מידע מהמערכת</li>
              <li>מניפולציה על כתובות URL כדי לגשת לדפים פנימיים (URL Hacking)</li>
              <li>העלאה או פרסום של תוכן המפר דין, זכויות יוצרים, סודות מסחריים או פוגע בפרטיות</li>
              <li>שינוי, עריכה או התערבות בקוד המקור, בעיצוב או בתכנים של המערכת</li>
              <li>שימוש בשירותים לצורך הונאה, הטעיה או פעילות בלתי חוקית</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.5 הסכמה לדיוור</h3>
            <p>אתה מסכים שנוכל לשלוח לכתובת הדוא"ל שלך:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>הודעות על פעולות שביצעת במערכת</li>
              <li>עדכונים טכניים והודעות שירות</li>
              <li>ניוזלטר וחומרי שיווק (ניתן לבטל בכל עת)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.6 גישה של נציגי Uxellent לחשבון</h3>
            <p>
              אתה מסכים ומאשר שנציגי Uxellent יהיו רשאים להיכנס לחשבונך בכל עת, למטרות:
            </p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>בדיקות טכניות</li>
              <li>סיוע בפתרון תקלות</li>
              <li>מתן תמיכה</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.7 סגירת גישה למסמכים לאחר סיום מנוי</h3>
            <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 my-4">
              <p className="font-semibold text-yellow-800">חשוב לדעת:</p>
              <p className="text-yellow-800">
                בחלוף 14 ימים ממועד סיום המנוי (מכל סיבה שהיא) - לא תוכל עוד לגשת למסמכים שיצרת במערכת.
              </p>
              <p className="text-yellow-800 mt-2">
                <strong>חובתך להוריד את כל המסמכים עד לא יאוחר ממועד זה.</strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">4. תקופת שימוש חינמית</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.1 מהי תקופת השימוש החינמית</h3>
            <p>
              Uxellent מציעה תקופת שימוש חינמית של עד שנה מיום פתיחת החשבון ("תקופת השימוש החינמית").
            </p>
            <p>
              בתקופה זו, תוכל ליצור עד 10 מסמכים בכל חודש קלנדרי, ללא תשלום.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.2 תנאים וההגבלות</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>תקופת השימוש החינמית ניתנת ללא כל התחייבות מצד Uxellent, לרבות התחייבות לזמינות המערכת או העדר תקלות</li>
              <li>Uxellent רשאית לשנות את תנאי השימוש החינמי בכל עת (לרבות מספר המסמכים המותרים או משך התקופה)</li>
              <li>שינויים כאמור יכנסו לתוקף לגבי משתמשים חדשים; משתמשים קיימים ימשיכו בתנאים הקיימים עד תום תקופת השנה</li>
              <li>תקופת השימוש החינמית תינתן פעם אחת בלבד לכל משתמש/עסק</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.3 סיום תקופת השימוש החינמית</h3>
            <p>
              בתום שנה מיום פתיחת החשבון, או בחריגה ממכסת 10 המסמכים החודשית, תידרש לרכוש מנוי בתשלום כדי להמשיך להשתמש במערכת.
            </p>
            <p>
              אם לא תרכוש מנוי - לא תוכל ליצור מסמכים חדשים, אך תוכל לצפות במסמכים קיימים למשך 14 ימים נוספים.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">5. תשלום עבור השירותים</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.1 מחירון השירותים</h3>
            
            <div className="bg-white p-4 rounded-lg my-4">
              <h4 className="font-semibold mb-2">מנוי חודשי:</h4>
              <ul className="list-disc mr-6 space-y-1">
                <li>עלות: 27 ₪ לחודש</li>
                <li>מאפשר יצירת עד 50 מסמכים בחודש</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg my-4">
              <h4 className="font-semibold mb-2">חריגה ממכסת המסמכים:</h4>
              <ul className="list-disc mr-6 space-y-1">
                <li>כל מסמך נוסף מעבר ל-50: 1 ₪ למסמך</li>
                <li>החיוב יתבצע באופן אוטומטי</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg my-4">
              <h4 className="font-semibold mb-2">מנוי שנתי:</h4>
              <ul className="list-disc mr-6 space-y-1">
                <li>עלות: 290 ₪ לשנה (תשלום מראש)</li>
                <li>מאפשר יצירת עד 50 מסמכים בחודש</li>
              </ul>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.2 שינויים במחירים ובמבנה השירותים</h3>
            <p>Uxellent רשאית לשנות מעת לעת:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>מחירי השירותים</li>
              <li>סוגי המנויים והחבילות</li>
              <li>תמהיל הפעולות והשירותים</li>
            </ul>
            <p><strong>שינויים יחולו כדלקמן:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>משתמשים חדשים: מיד עם פרסום השינוי</li>
              <li>משתמשים קיימים: רק בחידוש הבא של המנוי (לא באמצע תקופה ששולמה)</li>
            </ul>
            <p>
              <strong>הודעה על שינויים:</strong> שינויים מהותיים יפורסמו באתר ו/או במערכת לפחות 30 יום מראש.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.3 מחזורי חיוב</h3>
            <p><strong>מנוי חודשי:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>תקופה בלתי מוגבלת</li>
              <li>חיוב בתחילת כל חודש, מראש</li>
              <li>ניתן לביטול בכל עת (ראה סעיף 6)</li>
            </ul>
            <p><strong>מנוי שנתי:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>תקופה בלתי מוגבלת</li>
              <li>חיוב אחת לשנה, מראש</li>
              <li>ניתן לביטול בכל עת (ראה סעיף 6)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.4 מועדי החיוב</h3>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>החיוב הראשון יתבצע מיד עם רכישת המנוי</li>
              <li>חיובים תקופתיים יבוצעו בתחילת כל תקופה (חודש/שנה), מראש</li>
              <li>חיוב עבור חריגה ממכסת מסמכים יתבצע בסוף החודש</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.5 חשבוניות</h3>
            <p>
              לאחר כל חיוב, תופק לך חשבונית באופן אוטומטי במערכת. החשבונית תישמר באזור האישי שלך.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">6. ביטול מנוי והחזרים</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.1 ביטול מנוי חודשי</h3>
            
            <p><strong>ביטול ביום הרכישה:</strong></p>
            <p>
              אם תבטל את המנוי עד השעה 23:59 ביום בו רכשת אותו, ולא ביצעת שימוש במערכת - תזוכה במלוא עלות הרכישה.
            </p>

            <p className="mt-4"><strong>ביטול לאחר יום הרכישה:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>הביטול ייכנס לתוקף בתום החודש הקלנדרי בו ניתנה ההודעה</li>
              <li>לא תהיה זכאי להחזר כספי</li>
              <li>תוכל להמשיך להשתמש במערכת עד תום אותו חודש</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.2 ביטול מנוי שנתי</h3>
            
            <p><strong>ביטול תוך 14 ימים מהרכישה:</strong></p>
            <p>אם תבטל תוך 14 ימים מיום רכישת המנוי, תזוכה כדלקמן:</p>
            <div className="bg-blue-50 p-4 rounded-lg my-4 font-mono text-sm">
              <p>זיכוי = ערך המנוי השנתי</p>
              <p className="mr-8">פחות: חלק יחסי של תקופת השימוש עד הביטול</p>
              <p className="mr-8">פחות: דמי ביטול (5% מערך המנוי או 100₪, לפי הנמוך)</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg my-4">
              <p className="font-semibold mb-2">דוגמה:</p>
              <ul className="space-y-1">
                <li>רכשת מנוי שנתי ב-290₪</li>
                <li>ביטלת לאחר 7 ימים</li>
                <li>חישוב: 290₪ − (290₪ ÷ 365 × 7) = 284.5₪</li>
                <li>דמי ביטול: 100₪ (הנמוך מבין 100₪ ל-14.5₪)</li>
                <li className="font-semibold">זיכוי סופי: 184.5₪</li>
              </ul>
            </div>

            <p className="mt-6"><strong>ביטול לאחר 14 ימים:</strong></p>
            <p>הביטול ייכנס לתוקף תוך 3 ימי עסקים, ותזוכה כדלקמן:</p>
            <div className="bg-blue-50 p-4 rounded-lg my-4 font-mono text-sm">
              <p>זיכוי = ערך החיוב השנתי האחרון</p>
              <p className="mr-8">פחות: (מחיר מנוי חודשי × מספר חודשים ששימשו)</p>
              <p className="mr-8">פחות: דמי ביטול (5% מערך החיוב השנתי או 100₪, לפי הנמוך)</p>
            </div>

            <div className="bg-white p-4 rounded-lg my-4">
              <p className="font-semibold mb-2">דוגמה:</p>
              <ul className="space-y-1">
                <li>רכשת מנוי שנתי ב-290₪</li>
                <li>ביטלת לאחר 4 חודשים</li>
                <li>חישוב: 290₪ − (27₪ × 4) = 182₪</li>
                <li>דמי ביטול: 14.5₪ (5% מ-290₪)</li>
                <li className="font-semibold">זיכוי סופי: 167.5₪</li>
              </ul>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.3 איך לבטל מנוי</h3>
            <p>ניתן לבטל מנוי באחד מהאופנים הבאים:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>דוא"ל לכתובת: <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></li>
              <li>צ'אט עם נציג במערכת</li>
              <li>WhatsApp: 0545215193</li>
            </ul>
            <p>
              <strong>מנוי חודשי בלבד:</strong> גם באמצעות כפתור "ביטול מנוי" באזור האישי שלך במערכת.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">7. קניין רוחני</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">7.1 בעלות על המערכת</h3>
            <p>
              כל הזכויות במערכת, לרבות קוד המקור, עיצוב, תכנים, סימנים מסחריים ופטנטים, שייכים ל-Uxellent או למי שהעניק לה רישיון.
            </p>
            <p><strong>אסור לך:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>להעתיק, לשכפל או להפיץ חלקים מהמערכת</li>
              <li>לבצע הנדסה הפוכה (Reverse Engineering)</li>
              <li>להסיר או לשנות סימנים מסחריים או הודעות זכויות יוצרים</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">7.2 בעלות על התוכן שלך</h3>
            <p>
              אתה שומר על הבעלות המלאה על כל התוכן והמסמכים שאתה יוצר במערכת.
            </p>
            <p>אתה נותן ל-Uxellent רישיון להשתמש בתוכן שלך למטרות הבאות בלבד:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>הפעלת השירותים עבורך</li>
              <li>שיפור המערכת ופיתוח תכונות חדשות (בצורה אנונימית)</li>
              <li>עמידה בדרישות חוק</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">7.3 שימוש במידע לשיפור השירותים</h3>
            <p>
              אתה מאשר ל-Uxellent לעשות שימוש במידע שנאסף ממך (כמפורט במדיניות הפרטיות) ליצירת נתונים אנונימיים וסטטיסטיים, לרבות:
            </p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>נתונים ממוצעים ומצטברים</li>
              <li>מדדים וניתוחים</li>
              <li>שיפור מערכת הבינה המלאכותית</li>
              <li>פיתוח תכונות חדשות</li>
              <li>מחקרים והשוואות</li>
            </ul>
            <p><strong>חשוב להבין:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>הנתונים הסטטיסטיים אנונימיים לחלוטין ולא ניתן לזהות אותך באמצעותם</li>
              <li>הנתונים הסטטיסטיים הם רכושה הבלעדי של Uxellent</li>
              <li>Uxellent רשאית להשתמש, למכור, להשכיר או לשתף את הנתונים הסטטיסטיים ללא הגבלה</li>
              <li>אתה מוותר על כל זכות בנתונים הסטטיסטיים</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">8. הגבלת אחריות</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.1 השירותים ניתנים "כמות שהם"</h3>
            <p>
              Uxellent מספקת את השירותים "כמות שהם" (AS-IS) ו-"כפי שזמינים" (AS-AVAILABLE), ללא אחריות מכל סוג.
            </p>
            <p><strong>אנחנו לא מתחייבים:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שהשירותים יהיו זמינים תמיד וללא הפסקות</li>
              <li>שהמערכת תהיה נקייה מבאגים או שגיאות</li>
              <li>שהתוצאות יהיו מדויקות או שלמות</li>
              <li>שהשירותים יתאימו לצרכיך הספציפיים</li>
              <li>שהמערכת תפעל 100% מהזמן</li>
            </ul>
            <p>
              מעת לעת אנחנו עשויים לבצע תחזוקה, עדכוני תוכנה או שדרוגים שעלולים לגרום להפסקה זמנית של השירותים.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.2 הגבלת אחריות לנזקים</h3>
            <p>Uxellent לא תהיה אחראית לכל נזק, ישיר או עקיף, לרבות:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>אובדן רווחים או הכנסות</li>
              <li>אובדן מידע או מסמכים</li>
              <li>נזקים עקב השבתת המערכת</li>
              <li>נזקים בגין שימוש או חוסר יכולת להשתמש במערכת</li>
              <li>נזקים הנובעים משגיאות, באגים או אי דיוקים במערכת</li>
            </ul>
            <p>
              בכל מקרה, אחריות Uxellent המצטברת לא תעלה על הסכום ששילמת בפועל עבור השירותים ב-3 החודשים שקדמו לאירוע שגרם לנזק.
            </p>
            <p><strong>למעט במקרה של פעולה בזדון מצד Uxellent.</strong></p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.3 אחריותך הבלעדית</h3>
            <p>אתה מקבל על עצמך אחריות מלאה:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>לדיוק המסמכים שאתה מפיק</li>
              <li>לתוכן שאתה מזין למערכת</li>
              <li>לציות לחוקי המס וההנהלת חשבונות</li>
              <li>לגיבוי המסמכים שלך</li>
              <li>לשימוש הולם ומותר במערכת</li>
            </ul>
            <p>
              Uxellent לא תהיה אחראית לתוכן שאתה מעלה, מעביר או מפרסם באמצעות המערכת.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.4 חובת גיבוי מסמכים</h3>
            <div className="bg-red-50 border-r-4 border-red-400 p-4 my-4">
              <p className="font-semibold text-red-800">חשוב מאוד:</p>
              <p className="text-red-800">
                חובתך לגבות ולשמור באופן עצמאי (ולא באמצעות המערכת) את כל המסמכים והחומרים שאתה יוצר או מעלה למערכת.
              </p>
            </div>
            <p><strong>Uxellent אינה אחראית:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>לאובדן מסמכים או מידע</li>
              <li>למחיקת מסמכים (בכוונה או בטעות)</li>
              <li>לחוסר יכולת לגשת למסמכים</li>
              <li>לכל נזק הנובע מאי ביצוע גיבוי</li>
            </ul>
            <p>
              המערכת אינה מיועדת לשמש ככלי למימוש חובת שמירת מידע כפי שחלה עליך או על רואה החשבון מטעמך לפי דין.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.5 קישורים למסמכים - תוקף מוגבל</h3>
            <p>
              ככל שהמערכת תאפשר משלוח קישור למסמך (במקום קובץ PDF), תוקף הקישור מוגבל לתקופה של <strong>3 חודשים</strong> ממועד יצירתו.
            </p>
            <p>
              חובתך להודיע ללקוחותיך על מגבלה זו. Uxellent אינה אחראית לחוסר יכולת לגשת לקישור לאחר תום התקופה.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.6 אחריות על שירותי צד שלישי</h3>
            <p>Uxellent לא תהיה אחראית בשום מקרה לכל נזק, הפסד או הוצאה הנובעים מ:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>תקלה, שגיאה או הפרעה במערכת צד שלישי</li>
              <li>שירותים שניתנו לך באמצעות מערכת צד שלישי (ולא ישירות דרך Uxellent)</li>
              <li>אי זמינות של שירותי צד שלישי</li>
              <li>שינויים או ביטול של שירותי צד שלישי</li>
            </ul>
            <p>
              למשל: אם אתה משתמש באינטגרציה של צד שלישי והיא לא פועלת - זו אחריות הצד השלישי, לא של Uxellent.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.7 אחריותך לחיבור אינטרנט</h3>
            <p>
              חובתך לוודא שיש לך חיבור תקין ויציב לאינטרנט לפני השימוש במערכת.
            </p>
            <p>Uxellent אינה אחראית לכל נזק הנובע מבעיות בחיבור שלך לאינטרנט, לרבות:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>ניתוק</li>
              <li>איטיות</li>
              <li>תקלות ברשת</li>
              <li>הפסקות בשירות</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.8 אחריותך לאבטחת המכשיר</h3>
            <p>
              המכשיר שלך (מחשב, טאבלט, סמארטפון) הוא באחריותך הבלעדית, לרבות אבטחתו.
            </p>
            <p>
              <strong>זהירות:</strong> פעולות מסוימות כמו "פריצת" (Jailbreak/Root) המכשיר עלולות לפגוע באבטחת המידע שלך, ובנוסף חלקן אסורות וחוקיות.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.9 סיכוני סייבר</h3>
            <p>המערכת, מעצם היותה מבוססת על תוכנות ורשתות תקשורת, חשופה לסיכונים כגון:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>וירוסים, תוכנות זדוניות, סוסים טרויאנים</li>
              <li>פריצה או חדירה על ידי גורמים עוינים</li>
              <li>ציתות לקווי תקשורת</li>
              <li>התחזות לאתר Uxellent</li>
              <li>הונאות מקוונות</li>
            </ul>
            <p>
              אנחנו משקיעים מאמצים רבים בהגנה מפני סיכונים אלה, אך לא ניתן לחסימה מוחלטת.
            </p>
            <p>Uxellent לא תהיה אחראית לכל נזק הנובע מהתממשות סיכונים אלה, לרבות:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>גילוי או שיבוש מידע</li>
              <li>פעולות לא מורשות</li>
              <li>שיבושים בפעולת המערכת</li>
              <li>אי ביצוע, ביצוע שגוי או ביצוע באיחור של הוראה</li>
              <li>חשיפת תוכן חשבונך כתוצאה מחדירה לא מורשית</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.10 פטור מאחריות לגורמים שאינם בשליטתנו</h3>
            <p>Uxellent תהא פטורה מאחריות לנזק, הפסד או הוצאה הנובעים מגורמים שאינם בשליטתנו, לרבות:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>שיבושים בקווי תקשורת</li>
              <li>תקלות אצל ספקי שירותי ענן או אחסון</li>
              <li>תפקוד לקוי של תוכנה או חומרה אצלך או אצל צד שלישי</li>
              <li>חשיפת מידע עקב מסירת פרטים לא מדויקים על ידך</li>
              <li>העברת המכשיר שלך לאחר (לתיקון או צפייה)</li>
            </ul>
            <p>בתנאי ש-Uxellent עשתה מאמץ סביר למנוע גורמים אלה.</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.11 קישורים לאתרים חיצוניים</h3>
            <p>
              המערכת עשויה לכלול קישורים (Hyperlinks) לאתרים בניהול צדדים שלישיים.
            </p>
            <p><strong>חשוב לדעת:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>הקישורים מוצגים לנוחיותך בלבד</li>
              <li>Uxellent לא בחנה את האתרים הללו ואינה אחראית להם</li>
              <li>גלישה, שימוש או מסירת מידע לאתרים אלה היא באחריותך המלאה</li>
              <li>בדוק תמיד את כתובת ה-URL לפני לחיצה על קישור</li>
            </ul>
            <p>
              אם מצאת באתר חיצוני תוכן בעייתי, אנא הודע לנו ב-<a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">9. שיפוי</h2>
            <p>
              אתה מתחייב לשפות את Uxellent, עובדיה, מנהליה ונושאי המשרה בה, מכל תביעה, דרישה, הפסד, נזק או הוצאה (לרבות שכר טרחת עורך דין) הנובעים מ:
            </p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>הפרת תנאי שימוש אלה על ידך</li>
              <li>הפרת זכויות צד שלישי על ידך</li>
              <li>תוכן שהעלת או מסמכים שיצרת במערכת</li>
              <li>כל שימוש בלתי חוקי או בלתי מורשה שביצעת</li>
            </ul>
            <p>תוך 30 יום ממועד קבלת דרישת Uxellent בכתב.</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">10. ערוצי תוכן</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.1 מהם ערוצי התוכן</h3>
            <p>Uxellent מפעילה ערוצי תוכן שונים, לרבות:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>בלוג ומאמרים באתר uxellent.com</li>
              <li>פוסטים ברשתות חברתיות (פייסבוק, אינסטגרם, לינקדאין, TikTok)</li>
              <li>סרטוני הדרכה וחומרי לימוד</li>
            </ul>
            <p>ערוצי התוכן והתכנים המפורסמים בהם יכונו להלן: "ערוצי התוכן" ו-"התכנים".</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.2 הסכמה לתנאים</h3>
            <p>
              צפייה, קריאה או שימוש בערוצי התוכן מהווים הסכמה לתנאי שימוש אלה ולתנאי השימוש של הפלטפורמות בהן מתפרסמים התכנים (למשל: תנאי פייסבוק, תנאי אינסטגרם).
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.3 השימוש המותר בתכנים</h3>
            <p>אתה רשאי לצפות, לקרוא ולהאזין לתכנים.</p>
            <p><strong>אסור לך:</strong></p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>להעתיק, לשכפל או להפיץ את התכנים</li>
              <li>להשתמש בתכנים למטרות מסחריות</li>
              <li>לערוך או לשנות את התכנים</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.4 התכנים אינם המלצה מקצועית</h3>
            <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 my-4">
              <p className="font-semibold text-yellow-800">חשוב להבין:</p>
              <p className="text-yellow-800">
                התכנים בערוצי התוכן אינם מהווים המלצה או עצה מקצועית לביצוע פעולה מכל סוג שהוא (כלכלית, פיננסית, משפטית או אחרת).
              </p>
              <p className="text-yellow-800 mt-2">
                אין בתכנים כדי להחליף את שיקול דעתך העצמאי או ייעוץ מקצועי.
              </p>
            </div>
            <p>
              כל שימוש במידע מהתכנים הוא על אחריותך הבלעדית. Uxellent לא תהיה אחראית לכל הפסד או נזק הנובע מהסתמכות על התכנים.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.5 הצעות למשתמש לתכנים</h3>
            <p>
              אתה מוזמן להציע נושאים ורעיונות לתכנים בדוא"ל <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a>.
            </p>
            <p>אם תשלח הצעה:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>Uxellent רשאית להשתמש בהצעתך ללא תמורה</li>
              <li>כל תוצר שייווצר מההצעה הוא קניינה הבלעדי של Uxellent</li>
              <li>לא תהיה לך זכות בקניין הרוחני או בתוצר</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.6 העלאת תכנים על ידי משתמשים</h3>
            <p>ככל ש-Uxellent תאפשר למשתמשים להעלות תכנים לערוצי התוכן, אתה מצהיר ומתחייב:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>אתה היוצר והבעלים של התוכן</li>
              <li>אין לאחר זכויות בתוכן</li>
              <li>התוכן אינו מפר זכויות צד שלישי</li>
              <li>אתה נותן ל-Uxellent רישיון בלתי מוגבל להשתמש בתוכן (זמן, מקום, אמצעים)</li>
              <li>לא תהיה זכאי לתמורה כספית</li>
              <li>לא תהיה לך טענה כלפי Uxellent בקשר לשימוש בתוכן</li>
              <li>Uxellent לא תהיה אחראית לשימוש שיעשה בתוכן על ידי צדדים שלישיים</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.7 זכותנו להסיר תכנים</h3>
            <p>
              Uxellent רשאית להסיר כל תוכן שפורסם על ידך או להפסיק את גישתך לערוצי התוכן, לפי שיקול דעתה הבלעדי, ללא הודעה מוקדמת.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">11. שינויים בתנאי השימוש</h2>
            <p>
              Uxellent רשאית לשנות תנאי שימוש אלה בכל עת.
            </p>
            <p>
              שינויים מהותיים יפורסמו במערכת ו/או בדוא"ל לפחות 30 יום מראש.
            </p>
            <p>
              המשך שימוש בשירותים לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים.
            </p>
            <p>
              אם אינך מסכים לשינויים, עליך להפסיק את השימוש בשירותים ולבטל את המנוי.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">12. הוראות כלליות</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.1 הסכם שלם</h3>
            <p>
              תנאי שימוש אלה (יחד עם מדיניות הפרטיות) מהווים את ההסכם השלם בינך לבין Uxellent.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.2 ויתור על זכות</h3>
            <p>
              אי אכיפת זכות או הוראה מתנאי שימוש אלה לא תהווה ויתור על אותה זכות או הוראה.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.3 פרשנות</h3>
            <p>
              אם הוראה כלשהי בתנאי שימוש אלה תימצא בלתי חוקית או בלתי אכיפה, שאר ההוראות ימשיכו לחול במלואן.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.4 העברת זכויות</h3>
            <p>
              אתה לא רשאי להעביר את זכויותיך או חובותיך לפי הסכם זה ללא הסכמתנו בכתב.
            </p>
            <p>
              Uxellent רשאית להעביר זכויותיה וחובותיה לצד שלישי בכל עת, בכפוף לכך שהצד השלישי יקבל על עצמו את התחייבויות Uxellent כלפיך.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.5 סיום ההסכם</h3>
            <p>Uxellent רשאית לסיים הסכם זה:</p>
            <ul className="list-disc mr-6 my-3 space-y-1">
              <li>בכל עת, בהודעה של 30 יום מראש</li>
              <li>באופן מידי, עקב הפרת תנאי השימוש על ידך (ללא הודעה מוקדמת)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">13. סמכות שיפוט ודין חל</h2>
            
            <h3 className="text-[20px] font-semibold mb-3 mt-6">13.1 דין ישראלי</h3>
            <p>
              תנאי שימוש אלה יפורשו ויוחלו בהתאם לחוקי מדינת ישראל בלבד.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">13.2 סמכות שיפוט</h3>
            <p>
              סמכות השיפוט הבלעדית והייחודית בכל סכסוך הנובע מתנאי שימוש אלה תהיה לבתי המשפט המוסמכים בתל אביב–יפו, ישראל.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">14. צור קשר</h2>
            <p className="mb-4">
              יש לך שאלות על תנאי השימוש? רוצה לבטל מנוי או לקבל תמיכה?
            </p>
            <div className="bg-white p-6 rounded-lg">
              <p><strong>דוא"ל:</strong> <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></p>
              <p><strong>WhatsApp:</strong> 0545215193</p>
              <p><strong>שם החברה:</strong> Bugo Media Ltd</p>
              <p><strong>מספר חברה:</strong> 515960508</p>
            </div>
          </section>
        </LegalTemplate>
      </main>

      <SiteFooter />
    </div>
  )
}