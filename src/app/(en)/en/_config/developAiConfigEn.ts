import type { ProductPageConfig } from "@/app/_components/products/products.config"

export const developAiConfigEn: ProductPageConfig = {
  slug: "develop-ai",
  metadata: {
    title: "Custom AI Software Development | Uxellent",
    description:
      "Custom AI software, systems architecture, and automations for businesses that need scalable development without compromising quality.",
  },
  hero: {
    title: "AI-powered software and systems development",
    subtitle: "",
    heroSubheading: "Python, React, Node.js - custom systems with AI at the core",
    ctaLabel: "Get in touch",
    ctaSource: "design_development",
    imageSrc: "/services/developai/vow.webp",
    imageAlt: "AI-powered website development for business growth and digital presence",
  },
  vision: {
    title: "Boutique tech. Enterprise grade.",
    subtitle:
      "We specify, design, and build complex internal systems-fully custom, enterprise-level, with smart architecture and AI at the core.",
    ctaLabel: "Get in touch",
    source: "design_development",
    cards: [
      {
        id: "develop-ai-1",
        src: "/services/developai/1.webp",
        alt: "Significantly faster development",
        caption: "Significantly faster development",
      },
      {
        id: "develop-ai-2",
        src: "/services/developai/2.webp",
        alt: "Cost savings",
        caption: "Cost savings",
      },
      {
        id: "develop-ai-3",
        src: "/services/developai/3.webp",
        alt: "Real-time smart data analysis",
        caption: "Real-time smart data analysis",
      },
      {
        id: "develop-ai-4",
        src: "/services/developai/4.webp",
        alt: "True business flexibility",
        caption: "True business flexibility",
      },
    ],
  },
  doubleHeading: {
    title: "Who is it for?",
    subtitle:
      "Established companies with complex processes, organizations that want full control, businesses outgrowing off-the-shelf systems, and those seeking a real competitive edge.",
    buttonLabel: "Get in touch",
    buttonSource: "design_development",
  },
  about: {
    title: "20 years of complex systems: spec, design, and development",
    subtitle:
      "We've led specification, design, and development of complex systems in large organizations.",
    ctaLabel: "Get in touch",
    ctaSource: "design_development",
    items: [
      {
        id: "develop-ai-about-1",
        title: "Deep business mapping",
        description:
          "We map existing processes, friction points, duplicate work, data flow, cross-department dependencies, and critical day-to-day decisions.",
        icon: "/about/briefcase.svg",
      },
      {
        id: "develop-ai-about-2",
        title: "Custom architecture planning",
        description:
          "We define system structure based on real processes, expected load, existing integrations, and future growth.",
        icon: "/about/1.svg",
      },
      {
        id: "develop-ai-about-3",
        title: "Full-stack development + AI",
        description:
          "End-to-end build: UX, business logic, and AI infrastructure as part of the core.",
        icon: "/about/code.svg",
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        id: "develop-ai-faq-2",
        question: "Do you work with AI?",
        answer: "Yes. We integrate automations and AI capabilities based on need and business value.",
      },
      {
        id: "develop-ai-faq-3",
        question: "How long does a project take?",
        answer:
          "We start with a deep spec of business needs, workflows, and goals. Only after a clear, agreed spec do we begin development-with milestones, full transparency, and accountability for the defined outcome.",
      },
      {
        id: "develop-ai-faq-4",
        question: "How does the spec process work, and do you commit to results?",
        answer:
          "Depends on scope. Usually a short definition phase, then weekly development sprints.",
      },
      {
        id: "develop-ai-faq-5",
        question: "Can you integrate with any API or existing system?",
        answer:
          "Yes. We integrate with any system that supports API, webhooks, or direct DB connection-including CRM, accounting, payment, SaaS, BI, and internal systems.",
      },
      {
        id: "develop-ai-faq-6",
        question: "Do you commit to timelines?",
        answer:
          "Development is split into clear phases with defined schedules. Each phase is delivered for review and approval to ensure we hit goals with no surprises.",
      },
      {
        id: "develop-ai-faq-7",
        question: "Can AI be embedded in an existing system?",
        answer:
          "Yes. AI models for data analysis, automation, forecasting, document processing, and chatbots can be added to existing systems.",
      },
      {
        id: "develop-ai-faq-8",
        question: "Do you support after launch?",
        answer: "Yes. We provide maintenance, upgrades, monitoring, and ongoing performance support.",
      },
    ],
  },
  sections: [
    "ServiceHero",
    "LogoRow",
    "VisionToExecutionSection",
    "AboutSection",
    "PackagesSection",
    "DoubleHeadingCtaSection",
    "FaqSection",
  ],
}
