import type { ServicePageConfig } from "@/app/_components/services/services.config"

export const developConfigEn: ServicePageConfig = {
  slug: "develop",
  metadata: {
    title: "Web Development for Businesses | Uxellent",
    description:
      "AI-powered web development for businesses that need fast, accessible sites with technical SEO, strong UX, and better conversions.",
  },
  hero: {
    title: "AI-powered web development for businesses",
    heroSubheading: "Corporate sites, e‑commerce, apps and systems - fast, accessible, ready for growth",
    ctaLabel: "Get in touch",
    ctaSource: "design_development",
    imageSrc: "/services/d-develop.webp",
    imageAlt: "AI-powered website development for business growth and digital presence",
  },
  doubleHeading: {
    title: "WordPress sites and online stores powered by AI-20 years of experience",
    subtitle:
      "We combine deep expertise in web development, SEO, and AI business promotion to build a digital presence that delivers real results.",
    buttonLabel: "Get in touch",
    buttonSource: "design_development",
  },
  vision: {
    title: "AI-powered sites that outperform the competition",
    subtitle:
      "Smart sites that start generating sales and leads-and ROI-from month one.",
    ctaLabel: "Get in touch",
    source: "design_development",
    cards: [
      {
        id: "develop-vision-1",
        src: "/services/develop/d1.webp",
        alt: "Sites that sell and generate leads",
        caption: "Sites that sell and generate leads",
      },
      {
        id: "develop-vision-2",
        src: "/services/develop/d2.webp",
        alt: "Automations that save hours",
        caption: "Automations that save hours",
      },
      {
        id: "develop-vision-3",
        src: "/services/develop/d3.webp",
        alt: "Tech that drives organic SEO traffic",
        caption: "Tech that drives organic SEO traffic",
      },
      {
        id: "develop-vision-4",
        src: "/services/develop/d4.webp",
        alt: "Custom development for your business",
        caption: "Custom development for your business",
      },
    ],
  },
  about: {
    title: "Corporate sites and online stores powered by AI-without breaking the bank",
    subtitle:
      "Every site is planned from day one to bring customers, sales, and leads-not just look good.",
    ctaLabel: "Get in touch",
    ctaSource: "design_development",
    items: [
      {
        id: "develop-about-1",
        title: "UX/UI design",
        description: "User research, flow definition, and precise UX planning.",
        icon: "/about/2.svg",
      },
      {
        id: "develop-about-2",
        title: "Modern tech stack",
        description: "Clean code, solid architecture, full implementation.",
        icon: "/about/code.svg",
      },
      {
        id: "develop-about-3",
        title: "Launch and optimize",
        description: "Measurement, optimization, and data-driven upgrades.",
        icon: "/about/rocket.svg",
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        id: "develop-faq-1",
        question: "What technologies do you use?",
        answer:
          "Mainly corporate sites and online stores with React, WordPress, PHP, Java, and Next.js-including AI solutions and full integration support.",
      },
      {
        id: "develop-faq-2",
        question: "Do you handle performance and SEO?",
        answer: "Yes. Load speed, proper structure, and basic SEO are part of the build.",
      },
      {
        id: "develop-faq-3",
        question: "Can you integrate payment, CRM, or third-party systems?",
        answer: "Yes. We work with APIs and integrations as needed.",
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
