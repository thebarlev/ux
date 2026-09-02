"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import styles from "./redesign.module.css"

const NAV_LINKS = [
  { href: "/why-us", label: "למה אנחנו" },
  { href: "/pricing", label: "מחירים" },
  { href: "/how-it-works", label: "איך זה עובד" },
  { href: "/blog", label: "מאמרים" },
  { href: "/#faq", label: "שאלות" },
] as const

const MOBILE_LINKS = [
  { href: "/why-us", label: "למה אנחנו" },
  { href: "/products", label: "מוצרים" },
  { href: "/pricing", label: "מחירים" },
  { href: "/how-it-works", label: "איך זה עובד" },
  { href: "/included", label: "מה כלול" },
  { href: "/blog", label: "מאמרים" },
  { href: "/#faq", label: "שאלות נפוצות" },
] as const

export function RedesignHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={styles.hdr} dir="rtl">
      <div className={styles.wrap}>
        <Link className={styles.brand} href="/" aria-label="Uxellent">
          <Image src="/logo.svg" alt="Uxellent" width={150} height={47} priority />
        </Link>
        <nav className={styles.nav} aria-label="ראשי">
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
