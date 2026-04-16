"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, ShieldCheck, Award, MapPin } from "lucide-react"
import { AnimatedCounter } from "./animations"
import { useEffect, useState } from "react"

interface Props {
  einstellungen?: any
}

export function Hero({ einstellungen }: Props) {
  const badge = einstellungen?.heroBadge ?? "Öffentlich bestellter Sachverständiger · IHK Konstanz"
  const titel = einstellungen?.heroTitel ?? "Präzision und Qualität für Ihr Bauprojekt"
  const beschreibung = einstellungen?.heroBeschreibung ?? "Öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz, gerichtsfeste Gutachten und professionelle Baubegleitung deutschlandweit."
  const adresse = einstellungen?.adresse ?? "Marktplatz 21, 78647 Trossingen"
  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const jahre = einstellungen?.jahreErfahrung ?? 25
  const projekte = einstellungen?.anzahlProjekte ?? 500
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-zinc-950">

      {/* Fullscreen Hintergrundbild mit Parallax-Effekt */}
      <div className="absolute inset-0">
        <Image
          src={einstellungen?.heroBildUrl || "/images/hero-construction.jpg"}
          alt="Baustelle SQ Schmidt"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105"
          style={{ transition: "transform 20s ease-out", transform: loaded ? "scale(1)" : "scale(1.05)" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
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

      {/* Content mit Staggered Fade-in */}
      <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-8 pb-20 pt-40">
        <div className="max-w-3xl">

          {/* Badge */}
          <div
            className="flex items-center gap-3 mb-8"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.2s" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{badge}</span>
            </div>
          </div>

          {/* Haupttitel */}
          <h1
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.4s" }}
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
          <p
            className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.6s" }}
          >
            {beschreibung}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-16"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.8s" }}
          >
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary/90 transition-all hover:gap-3 hover:shadow-lg hover:shadow-primary/25"
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

          {/* Stats mit animierten Countern */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1s" }}
          >
            <div>
              <span className="block text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                <AnimatedCounter target={jahre} suffix="+" />
              </span>
              <span className="text-sm text-zinc-400 mt-1 block">Jahre Erfahrung</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <span className="block text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                <AnimatedCounter target={projekte} suffix="+" />
              </span>
              <span className="text-sm text-zinc-400 mt-1 block">Projekte</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <span className="block text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>100%</span>
              <span className="text-sm text-zinc-400 mt-1 block">TÜV-zertifiziert</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 ml-auto text-sm text-zinc-400">
              <MapPin className="h-4 w-4" />
              {adresse}
            </div>
          </div>
        </div>
      </div>

      {/* Zertifikat-Badges unten rechts */}
      <div
        className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3"
        style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(20px)", transition: "all 0.8s ease 1.2s" }}
      >
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
