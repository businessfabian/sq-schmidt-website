export const revalidate = 0

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen } from "@/sanity/lib/queries"
import { ShieldCheck, Award, Users, Building2, CheckCircle2, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { existsSync } from "fs"
import { join } from "path"

export const metadata = {
  title: "Ueber Uns | SQ Schmidt Qualitaetssicherung",
  description: "Seit 2001 Ihr Experte fuer Bauschaden, Gutachten und Qualitaetssicherung im Bauwesen.",
}

const qualifikationen = [
  { icon: ShieldCheck, titel: "Oeffentlich bestellt & vereidigt", beschreibung: "IHK Konstanz — Sachverstaendiger fuer Schaeden an Gebaeuden" },
  { icon: Award, titel: "TUeV-zertifiziert", beschreibung: "Schaeden an Gebaeuden · Feuchte- und Schimmelpilzbelastungen (TUeV PersCert)" },
  { icon: Award, titel: "IQ-ZERT zertifiziert", beschreibung: "EU-zertifizierter Sachverstaendiger nach DIN EN ISO/IEC 17024" },
  { icon: Building2, titel: "Beratender Ingenieur", beschreibung: "Ingenieurkammer Baden-Wuerttemberg · Nr. 2333" },
  { icon: Users, titel: "VPB Regionalbuero", beschreibung: "Leiter Regionalbuero Villingen-Schwenningen, Bauherrenberater" },
  { icon: Award, titel: "DEKRA Sachverstaendiger", beschreibung: "Zertifizierter Sachverstaendiger fuer die DEKRA GmbH" },
]

const leistungsBereiche = [
  "Bauschadensbeurteilung und Schadensgutachten",
  "Sanierungskonzepte und Ausschreibungen",
  "Baubegleitende Qualitaetssicherung",
  "Projektleitung und Bauleitung",
  "Sachverstaendigendienstleistungen fuer Feuchte- und Schimmelpilzbelastungen",
  "Seminare, Fortbildungen und Coaching",
  "Baumediation und Konfliktloesung",
  "Blower-Door-Tests und Energieberatung",
]

export default async function UeberUnsPage() {
  const einstellungen = await getEinstellungen()
  const hasPhoto = existsSync(join(process.cwd(), "public/images/gerhard-schmidt.jpg"))

  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">

        <section className="relative bg-zinc-950 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <div className="max-w-2xl">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Seit 2001</span>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mt-4 mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>Ueber uns</h1>
              <p className="text-zinc-400 text-lg leading-relaxed">Ueber 20 Jahre Erfahrung in der Qualitaetssicherung und im Sachverstaendigenwesen — Ihr unabhaengiger Partner fuer komplexe Fragestellungen im Bauwesen.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative flex items-center justify-center">
                  {hasPhoto ? (
                    <Image src="/images/gerhard-schmidt.jpg" alt="Dipl.-Ing. Gerhard Schmidt" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-zinc-400">
                      <User className="h-24 w-24 opacity-20" />
                      <p className="text-sm opacity-40">Foto folgt</p>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent">
                    <div>
                      <p className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>Dipl.-Ing. Gerhard Schmidt</p>
                      <p className="text-zinc-400 text-sm">Inhaber & Sachverstaendiger</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl bg-primary/10 border border-primary/20 -z-10" />
              </div>

              <div className="space-y-8">
                <div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Unsere Historie</span>
                  <h2 className="text-3xl font-bold text-foreground mt-3 mb-6" style={{ fontFamily: "var(--font-display)" }}>Dipl.-Ing. Gerhard Schmidt</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Seit 2001 beschaeftigt sich das Ingenieurbuero Schmidt Qualitaetssicherung mit der Beseitigung von Bauschaden und Baumaengeln. Wir bieten Dienstleistungen wie Bauschadensbeurteilung, Schadensgutachten, Sanierungskonzepte sowie baubegleitende Qualitaetssicherung und Projektleitung an.</p>
                    <p>Unser Ziel ist es, Rechtsstreitigkeiten durch praeventive Massnahmen zu vermeiden. Wir bieten auch Sachverstaendigendienstleistungen fuer Feuchte- und Schimmelpilzbelastungen, zertifiziert durch den TUeV.</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Unsere Kompetenzbereiche</h3>
                  <ul className="space-y-2">
                    {leistungsBereiche.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/vita" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                  Vollstaendige Vita ansehen <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Nachgewiesene Kompetenz</span>
              <h2 className="text-3xl font-bold text-foreground mt-3" style={{ fontFamily: "var(--font-display)" }}>Qualifikationen & Zertifizierungen</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualifikationen.map((q, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors group">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <q.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>{q.titel}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{q.beschreibung}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-zinc-950 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Sprechen Sie uns an</h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Jetzt anfragen — wir freuen uns auf Ihre Kontaktaufnahme.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all">
                Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/vita" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                Vita ansehen
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}