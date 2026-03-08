import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { partnersData } from "@/lib/services-data"
import { Building2, ExternalLink } from "lucide-react"

export const metadata = {
  title: "Partner — SQ Schmidt Qualitätssicherung",
  description: "Unsere Kooperationspartner aus der Baubranche.",
}

export default function PartnerPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Netzwerk</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Unsere Kooperationspartner
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Wir arbeiten mit führenden Experten und Institutionen der Baubranche zusammen, um Ihnen höchste Qualität zu garantieren.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {partnersData.map((partner, i) => (
              <div key={i} className="flex flex-col gap-3 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Building2 className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-card border border-border rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>Werden Sie Partner</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Sind Sie Experte im Bauwesen und möchten Teil unseres Netzwerks werden? Wir freuen uns auf Ihre Kontaktaufnahme.</p>
            <a href="/#kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Kontakt aufnehmen <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}