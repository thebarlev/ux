"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { NH_HEADER_CTA, NH_NAV_LINKS } from "./newHome.constants"
import styles from "./NewHero.module.css"

/**
 * Dark header dedicated to the new-home page. Same links and structure as the
 * shared SiteHeader (which is deliberately left untouched), restyled for the
 * dark hero with the light logo (footer-logo.svg). Static within the dark hero,
 * matching the approved reference.
 */
export function NewHomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.nhHeader} dir="rtl">
      <Link href="/" className={styles.nhLogo} aria-label="Uxellent - חזרה לעמוד הבית">
        {/* 135x42 keeps the new logo's 1100:342 ratio; the previous mark was
            135x36 and a mismatch here would letterbox it inside the box. */}
        <Image src="/footer-logo.svg" alt="Uxellent" width={135} height={42} priority />
      </Link>

      <nav className={styles.nhNav} aria-label="ניווט ראשי">
        {NH_NAV_LINKS.map((item) =>
          "children" in item ? (
            <div key={item.label} className={styles.nhNavGroup}>
              <button type="button" className={styles.nhNavLink} aria-haspopup="menu">
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
              <div className={styles.nhDropdown}>
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href} className={styles.nhDropItem}>
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.href} href={item.href} className={styles.nhNavLink}>
              {item.label}
            </Link>
          ),
        )}
      </nav>

      <div className={styles.nhHdrCta}>
        <a href={NH_HEADER_CTA.login.href} className={`${styles.nhPill} ${styles.nhPillGhost}`}>
          {NH_HEADER_CTA.login.label}
        </a>
        <a href={NH_HEADER_CTA.register.href} className={`${styles.nhPill} ${styles.nhPillSolid}`}>
          {NH_HEADER_CTA.register.label}
        </a>
        <button
          type="button"
          className={styles.nhBurger}
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
        <div className={styles.nhMobileMenu}>
          {NH_NAV_LINKS.map((item) =>
            "children" in item ? (
              item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={styles.nhMobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {child.label}
                </Link>
              ))
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={styles.nhMobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <div className={styles.nhMobileCta}>
            <a href={NH_HEADER_CTA.login.href} className={`${styles.nhPill} ${styles.nhPillGhost}`}>
              {NH_HEADER_CTA.login.label}
            </a>
            <a href={NH_HEADER_CTA.register.href} className={`${styles.nhPill} ${styles.nhPillSolid}`}>
              {NH_HEADER_CTA.register.label}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
