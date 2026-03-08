import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { User, GraduationCap, Briefcase, Award } from "lucide-react"

export const metadata = {
  title: "Vita | SQ Schmidt Qualitätssicherung",
  description: "Beruflicher Werdegang und Qualifikationen von Dipl.-Ing. (FH) Schmidt.",
}

const stationen = [
  {
    icon: GraduationCap,
    jahr: "1990–1995",
    titel: "Studium Bauingenieurwesen",
    beschreibung: "Abschluss als Dipl.-Ing. (FH) Bauingenieurwesen",
    ort: "Platzhalter Hochschule",
  },
  {
    icon: Briefcase,
    jahr: "1995–2005",
    titel: "Berufserfahrung im Bauwesen",
    beschreibung: "Projektleitung und Bauleitung für verschiedene Bauträger und Unternehmen in der Region.",
    ort: "Platzhalter",
  },
  {
    icon: Award,
    jahr: "2005",
    titel: "Öffentliche Bestellung & Vereidigung",
    beschreibung: "Öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz für Schäden an Gebäuden.",
    ort: "IHK Konstanz",
  },
  {
    icon: Award,
    jahr: "2008",
    titel: "TÜV-Zertifizierung",
    beschreibung: "Zertifizierung als Sachverständiger durch den TÜV Rheinland.",
    ort: "TÜV Rheinland",
  },
  {
    icon: Briefcase,
    jahr: "Seit 2005",
    titel: "Selbstständige Sachverständigentätigkeit",
    beschreibung: "Gründung von SQ Schmidt Qualitätssicherung für das Bauwesen in Trossingen.",
    ort: "Trossingen",
  },
]

export default function VitaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Beruflicher Werdegang</span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Vita
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Langjährige Erfahrung im Bauwesen — von der Projektleitung bis zur unabhängigen Sachverständigentätigkeit.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Profil-Placeholder */}
            <div className="flex flex-col sm:flex-row items-center gap-8 p-8 rounded-2xl border border-border bg-card mb-16">
              <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="h-16 w-16 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  Dipl.-Ing. (FH) Schmidt
                </h2>
                <p className="text-primary font-medium mb-3">Öffentlich bestellter und vereidigter Sachverständiger</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Sachverständiger für Schäden an Gebäuden · IHK Konstanz · TÜV-zertifiziert · BVS-Mitglied
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {stationen.map((station, index) => (
                  <div key={index} className="relative flex gap-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center flex-shrink-0 z-10">
                      <station.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{station.titel}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary w-fit">
                          {station.jahr}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{station.beschreibung}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{station.ort}</p>
                    </div>
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