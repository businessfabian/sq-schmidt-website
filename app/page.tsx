export const revalidate = 0

import { Header } from "@/components/header-wrapper"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Partners } from "@/components/partners"
import { Certificates } from "@/components/certificates"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { getEinstellungen, getPartner, getZertifikate, getLeistungen } from "@/sanity/lib/queries"
import { config } from "@/config"

export async function generateMetadata() {
  const s = await getEinstellungen()
  return {
    title: s?.seoTitel ?? `${config.firma.name} | ${config.firma.logoSubtitle}`,
    description: s?.seoBeschreibung ?? "",
  }
}

export default async function Home() {
  const [einstellungen, partner, zertifikate, leistungen] = await Promise.all([
    getEinstellungen(),
    config.sections.partner ? getPartner() : Promise.resolve([]),
    config.sections.zertifikate ? getZertifikate() : Promise.resolve([]),
    config.sections.leistungen ? getLeistungen() : Promise.resolve([]),
  ])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header einstellungen={einstellungen} />
      {config.sections.hero && <Hero einstellungen={einstellungen} />}
      {config.sections.leistungen && <Services leistungen={leistungen} />}
      {config.sections.ueber && <About einstellungen={einstellungen} />}
      {config.sections.partner && <Partners partner={partner} />}
      {config.sections.zertifikate && <Certificates zertifikate={zertifikate} />}
      {config.sections.kontakt && <ContactForm einstellungen={einstellungen} />}
      <Footer einstellungen={einstellungen} />
    </main>
  )
}