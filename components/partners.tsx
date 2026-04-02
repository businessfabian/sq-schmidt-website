import Link from "next/link"
import { partnersData } from "@/lib/services-data"
import { Building2, ArrowRight } from "lucide-react"
import { ScrollReveal } from "./ScrollReveal"

interface Props {
  partner?: any[]
}

export function Partners({ partner }: Props) {
  const allList = (partner && partner.length > 0)
    ? partner.map((p: any) => ({ name: p.name, beschreibung: p.beschreibung }))
    : partnersData.map((p) => ({ name: p.name, beschreibung: p.description }))

  const list = allList.slice(0, 6)

  return (
    <section id="partner" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Netzwerk</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Unsere Kooperationspartner
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Wir arbeiten mit führenden Experten und Institutionen der Baubranche zusammen.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {list.map((p: any, i: number) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg transition-all group">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Building2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.beschreibung}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex justify-center">
            <Link href="/partner" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              Alle Partner ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
