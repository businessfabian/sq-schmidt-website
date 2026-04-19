export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen } from "@/sanity/lib/queries"
import { ExternalLink, Scale } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata = {
  title: "Aktuelles Baurecht | SQ Schmidt Schwarzwald-Baar",
  description: "Aktuelle Urteile und Neuigkeiten zum Baurecht fuer Bauprofis im Schwarzwald-Baar-Kreis -- powered by IBR-online. SQ Schmidt Qualitaetssicherung Trossingen.",
  alternates: { canonical: "/aktuelles" },
}

export default async function AktuellesPage() {
  const einstellungen = await getEinstellungen()

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Aktuelles" }]} />
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative bg-zinc-950 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <div className="max-w-2xl">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Baurecht & Urteile</span>
              <h1 className="text-5xl font-bold text-white mt-4 mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Aktuelles / Baurecht IBR
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Aktuelle Urteile und Entscheidungen zum Baurecht — kuratiert von IBR-online, dem führenden juristischen Informationsdienst für das Bauwesen.
              </p>
            </div>
          </div>
        </section>

        {/* IBR Iframe */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    IBR-online Rechtsprechung
                  </h2>
                  <p className="text-sm text-muted-foreground">Laufend aktualisiert</p>
                </div>
              </div>
              <a
                href="https://www.ibr-online.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                ibr-online.de <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Iframe Container */}
            <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
              <iframe
                src="https://www.ibr-online.de/Zusatzdienste/Urteilsfenster/Urteilsfenster.php?id=2d1b2a5ff364606ff041650887723470&TID=8505722122775923"
                className="w-full"
                style={{ height: "700px", border: "none" }}
                title="IBR-online Baurecht Aktuell"
                loading="lazy"
              />
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Quelle: <a href="https://www.ibr-online.de" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IBR-online.de</a> — Immobilien- & Baurecht
            </p>
          </div>
        </section>

      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}