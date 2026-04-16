import Link from "next/link"
import Image from "next/image"
import { partnersData } from "@/lib/services-data"
import { Building2, ArrowRight, ExternalLink } from "lucide-react"
import { Reveal } from "./animations"

interface Props {
  partner?: any[]
}

export function Partners({ partner }: Props) {
  const hasSanity = partner && partner.length > 0

  const list = (hasSanity
    ? partner.map((p: any) => ({
        name: p.name,
        beschreibung: p.beschreibung ?? "",
        webseite: p.webseite ?? null,
        logo: p.logo ?? null,
      }))
    : partnersData.map((p) => ({
        name: p.name,
        beschreibung: p.description,
        webseite: null,
        logo: null,
      }))
  ).slice(0, 4)

  return (
    <section id="partner" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Netzwerk</span>
              <h2
                className="mt-2 text-3xl md:text-4xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kooperationspartner
              </h2>
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group flex-shrink-0"
            >
              Alle Partner
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((p, i) => {
            const isExternal = !!p.webseite
            const Wrapper = isExternal ? "a" : Link
            const wrapperProps = isExternal
              ? { href: p.webseite, target: "_blank", rel: "noopener noreferrer" }
              : { href: "/partner" }

            return (
              <Reveal key={i} delay={i * 80}>
                <Wrapper
                  {...(wrapperProps as any)}
                  className="group flex flex-col items-center gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all text-center"
                >
                  {/* Logo oder Platzhalter */}
                  <div className="relative h-14 w-full flex items-center justify-center">
                    {p.logo ? (
                      <Image
                        src={p.logo}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 40vw, 20vw"
                        className="object-contain"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Building2 className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="min-w-0 w-full">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {p.name}
                    </p>
                    {p.beschreibung && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.beschreibung}</p>
                    )}
                  </div>

                  {/* Link-Indikator */}
                  {isExternal && (
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  )}
                </Wrapper>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
