import type { Metadata } from "next"
import Link from "next/link"

import { FooterEN } from "@/app/en/_components/FooterEN"
import { HeaderEN } from "@/app/en/_components/HeaderEN"
import { PackagesSectionEN } from "@/app/en/_components/home/PackagesSectionEN"
import { LogoRow } from "@/app/_components/home/LogoRow"
import type { PricePlan } from "@/app/_components/home/PriceSection"
import { PriceSection } from "@/app/_components/home/PriceSection"
import { SuccessSection } from "@/app/_components/home/SuccessSection"
import { Testimonials } from "@/app/_components/home/Testimonials"
import { VisionToExecutionSection } from "@/app/_components/home/VisionToExecutionSection"
import { DoubleHeadingCtaSection } from "@/app/_components/services/DoubleHeadingCtaSection"
import { SeoAiProcessSteps, type SeoAiProcessStep } from "@/app/_components/services/SeoAiProcessSteps"
import { ServiceAboutSection } from "@/app/_components/services/ServiceAboutSection"
import { ServiceFaqSection } from "@/app/_components/services/ServiceFaqSection"
import { ServiceHero } from "@/app/_components/services/ServiceHero"
import { SeoAiStatsBar, type SeoAiStatsBarItem } from "@/app/_components/services/SeoAiStatsBar"
import { PortfolioWorksSection } from "@/app/_components/portfolio/PortfolioWorksSection"
import { getPortfolioImages } from "@/app/_components/portfolio/portfolioImages"
import { GrowthGuidesCard } from "@/components/marketing/GrowthGuidesCard"
import { InlineLeadForm } from "@/app/_components/leads/InlineLeadForm"
import { JsonLd, faqPageSchema } from "@/components/JsonLd"
import { H2 } from "@/components/ui/Heading"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const CANONICAL = "/en/idea-to-product"

export const metadata: Metadata = {
  title: "Idea to Product | UX/UI, Specs, Web & App Development | Uxellent",
  description:
    "For founders, investors, and early-stage teams: product specs, UI/UX, and full build-websites, mobile apps, and systems. One clear path from idea to a shipped product, with less waste and fewer surprises.",
  alternates: {
    canonical: CANONICAL,
    languages: heEnAlternateLanguages("/idea-to-product", "/en/idea-to-product"),
  },
  openGraph: {
    title: "Idea to Product | UX/UI, Specs, Web & App Development | Uxellent",
    description:
      "Plan, design, and build from any starting point: product specification, UI/UX, web development, and app development in one coordinated process.",
    url: CANONICAL,
    type: "website",
  },
}

const STATS_EN: readonly SeoAiStatsBarItem[] = [
  { value: "1", line1: "Single path", line2: "From product spec to live product" },
  { value: "3", line1: "Layers of clarity", line2: "Concept, requirements, UI/UX" },
  { value: "0", line1: "Guesswork", line2: "When specs come before code" },
]

const PROCESS_STEPS_EN: readonly SeoAiProcessStep[] = [
  {
    id: "itp-en-1",
    number: "1",
    title: "From a rough idea to a clear, precise product",
    description:
      "We distill the problem, sharpen the value proposition, define the market and core users, and turn a fuzzy idea into a product statement you can test, prioritize, and build on.",
    timing: "Week 1–2",
  },
  {
    id: "itp-en-2",
    number: "2",
    title: "Product specification & requirements (PRD)",
    description:
      "We lay the foundation for build: user flows, business rules, integrations, and technical assumptions. A tight spec cuts risk and keeps development safe and efficient.",
    timing: "Week 2–4",
  },
  {
    id: "itp-en-3",
    number: "3",
    title: "UI/UX design & prototype",
    description:
      "We turn the spec into a full user experience-screens, flows, and edge cases-and ship a prototype you can see, test, and refine before engineering starts.",
    timing: "Week 3–6",
  },
  {
    id: "itp-en-4",
    number: "4",
    title: "Full product development",
    description:
      "We implement end to end: websites, mobile apps, or web systems with real business logic-on approved spec and design, with no guesswork mid-flight.",
    timing: "Scope-based",
  },
  {
    id: "itp-en-5",
    number: "5",
    title: "Launch, validation, and optimization",
    description:
      "Ship to production, measure performance, and improve on data. Layer in SEO and visibility in AI-driven search to expand reach and support long-term growth.",
    timing: "Ongoing",
  },
]

const PRICING_EN: readonly PricePlan[] = [
  {
    title: "Discovery track",
    kicker: "Idea → product specification",
    buttonLabel: "Schedule a call",
    buttonHref: "/en/contact",
    price: "Scope-based",
    priceextra: "Best for founders or investors who need clarity before build",
    badge: "",
    bullets: [
      "Problem, market, and value proposition alignment",
      "Initial product specification & requirements documentation",
      "Recommendation on product shape (site / app / platform)",
      "Phase outline and risk notes",
    ],
  },
  {
    title: "Professional track",
    kicker: "Spec + UI/UX + MVP",
    buttonLabel: "Schedule a call",
    buttonHref: "/en/contact",
    price: "Scope-based",
    priceextra: "For teams that want approved screens before full engineering",
    badge: "Recommended",
    bullets: [
      "Everything in Discovery",
      "User interface & UX design (UI/UX)",
      "Prototype for users or stakeholders",
      "Build-readiness for app or website development",
    ],
  },
  {
    title: "End-to-end track",
    kicker: "Plan → design → build & launch",
    buttonLabel: "Schedule a call",
    buttonHref: "/en/contact",
    price: "Scope-based",
    priceextra: "Full path to a shipped digital product",
    badge: "",
    bullets: [
      "End-to-end delivery to a live product",
      "Website, app, or web platform development",
      "Launch hardening, QA, and stabilization",
      "Optional: Google & AI search visibility after launch",
    ],
  },
]

const FAQ_EN = {
  title: "Frequently asked questions: idea to product, specs, and build",
  items: [
    {
      id: "itp-en-faq-1",
      question: "I only have an idea-what should I do first?",
      answer:
        "Start with a short discovery conversation: who the customer is, what pain you are solving, and what the product should do for them. Then align on the first product shape (site, app, or system) and a concrete plan-product specification, UI/UX, then development-so you are not paying for engineering before requirements are clear.",
    },
    {
      id: "itp-en-faq-2",
      question: "Who is this for?",
      answer:
        "Founders at the idea stage, investors who want a product and feasibility narrative before a decision, and teams that already know what to build but want premium execution without juggling vendors who do not share one language.",
    },
    {
      id: "itp-en-faq-3",
      question: "Why does product specification matter before app or web development?",
      answer:
        "Without a solid product specification, development becomes guesswork: scope changes, higher costs, and friction between stakeholders. A requirements doc and flows align investors, designers, and engineers so app development and website development implement what was agreed-not assumptions.",
    },
    {
      id: "itp-en-faq-4",
      question: "Where do teams usually waste money?",
      answer:
        "When copy, design, and engineering run off separate interpretations of the idea. One coordinated process-UI/UX and specs before code, then build to approved deliverables-cuts expensive rework.",
    },
    {
      id: "itp-en-faq-5",
      question: "What is the difference between UI/UX and engineering?",
      answer:
        "UI/UX defines how users experience the product-screens, hierarchy, and flows. Engineering implements the logic and systems behind those screens. When both come from one process, you get fewer UX bugs and fewer pricing surprises.",
    },
    {
      id: "itp-en-faq-6",
      question: "Can you help with visibility after launch?",
      answer:
        "Yes. A great product still needs to be found. After a stable launch, you can add organic visibility in Google and AI-driven search-for example through our dedicated service for Google & AI optimization.",
    },
    {
      id: "itp-en-faq-7",
      question: "Why work with one team for planning, design, and build?",
      answer:
        "One accountable owner across the chain-from idea through product specification to a live product-reduces miscommunication, shortens coordination time, and typically produces a more professional outcome than fragmented freelancers.",
    },
  ],
} as const

export default function IdeaToProductPageEn() {
  const portfolioImages = getPortfolioImages("en")
  const faqItems = FAQ_EN.items

  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
      <JsonLd data={faqPageSchema(faqItems.map((item) => ({ question: item.question, answer: item.answer })))} />
      <HeaderEN />
      <main id="main" role="main">
        <ServiceHero
          ariaLabel="From Idea to Real Product"
          title={<>From Idea to Real Product</>}
          dir="ltr"
          ctaHref="#lead-idea-to-product-en"
          subtitleClassName="mt-5 text-[25px] font-semibold leading-[30px] text-[color:var(--vow-muted)]"
          subtitle="We plan, design, and build your idea-one clear path from concept to launch."
          heroSubheading="Skip the guesswork: clear requirements, trusted UI/UX, and development-website, app, or web platform-built for your idea."
          ctaLabel="Book a discovery call"
          ctaSource="design_development"
          imageSrc="/new-hero.webp"
          imageAlt="Planning, UX/UI design, and full-stack development from product spec to launch"
        />
        <LogoRow locale="en" />
        <SeoAiStatsBar
          locale="en"
          ariaLabel="Idea to product benefits"
          title="What changes with a clear idea-to-product process"
          subtitle="Product specification, UI/UX, and build tied to requirements-one accountable path, less chaos, less budget lost across vendors."
          items={STATS_EN}
        />
        <SeoAiProcessSteps
          locale="en"
          label="Process"
          title="From idea to live product: step by step"
          subtitle="Taking an idea to market means sequence: concept and product spec, interface design, then implementation and launch-each step sets up the next."
          steps={PROCESS_STEPS_EN}
        />
        <VisionToExecutionSection
          dir="ltr"
          title="Full path-specification through UI/UX to development"
          subtitle="We connect strategy and execution: not slides alone, and not code without context. One process for founders, investors, and idea-stage teams-with emphasis on product specification, UX, and professional build."
          ctaLabel="Book a discovery call"
          source="design_development"
          cards={[
            {
              id: "itp-en-vis-1",
              src: "/services/develop/d1.webp",
              alt: "Product specification and requirements planning",
              caption: "Product specification & requirements",
            },
            {
              id: "itp-en-vis-2",
              src: "/services/develop/d2.webp",
              alt: "UI/UX design and prototyping",
              caption: "UI/UX & prototyping",
            },
            {
              id: "itp-en-vis-3",
              src: "/services/develop/d3.webp",
              alt: "Website development and mobile app development",
              caption: "Web & app development",
            },
            {
              id: "itp-en-vis-4",
              src: "/services/develop/d4.webp",
              alt: "Launch, stabilization, and growth",
              caption: "Launch, QA & growth",
            },
          ]}
        />
        <ServiceAboutSection
          dir="ltr"
          title="Without product specification, build gets expensive and unpredictable"
          subtitle={
            <>
              When there is no shared requirements doc, each discipline interprets the idea differently. Our approach prioritizes clarity, sensible velocity, and premium execution-from any starting point to a{" "}
              <strong>usable product</strong>.
            </>
          }
          ctaLabel="Book a discovery call"
          ctaSource="design_development"
          items={[
            {
              id: "itp-en-about-1",
              title: "Specification before code",
              description:
                "Product specification and flows align stakeholders, design, and engineering-so website development or app development does not turn into mid-project guessing.",
              icon: "/about/2.svg",
            },
            {
              id: "itp-en-about-2",
              title: "UI/UX tied to logic",
              description:
                "Interface and user experience design grounded in requirements-not just pretty screens, but flows that complete jobs and support conversion.",
              icon: "/services/seo-ai/2.svg",
            },
            {
              id: "itp-en-about-3",
              title: "Full delivery or phased",
              description:
                "Engage end-to-end or stop after spec and prototype-depending on stage, with the same language from end to end.",
              icon: "/about/code.svg",
            },
          ]}
        />

        <PriceSection
          id="price"
          locale="en"
          title="Engagement tracks-from product spec to build"
          subtitle="Pick an entry point that matches your stage: discovery, design plus MVP, or full delivery to launch. Pricing is scope-based-we are happy to detail on a call."
          plans={PRICING_EN}
          variant="seo-ai"
        />

        <SuccessSection locale="en" />
        <Testimonials locale="en" />

        <DoubleHeadingCtaSection
          dir="ltr"
          title="Ready to turn your idea into a real product?"
          subtitle="Book a short call-we map your idea into a practical path: product specification, UI/UX, then website or app development."
          buttonLabel="Schedule a call"
          buttonSource="design_development"
          buttonHref="#price"
        />
        <ServiceFaqSection title={FAQ_EN.title} items={[...FAQ_EN.items]} dir="ltr" />
        <PortfolioWorksSection
          locale="en"
          images={portfolioImages}
          title="Work that connects specification, design, and development"
          subtitle="A sample of sites, apps, and platforms-showing UI/UX, engineering, and shipped product after a structured process."
        />
        <section aria-label="Related services" className="bg-[#F4F1EC] pb-[var(--space-section)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[900px] rounded-[10px] border border-[color:var(--vow-border)] bg-white px-6 py-8 text-left sm:px-10">
              <H2 className="text-left">A strong product also needs the right go-to-market layer</H2>
              <p className="mt-4 text-[20px] leading-[34px] text-black/80">
                Alongside{" "}
                <strong>product specification</strong>, <strong>UI/UX</strong>, and{" "}
                <strong>website or app development</strong>, you can strengthen{" "}
                <Link href="/en/design" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  design & branding
                </Link>
                , scale{" "}
                <Link href="/en/develop" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  web development
                </Link>
                , run{" "}
                <Link href="/en/marketing/ppc" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  paid acquisition
                </Link>
                , and after launch improve visibility with{" "}
                <Link href="/en/seo-ai" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  Google & AI search optimization
                </Link>{" "}
                and{" "}
                <Link href="/en/roi" className="font-semibold underline decoration-[#5389BB] underline-offset-4">
                  measurement & conversions
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
        <GrowthGuidesCard
          title="Growth guides after your product is live"
          description="Traffic, leads, and revenue fundamentals-stacked on top of a product that was defined and built the right way."
          dir="ltr"
          sectionClassName="bg-[#F4F1EC] py-[var(--space-section)]"
          containerClassName="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4"
          links={[
            { href: "/en/growth-guides/how-to-grow-small-business-online", label: "How to Grow a Small Business Online" },
            { href: "/en/growth-guides/how-to-get-leads", label: "How to Get Leads" },
          ]}
          indexLink={{ href: "/en/growth-guides", label: "All Growth Guides" }}
        />
        <PackagesSectionEN />
        <InlineLeadForm
          title="Get in touch"
          subtitle="Share a short note about your idea-we will follow up with next steps on specification, UI/UX, or development."
          pagePathOverride="/en/idea-to-product"
          locale="en"
          anchorId="lead-idea-to-product-en"
        />
      </main>
      <FooterEN />
    </div>
  )
}
