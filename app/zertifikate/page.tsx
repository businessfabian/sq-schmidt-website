import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { certificatesData } from "@/lib/services-data"

export const metadata = {
  title: "Zertifikate — SQ Schmidt Qualitätssicherung",
  description: "Zertifikate und Akkreditierungen von SQ Schmidt.",
}

export default function ZertifikatePage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Qualifikationen</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Zertifikate & Akkreditierungen
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Unsere Qualifikationen und Zertifizierungen sind Ihr Garant für professionelle und verlässliche Arbeit nach höchsten Standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certificatesData.map((cert, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all group">
                <div className="relative h-48 w-full">
                  <Image src={cert.image} alt={cert.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>
                <div className="p-5 -mt-8 relative">
                  <h3 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border rounded-2xl">
              <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Kontinuierliche Weiterbildung</h2>
              <p className="text-muted-foreground leading-relaxed">Unsere Sachverständigen bilden sich regelmäßig fort und sind immer auf dem neuesten Stand der Technik und Rechtsprechung.</p>
              <div className="flex gap-8 mt-6">
                <div><span className="block text-3xl font-bold text-primary">500+</span><span className="text-sm text-muted-foreground">Fortbildungsstunden</span></div>
                <div><span className="block text-3xl font-bold text-primary">25+</span><span className="text-sm text-muted-foreground">Jahre Erfahrung</span></div>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl">
              <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Mitgliedschaften</h2>
              <div className="flex flex-wrap gap-3">
                {["IHK Konstanz", "BVS", "TÜV Rheinland", "IQ-ZERT", "DEKRA"].map((m) => (
                  <span key={m} className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}