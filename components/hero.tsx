import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, ShieldCheck, Award, MapPin } from "lucide-react"

interface Props {
  einstellungen?: any
}

export function Hero({ einstellungen }: Props) {
  const titel = einstellungen?.heroTitel ?? "Präzision und Qualität für Ihr Bauprojekt"
  const beschreibung = einstellungen?.heroBeschreibung ?? "Öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz — gerichtsfeste Gutachten und professionelle Baubegleitung deutschlandweit."
  const adresse = einstellungen?.adresse ?? "Marktplatz 21, 78647 Trossingen"
  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const jahre = einstellungen?.jahreErfahrung ?? 25
  const projekte = einstellungen?.anzahlProjekte ?? 500
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-zinc-950">

      {/* Fullscreen Hintergrundbild */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-construction.jpg"
          alt="Baustelle SQ Schmidt"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        {/* Dramatischer Gradient von unten */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
        {/* Linker Gradient für Text-Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />
      </div>

      {/* Dezentes Raster-Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Akzent-Linie links */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />

      {/* Content */}
      <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-8 pb-20 pt-40">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Öffentlich bestellter Sachverständiger · IHK Konstanz</span>
            </div>
          </div>

          {/* Haupttitel */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {titel.split(" für Ihr").length > 1 ? (
              <>
                {titel.split(" für Ihr")[0]}<br />
                <span className="text-primary">für Ihr</span>
                {" "}{titel.split(" für Ihr")[1]}
              </>
            ) : (
              <>
                {titel.split(" ").slice(0, 3).join(" ")}<br />
                <span className="text-primary">{titel.split(" ").slice(3).join(" ")}</span>
              </>
            )}
          </h1>

          {/* Untertitel */}
          <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10">
            {beschreibung}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary/90 transition-all hover:gap-3"
            >
              Jetzt anfragen
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={telefonHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg font-semibold text-base hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              <Phone className="h-5 w-5" />
              {telefon}
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10">
            <div>
              <span className="block text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{jahre}+</span>
              <span className="text-sm text-zinc-500 mt-1 block">Jahre Erfahrung</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <span className="block text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{projekte}+</span>
              <span className="text-sm text-zinc-500 mt-1 block">Projekte</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <span className="block text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>100%</span>
              <span className="text-sm text-zinc-500 mt-1 block">TÜV-zertifiziert</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 ml-auto text-sm text-zinc-500">
              <MapPin className="h-4 w-4" />
              {adresse}
            </div>
          </div>
        </div>
      </div>

      {/* Zertifikat-Badges unten rechts */}
      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3">
        {["TÜV", "IHK", "BVS"].map((badge) => (
          <div
            key={badge}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
          >
            <Award className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-zinc-400">{badge}</span>
          </div>
        ))}
      </div>

    </section>
  )
}