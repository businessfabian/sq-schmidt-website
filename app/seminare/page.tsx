export const revalidate = 0

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getSeminare, getEinstellungen } from "@/sanity/lib/queries"
import { Calendar, MapPin, Clock, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Seminartermine | SQ Schmidt Qualitaetssicherung",
  description: "Aktuelle Seminartermine und Fortbildungen im Bauwesen.",
}

export default async function SeminarePage({ searchParams }: { searchParams: Promise<{ ort?: string }> }) {
  const [einstellungen, seminare] = await Promise.all([getEinstellungen(), getSeminare()])
  const params = await searchParams
  const aktiveOrt = params?.ort ?? null
  const gefiltert = aktiveOrt ? seminare.filter((s: any) => s.ort === aktiveOrt) : seminare
  const orte = Array.from(new Set(seminare.map((s: any) => s.ort).filter(Boolean))) as string[]

  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">
        <section className="relative bg-zinc-950 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Fortbildung</span>
            <h1 className="text-5xl font-bold text-white mt-4 mb-4" style={{ fontFamily: "var(--font-display)" }}>Seminartermine</h1>
            <p className="text-zinc-400 text-lg max-w-xl">Praxisnahe Seminare und Fortbildungen rund um Bauqualitaet, Baurecht und Schadenspraevention.</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            {/* Ort Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/seminare"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!aktiveOrt ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                Alle Orte
              </Link>
              {orte.map((ort) => (
                <Link key={ort} href={`/seminare?ort=${encodeURIComponent(ort)}`}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${aktiveOrt === ort ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  <MapPin className="h-3.5 w-3.5" />
                  {ort}
                </Link>
              ))}
            </div>

            {gefiltert.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Aktuell keine Seminartermine an diesem Ort.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gefiltert.map((s: any) => (
                  <Link key={s._id} href={`/seminare/${s.slug?.current}`}
                    className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      {s.kategorie && (
                        <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                          <Tag className="h-3 w-3" />{s.kategorie}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                      {s.titel}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {s.datum && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary flex-shrink-0" />{new Date(s.datum).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</div>}
                      {s.uhrzeit && <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary flex-shrink-0" />{s.uhrzeit}</div>}
                      {s.ort && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary flex-shrink-0" />{s.ort}</div>}
                    </div>
                    {s.preis && <div className="mt-4 pt-4 border-t border-border flex items-center justify-between"><span className="font-semibold text-foreground">{s.preis}</span><ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" /></div>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}