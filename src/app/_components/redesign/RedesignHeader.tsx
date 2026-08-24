"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import styles from "./redesign.module.css"

const PRODUCT_MENU_ITEMS = [
  { href: "/#build", label: "בניית אתרים ב-AI", desc: "אתר תדמית מלא בעברית, בדקות" },
  { href: "/#build", label: "חידוש אתר קיים", desc: "אותה כתובת בגוגל, עיצוב חדש" },
  { href: "/#build", label: "עמוד נחיתה לקמפיין", desc: "מטרה אחת, בלי תפריט ובלי הסחות" },
  { href: "/#included", label: "מבנה נכון לגוגל", desc: "כותרות, כתובות ומהירות, כבר מהבסיס" },
  { href: "/#help", label: "עריכה בשיחה", desc: "כותבים בעברית, האתר משתנה" },
] as const

const NAV_LINKS = [
  { href: "/pricing", label: "מחירים" },
  { href: "/how-it-works", label: "איך זה עובד" },
  { href: "/blog", label: "מאמרים" },
  { href: "/#faq", label: "שאלות" },
] as const

const MOBILE_LINKS = [
  { href: "/products", label: "מוצרים" },
  { href: "/pricing", label: "מחירים" },
  { href: "/how-it-works", label: "איך זה עובד" },
  { href: "/included", label: "מה כלול" },
  { href: "/blog", label: "מאמרים" },
  { href: "/#faq", label: "שאלות נפוצות" },
] as const

export function RedesignHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={styles.hdr} dir="rtl">
      <div className={styles.wrap}>
        <Link className={styles.brand} href="/" aria-label="Uxellent">
          <Image src="/logo.svg" alt="Uxellent" width={150} height={47} priority />
        </Link>
        <nav className={styles.nav} aria-label="ראשי">
          <div className={styles.hasMenu}>
            <button
              type="button"
              className={`${styles.navBtn} ${productsOpen ? styles.navBtnOpen : ""}`}
              aria-expanded={productsOpen}
              aria-controls="prodMenu"
              onClick={() => setProductsOpen((v) => !v)}
            >
              מוצרים
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 7.5L10 12.5L15 7.5" />
              </svg>
            </button>
            <div
              className={styles.menu}
              id="prodMenu"
              hidden={!productsOpen}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <Link className={styles.menuAll} href="/products" onClick={() => setProductsOpen(false)}>
                <span className={styles.mi}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" />
                    <rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" />
                  </svg>
                </span>
                <b>כל המוצרים</b><span>עמוד אחד עם הכל</span>
              </Link>
              {PRODUCT_MENU_ITEMS.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setProductsOpen(false)}>
                  <span className={styles.mi}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </span>
                  <b>{item.label}</b><span>{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? styles.navActive : undefined}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className={styles.hdrEnd}>
          <a className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`} href="https://uxellent.site">
            התחילו בחינם
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </span>
      </div>
      <div className={`${styles.mnav} ${menuOpen ? styles.mnavOn : ""}`}>
        {MOBILE_LINKS.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
