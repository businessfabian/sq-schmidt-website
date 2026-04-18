export const revalidate = 60

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sq-sv.de"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: einstellungen?.firmenname ?? "SQ Schmidt Qualitätssicherung",
    description: einstellungen?.seoBeschreibung ?? "Öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz",
    url: siteUrl,
    telephone: einstellungen?.telefon ?? "",
    email: einstellungen?.email ?? "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marktplatz 21",
      addressLocality: "Trossingen",
      postalCode: "78647",
      addressCountry: "DE",
    },
    foundingDate: "2001",
    areaServed: "DE",
    priceRange: "$$",
    openingHours: einstellungen?.oeffnungszeiten ?? "Mo-Fr 08:00-18:00",
    sameAs: [],
  }

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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