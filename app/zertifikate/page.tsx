import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { ZertifikateGrid } from "@/components/zertifikate-grid"
import { getEinstellungen, getZertifikate } from "@/sanity/lib/queries"

export const revalidate = 0

export const metadata = {
  title: "Zertifikate | SQ Schmidt Qualitaetssicherung",
  description: "Zertifikate und Akkreditierungen von SQ Schmidt.",
}

export default async function ZertifikatePage() {
  const [einstellungen, zertifikate] = await Promise.all([getEinstellungen(), getZertifikate()])
  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="pt-32 pb-24">
        <ZertifikateGrid zertifikate={zertifikate} />
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}