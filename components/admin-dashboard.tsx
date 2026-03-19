"use client"
import { HeroImageUpload } from "./hero-image-upload"
import { AdminImageUpload } from "./admin-image-upload"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Phone, Mail, MapPin, Clock, Globe, FileText,
  Save, LogOut, CheckCircle, Loader2, ChevronRight,
  LayoutDashboard, Settings, Eye, Briefcase, Calendar,
  Plus, Pencil, Trash2, X, ToggleLeft, ToggleRight,
  Navigation, GripVertical, Link as LinkIcon, ChevronDown, ChevronUp,
  Users, Award, Sparkles, BarChart2
} from "lucide-react"
import Link from "next/link"

type Section = "kontakt" | "hero" | "ueber" | "leistungen" | "seminare" | "partner" | "zertifikate" | "navigation" | "seo" | "extras"

interface Leistung { _id: string; titel: string; kurzBeschreibung: string; beschreibung: string; icon: string; reihenfolge: number; aktiv: boolean }
interface Seminar { _id: string; titel: string; kategorie: string; datum: string; uhrzeit: string; ort: string; beschreibung: string; preis: string; anmeldeLink: string; aktiv: boolean }
interface Partner { _id: string; name: string; beschreibung: string; webseite: string; aktiv: boolean; reihenfolge: number }
interface Zertifikat { _id: string; name: string; beschreibung: string; aktiv: boolean; reihenfolge: number }
interface NavPunkt { _key?: string; label: string; typ: string; href?: string; aktiv: boolean; reihenfolge: number; unterpunkte?: { _key?: string; label: string; href: string }[] }

const KNOWN_PAGES = [
  { label: "Startseite", value: "/" },
  { label: "Leistungen", value: "/leistungen" },
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

export function AdminDashboard({ einstellungen }: { einstellungen?: any }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>("kontakt")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

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
    googleAnalyticsId: einstellungen?.googleAnalyticsId ?? "",
    cookieBannerAktiv: einstellungen?.cookieBannerAktiv ?? false,
    cookieBannerText: einstellungen?.cookieBannerText ?? "",
  })

  const [leistungen, setLeistungen] = useState<Leistung[]>([])
  const [editLeistung, setEditLeistung] = useState<Leistung | null>(null)
  const [newLeistung, setNewLeistung] = useState(false)
  const [leistungForm, setLeistungForm] = useState({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: 99, aktiv: true })

  const [seminare, setSeminare] = useState<Seminar[]>([])
  const [editSeminar, setEditSeminar] = useState<Seminar | null>(null)
  const [newSeminar, setNewSeminar] = useState(false)
  const [seminarForm, setSeminarForm] = useState({ titel: "", kategorie: "bau", datum: "", uhrzeit: "", ort: "", beschreibung: "", preis: "", anmeldeLink: "", aktiv: true })

  const [partner, setPartner] = useState<Partner[]>([])
  const [editPartner, setEditPartner] = useState<Partner | null>(null)
  const [newPartner, setNewPartner] = useState(false)
  const [partnerForm, setPartnerForm] = useState({ name: "", beschreibung: "", webseite: "", aktiv: true, reihenfolge: 99 })

  const [zertifikate, setZertifikate] = useState<Zertifikat[]>([])
  const [editZertifikat, setEditZertifikat] = useState<Zertifikat | null>(null)
  const [newZertifikat, setNewZertifikat] = useState(false)
  const [zertifikatForm, setZertifikatForm] = useState({ name: "", beschreibung: "", aktiv: true, reihenfolge: 99 })

  const [navPunkte, setNavPunkte] = useState<NavPunkt[]>([])
  const [editNav, setEditNav] = useState<NavPunkt | null>(null)
  const [editNavIndex, setEditNavIndex] = useState<number | null>(null)
  const [newNav, setNewNav] = useState(false)
  const [navForm, setNavForm] = useState<NavPunkt>({ label: "", typ: "link", href: "", aktiv: true, reihenfolge: 99, unterpunkte: [] })

  const [calMonth, setCalMonth] = useState(new Date())

  useEffect(() => {
    if (activeSection === "leistungen") load("leistungen")
    if (activeSection === "seminare") load("seminare")
    if (activeSection === "partner") load("partner")
    if (activeSection === "zertifikate") load("zertifikate")
    if (activeSection === "navigation") load("navigation")
  }, [activeSection])

  async function load(type: string) {
    const res = await fetch(`/api/admin/${type}`)
    const data = await res.json()
    if (type === "leistungen") setLeistungen(Array.isArray(data) ? data : [])
    if (type === "seminare") setSeminare(Array.isArray(data) ? data : [])
    if (type === "partner") setPartner(Array.isArray(data) ? data : [])
    if (type === "zertifikate") setZertifikate(Array.isArray(data) ? data : [])
    if (type === "navigation") setNavPunkte(data?.punkte ?? [])
  }

  async function saveForm() {
    setSaving(true); setError("")
    try {
      const res = await fetch("/api/admin/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setSaved(true); setTimeout(() => setSaved(false), 3000)
      // Website Cache leeren
      fetch("/api/revalidate", { method: "POST", headers: { "x-webhook-secret": "meyso2024secret" } }).catch(() => {})
    } catch { setError("Fehler beim Speichern.") } finally { setSaving(false) }
  }

  async function saveItem(type: string, editItem: any, itemForm: any, setEdit: any, setNew: any) {
    setSaving(true)
    try {
      if (editItem) {
        await fetch(`/api/admin/${type}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: editItem._id, ...itemForm }) })
      } else {
        await fetch(`/api/admin/${type}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(itemForm) })
      }
      await load(type); setEdit(null); setNew(false)
      fetch("/api/revalidate", { method: "POST", headers: { "x-webhook-secret": "meyso2024secret" } }).catch(() => {})
    } catch { setError('Fehler.') } finally { setSaving(false) }
  }

  async function deleteItem(type: string, id: string) {
    if (!confirm("Wirklich loeschen?")) return
    await fetch(`/api/admin/${type}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) })
    await load(type)
  }

  async function saveNavigation() {
    setSaving(true)
    try {
      let updated = [...navPunkte]
      if (editNavIndex !== null) updated[editNavIndex] = navForm
      else updated.push(navForm)
      await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: updated }) })
      await load("navigation"); setEditNav(null); setEditNavIndex(null); setNewNav(false)
    } catch { setError("Fehler.") } finally { setSaving(false) }
  }

  async function saveNavOrder() {
    setSaving(true)
    try {
      await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: navPunkte }) })
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    } catch { setError("Fehler.") } finally { setSaving(false) }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  function getDaysInMonth(date: Date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }
  function getFirstDayOfMonth(date: Date) { return (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7 }
  function getSeminareForDay(day: number) {
    return seminare.filter(s => { if (!s.datum) return false; const d = new Date(s.datum); return d.getFullYear() === calMonth.getFullYear() && d.getMonth() === calMonth.getMonth() && d.getDate() === day })
  }

  const navItems = [
    { id: "kontakt" as Section, label: "Kontaktdaten", icon: Phone },
    { id: "hero" as Section, label: "Hero & Startseite", icon: LayoutDashboard },
    { id: "ueber" as Section, label: "Ueber uns", icon: FileText },
    { id: "leistungen" as Section, label: "Leistungen", icon: Briefcase },
    { id: "seminare" as Section, label: "Seminartermine", icon: Calendar },
    { id: "partner" as Section, label: "Partner", icon: Users },
    { id: "zertifikate" as Section, label: "Zertifikate", icon: Award },
    { id: "navigation" as Section, label: "Navigation", icon: Navigation },
    { id: "seo" as Section, label: "SEO & Meta", icon: Globe },
    { id: "extras" as Section, label: "Extras & KI", icon: Sparkles },
  ]

  const isFormSection = ["kontakt", "hero", "ueber", "seo", "extras"].includes(activeSection)
  const isEditingItem = editLeistung || newLeistung || editSeminar || newSeminar || editPartner || newPartner || editZertifikat || newZertifikat || editNav || newNav

  function getSaveAction() {
    if (isFormSection) return saveForm
    if (activeSection === "leistungen") return () => saveItem("leistungen", editLeistung, leistungForm, setEditLeistung, setNewLeistung)
    if (activeSection === "seminare") return () => saveItem("seminare", editSeminar, seminarForm, setEditSeminar, setNewSeminar)
    if (activeSection === "partner") return () => saveItem("partner", editPartner, partnerForm, setEditPartner, setNewPartner)
    if (activeSection === "zertifikate") return () => saveItem("zertifikate", editZertifikat, zertifikatForm, setEditZertifikat, setNewZertifikat)
    if (activeSection === "navigation") return isEditingItem ? saveNavigation : saveNavOrder
    return saveForm
  }

  const showSave = isFormSection || isEditingItem || activeSection === "navigation"
  // Partner/Zertifikate Speichern nur im Edit-Modus zeigen
  const showSaveButton = activeSection === "partner" ? (editPartner !== null || newPartner) :
    activeSection === "zertifikate" ? (editZertifikat !== null || newZertifikat) : showSave

  return (
    <div className="min-h-screen bg-zinc-950 flex">
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
          {navItems.map((item) => (
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

      <main className="flex-1 ml-64">
        <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold">{navItems.find(n => n.id === activeSection)?.label}</h1>
            <p className="text-zinc-500 text-sm">Aenderungen werden sofort nach dem Speichern sichtbar</p>
          </div>
          {showSaveButton && (
            <button onClick={getSaveAction()} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Speichern...</>
                : saved ? <><CheckCircle className="h-4 w-4" /> Gespeichert!</>
                : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          )}
        </div>

        <div className="p-6 lg:p-8 max-w-5xl">
          {error && <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

          {activeSection === "kontakt" && (
            <div className="space-y-6">
              <Field label="Firmenname" icon={<Globe className="h-4 w-4" />} value={form.firmenname} onChange={v => setForm(p => ({...p, firmenname: v}))} placeholder="SQ Schmidt Qualitaetssicherung" />
              <Field label="Telefon" icon={<Phone className="h-4 w-4" />} value={form.telefon} onChange={v => setForm(p => ({...p, telefon: v}))} placeholder="07726 / 929394" />
              <Field label="E-Mail" icon={<Mail className="h-4 w-4" />} value={form.email} onChange={v => setForm(p => ({...p, email: v}))} placeholder="info@beispiel.de" type="email" />
              <Field label="Adresse" icon={<MapPin className="h-4 w-4" />} value={form.adresse} onChange={v => setForm(p => ({...p, adresse: v}))} placeholder="Marktplatz 21, 78647 Trossingen" />
              <Field label="Oeffnungszeiten" icon={<Clock className="h-4 w-4" />} value={form.oeffnungszeiten} onChange={v => setForm(p => ({...p, oeffnungszeiten: v}))} placeholder="Mo-Fr 8:00-18:00 Uhr" />
            </div>
          )}

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
              <TextareaField label="Hero Titel" value={form.heroTitel} onChange={v => setForm(p => ({...p, heroTitel: v}))} rows={2} hint="Grosser Titel auf der Startseite" />
              <TextareaField label="Hero Beschreibung" value={form.heroBeschreibung} onChange={v => setForm(p => ({...p, heroBeschreibung: v}))} rows={3} hint="Untertitel unter dem Hero-Titel" />
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Jahre Erfahrung" value={form.jahreErfahrung} onChange={v => setForm(p => ({...p, jahreErfahrung: v}))} />
                <NumberField label="Anzahl Projekte" value={form.anzahlProjekte} onChange={v => setForm(p => ({...p, anzahlProjekte: v}))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Hero Hintergrundbild</label>
                <p className="text-xs text-zinc-500 mb-3">Dunkles Baubild empfohlen</p>
                <HeroImageUpload />
              </div>

          {activeSection === "ueber" && (
            <div className="space-y-6">
              <Field label="Ueber uns Titel" value={form.uebermichTitel} onChange={v => setForm(p => ({...p, uebermichTitel: v}))} />
              <TextareaField label="Ueber uns Text" value={form.uebermichText} onChange={v => setForm(p => ({...p, uebermichText: v}))} rows={6} hint="Startseite und Ueber-uns-Seite" />
            </div>
          )}

          {activeSection === "leistungen" && (
            <div className="space-y-4">
              {!editLeistung && !newLeistung ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">{leistungen.length} Leistungen</p>
                    <button onClick={() => { setNewLeistung(true); setLeistungForm({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: leistungen.length + 1, aktiv: true }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neue Leistung
                    </button>
                  </div>
                  {leistungen.map((l) => (
                    <div key={l._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{l.titel}</p>
                        <p className="text-zinc-500 text-xs truncate">{l.kurzBeschreibung}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={async () => { await fetch("/api/admin/leistungen", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...l, aktiv: !l.aktiv }) }); await load("leistungen") }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${l.aktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                          {l.aktiv ? "Aktiv" : "Inaktiv"}
                        </button>
                        <button onClick={() => { setEditLeistung(l); setLeistungForm({ titel: l.titel, kurzBeschreibung: l.kurzBeschreibung, beschreibung: l.beschreibung, icon: l.icon, reihenfolge: l.reihenfolge, aktiv: l.aktiv }) }}
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => deleteItem("leistungen", l._id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editLeistung ? "Bearbeiten" : "Neue Leistung"}</h2>
                    <button onClick={() => { setEditLeistung(null); setNewLeistung(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Titel *" value={leistungForm.titel} onChange={v => setLeistungForm(p => ({...p, titel: v}))} placeholder="z.B. Schadensgutachten" />
                  <TextareaField label="Kurzbeschreibung *" value={leistungForm.kurzBeschreibung} onChange={v => setLeistungForm(p => ({...p, kurzBeschreibung: v}))} rows={2} hint="Wird in der Kachel angezeigt" />
                  <TextareaField label="Vollstaendige Beschreibung" value={leistungForm.beschreibung} onChange={v => setLeistungForm(p => ({...p, beschreibung: v}))} rows={5} hint="Wird auf der Detailseite angezeigt" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Icon" value={leistungForm.icon} onChange={v => setLeistungForm(p => ({...p, icon: v}))} placeholder="ShieldCheck" />
                    <NumberField label="Reihenfolge" value={leistungForm.reihenfolge} onChange={v => setLeistungForm(p => ({...p, reihenfolge: v}))} />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === "seminare" && (
            <div className="space-y-6">
              {!editSeminar && !newSeminar ? (
                <>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-white font-semibold">{calMonth.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</h2>
                      <div className="flex gap-2">
                        <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700">
                          <ChevronDown className="h-4 w-4 rotate-90" />
                        </button>
                        <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700">
                          <ChevronUp className="h-4 w-4 rotate-90" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Mo","Di","Mi","Do","Fr","Sa","So"].map(d => <div key={d} className="text-center text-xs text-zinc-500 py-1">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: getFirstDayOfMonth(calMonth) }).map((_, i) => <div key={`e${i}`} />)}
                      {Array.from({ length: getDaysInMonth(calMonth) }).map((_, i) => {
                        const day = i + 1
                        const ds = getSeminareForDay(day)
                        const today = new Date()
                        const isToday = today.getDate() === day && today.getMonth() === calMonth.getMonth() && today.getFullYear() === calMonth.getFullYear()
                        return (
                          <div key={day} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm ${isToday ? "bg-primary/20 text-primary font-bold" : "text-zinc-400 hover:bg-zinc-800"}`}>
                            {day}
                            {ds.length > 0 && <div className="flex gap-0.5 mt-0.5">{ds.slice(0,3).map((_,si) => <div key={si} className="h-1 w-1 rounded-full bg-primary" />)}</div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">{seminare.length} Termine</p>
                    <button onClick={() => { setNewSeminar(true); setSeminarForm({ titel: "", kategorie: "bau", datum: "", uhrzeit: "", ort: "", beschreibung: "", preis: "", anmeldeLink: "", aktiv: true }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neuer Termin
                    </button>
                  </div>
                  {seminare.map((s) => (
                    <div key={s._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0 text-primary">
                        <span className="text-xs font-bold">{s.datum ? new Date(s.datum).getDate() : "?"}</span>
                        <span className="text-[10px]">{s.datum ? new Date(s.datum).toLocaleDateString("de-DE", { month: "short" }) : ""}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{s.titel}</p>
                        <p className="text-zinc-500 text-xs">{s.ort}{s.preis ? ` · ${s.preis}` : ""}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditSeminar(s); setSeminarForm({ titel: s.titel, kategorie: s.kategorie, datum: s.datum, uhrzeit: s.uhrzeit, ort: s.ort, beschreibung: s.beschreibung, preis: s.preis, anmeldeLink: s.anmeldeLink, aktiv: s.aktiv }) }}
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => deleteItem("seminare", s._id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editSeminar ? "Bearbeiten" : "Neuer Termin"}</h2>
                    <button onClick={() => { setEditSeminar(null); setNewSeminar(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Titel *" value={seminarForm.titel} onChange={v => setSeminarForm(p => ({...p, titel: v}))} placeholder="z.B. Baurecht fuer Bauleiter" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Kategorie</label>
                      <select value={seminarForm.kategorie} onChange={e => setSeminarForm(p => ({...p, kategorie: e.target.value}))}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary">
                        {["bau","recht","technik","sonstiges"].map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase()+k.slice(1)}</option>)}
                      </select>
                    </div>
                    <Field label="Datum" value={seminarForm.datum} onChange={v => setSeminarForm(p => ({...p, datum: v}))} type="date" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Uhrzeit" value={seminarForm.uhrzeit} onChange={v => setSeminarForm(p => ({...p, uhrzeit: v}))} placeholder="09:00 - 17:00 Uhr" />
                    <Field label="Ort" value={seminarForm.ort} onChange={v => setSeminarForm(p => ({...p, ort: v}))} placeholder="Trossingen" />
                  </div>
                  <TextareaField label="Beschreibung" value={seminarForm.beschreibung} onChange={v => setSeminarForm(p => ({...p, beschreibung: v}))} rows={4} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Preis" value={seminarForm.preis} onChange={v => setSeminarForm(p => ({...p, preis: v}))} placeholder="299,00 EUR" />
                    <Field label="Anmelde-Link" value={seminarForm.anmeldeLink} onChange={v => setSeminarForm(p => ({...p, anmeldeLink: v}))} placeholder="https://..." />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === "partner" && (
            <div className="space-y-4">
              {!editPartner && !newPartner ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">{partner.length} Partner</p>
                    <button onClick={() => { setNewPartner(true); setPartnerForm({ name: "", beschreibung: "", webseite: "", aktiv: true, reihenfolge: partner.length + 1 }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neuer Partner
                    </button>
                  </div>
                  {partner.map((p) => (
                    <div key={p._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{p.name}</p>
                        <p className="text-zinc-500 text-xs">{p.beschreibung}</p>
                        {p.webseite && <p className="text-xs text-primary truncate">{p.webseite}</p>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={async () => { await fetch("/api/admin/partner", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...p, aktiv: !p.aktiv }) }); await load("partner") }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${p.aktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                          {p.aktiv ? "Aktiv" : "Inaktiv"}
                        </button>
                        <button onClick={() => { setEditPartner(p); setPartnerForm({ name: p.name, beschreibung: p.beschreibung, webseite: p.webseite, aktiv: p.aktiv, reihenfolge: p.reihenfolge }) }}
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => deleteItem("partner", p._id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editPartner ? "Bearbeiten" : "Neuer Partner"}</h2>
                    <button onClick={() => { setEditPartner(null); setNewPartner(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Name *" value={partnerForm.name} onChange={v => setPartnerForm(p => ({...p, name: v}))} placeholder="z.B. TUeV Rheinland" />
                  <Field label="Beschreibung" value={partnerForm.beschreibung} onChange={v => setPartnerForm(p => ({...p, beschreibung: v}))} placeholder="Technische Pruefung" />
                  <Field label="Webseite" value={partnerForm.webseite} onChange={v => setPartnerForm(p => ({...p, webseite: v}))} placeholder="https://..." type="url" />
                  {editPartner && <AdminImageUpload documentId={editPartner._id} type="partner" onUploaded={(url) => console.log("Bild hochgeladen:", url)} />}
                  <NumberField label="Reihenfolge" value={partnerForm.reihenfolge} onChange={v => setPartnerForm(p => ({...p, reihenfolge: v}))} />
                </div>
              )}
            </div>
          )}

          {activeSection === "zertifikate" && (
            <div className="space-y-4">
              {!editZertifikat && !newZertifikat ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">{zertifikate.length} Zertifikate</p>
                    <button onClick={() => { setNewZertifikat(true); setZertifikatForm({ name: "", beschreibung: "", aktiv: true, reihenfolge: zertifikate.length + 1 }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neues Zertifikat
                    </button>
                  </div>
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
                        <button onClick={async () => { await fetch("/api/admin/zertifikate", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...z, aktiv: !z.aktiv }) }); await load("zertifikate") }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${z.aktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                          {z.aktiv ? "Aktiv" : "Inaktiv"}
                        </button>
                        <button onClick={() => { setEditZertifikat(z); setZertifikatForm({ name: z.name, beschreibung: z.beschreibung, aktiv: z.aktiv, reihenfolge: z.reihenfolge }) }}
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => deleteItem("zertifikate", z._id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editZertifikat ? "Bearbeiten" : "Neues Zertifikat"}</h2>
                    <button onClick={() => { setEditZertifikat(null); setNewZertifikat(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Name *" value={zertifikatForm.name} onChange={v => setZertifikatForm(p => ({...p, name: v}))} placeholder="z.B. TUeV Zertifizierung" />
                  <Field label="Beschreibung" value={zertifikatForm.beschreibung} onChange={v => setZertifikatForm(p => ({...p, beschreibung: v}))} placeholder="Zertifizierter Sachverstaendiger" />
                  {editZertifikat && <AdminImageUpload documentId={editZertifikat._id} type="zertifikat" onUploaded={(url) => console.log("Bild hochgeladen:", url)} />}
                  <NumberField label="Reihenfolge" value={zertifikatForm.reihenfolge} onChange={v => setZertifikatForm(p => ({...p, reihenfolge: v}))} />
                </div>
              )}
            </div>
          )}

          {activeSection === "navigation" && (
            <div className="space-y-4">
              {!editNav && !newNav ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">Header-Menuepunkte</p>
                    <button onClick={() => { setNewNav(true); setNavForm({ label: "", typ: "link", href: "", aktiv: true, reihenfolge: navPunkte.length + 1, unterpunkte: [] }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neuer Punkt
                    </button>
                  </div>
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Vorschau</p>
                    <div className="flex items-center gap-6 flex-wrap">
                      {navPunkte.filter(p => p.aktiv).sort((a,b) => a.reihenfolge - b.reihenfolge).map((p,i) => (
                        <div key={i} className="flex items-center gap-1 text-sm text-zinc-300">
                          {p.label}{p.typ !== "link" && <ChevronDown className="h-3 w-3 text-zinc-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  {navPunkte.sort((a,b) => a.reihenfolge - b.reihenfolge).map((p, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <GripVertical className="h-4 w-4 text-zinc-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{p.label}</p>
                        <p className="text-zinc-500 text-xs">{p.typ === "link" ? p.href : p.typ === "leistungen" ? "Auto: Leistungen" : p.typ === "seminare" ? "Auto: Seminare" : `Dropdown (${p.unterpunkte?.length ?? 0})`}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={async () => { const u = navPunkte.map((np,ni) => ni===i ? {...np, aktiv: !np.aktiv} : np); setNavPunkte(u); await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: u }) }) }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${p.aktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                          {p.aktiv ? "Aktiv" : "Inaktiv"}
                        </button>
                        <button onClick={() => { setEditNav(p); setEditNavIndex(i); setNavForm(p) }} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700"><Pencil className="h-4 w-4" /></button>
                        <button onClick={async () => { if(!confirm("Loeschen?")) return; const u = navPunkte.filter((_,ni) => ni!==i); await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: u }) }); await load("navigation") }} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editNav ? "Bearbeiten" : "Neuer Menuepunkt"}</h2>
                    <button onClick={() => { setEditNav(null); setEditNavIndex(null); setNewNav(false) }} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <Field label="Bezeichnung *" value={navForm.label} onChange={v => setNavForm(p => ({...p, label: v}))} placeholder="z.B. Blog" />
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Typ</label>
                    <select value={navForm.typ} onChange={e => setNavForm(p => ({...p, typ: e.target.value}))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary">
                      <option value="link">Direktlink</option>
                      <option value="dropdown">Dropdown (manuelle Punkte)</option>
                      <option value="leistungen">Leistungen (automatisch)</option>
                      <option value="seminare">Seminare (automatisch)</option>
                    </select>
                  </div>
                  {navForm.typ === "link" && (
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Zielseite</label>
                      <select value={navForm.href ?? ""} onChange={e => setNavForm(p => ({...p, href: e.target.value}))}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary">
                        <option value="">Bitte waehlen...</option>
                        {KNOWN_PAGES.map(pg => <option key={pg.value} value={pg.value}>{pg.label}</option>)}
                      </select>
                    </div>
                  )}
                  {navForm.typ === "dropdown" && (
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Unterpunkte</label>
                      <div className="space-y-2">
                        {navForm.unterpunkte?.map((up, ui) => (
                          <div key={ui} className="flex gap-2">
                            <input value={up.label} onChange={e => { const u = [...(navForm.unterpunkte ?? [])]; u[ui] = {...u[ui], label: e.target.value}; setNavForm(p => ({...p, unterpunkte: u})) }}
                              placeholder="Bezeichnung" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                            <select value={up.href} onChange={e => { const u = [...(navForm.unterpunkte ?? [])]; u[ui] = {...u[ui], href: e.target.value}; setNavForm(p => ({...p, unterpunkte: u})) }}
                              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary">
                              <option value="">Link waehlen...</option>
                              {KNOWN_PAGES.map(pg => <option key={pg.value} value={pg.value}>{pg.label}</option>)}
                            </select>
                            <button onClick={() => setNavForm(p => ({...p, unterpunkte: p.unterpunkte?.filter((_,fi) => fi!==ui)}))} className="p-2 text-zinc-500 hover:text-red-400"><X className="h-4 w-4" /></button>
                          </div>
                        ))}
                        <button onClick={() => setNavForm(p => ({...p, unterpunkte: [...(p.unterpunkte ?? []), { label: "", href: "" }]}))}
                          className="flex items-center gap-2 text-sm text-primary hover:underline">
                          <Plus className="h-3.5 w-3.5" /> Unterpunkt hinzufuegen
                        </button>
                      </div>
                    </div>
                  )}
                  <NumberField label="Reihenfolge" value={navForm.reihenfolge} onChange={v => setNavForm(p => ({...p, reihenfolge: v}))} />
                </div>
              )}
            </div>
          )}

          {activeSection === "extras" && (
            <div className="space-y-8">
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart2 className="h-4 w-4 text-primary" />
                  </div>
                  <div><h3 className="text-white font-semibold text-sm">Google Analytics</h3><p className="text-zinc-500 text-xs">Website-Besucher tracken</p></div>
                  <div className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${form.googleAnalyticsId ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>{form.googleAnalyticsId ? "Aktiv" : "Inaktiv"}</div>
                </div>
                <Field label="Google Analytics ID" value={form.googleAnalyticsId ?? ""} onChange={v => { setForm((p: any) => ({...p, googleAnalyticsId: v})); setSaved(false) }} placeholder="G-XXXXXXXXXX" hint="Finden Sie unter analytics.google.com" />
              </div>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center"><Sparkles className="h-4 w-4 text-primary" /></div>
                  <div><h3 className="text-white font-semibold text-sm">Cookie Banner</h3><p className="text-zinc-500 text-xs">DSGVO Cookie Hinweis</p></div>
                  <button onClick={() => { setForm((p: any) => ({...p, cookieBannerAktiv: !p.cookieBannerAktiv})); setSaved(false) }} className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${form.cookieBannerAktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>{form.cookieBannerAktiv ? "Aktiv" : "Inaktiv"}</button>
                </div>
                <TextareaField label="Banner Text" value={form.cookieBannerText ?? ""} onChange={(v: string) => { setForm((p: any) => ({...p, cookieBannerText: v})); setSaved(false) }} rows={2} hint="Leer lassen fuer Standard-Text" />
              </div>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl opacity-60">
                <h3 className="text-white font-semibold text-sm mb-4">Demnachst verfuegbar</h3>
                <div className="space-y-3">
                  {[{label:"KI-Texte generieren",desc:"Leistungstexte mit KI verbessern"},{label:"Chat-Widget",desc:"KI-Assistent auf der Website"},{label:"Monatlicher Bericht",desc:"Automatischer Performance-Bericht"},{label:"Google Bewertungen",desc:"Bewertungen im Dashboard"},{label:"Termin-Buchung",desc:"Online-Kalender fuer Kunden"}].map((f,i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl">
                      <Sparkles className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                      <div><p className="text-zinc-300 text-sm font-medium">{f.label}</p><p className="text-zinc-500 text-xs">{f.desc}</p></div>
                      <span className="ml-auto text-xs px-2 py-0.5 bg-zinc-700 text-zinc-400 rounded-full">Bald</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeSection === "seo" && (
            <div className="space-y-6">
              <Field label="SEO Titel" value={form.seoTitel} onChange={v => setForm(p => ({...p, seoTitel: v}))} hint="Browser-Tab und Google (max. 60 Zeichen)" />
              <TextareaField label="SEO Beschreibung" value={form.seoBeschreibung} onChange={v => setForm(p => ({...p, seoBeschreibung: v}))} rows={3} hint="Google Beschreibung (max. 160 Zeichen)" />
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Google Vorschau</p>
                <p className="text-blue-400 text-sm font-medium truncate">{form.seoTitel || "SQ Schmidt Qualitaetssicherung"}</p>
                <p className="text-green-600 text-xs">www.ihre-domain.de</p>
                <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{form.seoBeschreibung || "Beschreibung..."}</p>
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
