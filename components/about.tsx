import { Award, Users, Building, MapPin } from "lucide-react"

interface Props {
  einstellungen?: any
}

export function About({ einstellungen }: Props) {
  const titel = einstellungen?.uebermichTitel ?? "Qualität ist kein Zufall, sondern das Ergebnis von Erfahrung"
  const text = einstellungen?.uebermichText ?? "SQ Schmidt steht für höchste Qualitätsstandards im deutschen Bauwesen. Als öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz bieten wir gerichtsfeste Gutachten und professionelle Baubegleitung."

  const features = [
    { icon: Award, title: "TÜV & ISO zertifiziert", description: "Höchste Qualitätsstandards durch unabhängige Zertifizierungen." },
    { icon: Users, title: "Erfahrenes Team", description: "Inhabergeführtes Unternehmen mit persönlicher Betreuung." },
    { icon: Building, title: "Alle Projektgrößen", description: "Vom Einfamilienhaus bis zum Großprojekt." },
    { icon: MapPin, title: "Bundesweit tätig", description: "Flächendeckende Präsenz in ganz Deutschland." },
  ]

  return (
    <section id="ueber-uns" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Über SQ Schmidt</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>{titel}</h2>
            <p className="text-muted-foreground leading-relaxed">{text}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              {["ISO 9001:2015", "TÜV Rheinland", "DEKRA"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                  <span className="text-sm font-medium text-foreground">{badge}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col gap-3 p-6 rounded-xl bg-card border border-border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}