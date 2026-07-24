import Link from "next/link"
import { H2 } from "@/components/ui/Heading"

export function BlogEndCta() {
  return (
    <section aria-label="קריאה לפעולה" className="mt-14">
      <div className="rounded-3xl border border-black/10 bg-white/60 px-6 py-8 sm:px-10 sm:py-10">
        <H2 className="w-full pb-0 text-right md:text-right">
          רוצים שנבדוק את התהליך בעסק?
        </H2>
        <p className="mt-4 text-pretty text-[18px] leading-[34px] text-[#747474] sm:text-[20px]">
          השאירו פרטים ונחזור עם כיוון ברור ומהלך פרקטי - בלי התחייבות.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          <Link href="/contact" className="vow-btn-primary w-full justify-center sm:w-auto">
            דברו איתנו
          </Link>
          <Link href="/contact" className="vow-btn-secondary w-full justify-center sm:w-auto">
            יצירת קשר
          </Link>
        </div>
      </div>
    </section>
  )
}

