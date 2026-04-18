export const revalidate = 60

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import * as Icons from "lucide-react"
import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { getEinstellungen, getLeistungen } from "@/sanity/lib/queries"

type SanityLeistung = {
  _id: string
  titel: string
  slug?: { current?: string } | string
  kurzBeschreibung?: string
  icon?: string
  bildUrl?: string
  aktiv?: boolean
}

export const metadata = {
  title: "Leistungen, SQ Schmidt Qualitätssicherung",
  description: "Alle Leistungen von SQ Schmidt: Baumediation, Mängelmanagement, Baucontrolling, Schadensgutachten, Sanierungskonzepte und Seminare.",
}

function getIcon(iconName?: string) {
  if (!iconName) return Icons.ShieldCheck
  const Icon = (Icons as unknown as Record<string, typeof Icons.ShieldCheck>)[iconName]
  return Icon ?? Icons.ShieldCheck
}

function slugOf(l: SanityLeistung) {
  return typeof l.slug === "string" ? l.slug : l.slug?.current ?? ""
}

export default async function LeistungenPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sq-sv.de"
  const [einstellungen, leistungenRaw] = await Promise.all([getEinstellungen(), getLeistungen() as Promise<SanityLeistung[]>])
  const leistungen = leistungenRaw.filter(l => l.aktiv !== false && slugOf(l))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Leistungen, SQ Schmidt Qualitätssicherung",
    itemListElement: leistungen.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: l.titel,
        description: l.kurzBeschreibung ?? "",
        provider: {
          "@type": "LocalBusiness",
          name: "SQ Schmidt Qualitätssicherung",
          url: siteUrl,
        },
        areaServed: { "@type": "Country", name: "DE" },
        url: `${siteUrl}/leistungen/${slugOf(l)}`,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[{ name: "Leistungen" }]} />
      <Header einstellungen={einstellungen} />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Unsere Expertise</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Alle Leistungen
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Profitieren Sie von unserer langjährigen Erfahrung in der Qualitätssicherung im Bauwesen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leistungen.map(l => {
              const Icon = getIcon(l.icon)
              const slug = slugOf(l)
              return (
                <Link key={l._id} href={`/leistungen/${slug}`} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all">
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                    {l.bildUrl ? (
                      <Image src={l.bildUrl} alt={l.titel} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <Icon className="h-12 w-12 text-zinc-700" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 h-10 w-10 rounded-lg bg-primary/90 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-foreground flex items-center justify-between mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {l.titel}
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </h2>
                    {l.kurzBeschreibung && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{l.kurzBeschreibung}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-16 p-8 bg-card border border-border rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>Nicht das Richtige dabei?</h2>
            <p className="text-muted-foreground mb-6">Kontaktieren Sie uns direkt, wir finden gemeinsam die passende Lösung für Ihr Projekt.</p>
            <Link href="/#kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Anfrage senden <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
