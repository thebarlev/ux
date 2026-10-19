import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getProductsContent } from "@/app/_content/redesign/products"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getProductsContent("en")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/en/products", languages: heEnAlternateLanguages("/products", "/en/products") },
    title: "Products | Uxellent | AI-built business websites in Hebrew",
    description: hero.lede,
    openGraph: {
      title: "Products | Uxellent",
      description: hero.lede,
      url: "https://uxellent.com/en/products",
      siteName: "Uxellent",
      locale: "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

export default async function ProductsPageEn() {
  const { hero, features, closer } = await getProductsContent("en")
  return (
    <RedesignShell locale="en">
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            {features.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} locale="en" />
            ))}
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} locale="en" />
      </main>
    </RedesignShell>
  )
}
