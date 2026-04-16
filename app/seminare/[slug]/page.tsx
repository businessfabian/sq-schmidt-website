import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getSeminarBySlug, getEinstellungen } from "@/sanity/lib/queries"
import { Calendar, MapPin, Clock, ArrowRight, Tag, ExternalLink } from "lucide-react"
import { formatSeminarDatum } from "@/lib/formatSeminarDatum"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function SeminarDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const [einstellungen, seminar] = await Promise.all([getEinstellungen(), getSeminarBySlug(slug)])
  if (!seminar) notFound()

  return (
    <>
      <Header einstellungen={einstellungen} />
      <main className="min-h-screen bg-background">
        <section className="relative bg-zinc-950 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
            <Link href="/seminare" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-6 transition-colors">
              Zurück zu Seminartermine
            </Link>
            {seminar.kategorie && (
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Tag className="h-3 w-3" />{seminar.kategorie}
                </span>
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>{seminar.titel}</h1>
            <div className="flex flex-wrap gap-6 text-zinc-400">
              {seminar.datumVon && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{formatSeminarDatum(seminar.datumVon, seminar.datumBis)}</div>}
              {seminar.uhrzeit && <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{seminar.uhrzeit}</div>}
              {seminar.ort && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{seminar.ort}</div>}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-foreground mb-4">Beschreibung</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{seminar.beschreibung}</p>
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold text-foreground mb-4">Details</h3>
                  <div className="space-y-3 text-sm">
                    {seminar.datumVon && <div><p className="text-muted-foreground">Datum</p><p className="font-medium text-foreground">{formatSeminarDatum(seminar.datumVon, seminar.datumBis)}</p></div>}
                    {seminar.uhrzeit && <div><p className="text-muted-foreground">Uhrzeit</p><p className="font-medium text-foreground">{seminar.uhrzeit}</p></div>}
                    {seminar.ort && <div><p className="text-muted-foreground">Ort</p><p className="font-medium text-foreground">{seminar.ort}</p></div>}
                    {seminar.preis && <div><p className="text-muted-foreground">Preis</p><p className="font-bold text-primary text-lg">{seminar.preis}</p></div>}
                  </div>
                  {seminar.anmeldeLink ? (
                    <a href={seminar.anmeldeLink} target="_blank" rel="noopener noreferrer"
                      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                      Jetzt anmelden <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link href="/kontakt"
                      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                      Anfrage senden <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
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