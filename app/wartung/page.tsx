import { Mail, Phone } from "lucide-react"

export const metadata = {
  title: "Wartung | SQ Schmidt Qualitätssicherung",
  description: "Unsere Website wird gerade gewartet.",
  robots: {
    index: false,
    follow: false,
  },
}

const TELEFON = "07726 / 929394"
const EMAIL = "sqs@sq-sv.de"

export default function WartungPage() {
  const telefonHref = "tel:+" + TELEFON.replace(/\D/g, "")
  const mailHref = "mailto:" + EMAIL

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="inline-flex items-center gap-3 mb-10">
          <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>SQ</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground leading-tight" style={{ fontFamily: "var(--font-display)" }}>SQ Schmidt</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Qualitätssicherung</p>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          Wir sind in Kürze wieder für Sie da
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-10">
          Unsere Website wird gerade gewartet. Morgen sind wir wieder erreichbar.
          Für dringende Anfragen erreichen Sie uns telefonisch oder per Mail.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={telefonHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {TELEFON}
          </a>
          <a
            href={mailHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg font-semibold hover:border-primary/50 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </div>
    </main>
  )
}
