import type { Metadata } from "next"
import Link from "next/link"

import { STARTUP_KIT_URL } from "@/app/_components/new-home/homeSections.constants"

import styles from "./page.module.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  title: "תוכנית העבודה ליזם · Uxellent",
  description:
    "תוכנית העבודה ליזם מוכנה להורדה, יחד עם שלושת הצעדים הבאים.",
  // Reached only after a form submit, and it is the URL-based conversion point
  // for the workbook download (brief §5א.4) — it must stay out of the index.
  robots: { index: false, follow: false },
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
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
    <div className={styles.page} dir="rtl">
      <div className={styles.top}>
        <Link href="/">→ חזרה לאתר Uxellent</Link>
      </div>

      <main className={styles.main} id="main" role="main">
        <div className={styles.card}>
          <div className={styles.check} aria-hidden="true">
            ✓
          </div>
          <h1 className={styles.heading}>מעולה, תוכנית העבודה שלך מוכנה</h1>
          <p className={styles.sub}>
            קיבלנו את הפרטים. אפשר להוריד את הקובץ עכשיו ולהתחיל לעבוד.
          </p>

          <a className={styles.dlBtn} href={STARTUP_KIT_URL} download>
            <DownloadIcon />
            להורדת תוכנית העבודה (PDF)
          </a>
          <p className={styles.dlNote}>
            {/* support@, not the itzik@ address the reference spec used: the
                lead routing moved off Zoho, so that mailbox is no longer the
                one being watched. */}
            משהו לא עבד? כתבו לנו ל-
            <a href="mailto:support@uxellent.com">
              <span
                dir="ltr"
                style={{ unicodeBidi: "isolate", whiteSpace: "nowrap" }}
              >
                support@uxellent.com
              </span>
            </a>{" "}
            ונשלח לכם את הקובץ ישירות.
          </p>

          <div className={styles.next}>
            <h2 className={styles.nextHeading}>מה עושים עם זה עכשיו</h2>
            {STEPS.map((step, index) => (
              <div key={step} className={styles.step}>
                <span className={styles.n} aria-hidden="true">
                  {index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <p className={styles.ctaLine}>
            רוצים לעבור על זה יחד בשיחה?{" "}
            <Link href="/#contact">קבעו שיחת היכרות קצרה</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
