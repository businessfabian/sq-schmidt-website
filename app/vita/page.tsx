export const revalidate = 60

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen } from "@/sanity/lib/queries"
import { GraduationCap, Briefcase, Award, Building2, Users, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata = {
  title: "Vita | SQ Schmidt Qualitätssicherung",
  description: "Beruflicher Werdegang von Dipl.-Ing. Gerhard Schmidt — über 40 Jahre Erfahrung im Bauwesen.",
}

const timeline = [
  {
    jahr: "2021",
    icon: Award,
    kategorie: "Ehrenamt",
    titel: "Vorsitzender Meisterprüfungsausschuss",
    beschreibung: "Vorsitzender des Meisterprüfungsausschusses für das Maurer-Betonbauer-Handwerk der Handwerkskammer Konstanz.",
    highlight: false,
  },
  {
    jahr: "2020",
    icon: Award,
    kategorie: "Qualifikation",
    titel: "Beratender Ingenieur",
    beschreibung: "Beratender Ingenieur der Ingenieurkammer Baden-Württemberg, Nr. 2333.",
    highlight: false,
  },
  {
    jahr: "2017",
    icon: Building2,
    kategorie: "Zertifizierung",
    titel: "Sachverständiger für DEKRA GmbH",
    beschreibung: "Zertifizierter Sachverständiger für die DEKRA GmbH.",
    highlight: false,
  },
  {
    jahr: "2014",
    icon: BookOpen,
    kategorie: "Lehrtätigkeit",
    titel: "Dozent TÜV-Rheinland Akademie",
    beschreibung: "Dozent für den TÜV-Rheinland für Architekten- und Bauleiterfortbildung.",
    highlight: false,
  },
  {
    jahr: "2012",
    icon: BookOpen,
    kategorie: "Lehrtätigkeit",
    titel: "Dozent Handwerkskammer Konstanz",
    beschreibung: "Dozent an der Handwerkskammer Konstanz für die Meisterausbildung im Stuckateurhandwerk.",
    highlight: false,
  },
  {
    jahr: "2009/2010",
    icon: Award,
    kategorie: "Weiterbildung",
    titel: "Zertifizierter Bausachverständiger",
    beschreibung: "Weiterbildung zum zertifizierten Bausachverständigen für Schäden an Gebäuden gemäß DIN EN ISO/IEC 17024 in Aachen.",
    highlight: true,
  },
  {
    jahr: "2009",
    icon: Award,
    kategorie: "Zertifizierung",
    titel: "Sachverständiger Schimmelpilzbelastungen",
    beschreibung: "Weiterbildung zum Sachverständigen für die Erkennung, Bewertung und Sanierung von Schimmelpilzbelastungen in Innenräumen (TÜV zert.) durch den TÜV Rheinland.",
    highlight: false,
  },
  {
    jahr: "Seit 2008",
    icon: BookOpen,
    kategorie: "Seminare",
    titel: "Seminare Haftungsrisiken",
    beschreibung: "Durchführung von Seminaren für den Verlag Dashöfer mit Rechtsanwälten zum Thema \"Vermeidung von Haftungsrisiken für Bauleiter, Architekten und Ingenieure\".",
    highlight: false,
  },
  {
    jahr: "2009",
    icon: BookOpen,
    kategorie: "Seminare",
    titel: "Seminare Gewerkeüberwachung",
    beschreibung: "Durchführung von Seminaren für den Verlag Dashöfer, Handwerksverbände und Kommunen: \"Erfolgreiche Überwachung von Gewerken am Bau\".",
    highlight: false,
  },
  {
    jahr: "2001",
    icon: Briefcase,
    kategorie: "Gründung",
    titel: "Gründung Schmidt Qualitätssicherung",
    beschreibung: "Gründung der Schmidt Qualitätssicherung im Bauwesen Ingenieur- und Sachverständigenbüro.",
    highlight: true,
  },
  {
    jahr: "2001",
    icon: Award,
    kategorie: "Qualifikation",
    titel: "SiGeKo-Zertifizierung",
    beschreibung: "Weiterbildung zum Sicherheits- und Gesundheitskoordinator gemäß BaustellV.",
    highlight: false,
  },
  {
    jahr: "2001",
    icon: Users,
    kategorie: "Verband",
    titel: "VPB Regionalbüro",
    beschreibung: "Leiter Regionalbüro Villingen-Schwenningen und Bauherrenberater für den Verband Privater Bauherren (VPB), Berlin.",
    highlight: false,
  },
  {
    jahr: "1999–2001",
    icon: Briefcase,
    kategorie: "Berufserfahrung",
    titel: "Freier Mitarbeiter Bauträger",
    beschreibung: "Freier Mitarbeiter bei überregional tätigem Bauträger- und Projektentwicklungsunternehmen von Bestandsimmobilien.",
    highlight: false,
  },
  {
    jahr: "1992–1998",
    icon: Building2,
    kategorie: "Berufserfahrung",
    titel: "Geschäftsführer Bauträger",
    beschreibung: "Geschäftsführer eines Bauträger- und Wohnbauunternehmens.",
    highlight: false,
  },
  {
    jahr: "1991–1992",
    icon: Briefcase,
    kategorie: "Berufserfahrung",
    titel: "Bauleiter Fa. Hans Grimmig",
    beschreibung: "Anstellung als Bauleiter bei Fa. Hans Grimmig, Heidelberg.",
    highlight: false,
  },
  {
    jahr: "1991",
    icon: GraduationCap,
    kategorie: "Abschluss",
    titel: "Diplom — Dipl.-Ing. Baubetrieb (FH)",
    beschreibung: "Abschluss als Dipl.-Baubetriebsingenieur (FH) an der FH Karlsruhe.",
    highlight: true,
  },
  {
    jahr: "1985–1990",
    icon: GraduationCap,
    kategorie: "Studium",
    titel: "Studium FH Karlsruhe",
    beschreibung: "Studium an der FH Karlsruhe, Fachbereich Baubetrieb.",
    highlight: false,
  },
  {
    jahr: "1980–1983",
    icon: GraduationCap,
    kategorie: "Ausbildung",
    titel: "Maurerlehre",
    beschreibung: "Maurerlehre mit Abschluss der Gesellenprüfung.",
    highlight: false,
  },
]

const kategorieColors: Record<string, string> = {
  "Gründung": "bg-primary text-primary-foreground",
  "Abschluss": "bg-primary text-primary-foreground",
  "Qualifikation": "bg-blue-500/10 text-blue-500",
  "Zertifizierung": "bg-emerald-500/10 text-emerald-500",
  "Weiterbildung": "bg-violet-500/10 text-violet-500",
  "Lehrtätigkeit": "bg-amber-500/10 text-amber-500",
  "Seminare": "bg-amber-500/10 text-amber-500",
  "Berufserfahrung": "bg-zinc-500/10 text-zinc-400",
  "Studium": "bg-zinc-500/10 text-zinc-400",
  "Ausbildung": "bg-zinc-500/10 text-zinc-400",
  "Ehrenamt": "bg-rose-500/10 text-rose-500",
  "Verband": "bg-cyan-500/10 text-cyan-500",
}

export default async function VitaPage() {
  const einstellungen = await getEinstellungen()
  const bildUrl: string = einstellungen?.uebermichBildUrl || "/images/gerhard-schmidt.jpg"

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Vita" }]} />
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">Beruflicher Werdegang</span>
                <h1 className="text-5xl font-bold text-white mt-4 mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  Vita
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  Über 40 Jahre Erfahrung im Bauwesen — von der Maurerlehre bis zum öffentlich bestellten und vereidigten Sachverständigen.
                </p>
                <div className="flex gap-8">
                  <div>
                    <span className="block text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>2001</span>
                    <span className="text-zinc-500 text-sm">Gründungsjahr</span>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <span className="block text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>25+</span>
                    <span className="text-zinc-500 text-sm">Jahre selbstständig</span>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <span className="block text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>500+</span>
                    <span className="text-zinc-500 text-sm">Projekte</span>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="aspect-[3/4] max-w-sm rounded-2xl bg-zinc-900 overflow-hidden relative mx-auto">
                  <Image
                    src={bildUrl}
                    alt="Dipl.-Ing. Gerhard Schmidt"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Dipl.-Ing. Gerhard Schmidt</p>
                    <p className="text-zinc-400 text-sm">Sachverständiger · IHK Konstanz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="relative">
              {/* Vertikale Linie */}
              <div className="absolute left-[28px] top-0 bottom-0 w-px bg-border" />

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex gap-6 ${item.highlight ? "group" : ""}`}>
                    {/* Icon */}
                    <div className={`relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                      item.highlight
                        ? "bg-primary border-primary"
                        : "bg-card border-border group-hover:border-primary/50"
                    }`}>
                      <item.icon className={`h-5 w-5 ${item.highlight ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </div>

                    {/* Inhalt */}
                    <div className={`flex-1 pb-2 p-5 rounded-2xl border transition-colors ${
                      item.highlight
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border hover:border-border/80"
                    }`}>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                          {item.jahr}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${kategorieColors[item.kategorie] ?? "bg-muted text-muted-foreground"}`}>
                          {item.kategorie}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{item.titel}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.beschreibung}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Jetzt Beratungsgespräch vereinbaren
              </h2>
              <p className="text-muted-foreground text-sm">Jetzt anfragen — unverbindlich und direkt.</p>
            </div>
            <Link href="/kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex-shrink-0">
              Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer einstellungen={einstellungen} />
    </>
  )
}