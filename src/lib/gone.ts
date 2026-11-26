import "server-only"

/**
 * AV-936: the old VOW checkout (/api/checkout, /api/cardcom/*) is removed on
 * purpose. 410 Gone says so (a silent 404 does not). One purchase path: the
 * platform.
 *
 * ‼️ The request is never read: no body, no headers, no log line. Whatever
 * the old Cardcom webhook used to receive is not parsed or written anywhere.
 */
function gone(): Response {
  return new Response(null, { status: 410, headers: { "Cache-Control": "no-store" } })
}

export const GET = gone
export const HEAD = gone
export const POST = gone
export const PUT = gone
export const PATCH = gone
export const DELETE = gone
export const OPTIONS = gone
