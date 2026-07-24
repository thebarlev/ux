# Server / Client Boundary

## Server-only (NEVER import in "use client" components)
- `lib/supabase/admin.ts` - Supabase admin client
- `lib/captcha/verify.ts` - reCAPTCHA server verification
- `lib/checkout/createCheckout.ts` - Checkout logic
- `lib/payments/cardcom.ts` - Cardcom payment integration
- All `app/api/**/route.ts` - API route handlers

These files use `import "server-only"` - importing them in client code will fail at build.

## Client-safe (safe to import in "use client" components)
- `lib/tracking/*` - attribution, dataLayer, pageContext, events
- `lib/captcha/useRecaptcha.ts` - on-demand reCAPTCHA loader
- `lib/utils.ts` - cn()
- `lib/twMerge.ts` - tailwind merge
- `lib/growth-guides/topics.ts` - static data

## Cross-import rule
- Client modules MUST NOT import from server modules
- Server modules MAY import from other server modules only
