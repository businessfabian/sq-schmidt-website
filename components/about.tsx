import Image from "next/image"
import { Award, Users, Building, MapPin } from "lucide-react"
import { Reveal, AnimatedCounter } from "./animations"

interface Props {
  einstellungen?: any
}

export function About({ einstellungen }: Props) {
  const titel = einstellungen?.uebermichTitel ?? "Qualität ist kein Zufall, sondern das Ergebnis von Erfahrung"
  const text = einstellungen?.uebermichText ?? "SQ Schmidt steht für höchste Qualitätsstandards im deutschen Bauwesen. Als öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz bieten wir gerichtsfeste Gutachten und professionelle Baubegleitung."
  const firmenname = einstellungen?.firmenname ?? "SQ Schmidt"
  const jahre = einstellungen?.jahreErfahrung ?? 25
  const projekte = einstellungen?.anzahlProjekte ?? 500
  const uebermichBildUrl: string | undefined = einstellungen?.uebermichBildUrl

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
          <Reveal>
            <div className="flex flex-col gap-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Über uns</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
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
                {["ISO 9001:2015", "TÜV Rheinland", "DEKRA"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                    <span className="text-sm font-medium text-foreground">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {uebermichBildUrl ? (
            <Reveal>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-secondary">
                <Image
                  src={uebermichBildUrl}
                  alt={`Über ${firmenname}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  )
}
