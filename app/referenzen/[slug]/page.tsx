import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ProjektGalerieLightbox } from "@/components/projekt-galerie-lightbox"

type LeistungRef = { _id: string; titel: string; slug?: { current?: string } | string }
type GalerieItem = { url?: string; alt?: string; caption?: string }
type SanityProjekt = {
  _id: string
  titel: string
  slug?: { current?: string } | string
  projektDatum?: string
  kategorie?: string
  ort?: string
  kurzbeschreibung?: string
  beschreibung?: string
  aufgabenstellung?: string
  loesung?: string
  ergebnis?: string
  titelbildUrl?: string
  titelbildAlt?: string
  galerie?: GalerieItem[]
  verlinkteLeistungen?: LeistungRef[]
  seoTitel?: string
  seoBeschreibung?: string
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

const PROJEKT_QUERY = `*[_type == "projekt" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id, titel, slug, projektDatum, kategorie, ort, kurzbeschreibung,
  beschreibung, aufgabenstellung, loesung, ergebnis,
  "titelbildUrl": titelbild.asset->url,
  "titelbildAlt": titelbild.alt,
  galerie[] { "url": asset->url, alt, caption },
  verlinkteLeistungen[]->{ _id, titel, slug },
  seoTitel, seoBeschreibung
}`

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const projekt = await client.fetch<SanityProjekt | null>(PROJEKT_QUERY, { slug })
  if (!projekt) return {}

  const title = projekt.seoTitel || `${projekt.titel} | Referenzen | SQ Schmidt`
  const description = projekt.seoBeschreibung || projekt.kurzbeschreibung || ""

  return {
    title,
    description,
    alternates: { canonical: `/referenzen/${slug}` },
    openGraph: {
      title: projekt.titel,
      description: projekt.kurzbeschreibung ?? "",
      images: projekt.titelbildUrl ? [projekt.titelbildUrl] : [],
    },
    twitter: { card: "summary_large_image", title, description },
  }
}

export const revalidate = 60

export async function generateStaticParams() {
  const projekte = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "projekt" && !(_id in path("drafts.**"))]{ slug }`
  )
  return projekte
    .map(p => ({ slug: p.slug?.current }))
    .filter((p): p is { slug: string } => Boolean(p.slug))
}

function slugOfLeistung(l: LeistungRef): string {
  return typeof l.slug === "string" ? l.slug : l.slug?.current ?? ""
}

function formatDatum(datum?: string): string {
  if (!datum) return ""
  return new Date(datum).toLocaleDateString("de-DE", { year: "numeric", month: "long" })
}

export default async function ProjektDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [einstellungen, projekt] = await Promise.all([
    getEinstellungen(),
    client.fetch<SanityProjekt | null>(PROJEKT_QUERY, { slug }),
  ])

  if (!projekt) notFound()

  const datumStr = formatDatum(projekt.projektDatum)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projekt.titel,
    description: projekt.kurzbeschreibung ?? "",
    ...(projekt.projektDatum && { datePublished: projekt.projektDatum }),
    ...(projekt.titelbildUrl && { image: projekt.titelbildUrl }),
    creator: {
      "@type": "ProfessionalService",
      name: "SQ Schmidt Qualitätssicherung",
      url: "https://www.sq-sv.de",
    },
    ...(projekt.ort && { locationCreated: { "@type": "Place", name: projekt.ort } }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">
        <section className="relative bg-zinc-950 overflow-hidden">
          {projekt.titelbildUrl && (
            <div className="absolute inset-0 opacity-25">
              <Image
                src={projekt.titelbildUrl}
                alt={projekt.titelbildAlt ?? ""}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
            </div>
          )}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <Link
              href="/referenzen"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Alle Referenzen
            </Link>
            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {projekt.titel}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              {projekt.ort && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />{projekt.ort}
                </span>
              )}
              {datumStr && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />{datumStr}
                </span>
              )}
              {projekt.kategorie && (
                <span className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4" />
                  {KATEGORIE_LABELS[projekt.kategorie] ?? projekt.kategorie}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                {projekt.beschreibung && (
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                    {projekt.beschreibung}
                  </p>
                )}

                {(projekt.aufgabenstellung || projekt.loesung || projekt.ergebnis) && (
                  <div className="space-y-6">
                    {projekt.aufgabenstellung && (
                      <div>
                        <h2
                          className="text-lg font-semibold text-foreground mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Aufgabenstellung
                        </h2>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {projekt.aufgabenstellung}
                        </p>
                      </div>
                    )}
                    {projekt.loesung && (
                      <div>
                        <h2
                          className="text-lg font-semibold text-foreground mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Vorgehen
                        </h2>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {projekt.loesung}
                        </p>
                      </div>
                    )}
                    {projekt.ergebnis && (
                      <div>
                        <h2
                          className="text-lg font-semibold text-foreground mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Ergebnis
                        </h2>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {projekt.ergebnis}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {projekt.galerie && projekt.galerie.length > 0 && (
                  <div>
                    <h2
                      className="text-lg font-semibold text-foreground mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Bildergalerie
                    </h2>
                    <ProjektGalerieLightbox galerie={projekt.galerie.filter((img): img is GalerieItem & { url: string } => !!img.url)} />
                  </div>
                )}

                {projekt.verlinkteLeistungen && projekt.verlinkteLeistungen.length > 0 && (
                  <div>
                    <h2
                      className="text-lg font-semibold text-foreground mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Erbrachte Leistungen
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {projekt.verlinkteLeistungen.map(l => (
                        <Link
                          key={l._id}
                          href={`/leistungen/${slugOfLeistung(l)}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                        >
                          {l.titel} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3
                    className="font-semibold text-foreground mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Aehnliches Projekt?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sprechen Sie uns an, wir begleiten Sie von der Begutachtung bis zur Lösung.
                  </p>
                  <Link
                    href="/kontakt"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all"
                  >
                    Anfrage senden <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
