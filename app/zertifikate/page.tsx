import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { ZertifikateGrid } from "@/components/zertifikate-grid"
import { getEinstellungen, getZertifikate } from "@/sanity/lib/queries"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const revalidate = 60

export const metadata = {
  title: "Zertifikate & Akkreditierungen | SQ Schmidt",
  description: "TUeV PersCert Nr. 62172, IQ-Zert Aachen, DIN EN ISO/IEC 17024 Nr. S 465, Ingenieurkammer BW Nr. 2333, IHK Konstanz. Zertifizierter Bausachverstaendiger Schwarzwald-Baar.",
  alternates: { canonical: "/zertifikate" },
}

export default async function ZertifikatePage() {
  const [einstellungen, zertifikate] = await Promise.all([getEinstellungen(), getZertifikate()])
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Zertifikate" }]} />
      <Header einstellungen={einstellungen} />
      <main className="pt-32 pb-24">
        <ZertifikateGrid zertifikate={zertifikate} />
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}