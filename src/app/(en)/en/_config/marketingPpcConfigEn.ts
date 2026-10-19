import type { ServicePageConfig } from "@/app/_components/services/services.config"

export const marketingPpcConfigEn: ServicePageConfig = {
  slug: "marketing",
  metadata: {
    title: "PPC & Digital Marketing Services | Uxellent",
    description:
      "Digital marketing services for Google Ads and Meta Ads with strategy, optimization, analytics, and measurable ROI.",
    openGraph: {
      title: "PPC Marketing | Uxellent",
      description:
        "Google and Meta campaigns built on measurement, optimization, and ROI. Stop guessing-start measuring.",
      url: "/en/marketing/ppc",
      type: "website",
    },
  },
  hero: {
    title: "PPC Marketing That Brings Real Customers",
    subtitle:
      "Run profitable campaigns on Google Ads and Meta Ads with a data-driven strategy focused on leads, sales, and measurable ROI.",
    heroSubheading: "",
    ctaLabel: "Get in touch",
    ctaSource: "digital_marketing",
    imageSrc: "/services/d-marketing3.webp",
    imageAlt: "PPC digital marketing for business growth and lead generation",
  },
  doubleHeading: {
    title: "Play in the big leagues.",
    subtitle:
      "We build campaigns tied to numbers: cost per lead, quality, close rate, LTV-and make decisions based on data.",
    buttonLabel: "Get in touch",
    buttonSource: "digital_marketing",
  },
  vision: {
    title: "Less guessing. More data.",
    subtitle:
      "We build a marketing system based on measurement: campaigns, creative, analytics, and optimization-with decisions tied to ROI.",
    ctaLabel: "Get in touch",
    source: "digital_marketing",
    cards: [
      {
        id: "marketing-vision-1",
        src: "/services/marketing/1.webp",
        alt: "Google Ads",
        caption: "Google Ads",
      },
      {
        id: "marketing-vision-2",
        src: "/services/marketing/2.webp",
        alt: "Meta Ads",
        caption: "Meta Ads",
      },
      {
        id: "marketing-vision-3",
        src: "/services/marketing/3.webp",
        alt: "Analytics & CRO",
        caption: "Analytics & CRO",
      },
      {
        id: "marketing-vision-4",
        src: "/services/marketing/4.webp",
        alt: "Creative & A/B Testing",
        caption: "Creative & A/B Testing",
      },
    ],
  },
  about: {
    title: "PPC built on real experience. Real results.",
    subtitle:
      "With 20+ years of experience-we connect creative, campaigns, and data to build a process that drives growth, not just clicks.",
    ctaLabel: "Get in touch",
    ctaSource: "digital_marketing",
    items: [
      {
        id: "marketing-about-1",
        title: "Deep business understanding",
        description:
          "Not just campaigns-financial, product, and marketing insight tied to the numbers.",
        icon: "/about/briefcase.svg",
      },
      {
        id: "marketing-about-2",
        title: "Strategy before execution",
        description: "Testing, continuous improvement, and ROI focus.",
        icon: "/about/lightbulb.svg",
      },
      {
        id: "marketing-about-3",
        title: "True growth partnership",
        description: "We're not a vendor-we're a partner focused on your business outcome.",
        icon: "/about/analytics.svg",
      },
    ],
  },
  faq: {
    title: "PPC Marketing FAQ",
    items: [
      {
        id: "marketing-faq-1",
        question: "Which platforms do you manage PPC on?",
        answer:
          "Mainly Google Ads and Meta Ads. We add other channels when they serve ROI, based on audience and product.",
      },
      {
        id: "marketing-faq-2",
        question: "How do you measure success?",
        answer:
          "We define KPIs by business goal (leads/sales), measure the full funnel, and improve continuously based on data.",
      },
      {
        id: "marketing-faq-3",
        question: "Do you handle content and creative too?",
        answer:
          "Yes. Creative, copy, and landing assets are part of the process-to improve CTR, conversion rate, and CAC.",
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
