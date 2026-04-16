"use client"
import { useState } from "react"
import Image from "next/image"
import { certificatesData } from "@/lib/services-data"
import { Reveal } from "./animations"
import { X, ZoomIn, Award } from "lucide-react"

interface Props {
  zertifikate?: any[]
}

interface CertItem {
  name: string
  description?: string
  image?: string | null
}

export function Certificates({ zertifikate }: Props) {
  const [selected, setSelected] = useState<CertItem | null>(null)

  const list: CertItem[] = (zertifikate && zertifikate.length > 0)
    ? zertifikate.map((z: any) => ({ name: z.name, description: z.beschreibung, image: z.bild ?? null }))
    : certificatesData

  return (
    <>
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
            {list.map((cert, i) => (
              <Reveal key={i} delay={i * 100}>
                <button
                  onClick={() => setSelected(cert)}
                  className="relative w-full text-left bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl transition-all group overflow-hidden h-full cursor-pointer"
                >
                  {cert.image && (
                    <div className="relative h-40 w-full">
                      <Image src={cert.image} alt={cert.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>
                  )}
                  {!cert.image && (
                    <div className="relative h-40 w-full bg-secondary/50 flex items-center justify-center">
                      <Award className="h-12 w-12 text-muted-foreground/30" />
                      <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  <div className={`relative p-5 ${cert.image ? "-mt-8" : ""}`}>
                    <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>{cert.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-card border border-border rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
            <div className="relative aspect-[4/3] w-full bg-zinc-950 flex items-center justify-center">
              {selected.image ? (
                <Image src={selected.image} alt={selected.name} fill sizes="80vw" className="object-contain p-8" />
              ) : (
                <Award className="h-24 w-24 text-zinc-700" />
              )}
            </div>
            <div className="p-6 border-t border-border">
              <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>{selected.name}</h3>
              {selected.description && <p className="text-muted-foreground text-sm">{selected.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
