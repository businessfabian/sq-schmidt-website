export const revalidate = 60

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { getEinstellungen, getProjekte } from "@/sanity/lib/queries"

type SanityProjekt = {
  _id: string
  titel: string
  slug?: { current?: string } | string
  projektDatum?: string
  kategorie?: string
  ort?: string
  kurzbeschreibung?: string
  titelbildUrl?: string
  titelbildAlt?: string
}

const KATEGORIE_LABELS: Record<string, string> = {
  schadensgutachten: "Schadensgutachten",
  baubegleitung: "Baubegleitung",
  beweissicherung: "Beweissicherung",
  schimmel: "Schimmelpilzgutachten",
  sanierung: "Sanierungskonzept",
  baumediation: "Baumediation",
  bauleitung: "Bauleitung",
  sonstiges: "Sonstiges",
}

export const metadata = {
  title: "Referenzen | SQ Schmidt Bausachverstaendiger",
  description: "Abgeschlossene Projekte von SQ Schmidt Qualitaetssicherung. Schadensgutachten, Baubegleitung und Beweissicherung im Schwarzwald-Baar-Kreis und Tuttlingen.",
  alternates: { canonical: "/referenzen" },
}

function slugOf(p: SanityProjekt): string {
  return typeof p.slug === "string" ? p.slug : p.slug?.current ?? ""
}

function formatDatum(datum?: string): string {
  if (!datum) return ""
  return new Date(datum).toLocaleDateString("de-DE", { year: "numeric", month: "long" })
}

export default async function ReferenzenPage() {
  const [einstellungen, projekte] = await Promise.all([
    getEinstellungen(),
    getProjekte() as Promise<SanityProjekt[]>,
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Referenzen SQ Schmidt",
    description: "Abgeschlossene Projekte und Referenzen",
    url: "https://www.sq-sv.de/referenzen",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[{ name: "Referenzen" }]} />
      <Header einstellungen={einstellungen} />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Unsere Arbeit</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Referenzen
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Einblicke in abgeschlossene Projekte aus dem Schwarzwald-Baar-Kreis, Tuttlingen und der Umgebung.
            </p>
          </div>

          {projekte.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Aktuelle Referenzen werden derzeit zusammengestellt. Fuer Einblicke in unsere laufenden und abgeschlossenen Projekte sprechen Sie uns gerne direkt an.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projekte.map(p => {
                const slug = slugOf(p)
                return (
                  <Link
                    key={p._id}
                    href={`/referenzen/${slug}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                      {p.titelbildUrl ? (
                        <Image
                          src={p.titelbildUrl}
                          alt={p.titelbildAlt ?? p.titel}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-zinc-700 text-sm">Kein Bild</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      {p.kategorie && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded">
                            {KATEGORIE_LABELS[p.kategorie] ?? p.kategorie}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h2
                        className="text-lg font-semibold text-foreground flex items-center justify-between mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <span className="flex-1 mr-2">{p.titel}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        {p.ort && <span>{p.ort}</span>}
                        {p.ort && p.projektDatum && <span>·</span>}
                        {p.projektDatum && <span>{formatDatum(p.projektDatum)}</span>}
                      </div>
                      {p.kurzbeschreibung && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {p.kurzbeschreibung}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
