# Bundle Analysis Report

## BEFORE

### Total JS (homepage critical path)
- Root chunks: polyfills 112KB + webpack 4KB + 3c5e7735 196KB + 2762 184KB + main-app 4KB ≈ 500KB
- Framework: 188KB
- Main: 132KB
- Shared chunks 68bc8113 + 3e92710c: 360KB (posthog-js)
- App layout + page: variable
- **Estimated initial load: ~1.2MB+ (uncompressed)**

### Top 10 Largest Modules (BEFORE)
1. react-dom (Next compiled): 193.8KB
2. **posthog-js: 176.6KB** (x2 duplicate)
3. react-dom: 170.5KB
4. zod: 29.4KB
5. react-hook-form: 26.2KB
6. tailwind-merge: 25.2KB
7. react-server-dom-webpack: 23.2KB
8. next router: 22.0KB
9. @radix-ui/react-select: 18.1KB
10. zod (classic): 14.0KB

### Problems Detected
- **posthog-js 177KB** bundled via instrumentation-client (dynamic import still creates chunk loaded on every page)
- posthog appeared twice (duplicate in different chunks)
- GTM/FB/GA already moved to DeferredScripts (script injection) - OK
- reCAPTCHA already on-demand - OK

---

## AFTER

### Total JS (homepage critical path)
- **posthog-js chunks removed: -360KB**
- PostHog now loads via script injection in DeferredScripts (CDN, not in bundle)

### Top 10 Largest Modules (AFTER)
1. react-dom (Next compiled): 193.8KB
2. react-dom: 170.5KB
3. zod: 29.4KB
4. react-hook-form: 26.2KB
5. tailwind-merge: 25.2KB
6. react-server-dom-webpack: 23.2KB
7. next router: 22.0KB
8. @radix-ui/react-select: 18.1KB
9. zod (classic): 14.0KB
10. @radix-ui/react-menu: 12.9KB

### Reduction
- **~360KB removed** (posthog-js eliminated from bundle)
- **~30% reduction** in third-party analytics JS
- PostHog loads from CDN after window.load (same behavior, zero bundle cost)

---

## CHANGES

### Files Modified
- `src/components/DeferredScripts.tsx` - Added PostHog script injection (loads from CDN)
- `instrumentation-client.ts` - Removed posthog-js import (now empty)
- `src/app/layout.tsx` - Added preconnect for us-assets.i.posthog.com
- `next.config.ts` - Added @next/bundle-analyzer (enabled when ANALYZE=true)
- `package.json` - Removed posthog-js dependency, added build:analyze script

### Components Converted to Dynamic
(Already done in prior optimization)
- LeadPopupHost, WhatsAppButton, Popup, PopupEN
- SuccessSection, Testimonials, AboutSection, GreenInvoiceSection, PackagesSection, FaqSection, GrowthGuidesCard

### Libraries Removed
- **posthog-js** - Replaced with CDN script injection

### Third-Party Isolation
- GTM, GA, FB Pixel: Script injection only (DeferredScripts)
- PostHog: Script injection only (DeferredScripts)
- reCAPTCHA: On-demand load (useRecaptcha hook)

---

## VALIDATION
- Build: ✓ Success
- No broken imports
- No runtime errors
- PostHog tracking: Loads via script after window.load, same init config
