import type { NextConfig } from "next"
import { withContentlayer } from "next-contentlayer2"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

// tbl-028: old address -> new page, in both languages (the /en twin is added below)
const MOVED: Record<string, string> = {
  "/blog/fast-slow-web": "/blog/slow-site",
  "/blog/wordpress-vs-other": "/blog/wordpress-vs",
  "/blog/automatio-make": "/blog/automation",
  "/growth-guides": "/blog",
  "/growth-guides/how-to-get-traffic-to-my-website": "/blog/guide-traffic",
  "/growth-guides/how-to-improve-website-seo": "/blog/guide-seo",
  "/growth-guides/how-to-get-leads": "/blog/guide-leads",
  "/growth-guides/how-to-promote-my-business-online": "/blog/guide-promote",
  "/growth-guides/how-to-get-customers-online": "/blog/guide-clients",
  "/growth-guides/how-to-rank-on-google-fast": "/blog/guide-rank-fast",
  "/growth-guides/how-to-grow-small-business-online": "/blog/guide-small-business",
  "/growth-guides/how-to-get-clients-without-ads": "/blog/guide-no-ads",
  // the old "why us" page; "who it's for" is the page that replaces it
  "/why-us": "/for-who",
  "/who": "/for-who",
}

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    // Two root layouts ((he) and (en)) since 2026-10, so unmatched URLs need a
    // global 404: app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    qualities: [60, 75],
  },
  turbopack: {
    root: process.cwd(),
  },
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "vow.co.il" }],
      destination: "https://uxellent.com/:path*",
      permanent: true,
    },
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.vow.co.il" }],
      destination: "https://uxellent.com/:path*",
      permanent: true,
    },
    {
      source: "/:path*",
      has: [{ type: "host", value: "app.vow.co.il" }],
      destination: "https://app.uxellent.com/:path*",
      permanent: true,
    },
    {
      source: "/:path*",
      has: [{ type: "host", value: "dsign.vow.co.il" }],
      destination: "https://dsign.uxellent.com/:path*",
      permanent: true,
    },
    {
      // The review route for the current home page. Its composition is now the
      // home page itself, so the old path is folded into it rather than 404ing.
      // Spelled 301 rather than `permanent: true`, which Next emits as a 308.
      source: "/new-home",
      destination: "/",
      statusCode: 301,
    },
    {
      source: "/blog/ai-seo-engine",
      destination: "/blog/seo-ai-engine",
      permanent: true,
    },
    {
      // /en/seo-ai is retired (tbl-023), so this goes straight to /en, no chain
      source: "/en/seo",
      destination: "/en",
      statusCode: 301,
    },
    // ── redesign/marketing-2026-08 (design-review/approved-2026-08/redirect-map.html) ──
    // Old agency-service pages, folded into the new site. 301, not `permanent: true`
    // (which Next emits as 308) — see the /new-home entry above for why.
    // /pricing is deliberately absent: it keeps its URL with new content, like /.
    // /lp/ecommerce and /lp/services are deliberately absent too — pending Itzik's
    // call on whether their ad campaigns are still live (agent5-brief.md).
    { source: "/design", destination: "/", statusCode: 301 },
    { source: "/develop", destination: "/", statusCode: 301 },
    { source: "/develop-ai", destination: "/", statusCode: 301 },
    { source: "/idea-to-product", destination: "/", statusCode: 301 },
    { source: "/marketing", destination: "/", statusCode: 301 },
    { source: "/marketing/ppc", destination: "/", statusCode: 301 },
    // tbl-028: straight to the blog, where the growth guides now live (no chain)
    { source: "/marketing/seo-ai", destination: "/blog", statusCode: 301 },
    { source: "/seo-ai", destination: "/blog", statusCode: 301 },
    { source: "/roi", destination: "/", statusCode: 301 },
    // /checkout/success and /checkout/failed are Cardcom's return URLs and stay
    // real pages, so the package-id catch-all below must not swallow them.
    { source: "/checkout/:packageId((?!success$|failed$).+)", destination: "/", statusCode: 301 },
    // Startup-kit form dropped and no live /lp campaigns (Itzik, 2026-10-18).
    { source: "/thanks/startup-kit", destination: "/", statusCode: 301 },
    { source: "/lp/ecommerce", destination: "/", statusCode: 301 },
    { source: "/lp/services", destination: "/", statusCode: 301 },
    { source: "/lp/thank-you", destination: "/", statusCode: 301 },
    // Old agency pages retired (tbl-023, Itzik 20.10.2026): each goes to the home
    // page of its own language. `:path*` also covers anything below them
    // (/en/seo-ai/pricing). Relative destinations: nothing leaves uxellent.com.
    { source: "/about/:path*", destination: "/", statusCode: 301 },
    { source: "/portfolio/:path*", destination: "/", statusCode: 301 },
    { source: "/invoice/:path*", destination: "/", statusCode: 301 },
    { source: "/products/:path*", destination: "/", statusCode: 301 },
    { source: "/how-it-works/:path*", destination: "/", statusCode: 301 },
    { source: "/included/:path*", destination: "/", statusCode: 301 },
    { source: "/en/about/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/portfolio/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/invoice/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/idea-to-product/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/design/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/develop/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/develop-ai/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/account-ai/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/marketing/ppc/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/seo-ai/:path*", destination: "/en", statusCode: 301 },
    // tbl-024: the English redesign pages that had no Hebrew twin left, and /en/marketing
    { source: "/en/products/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/how-it-works/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/included/:path*", destination: "/en", statusCode: 301 },
    { source: "/en/marketing", destination: "/en", statusCode: 301 },
    // tbl-025: the two invoice/receipt articles are retired
    { source: "/blog/green-invoice", destination: "/blog", statusCode: 301 },
    { source: "/blog/negative-receipt", destination: "/blog", statusCode: 301 },
    { source: "/en/blog/green-invoice", destination: "/en/blog", statusCode: 301 },
    { source: "/en/blog/negative-receipt", destination: "/en/blog", statusCode: 301 },
    // tbl-028: the articles and growth guides have new addresses under /blog
    ...Object.entries(MOVED).flatMap(([from, to]) => [
      { source: from, destination: to, statusCode: 301 },
      { source: `/en${from}`, destination: `/en${to}`, statusCode: 301 },
    ]),
  ],
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
}

export default withBundleAnalyzer(withContentlayer(nextConfig))
