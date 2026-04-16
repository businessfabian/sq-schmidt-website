import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { servicesData } from "@/lib/services-data"
import * as Icons from "lucide-react"
import { Reveal } from "./animations"

interface Props {
  leistungen?: any[]
}

export function Services({ leistungen }: Props) {
  const hasSanityLeistungen = leistungen && leistungen.length > 0
  const services = hasSanityLeistungen
    ? leistungen.filter((l) => l.aktiv !== false).slice(0, 6)
    : servicesData.slice(0, 6)

  function getIcon(iconName: string) {
    const Icon = (Icons as any)[iconName]
    return Icon ?? Icons.ShieldCheck
  }

  return (
    <section id="leistungen" className="py-24 lg:py-32 bg-zinc-950 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16 pb-8 border-b border-zinc-800">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Unsere Expertise</span>
              <h2
                className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Leistungen im Ueberblick
              </h2>
            </div>
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-primary transition-colors group flex-shrink-0"
            >
              Alle Leistungen
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-0">
          {services.map((service, index) => {
            const slug = hasSanityLeistungen
              ? (service.slug?.current ?? service.slug)
              : service.slug
            const Icon = hasSanityLeistungen ? getIcon(service.icon) : service.icon
            const num = String(index + 1).padStart(2, "0")

            return (
              <Reveal key={index} delay={index * 60}>
                <Link
                  href={`/leistungen/${slug}`}
                  className="group relative flex items-start gap-5 py-7 px-4 border-b border-zinc-800 hover:bg-zinc-900 transition-colors"
                >
                  {/* Dekorative Nummer */}
                  <span
                    className="text-4xl font-bold text-zinc-800 group-hover:text-primary/30 transition-colors select-none flex-shrink-0 w-12 text-right leading-none mt-1"
                    style={{ fontFamily: "var(--font-display)" }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>

                  {/* Icon + Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3
                          className="text-lg font-bold text-white group-hover:text-primary transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {service.titel ?? service.title}
                        </h3>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-11">
                      {service.kurzBeschreibung ?? service.shortDescription}
                    </p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
