import type { ServicePageConfig } from "@/app/_components/services/services.config"

export const designConfigEn: ServicePageConfig = {
  slug: "design",
  metadata: {
    title: "Design & Branding Services | Uxellent",
    description:
      "Design and branding services with UX/UI, landing pages, and websites that support positioning, conversion, and business growth.",
  },
  hero: {
    title: "Design & Branding for Businesses",
    heroSubheading: "Website, app, SaaS & systems - creative and logos that speak to your audience",
    ctaLabel: "Get in touch",
    ctaSource: "design_development",
    imageSrc: "/services/d-design2.webp",
    imageAlt: "Branding and UX design for business growth and digital presence",
  },
  doubleHeading: {
    title: "Full branding and launch package",
    subtitle:
      "Starting out? We offer a complete solution: branding, website, and digital assets ready to launch. Get to market fast with a professional presence.",
    buttonLabel: "Build your brand",
    buttonSource: "design_development",
  },
  vision: {
    title: "Enterprise-grade branding for small business.",
    subtitle:
      "Real branding starts with understanding your business, audience, and market position. We define your place in the market and build a visual language that resonates.",
    ctaLabel: "Get in touch",
    source: "design_development",
    cards: [
      { id: "design-1", src: "/services/design/1.webp", alt: "Audience targeting", caption: "Audience targeting" },
      { id: "design-2", src: "/services/design/2.webp", alt: "Positioning and differentiation", caption: "Positioning and differentiation" },
      { id: "design-3", src: "/services/design/3.webp", alt: "Custom fit for your niche", caption: "Custom fit for your niche" },
      { id: "design-4", src: "/services/design/4.webp", alt: "Websites and landing pages", caption: "Websites and landing pages" },
    ],
  },
  about: {
    title: "New business?\nStart right from day one",
    subtitle:
      "Every project is built to drive action-whether leads, sales, or contact-turning visitors into customers.",
    ctaLabel: "Get in touch",
    ctaSource: "design_development",
    items: [
      {
        id: "design-about-1",
        title: "Websites, apps & systems",
        description: "Corporate sites, e‑commerce, apps, and systems built to the highest standard.",
        icon: "/about/laptop.svg",
      },
      {
        id: "design-about-2",
        title: "Colors & typography",
        description: "Sharp, consistent, memorable visual language.",
        icon: "/about/2.svg",
      },
      {
        id: "design-about-3",
        title: "Marketing creative",
        description: "Creative that connects emotion, strategy, and sales.",
        icon: "/about/3.svg",
      },
    ],
  },
  faq: {
    title: "Design & branding FAQ",
    items: [
      {
        id: "design-faq-1",
        question: "What does a branding project include?",
        answer: "Message definition, visual language (colors, typography), and core assets for launch.",
      },
      {
        id: "design-faq-2",
        question: "How long does a branding project take?",
        answer: "Depends on scope. Usually 2–6 weeks, with a clear timeline from day one.",
      },
      {
        id: "design-faq-3",
        question: "Do you build websites and landing pages?",
        answer: "Yes. We can include a website and landing pages as part of the package, aligned with your goals.",
      },
    ],
  },
  sections: [
    "ServiceHero",
    "LogoRow",
    "VisionToExecutionSection",
    "AboutSection",
    "DoubleHeadingCtaSection",
    "FaqSection",
    "PackagesSection",
  ],
}
