"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import styles from "./redesign.module.css"
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

export function RedesignHeader({ locale = "he" }: { locale?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = getDictionary(locale).nav
  const prefix = locale === "en" ? "/en" : ""
  const homeHref = locale === "en" ? "/en" : "/"

  const navLinks = [
    { href: `${prefix}/why-us`, label: t.whyUs },
    { href: `${prefix}/pricing`, label: t.pricing },
    { href: `${prefix}/how-it-works`, label: t.howItWorks },
    { href: `${prefix}/blog`, label: t.blog },
    { href: `${homeHref}#faq`, label: t.faq },
  ]
  const mobileLinks = [
    { href: `${prefix}/why-us`, label: t.whyUs },
    { href: `${prefix}/products`, label: t.products },
    { href: `${prefix}/pricing`, label: t.pricing },
    { href: `${prefix}/how-it-works`, label: t.howItWorks },
    { href: `${prefix}/included`, label: t.included },
    { href: `${prefix}/blog`, label: t.blog },
    { href: `${homeHref}#faq`, label: t.faqMobile },
  ]

  return (
    <header className={styles.hdr} dir={locale === "en" ? "ltr" : "rtl"}>
      <div className={styles.wrap}>
        <Link className={styles.brand} href={homeHref} aria-label="Uxellent">
          <Image src="/logo.svg" alt="Uxellent" width={150} height={47} priority />
        </Link>
        <nav className={styles.nav} aria-label={locale === "en" ? "Main" : "ראשי"}>
          {navLinks.map((item) => (
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
            {t.startFree}
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? (locale === "en" ? "Close menu" : "סגור תפריט") : locale === "en" ? "Open menu" : "פתח תפריט"}
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
        {mobileLinks.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
