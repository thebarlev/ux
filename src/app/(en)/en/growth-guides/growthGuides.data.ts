import {
  growthGuides as growthGuideTopics,
} from "@/lib/growth-guides/topics"

export type GrowthGuideLink = {
  label: string
  href: string
  description: string
  external?: boolean
}

export type GrowthGuideParagraphPart = {
  type: "text" | "link"
  text: string
  href?: string
  external?: boolean
}

export type GrowthGuideParagraph = string | readonly GrowthGuideParagraphPart[]

export type GrowthGuideSection = {
  id: string
  title: string
  paragraphs: readonly GrowthGuideParagraph[]
  bullets?: readonly string[]
  links?: readonly GrowthGuideLink[]
}

export type GrowthGuideFaqItem = {
  id: string
  question: string
  answer: string
}

export type GrowthGuide = {
  slug: string
  keyword: string
  metaDescription: string
  shortDescription: string
  heroIntro: string
  heroTags: readonly string[]
  sections: readonly GrowthGuideSection[]
  faq: readonly GrowthGuideFaqItem[]
  ctaTitle: string
  ctaSubtitle: string
  relatedSlugs: readonly string[]
}

export const AUDITOR_URL = "https://app.uxellent.com/en/auditor"
export const SEO_AI_MARKETING_URL = "/en/seo-ai"

const growthGuideContent = [
  {
    slug: "how-to-get-traffic-to-my-website",
    keyword: "How to Get Traffic to Your Website",
    metaDescription:
      "How to get traffic to your website with search intent, technical fixes, and content systems that compound visibility and leads.",
    shortDescription:
      "A practical growth guide for turning an underperforming website into a repeatable traffic channel.",
    heroIntro:
      "How to get traffic to your website starts with fixing discoverability, matching intent, and publishing pages that deserve to rank.",
    heroTags: ["Traffic growth", "SEO foundation", "Content plan", "Lead quality"],
    sections: [
      {
        id: "traffic-problem",
        title: "Why How to Get Traffic to Your Website Feels Hard",
        paragraphs: [
          "Most websites do not have a traffic problem because the market is too competitive. They have a structure problem, a messaging problem, or a measurement problem.",
          [
            {
              type: "text",
              text: "If your pages are thin, slow, or unclear about what they solve, Google and AI engines have no strong reason to surface them. A good next step is fixing ",
            },
            {
              type: "link",
              text: "how to improve website SEO",
              href: "/growth-guides/how-to-improve-website-seo",
            },
            {
              type: "text",
              text: " so the site becomes easier to understand. Even when people land on the site, they leave because the next step is vague.",
            },
          ],
        ],
        bullets: [
          "Important service pages are missing or too generic.",
          "The site is not aligned to real search intent and customer questions.",
          "Traffic is measured as visits instead of qualified sessions and leads.",
        ],
      },
      {
        id: "traffic-solution",
        title: "How to Get Traffic to Your Website With a Search-Led System",
        paragraphs: [
          [
            {
              type: "text",
              text: "The fastest sustainable way to grow traffic is to connect technical SEO, page architecture, and demand-focused content. ",
            },
            {
              type: "link",
              text: "Website seo services",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: " that combine these elements can help you build pages around the exact problems buyers are already searching for.",
            },
          ],
          [
            {
              type: "text",
              text: "A strong system starts with core commercial pages, then expands with supporting guides, FAQs, proof, and internal links. If you also want to improve conversion after the click, study ",
            },
            {
              type: "link",
              text: "how to get customers online",
              href: "/growth-guides/how-to-get-customers-online",
            },
            {
              type: "text",
              text: " to connect traffic growth with revenue outcomes.",
            },
          ],
        ],
        bullets: [
          "Map high-intent topics before producing new content.",
          "Improve page hierarchy, titles, headings, and internal links.",
          "Create supporting assets that move visitors from question to inquiry.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Increase Website Traffic",
        paragraphs: [
          "You do not need dozens of new pages on day one. You need a prioritized execution list that improves crawlability, relevance, and conversion potential.",
        ],
        bullets: [
          "Audit your top five pages for speed, title clarity, H1 relevance, and weak calls to action.",
          "Build one page for each core service or offer instead of grouping everything into one broad page.",
          "Publish FAQ-style content that answers objections buyers search before they contact you.",
          "Link related pages together so authority flows through the site instead of stopping on isolated pages.",
          "Track organic sessions, contact clicks, and form submissions by landing page.",
        ],
      },
      {
        id: "traffic-vow-cta",
        title: "Use Uxellent to Turn Traffic Into a Growth Engine",
        paragraphs: [
          [
            {
              type: "text",
              text: "If you want help turning traffic into qualified demand, an ",
            },
            {
              type: "link",
              text: "online marketing agency",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " like Uxellent combines AI SEO strategy, execution, and measurement with a clear monthly roadmap.",
            },
          ],
          "You can review the SEO/AI offer, run the Auditor flow, or keep learning from related guides before choosing the right next step.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "See the service page behind Uxellent's growth and visibility framework.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "Start the English Auditor flow to review growth opportunities.",
            external: true,
          },
          {
            label: "Read: How to Improve Website SEO",
            href: "/growth-guides/how-to-improve-website-seo",
            description: "Learn how to strengthen rankings by improving your existing pages.",
          },
          {
            label: "Read: How to Get Leads",
            href: "/growth-guides/how-to-get-leads",
            description: "See how traffic, offer clarity, and follow-up work together.",
          },
          {
            label: "Read: How to Get Customers Online",
            href: "/growth-guides/how-to-get-customers-online",
            description: "Focus on turning online demand into actual sales conversations.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "traffic-faq-1",
        question: "How can I get traffic to my website?",
        answer:
          "Getting traffic to your website requires a mix of SEO, content, and distribution. The key is not just bringing visitors, but attracting the right audience that is actually interested in your offer.",
      },
      {
        id: "traffic-faq-2",
        question: "How can I get traffic to my website fast?",
        answer:
          "The fastest way is through paid ads (Google Ads, social media), partnerships, and existing audiences. However, fast traffic does not always mean quality traffic, so your page must be ready to convert.",
      },
      {
        id: "traffic-faq-3",
        question: "How can I get website traffic without social media?",
        answer:
          "You can rely on SEO, Google search, email marketing, and partnerships. Many high-quality traffic sources do not depend on social media at all.",
      },
      {
        id: "traffic-faq-4",
        question: "How can beginners get traffic to their website?",
        answer:
          "Start with simple SEO: target specific keywords, create useful content, and make sure your website is clear and easy to navigate. Avoid trying too many channels at once.",
      },
      {
        id: "traffic-faq-5",
        question: "How can I get traffic without paying for ads?",
        answer:
          "Organic traffic comes from SEO, blog content, and consistent publishing. It takes time, but builds a stable long-term source of visitors.",
      },
      {
        id: "traffic-faq-6",
        question: "What is the difference between traffic and conversions?",
        answer:
          "Traffic is the number of visitors. Conversions happen when visitors take action. Many websites have traffic but fail to convert because the message or offer is not clear.",
      },
      {
        id: "traffic-faq-7",
        question: "How do I increase traffic to my website consistently?",
        answer:
          "Consistency comes from a system: ongoing SEO content, internal linking, and improving existing pages over time. It is not about one viral post.",
      },
      {
        id: "traffic-faq-8",
        question: "Why is my website not getting traffic?",
        answer:
          "Common reasons include poor SEO, lack of content, targeting the wrong keywords, or no distribution strategy. Without visibility, even a good website will not get visitors.",
      },
      {
        id: "traffic-faq-9",
        question: "How do I drive traffic using SEO?",
        answer:
          "Focus on search intent, not just keywords. Create pages that answer real questions, structure content properly, and build internal links between related topics.",
      },
      {
        id: "traffic-faq-10",
        question: "Can I use platforms like Pinterest to drive traffic?",
        answer:
          "Yes, visual platforms like Pinterest can generate traffic, especially for certain industries. However, they work best when combined with strong landing pages and clear messaging.",
      },
      {
        id: "traffic-faq-11",
        question: "How long does it take to get traffic to a website?",
        answer:
          "Paid traffic can start immediately. SEO usually takes a few months. A balanced strategy combines both short-term and long-term channels.",
      },
      {
        id: "traffic-faq-12",
        question: "What is the best source of traffic for a business website?",
        answer:
          "There is no single best source. The most effective approach is combining SEO, paid ads, and conversion-focused landing pages into one system.",
      },
    ],
    ctaTitle: "Ready to build traffic that compounds?",
    ctaSubtitle:
      "Use Uxellent to connect technical SEO, content strategy, and AI search visibility to real lead growth.",
    relatedSlugs: [
      "how-to-improve-website-seo",
      "how-to-get-leads",
      "how-to-get-customers-online",
    ],
  },
  {
    slug: "how-to-improve-website-seo",
    keyword: "How to Improve Website SEO",
    metaDescription:
      "How to improve website SEO with better page structure, stronger intent coverage, and technical fixes that support rankings and conversions.",
    shortDescription:
      "A focused guide to improving existing pages so they rank better and convert more of the right visitors.",
    heroIntro:
      "How to improve website SEO is usually less about hacks and more about clarity, structure, and content depth that matches what buyers need.",
    heroTags: ["On-page SEO", "Technical SEO", "Search intent", "Internal links"],
    sections: [
      {
        id: "seo-problem",
        title: "Why How to Improve Website SEO Often Stalls",
        paragraphs: [
          "Many businesses already have pages indexed, but those pages are too shallow, too similar to each other, or too weak structurally to compete.",
          [
            {
              type: "text",
              text: "Search engines reward pages that are clear, useful, and supported by the rest of the site. If your goal is faster movement, combine this work with ",
            },
            {
              type: "link",
              text: "how to rank on Google fast",
              href: "/growth-guides/how-to-rank-on-google-fast",
            },
            {
              type: "text",
              text: " so you prioritize the pages closest to winning.",
            },
          ],
        ],
        bullets: [
          "Titles and headings do not clearly express search intent.",
          "Pages lack trust signals, examples, FAQs, or proof.",
          "Internal links are missing, so important pages are isolated.",
        ],
      },
      {
        id: "seo-solution",
        title: "How to Improve Website SEO With Better Relevance",
        paragraphs: [
          [
            {
              type: "text",
              text: "Start by identifying the pages already closest to ranking. Those are the fastest wins. A ",
            },
            {
              type: "link",
              text: "website ranking service",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: " can help prioritize which pages to improve first, then fill content gaps and make the value proposition obvious within the first screen.",
            },
          ],
          [
            {
              type: "text",
              text: "Then strengthen topical coverage around each page with supporting answers, case studies, and contextual internal links. This becomes even more valuable when you're also thinking about ",
            },
            {
              type: "link",
              text: "how to get traffic to your website",
              href: "/growth-guides/how-to-get-traffic-to-my-website",
            },
            {
              type: "text",
              text: " because stronger SEO improvements support both ranking and discovery.",
            },
          ],
        ],
        bullets: [
          "Upgrade what already has impressions before creating too much net-new content.",
          "Use subheadings to answer the exact questions behind the keyword.",
          "Support commercial pages with educational pages and clear navigation paths.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Improve Website SEO This Quarter",
        paragraphs: [
          "Treat SEO improvements like product iterations. The goal is not volume for its own sake but stronger pages that deserve to rank and convert.",
        ],
        bullets: [
          "Rewrite page titles and H1s so they match the real query and business outcome.",
          "Add sections for pain points, process, proof, FAQs, and next steps on core pages.",
          "Fix weak internal linking by connecting each important page to related guides and service pages.",
          "Improve crawlability by cleaning duplicate pages, thin pages, and broken links.",
          "Measure rankings together with qualified conversions, not rankings alone.",
        ],
      },
      {
        id: "seo-vow-cta",
        title: "Let Uxellent Prioritize the SEO Work That Matters",
        paragraphs: [
          [
            {
              type: "text",
              text: "A ",
            },
            {
              type: "link",
              text: "digital marketing agency",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " with SEO focus like Uxellent helps teams improve website SEO by combining audits, execution, content upgrades, and AI search readiness into one operating model.",
            },
          ],
          "Use the links below to review the growth offer, open Auditor, or continue with related guides on ranking and online growth.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "Review the full service structure for improving rankings and visibility.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "See how Auditor can help surface SEO and growth priorities.",
            external: true,
          },
          {
            label: "Read: How to Rank on Google Fast",
            href: "/growth-guides/how-to-rank-on-google-fast",
            description: "Learn where fast ranking gains usually come from.",
          },
          {
            label: "Read: How to Grow Small Business Online",
            href: "/growth-guides/how-to-grow-small-business-online",
            description: "Connect SEO improvements with broader digital growth strategy.",
          },
          {
            label: "Read: How to Get Traffic to Your Website",
            href: "/growth-guides/how-to-get-traffic-to-my-website",
            description: "Turn SEO improvements into a steady traffic engine.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "seo-faq-1",
        question: "Should I update old pages or create new ones first?",
        answer:
          "In most cases, update the pages already getting impressions first. They are usually closer to producing results than brand-new pages.",
      },
      {
        id: "seo-faq-2",
        question: "Does technical SEO matter if my content is weak?",
        answer:
          "Yes, but technical fixes alone rarely solve the problem. Strong SEO comes from technical health plus content that matches intent and drives action.",
      },
      {
        id: "seo-faq-3",
        question: "How often should I revisit page optimization?",
        answer:
          "Review core pages monthly or quarterly. Rankings, competitors, and AI-driven search behavior change faster than most teams expect.",
      },
    ],
    ctaTitle: "Want a cleaner SEO roadmap?",
    ctaSubtitle:
      "Use Uxellent to decide what to fix first, what to build next, and how to measure the business impact.",
    relatedSlugs: [
      "how-to-rank-on-google-fast",
      "how-to-grow-small-business-online",
      "how-to-get-traffic-to-my-website",
    ],
  },
  {
    slug: "how-to-get-leads",
    keyword: "How to Get Leads",
    metaDescription:
      "How to get leads with better positioning, search visibility, and conversion paths that move visitors into real conversations.",
    shortDescription:
      "A lead-generation guide for businesses that have traffic or channels but not enough qualified inquiries.",
    heroIntro:
      "How to get leads consistently depends on reaching the right people, giving them a clear reason to trust you, and making the next step obvious.",
    heroTags: ["Lead generation", "Conversion path", "Offer clarity", "Intent matching"],
    sections: [
      {
        id: "leads-problem",
        title: "Why How to Get Leads Becomes a Frustrating Loop",
        paragraphs: [
          "Many businesses spend time on marketing activity without fixing the offer, the page flow, or the lead capture path. That creates motion without momentum.",
          [
            {
              type: "text",
              text: "If your website does not answer the buyer's question quickly, visitors will compare, hesitate, and leave. Lead generation also suffers when you have not clarified ",
            },
            {
              type: "link",
              text: "how to promote my business online",
              href: "/growth-guides/how-to-promote-my-business-online",
            },
            {
              type: "text",
              text: " in a way that matches what buyers are actually searching for.",
            },
          ],
        ],
        bullets: [
          "Traffic sources are too broad, so the audience is poorly matched.",
          "Landing pages talk about the business instead of the customer's outcome.",
          "Calls to action are generic and disconnected from buyer intent.",
        ],
      },
      {
        id: "leads-solution",
        title: "How to Get Leads With Better Offer and Page Fit",
        paragraphs: [
          [
            {
              type: "text",
              text: "Lead generation improves when each page is built around one concrete problem, one audience, and one next step. A visitor should immediately know who the page is for and what happens after they click. ",
            },
            {
              type: "link",
              text: "SEO services for small business",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: " that focus on conversion paths often deliver better qualified leads.",
            },
          ],
          [
            {
              type: "text",
              text: "Pair that with search-led acquisition, proof, FAQ content, and fast follow-up, and the site stops being a brochure and starts acting like a sales asset. That is especially important if you want to learn ",
            },
            {
              type: "link",
              text: "how to get customers online",
              href: "/growth-guides/how-to-get-customers-online",
            },
            {
              type: "text",
              text: " instead of collecting low-intent inquiries.",
            },
          ],
        ],
        bullets: [
          "Align traffic source, page promise, and CTA around the same intent.",
          "Use proof, examples, and trust markers to reduce hesitation.",
          "Build forms and booking flows that feel like the natural next step.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Get More Qualified Leads",
        paragraphs: [
          "Lead growth is rarely one big change. It usually comes from stacking smaller improvements that reduce friction and increase intent match.",
        ],
        bullets: [
          "Create dedicated landing pages for each core service, audience, or industry.",
          "Rewrite page openings so they lead with pain, outcome, and timing instead of company background.",
          "Add FAQs that answer objections before a visitor needs to ask them.",
          "Use form labels and CTA text that describe the value of responding, not just the action.",
          "Measure lead quality by page, keyword, and source so you know what actually converts.",
        ],
      },
      {
        id: "leads-vow-cta",
        title: "Use Uxellent to Build a Lead System, Not Just More Activity",
        paragraphs: [
          [
            {
              type: "text",
              text: "Uxellent helps teams get leads by upgrading the pages, funnels, and search visibility that create qualified demand over time. ",
            },
            {
              type: "link",
              text: "Digital marketing services",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " that focus on conversion paths often deliver faster results than scattered marketing activity.",
            },
          ],
          "From AI SEO to Auditor and related growth guides, the goal is to help you choose the fastest route to a stronger pipeline.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "See how Uxellent connects traffic, content, and qualified lead generation.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "Review funnel and growth opportunities in the Auditor flow.",
            external: true,
          },
          {
            label: "Read: How to Promote My Business Online",
            href: "/growth-guides/how-to-promote-my-business-online",
            description: "Choose channels that support demand, not just visibility.",
          },
          {
            label: "Read: How to Get Clients Without Ads",
            href: "/growth-guides/how-to-get-clients-without-ads",
            description: "Build a lead engine that does not depend on paid budget.",
          },
          {
            label: "Read: How to Get Customers Online",
            href: "/growth-guides/how-to-get-customers-online",
            description: "Move from inquiries to real customer acquisition.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "leads-faq-1",
        question: "What is the difference between traffic and leads?",
        answer:
          "Traffic is attention. Leads are visitors who show buying intent by submitting a form, booking a call, or taking another meaningful next step.",
      },
      {
        id: "leads-faq-2",
        question: "Should I use one page for all services?",
        answer:
          "Usually no. Separate pages for separate services or audiences create stronger relevance, clearer messaging, and better conversion paths.",
      },
      {
        id: "leads-faq-3",
        question: "How do I know if my leads are low quality?",
        answer:
          "If many inquiries are a poor fit, the problem is often broad targeting, weak page positioning, or CTAs that attract curiosity instead of intent.",
      },
    ],
    ctaTitle: "Need more qualified inquiries?",
    ctaSubtitle:
      "Use Uxellent to improve the pages, search visibility, and conversion paths that create real pipeline.",
    relatedSlugs: [
      "how-to-promote-my-business-online",
      "how-to-get-clients-without-ads",
      "how-to-get-customers-online",
    ],
  },
  {
    slug: "how-to-promote-my-business-online",
    keyword: "How to Promote My Business Online",
    metaDescription:
      "How to promote my business online with a balanced mix of SEO, authority content, and conversion-focused pages that grow demand.",
    shortDescription:
      "A guide for choosing digital promotion channels that build momentum instead of scattered activity.",
    heroIntro:
      "How to promote my business online effectively means choosing channels that match your buyers, your offer, and your ability to follow through consistently.",
    heroTags: ["Online promotion", "Channel strategy", "SEO", "Demand generation"],
    sections: [
      {
        id: "promote-problem",
        title: "Why How to Promote My Business Online Feels Overwhelming",
        paragraphs: [
          "Business owners are usually told to post more, advertise more, and be active everywhere. That advice creates fragmentation, not growth.",
          [
            {
              type: "text",
              text: "When promotion is not tied to a clear message and destination page, attention gets wasted. You might get impressions, but not meaningful demand, which is why it helps to understand ",
            },
            {
              type: "link",
              text: "how to get leads",
              href: "/growth-guides/how-to-get-leads",
            },
            {
              type: "text",
              text: " before expanding into more channels.",
            },
          ],
        ],
        bullets: [
          "Too many channels dilute budget, time, and consistency.",
          "The business message changes from page to page and offer to offer.",
          "Promotion drives clicks to pages that are not built to convert.",
        ],
      },
      {
        id: "promote-solution",
        title: "How to Promote My Business Online With Better Focus",
        paragraphs: [
          [
            {
              type: "text",
              text: "Start with the channels where intent is already visible. ",
            },
            {
              type: "link",
              text: "Web search optimization",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: " is usually one of the strongest because people are actively looking for a solution.",
            },
          ],
          [
            {
              type: "text",
              text: "From there, support your core pages with educational content, case studies, and trust assets. Promotion works best when it reinforces the same positioning across every touchpoint, especially if you are also planning ",
            },
            {
              type: "link",
              text: "how to grow small business online",
              href: "/growth-guides/how-to-grow-small-business-online",
            },
            {
              type: "text",
              text: " with a limited team and budget.",
            },
          ],
        ],
        bullets: [
          "Focus on one to three channels that align with buying intent.",
          "Send every campaign or content asset to a clear, audience-specific page.",
          "Use SEO and AI search visibility as assets that keep working after the campaign ends.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Promote Your Business Online",
        paragraphs: [
          "The goal is not simply more visibility. It is more of the right visibility connected to stronger conversion outcomes.",
        ],
        bullets: [
          "Define the top offers and audiences you want to promote this quarter.",
          "Create landing pages or service pages that match those offers exactly.",
          "Build supporting content that answers high-intent questions around each offer.",
          "Add social proof, case studies, and FAQs to reduce friction.",
          "Review performance by lead quality, not just reach or clicks.",
        ],
      },
      {
        id: "promote-vow-cta",
        title: "Promote Smarter With Uxellent's Growth Stack",
        paragraphs: [
          [
            {
              type: "text",
              text: "An ",
            },
            {
              type: "link",
              text: "internet marketing agency",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " like Uxellent helps businesses promote online with a clearer system: better pages, stronger SEO, AI search readiness, and measurement tied to results.",
            },
          ],
          "Use the service page, Auditor, and related guides below to decide whether you need visibility, better conversion, or both.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "See how Uxellent approaches organic visibility and demand capture.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "Start an Auditor review to identify the biggest growth gaps.",
            external: true,
          },
          {
            label: "Read: How to Grow Small Business Online",
            href: "/growth-guides/how-to-grow-small-business-online",
            description: "Turn promotion into a broader digital growth model.",
          },
          {
            label: "Read: How to Get Leads",
            href: "/growth-guides/how-to-get-leads",
            description: "Improve the pages and funnels behind your campaigns.",
          },
          {
            label: "Read: How to Get Clients Without Ads",
            href: "/growth-guides/how-to-get-clients-without-ads",
            description: "See how to reduce dependence on paid acquisition.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "promote-faq-1",
        question: "Should I use SEO or social media first?",
        answer:
          "That depends on where intent is strongest. For many service businesses, SEO is a better foundation because buyers are actively searching for solutions.",
      },
      {
        id: "promote-faq-2",
        question: "How many channels should a small business focus on?",
        answer:
          "Usually one to three. Too many channels at once spread resources too thin and make it hard to learn what is truly working.",
      },
      {
        id: "promote-faq-3",
        question: "What makes online promotion convert better?",
        answer:
          "A strong message, a clear offer, a relevant destination page, and trust signals that reduce hesitation at the right moment.",
      },
    ],
    ctaTitle: "Want a cleaner promotion strategy?",
    ctaSubtitle:
      "Use Uxellent to connect visibility, conversion, and AI search into one repeatable growth system.",
    relatedSlugs: [
      "how-to-grow-small-business-online",
      "how-to-get-leads",
      "how-to-get-clients-without-ads",
    ],
  },
  {
    slug: "how-to-get-customers-online",
    keyword: "How to Get Customers Online",
    metaDescription:
      "How to get customers online by improving visibility, trust, and conversion paths from first click to booked conversation.",
    shortDescription:
      "A guide for businesses that want to turn digital traffic and interest into paying customers online.",
    heroIntro:
      "How to get customers online depends on more than clicks. You need the right audience, the right promise, and a website that moves buyers toward action.",
    heroTags: ["Customer acquisition", "Website conversion", "Trust signals", "Digital growth"],
    sections: [
      {
        id: "customers-problem",
        title: "Why How to Get Customers Online Feels Expensive",
        paragraphs: [
          "Online customer acquisition becomes expensive when every new customer depends on constant paid spend, weak landing pages, or manual follow-up.",
          [
            {
              type: "text",
              text: "If the site does not create trust fast, the business ends up paying for more and more attention just to get the same level of response. One way to reduce that waste is learning ",
            },
            {
              type: "link",
              text: "how to get leads",
              href: "/growth-guides/how-to-get-leads",
            },
            {
              type: "text",
              text: " from pages that are clearer about value and next steps.",
            },
          ],
        ],
        bullets: [
          "Traffic sources are expensive because the site does not convert well.",
          "The offer is unclear, so buyers compare and delay action.",
          "Pages do not guide visitors from awareness to decision.",
        ],
      },
      {
        id: "customers-solution",
        title: "How to Get Customers Online With Better Demand Capture",
        paragraphs: [
          [
            {
              type: "text",
              text: "Customer acquisition improves when search visibility, page messaging, and conversion design work together. ",
            },
            {
              type: "link",
              text: "Website seo services",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: " that integrate these elements create more efficient demand capture instead of buying every click from scratch.",
            },
          ],
          [
            {
              type: "text",
              text: "Focus on the pages people visit before they buy. Those pages should answer objections, show proof, explain the process, and point clearly to the next step. For stronger acquisition, pair this with ",
            },
            {
              type: "link",
              text: "how to get traffic to your website",
              href: "/growth-guides/how-to-get-traffic-to-my-website",
            },
            {
              type: "text",
              text: " so the right people actually reach those pages.",
            },
          ],
        ],
        bullets: [
          "Strengthen acquisition pages before increasing traffic spend.",
          "Reduce uncertainty with transparent process, proof, and FAQs.",
          "Support decision-making with educational content and internal links.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Get Customers Online More Reliably",
        paragraphs: [
          "The simplest way to improve customer acquisition is to reduce friction at every stage of the online journey.",
        ],
        bullets: [
          "Identify the top pages visited before a sale and improve those first.",
          "Add stronger benefit-led copy and outcome-focused proof above the fold.",
          "Use comparison, FAQ, and process sections to lower buying hesitation.",
          "Make the call to action specific so buyers know what happens next.",
          "Track inquiry-to-sale quality so you optimize for customers, not just leads.",
        ],
      },
      {
        id: "customers-vow-cta",
        title: "Use Uxellent to Improve Online Customer Acquisition",
        paragraphs: [
          [
            {
              type: "text",
              text: "Uxellent helps businesses get customers online by combining SEO visibility, clearer pages, and better funnel structure into one growth operating model. ",
            },
            {
              type: "link",
              text: "Digital marketing services",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " that integrate conversion and visibility often produce better customer acquisition outcomes.",
            },
          ],
          "Review the SEO/AI page, open Auditor, or continue with related guides to sharpen the next move.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "See how Uxellent builds visibility that supports customer acquisition.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "Use Auditor to review customer-acquisition gaps and priorities.",
            external: true,
          },
          {
            label: "Read: How to Get Leads",
            href: "/growth-guides/how-to-get-leads",
            description: "Strengthen the inquiry stage before chasing more volume.",
          },
          {
            label: "Read: How to Get Traffic to Your Website",
            href: "/growth-guides/how-to-get-traffic-to-my-website",
            description: "Build a healthier top of funnel through search and content.",
          },
          {
            label: "Read: How to Grow Small Business Online",
            href: "/growth-guides/how-to-grow-small-business-online",
            description: "Connect acquisition to a bigger long-term growth strategy.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "customers-faq-1",
        question: "How can I get customers online?",
        answer:
          "Getting customers online requires a combination of the right traffic, a clear offer, and a page that converts. Most businesses fail not because of lack of traffic, but because their message and offer do not match what customers are looking for.",
      },
      {
        id: "customers-faq-2",
        question: "How can I get customers online for free?",
        answer:
          "You can get customers online for free using SEO, content, and organic social media. However, free traffic takes time. The fastest results usually come from combining organic strategies with paid campaigns.",
      },
      {
        id: "customers-faq-3",
        question: "What is the best way to market a business online?",
        answer:
          "The best approach is not one channel, but a system: SEO for long-term traffic, PPC for immediate results, and optimized landing pages that convert visitors into leads.",
      },
      {
        id: "customers-faq-4",
        question: "How do I get customers online for my business specifically?",
        answer:
          "You need to focus on your audience and industry. A generic approach will not work. Build dedicated landing pages that speak directly to your customer's problem and desired outcome.",
      },
      {
        id: "customers-faq-5",
        question: "What is the difference between getting customers and getting traffic?",
        answer:
          "Traffic is just visitors. Customers come when your offer, message, and page experience align. Many businesses have traffic but no conversions because the page does not match intent.",
      },
      {
        id: "customers-faq-6",
        question: "How do I attract customers instead of just visitors?",
        answer:
          "Attracting customers means targeting intent-based keywords, creating relevant content, and guiding users with a clear next step. Your page should answer their exact need.",
      },
      {
        id: "customers-faq-7",
        question: "How can I get clients online consistently?",
        answer:
          "Consistency comes from building a system: SEO content, conversion-focused pages, and ongoing optimization. It is not about one campaign, it is about structure.",
      },
      {
        id: "customers-faq-8",
        question: "Why am I getting traffic but no leads?",
        answer:
          "Usually, it is one of three issues: wrong audience, weak offer, or poor page experience. Fixing alignment between these elements is key to converting traffic into leads.",
      },
      {
        id: "customers-faq-9",
        question: "Can I get customers online without paid ads?",
        answer:
          "Yes, but it takes time. SEO and content can generate consistent leads, but require patience and proper structure. Paid ads can accelerate results.",
      },
      {
        id: "customers-faq-10",
        question: "How long does it take to get customers online?",
        answer:
          "Paid campaigns can generate leads within days. SEO typically takes a few months. The best strategy combines both for short-term and long-term growth.",
      },
    ],
    ctaTitle: "Want more online customers, not just more clicks?",
    ctaSubtitle:
      "Use Uxellent to improve the pages and growth systems that convert attention into revenue.",
    relatedSlugs: [
      "how-to-get-leads",
      "how-to-get-traffic-to-my-website",
      "how-to-grow-small-business-online",
    ],
  },
  {
    slug: "how-to-rank-on-google-fast",
    keyword: "How to Rank on Google Fast",
    metaDescription:
      "How to rank on Google fast by targeting realistic queries, improving existing pages, and fixing site quality signals that hold rankings back.",
    shortDescription:
      "A realistic guide to getting faster ranking movement without relying on shortcuts that do not last.",
    heroIntro:
      "How to rank on Google fast usually means choosing the right opportunities and improving weak pages quickly, not chasing shortcuts that disappear in a month.",
    heroTags: ["Google rankings", "Quick wins", "On-page SEO", "Content refresh"],
    sections: [
      {
        id: "rank-problem",
        title: "Why How to Rank on Google Fast Is Often Misunderstood",
        paragraphs: [
          "Businesses often aim for highly competitive keywords before the site has enough authority, structure, or content quality to compete. That makes SEO feel slow even when there are easier wins nearby.",
          [
            {
              type: "text",
              text: "Fast ranking improvements usually come from fixing what already has potential: pages on page two, terms with low competition, and queries where your intent match is already close. That is why teams often pair this work with ",
            },
            {
              type: "link",
              text: "how to improve website SEO",
              href: "/growth-guides/how-to-improve-website-seo",
            },
            {
              type: "text",
              text: " before chasing harder keywords.",
            },
          ],
        ],
        bullets: [
          "Teams target vanity keywords instead of realistic, high-intent opportunities.",
          "Existing pages with impressions are ignored while new pages pile up.",
          "Weak titles, headings, and supporting content block quicker movement.",
        ],
      },
      {
        id: "rank-solution",
        title: "How to Rank on Google Fast With Smarter Prioritization",
        paragraphs: [
          [
            {
              type: "text",
              text: "The fastest ranking gains usually come from improving pages that already show signs of life. A ",
            },
            {
              type: "link",
              text: "website ranking service",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: " can help identify those pages - if Google is testing a page, better relevance and stronger structure can move it up faster than a new URL.",
            },
          ],
          [
            {
              type: "text",
              text: "Pair that with better internal linking, intent-specific subheadings, and pages built around lower-competition topics, and you create a faster feedback loop. Those gains are easier to sustain when you also know ",
            },
            {
              type: "link",
              text: "how to get traffic to your website",
              href: "/growth-guides/how-to-get-traffic-to-my-website",
            },
            {
              type: "text",
              text: " from adjacent high-intent topics.",
            },
          ],
        ],
        bullets: [
          "Prioritize keywords where your site already has impressions or partial visibility.",
          "Refresh weak content instead of publishing more generic pages.",
          "Use internal links to push authority toward the pages closest to ranking.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Rank on Google Faster",
        paragraphs: [
          "Speed in SEO comes from focused execution on opportunities that are close enough to move, not from trying to win every keyword at once.",
        ],
        bullets: [
          "Identify pages ranking in positions 8 to 25 and improve those first.",
          "Rewrite titles and H2s so they match the actual query more precisely.",
          "Add missing sections such as FAQs, examples, proof, and process details.",
          "Link from stronger pages to the target page using natural anchor text.",
          "Remove thin or duplicate content that confuses topical authority.",
        ],
      },
      {
        id: "rank-vow-cta",
        title: "Use Uxellent to Find the Fastest Ranking Opportunities",
        paragraphs: [
          [
            {
              type: "text",
              text: "A ",
            },
            {
              type: "link",
              text: "digital marketing agency",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " like Uxellent helps teams rank faster by focusing on pages that are closest to winning, then improving the technical, structural, and content signals that matter.",
            },
          ],
          "The links below point to the SEO/AI offer, the Auditor flow, and related guides that support ranking growth.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "See the SEO framework Uxellent uses to improve rankings systematically.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "Use Auditor to uncover the easiest ranking opportunities first.",
            external: true,
          },
          {
            label: "Read: How to Improve Website SEO",
            href: "/growth-guides/how-to-improve-website-seo",
            description: "Upgrade the fundamentals behind faster ranking movement.",
          },
          {
            label: "Read: How to Get Traffic to Your Website",
            href: "/growth-guides/how-to-get-traffic-to-my-website",
            description: "Turn ranking gains into sustainable traffic growth.",
          },
          {
            label: "Read: How to Get Clients Without Ads",
            href: "/growth-guides/how-to-get-clients-without-ads",
            description: "Use organic visibility to reduce acquisition costs.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "rank-faq-1",
        question: "Can you really rank on Google fast?",
        answer:
          "Yes, in some cases, but usually by improving realistic opportunities already within reach. Competitive terms and weak sites still take time.",
      },
      {
        id: "rank-faq-2",
        question: "What is the best fast-win SEO tactic?",
        answer:
          "Refreshing existing pages that already get impressions is often the fastest win because Google already knows the page exists.",
      },
      {
        id: "rank-faq-3",
        question: "Should I target broad or long-tail keywords first?",
        answer:
          "Long-tail and mid-tail queries are usually the smarter starting point because they have clearer intent and lower competition.",
      },
    ],
    ctaTitle: "Want faster ranking movement with less guesswork?",
    ctaSubtitle:
      "Use Uxellent to prioritize the pages and keywords that can move sooner and matter more.",
    relatedSlugs: [
      "how-to-improve-website-seo",
      "how-to-get-traffic-to-my-website",
      "how-to-get-clients-without-ads",
    ],
  },
  {
    slug: "how-to-grow-small-business-online",
    keyword: "How to Grow Small Business Online",
    metaDescription:
      "How to grow small business online with focused channels, stronger service pages, and search-driven systems that keep compounding.",
    shortDescription:
      "A practical guide for small businesses that need online growth without wasting time across too many channels.",
    heroIntro:
      "How to grow small business online becomes simpler when you narrow the channels, sharpen the message, and invest in assets that keep working over time.",
    heroTags: ["Small business growth", "SEO strategy", "Digital channels", "Compounding assets"],
    sections: [
      {
        id: "smallbiz-problem",
        title: "Why How to Grow Small Business Online Feels Slow",
        paragraphs: [
          "Small businesses usually do not have the budget or team to do everything at once. Growth slows when effort is split across too many disconnected tactics.",
          [
            {
              type: "text",
              text: "Without strong core pages and a reliable acquisition system, every month starts from zero. That makes digital growth feel expensive and unpredictable, especially if you still have not decided ",
            },
            {
              type: "link",
              text: "how to promote my business online",
              href: "/growth-guides/how-to-promote-my-business-online",
            },
            {
              type: "text",
              text: " with a realistic channel mix.",
            },
          ],
        ],
        bullets: [
          "Marketing activity is scattered across too many channels.",
          "The site does not clearly explain the offer or who it is for.",
          "There is no system for turning search demand into inquiries and sales.",
        ],
      },
      {
        id: "smallbiz-solution",
        title: "How to Grow Small Business Online With Compounding Work",
        paragraphs: [
          [
            {
              type: "text",
              text: "The best online growth strategy for a small business is usually a simple one: strong service pages, search-driven content, good follow-up, and a few channels you can maintain consistently. ",
            },
            {
              type: "link",
              text: "SEO services for small business",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: " that focus on these fundamentals often deliver the best long-term results.",
            },
          ],
          [
            {
              type: "text",
              text: "That approach builds assets that keep working. Better pages, better rankings, and better trust signals continue helping you even when ad spend changes. It also reinforces ",
            },
            {
              type: "link",
              text: "how to improve website SEO",
              href: "/growth-guides/how-to-improve-website-seo",
            },
            {
              type: "text",
              text: " as part of a broader growth model instead of a standalone task.",
            },
          ],
        ],
        bullets: [
          "Focus on offers and channels that create measurable business outcomes.",
          "Build pages that can rank, convert, and support follow-up at the same time.",
          "Use SEO and AI visibility as long-term leverage, not side projects.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Grow a Small Business Online",
        paragraphs: [
          "Small-business growth improves when the website becomes a working growth asset instead of a static brochure.",
        ],
        bullets: [
          "Clarify the top one to three services or offers driving revenue.",
          "Create or improve pages for each offer with better proof and clearer calls to action.",
          "Publish supporting content around common buyer questions and local or niche intent.",
          "Improve site speed, internal linking, and mobile clarity so users stay engaged.",
          "Review what channels produce qualified leads and cut the ones that create noise.",
        ],
      },
      {
        id: "smallbiz-vow-cta",
        title: "Use Uxellent to Build Online Growth That Lasts",
        paragraphs: [
          [
            {
              type: "text",
              text: "A ",
            },
            {
              type: "link",
              text: "marketing agency for small business",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " like Uxellent works with small businesses that need a practical system for visibility, lead generation, and SEO execution without unnecessary complexity.",
            },
          ],
          "Use the links below to explore the SEO/AI offer, open Auditor, or continue reading related growth guides.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "Review the service page for Uxellent's growth and visibility approach.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "Start the Auditor flow to identify growth priorities for your business.",
            external: true,
          },
          {
            label: "Read: How to Promote My Business Online",
            href: "/growth-guides/how-to-promote-my-business-online",
            description: "Choose channels that are realistic and profitable to maintain.",
          },
          {
            label: "Read: How to Get Customers Online",
            href: "/growth-guides/how-to-get-customers-online",
            description: "Strengthen the path from visibility to revenue.",
          },
          {
            label: "Read: How to Improve Website SEO",
            href: "/growth-guides/how-to-improve-website-seo",
            description: "Upgrade the pages that support long-term organic growth.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "smallbiz-faq-1",
        question: "What is the best online growth channel for a small business?",
        answer:
          "There is no one answer, but SEO is often one of the most efficient long-term channels because it compounds instead of resetting every month.",
      },
      {
        id: "smallbiz-faq-2",
        question: "Can a small business grow online without a big content team?",
        answer:
          "Yes. A few high-quality pages and consistent updates usually outperform a large amount of low-value content.",
      },
      {
        id: "smallbiz-faq-3",
        question: "What should a small business measure first?",
        answer:
          "Focus on qualified leads, sales conversations, and customer value by channel, not just reach or vanity traffic numbers.",
      },
    ],
    ctaTitle: "Need a simpler path to digital growth?",
    ctaSubtitle:
      "Use Uxellent to focus on the pages, channels, and SEO work that matter most for small-business growth.",
    relatedSlugs: [
      "how-to-promote-my-business-online",
      "how-to-get-customers-online",
      "how-to-improve-website-seo",
    ],
  },
  {
    slug: "how-to-get-clients-without-ads",
    keyword: "How to Get Clients Without Ads",
    metaDescription:
      "How to get clients without ads by building organic visibility, stronger authority pages, and a conversion path that creates steady inquiries.",
    shortDescription:
      "A guide for reducing dependence on paid media by building a more durable client-acquisition system.",
    heroIntro:
      "How to get clients without ads is about building trust and discoverability so the business can attract demand even when paid campaigns stop.",
    heroTags: ["Organic growth", "Client acquisition", "SEO strategy", "Authority building"],
    sections: [
      {
        id: "clients-problem",
        title: "Why How to Get Clients Without Ads Feels Risky",
        paragraphs: [
          "Paid ads create speed, but they can also hide structural problems. When ad spend drops and inquiries disappear, the business learns that it never built a durable acquisition system.",
          [
            {
              type: "text",
              text: "Getting clients without ads requires stronger positioning, discoverability, and trust because you are earning attention instead of renting it. That usually starts with understanding ",
            },
            {
              type: "link",
              text: "how to get traffic to your website",
              href: "/growth-guides/how-to-get-traffic-to-my-website",
            },
            {
              type: "text",
              text: " from high-intent search instead of paid campaigns alone.",
            },
          ],
        ],
        bullets: [
          "The website depends on paid traffic instead of organic demand.",
          "There is not enough content or proof to create trust without campaigns.",
          "Important pages are not structured to rank or convert consistently.",
        ],
      },
      {
        id: "clients-solution",
        title: "How to Get Clients Without Ads Through Organic Demand",
        paragraphs: [
          [
            {
              type: "text",
              text: "The most reliable path is to build pages around real search demand and improve ",
            },
            {
              type: "link",
              text: "web search engine ranking",
              href: "/en/lp/seo-services",
            },
            {
              type: "text",
              text: ", strengthen authority with proof and expertise, and create internal links that guide users toward contact.",
            },
          ],
          [
            {
              type: "text",
              text: "This does not mean stopping every campaign immediately. It means building an organic system that reduces dependence on ads month by month. To make that system stronger, combine it with ",
            },
            {
              type: "link",
              text: "how to get leads",
              href: "/growth-guides/how-to-get-leads",
            },
            {
              type: "text",
              text: " so your organic traffic converts into real pipeline.",
            },
          ],
        ],
        bullets: [
          "Invest in pages that solve the exact problems buyers search for.",
          "Publish expert content that builds trust before the sales call.",
          "Use SEO and AI search as distribution channels that keep compounding.",
        ],
      },
      {
        id: "guide-actions",
        title: "Action Steps to Get Clients Without Ads",
        paragraphs: [
          "The goal is not zero promotion. The goal is creating enough organic demand that paid media becomes optional instead of essential.",
        ],
        bullets: [
          "Audit your service pages and rewrite them for clarity, specificity, and trust.",
          "Create high-intent guides and FAQ content around buying-stage questions.",
          "Add testimonials, examples, and process details that reduce risk perception.",
          "Build internal links from educational content to service pages and inquiry points.",
          "Track which organic landing pages produce the best-fit leads over time.",
        ],
      },
      {
        id: "clients-vow-cta",
        title: "Use Uxellent to Build a Client Engine Beyond Paid Ads",
        paragraphs: [
          [
            {
              type: "text",
              text: "An ",
            },
            {
              type: "link",
              text: "online marketing agency",
              href: "/en/lp/digital-marketing",
            },
            {
              type: "text",
              text: " like Uxellent helps businesses reduce dependence on paid channels by improving SEO, AI visibility, authority content, and conversion structure.",
            },
          ],
          "The links below let you review the SEO/AI offer, open Auditor, and continue with related guides on traffic and leads.",
        ],
        links: [
          {
            label: "Explore Organic Marketing SEO / AI",
            href: SEO_AI_MARKETING_URL,
            description: "See how Uxellent builds organic visibility that keeps working over time.",
          },
          {
            label: "Open Auditor",
            href: AUDITOR_URL,
            description: "Use Auditor to identify what is blocking stronger organic acquisition.",
            external: true,
          },
          {
            label: "Read: How to Get Traffic to Your Website",
            href: "/growth-guides/how-to-get-traffic-to-my-website",
            description: "Build the top-of-funnel visibility needed for organic client growth.",
          },
          {
            label: "Read: How to Get Leads",
            href: "/growth-guides/how-to-get-leads",
            description: "Improve the path from organic attention to inquiry.",
          },
          {
            label: "Read: How to Rank on Google Fast",
            href: "/growth-guides/how-to-rank-on-google-fast",
            description: "Prioritize the ranking opportunities that can move sooner.",
          },
        ],
      },
    ],
    faq: [
      {
        id: "clients-faq-1",
        question: "Can I really get clients without ads?",
        answer:
          "Yes, but it usually requires stronger SEO, better pages, and a repeatable content and trust system. Organic demand is built, not switched on overnight.",
      },
      {
        id: "clients-faq-2",
        question: "What is the first step if I rely too much on paid campaigns?",
        answer:
          "Audit the pages and offers behind your campaigns. If those pages are weak, the same weakness will limit organic growth too.",
      },
      {
        id: "clients-faq-3",
        question: "How long does it take to reduce ad dependence?",
        answer:
          "That depends on market competition and your current site, but many businesses start seeing stronger organic support within a few months of focused SEO work.",
      },
    ],
    ctaTitle: "Want a steadier flow of clients without paying for every click?",
    ctaSubtitle:
      "Use Uxellent to build the organic visibility and trust assets that reduce ad dependence over time.",
    relatedSlugs: [
      "how-to-get-traffic-to-my-website",
      "how-to-get-leads",
      "how-to-rank-on-google-fast",
    ],
  },
 ] as const

const growthGuideContentBySlug = new Map(growthGuideContent.map((guide) => [guide.slug, guide] as const))

export const growthGuides: readonly GrowthGuide[] = growthGuideTopics.map((topic) => {
  const content = growthGuideContentBySlug.get(topic.slug)

  if (!content) {
    throw new Error(`Missing growth guide content for slug: ${topic.slug}`)
  }

  return {
    ...content,
    slug: topic.slug,
    keyword: topic.title,
    shortDescription: topic.description,
    relatedSlugs: [...topic.related],
  }
})

export const growthGuideSlugs = growthGuideTopics.map((guide) => guide.slug)

export function getGrowthGuide(slug: string) {
  return growthGuides.find((guide) => guide.slug === slug)
}
