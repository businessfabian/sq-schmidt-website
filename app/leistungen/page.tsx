import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { servicesData } from "@/lib/services-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Leistungen — SQ Schmidt Qualitätssicherung",
  description: "Alle Leistungen von SQ Schmidt: Baumediation, Mängelmanagement, Baucontrolling, Schadensgutachten, Sanierungskonzepte und Seminare.",
}

export default function LeistungenPage() {
  return (
    <>
      <Header />
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
            {servicesData.map((service) => (
              <Link key={service.slug} href={`/leistungen/${service.slug}`} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 h-10 w-10 rounded-lg bg-primary/90 flex items-center justify-center">
                    <service.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-foreground flex items-center justify-between mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 p-8 bg-card border border-border rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>Nicht das Richtige dabei?</h2>
            <p className="text-muted-foreground mb-6">Kontaktieren Sie uns direkt — wir finden gemeinsam die passende Lösung für Ihr Projekt.</p>
            <Link href="/#kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Kostenlose Beratung anfragen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}