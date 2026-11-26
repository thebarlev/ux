/**
 * dhh: the visitor's country, for the first price list the marketing site
 * shows. Display only: it never decides tax, which comes from the billing
 * details (the owner's rule: no IP, no language). Only the two-letter code
 * Vercel already resolved; no IP, no log, no cookie, never cached.
 */
export const dynamic = "force-dynamic"

export function GET(request: Request) {
  const raw = request.headers.get("x-vercel-ip-country") ?? ""
  const country = /^[A-Z]{2}$/.test(raw) ? raw : null
  return Response.json({ country }, { headers: { "Cache-Control": "no-store" } })
}
