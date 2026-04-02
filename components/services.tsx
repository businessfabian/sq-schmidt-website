import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { servicesData } from "@/lib/services-data"
import * as Icons from "lucide-react"
import { ScrollReveal } from "./ScrollReveal"

interface Props {
  leistungen?: any[]
}

export function Services({ leistungen }: Props) {
  const hasSanityLeistungen = leistungen && leistungen.length > 0
  const services = hasSanityLeistungen
    ? leistungen.filter(l => l.aktiv !== false).slice(0, 6)
    : servicesData.slice(0, 6)

  function getIcon(iconName: string) {
    const Icon = (Icons as any)[iconName]
    return Icon ?? Icons.ShieldCheck
  }

  return (
    <section id="leistungen" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Unsere Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Leistungen im Überblick
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Profitieren Sie von unserer langjährigen Erfahrung in der Qualitätssicherung im Bauwesen.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal stagger={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const slug = hasSanityLeistungen ? service.slug?.current ?? service.slug : service.slug
              const Icon = hasSanityLeistungen ? getIcon(service.icon) : service.icon
              return (
                <Link key={index} href={`/leistungen/${slug}`} className="block h-full">
                  <Card className="bg-card border-border hover:border-primary/50 transition-all group h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-foreground flex items-center justify-between" style={{ fontFamily: "var(--font-display)" }}>
                        {service.titel ?? service.title}
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {service.kurzBeschreibung ?? service.shortDescription}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="mt-12 flex justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/leistungen" className="gap-2 flex items-center">
                Alle Leistungen ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
