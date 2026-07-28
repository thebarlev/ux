"use client"

/**
 * SiteHeader — ההאדר המאוחד של uxellent.com. קומפוננטה אחת לכל העמודים.
 *
 * מבוסס מבנה-במבנה על NewHomeHeader הקנוני של עמוד הבית (main), עם שני שינויים:
 * 1. variant אוטומטי לפי המסלול: "dark" בעמוד הבית (רקע כהה אחיד שמתמזג עם ההירו),
 *    "light" בכל שאר העמודים (sticky על משטח קרם עם קו תחתון עדין).
 * 2. הלוגו — הקבצים המתוקנים בלבד: /white.svg על כהה, /black.svg על בהיר
 *    (הקבצים הישנים logo.svg / footer-logo.svg כתובים "UXellet" — לא להשתמש).
 *
 * הניווט וה-CTA מגיעים אך ורק מ-nav.config.ts — מקור אמת אחד.
 * מיקום: src/app/_components/layout/SiteHeader.tsx (+ SiteHeader.module.css, nav.config.ts לצידו).
 */

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"

import { NAV_LINKS, HEADER_CTA, HEADERLESS_PATTERNS } from "./nav.config"
import styles from "./SiteHeader.module.css"

/** יחס הלוגואים החדשים: viewBox 1100×342 → בגובה 34px הרוחב הוא 109px. */
const LOGO = { width: 109, height: 34 }

export function SiteHeader() {
  const pathname = usePathname() ?? "/"
  const [menuOpen, setMenuOpen] = useState(false)

  // עמודים בלי האדר גלובלי (קמפיינים, תשלום, עמודי הצלחה, אנגלית בשלב 1).
  if (HEADERLESS_PATTERNS.some((re) => re.test(pathname))) return null

  const dark = pathname === "/"
  const variant = dark ? styles.dark : styles.light

  return (
    <>
      <header className={`${styles.header} ${variant}`} dir="rtl">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label="Uxellent - חזרה לעמוד הבית">
            <Image
              src={dark ? "/white.svg" : "/black.svg"}
              alt="Uxellent"
              width={LOGO.width}
              height={LOGO.height}
              priority={dark}
            />
          </Link>

          <nav className={styles.nav} aria-label="ניווט ראשי">
            {NAV_LINKS.map((item) =>
              "children" in item ? (
                <div key={item.label} className={styles.navGroup}>
                  <button type="button" className={styles.navLink} aria-haspopup="menu">
                    {item.label}
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className={styles.dropdown}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className={styles.dropItem}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className={styles.hdrCta}>
            <a href={HEADER_CTA.login.href} className={`${styles.pill} ${styles.pillGhost}`}>
              {HEADER_CTA.login.label}
            </a>
            <a href={HEADER_CTA.register.href} className={`${styles.pill} ${styles.pillSolid}`}>
              {HEADER_CTA.register.label}
            </a>
            <button
              type="button"
              className={styles.burger}
              aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div className={styles.mobileMenu}>
              {NAV_LINKS.map((item) =>
                "children" in item ? (
                  item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={styles.mobileLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div className={styles.mobileCta}>
                <a href={HEADER_CTA.login.href} className={`${styles.pill} ${styles.pillGhost}`}>
                  {HEADER_CTA.login.label}
                </a>
                <a href={HEADER_CTA.register.href} className={`${styles.pill} ${styles.pillSolid}`}>
                  {HEADER_CTA.register.label}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      {!dark && <div className={styles.heroGap} aria-hidden="true" />}
    </>
  )
}
