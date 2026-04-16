export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen, getPartner } from "@/sanity/lib/queries"
import { partnersData } from "@/lib/services-data"
import { ArrowUpRight } from "lucide-react"
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
        items={[{ name: "Startseite", href: "/" }, { name: "Partner", href: "/partner" }]}
      />
      <Header einstellungen={einstellungen} />

      <main className="min-h-screen bg-background flex flex-col">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8 pt-32 pb-16 flex flex-col gap-10 flex-1">

          {/* Header -- kompakt */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Netzwerk</span>
              <h1 className="mt-1 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Kooperationspartner
              </h1>
            </div>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Zurück zur Startseite
            </Link>
          </div>

          {/* 2×2 Partner-Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {partner.map((p, i) => {
              const Wrapper = p.webseite ? "a" : "div"
              const props = p.webseite
                ? { href: p.webseite, target: "_blank", rel: "noopener noreferrer" }
                : {}

              return (
                <Wrapper
                  key={i}
                  {...(props as any)}
                  className={`group relative flex items-center gap-4 p-5 rounded-2xl border border-border bg-card transition-all ${p.webseite ? "hover:border-primary/50 hover:shadow-md" : ""}`}
                >
                  {/* Linke Akzentlinie */}
                  <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-border rounded-full group-hover:bg-primary transition-colors" />

                  {/* Logo / Initiale */}
                  <div className="flex-shrink-0 h-11 w-11 rounded-lg bg-secondary flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                    {p.logo ? (
                      <div className="relative h-6 w-6">
                        <Image src={p.logo} alt={p.name} fill sizes="44px" className="object-contain" />
                      </div>
                    ) : (
                      <span className="text-base font-bold text-muted-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        {p.name.trim().charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug">
                      {p.name}
                    </p>
                    {p.beschreibung && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{p.beschreibung}</p>
                    )}
                    {p.webseite && (
                      <p className="text-xs text-primary/60 group-hover:text-primary mt-1 transition-colors truncate">
                        {new URL(p.webseite).hostname.replace(/^www\./, "")}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  {p.webseite && (
                    <ArrowUpRight className="flex-shrink-0 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  )}
                </Wrapper>
              )
            })}
          </div>

          {/* CTA -- direkt darunter, kein eigener Section-Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
            <div>
              <p className="font-semibold text-foreground text-sm">Werden Sie Partner</p>
              <p className="text-xs text-muted-foreground mt-0.5">Experte im Bauwesen? Wir freuen uns auf Ihre Anfrage.</p>
            </div>
            <Link
              href="/#kontakt"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex-shrink-0"
            >
              Kontakt aufnehmen
            </Link>
          </div>

        </div>
      </main>

      <Footer einstellungen={einstellungen} />
    </>
  )
}
