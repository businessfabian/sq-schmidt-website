export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { partnersData } from "@/lib/services-data"
import { Building2, ExternalLink } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { getPartner, getEinstellungen } from "@/sanity/lib/queries"

export const metadata = {
  title: "Partner — SQ Schmidt Qualitätssicherung",
  description: "Unsere Kooperationspartner aus der Baubranche.",
}

function normalizeUrl(url?: string): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export default async function PartnerPage() {
  const [einstellungen, sanityPartner] = await Promise.all([
    getEinstellungen(),
    getPartner(),
  ])

  const list = (sanityPartner && sanityPartner.length > 0)
    ? sanityPartner
        .filter((p: any) => p.aktiv !== false)
        .map((p: any) => ({ name: p.name, beschreibung: p.beschreibung, webseite: p.webseite }))
    : partnersData.map((p) => ({ name: p.name, beschreibung: p.description, webseite: undefined }))

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Partner" }]} />
      <Header einstellungen={einstellungen} />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Netzwerk</span>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Unsere Kooperationspartner
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Wir arbeiten mit führenden Experten und Institutionen der Baubranche zusammen, um Ihnen höchste Qualität zu garantieren.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((partner: any, i: number) => {
              const url = normalizeUrl(partner.webseite)
              const content = (
                <>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Building2 className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    {url && <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" aria-hidden="true" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{partner.beschreibung}</p>
                  </div>
                </>
              )
              const baseClass = "flex flex-col gap-3 p-6 bg-card border border-border rounded-xl transition-colors group h-full"
              if (url) {
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className={`${baseClass} hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}>
                    {content}
                  </a>
                )
              }
              return (
                <div key={i} className={`${baseClass} hover:border-primary/50`}>
                  {content}
                </div>
              )
            })}
          </div>

          <div className="mt-16 p-8 bg-card border border-border rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>Werden Sie Partner</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Sind Sie Experte im Bauwesen und möchten Teil unseres Netzwerks werden? Wir freuen uns auf Ihre Kontaktaufnahme.</p>
            <a href="/#kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Kontakt aufnehmen <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
