import { Award, Users, Building, MapPin } from "lucide-react"

export function About() {
  const features = [
    {
      icon: Award,
      title: "TÜV & ISO zertifiziert",
      description: "Höchste Qualitätsstandards durch unabhängige Zertifizierungen.",
    },
    {
      icon: Users,
      title: "Erfahrenes Team",
      description: "Inhabergeführtes Unternehmen mit persönlicher Betreuung.",
    },
    {
      icon: Building,
      title: "Alle Projektgrößen",
      description: "Vom Einfamilienhaus bis zum Großprojekt.",
    },
    {
      icon: MapPin,
      title: "Bundesweit tätig",
      description: "Flächendeckende Präsenz in ganz Deutschland.",
    },
  ]

  return (
    <section id="ueber-uns" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Über SQ Schmidt
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Qualität ist kein Zufall, sondern das Ergebnis von Erfahrung
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              <p>
                SQ Schmidt steht für höchste Qualitätsstandards im deutschen Bauwesen. Als öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz bieten wir gerichtsfeste Gutachten und professionelle Baubegleitung. 
                Als inhabergeführtes Unternehmen verbinden wir fachliche Expertise mit persönlichem 
                Engagement für Ihr Projekt.
              </p>
              <p>
                Unser Team aus erfahrenen Bauingenieuren, Architekten und Sachverständigen 
                begleitet Sie von der ersten Beratung bis zur finalen Abnahme. 
                Dabei setzen wir auf modernste Prüfmethoden und eine transparente Kommunikation.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <span className="text-sm font-medium text-foreground">ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <span className="text-sm font-medium text-foreground">TÜV Rheinland</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <span className="text-sm font-medium text-foreground">DEKRA</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-3 p-6 rounded-xl bg-card border border-border"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 
                  className="font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
