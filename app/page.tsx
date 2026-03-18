import { Header } from "@/components/header-wrapper"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Partners } from "@/components/partners"
import { Certificates } from "@/components/certificates"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { getEinstellungen, getPartner, getZertifikate, getLeistungen } from "@/sanity/lib/queries"

export async function generateMetadata() {
  const s = await getEinstellungen()
  return {
    title: s?.seoTitel ?? "SQ Schmidt - Qualitaetssicherung im Bauwesen",
    description: s?.seoBeschreibung ?? "Oeffentlich bestellter und vereidigter Sachverstaendiger.",
  }
}

export default async function Home() {
  const [einstellungen, partner, zertifikate, leistungen] = await Promise.all([
    getEinstellungen(),
    getPartner(),
    getZertifikate(),
    getLeistungen(),
  ])
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header einstellungen={einstellungen} />
      <Hero einstellungen={einstellungen} />
      <Services leistungen={leistungen} />
      <About einstellungen={einstellungen} />
      <Partners partner={partner} />
      <Certificates zertifikate={zertifikate} />
      <ContactForm einstellungen={einstellungen} />
      <Footer einstellungen={einstellungen} />
    </main>
  )
}