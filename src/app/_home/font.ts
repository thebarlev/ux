import { Heebo } from "next/font/google"

// Heebo, Hebrew + Latin, only the weights the design uses; next/font preloads
// them and serves them with font-display: swap.
export const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heebo",
})
