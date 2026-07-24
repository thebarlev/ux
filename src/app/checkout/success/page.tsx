import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">התשלום התקבל</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              תודה! ניתן להמשיך הלאה או לחזור לעמוד הבית.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/">חזרה ללנדינג</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pricing">לתמחור</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

