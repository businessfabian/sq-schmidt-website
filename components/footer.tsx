import Link from "next/link"

interface Props {
  einstellungen?: any
}

export function Footer({ einstellungen }: Props) {
  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const email = einstellungen?.email ?? "sqs@sq-sv.de"
  const adresse = einstellungen?.adresse ?? "Marktplatz 21, 78647 Trossingen"
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">SQ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-foreground">Schmidt</span>
                <span className="text-xs text-muted-foreground tracking-wide uppercase">Qualitätssicherung</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Ihr zuverlässiger Partner für professionelle Qualitätssicherung im Bauwesen. Inhabergeführt und TÜV-zertifiziert.</p>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <a href={telefonHref} className="hover:text-primary transition-colors">{telefon}</a>
              <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
              <span>{adresse}</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Leistungen</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {["Baubegleitende Qualitätssicherung", "Mängelmanagement", "Baucontrolling", "Schadensgutachten", "Sanierungskonzepte", "Baumediation"].map((l) => (
                <li key={l}><a href="/leistungen" className="hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Unternehmen</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="/ueber-uns" className="hover:text-primary transition-colors">Über Uns</a></li>
              <li><a href="/partner" className="hover:text-primary transition-colors">Partner</a></li>
              <li><a href="/zertifikate" className="hover:text-primary transition-colors">Zertifikate</a></li>
              <li><a href="/kontakt" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
            <h4 className="text-sm font-semibold text-foreground mb-4 mt-6">Rechtliches</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/impressum" className="hover:text-primary transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SQ Schmidt Qualitätssicherung. Alle Rechte vorbehalten.</p>
          <p className="text-sm text-muted-foreground">Webseite erstellt von <a href="https://meyso.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Meyso</a></p>
        </div>
      </div>
    </footer>
  )
}