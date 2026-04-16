export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen, getPartner } from "@/sanity/lib/queries"
import { partnersData } from "@/lib/services-data"
import { ExternalLink, ArrowRight, Mail } from "lucide-react"
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

      <main className="min-h-screen bg-background">

        {/* Slim Page Header */}
        <div className="pt-32 pb-12 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">Netzwerk</span>
                <h1
                  className="mt-2 text-3xl md:text-4xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Kooperationspartner
                </h1>
                <p className="mt-2 text-muted-foreground max-w-xl">
                  Ausgewaehlte Experten, mit denen wir fuer Sie zusammenarbeiten.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>

        {/* Partner-Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 gap-3">
            {partner.map((p: any, i: number) => {
              const hasWebsite = !!p.webseite
              const Wrapper = hasWebsite ? "a" : "div"
              const wrapperProps = hasWebsite
                ? { href: p.webseite, target: "_blank", rel: "noopener noreferrer" }
                : {}

              return (
                <Wrapper
                  key={i}
                  {...(wrapperProps as any)}
                  className={`group flex items-center gap-5 p-5 rounded-2xl border border-border bg-card transition-all ${hasWebsite ? "hover:border-primary/40 hover:shadow-md cursor-pointer" : ""}`}
                >
                  {/* Badge */}
                  <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                    {p.logo ? (
                      <div className="relative h-8 w-8">
                        <Image src={p.logo} alt={p.name} fill sizes="56px" className="object-contain" />
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

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {p.name}
                    </p>
                    {(p.beschreibung ?? p.description) && (
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                        {p.beschreibung ?? p.description}
                      </p>
                    )}
                  </div>

                  {/* Link-Icon */}
                  {hasWebsite && (
                    <ExternalLink className="flex-shrink-0 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  )}
                </Wrapper>
              )
            })}
          </div>

          {/* CTA -- schmal, horizontal */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-secondary/60 border border-border">
            <div>
              <p className="font-semibold text-foreground">Werden Sie Partner</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Experte im Bauwesen? Wir freuen uns auf Ihre Anfrage.
              </p>
            </div>
            <a
              href="/#kontakt"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Kontakt aufnehmen
            </a>
          </div>
        </div>

      </main>

      <Footer einstellungen={einstellungen} />
    </>
  )
}
