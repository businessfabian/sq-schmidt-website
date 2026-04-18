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
  Navigation, GripVertical, Link as LinkIcon, ChevronDown,
  Users, Award, Sparkles, BarChart2, Activity, ChevronUp,
  Gauge, Smartphone, Monitor, AlertTriangle, TrendingUp, Zap,
  Search, Filter, GraduationCap, Menu
} from "lucide-react"
import Link from "next/link"

type Section = "kontakt" | "hero" | "ueber" | "leistungen" | "seminare" | "partner" | "zertifikate" | "fortbildungen" | "navigation" | "seo" | "extras" | "analyse"

// Stable client-side id for React keys in editable arrays
function uid() {
  return `k_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

interface ProzessSchritt { _key?: string; titel: string; beschreibung: string }
interface Leistung { _id: string; titel: string; kurzBeschreibung: string; beschreibung: string; icon: string; reihenfolge: number; aktiv: boolean; bildUrl?: string; leistungsumfang?: string[]; prozess?: ProzessSchritt[] }
interface Seminar { _id: string; titel: string; kategorie: string; datumVon: string; datumBis?: string; uhrzeit: string; ort: string; beschreibung: string; preis: string; anmeldeLink: string; aktiv: boolean }
interface Partner { _id: string; name: string; beschreibung: string; webseite: string; aktiv: boolean; reihenfolge: number }
interface Zertifikat { _id: string; name: string; beschreibung: string; aktiv: boolean; reihenfolge: number }
interface NavPunkt { _key?: string; label: string; typ: string; href?: string; aktiv: boolean; reihenfolge: number; unterpunkte?: { _key?: string; label: string; href: string }[] }
interface FortbildungEintrag { _id: string; titel: string; datum: string; veranstalter: string; ort?: string; themenbereich?: string; unterrichtseinheiten?: number; hervorgehoben?: boolean }

const KNOWN_PAGES = [
  { label: "Startseite", value: "/" },
  { label: "Leistungen", value: "/leistungen" },
  { label: "Über Uns", value: "/ueber-uns" },
  { label: "Partner", value: "/partner" },
  { label: "Aktuelles / Baurecht IBR", value: "/aktuelles" },
  { label: "Zertifikate", value: "/zertifikate" },
  { label: "Vita", value: "/vita" },
  { label: "Seminartermine", value: "/seminare" },
  { label: "Fortbildungen", value: "/fortbildungen" },
  { label: "Kontakt", value: "/kontakt" },
  { label: "Impressum", value: "/impressum" },
  { label: "Datenschutz", value: "/datenschutz" },
]

export function AdminDashboard({ einstellungen }: { einstellungen?: any }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>("kontakt")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    firmenname: einstellungen?.firmenname ?? "",
    telefon: einstellungen?.telefon ?? "",
    email: einstellungen?.email ?? "",
    adresse: einstellungen?.adresse ?? "",
    adresse2: einstellungen?.adresse2 ?? "",
    oeffnungszeiten: einstellungen?.oeffnungszeiten ?? "",
    heroBadge: einstellungen?.heroBadge ?? "",
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
    chatWidgetAktiv: einstellungen?.chatWidgetAktiv ?? false,
    tawkPropertyId: einstellungen?.tawkPropertyId ?? "",
  })

  const [uebermichBildUrl, setUebermichBildUrl] = useState<string | undefined>(einstellungen?.uebermichBildUrl)

  const [leistungen, setLeistungen] = useState<Leistung[]>([])
  const [editLeistung, setEditLeistung] = useState<Leistung | null>(null)
  const [newLeistung, setNewLeistung] = useState(false)
  const [leistungForm, setLeistungForm] = useState<{
    titel: string; kurzBeschreibung: string; beschreibung: string; icon: string; reihenfolge: number; aktiv: boolean
    bildUrl?: string; leistungsumfang: string[]; prozess: ProzessSchritt[]
  }>({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: 99, aktiv: true, bildUrl: undefined, leistungsumfang: [], prozess: [] })

  const [seminare, setSeminare] = useState<Seminar[]>([])
  const [editSeminar, setEditSeminar] = useState<Seminar | null>(null)
  const [newSeminar, setNewSeminar] = useState(false)
  const [seminarForm, setSeminarForm] = useState({ titel: "", kategorie: "bau", datumVon: "", datumBis: "", uhrzeit: "", ort: "", beschreibung: "", preis: "", anmeldeLink: "", aktiv: true })

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

  const [fortbildungenList, setFortbildungenList] = useState<FortbildungEintrag[]>([])
  const [editFortbildung, setEditFortbildung] = useState<FortbildungEintrag | null>(null)
  const [newFortbildung, setNewFortbildung] = useState(false)
  const [fortbildungForm, setFortbildungForm] = useState({
    titel: "", datum: "", veranstalter: "", ort: "", themenbereich: "", unterrichtseinheiten: "", hervorgehoben: false
  })

  // Filter & Suche
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "aktiv" | "inaktiv">("all")


  useEffect(() => {
    setSearchQuery(""); setStatusFilter("all")
    if (activeSection === "leistungen") load("leistungen")
    if (activeSection === "seminare") load("seminare")
    if (activeSection === "partner") load("partner")
    if (activeSection === "zertifikate") load("zertifikate")
    if (activeSection === "navigation") load("navigation")
    if (activeSection === "fortbildungen") load("fortbildungen")
  }, [activeSection])

  async function load(type: string) {
    const res = await fetch(`/api/admin/${type}`)
    const data = await res.json()
    if (type === "leistungen") setLeistungen(Array.isArray(data) ? data : [])
    if (type === "seminare") setSeminare(Array.isArray(data) ? data : [])
    if (type === "partner") setPartner(Array.isArray(data) ? data : [])
    if (type === "zertifikate") setZertifikate(Array.isArray(data) ? data : [])
    if (type === "navigation") setNavPunkte(data?.punkte ?? [])
    if (type === "fortbildungen") setFortbildungenList(Array.isArray(data) ? data : [])
  }

  async function saveForm() {
    setSaving(true); setError("")
    try {
      const res = await fetch("/api/admin/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setSaved(true); setTimeout(() => setSaved(false), 3000)
      // Website Cache leeren
      fetch("/api/admin/revalidate", { method: "POST" }).catch(() => {})
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
      fetch("/api/admin/revalidate", { method: "POST" }).catch(() => {})
    } catch { setError('Fehler.') } finally { setSaving(false) }
  }

  async function deleteItem(type: string, id: string) {
    if (!confirm("Wirklich löschen?")) return
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


  const navItems = [
    { id: "kontakt" as Section, label: "Kontaktdaten", icon: Phone },
    { id: "hero" as Section, label: "Hero & Startseite", icon: LayoutDashboard },
    { id: "ueber" as Section, label: "Über uns", icon: FileText },
    { id: "leistungen" as Section, label: "Leistungen", icon: Briefcase },
    { id: "seminare" as Section, label: "Seminartermine", icon: Calendar },
    { id: "partner" as Section, label: "Partner", icon: Users },
    { id: "zertifikate" as Section, label: "Zertifikate", icon: Award },
    { id: "fortbildungen" as Section, label: "Fortbildungen", icon: GraduationCap, badge: fortbildungenList.length },
    { id: "navigation" as Section, label: "Navigation", icon: Navigation },
    { id: "seo" as Section, label: "SEO & Meta", icon: Globe },
    { id: "extras" as Section, label: "Extras & KI", icon: Sparkles },
    { id: "analyse" as Section, label: "Website Analyse", icon: Activity },
  ]

  const isFormSection = ["kontakt", "hero", "ueber", "seo", "extras"].includes(activeSection)
  const isEditingItem = editLeistung || newLeistung || editSeminar || newSeminar || editPartner || newPartner || editZertifikat || newZertifikat || editNav || newNav || editFortbildung || newFortbildung

  function getSaveAction() {
    if (isFormSection) return saveForm
    if (activeSection === "leistungen") return () => saveItem("leistungen", editLeistung, leistungForm, setEditLeistung, setNewLeistung)
    if (activeSection === "seminare") return () => saveItem("seminare", editSeminar, seminarForm, setEditSeminar, setNewSeminar)
    if (activeSection === "partner") return () => saveItem("partner", editPartner, partnerForm, setEditPartner, setNewPartner)
    if (activeSection === "zertifikate") return () => saveItem("zertifikate", editZertifikat, zertifikatForm, setEditZertifikat, setNewZertifikat)
    if (activeSection === "navigation") return isEditingItem ? saveNavigation : saveNavOrder
    if (activeSection === "fortbildungen") return () => saveItem("fortbildungen", editFortbildung, { ...fortbildungForm, unterrichtseinheiten: fortbildungForm.unterrichtseinheiten ? Number(fortbildungForm.unterrichtseinheiten) : undefined }, setEditFortbildung, setNewFortbildung)
    return saveForm
  }

  const showSave = isFormSection || isEditingItem || activeSection === "navigation"
  // Partner/Zertifikate Speichern nur im Edit-Modus zeigen
  const showSaveButton = activeSection === "partner" ? (editPartner !== null || newPartner) :
    activeSection === "zertifikate" ? (editZertifikat !== null || newZertifikat) : showSave

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full z-30 transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
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
            <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === item.id ? "bg-primary/10 text-primary border border-primary/20" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
              {(item as { badge?: number }).badge ? (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary min-w-[20px] text-center">
                  {(item as { badge?: number }).badge}
                </span>
              ) : activeSection === item.id ? (
                <ChevronRight className="h-3 w-3 ml-auto" />
              ) : null}
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

      <main className="flex-1 md:ml-64">
        <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger -- nur Mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              aria-label="Menu oeffnen"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-white font-semibold truncate">{navItems.find(n => n.id === activeSection)?.label}</h1>
              <p className="text-zinc-500 text-xs hidden sm:block">Änderungen werden sofort nach dem Speichern sichtbar</p>
            </div>
          </div>
          {showSaveButton && (
            <button onClick={getSaveAction()} disabled={saving}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" /><span className="hidden sm:inline">Speichern...</span></>
                : saved ? <><CheckCircle className="h-4 w-4" /><span className="hidden sm:inline">Gespeichert!</span></>
                : <><Save className="h-4 w-4" /><span className="hidden sm:inline">Speichern</span></>}
            </button>
          )}
        </div>

        <div className="p-6 lg:p-8 max-w-5xl">
          {error && <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

          {activeSection === "kontakt" && (
            <div className="space-y-6">
              <Field label="Firmenname" icon={<Globe className="h-4 w-4" />} value={form.firmenname} onChange={v => setForm(p => ({...p, firmenname: v}))} placeholder="SQ Schmidt Qualitätssicherung" />
              <Field label="Telefon" icon={<Phone className="h-4 w-4" />} value={form.telefon} onChange={v => setForm(p => ({...p, telefon: v}))} placeholder="07726 / 929394" />
              <Field label="E-Mail" icon={<Mail className="h-4 w-4" />} value={form.email} onChange={v => setForm(p => ({...p, email: v}))} placeholder="info@beispiel.de" type="email" />
              <Field label="Adresse" icon={<MapPin className="h-4 w-4" />} value={form.adresse} onChange={v => setForm(p => ({...p, adresse: v}))} placeholder="Marktplatz 21, 78647 Trossingen" />
              <Field label="Weitere Adresse (optional)" icon={<MapPin className="h-4 w-4" />} value={form.adresse2} onChange={v => setForm(p => ({...p, adresse2: v}))} placeholder="z.B. Zweigstelle oder Postadresse" />
              <Field label="Öffnungszeiten" icon={<Clock className="h-4 w-4" />} value={form.oeffnungszeiten} onChange={v => setForm(p => ({...p, oeffnungszeiten: v}))} placeholder="Mo-Fr 8:00-18:00 Uhr" />
            </div>
          )}

          {activeSection === "hero" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Field label="Hero Badge" value={form.heroBadge} onChange={v => setForm(p => ({...p, heroBadge: v}))} placeholder="z.B. Öffentlich bestellter Sachverständiger · IHK Konstanz" hint="Kleiner Text über dem Hero-Titel" />
                <TextareaField label="Hero Titel" value={form.heroTitel} onChange={v => setForm(p => ({...p, heroTitel: v}))} rows={2} hint="Großer Titel auf der Startseite" />
                <TextareaField label="Hero Beschreibung" value={form.heroBeschreibung} onChange={v => setForm(p => ({...p, heroBeschreibung: v}))} rows={3} hint="Untertitel unter dem Hero-Titel" />
                <div className="grid grid-cols-2 gap-4">
                  <NumberField label="Jahre Erfahrung" value={form.jahreErfahrung} onChange={v => setForm(p => ({...p, jahreErfahrung: v}))} />
                  <NumberField label="Anzahl Projekte" value={form.anzahlProjekte} onChange={v => setForm(p => ({...p, anzahlProjekte: v}))} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-zinc-300">Hero Hintergrundbild</label>
                <p className="text-xs text-zinc-500">Dunkles Baubild empfohlen — wird als Fullscreen-Hintergrund angezeigt</p>
                <HeroImageUpload />
              </div>
            </div>
          )}

          {activeSection === "ueber" && (
            <div className="space-y-6">
              <Field label="Über uns Titel" value={form.uebermichTitel} onChange={v => setForm(p => ({...p, uebermichTitel: v}))} />
              <TextareaField label="Über uns Text" value={form.uebermichText} onChange={v => setForm(p => ({...p, uebermichText: v}))} rows={6} hint="Startseite und Über-uns-Seite" />
              {einstellungen?._id ? (
                <AdminImageUpload
                  documentId={einstellungen._id}
                  type="ueber"
                  currentImage={uebermichBildUrl}
                  onUploaded={url => setUebermichBildUrl(url)}
                />
              ) : (
                <p className="text-xs text-zinc-500">Bild kann nach dem ersten Speichern der Einstellungen hochgeladen werden.</p>
              )}
            </div>
          )}

          {activeSection === "leistungen" && (
            <div className="space-y-4">
              {!editLeistung && !newLeistung ? (
                <>
                  <ListToolbar
                    count={leistungen.length}
                    label="Leistungen"
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilter={setStatusFilter}
                    onAdd={() => { setNewLeistung(true); setLeistungForm({ titel: "", kurzBeschreibung: "", beschreibung: "", icon: "ShieldCheck", reihenfolge: leistungen.length + 1, aktiv: true, bildUrl: undefined, leistungsumfang: [], prozess: [] }) }}
                    addLabel="Neue Leistung"
                  />
                  {filterItems(leistungen, searchQuery, statusFilter, l => l.titel).map((l) => (
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
                        <button onClick={() => { setEditLeistung(l); setLeistungForm({ titel: l.titel, kurzBeschreibung: l.kurzBeschreibung, beschreibung: l.beschreibung, icon: l.icon, reihenfolge: l.reihenfolge, aktiv: l.aktiv, bildUrl: l.bildUrl, leistungsumfang: l.leistungsumfang ?? [], prozess: (l.prozess ?? []).map(p => ({ ...p, _key: p._key ?? uid() })) }) }}
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
                  <TextareaField label="Vollständige Beschreibung" value={leistungForm.beschreibung} onChange={v => setLeistungForm(p => ({...p, beschreibung: v}))} rows={5} hint="Wird auf der Detailseite angezeigt" />
                  {editLeistung && (
                    <AdminImageUpload
                      documentId={editLeistung._id}
                      type="leistung"
                      currentImage={leistungForm.bildUrl}
                      onUploaded={url => setLeistungForm(p => ({...p, bildUrl: url}))}
                    />
                  )}
                  {!editLeistung && (
                    <p className="text-xs text-zinc-500">Bild kann nach dem ersten Speichern hochgeladen werden.</p>
                  )}
                  <StringArrayField
                    label="Leistungsumfang"
                    hint="Wird als Häkchen-Liste auf der Detailseite angezeigt"
                    items={leistungForm.leistungsumfang}
                    onChange={items => setLeistungForm(p => ({...p, leistungsumfang: items}))}
                    placeholder="z.B. Qualitätsprüfung aller Gewerke"
                  />
                  <ProzessArrayField
                    label="Prozess-Schritte"
                    hint="Werden als nummerierte Schritt-Kacheln auf der Detailseite angezeigt"
                    items={leistungForm.prozess}
                    onChange={items => setLeistungForm(p => ({...p, prozess: items}))}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Icon" value={leistungForm.icon} onChange={v => setLeistungForm(p => ({...p, icon: v}))} placeholder="ShieldCheck" hint="Name aus lucide.dev/icons (z.B. ShieldCheck, Wrench, Scale)" />
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
                  <ListToolbar
                    count={seminare.length}
                    label="Termine"
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilter={setStatusFilter}
                    onAdd={() => { setNewSeminar(true); setSeminarForm({ titel: "", kategorie: "bau", datumVon: "", datumBis: "", uhrzeit: "", ort: "", beschreibung: "", preis: "", anmeldeLink: "", aktiv: true }) }}
                    addLabel="Neuer Termin"
                  />
                  {filterItems(seminare, searchQuery, statusFilter, s => `${s.titel} ${s.ort}`).map((s) => (
                    <div key={s._id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0 text-primary">
                        <span className="text-xs font-bold">{s.datumVon ? new Date(s.datumVon + "T12:00:00").getDate() : "?"}</span>
                        <span className="text-[10px]">{s.datumVon ? new Date(s.datumVon + "T12:00:00").toLocaleDateString("de-DE", { month: "short" }) : ""}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{s.titel}</p>
                        <p className="text-zinc-500 text-xs">
                          {s.datumVon && (s.datumBis
                            ? `${new Date(s.datumVon + "T12:00:00").toLocaleDateString("de-DE", { day: "2-digit", month: "short" })} bis ${new Date(s.datumBis + "T12:00:00").toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}`
                            : new Date(s.datumVon + "T12:00:00").toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })
                          )}
                          {s.ort ? ` · ${s.ort}` : ""}
                          {s.preis ? ` · ${s.preis}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditSeminar(s); setSeminarForm({ titel: s.titel, kategorie: s.kategorie, datumVon: s.datumVon, datumBis: s.datumBis ?? "", uhrzeit: s.uhrzeit, ort: s.ort, beschreibung: s.beschreibung, preis: s.preis, anmeldeLink: s.anmeldeLink, aktiv: s.aktiv }) }}
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
                  <Field label="Titel *" value={seminarForm.titel} onChange={v => setSeminarForm(p => ({...p, titel: v}))} placeholder="z.B. Baurecht für Bauleiter" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Kategorie</label>
                      <select value={seminarForm.kategorie} onChange={e => setSeminarForm(p => ({...p, kategorie: e.target.value}))}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary">
                        {["bau","recht","technik","sonstiges"].map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase()+k.slice(1)}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Von *" value={seminarForm.datumVon} onChange={v => setSeminarForm(p => ({...p, datumVon: v}))} type="date" />
                      <Field label="Bis (opt.)" value={seminarForm.datumBis} onChange={v => setSeminarForm(p => ({...p, datumBis: v}))} type="date" />
                    </div>
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
                  <ListToolbar
                    count={partner.length}
                    label="Partner"
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilter={setStatusFilter}
                    onAdd={() => { setNewPartner(true); setPartnerForm({ name: "", beschreibung: "", webseite: "", aktiv: true, reihenfolge: partner.length + 1 }) }}
                    addLabel="Neuer Partner"
                  />
                  {filterItems(partner, searchQuery, statusFilter, p => `${p.name} ${p.beschreibung}`).map((p) => (
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
                  <Field label="Name *" value={partnerForm.name} onChange={v => setPartnerForm(p => ({...p, name: v}))} placeholder="z.B. TÜV Rheinland" />
                  <Field label="Beschreibung" value={partnerForm.beschreibung} onChange={v => setPartnerForm(p => ({...p, beschreibung: v}))} placeholder="Technische Prüfung" />
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
                  <ListToolbar
                    count={zertifikate.length}
                    label="Zertifikate"
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilter={setStatusFilter}
                    onAdd={() => { setNewZertifikat(true); setZertifikatForm({ name: "", beschreibung: "", aktiv: true, reihenfolge: zertifikate.length + 1 }) }}
                    addLabel="Neues Zertifikat"
                  />
                  {filterItems(zertifikate, searchQuery, statusFilter, z => `${z.name} ${z.beschreibung}`).map((z) => (
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
                  <Field label="Name *" value={zertifikatForm.name} onChange={v => setZertifikatForm(p => ({...p, name: v}))} placeholder="z.B. TÜV Zertifizierung" />
                  <Field label="Beschreibung" value={zertifikatForm.beschreibung} onChange={v => setZertifikatForm(p => ({...p, beschreibung: v}))} placeholder="Zertifizierter Sachverständiger" />
                  {editZertifikat && <AdminImageUpload documentId={editZertifikat._id} type="zertifikat" onUploaded={(url) => console.log("Bild hochgeladen:", url)} />}
                  <NumberField label="Reihenfolge" value={zertifikatForm.reihenfolge} onChange={v => setZertifikatForm(p => ({...p, reihenfolge: v}))} />
                </div>
              )}
            </div>
          )}

          {activeSection === "fortbildungen" && (() => {
            const THEMEN_LABEL: Record<string, string> = {
              "feuchte-schimmel": "Feuchte & Schimmel",
              "abdichtung": "Abdichtung",
              "wdvs-fassade": "WDVS & Fassade",
              "energieeffizienz": "Energieeffizienz",
              "recht-sachverstaendigenwesen": "Recht",
            }
            const THEMEN_BADGE: Record<string, string> = {
              "feuchte-schimmel": "bg-blue-500/10 text-blue-400",
              "abdichtung": "bg-emerald-500/10 text-emerald-400",
              "wdvs-fassade": "bg-amber-500/10 text-amber-400",
              "energieeffizienz": "bg-violet-500/10 text-violet-400",
              "recht-sachverstaendigenwesen": "bg-rose-500/10 text-rose-400",
            }
            const THEMEN_OPTIONS = [
              { value: "", label: "Kein Themenbereich" },
              { value: "feuchte-schimmel", label: "Feuchte & Schimmel" },
              { value: "abdichtung", label: "Abdichtung" },
              { value: "wdvs-fassade", label: "WDVS & Fassade" },
              { value: "energieeffizienz", label: "Energieeffizienz" },
              { value: "recht-sachverstaendigenwesen", label: "Recht & Sachverstaendigenwesen" },
            ]

            if (editFortbildung || newFortbildung) {
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <button onClick={() => { setEditFortbildung(null); setNewFortbildung(false) }} className="text-zinc-400 hover:text-white transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                    <h2 className="text-white font-semibold">{editFortbildung ? "Fortbildung bearbeiten" : "Neue Fortbildung"}</h2>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Titel *</label>
                    <input value={fortbildungForm.titel} onChange={e => setFortbildungForm(f => ({ ...f, titel: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" placeholder="z.B. Schimmelpilzsanierung nach WTA-Merkblatt" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Datum *</label>
                      <input type="date" value={fortbildungForm.datum} onChange={e => setFortbildungForm(f => ({ ...f, datum: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Unterrichtseinheiten</label>
                      <input type="number" value={fortbildungForm.unterrichtseinheiten} onChange={e => setFortbildungForm(f => ({ ...f, unterrichtseinheiten: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" placeholder="z.B. 8" min="1" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Veranstalter *</label>
                    <input value={fortbildungForm.veranstalter} onChange={e => setFortbildungForm(f => ({ ...f, veranstalter: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" placeholder="z.B. TUeV Rheinland" />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Ort (optional)</label>
                    <input value={fortbildungForm.ort} onChange={e => setFortbildungForm(f => ({ ...f, ort: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" placeholder="z.B. Stuttgart" />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Themenbereich</label>
                    <select value={fortbildungForm.themenbereich} onChange={e => setFortbildungForm(f => ({ ...f, themenbereich: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary">
                      {THEMEN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={fortbildungForm.hervorgehoben} onChange={e => setFortbildungForm(f => ({ ...f, hervorgehoben: e.target.checked }))}
                      className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm text-zinc-300">Hervorgehoben (erscheint prominent auf der Seite)</span>
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => saveItem("fortbildungen", editFortbildung, { ...fortbildungForm, unterrichtseinheiten: fortbildungForm.unterrichtseinheiten ? Number(fortbildungForm.unterrichtseinheiten) : undefined }, setEditFortbildung, setNewFortbildung)}
                      disabled={!fortbildungForm.titel || !fortbildungForm.datum || !fortbildungForm.veranstalter || saving}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      {editFortbildung ? "Speichern" : "Anlegen"}
                    </button>
                    <button onClick={() => { setEditFortbildung(null); setNewFortbildung(false) }}
                      className="px-4 py-2.5 bg-zinc-800 text-zinc-300 rounded-xl text-sm hover:bg-zinc-700">
                      Abbrechen
                    </button>
                  </div>
                </div>
              )
            }

            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white font-semibold">Fortbildungen</h2>
                    <p className="text-zinc-500 text-sm">{fortbildungenList.length} Eintraege</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="/fortbildungen" target="_blank"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                      <Eye className="h-3.5 w-3.5" /> Seite
                    </a>
                    <button onClick={() => { setNewFortbildung(true); setFortbildungForm({ titel: "", datum: "", veranstalter: "", ort: "", themenbereich: "", unterrichtseinheiten: "", hervorgehoben: false }) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
                      <Plus className="h-4 w-4" /> Neue Fortbildung
                    </button>
                  </div>
                </div>

                {fortbildungenList.length === 0 ? (
                  <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
                    <GraduationCap className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-300 text-sm font-medium mb-1">Noch keine Eintraege</p>
                    <p className="text-zinc-500 text-xs">Klicken Sie auf "Neue Fortbildung" um zu beginnen.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {fortbildungenList.map((f) => {
                      const datumFormatiert = f.datum
                        ? new Date(f.datum).toLocaleDateString("de-DE", { year: "numeric", month: "long" })
                        : "Kein Datum"
                      return (
                        <div key={f._id} className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                            <GraduationCap className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">{f.titel}</p>
                            <p className="text-zinc-500 text-xs">{datumFormatiert} &middot; {f.veranstalter}</p>
                          </div>
                          {f.themenbereich && THEMEN_LABEL[f.themenbereich] && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline ${THEMEN_BADGE[f.themenbereich] ?? "bg-zinc-700 text-zinc-400"}`}>
                              {THEMEN_LABEL[f.themenbereich]}
                            </span>
                          )}
                          <button onClick={() => {
                            setEditFortbildung(f)
                            setFortbildungForm({
                              titel: f.titel,
                              datum: f.datum,
                              veranstalter: f.veranstalter,
                              ort: f.ort ?? "",
                              themenbereich: f.themenbereich ?? "",
                              unterrichtseinheiten: f.unterrichtseinheiten?.toString() ?? "",
                              hervorgehoben: f.hervorgehoben ?? false,
                            })
                          }} className="p-1.5 text-zinc-500 hover:text-primary hover:bg-zinc-800 rounded-lg transition-all flex-shrink-0">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => deleteItem("fortbildungen", f._id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-all flex-shrink-0">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })()}

          {activeSection === "navigation" && (
            <div className="space-y-4">
              {!editNav && !newNav ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">Header-Menüpunkte</p>
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
                        <button onClick={async () => { if(!confirm("Löschen?")) return; const u = navPunkte.filter((_,ni) => ni!==i); await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ punkte: u }) }); await load("navigation") }} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">{editNav ? "Bearbeiten" : "Neuer Menüpunkt"}</h2>
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
                        <option value="">Bitte wählen...</option>
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
                              <option value="">Link wählen...</option>
                              {KNOWN_PAGES.map(pg => <option key={pg.value} value={pg.value}>{pg.label}</option>)}
                            </select>
                            <button onClick={() => setNavForm(p => ({...p, unterpunkte: p.unterpunkte?.filter((_,fi) => fi!==ui)}))} className="p-2 text-zinc-500 hover:text-red-400"><X className="h-4 w-4" /></button>
                          </div>
                        ))}
                        <button onClick={() => setNavForm(p => ({...p, unterpunkte: [...(p.unterpunkte ?? []), { label: "", href: "" }]}))}
                          className="flex items-center gap-2 text-sm text-primary hover:underline">
                          <Plus className="h-3.5 w-3.5" /> Unterpunkt hinzufügen
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
                <TextareaField label="Banner Text" value={form.cookieBannerText ?? ""} onChange={(v: string) => { setForm((p: any) => ({...p, cookieBannerText: v})); setSaved(false) }} rows={2} hint="Leer lassen für Standard-Text" />
              </div>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center"><Sparkles className="h-4 w-4 text-primary" /></div>
                  <div><h3 className="text-white font-semibold text-sm">Chat Widget</h3><p className="text-zinc-500 text-xs">Tawk.to Live-Chat für Besucher</p></div>
                  <button onClick={() => { setForm((p: any) => ({...p, chatWidgetAktiv: !p.chatWidgetAktiv})); setSaved(false) }} className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${form.chatWidgetAktiv ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>{form.chatWidgetAktiv ? "Aktiv" : "Inaktiv"}</button>
                </div>
                <Field label="Tawk.to Property ID" value={form.tawkPropertyId ?? ""} onChange={(v: string) => { setForm((p: any) => ({...p, tawkPropertyId: v})); setSaved(false) }} placeholder="z.B. 6123abc..." hint="Aus Tawk.to Dashboard → Administration → Chat Widget kopieren" />
              </div>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl opacity-60">
                <h3 className="text-white font-semibold text-sm mb-4">Demnächst verfügbar</h3>
                <div className="space-y-3">
                  {[{label:"KI-Texte generieren",desc:"Leistungstexte mit KI verbessern"},{label:"Monatlicher Bericht",desc:"Automatischer Performance-Bericht"},{label:"Google Bewertungen",desc:"Bewertungen im Dashboard"},{label:"Termin-Buchung",desc:"Online-Kalender für Kunden"}].map((f,i) => (
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
                <p className="text-blue-400 text-sm font-medium truncate">{form.seoTitel || "SQ Schmidt Qualitätssicherung"}</p>
                <p className="text-green-600 text-xs">www.ihre-domain.de</p>
                <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{form.seoBeschreibung || "Beschreibung..."}</p>
              </div>
            </div>
          )}

          {activeSection === "analyse" && <AnalyseSection />}
        </div>
      </main>
    </div>
  )
}

function Field({ label, icon, value, onChange, placeholder, type = "text", hint }: { label: string; icon?: React.ReactNode; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; hint?: string }) {
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

function TextareaField({ label, value, onChange, placeholder, rows = 4, hint }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      {hint && <p className="text-xs text-zinc-500 mb-2">{hint}</p>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" />
    </div>
  )
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
    </div>
  )
}

type StringRow = { k: string; v: string }

function StringArrayField({ label, hint, items, onChange, placeholder }: {
  label: string; hint?: string; items: string[]; onChange: (items: string[]) => void; placeholder?: string
}) {
  const [rows, setRows] = useState<StringRow[]>(() => items.map(v => ({ k: uid(), v })))
  // Derived-state: wenn externes items nicht mehr mit internen values uebereinstimmt
  // (z.B. Form wurde mit anderer Leistung neu geoeffnet), resynchronisieren.
  const externalSig = items.join("\u0001")
  const internalSig = rows.map(r => r.v).join("\u0001")
  const [lastExternalSig, setLastExternalSig] = useState(externalSig)
  if (externalSig !== lastExternalSig) {
    setLastExternalSig(externalSig)
    if (externalSig !== internalSig) {
      setRows(items.map(v => ({ k: uid(), v })))
    }
  }
  const commit = (next: StringRow[]) => {
    setRows(next)
    onChange(next.map(r => r.v))
  }
  const update = (k: string, v: string) => commit(rows.map(r => r.k === k ? { ...r, v } : r))
  const remove = (k: string) => commit(rows.filter(r => r.k !== k))
  const add = () => commit([...rows, { k: uid(), v: "" }])
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      {hint && <p className="text-xs text-zinc-500 mb-2">{hint}</p>}
      <div className="space-y-2">
        {rows.map(r => (
          <div key={r.k} className="flex gap-2">
            <input type="text" value={r.v} onChange={e => update(r.k, e.target.value)} placeholder={placeholder}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm" />
            <button type="button" onClick={() => remove(r.k)} aria-label="Eintrag entfernen"
              className="p-2.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={add}
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
          <Plus className="h-4 w-4" /> Eintrag hinzufügen
        </button>
      </div>
    </div>
  )
}

function ProzessArrayField({ label, hint, items, onChange }: {
  label: string; hint?: string; items: ProzessSchritt[]; onChange: (items: ProzessSchritt[]) => void
}) {
  const update = (i: number, patch: Partial<ProzessSchritt>) =>
    onChange(items.map((it, idx) => idx === i ? { ...it, ...patch } : it))
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, { _key: uid(), titel: "", beschreibung: "" }])
  const move = (i: number, dir: -1 | 1) => {
    const target = i + dir
    if (target < 0 || target >= items.length) return
    const copy = [...items]
    const tmp = copy[i]
    copy[i] = copy[target]
    copy[target] = tmp
    onChange(copy)
  }
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      {hint && <p className="text-xs text-zinc-500 mb-2">{hint}</p>}
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={it._key ?? i} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary">Schritt {i + 1}</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Nach oben"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Nach unten"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => remove(i)} aria-label="Schritt entfernen"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <input type="text" value={it.titel} onChange={e => update(i, { titel: e.target.value })} placeholder="Titel (z.B. Planung)"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-primary transition-colors text-sm" />
            <textarea value={it.beschreibung} onChange={e => update(i, { beschreibung: e.target.value })} placeholder="Beschreibung (kurz)" rows={2}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-primary transition-colors text-sm resize-none" />
          </div>
        ))}
        <button type="button" onClick={add}
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
          <Plus className="h-4 w-4" /> Schritt hinzufügen
        </button>
      </div>
    </div>
  )
}

function filterItems<T extends { aktiv: boolean }>(
  items: T[],
  query: string,
  status: "all" | "aktiv" | "inaktiv",
  getText: (item: T) => string,
): T[] {
  let filtered = items
  if (query) {
    const q = query.toLowerCase()
    filtered = filtered.filter(item => getText(item).toLowerCase().includes(q))
  }
  if (status === "aktiv") filtered = filtered.filter(item => item.aktiv)
  if (status === "inaktiv") filtered = filtered.filter(item => !item.aktiv)
  return filtered
}

function ListToolbar({ count, label, searchQuery, onSearch, statusFilter, onStatusFilter, onAdd, addLabel }: {
  count: number; label: string; searchQuery: string; onSearch: (v: string) => void
  statusFilter: "all" | "aktiv" | "inaktiv"; onStatusFilter: (v: "all" | "aktiv" | "inaktiv") => void
  onAdd: () => void; addLabel: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            placeholder={`${label} durchsuchen...`}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
          {(["all", "aktiv", "inaktiv"] as const).map(s => (
            <button key={s} onClick={() => onStatusFilter(s)}
              className={`px-3 py-2.5 text-xs font-medium transition-all ${statusFilter === s ? "bg-primary text-primary-foreground" : "text-zinc-400 hover:text-white"}`}>
              {s === "all" ? "Alle" : s === "aktiv" ? "Aktiv" : "Inaktiv"}
            </button>
          ))}
        </div>
        <button onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 flex-shrink-0">
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      </div>
      <p className="text-zinc-500 text-xs">{count} {label} gesamt{searchQuery || statusFilter !== "all" ? " (gefiltert)" : ""}</p>
    </div>
  )
}

function ScoreRing({ score, label, size = 80 }: { score: number; label: string; size?: number }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 90 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444"
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#27272a" strokeWidth="6" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000" />
      </svg>
      <div className="absolute flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-lg font-bold text-white">{score}</span>
      </div>
      <p className="text-xs text-zinc-400 text-center">{label}</p>
    </div>
  )
}

function VitalCard({ label, value, score, icon: Icon }: { label: string; value: string; score: number; icon: any }) {
  const color = score >= 0.9 ? "text-emerald-400" : score >= 0.5 ? "text-amber-400" : "text-red-400"
  const bg = score >= 0.9 ? "bg-emerald-500/10" : score >= 0.5 ? "bg-amber-500/10" : "bg-red-500/10"
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className={`h-8 w-8 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <p className="text-sm text-zinc-400">{label}</p>
      </div>
      <p className={`text-xl font-bold ${color}`}>{value || "—"}</p>
    </div>
  )
}

function AnalyseSection() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile")

  async function runAnalyse() {
    setLoading(true)
    setData(null)
    try {
      const res = await fetch(`/api/admin/analyse?strategy=${strategy}`)
      const result = await res.json()
      setData(result)
    } catch { setData({ error: "Analyse fehlgeschlagen" }) }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Website Performance & SEO</h3>
          <p className="text-zinc-500 text-sm">Live-Analyse via Google PageSpeed Insights</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
            <button onClick={() => setStrategy("mobile")}
              className={`px-4 py-2 text-sm flex items-center gap-1.5 ${strategy === "mobile" ? "bg-primary text-primary-foreground" : "text-zinc-400 hover:text-white"}`}>
              <Smartphone className="h-3.5 w-3.5" /> Mobile
            </button>
            <button onClick={() => setStrategy("desktop")}
              className={`px-4 py-2 text-sm flex items-center gap-1.5 ${strategy === "desktop" ? "bg-primary text-primary-foreground" : "text-zinc-400 hover:text-white"}`}>
              <Monitor className="h-3.5 w-3.5" /> Desktop
            </button>
          </div>
          <button onClick={runAnalyse} disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 disabled:opacity-50">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analysiert...</> : <><Activity className="h-4 w-4" /> Analyse starten</>}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-zinc-400 text-sm">Google analysiert die Website... (ca. 15-30 Sekunden)</p>
        </div>
      )}

      {data && !data.error && (
        <>
          {/* Score Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { score: data.scores.performance, label: "Performance", icon: Zap },
              { score: data.scores.seo, label: "SEO", icon: TrendingUp },
              { score: data.scores.accessibility, label: "Barrierefreiheit", icon: Eye },
              { score: data.scores.bestPractices, label: "Best Practices", icon: CheckCircle },
            ].map(({ score, label, icon: Icon }) => {
              const color = score >= 90 ? "text-emerald-400 border-emerald-500/30" : score >= 50 ? "text-amber-400 border-amber-500/30" : "text-red-400 border-red-500/30"
              const bg = score >= 90 ? "bg-emerald-500/10" : score >= 50 ? "bg-amber-500/10" : "bg-red-500/10"
              return (
                <div key={label} className={`p-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center gap-3 ${color}`}>
                  <div className={`relative h-20 w-20 flex items-center justify-center`}>
                    <svg width={80} height={80} className="-rotate-90">
                      <circle cx={40} cy={40} r={34} fill="none" stroke="#27272a" strokeWidth="6" />
                      <circle cx={40} cy={40} r={34} fill="none" stroke="currentColor" strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - score / 100)}
                        strokeLinecap="round" className="transition-all duration-1000" />
                    </svg>
                    <span className="absolute text-2xl font-bold">{score}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Core Web Vitals */}
          <div>
            <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" /> Core Web Vitals
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <VitalCard label="First Paint" value={data.vitals.fcp?.value} score={data.vitals.fcp?.score ?? 0} icon={Zap} />
              <VitalCard label="Largest Paint" value={data.vitals.lcp?.value} score={data.vitals.lcp?.score ?? 0} icon={LayoutDashboard} />
              <VitalCard label="Layout Shift" value={data.vitals.cls?.value} score={data.vitals.cls?.score ?? 0} icon={AlertTriangle} />
              <VitalCard label="Blocking Time" value={data.vitals.tbt?.value} score={data.vitals.tbt?.score ?? 0} icon={Clock} />
              <VitalCard label="Speed Index" value={data.vitals.si?.value} score={data.vitals.si?.score ?? 0} icon={TrendingUp} />
            </div>
          </div>

          {/* Suggestions */}
          {data.suggestions?.length > 0 && (
            <div>
              <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" /> Verbesserungsvorschlaege ({data.suggestions.length})
              </h4>
              <div className="space-y-2">
                {data.suggestions.map((s: any, i: number) => {
                  const color = s.score >= 0.5 ? "border-amber-500/20 bg-amber-500/5" : "border-red-500/20 bg-red-500/5"
                  const dot = s.score >= 0.5 ? "bg-amber-400" : "bg-red-400"
                  return (
                    <div key={i} className={`p-4 border rounded-xl ${color}`}>
                      <div className="flex items-start gap-3">
                        <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
                        <div>
                          <p className="text-sm text-white font-medium">{s.title}</p>
                          <p className="text-xs text-zinc-500 mt-1">{s.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <p className="text-xs text-zinc-600 text-center">
            Analyse: {strategy === "mobile" ? "Mobile" : "Desktop"} — {new Date(data.timestamp).toLocaleString("de-DE")}
          </p>
        </>
      )}

      {data?.error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <p className="text-red-400">{data.error}</p>
        </div>
      )}

      {!data && !loading && (
        <div className="p-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
          <Activity className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Noch keine Analyse</h3>
          <p className="text-zinc-500 text-sm mb-6">Starten Sie eine Analyse um Performance, SEO und Barrierefreiheit Ihrer Website zu pruefen.</p>
          <button onClick={runAnalyse}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90">
            <Activity className="h-4 w-4" /> Jetzt analysieren
          </button>
        </div>
      )}
    </div>
  )
}
