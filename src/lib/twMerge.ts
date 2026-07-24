import { extendTailwindMerge } from "tailwind-merge"

/**
 * Extended twMerge that recognizes typography tokens when used elsewhere.
 * H2/H3 components use explicit values to avoid hydration mismatch.
 */
export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-h2", "text-h3"],
    },
  },
})
