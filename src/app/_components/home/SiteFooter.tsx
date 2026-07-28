import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import { growthGuideFooterLinksHe } from "@/lib/growth-guides/topics"

const LEGAL_LINKS = [
  { href: "/terms", label: "תנאים משפטיים" },
  { href: "/privacy", label: "פרטיות" },
  { href: "/account-deletion", label: "מחיקת חשבון" },
  { href: "/accessibility", label: "נגישות" },
] as const

const PRODUCTS_LINKS = [
  { href: "/seo-ai", label: "קידום עסקים במנועי AI" },
  { href: "/account-ai", label: "רואה חשבון AI" },
  { href: "/invoice", label: "חשבונית דיגיטלית מאובטחת" },
] as const

const PAGES_LINKS = [
  { href: "/idea-to-product", label: "מרעיון למוצר" },
  { href: "/design", label: "עיצוב ומיתוג" },
  { href: "/develop", label: "פיתוח אתריםד מבוסס AI" },
  { href: "/develop-ai", label: "פיתוח תוכנה מבוסס AI" },
  { href: "/marketing/ppc", label: "שיווק PPC" },
  { href: "/portfolio", label: "פרויקטים נבחרים" },
] as const

const VOW_LINKS = [
  { href: "/blog", label: "בלוג" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "יצירת קשר" },
] as const

const GROWTH_GUIDE_LINKS = growthGuideFooterLinksHe

type FooterColumn = {
  title: string
  items: readonly { href: string; label: string }[]
}

const FOOTER_COLUMNS: readonly FooterColumn[] = [
  { title: "חשוב לדעת", items: LEGAL_LINKS },
  { title: "שירותים של Uxellent", items: PAGES_LINKS },
  { title: "מוצרים של Uxellent", items: PRODUCTS_LINKS },
  { title: "מדריכי צמיחה", items: GROWTH_GUIDE_LINKS },
  { title: "Uxellent", items: VOW_LINKS },
] as const

/**
 * Background tone. "black" is the site-wide default and the only tone any live
 * page uses. "ink" matches the dark ink used by /new-home's hero and service
 * section, so the footer continues that section instead of stepping to black.
 */
export type SiteFooterTone = "black" | "ink"

/** Same value as --ink2 in the /new-home dark sections — the colour their
 *  background gradient resolves to at its bottom edge. */
const INK_TONE = "#0d1526"

export function SiteFooter({ tone = "black" }: { tone?: SiteFooterTone } = {}) {
  const isInk = tone === "ink"
  return (
    <footer
      role="contentinfo"
      className={isInk ? undefined : "bg-black"}
      style={isInk ? { backgroundColor: INK_TONE } : undefined}
      dir="rtl"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 gap-x-9 gap-y-10 md:grid-cols-6 md:gap-x-10">

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="text-right">
              <p className="text-[18px] font-semibold text-[#A1A1A1] mb-4 leading-[1.1] sm:leading-[1.3]">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="leading-[1.2] text-[18px] font-normal text-white hover:text-white underline-offset-4 hover:underline transition-colors "
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Logo */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-2 md:items-end">
            <Image
              src="/footer-logo.svg"
              alt="Uxellent logo - digital marketing, SEO AI and website development"
              width={80}
              height={25}
              className="h-auto w-[150px]"
            />
            <p className="text-[14px] text-white pl-6">For success</p>
          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

          <div className="flex items-center gap-5 justify-end sm:justify-start">
            <Link
              href="/contact"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="יצירת קשר"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <a
              href="https://www.instagram.com/uxellent.il"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/Vowsuccess"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61587713103366"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          {/* The only language switch on the site now that the top bar is gone.
              Hebrew leads, so this stays deliberately quiet. */}
          <div className="flex items-center gap-4 text-[13px] text-white/50">
            <Link
              href="/en"
              hrefLang="en"
              lang="en"
              dir="ltr"
              className="hover:text-white transition-colors"
            >
              English
            </Link>
            <p className="text-right sm:text-left">
              © {new Date().getFullYear()} Uxellent
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}