import Link from "next/link"
import Image from "next/image"
import { partnersData } from "@/lib/services-data"
import { ArrowRight, ExternalLink } from "lucide-react"
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
    <section id="partner" className="py-20 bg-zinc-950 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Kooperationspartner</span>
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-primary transition-colors group"
            >
              Alle Partner
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* Partner-Leiste */}
        <div className="divide-y divide-zinc-800/60">
          {list.map((p, i) => {
            const isExternal = !!p.webseite
            const Wrapper = isExternal ? "a" : Link
            const wrapperProps = isExternal
              ? { href: p.webseite, target: "_blank", rel: "noopener noreferrer" }
              : { href: "/partner" }

            return (
              <Reveal key={i} delay={i * 60}>
                <Wrapper
                  {...(wrapperProps as any)}
                  className="group flex items-center gap-6 py-5 hover:bg-zinc-900/40 -mx-4 px-4 rounded-xl transition-colors"
                >
                  {/* Initiale / Logo */}
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-zinc-800 group-hover:bg-primary/15 group-hover:border group-hover:border-primary/25 border border-transparent flex items-center justify-center transition-all">
                    {p.logo ? (
                      <div className="relative h-6 w-6">
                        <Image
                          src={p.logo}
                          alt={p.name}
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span
                        className="text-sm font-bold text-zinc-400 group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.name.trim().charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Name + Beschreibung */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {p.name}
                    </span>
                    {p.beschreibung && (
                      <span className="hidden sm:inline text-sm text-zinc-600 ml-3 truncate">
                        {p.beschreibung}
                      </span>
                    )}
                  </div>

                  {/* Rechts: Pfeil oder External */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isExternal
                      ? <ExternalLink className="h-4 w-4 text-primary" />
                      : <ArrowRight className="h-4 w-4 text-primary" />
                    }
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
