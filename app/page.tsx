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
    title: s?.seoTitel ?? "Bausachverstaendiger Schwarzwald-Baar & Tuttlingen | SQ Schmidt",
    description: s?.seoBeschreibung ?? "EU-zertifizierter Bausachverstaendiger fuer Gutachten, Qualitaetssicherung und Baumediation. Einzugsgebiet Schwarzwald-Baar, Tuttlingen, Rottweil. Standort Trossingen.",
    alternates: { canonical: "/" },
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
    "@type": "ProfessionalService",
    name: einstellungen?.firmenname ?? "SQ Schmidt Qualitaetssicherung",
    alternateName: "SQ Schmidt",
    description: "EU-zertifizierter Bausachverstaendiger fuer Qualitaetssicherung, Gutachten und Baumediation im Bauwesen",
    url: siteUrl,
    telephone: "+4977269293940",
    email: einstellungen?.email ?? "sqs@sq-sv.de",
    priceRange: "€€",
    foundingDate: "2001",
    areaServed: [
      { "@type": "AdministrativeArea", "name": "Schwarzwald-Baar-Kreis" },
      { "@type": "AdministrativeArea", "name": "Landkreis Tuttlingen" },
      { "@type": "AdministrativeArea", "name": "Landkreis Rottweil" },
      { "@type": "City", "name": "Villingen-Schwenningen" },
      { "@type": "City", "name": "Donaueschingen" },
      { "@type": "City", "name": "Trossingen" },
      { "@type": "City", "name": "Bad Duerrheim" },
      { "@type": "City", "name": "Tuttlingen" },
      { "@type": "City", "name": "Rottweil" },
    ],
    location: [
      {
        "@type": "Place",
        name: "SQ Schmidt Qualitaetssicherung Trossingen",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Marktplatz 21",
          postalCode: "78647",
          addressLocality: "Trossingen",
          addressCountry: "DE",
        },
      },
      {
        "@type": "Place",
        name: "SQ Schmidt Qualitaetssicherung Bad Duerrheim",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Paradiesstrasse 33/3",
          postalCode: "78073",
          addressLocality: "Bad Duerrheim",
          addressCountry: "DE",
        },
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    hasCredential: [
      "EU-Zertifizierter Sachverstaendiger IQ-Zert Aachen",
      "TUeV Rheinland Sachverstaendiger Schimmelpilzbelastungen Nr. 62172",
      "DIN EN ISO/IEC 17024 Zertifikat Nr. S 465",
      "Beratender Ingenieur Ingenieurkammer Baden-Wuerttemberg Nr. 2333",
      "Oeffentlich bestellt und vereidigt IHK Konstanz",
      "Dipl.-Ing. (FH) Baubetrieb",
    ],
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