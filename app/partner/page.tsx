export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen, getPartner } from "@/sanity/lib/queries"
import { partnersData } from "@/lib/services-data"
import { ExternalLink, ArrowRight, Users } from "lucide-react"
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
  const partner = hasSanityPartner
    ? sanityPartner.filter((p: any) => p.aktiv !== false)
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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180" /> Startseite
          </Link>
          <div className="flex items-start gap-6">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Netzwerk</span>
              <h1
                className="mt-2 text-4xl sm:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kooperationspartner
              </h1>
              <p className="mt-4 text-zinc-400 max-w-2xl leading-relaxed">
                Wir arbeiten mit ausgewaehlten Experten und Institutionen der Baubranche zusammen,
                um Ihnen hoechste Qualitaet und ein lueckenloses Leistungsspektrum zu garantieren.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20">

          {/* Partner-Liste */}
          <div className="divide-y divide-border">
            {partner.map((p: any, i: number) => (
              <div key={i} className="group flex items-start gap-6 py-8">

                {/* Initiale oder Logo */}
                <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                  {p.logo ? (
                    <div className="relative h-8 w-8">
                      <Image
                        src={p.logo}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span
                      className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {(p.name as string).trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Inhalt */}
                <div className="flex-1 min-w-0 pt-1">
                  <h2
                    className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </h2>
                  {(p.beschreibung ?? p.description) && (
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {p.beschreibung ?? p.description}
                    </p>
                  )}
                  {p.webseite && (
                    <a
                      href={p.webseite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-primary hover:underline underline-offset-2"
                    >
                      Website besuchen <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {/* Pfeil rechts bei hover */}
                <div className="flex-shrink-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 p-10">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl" />
            <div className="relative">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Netzwerk erweitern</span>
              <h2
                className="mt-2 text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Werden Sie Partner
              </h2>
              <p className="mt-3 text-zinc-400 max-w-lg leading-relaxed">
                Sind Sie Experte im Bauwesen und moechten Teil unseres Netzwerks werden?
                Wir freuen uns auf Ihre Kontaktaufnahme.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer einstellungen={einstellungen} />
    </>
  )
}
