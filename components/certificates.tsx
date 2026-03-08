import Image from "next/image"
import { certificatesData } from "@/lib/services-data"

export function Certificates() {
  return (
    <section id="zertifikate" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Qualifikationen
          </span>
          <h2 
            className="mt-3 text-3xl md:text-4xl font-bold text-foreground text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Zertifikate & Akkreditierungen
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unsere Qualifikationen und Zertifizierungen sind Ihr Garant für 
            professionelle und verlässliche Arbeit nach höchsten Standards.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((cert, index) => (
            <div
              key={index}
              className="relative bg-card border border-border rounded-xl hover:border-primary/50 transition-all group overflow-hidden"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              
              <div className="relative p-5 -mt-8">
                <h3 
                  className="text-lg font-semibold text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-card border border-border rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 
                className="text-xl font-semibold text-foreground mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Kontinuierliche Weiterbildung
              </h3>
              <p className="text-muted-foreground">
                Unsere Sachverständigen bilden sich regelmäßig fort und sind immer auf dem neuesten Stand 
                der Technik und Rechtsprechung.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary">500+</span>
                <span className="text-sm text-muted-foreground">Fortbildungsstunden</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary">25+</span>
                <span className="text-sm text-muted-foreground">Jahre Erfahrung</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
