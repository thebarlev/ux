import type { Metadata } from "next"

import { ContactForm } from "@/app/_components/contact/ContactForm"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export const metadata: Metadata = {
  title: "Contact Uxellent | SEO Agency & Marketing Team",
  description: "Contact Uxellent for SEO agency support, digital marketing services, AI web development, or growth planning for your business.",
  alternates: {
    canonical: "/en/contact",
    languages: heEnAlternateLanguages("/contact", "/en/contact"),
  },
}

export default function ContactPageEn() {
  return (
    <div className="min-h-screen bg-[#FAF9F5]" dir="ltr">
        <div className="mx-auto max-w-[1440px] px-4 py-[var(--space-section)] sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[720px] text-left">
            <h1 className="text-[44px] font-semibold leading-[52px] text-black sm:text-[56px] sm:leading-[64px]">
              Contact
            </h1>
            <p className="mt-2 text-[20px] font-semibold leading-[32px] text-[color:var(--vow-muted)]">
              We&apos;d love to hear from you. Fill in your details and we&apos;ll get back to you soon.
            </p>

            <div className="mt-8">
              <ContactForm locale="en" />
            </div>
          </div>
        </div>
    </div>
  )
}
