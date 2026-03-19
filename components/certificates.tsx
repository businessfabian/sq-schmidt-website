import Image from "next/image"
import { certificatesData } from "@/lib/services-data"

interface Props {
  zertifikate?: any[]
}

export function Certificates({ zertifikate }: Props) {
  const list = (zertifikate && zertifikate.length > 0)
    ? zertifikate.map((z: any) => ({ name: z.name, description: z.beschreibung, image: z.bild ?? null }))
    : certificatesData

  return (
    <section id="zertifikate" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Qualifikationen</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-display)" }}>Zertifikate & Akkreditierungen</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">Unsere Qualifikationen und Zertifizierungen sind Ihr Garant für professionelle und verlässliche Arbeit nach höchsten Standards.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((cert: any, i: number) => (
            <div key={i} className="relative bg-card border border-border rounded-xl hover:border-primary/50 transition-all group overflow-hidden">
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
          ))}
        </div>
      </div>
    </section>
  )
}