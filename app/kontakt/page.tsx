export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { getEinstellungen } from "@/sanity/lib/queries"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata = {
  title: "Kontakt | Bausachverstaendiger SQ Schmidt Trossingen",
  description: "Bausachverstaendiger SQ Schmidt kontaktieren. Standorte Trossingen (Marktplatz 21) und Bad Duerrheim. Einzugsgebiet Schwarzwald-Baar, Tuttlingen, Rottweil.",
  alternates: { canonical: "/kontakt" },
}

export default async function KontaktPage() {
  const einstellungen = await getEinstellungen()
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Kontakt" }]} />
      <Header einstellungen={einstellungen} />
      <main className="pt-20">
        <ContactForm einstellungen={einstellungen} />
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}