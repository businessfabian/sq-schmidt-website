import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react"
import { getServiceBySlug, servicesData } from "@/lib/services-data"
import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: "Leistung nicht gefunden" }
  }

  return {
    title: `${service.title} | SQ Schmidt Qualitätssicherung`,
    description: service.fullDescription,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const currentIndex = servicesData.findIndex((s) => s.slug === slug)
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null

  const ServiceIcon = service.icon

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-secondary/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/#leistungen"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Übersicht
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
              <div className="flex-1">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <ServiceIcon className="h-8 w-8 text-primary" />
                </div>
                <h1
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {service.fullDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button size="lg" asChild>
                    <Link href="/#kontakt">Beratung anfragen</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="tel:+4989123456">
                      <Phone className="h-4 w-4 mr-2" />
                      +49 (0) 89 123 456
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="relative rounded-2xl overflow-hidden border border-border">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Leistungsumfang
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Was wir für Sie tun
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-foreground">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Unser Vorgehen
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                So arbeiten wir
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, index) => (
                <Card key={index} className="bg-card border-border relative overflow-hidden">
                  <CardHeader>
                    <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                      {step.step}
                    </div>
                    <CardTitle
                      className="text-xl text-foreground relative z-10"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 border-t border-border">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Bereit für Ihr Projekt?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine unverbindliche Beratung. Wir sind für Sie da und
              unterstützen Sie bei allen Fragen rund um die Qualitätssicherung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/#kontakt">Kontakt aufnehmen</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+4989123456">
                  <Phone className="h-4 w-4 mr-2" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="py-8 border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {prevService ? (
                <Link
                  href={`/leistungen/${prevService.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{prevService.title}</span>
                  <span className="sm:hidden">Zurück</span>
                </Link>
              ) : (
                <div />
              )}
              {nextService ? (
                <Link
                  href={`/leistungen/${nextService.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="hidden sm:inline">{nextService.title}</span>
                  <span className="sm:hidden">Weiter</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
