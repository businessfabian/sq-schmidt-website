import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen, getLeistungen } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import * as Icons from "lucide-react"

type ProzessSchritt = { titel?: string; beschreibung?: string }
type SanityLeistung = {
  _id: string
  titel: string
  slug?: { current?: string } | string
  kurzBeschreibung?: string
  beschreibung?: string
  icon?: string
  bildUrl?: string
  leistungsumfang?: string[]
  prozess?: ProzessSchritt[]
}

export const revalidate = 60

export async function generateStaticParams() {
  const leistungen = (await getLeistungen()) as SanityLeistung[]
  return leistungen.map(l => {
    const slug = typeof l.slug === "string" ? l.slug : l.slug?.current
    return { slug: slug ?? "" }
  }).filter(p => p.slug)
}

function getIcon(iconName?: string) {
  if (!iconName) return Icons.ShieldCheck
  const Icon = (Icons as unknown as Record<string, typeof Icons.ShieldCheck>)[iconName]
  return Icon ?? Icons.ShieldCheck
}

export default async function LeistungDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [einstellungen, leistungen] = await Promise.all([getEinstellungen(), getLeistungen() as Promise<SanityLeistung[]>])

  const leistung = leistungen.find(l => (typeof l.slug === "string" ? l.slug : l.slug?.current) === slug)
  if (!leistung) notFound()

  const Icon = getIcon(leistung.icon)
  const features = leistung.leistungsumfang?.filter(Boolean) ?? []
  const prozess = leistung.prozess?.filter(p => p?.titel || p?.beschreibung) ?? []

  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">
        <section className="relative bg-zinc-950 overflow-hidden">
          {leistung.bildUrl && (
            <div className="absolute inset-0 opacity-20">
              <Image src={leistung.bildUrl} alt="" fill sizes="100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
            </div>
          )}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Alle Leistungen
            </Link>
            <div className="flex items-start gap-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {leistung.titel}
                </h1>
                {leistung.kurzBeschreibung && (
                  <p className="text-zinc-400 text-lg max-w-2xl">{leistung.kurzBeschreibung}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                {leistung.beschreibung && (
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                    {leistung.beschreibung}
                  </p>
                )}
                {features.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Leistungsumfang</h2>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Jetzt anfragen</h3>
                  <p className="text-sm text-muted-foreground mb-4">Wir melden uns innerhalb von 24 Stunden.</p>
                  <Link href="/kontakt" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                    Anfrage senden <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {prozess.length > 0 && (
          <section className="py-16 bg-card/40 border-t border-border">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-10 text-center" style={{ fontFamily: "var(--font-display)" }}>
                Unser Ablauf
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {prozess.map((p, i) => (
                  <div key={i} className="relative p-6 bg-background border border-border rounded-2xl">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-4">
                      {i + 1}
                    </div>
                    {p.titel && (
                      <h3 className="text-foreground font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>{p.titel}</h3>
                    )}
                    {p.beschreibung && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.beschreibung}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}
