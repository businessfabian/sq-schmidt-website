import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { vorname, nachname, email, telefon, leistung, nachricht } = await req.json()

    if (!vorname || !nachname || !email || !nachricht) {
      return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 })
    }

    await resend.emails.send({
      from: "SQ Schmidt Kontaktformular <noreply@meyso.de>",
      to: ["sqs@sq-sv.de"],
      replyTo: email,
      subject: `Neue Anfrage von ${vorname} ${nachname}${leistung ? ` — ${leistung}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Neue Kontaktanfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${vorname} ${nachname}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">E-Mail</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${telefon ? `<tr><td style="padding: 8px 0; color: #666;">Telefon</td><td style="padding: 8px 0;"><a href="tel:${telefon}">${telefon}</a></td></tr>` : ""}
            ${leistung ? `<tr><td style="padding: 8px 0; color: #666;">Leistung</td><td style="padding: 8px 0;">${leistung}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <h3 style="color: #1a1a1a;">Nachricht</h3>
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${nachricht}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #999; font-size: 12px;">Gesendet über das Kontaktformular auf sq-schmidt-website.vercel.app</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 })
  }
}

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

  const telefon = einstellungen?.telefon ?? "07726 / 929394"
  const email = einstellungen?.email ?? "sqs@sq-sv.de"
  const adresse = einstellungen?.adresse ?? "Marktplatz 21, 78647 Trossingen"
  const oeffnungszeiten = einstellungen?.oeffnungszeiten ?? "Mo–Fr 8:00–18:00 Uhr"
  const telefonHref = "tel:+" + telefon.replace(/\D/g, "")

  const kontaktInfos = [
    { icon: Phone, label: "Telefon", value: telefon, href: telefonHref },
    { icon: Mail, label: "E-Mail", value: email, href: `mailto:${email}` },
    { icon: MapPin, label: "Adresse", value: adresse, href: null },
    { icon: Clock, label: "Erreichbarkeit", value: oeffnungszeiten, href: null },
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
      leistung: (form.querySelector("[data-leistung]") as HTMLInputElement)?.value ?? "",
      nachricht: (form.querySelector("#nachricht") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Fehler")
      setSubmitted(true)
    } catch {
      setError("Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.")
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
            Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
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
            Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Kontaktinfos */}
          <div className="flex flex-col gap-6">
            {kontaktInfos.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="text-muted-foreground hover:text-primary transition-colors">{value}</a>
                  ) : (
                    <p className="text-muted-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formular */}
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
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
                    ].map((l) => (
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