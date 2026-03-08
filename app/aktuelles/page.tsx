import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Construction } from "lucide-react"

export const metadata = {
  title: "Aktuelles | SQ Schmidt Qualitätssicherung",
  description: "Aktuelle Neuigkeiten, Baurecht und IBR-Informationen von SQ Schmidt.",
}

export default function AktuellesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Construction className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Aktuelles & Baurecht IBR
            </h1>
            <p className="text-muted-foreground max-w-lg text-lg">
              Hier finden Sie in Kürze aktuelle Neuigkeiten, Beiträge zum Baurecht sowie Informationen aus dem IBR-Seminarangebot.
            </p>
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Seite in Vorbereitung
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}