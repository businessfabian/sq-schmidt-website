import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { getEinstellungen } from "@/sanity/lib/queries"

export const metadata = {
  title: "Kontakt | SQ Schmidt Qualitätssicherung",
  description: "Nehmen Sie Kontakt auf — kostenlose Erstberatung, Gutachtenanfragen und Terminvereinbarungen.",
}

export default async function KontaktPage() {
  const einstellungen = await getEinstellungen()
  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const email = einstellungen?.email ?? "sqs@sq-sv.de"
  const adresse = einstellungen?.adresse ?? "Marktplatz 21, 78647 Trossingen"
  const oeffnungszeiten = einstellungen?.oeffnungszeiten ?? "Mo–Fr 8:00–18:00 Uhr"

  const kontaktInfos = [
    { icon: Phone, label: "Telefon", wert: telefon, href: "tel:+" + telefon.replace(/\D/g, "") },
    { icon: Mail, label: "E-Mail", wert: email, href: "mailto:" + email },
    { icon: MapPin, label: "Adresse", wert: adresse, href: "https://maps.google.com/?q=" + encodeURIComponent(adresse) },
    { icon: Clock, label: "Öffnungszeiten", wert: oeffnungszeiten, href: null },
  ]

  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Jetzt anfragen</span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Kontakt aufnehmen
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Kostenlose Erstberatung — schildern Sie uns Ihr Anliegen und wir melden uns umgehend.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

            {/* Kontaktinfos */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Direkt erreichen
              </h2>
              <div className="space-y-4">
                {kontaktInfos.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="font-medium text-foreground hover:text-primary transition-colors">
                          {info.wert}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{info.wert}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps Embed Placeholder */}
              <div className="rounded-xl overflow-hidden border border-border aspect-video bg-muted flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Karte — Marktplatz 21, 78647 Trossingen</p>
              </div>
            </div>

            {/* Kontaktformular */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Nachricht schreiben
              </h2>
              <ContactForm einstellungen={einstellungen} />
            </div>
          </div>
        </div>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}