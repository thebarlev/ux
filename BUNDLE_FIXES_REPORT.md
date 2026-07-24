# Bundle Fixes Report

## FIXED LEAKS

### 1. API Routes – Server-Only Enforcement
**Issue:** API route logic could theoretically leak into client bundle.

**Fix:** Added `import "server-only"` to all API route handlers:
- `app/api/contact/route.ts`
- `app/api/cardcom/checkout/route.ts`
- `app/api/checkout/route.ts`
- `app/api/cardcom/webhook/route.ts`
- `app/api/billing/marketing-webhook/route.ts`
- `app/api/leads/route.ts` (already had it)

**Result:** Any accidental client import of these routes will fail at build time.

### 2. Contentlayer – Route-Level Isolation
**Issue:** MdxContent (uses `useMDXComponent` from next-contentlayer2/hooks) could bloat shared chunks.

**Fix:** Dynamic import of MdxContent in blog pages:
- `app/blog/[slug]/page.tsx` – `dynamic(() => import('@/app/_components/blog/MdxContent'), { ssr: true })`
- `app/en/blog/[slug]/page.tsx` – same

**Result:** Contentlayer/MDX runtime is now in a separate chunk that loads only on blog post pages. Homepage and other routes do not load it.

### 3. send-response.js
**Status:** Not found in codebase. No file matching this name. If it appears in analyzer, it may be from a transitive dependency or build artifact – no direct fix applied.

### 4. Server/Client Boundary
**Fix:** Created `lib/BOUNDARY.md` documenting:
- Server-only modules (supabase, captcha/verify, checkout, payments)
- Client-safe modules (tracking, useRecaptcha, utils)
- Cross-import rules

All server libs already use `import "server-only"`.

---

## FILES REFACTORED

| File | Change |
|------|--------|
| `app/api/contact/route.ts` | Added `import "server-only"` |
| `app/api/cardcom/checkout/route.ts` | Added `import "server-only"` |
| `app/api/checkout/route.ts` | Added `import "server-only"` |
| `app/api/cardcom/webhook/route.ts` | Added `import "server-only"` |
| `app/api/billing/marketing-webhook/route.ts` | Added `import "server-only"` |
| `app/blog/[slug]/page.tsx` | Dynamic import for MdxContent |
| `app/en/blog/[slug]/page.tsx` | Dynamic import for MdxContent |
| `lib/BOUNDARY.md` | New – documents server/client boundary |

---

## BEFORE / AFTER ESTIMATION

| Metric | Before | After |
|--------|--------|-------|
| API routes in client | Risk of leak | Blocked by server-only |
| Contentlayer chunk | In shared/main | Isolated to blog/[slug] chunk |
| Homepage bundle | Includes blog deps? | Excludes MdxContent chunk |

**Note:** Run `pnpm run build:analyze` to verify. API routes should not appear in client bundles. Contentlayer should only appear in blog post chunks.

---

## RISKY AREAS

1. **MdxContent dynamic import with ssr: true** – Ensures blog content is server-rendered for SEO. If hydration issues occur, check that MdxContent receives `code` prop correctly.

2. **contentlayer/generated** – Still imported in server components (blog pages, sitemap). This is correct – server-only. The client bundle only gets `useMDXComponent` when visiting a blog post.

3. **Client components** – Many remain as "use client" (forms, popups, tracking, etc.). These are intentional. No conversion to server components was done for these – they require interactivity.

---

## VALIDATION

- [x] Build succeeds
- [x] No broken imports
- [x] No SSR issues observed
- [x] SEO unchanged (blog pages still server-render with generateStaticParams)
