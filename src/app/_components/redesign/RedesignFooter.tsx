import Link from "next/link"
import Image from "next/image"
import styles from "./redesign.module.css"

type FooterItem = { label: string; href: string; pending?: boolean }

const F1_PRODUCT: FooterItem[] = [
  { label: "מוצרים", href: "/products" },
  { label: "איך זה עובד", href: "/how-it-works" },
  { label: "מה כלול", href: "/included" },
  { label: "מחירים", href: "/pricing" },
  { label: "הפלטפורמה", href: "https://uxellent.site" },
]

const F2_COMPANY: FooterItem[] = [
  { label: "אודות", href: "/about" },
  { label: "יצירת קשר", href: "/contact" },
  { label: "מדריכי צמיחה", href: "/growth-guides" },
  { label: "בלוג", href: "/blog" },
  { label: "קידום בגוגל וב-AI", href: "/growth-guides" },
]

/** Pending items stay non-links ("בהכנה") exactly as approved — even where a
 *  same-titled page already exists elsewhere on the site (see agent5-brief.md). */
const F3_LEGAL: FooterItem[] = [
  { label: "תנאי שימוש", href: "/terms", pending: true },
  { label: "מדיניות פרטיות", href: "/privacy", pending: true },
  { label: "נספח עיבוד מידע (DPA)", href: "/dpa", pending: true },
  { label: "מדיניות שימוש מקובל", href: "/aup", pending: true },
  { label: "רשימת ספקי משנה", href: "/subprocessors", pending: true },
  { label: "ביטול והחזרים", href: "/refunds", pending: true },
  { label: "מדיניות עוגיות", href: "/cookies", pending: true },
  { label: "הצהרת נגישות", href: "/accessibility", pending: true },
  { label: "מחיקת חשבון", href: "/account-deletion" },
]

function FooterColumn({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div className={styles.fcol}>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            {item.pending ? (
              <span className={styles.pend}>
                {item.label}
                <span className={styles.soon}>בהכנה</span>
              </span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RedesignFooter() {
  return (
    <footer className={styles.ftr} dir="rtl">
      <div className={styles.wrap}>
        <div className={styles.ftrTop}>
          <div>
            <Link className={styles.brand} href="/" aria-label="Uxellent">
              <Image src="/footer-logo.svg" alt="Uxellent" width={150} height={47} />
            </Link>
            <p className={styles.blurb}>אתרי תדמית בעברית לבעלי מקצוע חופשי. תיאור אחד, ואתר מלא באוויר.</p>
            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`} href="https://uxellent.site">
              התחילו לבנות
            </a>
          </div>
          <FooterColumn title="המוצר" items={F1_PRODUCT} />
          <FooterColumn title="החברה" items={F2_COMPANY} />
          <FooterColumn title="משפטי ותקנון" items={F3_LEGAL} />
        </div>
        <p className={styles.a11yStrip}>
          <b>נגישות:</b> הצהרה זו חלה על <b>אתר זה בלבד</b>. נתקלתם בבעיית נגישות כאן? כתבו לנו ונטפל בה.
          אתרים שנבנו במערכת ופורסמו על ידי לקוחות הם באחריות בעליהם.
        </p>
        <div className={styles.ftrBot}>
          <span>© {new Date().getFullYear()} Uxellent. כל הזכויות שמורות.</span>
        </div>
      </div>
    </footer>
  )
}
