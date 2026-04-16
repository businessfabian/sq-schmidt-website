import Image from "next/image"
import { certificatesData } from "@/lib/services-data"
import { Reveal } from "./animations"

interface Props {
  zertifikate?: any[]
}

export function Certificates({ zertifikate }: Props) {
  const list = (zertifikate && zertifikate.length > 0)
    ? zertifikate.map((z: any) => ({ name: z.name, description: z.beschreibung, image: z.bild ?? null }))
    : certificatesData

  return (
    <section id="zertifikate" className="py-24 bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-14">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Qualifikationen</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>Zertifikate & Akkreditierungen</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">Unsere Qualifikationen und Zertifizierungen sind Ihr Garant für professionelle und verlässliche Arbeit nach höchsten Standards.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((cert: any, i: number) => (
            <Reveal key={i} delay={i * 100}>
            <div className="relative bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl transition-all group overflow-hidden h-full">
              {cert.image && (
                <div className="relative h-40 w-full">
                  <Image src={cert.image} alt={cert.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
              )}
              <div className={`relative p-5 ${cert.image ? "-mt-8" : ""}`}>
                <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>{cert.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cert.description ?? cert.beschreibung}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}