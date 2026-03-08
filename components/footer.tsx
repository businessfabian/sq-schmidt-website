import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">SQ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  Schmidt
                </span>
                <span className="text-xs text-muted-foreground tracking-wide uppercase">
                  Qualitätssicherung
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihr zuverlässiger Partner für professionelle Qualitätssicherung
              im Bauwesen. Inhabergeführt und TÜV-zertifiziert.
            </p>
            <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
              <a href="tel:+4977269293940" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                07726 / 929394
              </a>
              <a href="mailto:sqs@sq-sv.de" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                sqs@sq-sv.de
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                Marktplatz 21, 78647 Trossingen
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Leistungen
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                "Baubegleitende Qualitätssicherung",
                "Mängelmanagement",
                "Baucontrolling",
                "Schadensgutachten",
                "Sanierungskonzepte",
                "Baumediation",
              ].map((label) => (
                <a key={label} href="#leistungen" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Unternehmen
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Über Uns", href: "#ueber-uns" },
                { label: "Partner", href: "#partner" },
                { label: "Zertifikate", href: "#zertifikate" },
                { label: "Kontakt", href: "#kontakt" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Rechtliches
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 text-xs text-muted-foreground">
              <p>Webseite erstellt von</p>
              <a href="https://meyso.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                meyso.
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SQ Schmidt Qualitätssicherung. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Wohnen und Leben Sie schon, oder bemängeln Sie noch?
          </p>
        </div>
      </div>
    </footer>
  )
}
