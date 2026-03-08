"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { servicesData } from "@/lib/services-data"

interface Props {
  einstellungen?: any
}

export function Header({ einstellungen }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [unternehmenOpen, setUnternehmenOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileUnternehmenOpen, setMobileUnternehmenOpen] = useState(false)

  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  const unternehmenLinks = [
    { label: "Über Uns", href: "/ueber-uns" },
    { label: "Partner", href: "/partner" },
    { label: "Aktuelles / Baurecht IBR", href: "/aktuelles" },
    { label: "Zertifikate", href: "/zertifikate" },
    { label: "Vita", href: "/vita" },
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
              <span className="text-lg font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>Schmidt</span>
              <span className="text-xs text-muted-foreground tracking-wide uppercase">Qualitätssicherung</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">

            {/* Leistungen Dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Leistungen <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-card border border-border rounded-xl shadow-2xl p-6 min-w-[780px]">
                    <div className="grid grid-cols-2 gap-3">
                      {servicesData.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/leistungen/${service.slug}`}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
                        >
                          <div className="relative h-14 w-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                            <div className="absolute bottom-1 left-1 h-5 w-5 rounded bg-primary/90 flex items-center justify-center">
                              <service.icon className="h-3 w-3 text-primary-foreground" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">{service.title}</span>
                            <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-2">{service.shortDescription}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link href="/#leistungen" className="text-sm text-primary hover:underline">Alle Leistungen ansehen →</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Unternehmen Dropdown */}
            <div className="relative" onMouseEnter={() => setUnternehmenOpen(true)} onMouseLeave={() => setUnternehmenOpen(false)}>
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Unternehmen <ChevronDown className={`h-4 w-4 transition-transform ${unternehmenOpen ? "rotate-180" : ""}`} />
              </button>
              {unternehmenOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-card border border-border rounded-xl shadow-2xl p-3 min-w-[220px]">
                    {unternehmenLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/#kontakt" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Kontakt</Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" size="sm" asChild><a href={telefonHref}>{telefon}</a></Button>
            
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

              {/* Mobile Leistungen */}
              <div>
                <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Leistungen <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pb-2 flex flex-col gap-1">
                    {servicesData.map((service) => (
                      <Link key={service.slug} href={`/leistungen/${service.slug}`} className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <service.icon className="h-4 w-4 text-primary flex-shrink-0" />
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Unternehmen */}
              <div>
                <button onClick={() => setMobileUnternehmenOpen(!mobileUnternehmenOpen)} className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Unternehmen <ChevronDown className={`h-4 w-4 transition-transform ${mobileUnternehmenOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileUnternehmenOpen && (
                  <div className="pl-4 pb-2 flex flex-col gap-1">
                    {unternehmenLinks.map((item) => (
                      <Link key={item.label} href={item.href} className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/#kontakt" className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link>

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
                <Button variant="outline" size="sm" className="w-full" asChild><a href={telefonHref}>{telefon}</a></Button>
                
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}