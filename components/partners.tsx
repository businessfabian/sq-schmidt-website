"use client"

import { partnersData } from "@/lib/services-data"

interface Props {
  partner?: any[]
}

export function Partners({ partner }: Props) {
  const list = (partner && partner.length > 0)
    ? partner.map((p: any) => ({ name: p.name, beschreibung: p.beschreibung }))
    : partnersData.map((p) => ({ name: p.name, beschreibung: p.description }))

  // Doppeln für nahtlose Endlosschleife
  const doubled = [...list, ...list]

  return (
    <section id="partner" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-14">
        <div className="text-center">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Netzwerk</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Unsere Kooperationspartner
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Wir arbeiten mit führenden Experten und Institutionen der Baubranche zusammen.
          </p>
        </div>
      </div>

      {/* Marquee Row 1 — links */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {doubled.map((p, i) => (
            <div key={i} className="inline-flex flex-col items-start flex-shrink-0 px-6 py-4 bg-card border border-border rounded-xl min-w-[200px] max-w-[240px]">
              <span className="text-sm font-semibold text-foreground truncate w-full">{p.name}</span>
              <span className="text-xs text-muted-foreground mt-1 line-clamp-1">{p.beschreibung}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — rechts (umgekehrt) */}
      <div className="relative mt-4">
        <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap">
          {[...doubled].reverse().map((p, i) => (
            <div key={i} className="inline-flex flex-col items-start flex-shrink-0 px-6 py-4 bg-card border border-border rounded-xl min-w-[200px] max-w-[240px]">
              <span className="text-sm font-semibold text-foreground truncate w-full">{p.name}</span>
              <span className="text-xs text-muted-foreground mt-1 line-clamp-1">{p.beschreibung}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Interessiert an einer Partnerschaft?{" "}
          <a href="#kontakt" className="text-primary hover:underline">Kontaktieren Sie uns</a>
        </p>
      </div>
    </section>
  )
}