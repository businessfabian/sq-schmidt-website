import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { ZertifikateGrid } from "@/components/zertifikate-grid"
import { getEinstellungen } from "@/sanity/lib/queries"

export const metadata = {
  title: "Zertifikate - SQ Schmidt Qualitätssicherung",
  description: "Zertifikate und Akkreditierungen von SQ Schmidt.",
}

export default async function ZertifikatePage() {
  const einstellungen = await getEinstellungen()
  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="pt-32 pb-24">
        <ZertifikateGrid />
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}