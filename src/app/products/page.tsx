import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getProductsContent } from "@/app/_content/redesign/products"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const { hero } = getProductsContent("he")

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/products", languages: heEnAlternateLanguages("/products", "/en/products") },
  title: "מוצרים | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: hero.lede,
  openGraph: {
    title: "מוצרים | Uxellent",
    description: hero.lede,
    url: "https://uxellent.com/products",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function ProductsPage() {
  const { hero, features, closer } = getProductsContent("he")
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            {features.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} />
            ))}
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} />
      </main>
    </RedesignShell>
  )
}
