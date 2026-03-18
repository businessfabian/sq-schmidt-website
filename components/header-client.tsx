"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react"
import * as Icons from "lucide-react"

interface Props {
  einstellungen?: any
  leistungen?: any[]
  seminare?: any[]
}

export function HeaderClient({ einstellungen, leistungen = [], seminare = [] }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState<string | null>(null)

  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const firmenname = einstellungen?.firmenname ?? "Schmidt"
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  function getIcon(iconName: string) {
    const Icon = (Icons as any)[iconName]
    return Icon ?? ShieldCheck
  }

  // Seminar-Kategorien dynamisch aus den Daten
  const seminarKategorien = [
    { label: "Alle Seminare", href: "/seminare" },
    ...Array.from(new Set(seminare.map((s: any) => s.kategorie).filter(Boolean)))
      .map((kat: any) => ({
        label: kat.charAt(0).toUpperCase() + kat.slice(1),
        href: `/seminare?kategorie=${kat}`
      }))
  ]

  const unternehmenLinks = [
    { label: "Ueber Uns", href: "/ueber-uns" },
    { label: "Partner", href: "/partner" },
    { label: "Aktuelles / Baurecht IBR", href: "/aktuelles" },
    { label: "Zertifikate", href: "/zertifikate" },
    { label: "Vita", href: "/vita" },
  ]

  const navItems = [
    {
      id: "leistungen",
      label: "Leistungen",
      dropdown: true,
      content: (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-6 min-w-[680px]">
          <div className="grid grid-cols-2 gap-2">
            {leistungen.filter(l => l.aktiv !== false).map((l) => {
              const Icon = getIcon(l.icon)
              const slug = l.slug?.current ?? l.slug
              return (
                <Link key={l._id} href={`/leistungen/${slug}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  onClick={() => setOpenDropdown(null)}>
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
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
      ),
    },
    {
      id: "unternehmen",
      label: "Unternehmen",
      dropdown: true,
      content: (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-3 min-w-[220px]">
          {unternehmenLinks.map((item) => (
            <Link key={item.href} href={item.href}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setOpenDropdown(null)}>
              {item.label}
            </Link>
          ))}
        </div>
      ),
    },
    {
      id: "seminare",
      label: "Seminartermine",
      dropdown: true,
      content: (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-3 min-w-[220px]">
          {seminarKategorien.map((item) => (
            <Link key={item.href} href={item.href}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setOpenDropdown(null)}>
              {item.label}
            </Link>
          ))}
          {seminare.slice(0, 3).map((s: any) => (
            <Link key={s._id} href={`/seminare/${s.slug?.current}`}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors border-t border-border mt-1 pt-1 first-of-type:border-0"
              onClick={() => setOpenDropdown(null)}>
              <span className="block font-medium text-foreground text-xs truncate">{s.titel}</span>
              <span className="block text-xs text-muted-foreground">{s.datum}</span>
            </Link>
          ))}
        </div>
      ),
    },
    { id: "kontakt", label: "Kontakt", href: "/kontakt" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">SQ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {firmenname.split(" ")[0]}
              </span>
              <span className="text-xs text-muted-foreground tracking-wide uppercase">Qualitaetssicherung</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.id)}
                onMouseLeave={() => item.dropdown && setOpenDropdown(null)}>
                {item.href ? (
                  <Link href={item.href} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.id ? "rotate-180" : ""}`} />
                  </button>
                )}
                {item.dropdown && openDropdown === item.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Telefon */}
          <div className="hidden lg:flex items-center">
            <Button variant="outline" size="sm" asChild>
              <a href={telefonHref}>{telefon}</a>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.href ? (
                    <Link href={item.href} className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button onClick={() => setMobileOpen(mobileOpen === item.id ? null : item.id)}
                        className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen === item.id ? "rotate-180" : ""}`} />
                      </button>
                      {mobileOpen === item.id && (
                        <div className="pl-4 pb-2">
                          {item.id === "leistungen" && leistungen.filter(l => l.aktiv !== false).map((l) => {
                            const Icon = getIcon(l.icon)
                            const slug = l.slug?.current ?? l.slug
                            return (
                              <Link key={l._id} href={`/leistungen/${slug}`}
                                className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}>
                                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                                {l.titel}
                              </Link>
                            )
                          })}
                          {item.id === "unternehmen" && unternehmenLinks.map((l) => (
                            <Link key={l.href} href={l.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => setMobileMenuOpen(false)}>
                              {l.label}
                            </Link>
                          ))}
                          {item.id === "seminare" && seminarKategorien.map((l) => (
                            <Link key={l.href} href={l.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => setMobileMenuOpen(false)}>
                              {l.label}
                            </Link>
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