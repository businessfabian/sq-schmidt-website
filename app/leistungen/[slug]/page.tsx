import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen, getLeistungen } from "@/sanity/lib/queries"
import { getServiceBySlug, servicesData } from "@/lib/services-data"
import { notFound } from "next/navigation"
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import * as Icons from "lucide-react"

export async function generateStaticParams() {
  const leistungen = await getLeistungen()
  const sanityslugs = leistungen.map((l: any) => ({ slug: l.slug?.current ?? l.slug }))
  const staticSlugs = servicesData.map(s => ({ slug: s.slug }))
  return [...sanityslugs, ...staticSlugs]
}

export default async function LeistungDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const [einstellungen, leistungen] = await Promise.all([getEinstellungen(), getLeistungen()])

  // Sanity zuerst, dann statischer Fallback
  const sanityLeistung = leistungen.find((l: any) => (l.slug?.current ?? l.slug) === slug)
  const staticLeistung = getServiceBySlug(slug)

  if (!sanityLeistung && !staticLeistung) notFound()

  function getIcon(iconName: string) {
    const Icon = (Icons as any)[iconName]
    return Icon ?? Icons.ShieldCheck
  }

  if (sanityLeistung) {
    const Icon = getIcon(sanityLeistung.icon)
    return (
      <>
        <Header einstellungen={einstellungen} />
        <main className="min-h-screen bg-background">
          <section className="relative bg-zinc-950 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
              <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Alle Leistungen
              </Link>
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    {sanityLeistung.titel}
                  </h1>
                  <p className="text-zinc-400 text-lg max-w-2xl">{sanityLeistung.kurzBeschreibung}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                    {sanityLeistung.beschreibung || sanityLeistung.kurzBeschreibung}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-card border border-border rounded-2xl">
                    <h3 className="font-semibold text-foreground mb-4">Jetzt anfragen</h3>
                    <p className="text-sm text-muted-foreground mb-4">Kostenlose Erstberatung — wir melden uns innerhalb von 24 Stunden.</p>
                    <Link href="/kontakt" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                      Anfrage senden <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer einstellungen={einstellungen} />
      </>
    )
  }

  // Statischer Fallback
  const service = staticLeistung!
  const Icon = service.icon
  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">
        <section className="relative bg-zinc-950 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Alle Leistungen
            </Link>
            <div className="flex items-start gap-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>{service.title}</h1>
                <p className="text-zinc-400 text-lg max-w-2xl">{service.shortDescription}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <p className="text-muted-foreground leading-relaxed text-lg">{service.fullDescription}</p>
                {service.features && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Leistungsumfang</h2>
                    <ul className="space-y-2">
                      {service.features.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold text-foreground mb-4">Jetzt anfragen</h3>
                  <p className="text-sm text-muted-foreground mb-4">Kostenlose Erstberatung — wir melden uns innerhalb von 24 Stunden.</p>
                  <Link href="/kontakt" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                    Anfrage senden <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}