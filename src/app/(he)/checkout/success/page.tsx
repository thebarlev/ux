import type { Metadata } from "next"

import { StatusPage } from "@/app/_components/redesign/StatusPage"

export const metadata: Metadata = {
  title: "התשלום הצליח | Uxellent",
  description: "התשלום הושלם בהצלחה ב-Uxellent. מכאן אפשר לחזור לעמוד הבית או להמשיך לעמודי השירות הרלוונטיים.",
  alternates: {
    canonical: "/checkout/success",
  },
  robots: {
    index: false,
    follow: true,
  },
}

// Cardcom's SuccessRedirectUrl (lib/payments/cardcom.ts). The payment itself is
// recorded by the webhook (/api/cardcom/webhook), not by this page, so it only
// has to answer 200 to the browser redirect, with whatever query Cardcom adds.
export default function CheckoutSuccessPage() {
  return (
    <StatusPage
      eyebrow="התשלום התקבל"
      title={["תודה!", "התשלום הושלם בהצלחה"]}
      lede="קיבלנו את התשלום. אפשר להמשיך הלאה או לחזור לעמוד הבית."
      primary={{ label: "חזרה לעמוד הבית", href: "/" }}
      secondary={{ label: "לתמחור", href: "/pricing" }}
    />
  )
}
