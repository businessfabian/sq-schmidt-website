import Link from "next/link"
import Image from "next/image"
import { partnersData } from "@/lib/services-data"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Reveal } from "./animations"

interface Props {
  partner?: any[]
}

function PartnerInitial({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <div className="h-14 w-14 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
      <span className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{initial}</span>
    </div>
  )
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
    <section id="partner" className="py-24 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16 pb-8 border-b border-zinc-800">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Netzwerk</span>
              <h2
                className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kooperationspartner
              </h2>
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-primary transition-colors group flex-shrink-0"
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
              <Reveal key={i} delay={i * 80} className="h-full">
                <Wrapper
                  {...(wrapperProps as any)}
                  className="group h-full flex flex-col items-center gap-3 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all text-center"
                >
                  {/* Logo oder Buchstaben-Avatar */}
                  <div className="relative h-14 w-full flex items-center justify-center flex-shrink-0">
                    {p.logo ? (
                      <Image
                        src={p.logo}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 40vw, 20vw"
                        className="object-contain"
                      />
                    ) : (
                      <PartnerInitial name={p.name} />
                    )}
                  </div>

                  {/* Name + Beschreibung -- flex-1 damit alle Karten gleich hoch */}
                  <div className="min-w-0 w-full flex-1 flex flex-col justify-center">
                    <p className="text-sm font-semibold text-zinc-100 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {p.name}
                    </p>
                    {p.beschreibung && (
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{p.beschreibung}</p>
                    )}
                  </div>

                  {/* Link-Indikator -- immer reservierter Platz damit Hoehe konsistent */}
                  <div className="h-3.5 flex items-center">
                    {isExternal && (
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
