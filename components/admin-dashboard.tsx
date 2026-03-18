"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Phone, Mail, MapPin, Clock, Globe, FileText,
  Save, LogOut, CheckCircle, Loader2, ChevronRight,
  LayoutDashboard, Settings, Eye, Briefcase,
  Plus, Pencil, Trash2, X, Check, GripVertical, ToggleLeft, ToggleRight
} from "lucide-react"
import Link from "next/link"

interface Leistung {
  _id: string
  titel: string
  kurzBeschreibung: string
  beschreibung: string
  icon: string
  reihenfolge: number
  aktiv: boolean
}

interface Props {
  einstellungen?: any
}

type Section = "kontakt" | "hero" | "ueber" | "seo" | "leistungen"

export function AdminDashboard({ einstellungen }: Props) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>("kontakt")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  // Leistungen State
  const [leistungen, setLeistungen] = useState<Leistung[]>([])
  const [leistungenLoading, setLeistungenLoading] = useState(false)
  const [editingLeistung, setEditingLeistung] = useState<Leistung | null>(null)
  const [newLeistung, setNewLeistung] = useState(false)
  const [leistungForm, setLeistungForm] = useState({
    titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: 99, aktiv: true
  })

  const [form, setForm] = useState({
    firmenname: einstellungen?.firmenname ?? "",
    telefon: einstellungen?.telefon ?? "",
    email: einstellungen?.email ?? "",
    adresse: einstellungen?.adresse ?? "",
    oeffnungszeiten: einstellungen?.oeffnungszeiten ?? "",
    heroTitel: einstellungen?.heroTitel ?? "",
    heroBeschreibung: einstellungen?.heroBeschreibung ?? "",
    uebermichTitel: einstellungen?.uebermichTitel ?? "",
    uebermichText: einstellungen?.uebermichText ?? "",
    seoTitel: einstellungen?.seoTitel ?? "",
    seoBeschreibung: einstellungen?.seoBeschreibung ?? "",
    jahreErfahrung: einstellungen?.jahreErfahrung ?? 25,
    anzahlProjekte: einstellungen?.anzahlProjekte ?? 500,
  })

  useEffect(() => {
    if (activeSection === "leistungen") loadLeistungen()
  }, [activeSection])

  async function loadLeistungen() {
    setLeistungenLoading(true)
    try {
      const res = await fetch("/api/admin/leistungen")
      const data = await res.json()
      setLeistungen(Array.isArray(data) ? data : [])
    } catch { } finally {
      setLeistungenLoading(false)
    }
  }

  function update(key: string, value: string | number) {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Fehler beim Speichern.")
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveLeistung() {
    setSaving(true)
    try {
      if (editingLeistung) {
        await fetch("/api/admin/leistungen", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingLeistung._id, ...leistungForm }),
        })
      } else {
        await fetch("/api/admin/leistungen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leistungForm),
        })
      }
      await loadLeistungen()
      setEditingLeistung(null)
      setNewLeistung(false)
      setLeistungForm({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: 99, aktiv: true })
    } catch {
      setError("Fehler beim Speichern.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteLeistung(id: string) {
    if (!confirm("Leistung wirklich loeschen?")) return
    await fetch("/api/admin/leistungen", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    })
    await loadLeistungen()
  }

  async function handleToggleAktiv(l: Leistung) {
    await fetch("/api/admin/leistungen", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...l, aktiv: !l.aktiv }),
    })
    await loadLeistungen()
  }

  function startEdit(l: Leistung) {
    setEditingLeistung(l)
    setLeistungForm({ titel: l.titel, kurzBeschreibung: l.kurzBeschreibung, beschreibung: l.beschreibung, icon: l.icon, reihenfolge: l.reihenfolge, aktiv: l.aktiv })
    setNewLeistung(false)
  }

  function startNew() {
    setNewLeistung(true)
    setEditingLeistung(null)
    setLeistungForm({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: leistungen.length + 1, aktiv: true })
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  const nav = [
    { id: "kontakt" as Section, label: "Kontaktdaten", icon: Phone },
    { id: "hero" as Section, label: "Hero & Startseite", icon: LayoutDashboard },
    { id: "ueber" as Section, label: "Ueber uns", icon: FileText },
    { id: "leistungen" as Section, label: "Leistungen", icon: Briefcase },
    { id: "seo" as Section, label: "SEO & Meta", icon: Globe },
  ]

  const showSaveButton = activeSection !== "leistungen" || (editingLeistung !== null || newLeistung)

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Settings className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Admin</p>
              <p className="text-zinc-500 text-xs">Powered by Meyso</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
              {activeSection === item.id && <ChevronRight className="h-3 w-3 ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link href="/" target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <Eye className="h-4 w-4" /> Website ansehen
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="h-4 w-4" /> Abmelden
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64">
        <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold">{nav.find(n => n.id === activeSection)?.label}</h1>
            <p className="text-zinc-500 text-sm">Aenderungen werden sofort nach dem Speichern sichtbar</p>
          </div>
          {showSaveButton && (
            <button onClick={activeSection === "leistungen" ? handleSaveLeistung : handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Speichern...</>
                : saved ? <><CheckCircle className="h-4 w-4" /> Gespeichert!</>
                : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          )}
        </div>

        <div className="p-8 max-w-2xl">
          {error && <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

          {/* Kontakt */}
          {activeSection === "kontakt" && (
            <div className="space-y-6">
              <Field label="Firmenname" icon={<Globe className="h-4 w-4" />} value={form.firmenname} onChange={v => update("firmenname", v)} placeholder="SQ Schmidt Qualitaetssicherung" />
              <Field label="Telefon" icon={<Phone className="h-4 w-4" />} value={form.telefon} onChange={v => update("telefon", v)} placeholder="07726 / 929394" />
              <Field label="E-Mail" icon={<Mail className="h-4 w-4" />} value={form.email} onChange={v => update("email", v)} placeholder="info@beispiel.de" type="email" />
              <Field label="Adresse" icon={<MapPin className="h-4 w-4" />} value={form.adresse} onChange={v => update("adresse", v)} placeholder="Marktplatz 21, 78647 Trossingen" />
              <Field label="Oeffnungszeiten" icon={<Clock className="h-4 w-4" />} value={form.oeffnungszeiten} onChange={v => update("oeffnungszeiten", v)} placeholder="Mo-Fr 8:00-18:00 Uhr" />
            </div>
          )}

          {/* Hero */}
          {activeSection === "hero" && (
            <div className="space-y-6">
              <TextareaField label="Hero Titel" value={form.heroTitel} onChange={v => update("heroTitel", v)} placeholder="Praezision und Qualitaet fuer Ihr Bauprojekt" rows={2} hint="Der grosse Titel auf der Startseite" />
              <TextareaField label="Hero Beschreibung" value={form.heroBeschreibung} onChange={v => update("heroBeschreibung", v)} placeholder="Oeffentlich bestellter Sachverstaendiger..." rows={3} hint="Untertitel unter dem Hero-Titel" />
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Jahre Erfahrung" value={form.jahreErfahrung} onChange={v => update("jahreErfahrung", v)} />
                <NumberField label="Anzahl Projekte" value={form.anzahlProjekte} onChange={v => update("anzahlProjekte", v)} />
              </div>
            </div>
          )}

          {/* Ueber uns */}
          {activeSection === "ueber" && (
            <div className="space-y-6">
              <Field label="Ueber uns Titel" value={form.uebermichTitel} onChange={v => update("uebermichTitel", v)} placeholder="Qualitaet ist kein Zufall..." />
              <TextareaField label="Ueber uns Text" value={form.uebermichText} onChange={v => update("uebermichText", v)} placeholder="Beschreiben Sie Ihr Unternehmen..." rows={6} hint="Wird auf der Startseite und Ueber-uns-Seite angezeigt" />
            </div>
          )}

          {/* Leistungen */}
          {activeSection === "leistungen" && (
            <div className="space-y-4">
              {!editingLeistung && !newLeistung && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-zinc-400 text-sm">{leistungen.length} Leistungen</p>
                    <button onClick={startNew}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
                      <Plus className="h-4 w-4" /> Neue Leistung
                    </button>
                  </div>

                  {leistungenLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
                    </div>
                  ) : leistungen.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                      <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p>Noch keine Leistungen. Klicken Sie auf "Neue Leistung".</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leistungen.map((l) => (
                        <div key={l._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group">
                          <GripVertical className="h-4 w-4 text-zinc-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">{l.titel}</p>
                            <p className="text-zinc-500 text-xs truncate mt-0.5">{l.kurzBeschreibung}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => handleToggleAktiv(l)}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${l.aktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                              {l.aktiv ? <><ToggleRight className="h-3.5 w-3.5" /> Aktiv</> : <><ToggleLeft className="h-3.5 w-3.5" /> Inaktiv</>}
                            </button>
                            <button onClick={() => startEdit(l)}
                              className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700 transition-all">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDeleteLeistung(l._id)}
                              className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Leistung bearbeiten / neu */}
              {(editingLeistung || newLeistung) && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editingLeistung ? "Leistung bearbeiten" : "Neue Leistung"}</h2>
                    <button onClick={() => { setEditingLeistung(null); setNewLeistung(false) }}
                      className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Field label="Titel *" value={leistungForm.titel} onChange={v => setLeistungForm(p => ({ ...p, titel: v }))} placeholder="z.B. Baubegleitende Qualitaetssicherung" />
                  <TextareaField label="Kurzbeschreibung *" value={leistungForm.kurzBeschreibung} onChange={v => setLeistungForm(p => ({ ...p, kurzBeschreibung: v }))} rows={2} placeholder="Kurze Beschreibung fuer die Kachel auf der Homepage" hint="Wird auf der Startseite in der Leistungs-Kachel angezeigt" />
                  <TextareaField label="Vollstaendige Beschreibung" value={leistungForm.beschreibung} onChange={v => setLeistungForm(p => ({ ...p, beschreibung: v }))} rows={5} placeholder="Ausfuehrliche Beschreibung fuer die Detailseite..." hint="Wird auf der Leistungs-Detailseite angezeigt" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Icon" value={leistungForm.icon} onChange={v => setLeistungForm(p => ({ ...p, icon: v }))} placeholder="ShieldCheck" hint="lucide-react Icon Name" />
                    <NumberField label="Reihenfolge" value={leistungForm.reihenfolge} onChange={v => setLeistungForm(p => ({ ...p, reihenfolge: v }))} />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <input type="checkbox" id="aktiv" checked={leistungForm.aktiv}
                      onChange={e => setLeistungForm(p => ({ ...p, aktiv: e.target.checked }))}
                      className="w-4 h-4 accent-primary" />
                    <label htmlFor="aktiv" className="text-sm text-zinc-300">Auf Website anzeigen</label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEO */}
          {activeSection === "seo" && (
            <div className="space-y-6">
              <Field label="SEO Titel" value={form.seoTitel} onChange={v => update("seoTitel", v)} placeholder="SQ Schmidt | Sachverstaendiger Bauwesen" hint="Erscheint im Browser-Tab und bei Google (max. 60 Zeichen)" />
              <TextareaField label="SEO Beschreibung" value={form.seoBeschreibung} onChange={v => update("seoBeschreibung", v)} placeholder="Oeffentlich bestellter Sachverstaendiger..." rows={3} hint="Kurze Beschreibung fuer Google (max. 160 Zeichen)" />
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Google Vorschau</p>
                <p className="text-blue-400 text-sm font-medium truncate">{form.seoTitel || "SQ Schmidt Qualitaetssicherung"}</p>
                <p className="text-green-600 text-xs">www.ihre-domain.de</p>
                <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{form.seoBeschreibung || "Beschreibung erscheint hier..."}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function Field({ label, icon, value, onChange, placeholder, type = "text", hint }: {
  label: string; icon?: React.ReactNode; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      {hint && <p className="text-xs text-zinc-500 mb-2">{hint}</p>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${icon ? "pl-10 pr-4" : "px-4"}`} />
      </div>
    </div>
  )
}

function TextareaField({ label, value, onChange, placeholder, rows = 4, hint }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; rows?: number; hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      {hint && <p className="text-xs text-zinc-500 mb-2">{hint}</p>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" />
    </div>
  )
}

function NumberField({ label, value, onChange }: {
  label: string; value: number; onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
    </div>
  )
}