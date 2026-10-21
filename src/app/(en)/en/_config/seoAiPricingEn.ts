import type { PricePlan } from "@/app/_components/home/PriceSection"

export const SEO_AI_PRICING_EN: readonly PricePlan[] = [
  {
    id: "price-starter-en",
    title: "Starter",
    kicker: "AI search engines",
    buttonLabel: "Free presence audit & join",
    buttonHref:
      "https://app.uxellent.com/en/auditor?link_id=a_basic",
    price: "$100/month",
    priceextra: "For early-stage businesses or limited budgets",
    badge: "",
    bullets: [
      "Monthly scan + focused report",
      "Top 5 priority actions per month",
      "One content update per month",
      "Basic performance metrics",
      "Chat support",
    ],
  },
  {
    id: "price-pro-en",
    title: "Pro",
    kicker: "Expert support + monthly execution",
    buttonLabel: "Free presence audit & join",
    buttonHref:
      "https://app.uxellent.com/en/auditor?link_id=a_pro",
    price: "$270/month",
    priceextra: "For businesses that want consistent growth",
    badge: "Most popular",
    bullets: [
      "Everything in Starter +",
      "Deep site scan & work plan",
      "Content & structure upgrades",
      "New pages optimized for Google & AI",
      "Optimization for ChatGPT, Gemini, Copilot",
      "⁠Monthly results report + strategy call",
      "Direct expert support",
    ],
  },
  {
    id: "price-expert-en",
    title: "Expert",
    kicker: "SEO + AI engines + personal expert",
    buttonLabel: "Free presence audit & join",
    buttonHref:
      "https://app.uxellent.com/en/auditor?link_id=a_premium",
    price: "$670/month",
    priceextra: "For competitive industries (legal, medical, finance)",
    badge: "",
    bullets: [
      "Everything in Pro +",
      "New page creation every month",
      "⁠Full topic & content strategy",
      "Advanced schema & internal linking",
      "Advanced tracking setup",
      "⁠Bi-weekly strategy calls",
      "Priority response + SLA",
    ],
  },
] as const
