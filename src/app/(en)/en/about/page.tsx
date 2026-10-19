import type { Metadata } from "next"
import Image from "next/image"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { EnLink } from "../_components/EnLink"
import { H2 } from "@/components/ui/Heading"

export const metadata: Metadata = {
  title: "About Uxellent | SEO Agency & Web Development",
  description: "Learn about Uxellent, an SEO agency and technology partner for web development, automation, and digital marketing services.",
  alternates: {
    canonical: "/en/about",
    languages: heEnAlternateLanguages("/about", "/en/about"),
  },
}

const WRAP_NARROW = "mx-auto max-w-[950px] px-2 sm:px-6"
const WRAP_MID = "mx-auto max-w-[660px] px-4 sm:px-6"
const LABEL = "block text-[14px] font-semibold uppercase tracking-[0.22em] text-[#000000] mb-4"

const SERVICES = [
  {
    num: "1",
    title: "Web and systems development",
    body: "Corporate sites, SaaS systems and complex platforms - with product thinking. Not just how it looks, but how it works and creates value.",
  },
  {
    num: "2",
    title: "Business automations",
    body: "Identify manual processes that repeat and turn them into smart systems. Fewer errors, more control.",
  },
  {
    num: "3",
    title: "Data-driven marketing",
    body: "Not campaigns - ROI engines. Everything measured, everything connected, everything data-based.",
  },
  {
    num: "4",
    title: "Secure digital invoicing",
    body: "Create invoices, receipts and quotes smartly and quickly - a full year free for every business.",
  },
  {
    num: "5",
    title: "AI accountant",
    body: "Knows income tax, VAT and National Insurance - and finds you opportunities and savings automatically.",
  },
]

const CLIENTS = [
  "Altshuler Shaham", "Isracard", "BuyMe", "carrefour", "eufy", "ANKER", "Leumi Card", "Horizon",
]

export default function AboutPageEn() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">

        <section className="pt-10 pb-7 sm:pt-28 sm:pb-18 lg:pt-16 lg:pb-12 text-center">
          <div className={WRAP_NARROW}>
            <span className={LABEL}>About Uxellent</span>
            <h1 className="text-[38px] font-semibold leading-[1.1] text-black sm:text-[52px] lg:text-[64px]">
              Building solutions<br />that deliver results.
            </h1>
            <p className="mt-5 text-[24px] leading-[28px] text-[#000000] sm:text-[22px] sm:leading-[32px]">
              Most businesses don&apos;t fail for lack of ideas - they get stuck
              <br className="hidden sm:block" />
              for lack of a technological solution. We&apos;re here to fix that.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className={WRAP_MID}>
            <div className="rounded-2xl bg-white border border-black/[0.07] overflow-hidden">
              {SERVICES.map((s, i) => (
                <div key={s.num}>
                  <div className="flex items-center gap-5 px-6 py-5 sm:px-8 sm:py-6 hover:bg-[#fafafa] transition-colors">
                    <span className="shrink-0 text-[24px] font-semibold text-[#5389BB] tabular-nums pt-[3px] min-w-[24px] text-left">
                      {s.num}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="text-[20px] sm:text-[24px] font-semibold text-black mb-1 leading-snug">
                        {s.title}
                      </p>
                      <p className="text-[18px] sm:text-[20px] leading-[26px] text-[#000000]">
                        {s.body}
                      </p>
                    </div>
                  </div>
                  {i < SERVICES.length - 1 && (
                    <div className="border-t border-black/[0.06] mx-6 sm:mx-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-5">
          <div className={WRAP_NARROW}>
            <div className="rounded-2xl bg-white border border-black/[0.07] px-8 py-4 sm:px-12 sm:py-14 text-center">
              <H2 className="mb-5">
                Businesses need solutions. Not another vendor.
              </H2>
              <p className="text-[17px] leading-[28px] text-[#000000] sm:text-[20px] sm:leading-[30px] mx-auto">
                After more than 20 years in specification, development and product management - one insight has accumulated:
                Technology has advanced, AI has changed the rules, but most business owners still work with methods from a decade ago.
                Uxellent was founded to close that gap - right now.
              </p>
            </div>
          </div>
        </section>

        <section className="lg:py-0 py-3 sm:py-14">
          <div className={WRAP_NARROW}>
            <div className="rounded-2xl px-8 py-4 sm:px-14 sm:py-16 text-center">
              <span className={LABEL}>Founder</span>

              <div className="mx-auto mb-4 h-[160px] w-[160px] rounded-full overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src="/team/itzik.webp"
                    alt="Itzik Barlev - Uxellent founder, digital marketing and website development expert"
                    fill
                    sizes="160px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <H2 className="mb-1 pb-1 lg:py-0">
                Itzik Barlev
              </H2>
              <p className="text-[20px] text-black mb-6 leading-relaxed text-center mx-auto">
                Over 20 years in specification, UX, development and product management. Four years in Italy, eight years at MAX (Leumi Card).<br />
                <span className="font-medium">A business not connected to smart technology - gets left behind.</span>
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                {CLIENTS.map((co) => (
                  <span
                    key={co}
                    className="rounded-full bg-white px-8 py-[8px] text-[20px] font-medium text-black"
                  >
                    {co}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lg:py-1 py-0 sm:py-17 lg:pb-19">
          <div className={WRAP_NARROW}>
            <div className="rounded-2xl bg-white border border-black/[0.07] px-8 py-4 sm:px-14 sm:py-16 text-center">
              <H2 className="mb-4">
                Leave your details
              </H2>
              <p className="text-[18px] leading-[24px] text-[#000000] sm:text-[18px] sm:leading-[30px] max-w-[690px] mx-auto mb-8">
                If you&apos;re just starting out - we offer a complete solution including branding, website and digital accessibility ready for launch. Get to market fast, right, and with professional visibility.
              </p>
              <EnLink
                href="/contact"
                className="inline-block bg-black text-white text-[15px] font-semibold px-10 py-[14px] rounded-full hover:bg-[#5389BB] transition-colors duration-200"
              >
                Let&apos;s build your brand
              </EnLink>
            </div>
          </div>
        </section>

        <div
          className="overflow-hidden border-y border-black/[0.08] bg-white py-4 mb-0"
          aria-hidden="true"
        >
          <style>{`
            @keyframes ticker-ltr {
              0%   { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .ticker-track {
              display: flex;
              width: max-content;
              animation: ticker-ltr 28s linear infinite;
            }
            .ticker-track:hover { animation-play-state: paused; }
          `}</style>
          <div className="ticker-track">
            {[...Array(2)].map((_, gi) => (
              <div key={gi} className="flex items-center gap-0">
                {[
                  "AI development", "Automations", "Measured marketing",
                  "Digital invoicing", "AI accountant", "Advanced UX",
                  "SaaS systems", "Business growth", "Smart data",
                ].map((item, idx) => (
                  <span
                    key={`${gi}-${idx}`}
                    className="flex items-center gap-4 px-6 text-[18px] font-medium text-black/70 whitespace-nowrap"
                  >
                    {item}
                    <span className="text-[#5389BB] text-[10px]">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
