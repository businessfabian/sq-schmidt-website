import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function Hero() {
  const stats = [
    { value: "25+", label: "Jahre Erfahrung" },
    { value: "500+", label: "Projekte" },
    { value: "100%", label: "TÜV-zertifiziert" },
  ]

  const highlights = [
    "TÜV-zertifiziert",
    "Öffentlich bestellter Sachverständiger",
    "Deutschlandweit tätig",
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-3">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  {highlight}
                </span>
              ))}
            </div>

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Präzision und Qualität für Ihr{" "}
              <span className="text-primary">Bauprojekt</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              SQ Schmidt ist Ihr zuverlässiger Partner für professionelle Qualitätssicherung 
              im Bauwesen. Öffentlich bestellter und vereidigter Sachverständiger — 
              wir begleiten Ihr Projekt von der Planung bis zur Fertigstellung.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="#kontakt">
                  Kostenlose Erstberatung
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#leistungen">Unsere Leistungen</Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary" />
              Marktplatz 21, 78647 Trossingen · 07726 / 929394
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-border">
              <Image
                src="/images/hero-construction.jpg"
                alt="Professionelle Baustellenüberwachung durch SQ Schmidt"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-card/95 backdrop-blur-sm rounded-xl border border-border p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="text-2xl lg:text-3xl font-bold text-primary"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
