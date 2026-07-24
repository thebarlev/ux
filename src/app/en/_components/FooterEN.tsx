import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import { EnLink } from "./EnLink"
import { growthGuideFooterLinks } from "@/lib/growth-guides/topics"

const LEGAL_LINKS = [
  { href: "/en/terms", label: "Terms" },
  { href: "/en/privacy", label: "Privacy" },
  { href: "/en/account-deletion", label: "Account deletion" },
  { href: "/en/accessibility", label: "Accessibility" },
] as const

const PRODUCTS_LINKS = [
  { href: "/en/seo-ai", label: "Google & AI Search Optimization" },
] as const

const SERVICES_LINKS = [
  { href: "/en/design", label: "Design & Branding" },
  { href: "/en/idea-to-product", label: "Idea to Product" },
  { href: "/en/develop", label: "Web Development" },
  { href: "/en/develop-ai", label: "Software Development" },
  { href: "/en/marketing/ppc", label: "PPC Marketing" },
  { href: "/en/portfolio", label: "Portfolio" },
] as const

const VOW_LINKS = [
  { href: "/en/blog", label: "Blog" },
  { href: "/en/about", label: "About" },
  { href: "/en/contact", label: "Contact" },
] as const

const GROWTH_GUIDE_LINKS = growthGuideFooterLinks

type FooterColumn = {
  title: string
  items: readonly { href: string; label: string }[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  { title: "Legal", items: LEGAL_LINKS },
  { title: "Services", items: SERVICES_LINKS },
  { title: "Products", items: PRODUCTS_LINKS },
  { title: "Growth Guides", items: GROWTH_GUIDE_LINKS },
  { title: "Uxellent", items: VOW_LINKS },
]

export function FooterEN() {
  return (
    <footer role="contentinfo" className="bg-black" dir="ltr">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8">
          {/* Left: Navigation columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 md:flex-1">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="text-left" dir="ltr">
                <p className="text-left text-[18px] font-semibold text-[#A1A1A1] mb-4 leading-[20px]">
                  {col.title}
                </p>
                <ul className="flex flex-col items-start space-y-3" dir="ltr">
  {col.items.map((item) => (
    <li key={`${item.href}-${item.label}`} className="w-full">
      <EnLink
        href={item.href}
        className="block text-left leading-[1.1] text-[18px] font-normal text-white hover:text-white underline-offset-4 hover:underline transition-colors"
      >
        {item.label}
      </EnLink>
    </li>
  ))}
</ul>
              </div>
            ))}
          </div>

          {/* Right: Logo / Brand */}
          <div className="flex flex-col items-start gap-2 md:items-end md:shrink-0">
            <Image
              src="/footer-logo.svg"
              alt="Uxellent logo - digital marketing, SEO AI and website development"
              width={80}
              height={46}
              className="w-auto h-auto"
            />
            <p className="text-[14px] text-white">For success</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div dir="ltr" className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-4 sm:flex-row sm:justify-start sm:items-center sm:gap-8">
          <div className="flex items-center gap-5 justify-start">
            <EnLink
              href="/en/contact"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Contact"
            >
              <Mail className="h-4 w-4" />
            </EnLink>
            <a
              href="https://www.instagram.com/vow.for.success?igsh=MTRiMmRieTNlejlsNQ%3D%3D&utm_source=qr"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/Vowsuccess"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61587713103366"
              className="text-white/60 hover:text-white transition-colors "
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          <p className="text-[13px] text-white/50 text-left">
            © {new Date().getFullYear()} Uxellent
          </p>
        </div>

      </div>
    </footer>
  )
}
