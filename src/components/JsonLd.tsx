export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function articleSchema(params: {
  headline: string;
  description?: string;
  image?: string;
  url?: string;
  inLanguage?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const pageUrl = params.url
  const mainEntityOfPage = pageUrl
    ? {
        "@type": "WebPage",
        "@id": `${pageUrl.replace(/\/$/, "")}#webpage`,
        url: pageUrl,
      }
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description ?? params.headline,
    image: params.image,
    ...(mainEntityOfPage ? { mainEntityOfPage } : {}),
    inLanguage: params.inLanguage,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: { "@type": "Organization", name: "Uxellent" },
    publisher: {
      "@type": "Organization",
      name: "Uxellent",
      logo: { "@type": "ImageObject", url: "https://uxellent.com/logo.png" },
    },
  };
}

export function breadcrumbListSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.url,
    })),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\n/g, " ").replace(/\s+/g, " ").trim(),
      },
    })),
  };
}

export function webPageSchema(params: { name: string; description: string; url: string; dateModified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.name,
    description: params.description,
    url: params.url,
    dateModified: params.dateModified,
  };
}

export function itemListSchema(params: {
  name: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: params.name,
    url: params.url,
    itemListElement: params.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uxellent",
  url: "https://uxellent.com",
  logo: "https://uxellent.com/logo.png",
  sameAs: [
    "https://www.linkedin.com/company/vow",
    "https://www.facebook.com/profile.php?id=61587713103366",
    "https://www.instagram.com/vow.for.success",
    "https://x.com/Vowsuccess",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@uxellent.com",
    contactType: "customer service",
    availableLanguage: ["Hebrew", "English"],
  },
} as const;

/** Site-wide WebSite entity; no SearchAction (no public on-site search URL). */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uxellent",
  url: "https://uxellent.com",
  inLanguage: ["he-IL", "en"],
  publisher: {
    "@type": "Organization",
    name: "Uxellent",
    url: "https://uxellent.com",
  },
} as const;
