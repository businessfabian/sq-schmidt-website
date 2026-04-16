export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen, getPartner } from "@/sanity/lib/queries"
import { partnersData } from "@/lib/services-data"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Kooperationspartner | SQ Schmidt Qualitaetssicherung",
  description: "Unser Netzwerk aus fuehrenden Experten und Institutionen der Baubranche.",
}

export default async function PartnerPage() {
  const [einstellungen, sanityPartner] = await Promise.all([getEinstellungen(), getPartner()])

  const hasSanityPartner = sanityPartner && sanityPartner.length > 0
  const partner: { name: string; beschreibung: string; webseite: string | null; logo: string | null }[] =
    hasSanityPartner
      ? sanityPartner.filter((p: any) => p.aktiv !== false).map((p: any) => ({
          name: p.name,
          beschreibung: p.beschreibung ?? "",
          webseite: p.webseite ?? null,
          logo: p.logo ?? null,
        }))
      : partnersData.map((p) => ({ name: p.name, beschreibung: p.description, webseite: null, logo: null }))

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", href: "/" },
          { name: "Partner", href: "/partner" },
        ]}
      />
      <Header einstellungen={einstellungen} />

      <main className="min-h-screen bg-zinc-950">

        {/* Page Header */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-36 pb-16 border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-widest">Netzwerk</span>
              <h1
                className="mt-3 text-5xl sm:text-6xl font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Unsere
                <br />
                <span className="text-primary">Partner</span>
              </h1>
            </div>
            <p className="text-zinc-500 max-w-xs text-sm leading-relaxed sm:text-right">
              Ausgewaehlte Experten und Institutionen, mit denen wir gemeinsam
              hoechste Qualitaet im Bauwesen sicherstellen.
            </p>
          </div>
        </div>

        {/* Partner -- grossformatige Zeilen */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {partner.map((p, i) => {
            const content = (
              <div className="group flex items-center gap-6 lg:gap-10 py-8 lg:py-10 border-b border-zinc-800/60 transition-colors hover:bg-zinc-900/30 -mx-6 lg:-mx-8 px-6 lg:px-8">

                {/* Nummer */}
                <span
                  className="hidden sm:block text-5xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors select-none flex-shrink-0 w-14 text-right"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Logo oder Initiale */}
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                  {p.logo ? (
                    <div className="relative h-7 w-7">
                      <Image src={p.logo} alt={p.name} fill sizes="48px" className="object-contain brightness-90 group-hover:brightness-100 transition-all" />
                    </div>
                  ) : (
                    <span
                      className="text-lg font-bold text-zinc-500 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.name.trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Name + Beschreibung */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </p>
                  {p.beschreibung && (
                    <p className="text-sm text-zinc-500 mt-1 truncate">{p.beschreibung}</p>
                  )}
                </div>

                {/* Link */}
                {p.webseite ? (
                  <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 group-hover:text-primary transition-colors">
                    Website
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="flex-shrink-0 w-14" />
                )}
              </div>
            )

            return p.webseite ? (
              <a key={i} href={p.webseite} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={i}>{content}</div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Werden Sie Partner
              </p>
              <p className="text-zinc-500 text-sm mt-1">Experte im Bauwesen? Wir freuen uns auf Ihre Anfrage.</p>
            </div>
            <Link
              href="/#kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex-shrink-0"
            >
              Kontakt aufnehmen
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </main>

      <Footer einstellungen={einstellungen} />
    </>
  )
}
