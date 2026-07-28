"use client"

/**
 * SiteHeader — ההאדר המאוחד של uxellent.com. קומפוננטה אחת לכל העמודים.
 *
 * מבוסס מבנה-במבנה על NewHomeHeader הקנוני של עמוד הבית (main), עם שני שינויים:
 * 1. מצב אחד לכל האתר: פס כהה דביק בכל המסלולים, כולל עמוד הבית.
 * 2. הלוגו — /white.svg בלבד (הקובץ הישן logo.svg כתוב "UXellet" — לא להשתמש).
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

  // One dark header for the whole site. The home page is the only route whose
  // hero already opens dark, so it is also the only one that skips the spacer.
  const isHome = pathname === "/"

  /**
   * Current-page test. External entries (the Auditor scan is an absolute URL)
   * never match, and a nested route counts as being on its parent's page.
   */
  const isCurrent = (href: string) =>
    !href.startsWith("http") &&
    (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <>
      <header className={`${styles.header} ${styles.dark}`} dir="rtl">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label="Uxellent - חזרה לעמוד הבית">
            <Image
              src="/white.svg"
              alt="Uxellent"
              width={LOGO.width}
              height={LOGO.height}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="ניווט ראשי">
            {NAV_LINKS.map((item) =>
              "children" in item ? (
                <div key={item.label} className={styles.navGroup}>
                  <button
                    type="button"
                    className={`${styles.navLink} ${
                      item.children.some((c) => isCurrent(c.href))
                        ? styles.navLinkCurrent
                        : ""
                    }`}
                    aria-haspopup="menu"
                  >
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
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.dropItem}
                        aria-current={isCurrent(child.href) ? "page" : undefined}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${
                    isCurrent(item.href) ? styles.navLinkCurrent : ""
                  }`}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
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
                      aria-current={isCurrent(child.href) ? "page" : undefined}
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
                    aria-current={isCurrent(item.href) ? "page" : undefined}
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
      {!isHome && <div className={styles.heroGap} aria-hidden="true" />}
    </>
  )
}
