import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Award, Users, Building, MapPin, Phone, Mail } from "lucide-react"

export const metadata = {
  title: "Über Uns — SQ Schmidt Qualitätssicherung",
  description: "Erfahren Sie mehr über SQ Schmidt — öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz.",
}

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Über SQ Schmidt</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Qualität ist kein Zufall
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              SQ Schmidt steht für höchste Qualitätsstandards im deutschen Bauwesen. Als öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz bieten wir gerichtsfeste Gutachten und professionelle Baubegleitung.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Als inhabergeführtes Unternehmen verbinden wir fachliche Expertise mit persönlichem Engagement für Ihr Projekt. Unser Team aus erfahrenen Bauingenieuren, Architekten und Sachverständigen begleitet Sie von der ersten Beratung bis zur finalen Abnahme.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Award, title: "TÜV & ISO zertifiziert", text: "Höchste Qualitätsstandards durch unabhängige Zertifizierungen." },
              { icon: Users, title: "Inhabergeführt", text: "Persönliche Betreuung und direkter Ansprechpartner." },
              { icon: Building, title: "Alle Projektgrößen", text: "Vom Einfamilienhaus bis zum Großprojekt." },
              { icon: MapPin, title: "Bundesweit tätig", text: "Flächendeckende Präsenz in ganz Deutschland." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-3 p-6 rounded-xl bg-card border border-border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>Qualifikationen</h2>
              <div className="flex flex-wrap gap-3">
                {["Öffentlich bestellter und vereidigter Sachverständiger", "IHK Konstanz", "TÜV Rheinland zertifiziert", "ISO 9001:2015", "DEKRA", "BVS Mitglied", "IQ-ZERT", "25+ Jahre Erfahrung"].map((q) => (
                  <span key={q} className="px-4 py-2 bg-secondary rounded-lg text-sm text-foreground font-medium">{q}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>Kontakt</h2>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Phone, label: "07726 / 929394", href: "tel:+4977269293940" },
                  { icon: Mail, label: "sqs@sq-sv.de", href: "mailto:sqs@sq-sv.de" },
                  { icon: MapPin, label: "Marktplatz 21, 78647 Trossingen", href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    {item.href
                      ? <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">{item.label}</a>
                      : <span className="text-muted-foreground">{item.label}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}