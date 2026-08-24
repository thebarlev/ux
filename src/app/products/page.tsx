import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { PRODUCTS_HERO, PRODUCTS_FEATURES, PRODUCTS_CLOSER } from "@/app/_content/redesign/products"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/products" },
  title: "מוצרים | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: PRODUCTS_HERO.lede,
  openGraph: {
    title: "מוצרים | Uxellent",
    description: PRODUCTS_HERO.lede,
    url: "https://uxellent.com/products",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function ProductsPage() {
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={PRODUCTS_HERO.eyebrow} title={PRODUCTS_HERO.title} lede={PRODUCTS_HERO.lede} stats={PRODUCTS_HERO.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            {PRODUCTS_FEATURES.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} />
            ))}
          </div>
        </section>
        <PCloseCta title={PRODUCTS_CLOSER.title} lede={PRODUCTS_CLOSER.lede} cta={PRODUCTS_CLOSER.cta} />
      </main>
    </RedesignShell>
  )
}
