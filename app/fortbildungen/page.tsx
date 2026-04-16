export const revalidate = 60

import { Metadata } from "next"
import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen, getFortbildungen } from "@/sanity/lib/queries"
import { FortbildungCluster } from "@/components/fortbildung-cluster"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { GraduationCap, Droplets, Layers, Building2, Zap, Scale, CalendarDays, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Fortbildungen | SQ Schmidt Qualitaetssicherung",
  description:
    "Ueber 25 Jahre kontinuierliche Fortbildung in Feuchte & Schimmel, Abdichtung, WDVS, Energieeffizienz und Sachverstaendigenwesen. Fachkompetenz durch staendige Weiterbildung.",
}

interface Fortbildung {
  _id: string
  titel: string
  datum: string
  veranstalter: string
  ort?: string
  themenbereich?: string
  unterrichtseinheiten?: number
  hervorgehoben?: boolean
}

const THEMENBEREICH_LABELS: Record<string, string> = {
  "feuchte-schimmel": "Feuchte & Schimmel",
  "abdichtung": "Abdichtung",
  "wdvs-fassade": "WDVS & Fassade",
  "energieeffizienz": "Energieeffizienz",
  "recht-sachverstaendigenwesen": "Recht & Sachverstaendigenwesen",
}

const THEMENBEREICH_BADGE_CLASSES: Record<string, string> = {
  "feuchte-schimmel": "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  "abdichtung": "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  "wdvs-fassade": "bg-amber-500/10 text-amber-500 border border-amber-500/20",
  "energieeffizienz": "bg-violet-500/10 text-violet-500 border border-violet-500/20",
  "recht-sachverstaendigenwesen": "bg-rose-500/10 text-rose-500 border border-rose-500/20",
}

function formatDatum(datum: string): string {
  return new Date(datum).toLocaleDateString("de-DE", { year: "numeric", month: "long" })
}

const GRUENDUNGSJAHR = 1999
const AKTUELLES_JAHR = new Date().getFullYear()
const JAHRE_FORTBILDUNG = AKTUELLES_JAHR - GRUENDUNGSJAHR
const THEMENBEREICHE_ANZAHL = 5

export default async function FortbildungenPage() {
  const [einstellungen, fortbildungen] = await Promise.all([
    getEinstellungen(),
    getFortbildungen() as Promise<Fortbildung[]>,
  ])

  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - 18)
  const aktuelle = fortbildungen.filter((f) => new Date(f.datum) >= cutoff)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", href: "/" },
          { name: "Fortbildungen", href: "/fortbildungen" },
        ]}
      />
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative bg-zinc-950 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-6">
                <GraduationCap className="h-4 w-4" />
                Fortbildungen
              </span>
              <h1
                className="text-5xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fortbildung seit {GRUENDUNGSJAHR}
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-12">
                Fachkompetenz entsteht nicht einmalig, sie wird staendig erneuert. Seit {GRUENDUNGSJAHR} besucht
                Dipl.-Ing. Gerhard Schmidt regelmaessig Fachseminare und Fortbildungen, um den hoechsten
                Standard in der Begutachtung sicherzustellen.
              </p>

              {/* Stats-Grid */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <span
                    className="block text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {JAHRE_FORTBILDUNG}+
                  </span>
                  <span className="text-zinc-500 text-sm">Jahre Fortbildung</span>
                </div>
                <div className="border-l border-white/10 pl-8">
                  <span
                    className="block text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {fortbildungen.length > 0 ? fortbildungen.length : "50+"}
                  </span>
                  <span className="text-zinc-500 text-sm">Fortbildungen gesamt</span>
                </div>
                <div className="border-l border-white/10 pl-8">
                  <span
                    className="block text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {THEMENBEREICHE_ANZAHL}
                  </span>
                  <span className="text-zinc-500 text-sm">Themenbereiche</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Themen-Cluster */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Themengebiete</span>
              <h2
                className="text-3xl font-bold text-foreground mt-2 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fortbildungen nach Themenbereich
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Klicken Sie auf einen Themenbereich, um alle Fortbildungen in diesem Gebiet zu sehen.
              </p>
            </div>

            {/* Icon-Legende */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Droplets, label: "Feuchte & Schimmel", colorClass: "text-blue-500 bg-blue-500/10" },
                { icon: Layers, label: "Abdichtung", colorClass: "text-emerald-500 bg-emerald-500/10" },
                { icon: Building2, label: "WDVS & Fassade", colorClass: "text-amber-500 bg-amber-500/10" },
                { icon: Zap, label: "Energieeffizienz", colorClass: "text-violet-500 bg-violet-500/10" },
                { icon: Scale, label: "Recht", colorClass: "text-rose-500 bg-rose-500/10" },
              ].map(({ icon: Icon, label, colorClass }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`h-7 w-7 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            <FortbildungCluster fortbildungen={fortbildungen} />
          </div>
        </section>

        {/* Aktuelle Fortbildungen */}
        {aktuelle.length > 0 && (
          <section className="py-24 bg-secondary/20 border-t border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mb-10">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Letzte 18 Monate
                </span>
                <h2
                  className="text-3xl font-bold text-foreground mt-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Aktuelle Fortbildungen
                </h2>
              </div>

              <div className="space-y-3">
                {aktuelle.map((f) => (
                  <div
                    key={f._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-border/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-[120px]">
                        <CalendarDays className="h-4 w-4 text-primary flex-shrink-0" />
                        {formatDatum(f.datum)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{f.titel}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{f.veranstalter}</p>
                    </div>
                    {f.themenbereich && THEMENBEREICH_LABELS[f.themenbereich] && (
                      <span
                        className={`inline-flex self-start sm:self-center text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                          THEMENBEREICH_BADGE_CLASSES[f.themenbereich] ??
                          "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {THEMENBEREICH_LABELS[f.themenbereich]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-secondary/30 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fragen zur Fachkompetenz?
              </h2>
              <p className="text-muted-foreground text-sm">
                Jetzt anfragen, unverbindlich und direkt.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex-shrink-0"
            >
              Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
