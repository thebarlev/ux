"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { EnLink } from "./EnLink"

const DEV_DROPDOWN = [
  { href: "/en/develop", label: "Web Development" },
  { href: "/en/develop-ai", label: "Software Development" },
] as const

const MARKETING_DROPDOWN = [
  { href: "/en/marketing/ppc", label: "PPC Marketing" },
  { href: "/en/seo-ai", label: "Google & AI Search Optimization" },
] as const

const MOBILE_SECTIONS = [
  {
    title: "Uxellent Services",
    items: [
      { href: "/en/design", label: "Design & Branding" },
      { href: "/en/idea-to-product", label: "Idea to Product" },
      { href: "/en/develop", label: "Web Development" },
      { href: "/en/develop-ai", label: "Software Development" },
      { href: "/en/pricing", label: "Pricing" },
      { href: "/en/marketing/ppc", label: "PPC Marketing" },
      { href: "/en/seo-ai", label: "Google & AI Search Optimization" },
      { href: "/en/portfolio", label: "Portfolio" },
    ],
  },
  {
    title: "Uxellent Products",
    items: [
      { href: "/en/account-ai", label: "AI Accountant" },
      { href: "/en/invoice", label: "Digital Invoice" },
      { href: "/en/seo-ai", label: "Google & AI Search Optimization" },
    ],
  },
] as const

export function HeaderEN() {
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
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 bg-[#F4F1EC]"
        dir="ltr"
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-4">
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="flex flex-row items-center justify-between gap-3 py-4 lg:py-6"
          >
            <EnLink
              href="/en"
              className="flex items-center lg:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)] rounded-md shrink-0"
              aria-label="Uxellent - Back to home"
            >
              <Image
                src="/logo.svg"
                alt="Uxellent logo - digital marketing, SEO AI and website development"
                width={150}
                height={46}
                priority
                className={[
                  "h-auto w-[149px] transition-transform duration-300 ease-in-out origin-left",
                  scrolled ? "sm:scale-100 scale-[0.8]" : "scale-100",
                ].join(" ")}
              />
            </EnLink>

            <div className="hidden sm:flex items-center bg-white/90 backdrop-blur-sm shadow-[0_1px_6px_rgba(0,0,0,0.06)] border border-gray-100 rounded-2xl px-3 py-2 gap-2">
              <span className="text-left w-[140px] shrink-0 leading-[1.3]" style={{ fontSize: "16px" }}>
              Google & AI Search Optimization
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <a href="https://app.uxellent.com/en/auditor/register" className="vow-btn-primary !h-[44px]">
                  Sign up
                </a>
                <a href="https://app.uxellent.com/en/auditor/login" className="vow-btn-secondary !h-[44px]">
                  Log in
                </a>
              </div>
            </div>

            <ul className="hidden md:flex flex-nowrap items-center gap-1">
              <li>
                <EnLink
                  href="/en/contact"
                  className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline"
                >
                  Contact
                </EnLink>
              </li>
              <li className="relative group">
                <button
                  type="button"
                  dir="ltr"
                  className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline inline-flex items-center gap-1 "
                  aria-haspopup="menu"
                >
                  Development
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-[2px]">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div dir="ltr" className="pointer-events-none absolute left-0 top-full z-50 mt-0 w-[220px] rounded-xl border border-black/10 bg-white shadow-lg opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                  <ul role="menu" className="py-2 text-left items-start">
                    {DEV_DROPDOWN.map((item) => (
                      <li key={item.href} role="none">
                        <EnLink
                          role="menuitem"
                          href={item.href}
                          className="block px-4 py-2 text-[16px] font-semibold text-black hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)] rounded-md mx-2 text-left items-start"
                        >
                          {item.label}
                        </EnLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="relative group">
                <button
                  type="button"
                  dir="ltr"
                  className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline inline-flex items-center gap-1  "
                  aria-haspopup="menu"
                >
                  Marketing
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-[2px]">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div dir="ltr" className="pointer-events-none absolute left-0 top-full z-50 mt-0 w-[240px] rounded-xl border border-black/10 bg-white shadow-lg opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                  <ul role="menu" className="py-2 text-left" dir="ltr">
                    {MARKETING_DROPDOWN.map((item) => (
                      <li key={item.href} role="none">
                        <EnLink
                          role="menuitem"
                          href={item.href}
                          className="block px-4 py-2 text-[16px] font-semibold text-black hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)] rounded-md mx-2 text-left items-start"
                        >
                          {item.label}
                        </EnLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <EnLink
                  href="/en/design"
                  className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline "
                >
                  Design
                </EnLink>
              </li>
              <li className="hidden md:flex md:items-center">
                <EnLink
                  href="/en/idea-to-product"
                  className="link-standard text-[18px] leading-normal px-3 py-2 hover:text-[#5389BB] transition-colors no-underline hover:underline"
                >
                  Idea to Product
                </EnLink>
              </li>
            </ul>



            <div className="md:hidden flex items-center">
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-8 w-10 items-center justify-center rounded-md transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vow-accent)]"
              >
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
            </div>
          </nav>
        </div>
      </header>

      <div style={{ height: headerHeight }} aria-hidden="true" />

      {menuOpen && (
        <div
          dir="ltr"
          className="sm:hidden fixed left-0 right-0 bottom-0 z-40 bg-white flex flex-col"
          style={{ top: headerHeight }}
        >
          <div className="flex flex-col flex-1 overflow-y-auto px-6 py-6 gap-8 text-left">
            {MOBILE_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-[14px] font-semibold text-[#A1A1A1] mb-1 tracking-wide">
                  {section.title}
                </p>
                <ul className="flex flex-col">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <EnLink
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block text-[19px] text-left font-normal leading-normal py-[7px] text-black hover:text-[#5389BB] transition-colors no-underline"
                      >
                        {item.label}
                      </EnLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="px-4 py-4 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex flex-row items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2">
              <div className="flex items-center gap-2">
              <span className="text-left max-w-[140px]" style={{ fontSize: "16px", lineHeight: "20px" }}>
              Search Performance Optimization
              </span>
                <a href="https://app.uxellent.com/en/auditor/register" className="vow-btn-primary !h-[44px]">
                  Sign up
                </a>
                <a href="https://app.uxellent.com/en/auditor/login" className="vow-btn-secondary !h-[44px]">
                  Log in
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
