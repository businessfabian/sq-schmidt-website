"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setSending(false)
  }

  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Kontakt</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                Sprechen wir über Ihr Projekt
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir melden uns innerhalb von 24 Stunden.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { icon: Phone, label: "Telefon", value: "07726 / 929394", href: "tel:+4977269293940" },
                { icon: Mail, label: "E-Mail", value: "sqs@sq-sv.de", href: "mailto:sqs@sq-sv.de" },
                { icon: MapPin, label: "Adresse", value: "Marktplatz 21, 78647 Trossingen", href: null },
                { icon: Clock, label: "Erreichbarkeit", value: "Mo–Fr 8:00–18:00 Uhr", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Anfrage gesendet!</h3>
                <p className="text-muted-foreground">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="vorname">Vorname</Label>
                    <Input id="vorname" placeholder="Max" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="nachname">Nachname</Label>
                    <Input id="nachname" placeholder="Mustermann" required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" placeholder="max@beispiel.de" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="telefon">Telefon (optional)</Label>
                  <Input id="telefon" type="tel" placeholder="07726 / ..." />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="leistung">Gewünschte Leistung</Label>
                  <Select>
                    <SelectTrigger id="leistung">
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualitaetssicherung">Baubegleitende Qualitätssicherung</SelectItem>
                      <SelectItem value="maengelmanagement">Mängelmanagement</SelectItem>
                      <SelectItem value="baucontrolling">Baucontrolling</SelectItem>
                      <SelectItem value="schadensgutachten">Schadensgutachten</SelectItem>
                      <SelectItem value="sanierungskonzepte">Sanierungskonzepte</SelectItem>
                      <SelectItem value="baumediation">Baumediation</SelectItem>
                      <SelectItem value="seminare">Seminare & Beratung</SelectItem>
                      <SelectItem value="sonstige">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nachricht">Nachricht</Label>
                  <Textarea id="nachricht" placeholder="Beschreiben Sie kurz Ihr Anliegen..." rows={4} required />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={sending}>
                  {sending ? "Wird gesendet..." : "Anfrage senden →"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a> zu.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
