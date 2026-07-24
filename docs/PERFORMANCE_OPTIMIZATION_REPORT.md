# Performance Optimization Report

**Date:** March 2025  
**Scope:** Full performance pass for Lighthouse mobile, JS reduction, LCP/TBT improvement

---

## A. Findings

### Third-party scripts (pre-optimization)
| Script | Load timing | Size (est.) | Issues |
|--------|-------------|-------------|--------|
| GTM | Deferred (interaction/idle) | ~281 KB | OK – already deferred |
| gtag/GA | Same as GTM | ~100 KB | **Duplicate** – GTM typically manages GA; loading both = wasted bytes |
| FB Pixel | Same batch | ~40 KB | OK – deferred; preconnect downgraded to dns-prefetch |
| PostHog | Same batch | ~177 KB | Surveys, autocapture, feature flags loaded by default – not needed on marketing |

### First-party
- Homepage already uses dynamic imports for below-fold sections (SuccessSection, Testimonials, AboutSection, etc.)
- ServiceHero, Hero, HeroEN use `priority` + `fetchPriority="high"` – good
- VisionToExecutionSection above fold; images use correct `sizes` – no change
- TrackingProvider pushes to dataLayer on mount – lightweight but can defer to idle

### Legacy JS
- No explicit `browserslist` – Next.js default targets broad compatibility (incl. legacy transforms)
- Polyfills and transforms for older browsers add ~45 KB

### Caching
- `/_next/static/*` and static assets already use `max-age=31536000, immutable` – good
- Third-party (GTM, FB, PostHog) cache TTLs cannot be controlled

---

## B. What Was Changed

### DeferredScripts.tsx
1. **GTM + GA deduplication:** Standalone gtag.js loads only when `NEXT_PUBLIC_GA_STANDALONE=true`. Default: GTM handles GA/Ads – saves ~100 KB duplicate.
2. **Phased loading:** GTM → FB (rAF) → PostHog (rIC) – reduces main-thread spikes.
3. **PostHog config:** `disable_surveys: true`, `autocapture: false`, `advanced_disable_feature_flags: true` – saves ~40–60 KB of PostHog logic.
4. **Idle callback timeout:** Increased to 4s (from 3s) to further delay analytics on slow devices.
5. **useRef for loaded state:** Prevents double-load on Strict Mode / remount.

### layout.tsx
1. **Preconnect:** FB and PostHog downgraded from preconnect to dns-prefetch – defers connection until scripts load.
2. **Font:** Added `display: "swap"` to Assistant – avoids FOIT, improves LCP.

### TrackingProvider.tsx
1. **Deferred push:** `vow_page_view` push moved to `requestIdleCallback` (1.5s timeout) – reduces main-thread work during hydration.

### package.json
1. **browserslist:** Added `["defaults", "fully supports es6-module", "not dead", "not ie 11"]` – targets modern browsers, reduces legacy polyfills (~45 KB).

---

## C. Files Changed

| File | Changes |
|------|---------|
| `src/components/DeferredScripts.tsx` | GA dedupe, phased loading, PostHog config, useRef |
| `src/app/layout.tsx` | Preconnect → dns-prefetch for FB/PostHog; font display: swap |
| `src/app/_components/tracking/TrackingProvider.tsx` | requestIdleCallback for dataLayer push |
| `package.json` | browserslist for modern targets |

---

## D. Why Each Change Improves Performance

| Change | Effect |
|--------|--------|
| Remove duplicate gtag when GTM present | **~100 KB** saved; single GA init via GTM |
| PostHog disable_surveys, autocapture, feature flags | **~40–60 KB** lighter PostHog bundle/behavior |
| Phased script loading (GTM → FB → PostHog) | Smoother main thread; analytics load progressively |
| dns-prefetch instead of preconnect for FB/PostHog | Less early connection work; scripts load on interaction anyway |
| Font display: swap | Prevents invisible text during font load; better LCP |
| TrackingProvider requestIdleCallback | Deferred dataLayer push reduces TBT during hydration |
| browserslist modern targets | **~45 KB** fewer polyfills and legacy transforms |

---

## E. Tradeoffs

| Tradeoff | Impact |
|----------|--------|
| **GA via GTM only** | If GTM container does not include GA4, set `NEXT_PUBLIC_GA_STANDALONE=true` to restore standalone gtag. |
| **PostHog autocapture off** | No automatic click/form capture; custom events via dataLayer/PostHog API still work. |
| **PostHog feature flags off** | Feature flags disabled on marketing pages; if used elsewhere, enable per route or via PostHog provider. |
| **PostHog surveys off** | Surveys will not load; re-enable if actively used. |
| **browserslist** | Very old browsers (e.g. IE11, very old Safari) may see more issues; acceptable for modern marketing sites. |

---

## F. Follow-up Recommendations

1. **GTM container:** Confirm GA4 and Google Ads tags are configured in GTM; remove standalone gtag usage.
2. **PostHog:** If surveys or feature flags are needed, load PostHog only on specific routes (e.g. app, checkout) and keep marketing pages with minimal config.
3. **Route-level analytics:** Consider loading PostHog only on `/contact`, `/checkout`, and conversion-focused pages.
4. **Image optimization:** Audit largest images (e.g. `5.webp`, `manvow.webp`); ensure appropriate `sizes` and format.
5. **Core Web Vitals monitoring:** Use RUM (e.g. Vercel Analytics, or custom) to track LCP, TBT, and CLS in production.

---

## G. Estimated Lighthouse Impact

| Metric | Before (est.) | After (est.) | Notes |
|--------|---------------|--------------|-------|
| **Unused JavaScript** | ~462 KB | ~250–300 KB | GA dedupe, PostHog config, browserslist |
| **LCP** | ~2.9 s | ~2.4–2.6 s | Font swap, no blocking scripts |
| **TBT** | ~350 ms | ~250–300 ms | Deferred analytics, idle TrackingProvider |
| **Performance score (mobile)** | Baseline | +5–10 pts | Depends on network and device |

---

## Top 5 Biggest Wins

1. **Remove duplicate gtag (~100 KB)** – Single GA init via GTM.
2. **PostHog optimization (~40–60 KB)** – Surveys, autocapture, feature flags disabled on marketing.
3. **browserslist modern targets (~45 KB)** – Fewer polyfills.
4. **Phased script loading** – Smoother main thread and less contention.
5. **Font display swap + deferred TrackingProvider** – Better LCP and TBT.

---

## Tracking Tools Still Hurting Performance

- **GTM (~281 KB):** Cannot be reduced without losing tags; already deferred. Consider pruning unused tags.
- **PostHog (~177 KB):** Loaded from CDN after interaction; size fixed by PostHog. Further gains require route-level loading.
- **FB Pixel (~40 KB):** Already deferred; no control over script size.
- **Third-party cache TTLs:** Cannot be improved from our side.
