export const revalidate = 60

import Image from "next/image"
import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { getReferenzen, getEinstellungen } from "@/sanity/lib/queries"
import { ScrollReveal } from "@/components/ScrollReveal"
import { Building2 } from "lucide-react"

export const metadata = {
  title: "Referenzen — SQ Schmidt Qualitätssicherung",
  description: "Ausgewählte Referenzprojekte aus der Qualitätssicherung im Bauwesen.",
}

export default async function ReferenzenPage() {
  const [einstellungen, referenzen] = await Promise.all([
    getEinstellungen(),
    getReferenzen(),
  ])

  const list = referenzen ?? []
  const kategorien = [...new Set(list.map((r: any) => r.kategorie).filter(Boolean))] as string[]

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Referenzen" }]} />
      <Header einstellungen={einstellungen} />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Projekte</span>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Unsere Referenzen
              </h1>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Ausgewählte Projekte aus unserer langjährigen Tätigkeit in der Qualitätssicherung im Bauwesen.
              </p>
            </div>
          </ScrollReveal>

          {list.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">Aktuell keine Referenzen vorhanden.</p>
          ) : (
            <ScrollReveal stagger={100}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((ref: any) => (
                  <div key={ref._id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl transition-all group">
                    <div className="relative h-52 w-full bg-secondary">
                      {ref.bild ? (
                        <Image
                          src={ref.bild}
                          alt={ref.titel}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Building2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {ref.kategorie && (
                        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                          {ref.kategorie}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {ref.titel}
                      </h3>
                      {ref.beschreibung && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {ref.beschreibung}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
