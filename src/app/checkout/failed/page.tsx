import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">התשלום נכשל</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              זה קורה לפעמים. אפשר לנסות שוב דרך עמוד התמחור.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/pricing">נסו שוב</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">חזרה ללנדינג</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

