import type { Metadata } from "next"

import { StatusPage } from "@/app/_components/redesign/StatusPage"

export const metadata: Metadata = {
  title: "התשלום נכשל | Uxellent",
  description: "התשלום לא הושלם. ניתן לנסות שוב דרך עמוד התמחור של Uxellent ולהמשיך את תהליך הרכישה.",
  alternates: {
    canonical: "/checkout/failed",
  },
  robots: {
    index: false,
    follow: true,
  },
}

// Cardcom's FailedRedirectUrl (lib/payments/cardcom.ts).
export default function CheckoutFailedPage() {
  return (
    <StatusPage
      eyebrow="התשלום לא הושלם"
      title={["משהו השתבש,", "התשלום לא עבר"]}
      lede="לא חויבתם. אפשר לנסות שוב, או לכתוב לנו ל-support@uxellent.com ונעזור."
      primary={{ label: "נסו שוב", href: "/pricing" }}
      secondary={{ label: "חזרה לעמוד הבית", href: "/" }}
    />
  )
}
