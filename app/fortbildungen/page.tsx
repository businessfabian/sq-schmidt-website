export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen } from "@/sanity/lib/queries"
import { GraduationCap, Clock, ArrowRight, Bell } from "lucide-react"
import Link from "next/link"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata = {
  title: "Fortbildungen | SQ Schmidt Qualitätssicherung",
  description: "Fortbildungsangebote von SQ Schmidt Qualitätssicherung. Demnächst verfügbar.",
}

export default async function FortbildungenPage() {
  const einstellungen = await getEinstellungen()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", href: "/" },
          { name: "Fortbildungen", href: "/fortbildungen" },
        ]}
      />
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative bg-zinc-950 text-white py-24 lg:py-32 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-6">
                <GraduationCap className="h-4 w-4" />
                Fortbildungen
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fortbildungen
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Wir arbeiten an unserem Fortbildungsangebot. Hier finden Sie bald weitere Informationen.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mx-auto mb-8">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Demnächst verfügbar
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Unser Fortbildungsangebot befindet sich derzeit im Aufbau. Schauen Sie bald wieder vorbei oder nehmen Sie direkt Kontakt mit uns auf.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#kontakt"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary/90 transition-all hover:gap-3"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/seminare"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-foreground rounded-lg font-semibold text-base hover:bg-secondary/80 transition-all"
                >
                  <Bell className="h-5 w-5" />
                  Seminartermine ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
