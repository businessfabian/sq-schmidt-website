import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { getEinstellungen } from "@/sanity/lib/queries"

export const metadata = {
  title: "Kontakt | SQ Schmidt Qualitaetssicherung",
  description: "Kontaktieren Sie uns fuer eine unverbindliche Anfrage.",
}

export default async function KontaktPage() {
  const einstellungen = await getEinstellungen()
  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="pt-20">
        <ContactForm einstellungen={einstellungen} />
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}