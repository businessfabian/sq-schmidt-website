import Link from "next/link"
import { SqLogo } from "@/components/sq-logo"

interface Props {
  einstellungen?: any
}

export function Footer({ einstellungen }: Props) {
  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const email = einstellungen?.email ?? "sqs@sq-sv.de"
  const adresse = einstellungen?.adresse ?? "Marktplatz 21, 78647 Trossingen"
  const adresse2 = einstellungen?.adresse2 ?? ""
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <SqLogo size={40} />
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-white">Schmidt</span>
                <span className="text-xs text-zinc-500 tracking-wide uppercase">Qualitätssicherung</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">Ihr zuverlässiger Partner für professionelle Qualitätssicherung im Bauwesen. Inhabergeführt und TÜV-zertifiziert.</p>
            <div className="flex flex-col gap-1 text-sm text-zinc-400">
              <a href={telefonHref} className="hover:text-primary transition-colors">{telefon}</a>
              <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
              <span>{adresse}</span>
              {adresse2 && <span>{adresse2}</span>}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-200 mb-4" role="heading" aria-level={2}>Leistungen</p>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              {["Baubegleitende Qualitätssicherung", "Mängelmanagement", "Baucontrolling", "Schadensgutachten", "Sanierungskonzepte", "Baumediation"].map((l) => (
                <li key={l}><a href="/leistungen" className="hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-200 mb-4" role="heading" aria-level={2}>Unternehmen</p>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li><a href="/ueber-uns" className="hover:text-primary transition-colors">Über Uns</a></li>
              <li><a href="/partner" className="hover:text-primary transition-colors">Partner</a></li>
              <li><a href="/zertifikate" className="hover:text-primary transition-colors">Zertifikate</a></li>
              <li><a href="/kontakt" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
            <p className="text-sm font-semibold text-zinc-200 mb-4 mt-6" role="heading" aria-level={2}>Rechtliches</p>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li><Link href="/impressum" className="hover:text-primary transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} SQ Schmidt Qualitätssicherung. Alle Rechte vorbehalten.</p>
          <p className="text-sm text-zinc-500">Webseite erstellt von <a href="https://meyso.de/ref/sq-schmidt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Meyso</a></p>
        </div>
      </div>
    </footer>
  )
}