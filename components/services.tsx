import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { servicesData } from "@/lib/services-data"

export function Services() {
  const services = servicesData

  return (
    <section id="leistungen" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Unsere Expertise
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Leistungen im Überblick
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Profitieren Sie von unserer langjährigen Erfahrung in der Qualitätssicherung 
            im Bauwesen. Wir bieten Ihnen ein umfassendes Leistungsspektrum.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={`/leistungen/${service.slug}`} className="block">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors group h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground flex items-center justify-between" style={{ fontFamily: 'var(--font-display)' }}>
                    {service.title}
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.shortDescription}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
