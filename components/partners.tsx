import { partnersData } from "@/lib/services-data"
import { Building2 } from "lucide-react"

interface Props {
  partner?: any[]
}

export function Partners({ partner }: Props) {
  const list = (partner && partner.length > 0) ? partner : partnersData.map((p) => ({ _id: p.name, name: p.name, beschreibung: p.description, logo: null }))

  return (
    <section id="partner" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Netzwerk</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-display)" }}>Unsere Kooperationspartner</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">Wir arbeiten mit führenden Experten und Institutionen der Baubranche zusammen, um Ihnen höchste Qualität zu garantieren.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {list.map((p: any) => (
            <div key={p._id ?? p.name} className="flex flex-col items-center justify-center p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                <Building2 className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm text-center text-foreground font-medium mb-1">{p.name}</span>
              <span className="text-xs text-center text-muted-foreground line-clamp-2">{p.beschreibung ?? p.description}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Interessiert an einer Partnerschaft?{" "}<a href="#kontakt" className="text-primary hover:underline">Kontaktieren Sie uns</a></p>
        </div>
      </div>
    </section>
  )
}