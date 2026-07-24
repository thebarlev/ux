"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

/** Auditor "website scan" entry point, with campaign tracking. */
const AUDITOR_SCAN_URL =
  "https://app.uxellent.com/auditor?link_id=a_basic&utm_source=website&utm_medium=cta&utm_campaign=auditor_pricing"

/** Auth pages go straight to the app root, not the auditor sub-paths. */
const APP_LOGIN_URL = "https://app.uxellent.com/login"
const APP_REGISTER_URL = "https://app.uxellent.com/register"

const HEADER_DEV_DROPDOWN = [
  { href: "/develop", label: "פיתוח אתרים בסביבת AI" },
  { href: "/develop-ai", label: "פיתוח תוכנה בסביבת AI" },
] as const

const HEADER_MARKETING_DROPDOWN = [
  { href: "/marketing/ppc", label: "שיווק PPC" },
  { href: "/seo-ai", label: "קידום עסקים בגוגל וב-AI" },
] as const

const MOBILE_MENU_SECTIONS = [
  {
    title: "שירותים של Uxellent",
    items: [
      { href: AUDITOR_SCAN_URL, label: "סריקת אתר" },
      { href: "/idea-to-product", label: "מאיפיון למוצר" },
      { href: "/design", label: "עיצוב ומיתוג" },
      { href: "/develop", label: "פיתוח אתרים מבוסס AI" },
      { href: "/develop-ai", label: "פיתוח תוכנה מבוסס AI" },
      { href: "/pricing", label: "מחירים" },
      { href: "/marketing/ppc", label: "שיווק PPC" },
      { href: "/seo-ai", label: "קידום עסקים בגוגל וב-AI" },
      { href: "/portfolio", label: "פרויקטים נבחרים" },
    ],
  },
  {
    title: "מוצרים של Uxellent",
    items: [
      { href: "/account-ai", label: "רואה חשבון AI" },
      { href: "/invoice", label: "חשבונית דיגיטלית מאובטחת" },
    ],
  },
] as const

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const [headerHeight, setHeaderHeight] = useState(72)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const measureHeaderHeight = () => {
      try {
        if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
      } catch {
        // ignore measurement errors (SSR/hydration edge cases)
      }
    }
    measureHeaderHeight()
    window.addEventListener("resize", measureHeaderHeight)
    return () => window.removeEventListener("resize", measureHeaderHeight)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
  }, [scrolled])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 bg-[#F4F1EC]"
        dir="rtl"
      >
        <a href="#main" className="skip-link">דלג לתוכן</a>
        <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-4">
          <nav
            role="navigation"
            aria-label="ניווט ראשי"
            className="flex flex-row-reverse items-center justify-between gap-3 py-4 lg:py-6"
          >
            <Link
              href="/"
              className="flex items-center lg:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)] rounded-md shrink-0"
              aria-label="Uxellent - חזרה לעמוד הבית"
            >
              <Image
                src="/logo.svg"
                alt="Uxellent logo - digital marketing, SEO AI and website development"
                width={150}
                height={46}
                priority
                className={[
                  "h-auto w-[149px] transition-transform duration-300 ease-in-out origin-right",
                  scrolled ? "sm:scale-100 scale-[0.8]" : "scale-100",
                ].join(" ")}
              />
            </Link>

            <div className="hidden sm:flex items-center bg-white/90 backdrop-blur-sm shadow-[0_1px_6px_rgba(0,0,0,0.06)] border border-gray-100 rounded-2xl px-3 py-2 gap-2">
              <span className="text-right w-[85px] shrink-0 leading-[1.3]" style={{ fontSize: "16px" }}>קידום עסקים בגוגל וב-AI</span>
              <div className="flex items-center gap-2 shrink-0">
                <a href={APP_REGISTER_URL} className="vow-btn-primary !h-[44px]">הצטרפות</a>
                <a href={APP_LOGIN_URL} className="vow-btn-secondary !h-[44px]">התחברות</a>
              </div>
            </div>

            <ul className="flex flex-nowrap items-center gap-1">
              <li className="sm:hidden flex items-center">
                <button type="button" aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="flex h-8 w-10 items-center justify-center rounded-md transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)]">
                  {menuOpen ? (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <line x1="2" y1="2" x2="20" y2="20" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="20" y1="2" x2="2" y2="20" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <line x1="2" y1="5" x2="20" y2="5" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="2" y1="11" x2="20" y2="11" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="2" y1="17" x2="20" y2="17" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </li>
              <li className="hidden md:flex md:items-center">
                <a href={AUDITOR_SCAN_URL} className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline">סריקת אתר</a>
              </li>
              <li className="hidden md:flex md:items-center">
                <Link href="/idea-to-product" className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline">מאיפיון למוצר</Link>
              </li>
              <li className="hidden md:flex md:items-center">
                <Link href="/design" className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline">עיצוב ומיתוג</Link>
              </li>
              <li className="hidden md:flex md:items-center relative group">
                <button type="button" className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline inline-flex items-center gap-1" aria-haspopup="menu">
                  פיתוח AI
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-[2px]">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="pointer-events-none absolute right-0 top-full z-50 mt-0 w-[220px] rounded-xl border border-black/10 bg-white shadow-lg opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                  <ul role="menu" className="py-2 text-right">
                    {HEADER_DEV_DROPDOWN.map((item) => (
                      <li key={item.href} role="none">
                        <Link role="menuitem" href={item.href} className="block px-4 py-2 text-[16px] font-semibold text-black hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)] rounded-md mx-2">{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="hidden md:flex md:items-center relative group">
                <button type="button" className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline inline-flex items-center gap-1" aria-haspopup="menu">
                  שיווק
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-[2px]">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="pointer-events-none absolute right-0 top-full z-50 mt-0 w-[240px] rounded-xl border border-black/10 bg-white shadow-lg opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                  <ul role="menu" className="py-2 text-right">
                    {HEADER_MARKETING_DROPDOWN.map((item) => (
                      <li key={item.href} role="none">
                        <Link role="menuitem" href={item.href} className="block px-4 py-2 text-[16px] font-semibold text-black hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)] rounded-md mx-2">{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="hidden md:flex md:items-center">
                <Link href="/contact" className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline">יצירת קשר</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: headerHeight }} aria-hidden="true" />

      {/* Mobile menu */}
      {menuOpen && (
        <div
          dir="rtl"
          className="sm:hidden fixed left-0 right-0 bottom-0 z-40 bg-white flex flex-col"
          style={{ top: headerHeight }}
        >
          <div className="flex flex-col flex-1 overflow-y-auto px-6 py-6 gap-8 text-right">
            {MOBILE_MENU_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-[14px] font-semibold text-[#A1A1A1] mb-1 tracking-wide">
                  {section.title}
                </p>
                <ul className="flex flex-col">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block text-[19px] font-normal leading-normal py-[10px] text-black hover:text-[#5389BB] transition-colors no-underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="px-4 py-4 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex flex-row-reverse items-center justify-end gap-2 bg-white/90 backdrop-blur-sm px-3 py-2">
              <div className="flex items-center gap-2">
                <a href={APP_REGISTER_URL} className="vow-btn-primary !h-[44px]">הצטרפות</a>
                <a href={APP_LOGIN_URL} className="vow-btn-secondary !h-[44px]">התחברות</a>
              </div>
              <span className="text-right max-w-[120px]" style={{ fontSize: "16px", lineHeight: "20px" }}>
                קידום עסקים בגוגל וב-AI
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}