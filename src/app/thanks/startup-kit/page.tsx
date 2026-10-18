import type { Metadata } from "next"

import { STARTUP_KIT_URL } from "@/app/_components/new-home/homeSections.constants"
import { StatusPage } from "@/app/_components/redesign/StatusPage"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  title: "תוכנית העבודה ליזם · Uxellent",
  description:
    "תוכנית העבודה ליזם מוכנה להורדה, יחד עם שלושת הצעדים הבאים.",
  // Reached only after a form submit, and it is the URL-based conversion point
  // for the workbook download (brief §5א.4) — it must stay out of the index.
  robots: { index: false, follow: false },
}

const STEPS = [
  "עוברים על צ'קליסט 27 הנקודות ומסמנים רק מה שיש עליו תשובה כתובה.",
  "ממלאים את תבנית האפיון בעמוד אחד. שדה שנשאר ריק הוא לא כישלון, הוא רשימת המשימות שלכם.",
  "מילאתם ולא בטוחים? שלחו לנו את התבנית במייל ונחזיר תשובה כתובה, בלי עלות ובלי שיחת מכירה.",
] as const

/**
 * Where the workbook download actually happens. The home page only ever links
 * to #contact, so the PDF stays behind the form (brief §5א.3).
 */
export default function StartupKitThanksPage() {
  return (
    <StatusPage
      eyebrow="קיבלנו את הפרטים"
      title={["מעולה,", "תוכנית העבודה שלך מוכנה"]}
      lede="אפשר להוריד את הקובץ עכשיו ולהתחיל לעבוד."
      primary={{ label: "להורדת תוכנית העבודה (PDF)", href: STARTUP_KIT_URL, download: true }}
      secondary={{ label: "קבעו שיחת היכרות קצרה", href: "/#contact" }}
      note={
        <>
          משהו לא עבד? כתבו לנו ל-
          <a href="mailto:support@uxellent.com">
            <span dir="ltr" style={{ unicodeBidi: "isolate", whiteSpace: "nowrap" }}>
              support@uxellent.com
            </span>
          </a>{" "}
          ונשלח לכם את הקובץ ישירות.
        </>
      }
      stepsTitle="מה עושים עם זה עכשיו"
      steps={STEPS}
    />
  )
}
