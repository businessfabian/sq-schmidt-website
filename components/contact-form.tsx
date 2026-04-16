"use client"
// Select fix already applied
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Phone, Mail, MapPin, Clock, Loader2, ArrowRight } from "lucide-react"

interface Props {
  einstellungen?: any
}

export function ContactForm({ einstellungen }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [leistung, setLeistung] = useState("")

  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const email = einstellungen?.email ?? "sqs@sq-sv.de"
  const adresse = einstellungen?.adresse ?? "Marktplatz 21, 78647 Trossingen"
  const adresse2: string = einstellungen?.adresse2 ?? ""
  const oeffnungszeiten = einstellungen?.oeffnungszeiten ?? "Mo-Fr 8:00-18:00 Uhr"
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  const kontaktInfos = [
    { icon: Phone, label: "Telefon", value: telefon, href: telefonHref },
    { icon: Mail, label: "E-Mail", value: email, href: `mailto:${email}` },
    { icon: MapPin, label: "Adresse", value: adresse, href: null },
    ...(adresse2 ? [{ icon: MapPin, label: "Weitere Adresse", value: adresse2, href: null }] : []),
    { icon: Clock, label: "Erreichbarkeit", value: oeffnungszeiten, href: null },
  ]

  const leistungen = [
    "Baubegleitende Qualitätssicherung",
    "Projektleitung / Bauleitung",
    "Mängelmanagement",
    "Baucontrolling / Bauabnahmen",
    "Beweissicherungsverfahren",
    "Schadensgutachten",
    "Sanierungskonzepte",
    "Blower-Door-Test",
    "SiGeKo",
    "Schimmelpilzbelastungen",
    "Baumediation",
    "Seminare / Beratung",
    "Sonstiges",
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    const data = {
      vorname: (form.querySelector("#vorname") as HTMLInputElement).value,
      nachname: (form.querySelector("#nachname") as HTMLInputElement).value,
      email: (form.querySelector("#email") as HTMLInputElement).value,
      telefon: (form.querySelector("#telefon") as HTMLInputElement).value,
      leistung,
      nachricht: (form.querySelector("#nachricht") as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      // GA4 Conversion Event
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "generate_lead", {
          event_category: "kontakt",
          event_label: data.leistung || "Allgemein",
        })
      }
    } catch {
      setError("Beim Senden ist ein Fehler aufgetreten. Bitte rufen Sie uns direkt an.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="kontakt" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Vielen Dank!
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="kontakt" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Kontakt</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Sprechen wir über Ihr Projekt
          </h2>
          <p className="mt-4 text-muted-foreground">
            Kontaktieren Sie uns für eine unverbindliche Anfrage. Wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-6">
            {kontaktInfos.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="text-muted-foreground hover:text-primary transition-colors underline decoration-muted-foreground/30 underline-offset-2 hover:decoration-primary">{value}</a>
                  ) : (
                    <p className="text-muted-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="vorname">Vorname *</Label>
                  <Input id="vorname" placeholder="Max" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nachname">Nachname *</Label>
                  <Input id="nachname" placeholder="Mustermann" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input id="email" type="email" placeholder="max@beispiel.de" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="telefon">Telefon (optional)</Label>
                <Input id="telefon" type="tel" placeholder="+49 123 456789" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Gewünschte Leistung</Label>
                <Select onValueChange={setLeistung}>
                  <SelectTrigger aria-label="Gewünschte Leistung auswählen"><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                  <SelectContent>
                    {leistungen.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nachricht">Nachricht *</Label>
                <Textarea id="nachricht" placeholder="Beschreiben Sie kurz Ihr Anliegen..." rows={4} required />
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{error}</p>
              )}
              <Button size="lg" className="w-full gap-2" type="submit" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet...</>
                ) : (
                  <>Anfrage senden <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Mit dem Absenden stimmen Sie unserer{" "}
                <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> zu.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}