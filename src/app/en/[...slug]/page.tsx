import { notFound } from "next/navigation"

/**
 * Catch-all route for /en/* paths that don't match any other route.
 * Explicitly calls notFound() so app/en/not-found.tsx is used instead of
 * the root app/not-found.tsx. Without this, unmatched URLs like /en/dsf
 * would fall back to the Hebrew 404 page.
 */
export default function EnCatchAllPage() {
  notFound()
}
