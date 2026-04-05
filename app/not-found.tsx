import Link from "next/link"
import { ArrowLeft, HardHat } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-8">
          <HardHat className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-xl font-semibold text-zinc-300 mb-3">Seite nicht gefunden</h2>
        <p className="text-zinc-500 mb-8 leading-relaxed">
          Diese Seite existiert leider nicht. Möchten Sie zur Startseite zurückkehren?
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
          <ArrowLeft className="h-4 w-4" /> Zur Startseite
        </Link>
      </div>
    </div>
  )
}