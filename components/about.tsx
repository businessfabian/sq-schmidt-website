"use client"
import { Award, Users, Building, MapPin } from "lucide-react"
import { Reveal, AnimatedCounter } from "./animations"

interface Props {
  einstellungen?: any
}

export function About({ einstellungen }: Props) {
  const titel = einstellungen?.uebermichTitel ?? "Qualitaet ist kein Zufall, sondern das Ergebnis von Erfahrung"
  const text = einstellungen?.uebermichText ?? "SQ Schmidt steht fuer hoechste Qualitaetsstandards im deutschen Bauwesen. Als oeffentlich bestellter und vereidigter Sachverstaendiger der IHK Konstanz bieten wir gerichtsfeste Gutachten und professionelle Baubegleitung."
  const firmenname = einstellungen?.firmenname ?? "SQ Schmidt"
  const jahre = einstellungen?.jahreErfahrung ?? 25
  const projekte = einstellungen?.anzahlProjekte ?? 500

  const features = [
    { icon: Award, title: "TUeV & ISO zertifiziert", description: "Hoechste Qualitaetsstandards durch unabhaengige Zertifizierungen." },
    { icon: Users, title: "Erfahrenes Team", description: "Inhabergefuehrtes Unternehmen mit persoenlicher Betreuung." },
    { icon: Building, title: "Alle Projektgroessen", description: "Vom Einfamilienhaus bis zum Grossprojekt." },
    { icon: MapPin, title: "Bundesweit taetig", description: "Flaechendeckende Praesenz in ganz Deutschland." },
  ]

  return (
    <section id="ueber-uns" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="flex flex-col gap-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Ueber {firmenname}</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {titel}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{text}</p>

              {/* Stats mit animierten Countern */}
              <div className="flex gap-8 pt-2">
                <div>
                  <span className="block text-3xl font-bold text-primary">
                    <AnimatedCounter target={jahre} suffix="+" />
                  </span>
                  <span className="text-sm text-muted-foreground">Jahre Erfahrung</span>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <span className="block text-3xl font-bold text-primary">
                    <AnimatedCounter target={projekte} suffix="+" />
                  </span>
                  <span className="text-sm text-muted-foreground">Projekte</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                {["ISO 9001:2015", "TUeV Rheinland", "DEKRA"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                    <span className="text-sm font-medium text-foreground">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex flex-col gap-3 p-6 rounded-xl bg-card border border-border hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all h-full">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
