"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react"
import * as Icons from "lucide-react"
import { SqLogo } from "@/components/sq-logo"

interface NavPunkt {
  label: string
  href?: string
  typ: "link" | "dropdown" | "leistungen" | "seminare"
  aktiv: boolean
  reihenfolge: number
  unterpunkte?: { label: string; href: string }[]
}

interface Props {
  einstellungen?: any
  leistungen?: any[]
  seminare?: any[]
  navigation?: { punkte: NavPunkt[] }
}

const DEFAULT_NAV: NavPunkt[] = [
  { label: "Leistungen", typ: "leistungen", aktiv: true, reihenfolge: 1 },
  { label: "Unternehmen", typ: "dropdown", aktiv: true, reihenfolge: 2, unterpunkte: [
    { label: "Über Uns", href: "/ueber-uns" },
    { label: "Referenzen", href: "/referenzen" },
    { label: "Partner", href: "/partner" },
    { label: "Aktuelles / Baurecht IBR", href: "/aktuelles" },
    { label: "Zertifikate", href: "/zertifikate" },
    { label: "Vita", href: "/vita" },
    { label: "Fortbildungen", href: "/fortbildungen" },
  ]},
  { label: "Seminartermine", typ: "seminare", aktiv: true, reihenfolge: 3 },
  { label: "Kontakt", typ: "link", href: "/kontakt", aktiv: true, reihenfolge: 4 },
]

export function HeaderClient({ einstellungen, leistungen = [], seminare = [], navigation }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState<string | null>(null)

  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const firmenname = einstellungen?.firmenname ?? "Schmidt"
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  const navPunkte = (navigation?.punkte?.length ? navigation.punkte : DEFAULT_NAV)
    .filter(p => p.aktiv !== false)
    .sort((a, b) => (a.reihenfolge ?? 99) - (b.reihenfolge ?? 99))

  function getIcon(iconName: string) {
    const Icon = (Icons as any)[iconName]
    return Icon ?? ShieldCheck
  }

  const seminarOrte = [
    { label: "Alle Seminare", href: "/seminare" },
    ...Array.from(new Set(seminare.map((s: any) => s.ort).filter(Boolean)))
      .map((ort: any) => ({ label: ort, href: `/seminare?ort=${encodeURIComponent(ort)}` }))
  ]

  function renderDropdown(punkt: NavPunkt) {
    if (punkt.typ === "leistungen") {
      return (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-6 min-w-[680px]">
          <div className="grid grid-cols-2 gap-2">
            {leistungen.filter(l => l.aktiv !== false).map((l) => {
              const Icon = getIcon(l.icon)
              const slug = l.slug?.current ?? l.slug
              return (
                <Link key={l._id} href={`/leistungen/${slug}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  onClick={() => setOpenDropdown(null)}>
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">{l.titel}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">{l.kurzBeschreibung}</span>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Link href="/leistungen" className="text-sm text-primary hover:underline" onClick={() => setOpenDropdown(null)}>
              Alle Leistungen ansehen
            </Link>
          </div>
        </div>
      )
    }
    if (punkt.typ === "seminare") {
      return (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-3 min-w-[240px]">
          {seminarOrte.map((item) => (
            <Link key={item.href} href={item.href}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setOpenDropdown(null)}>
              {item.label}
            </Link>
          ))}
          {seminare.length > 0 && (
            <>
              <div className="border-t border-border my-2" />
              {seminare.slice(0, 3).map((s: any) => (
                <Link key={s._id} href={`/seminare/${s.slug?.current}`}
                  className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setOpenDropdown(null)}>
                  <span className="block text-xs font-medium text-foreground truncate">{s.titel}</span>
                  <span className="block text-xs text-muted-foreground">{s.datum ? new Date(s.datum).toLocaleDateString("de-DE", { day: "2-digit", month: "short" }) : ""}</span>
                </Link>
              ))}
            </>
          )}
        </div>
      )
    }
    if (punkt.typ === "dropdown" && punkt.unterpunkte) {
      return (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-3 min-w-[220px]">
          {punkt.unterpunkte.map((item) => (
            <Link key={item.href} href={item.href}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setOpenDropdown(null)}>
              {item.label}
            </Link>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <SqLogo size={40} />
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {firmenname.split(" ")[0]}
              </span>
              <span className="text-xs text-muted-foreground tracking-wide uppercase">Qualitätssicherung</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navPunkte.map((punkt) => (
              <div key={punkt.label} className="relative"
                onMouseEnter={() => punkt.typ !== "link" && setOpenDropdown(punkt.label)}
                onMouseLeave={() => punkt.typ !== "link" && setOpenDropdown(null)}>
                {punkt.typ === "link" ? (
                  <Link href={punkt.href ?? "#"} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {punkt.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {punkt.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === punkt.label ? "rotate-180" : ""}`} />
                  </button>
                )}
                {punkt.typ !== "link" && openDropdown === punkt.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    {renderDropdown(punkt)}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Button variant="outline" size="sm" asChild>
              <a href={telefonHref}>{telefon}</a>
            </Button>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border max-h-[70vh] overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {navPunkte.map((punkt) => (
                <div key={punkt.label}>
                  {punkt.typ === "link" ? (
                    <Link href={punkt.href ?? "#"} className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground block"
                      onClick={() => setMobileMenuOpen(false)}>{punkt.label}</Link>
                  ) : (
                    <>
                      <button onClick={() => setMobileOpen(mobileOpen === punkt.label ? null : punkt.label)}
                        className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        {punkt.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen === punkt.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileOpen === punkt.label && (
                        <div className="pl-4 pb-2 flex flex-col gap-1">
                          {punkt.typ === "leistungen" && leistungen.filter(l => l.aktiv !== false).map((l) => {
                            const Icon = getIcon(l.icon)
                            return (
                              <Link key={l._id} href={`/leistungen/${l.slug?.current ?? l.slug}`}
                                className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                                onClick={() => setMobileMenuOpen(false)}>
                                <Icon className="h-4 w-4 text-primary flex-shrink-0" />{l.titel}
                              </Link>
                            )
                          })}
                          {punkt.typ === "seminare" && seminarOrte.map((l) => (
                            <Link key={l.href} href={l.href} className="py-2 text-sm text-muted-foreground hover:text-foreground block"
                              onClick={() => setMobileMenuOpen(false)}>{l.label}</Link>
                          ))}
                          {punkt.typ === "dropdown" && punkt.unterpunkte?.map((l) => (
                            <Link key={l.href} href={l.href} className="py-2 text-sm text-muted-foreground hover:text-foreground block"
                              onClick={() => setMobileMenuOpen(false)}>{l.label}</Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={telefonHref}>{telefon}</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}