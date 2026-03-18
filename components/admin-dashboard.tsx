"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Phone, Mail, MapPin, Clock, Globe, FileText,
  Save, LogOut, CheckCircle, Loader2, ChevronRight,
  LayoutDashboard, Settings, Eye, Briefcase, Calendar,
  Plus, Pencil, Trash2, X, ToggleLeft, ToggleRight,
  Navigation, GripVertical, Link as LinkIcon, ChevronDown, ChevronUp
} from "lucide-react"
import Link from "next/link"

const KNOWN_PAGES = [
  { label: "Startseite", value: "/" },
  { label: "Leistungen Uebersicht", value: "/leistungen" },
  { label: "Ueber Uns", value: "/ueber-uns" },
  { label: "Partner", value: "/partner" },
  { label: "Aktuelles / Baurecht IBR", value: "/aktuelles" },
  { label: "Zertifikate", value: "/zertifikate" },
  { label: "Vita", value: "/vita" },
  { label: "Seminartermine", value: "/seminare" },
  { label: "Kontakt", value: "/kontakt" },
  { label: "Impressum", value: "/impressum" },
  { label: "Datenschutz", value: "/datenschutz" },
]
type Section = "kontakt" | "hero" | "ueber" | "leistungen" | "seminare" | "navigation" | "seo"

interface Leistung {
  _id: string; titel: string; kurzBeschreibung: string
  beschreibung: string; icon: string; reihenfolge: number; aktiv: boolean
}

interface Seminar {
  _id: string; titel: string; kategorie: string; datum: string
  uhrzeit: string; ort: string; beschreibung: string; preis: string
  anmeldeLink: string; aktiv: boolean
}

interface NavPunkt {
  _key?: string; label: string; typ: string; href?: string
  aktiv: boolean; reihenfolge: number
  unterpunkte?: { _key?: string; label: string; href: string }[]
}

export function AdminDashboard({ einstellungen }: { einstellungen?: any }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>("kontakt")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  // Einstellungen
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

  // Leistungen
  const [leistungen, setLeistungen] = useState<Leistung[]>([])
  const [editLeistung, setEditLeistung] = useState<Leistung | null>(null)
  const [newLeistung, setNewLeistung] = useState(false)
  const [leistungForm, setLeistungForm] = useState({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: 99, aktiv: true })

  // Seminare
  const [seminare, setSeminare] = useState<Seminar[]>([])
  const [editSeminar, setEditSeminar] = useState<Seminar | null>(null)
  const [newSeminar, setNewSeminar] = useState(false)
  const [seminarForm, setSeminarForm] = useState({ titel: "", kategorie: "bau", datum: "", uhrzeit: "", ort: "", beschreibung: "", preis: "", anmeldeLink: "", aktiv: true })

  // Navigation
  const [navPunkte, setNavPunkte] = useState<NavPunkt[]>([])
  const [editNav, setEditNav] = useState<NavPunkt | null>(null)
  const [editNavIndex, setEditNavIndex] = useState<number | null>(null)
  const [newNav, setNewNav] = useState(false)
  const [navForm, setNavForm] = useState<NavPunkt>({ label: "", typ: "link", href: "", aktiv: true, reihenfolge: 99, unterpunkte: [] })

  // Kalender State
  const [calMonth, setCalMonth] = useState(new Date())

  useEffect(() => {
    if (activeSection === "leistungen") loadLeistungen()
    if (activeSection === "seminare") loadSeminare()
    if (activeSection === "navigation") loadNavigation()
  }, [activeSection])

  async function loadLeistungen() {
    const res = await fetch("/api/admin/leistungen")
    const data = await res.json()
    setLeistungen(Array.isArray(data) ? data : [])
  }

  async function loadSeminare() {
    const res = await fetch("/api/admin/seminare")
    const data = await res.json()
    setSeminare(Array.isArray(data) ? data : [])
  }

  async function loadNavigation() {
    const res = await fetch("/api/admin/navigation")
    const data = await res.json()
    setNavPunkte(data?.punkte ?? [])
  }

  function update(key: string, value: any) {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true); setError("")
    try {
      const res = await fetch("/api/admin/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch { setError("Fehler beim Speichern.") } finally { setSaving(false) }
  }

  async function saveLeistung() {
    setSaving(true)
    try {
      if (editLeistung) {
        await fetch("/api/admin/leistungen", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: editLeistung._id, ...leistungForm }) })
      } else {
        await fetch("/api/admin/leistungen", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(leistungForm) })
      }
      await loadLeistungen(); setEditLeistung(null); setNewLeistung(false)
    } catch { setError("Fehler.") } finally { setSaving(false) }
  }

  async function deleteLeistung(id: string) {
    if (!confirm("Leistung loeschen?")) return
    await fetch("/api/admin/leistungen", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) })
    await loadLeistungen()
  }

  async function saveSeminar() {
    setSaving(true)
    try {
      if (editSeminar) {
        await fetch("/api/admin/seminare", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: editSeminar._id, ...seminarForm }) })
      } else {
        await fetch("/api/admin/seminare", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(seminarForm) })
      }
      await loadSeminare(); setEditSeminar(null); setNewSeminar(false)
    } catch { setError("Fehler.") } finally { setSaving(false) }
  }

  async function deleteSeminar(id: string) {
    if (!confirm("Seminar loeschen?")) return
    await fetch("/api/admin/seminare", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) })
    await loadSeminare()
  }

  async function saveNavigation() {
    setSaving(true)
    try {
      let updated = [...navPunkte]
      if (editNavIndex !== null) {
        updated[editNavIndex] = navForm
      } else {
        updated.push(navForm)
      }
      await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: updated }) })
      await loadNavigation(); setEditNav(null); setEditNavIndex(null); setNewNav(false)
    } catch { setError("Fehler.") } finally { setSaving(false) }
  }

  async function saveNavOrder() {
    setSaving(true)
    try {
      await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: navPunkte }) })
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    } catch { setError("Fehler.") } finally { setSaving(false) }
  }

  async function deleteNav(index: number) {
    if (!confirm("Menuepunkt loeschen?")) return
    const updated = navPunkte.filter((_, i) => i !== index)
    await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: updated }) })
    await loadNavigation()
  }

  async function toggleNav(index: number) {
    const updated = navPunkte.map((p, i) => i === index ? { ...p, aktiv: !p.aktiv } : p)
    setNavPunkte(updated)
    await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: updated }) })
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  // Kalender Hilfsfunktionen
  function getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  function getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  function getSeminareForDay(day: number) {
    return seminare.filter(s => {
      if (!s.datum) return false
      const d = new Date(s.datum)
      return d.getFullYear() === calMonth.getFullYear() && d.getMonth() === calMonth.getMonth() && d.getDate() === day
    })
  }

  const nav = [
    { id: "kontakt" as Section, label: "Kontaktdaten", icon: Phone },
    { id: "hero" as Section, label: "Hero & Startseite", icon: LayoutDashboard },
    { id: "ueber" as Section, label: "Ueber uns", icon: FileText },
    { id: "leistungen" as Section, label: "Leistungen", icon: Briefcase },
    { id: "seminare" as Section, label: "Seminartermine", icon: Calendar },
    { id: "navigation" as Section, label: "Navigation", icon: Navigation },
    { id: "seo" as Section, label: "SEO & Meta", icon: Globe },
  ]

  const isFormSection = ["kontakt", "hero", "ueber", "seo"].includes(activeSection)
  const isEditingItem = editLeistung || newLeistung || editSeminar || newSeminar || editNav || newNav

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
              <p className="font-semibold text-white text-sm">Admin Dashboard</p>
              <p className="text-zinc-500 text-xs">Powered by Meyso</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {nav.map((item) => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === item.id ? "bg-primary/10 text-primary border border-primary/20" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
              {activeSection === item.id && <ChevronRight className="h-3 w-3 ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <Eye className="h-4 w-4" /> Website ansehen
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
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
          {(isFormSection || isEditingItem || activeSection === "navigation") && (
            <button
              onClick={isFormSection ? handleSave : isEditingItem ? (activeSection === "leistungen" ? saveLeistung : activeSection === "seminare" ? saveSeminar : saveNavigation) : saveNavOrder}
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

          {/* KONTAKT */}
          {activeSection === "kontakt" && (
            <div className="space-y-6">
              <Field label="Firmenname" icon={<Globe className="h-4 w-4" />} value={form.firmenname} onChange={v => update("firmenname", v)} placeholder="SQ Schmidt Qualitaetssicherung" />
              <Field label="Telefon" icon={<Phone className="h-4 w-4" />} value={form.telefon} onChange={v => update("telefon", v)} placeholder="07726 / 929394" />
              <Field label="E-Mail" icon={<Mail className="h-4 w-4" />} value={form.email} onChange={v => update("email", v)} placeholder="info@beispiel.de" type="email" />
              <Field label="Adresse" icon={<MapPin className="h-4 w-4" />} value={form.adresse} onChange={v => update("adresse", v)} placeholder="Marktplatz 21, 78647 Trossingen" />
              <Field label="Oeffnungszeiten" icon={<Clock className="h-4 w-4" />} value={form.oeffnungszeiten} onChange={v => update("oeffnungszeiten", v)} placeholder="Mo-Fr 8:00-18:00 Uhr" />
            </div>
          )}

          {/* HERO */}
          {activeSection === "hero" && (
            <div className="space-y-6">
              <TextareaField label="Hero Titel" value={form.heroTitel} onChange={v => update("heroTitel", v)} rows={2} hint="Grosser Titel auf der Startseite" />
              <TextareaField label="Hero Beschreibung" value={form.heroBeschreibung} onChange={v => update("heroBeschreibung", v)} rows={3} hint="Untertitel unter dem Hero-Titel" />
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Jahre Erfahrung" value={form.jahreErfahrung} onChange={v => update("jahreErfahrung", v)} />
                <NumberField label="Anzahl Projekte" value={form.anzahlProjekte} onChange={v => update("anzahlProjekte", v)} />
              </div>
            </div>
          )}

          {/* UEBER */}
          {activeSection === "ueber" && (
            <div className="space-y-6">
              <Field label="Ueber uns Titel" value={form.uebermichTitel} onChange={v => update("uebermichTitel", v)} />
              <TextareaField label="Ueber uns Text" value={form.uebermichText} onChange={v => update("uebermichText", v)} rows={6} hint="Wird auf Startseite und Ueber-uns-Seite angezeigt" />
            </div>
          )}

          {/* LEISTUNGEN */}
          {activeSection === "leistungen" && (
            <div className="space-y-4">
              {!editLeistung && !newLeistung ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-zinc-400 text-sm">{leistungen.length} Leistungen</p>
                    <button onClick={() => { setNewLeistung(true); setLeistungForm({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: leistungen.length + 1, aktiv: true }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neue Leistung
                    </button>
                  </div>
                  <div className="space-y-3">
                    {leistungen.map((l) => (
                      <div key={l._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                        <GripVertical className="h-4 w-4 text-zinc-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{l.titel}</p>
                          <p className="text-zinc-500 text-xs truncate mt-0.5">{l.kurzBeschreibung}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={async () => { await fetch("/api/admin/leistungen", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...l, aktiv: !l.aktiv }) }); await loadLeistungen() }}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${l.aktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                            {l.aktiv ? <><ToggleRight className="h-3.5 w-3.5" /> Aktiv</> : <><ToggleLeft className="h-3.5 w-3.5" /> Inaktiv</>}
                          </button>
                          <button onClick={() => { setEditLeistung(l); setLeistungForm({ titel: l.titel, kurzBeschreibung: l.kurzBeschreibung, beschreibung: l.beschreibung, icon: l.icon, reihenfolge: l.reihenfolge, aktiv: l.aktiv }) }}
                            className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => deleteLeistung(l._id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editLeistung ? "Leistung bearbeiten" : "Neue Leistung"}</h2>
                    <button onClick={() => { setEditLeistung(null); setNewLeistung(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Titel *" value={leistungForm.titel} onChange={v => setLeistungForm(p => ({ ...p, titel: v }))} placeholder="z.B. Schadensgutachten" />
                  <TextareaField label="Kurzbeschreibung *" value={leistungForm.kurzBeschreibung} onChange={v => setLeistungForm(p => ({ ...p, kurzBeschreibung: v }))} rows={2} hint="Wird in der Kachel auf der Startseite angezeigt" />
                  <TextareaField label="Vollstaendige Beschreibung" value={leistungForm.beschreibung} onChange={v => setLeistungForm(p => ({ ...p, beschreibung: v }))} rows={5} hint="Wird auf der Detailseite angezeigt" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Icon (lucide-react)" value={leistungForm.icon} onChange={v => setLeistungForm(p => ({ ...p, icon: v }))} placeholder="ShieldCheck" />
                    <NumberField label="Reihenfolge" value={leistungForm.reihenfolge} onChange={v => setLeistungForm(p => ({ ...p, reihenfolge: v }))} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEMINARE */}
          {activeSection === "seminare" && (
            <div className="space-y-6">
              {!editSeminar && !newSeminar ? (
                <>
                  {/* Kalender */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-white font-semibold">{calMonth.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</h2>
                      <div className="flex gap-2">
                        <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                          <ChevronDown className="h-4 w-4 rotate-90" />
                        </button>
                        <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                          <ChevronUp className="h-4 w-4 rotate-90" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map(d => (
                        <div key={d} className="text-center text-xs text-zinc-500 font-medium py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: (getFirstDayOfMonth(calMonth) + 6) % 7 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: getDaysInMonth(calMonth) }).map((_, i) => {
                        const day = i + 1
                        const daySeminare = getSeminareForDay(day)
                        const today = new Date()
                        const isToday = today.getDate() === day && today.getMonth() === calMonth.getMonth() && today.getFullYear() === calMonth.getFullYear()
                        return (
                          <div key={day} className={`aspect-square rounded-lg flex flex-col items-center justify-center relative text-sm transition-all ${isToday ? "bg-primary/20 text-primary font-bold" : "text-zinc-400 hover:bg-zinc-800"}`}>
                            {day}
                            {daySeminare.length > 0 && (
                              <div className="flex gap-0.5 mt-0.5">
                                {daySeminare.slice(0, 3).map((_, si) => (
                                  <div key={si} className="h-1 w-1 rounded-full bg-primary" />
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Seminarliste */}
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">{seminare.length} Seminare</p>
                    <button onClick={() => { setNewSeminar(true); setSeminarForm({ titel: "", kategorie: "bau", datum: "", uhrzeit: "", ort: "", beschreibung: "", preis: "", anmeldeLink: "", aktiv: true }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neuer Termin
                    </button>
                  </div>
                  <div className="space-y-3">
                    {seminare.map((s) => (
                      <div key={s._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0 text-primary">
                          <span className="text-xs font-bold leading-none">{s.datum ? new Date(s.datum).getDate() : "?"}</span>
                          <span className="text-[10px] leading-none">{s.datum ? new Date(s.datum).toLocaleDateString("de-DE", { month: "short" }) : ""}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{s.titel}</p>
                          <p className="text-zinc-500 text-xs mt-0.5">{s.ort} {s.preis ? `· ${s.preis}` : ""}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setEditSeminar(s); setSeminarForm({ titel: s.titel, kategorie: s.kategorie, datum: s.datum, uhrzeit: s.uhrzeit, ort: s.ort, beschreibung: s.beschreibung, preis: s.preis, anmeldeLink: s.anmeldeLink, aktiv: s.aktiv }) }}
                            className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => deleteSeminar(s._id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editSeminar ? "Termin bearbeiten" : "Neuer Termin"}</h2>
                    <button onClick={() => { setEditSeminar(null); setNewSeminar(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Titel *" value={seminarForm.titel} onChange={v => setSeminarForm(p => ({ ...p, titel: v }))} placeholder="z.B. Baurecht fuer Bauleiter" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Kategorie</label>
                      <select value={seminarForm.kategorie} onChange={e => setSeminarForm(p => ({ ...p, kategorie: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary">
                        {["bau", "recht", "technik", "sonstiges"].map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
                      </select>
                    </div>
                    <Field label="Datum" value={seminarForm.datum} onChange={v => setSeminarForm(p => ({ ...p, datum: v }))} type="date" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Uhrzeit" value={seminarForm.uhrzeit} onChange={v => setSeminarForm(p => ({ ...p, uhrzeit: v }))} placeholder="09:00 - 17:00 Uhr" />
                    <Field label="Ort" value={seminarForm.ort} onChange={v => setSeminarForm(p => ({ ...p, ort: v }))} placeholder="z.B. Trossingen" />
                  </div>
                  <TextareaField label="Beschreibung" value={seminarForm.beschreibung} onChange={v => setSeminarForm(p => ({ ...p, beschreibung: v }))} rows={4} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Preis" value={seminarForm.preis} onChange={v => setSeminarForm(p => ({ ...p, preis: v }))} placeholder="299,00 EUR" />
                    <Field label="Anmelde-Link (optional)" value={seminarForm.anmeldeLink} onChange={v => setSeminarForm(p => ({ ...p, anmeldeLink: v }))} placeholder="https://..." />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NAVIGATION */}
          {activeSection === "navigation" && (
            <div className="space-y-4">
              {!editNav && !newNav ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-zinc-400 text-sm">Header-Menuepunkte</p>
                    <button onClick={() => { setNewNav(true); setNavForm({ label: "", typ: "link", href: "", aktiv: true, reihenfolge: navPunkte.length + 1, unterpunkte: [] }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neuer Punkt
                    </button>
                  </div>

                  {/* Vorschau */}
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl mb-2">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Header Vorschau</p>
                    <div className="flex items-center gap-6 flex-wrap">
                      {navPunkte.filter(p => p.aktiv).sort((a, b) => a.reihenfolge - b.reihenfolge).map((p, i) => (
                        <div key={i} className="flex items-center gap-1 text-sm text-zinc-300">
                          {p.label}
                          {p.typ !== "link" && <ChevronDown className="h-3 w-3 text-zinc-500" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {navPunkte.sort((a, b) => a.reihenfolge - b.reihenfolge).map((p, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                        <GripVertical className="h-4 w-4 text-zinc-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{p.label}</p>
                          <p className="text-zinc-500 text-xs mt-0.5">
                            {p.typ === "link" ? `Link: ${p.href}` : p.typ === "leistungen" ? "Automatisch: Leistungen" : p.typ === "seminare" ? "Automatisch: Seminare" : `Dropdown (${p.unterpunkte?.length ?? 0} Punkte)`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleNav(i)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${p.aktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                            {p.aktiv ? <><ToggleRight className="h-3.5 w-3.5" /> Aktiv</> : <><ToggleLeft className="h-3.5 w-3.5" /> Inaktiv</>}
                          </button>
                          <button onClick={() => { setEditNav(p); setEditNavIndex(i); setNavForm(p) }} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => deleteNav(i)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editNav ? "Menuepunkt bearbeiten" : "Neuer Menuepunkt"}</h2>
                    <button onClick={() => { setEditNav(null); setEditNavIndex(null); setNewNav(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Bezeichnung *" value={navForm.label} onChange={v => setNavForm(p => ({ ...p, label: v }))} placeholder="z.B. Blog" />
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Typ</label>
                    <select value={navForm.typ} onChange={e => setNavForm(p => ({ ...p, typ: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary">
                      <option value="link">Direktlink</option>
                      <option value="dropdown">Dropdown (manuelle Punkte)</option>
                      <option value="leistungen">Leistungen (automatisch)</option>
                      <option value="seminare">Seminare (automatisch)</option>
                    </select>
                    <p className="text-xs text-zinc-500 mt-1">
                      {navForm.typ === "leistungen" ? "Zeigt automatisch alle aktiven Leistungen" : navForm.typ === "seminare" ? "Zeigt automatisch Seminar-Kategorien" : ""}
                    </p>
                  </div>
                  {navForm.typ === "link" && (
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Zielseite</label>
                      <select value={navForm.href ?? ""} onChange={e => setNavForm(p => ({ ...p, href: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary mb-2">
                        <option value="">Bitte waehlen...</option>
                        {KNOWN_PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        <option value="extern">Externer Link (URL eingeben)</option>
                      </select>
                      {navForm.href === "extern" && (
                        <input type="url" placeholder="https://..." onChange={e => setNavForm(p => ({ ...p, href: e.target.value }))}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                      )}
                    </div>
                  )}
                  {navForm.typ === "dropdown" && (
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Unterpunkte</label>
                      <div className="space-y-2">
                        {navForm.unterpunkte?.map((up, ui) => (
                          <div key={ui} className="flex gap-2">
                            <input value={up.label} onChange={e => { const u = [...(navForm.unterpunkte ?? [])]; u[ui] = { ...u[ui], label: e.target.value }; setNavForm(p => ({ ...p, unterpunkte: u })) }}
                              placeholder="Bezeichnung" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                            <input value={up.href} onChange={e => { const u = [...(navForm.unterpunkte ?? [])]; u[ui] = { ...u[ui], href: e.target.value }; setNavForm(p => ({ ...p, unterpunkte: u })) }}
                              placeholder="/link" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                            <button onClick={() => setNavForm(p => ({ ...p, unterpunkte: p.unterpunkte?.filter((_, i) => i !== ui) }))}
                              className="p-2 rounded-lg text-zinc-500 hover:text-red-400"><X className="h-4 w-4" /></button>
                          </div>
                        ))}
                        <button onClick={() => setNavForm(p => ({ ...p, unterpunkte: [...(p.unterpunkte ?? []), { label: "", href: "" }] }))}
                          className="flex items-center gap-2 text-sm text-primary hover:underline mt-1">
                          <Plus className="h-3.5 w-3.5" /> Unterpunkt hinzufuegen
                        </button>
                      </div>
                    </div>
                  )}
                  <NumberField label="Reihenfolge" value={navForm.reihenfolge} onChange={v => setNavForm(p => ({ ...p, reihenfolge: v }))} />
                </div>
              )}
            </div>
          )}


          {/* PARTNER */}
          {activeSection === "partner" && (
            <div className="space-y-4">
              {!editPartner && !newPartner ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-zinc-400 text-sm">{partner.length} Partner</p>
                    <button onClick={() => { setNewPartner(true); setPartnerForm({ name: "", beschreibung: "", webseite: "", aktiv: true, reihenfolge: partner.length + 1 }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neuer Partner
                    </button>
                  </div>
                  <div className="space-y-3">
                    {partner.map((p) => (
                      <div key={p._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{p.name}</p>
                          <p className="text-zinc-500 text-xs">{p.beschreibung}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditPartner(p); setPartnerForm({ name: p.name, beschreibung: p.beschreibung, webseite: p.webseite, aktiv: p.aktiv, reihenfolge: p.reihenfolge }) }}
                            className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700"><Pencil className="h-4 w-4" /></button>
                          <button onClick={async () => { await fetch("/api/admin/partner", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: p._id }) }); const r = await fetch("/api/admin/partner"); setPartner(await r.json()) }}
                            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editPartner ? "Partner bearbeiten" : "Neuer Partner"}</h2>
                    <button onClick={() => { setEditPartner(null); setNewPartner(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Name *" value={partnerForm.name} onChange={(v: string) => setPartnerForm(p => ({ ...p, name: v }))} placeholder="z.B. TUeV Rheinland" />
                  <Field label="Beschreibung" value={partnerForm.beschreibung} onChange={(v: string) => setPartnerForm(p => ({ ...p, beschreibung: v }))} placeholder="Technische Pruefung" />
                  <Field label="Webseite" value={partnerForm.webseite} onChange={(v: string) => setPartnerForm(p => ({ ...p, webseite: v }))} placeholder="https://..." type="url" />
                  <NumberField label="Reihenfolge" value={partnerForm.reihenfolge} onChange={(v: number) => setPartnerForm(p => ({ ...p, reihenfolge: v }))} />
                </div>
              )}
            </div>
          )}

          {/* ZERTIFIKATE */}
          {activeSection === "zertifikate" && (
            <div className="space-y-4">
              {!editZertifikat && !newZertifikat ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-zinc-400 text-sm">{zertifikate.length} Zertifikate</p>
                    <button onClick={() => { setNewZertifikat(true); setZertifikatForm({ name: "", beschreibung: "", aktiv: true, reihenfolge: zertifikate.length + 1 }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neues Zertifikat
                    </button>
                  </div>
                  <div className="space-y-3">
                    {zertifikate.map((z) => (
                      <div key={z._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{z.name}</p>
                          <p className="text-zinc-500 text-xs">{z.beschreibung}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditZertifikat(z); setZertifikatForm({ name: z.name, beschreibung: z.beschreibung, aktiv: z.aktiv, reihenfolge: z.reihenfolge }) }}
                            className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700"><Pencil className="h-4 w-4" /></button>
                          <button onClick={async () => { await fetch("/api/admin/zertifikate", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: z._id }) }); const r = await fetch("/api/admin/zertifikate"); setZertifikate(await r.json()) }}
                            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editZertifikat ? "Zertifikat bearbeiten" : "Neues Zertifikat"}</h2>
                    <button onClick={() => { setEditZertifikat(null); setNewZertifikat(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Name *" value={zertifikatForm.name} onChange={(v: string) => setZertifikatForm(p => ({ ...p, name: v }))} placeholder="z.B. TUeV Zertifizierung" />
                  <Field label="Beschreibung" value={zertifikatForm.beschreibung} onChange={(v: string) => setZertifikatForm(p => ({ ...p, beschreibung: v }))} placeholder="Zertifizierter Sachverstaendiger" />
                  <NumberField label="Reihenfolge" value={zertifikatForm.reihenfolge} onChange={(v: number) => setZertifikatForm(p => ({ ...p, reihenfolge: v }))} />
                </div>
              )}
            </div>
          )}
          {/* SEO */}
          {activeSection === "seo" && (
            <div className="space-y-6">
              <Field label="SEO Titel" value={form.seoTitel} onChange={v => update("seoTitel", v)} hint="Erscheint im Browser-Tab und bei Google (max. 60 Zeichen)" />
              <TextareaField label="SEO Beschreibung" value={form.seoBeschreibung} onChange={v => update("seoBeschreibung", v)} rows={3} hint="Kurze Beschreibung fuer Google (max. 160 Zeichen)" />
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

function Field({ label, icon, value, onChange, placeholder, type = "text", hint }: any) {
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

function TextareaField({ label, value, onChange, placeholder, rows = 4, hint }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      {hint && <p className="text-xs text-zinc-500 mb-2">{hint}</p>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" />
    </div>
  )
}

function NumberField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
    </div>
  )
}