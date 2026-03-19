"use client"
import { useState } from "react"
import Image from "next/image"
import { X, ZoomIn, Award } from "lucide-react"

interface Zertifikat {
  _id?: string
  name: string
  beschreibung: string
  bild?: string
  image?: string
}

interface Props {
  zertifikate?: Zertifikat[]
}

export function ZertifikateGrid({ zertifikate = [] }: Props) {
  const [selected, setSelected] = useState<Zertifikat | null>(null)

  // Fallback Daten falls Sanity noch leer
  const data = zertifikate.length > 0 ? zertifikate : [
    { name: "TUeV Rheinland", beschreibung: "Zertifizierter Sachverstaendiger" },
    { name: "IHK Konstanz", beschreibung: "Oeffentlich bestellter und vereidigter Sachverstaendiger" },
    { name: "IQ-ZERT", beschreibung: "EU-zertifizierter Sachverstaendiger nach DIN EN ISO/IEC 17024" },
    { name: "DEKRA", beschreibung: "Zertifizierter Sachverstaendiger" },
  ]

  const bildUrl = (item: Zertifikat) => item.bild || item.image || null

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Qualifikationen</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Zertifikate & Akkreditierungen
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Unsere Qualifikationen und Zertifizierungen sind Ihr Garant fuer professionelle und verlassliche Arbeit.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {data.map((cert, i) => (
          <button key={i} onClick={() => setSelected(cert)}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all group text-left cursor-pointer relative">
            <div className="relative h-48 w-full bg-muted flex items-center justify-center">
              {bildUrl(cert) ? (
                <Image src={bildUrl(cert)!} alt={cert.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <Award className="h-16 w-16 text-muted-foreground/30" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="p-5 -mt-8 relative">
              <h3 className="font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>{cert.name}</h3>
              <p className="text-sm text-muted-foreground">{cert.beschreibung}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 bg-card border border-border rounded-2xl">
          <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Kontinuierliche Weiterbildung</h2>
          <p className="text-muted-foreground leading-relaxed">Regelmaessige Fortbildung auf dem neuesten Stand der Technik und Rechtsprechung.</p>
          <div className="flex gap-8 mt-6">
            <div><span className="block text-3xl font-bold text-primary">500+</span><span className="text-sm text-muted-foreground">Fortbildungsstunden</span></div>
            <div><span className="block text-3xl font-bold text-primary">25+</span><span className="text-sm text-muted-foreground">Jahre Erfahrung</span></div>
          </div>
        </div>
        <div className="p-8 bg-card border border-border rounded-2xl">
          <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Mitgliedschaften</h2>
          <div className="flex flex-wrap gap-3">
            {["IHK Konstanz", "BVS", "TUeV Rheinland", "IQ-ZERT", "DEKRA"].map((m) => (
              <span key={m} className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground">{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}>
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
              <X className="h-4 w-4 text-white" />
            </button>
            <div className="relative aspect-[4/3] w-full min-h-[500px] bg-zinc-950 flex items-center justify-center">
              {bildUrl(selected) ? (
                <Image src={bildUrl(selected)!} alt={selected.name} fill sizes="80vw" className="object-contain p-8" />
              ) : (
                <Award className="h-24 w-24 text-zinc-700" />
              )}
            </div>
            <div className="p-6 border-t border-border">
              <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>{selected.name}</h3>
              <p className="text-muted-foreground">{selected.beschreibung}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}