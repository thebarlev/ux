import type { ServicePageConfig } from "@/app/_components/services/services.config"

export const seoAiConfigEn: ServicePageConfig = {
  slug: "seo-ai",
  metadata: {
    title: "SEO Agency for AI Search & Engine Optimization | Uxellent",
    description:
      "Uxellent is a SEO agency offering engine optimization, seo optimisation for website visibility, and AI search growth for businesses.",
    alternates: {
      canonical: "/en/seo-ai",
    },
    openGraph: {
      title: "Business Promotion in AI Search Engines | Uxellent",
      description:
        "A site without SEO gets no visitors. We connect every site to an SEO + AI system that runs monthly and grows traffic, content, and leads.",
      url: "/en/seo-ai",
      type: "website",
    },
  },
  hero: {
    title: "Customers don't search Google anymore - they ask AI.",
    subtitle: "We don’t do “SEO”. We make your business show up where customers actually look - Google, ChatGPT, and AI search.",
    heroSubheading: "",
    ctaLabel: "Start your free audit",
    ctaSource: "digital_marketing",
    imageSrc: "/new-hero.webp",
    imageAlt: "AI SEO strategy helping businesses appear in ChatGPT, Google and AI search results",
  },
  doubleHeading: {
    title: "SEO business Pricing only matters when it supports revenue.",
    subtitle:
      "We build a strategy that connects rankings, lead quality, funnel movement, and revenue instead of vanity metrics.",
    buttonLabel: "Get started",
    buttonSource: "digital_marketing",
  },
  vision: {
    title: "Search engine optimizations that turn visibility into consistent leads",
    subtitle:
      "We combine engine optimization, content systems, and AI search visibility to keep qualified demand growing every month.",
    ctaLabel: "Plans & pricing",
    ctaHref: "#price",
    source: "digital_marketing",
    cards: [
      {
        id: "seo-ai-vision-1",
        src: "/services/seo-ai/1.webp",
        alt: "AI SEO modules delivering immediate value for business visibility",
        caption: "AI modules that deliver immediate value",
      },
      {
        id: "seo-ai-vision-2",
        src: "/services/seo-ai/2.webp",
        alt: "High ROI from AI SEO and digital marketing strategy",
        caption: "High ROI",
      },
      {
        id: "seo-ai-vision-3",
        src: "/services/seo-ai/3.webp",
        alt: "Hundreds of AI agents promoting your business in search results",
        caption: "Hundreds of AI agents promote your business",
      },
      {
        id: "seo-ai-vision-4",
        src: "/services/seo-ai/4.webp",
        alt: "Improved SEO performance for business growth and lead generation",
        caption: "Improved SEO performance",
      },
    ],
  },
  about: {
    title: "Your site exists, but it needs stronger SEO optimisation to bring customers.",
    subtitle:
      "We deliver practical SEO optimisation for website growth with monthly execution that improves visibility, trust, and lead quality.",
    ctaLabel: "Free website audit",
    ctaHref: "#price",
    ctaSource: "digital_marketing",
    items: [
      {
        id: "seo-ai-about-1",
        title: "Less ad spend, more customers",
        description:
          "We reduce dependence on paid media by improving organic visibility, strengthening service pages, and building content that keeps attracting qualified demand.",
        icon: "/services/seo-ai/1.svg",
      },
      {
        id: "seo-ai-about-2",
        title: "Stop the campaign? Leads don't stop",
        description:
          "When paid campaigns pause, your SEO foundation, internal links, and high-intent pages can keep bringing relevant prospects from Google and AI search.",
        icon: "/services/seo-ai/2.svg",
      },
      {
        id: "seo-ai-about-3",
        title: "More traffic and visibility every month",
        description:
          "Each month we improve weak points in the site, content, and conversion path so traffic quality, search visibility, and lead intent keep compounding.",
        icon: "/services/seo-ai/3.svg",
      },
    ],
  },
  faq: {
    title: "FAQ: SEO agency, AI search, and growth",
    items: [
      {
        id: "seo-ai-faq-1",
        question: "What does a seo agency actually do for AI search and engine optimization?",
        answer:
          "A strong seo agency maps demand, fixes technical issues, improves pages, and builds authority so your business earns visibility in both Google and AI systems.",
      },
      {
        id: "seo-ai-faq-2",
        question: "How is seo optimisation different from one-off project work?",
        answer:
          "seo optimisation is continuous. It combines monthly execution across content, technical fixes, internal links, and measurement rather than a one-time checklist.",
      },
      {
        id: "seo-ai-faq-3",
        question: "What does seo optimisation for website structure and content include each month?",
        answer:
          "It usually includes page rewrites, schema, internal links, content briefs, conversion improvements, and technical tasks based on what can move rankings and leads fastest.",
      },
      {
        id: "seo-ai-faq-4",
        question: "How do keyword search engine optimization and broader search engine optimizations work together?",
        answer:
          "keyword search engine optimization helps align pages with real queries, while broader search engine optimizations cover site architecture, UX, authority, and performance.",
      },
      {
        id: "seo-ai-faq-5",
        question: "How do your digital marketing services connect with AI search and organic SEO?",
        answer:
          "Our digital marketing services connect SEO, content, CRO, and reporting so organic growth supports the rest of your acquisition mix instead of working in isolation.",
      },
      {
        id: "seo-ai-faq-6",
        question: "How should I evaluate SEO business Pricing before I commit?",
        answer:
          "Look for scope, execution ownership, reporting clarity, and business outcomes. SEO business Pricing should reflect the work needed to improve visibility, leads, and revenue, not just generic deliverables.",
      },
      {
        id: "seo-ai-faq-7",
        question: "Do I need technical seo optimization as well as content?",
        answer:
          "Yes. Technical seo optimization makes the site crawlable, indexable, and fast, while content gives search engines and AI systems enough context to rank and cite your business.",
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
