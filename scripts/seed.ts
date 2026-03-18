import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

// ── Leistungen ────────────────────────────────────────────────────────────
const leistungen = [
  { titel: "Baubegleitende Qualitaetssicherung", icon: "ShieldCheck", reihenfolge: 1, kurzBeschreibung: "Professionelle Qualitaetssicherung waehrend aller Bauphasen — von der Planung bis zur Abnahme.", beschreibung: "Unsere baubegleitende Qualitaetssicherung stellt sicher, dass alle Bauleistungen den vereinbarten Standards entsprechen. Wir ueberwachen kontinuierlich die Ausfuehrungsqualitaet und greifen fruehzeitig ein, bevor Maengel entstehen." },
  { titel: "Projektleitung / Bauleitung", icon: "HardHat", reihenfolge: 2, kurzBeschreibung: "Professionelle Projektleitung und Bauleitung fuer reibungslose Ablaeufe auf Ihrer Baustelle.", beschreibung: "Als erfahrene Bauleiter koordinieren wir alle am Bau beteiligten Gewerke und sorgen fuer einen reibungslosen Ablauf. Wir uebernehmen die Verantwortung fuer Kosten, Termine und Qualitaet." },
  { titel: "Maengelmanagement", icon: "ClipboardList", reihenfolge: 3, kurzBeschreibung: "Systematische Erfassung, Dokumentation und Nachverfolgung von Baumaengeln.", beschreibung: "Unser professionelles Maengelmanagement sorgt fuer eine lueckenlose Erfassung und Nachverfolgung aller Baumaengel. Mit modernen digitalen Tools dokumentieren wir jeden Mangel und ueberwachen die fristgerechte Beseitigung." },
  { titel: "Baucontrolling / Bauabnahmen", icon: "LineChart", reihenfolge: 4, kurzBeschreibung: "Kontinuierliche Ueberwachung von Kosten, Terminen und Qualitaet Ihres Bauprojekts.", beschreibung: "Mit unserem Baucontrolling behalten Sie alle wichtigen Projektkennzahlen im Blick. Wir ueberwachen kontinuierlich Kosten, Termine und Qualitaet und warnen fruehzeitig vor Abweichungen." },
  { titel: "Beweissicherungsverfahren", icon: "Briefcase", reihenfolge: 5, kurzBeschreibung: "Professionelle Betreuung von Beweissicherungsverfahren fuer rechtssichere Dokumentation.", beschreibung: "Wir begleiten selbststaendige Beweisverfahren und erstellen gerichtsverwertbare Dokumentationen. Unsere Gutachten halten den aktuellen Zustand von Bauwerken rechtskonform fest." },
  { titel: "Schadensgutachten", icon: "FileSearch", reihenfolge: 6, kurzBeschreibung: "Professionelle Gutachten zur Bewertung von Bauschaeden und deren Ursachen.", beschreibung: "Unsere Sachverstaendigen erstellen fundierte Gutachten zu allen Arten von Bauschaden. Von Feuchtigkeitsschaeden ueber Risse bis hin zu Schimmelbefall — wir analysieren Ursachen und empfehlen Sanierungsmassnahmen." },
  { titel: "Sanierungskonzepte", icon: "Wrench", reihenfolge: 7, kurzBeschreibung: "Massgeschneiderte Sanierungskonzepte fuer die fachgerechte Schadensbeseitigung.", beschreibung: "Basierend auf unserer Schadensanalyse entwickeln wir individuelle Sanierungskonzepte. Wir beruecksichtigen technische, wirtschaftliche und zeitliche Aspekte fuer eine optimale Loesung." },
  { titel: "Blower-Door-Tests", icon: "Wind", reihenfolge: 8, kurzBeschreibung: "Messung der Luftdichtheit von Gebaeuden nach DIN EN 13829.", beschreibung: "Mit dem Blower-Door-Test messen wir die Luftdichtheit von Gebaeuden und decken Schwachstellen in der Gebaeudehulle auf. Der Test ist Voraussetzung fuer KfW-Foerderungen und Energieeffizienznachweise." },
  { titel: "SiGeKo", icon: "HardHat", reihenfolge: 9, kurzBeschreibung: "Sicherheits- und Gesundheitskoordination auf Baustellen gemaess BaustellV.", beschreibung: "Als zertifizierter SiGeKo uebernehmen wir die Koordination der Sicherheits- und Gesundheitsschutzmassnahmen auf Ihrer Baustelle gemaess Baustellenverordnung (BaustellV)." },
  { titel: "Schimmelpilzbelastungen", icon: "Bug", reihenfolge: 10, kurzBeschreibung: "Erkennung, Bewertung und Sanierungsbegleitung bei Schimmelpilzbefall.", beschreibung: "Schimmelpilzbefall ist ein ernstes Problem, das gesundheitliche und bauliche Schaeden verursacht. Wir erkennen, bewerten und begleiten die fachgerechte Sanierung von Schimmelpilzschaeden." },
  { titel: "Baumediation", icon: "Scale", reihenfolge: 11, kurzBeschreibung: "Professionelle Mediation bei Baustreitigkeiten fuer eine aussergerichtliche Konfliktloesung.", beschreibung: "Als neutrale Vermittler unterstuetzen wir Sie bei der Loesung von Konflikten im Bauwesen. Durch professionelle Mediation erreichen wir eine einvernehmliche Loesung zwischen allen Parteien." },
  { titel: "Seminare / Beratung / Coaching", icon: "GraduationCap", reihenfolge: 12, kurzBeschreibung: "Fortbildungen, Schulungen und Coaching rund um Bauqualitaet und Schadenspraevention.", beschreibung: "Wir bieten praxisnahe Seminare und Fortbildungen fuer Bauherren, Handwerker und Planer. Profitieren Sie von unserer langjahrigen Erfahrung und erweitern Sie Ihr Fachwissen." },
]

// ── Partner ───────────────────────────────────────────────────────────────
const partner = [
  { name: "GABI Planungsbuero", beschreibung: "Gabi Bisceglia GABI Planungsbuero", reihenfolge: 1 },
  { name: "SAUR", beschreibung: "Automation Elektrotechnik", reihenfolge: 2 },
  { name: "Axel Spreter", beschreibung: "Bausachverstaendigenburo", reihenfolge: 3 },
  { name: "Juergen Erne", beschreibung: "Unabhaengiger Energieberater, Blower-Door-Tests", reihenfolge: 4 },
  { name: "Michael Weinmann", beschreibung: "Sachverstaendiger fuer Fliesen und Platten", reihenfolge: 5 },
  { name: "Planungs-Gruppe Technik", beschreibung: "Qualitaetsmanagement im Bauwesen", reihenfolge: 6 },
  { name: "Dipl.-Ing. Isolde Elkan", beschreibung: "Bauingenieurwesen", reihenfolge: 7 },
  { name: "Reitul VBS Isolierbautechnik", beschreibung: "Raster-Feuchtigkeitsmessungen", reihenfolge: 8 },
  { name: "Klaus Steppacher", beschreibung: "Ingenieurbuero fuer Brandschutz", reihenfolge: 9 },
  { name: "Labor Urbanus", beschreibung: "Innenraumdiagnostik Schimmelschaeden", reihenfolge: 10 },
  { name: "IQ-ZERT", beschreibung: "Institut fuer Qualitaetssicherung & Zertifizierung", reihenfolge: 11 },
  { name: "Verlag Dashoefer", beschreibung: "Seminare und Fachliteratur", reihenfolge: 12 },
  { name: "schimmeldoktor hoer", beschreibung: "Schimmelsanierung", reihenfolge: 13 },
  { name: "Bildungsakademie Rottweil", beschreibung: "Fortbildung im Bauwesen", reihenfolge: 14 },
  { name: "Architektenbuero Falch", beschreibung: "Architekturplanung", reihenfolge: 15 },
  { name: "Bauphysik-Mannheim", beschreibung: "Ingenieurbuero fuer Bauphysik", reihenfolge: 16 },
  { name: "gripsware", beschreibung: "Maengelmanagement & Bautagebuch", reihenfolge: 17 },
  { name: "BiolytiQs", beschreibung: "Labor fuer biologische Analysen", reihenfolge: 18 },
  { name: "Handelskammer Konstanz", beschreibung: "Industrie- und Handelskammer", reihenfolge: 19 },
  { name: "DEKRA", beschreibung: "Technische Pruefung und Zertifizierung", reihenfolge: 20 },
]

// ── Zertifikate ───────────────────────────────────────────────────────────
const zertifikate = [
  { name: "Beratender Ingenieur", beschreibung: "Ingenieurkammer Baden-Wuerttemberg Nr. 2333 — seit 22. Juli 2020", reihenfolge: 1 },
  { name: "IQ-ZERT Sachverstaendiger", beschreibung: "Bau-Sachverstaendiger fuer Schaeden an Gebaeuden nach DIN EN ISO/IEC 17024 — Zertifikat Nr. S 465", reihenfolge: 2 },
  { name: "TUeV Rheinland", beschreibung: "Sachverstaendiger fuer Erkennung, Bewertung und Sanierung von Schimmelpilzbelastungen (TUeV PersCert) — Nr. 62172", reihenfolge: 3 },
  { name: "SiGeKo", beschreibung: "Sicherheits- und Gesundheitsschutzkoordinator nach Baustellenverordnung — Ingenieurakademie BW, April 2001", reihenfolge: 4 },
  { name: "Sachverstaendigen Akademie Aachen", beschreibung: "Zertifizierung gemaess DIN EN ISO/IEC 17024 im Bereich Schaeden an Gebaeuden — Dezember 2009", reihenfolge: 5 },
  { name: "Vorsitzender Meisterpruefungsausschuss", beschreibung: "Handwerkskammer Konstanz — Maurer- und Betonbauer-Handwerk, berufen durch Regierungspraesidium Freiburg 2025-2029", reihenfolge: 6 },
  { name: "Dipl.-Ing. (FH) Baubetrieb", beschreibung: "Fachhochschule Karlsruhe — Bauingenieurwesen, Studiengang Baubetrieb, Januar 1992", reihenfolge: 7 },
  { name: "Maurer Gesellenpruefung", beschreibung: "Handwerkskammer Konstanz — Baugewerks-Innung Schwarzwald-Baar, Gesamtnote gut, September 1984", reihenfolge: 8 },
]

// ── Einstellungen ─────────────────────────────────────────────────────────
const einstellungen = {
  _type: "einstellungen",
  firmenname: "SQ Schmidt Qualitaetssicherung",
  tagline: "Wohnen und Leben Sie schon, oder bemaengeln Sie noch?",
  telefon: "07726 / 929394",
  email: "sqs@sq-sv.de",
  adresse: "Marktplatz 21, 78647 Trossingen",
  oeffnungszeiten: "Mo-Fr 8:00-18:00 Uhr",
  heroTitel: "Praezision und Qualitaet fuer Ihr Bauprojekt",
  heroBeschreibung: "Oeffentlich bestellter und vereidigter Sachverstaendiger der IHK Konstanz — gerichtsfeste Gutachten und professionelle Baubegleitung.",
  uebermichTitel: "Seit 2001 Ihr Experte fuer Bauqualitaet",
  uebermichText: "Seit 2001 beschaeftigt sich das Ingenieurbuero Schmidt Qualitaetssicherung mit der Beseitigung von Bauschaden und Baumaengeln. Unser Ziel ist es, Rechtsstreitigkeiten durch praeventive Massnahmen zu vermeiden.",
  jahreErfahrung: 25,
  anzahlProjekte: 500,
  seoTitel: "SQ Schmidt Qualitaetssicherung | Sachverstaendiger Bauwesen Trossingen",
  seoBeschreibung: "Oeffentlich bestellter und vereidigter Sachverstaendiger fuer Schaeden an Gebaeuden. Gerichtsfeste Gutachten, Baubegleitung und Qualitaetssicherung — bundesweit taetig.",
  inhaberName: "Dipl.-Ing. Gerhard Schmidt",
  strasseHausnummer: "Marktplatz 21",
  plzOrt: "78647 Trossingen",
  kleinunternehmer: true,
  berufsbezeichnung: "Oeffentlich bestellter und vereidigter Sachverstaendiger",
  bestellendeKammer: "IHK Konstanz",
}

async function seed() {
  console.log("Starte Sanity Seed...")

  // Einstellungen
  const existingEinstellungen = await client.fetch(`*[_type == "einstellungen"][0]._id`)
  if (existingEinstellungen) {
    await client.patch(existingEinstellungen).set(einstellungen).commit()
    console.log("Einstellungen aktualisiert")
  } else {
    await client.create(einstellungen)
    console.log("Einstellungen erstellt")
  }

  // Bestehende loeschen und neu anlegen
  const existingLeistungen = await client.fetch(`*[_type == "leistung"]._id`)
  for (const id of existingLeistungen) await client.delete(id)

  for (const l of leistungen) {
    await client.create({
      _type: "leistung",
      ...l,
      slug: { _type: "slug", current: l.titel.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-") },
      aktiv: true,
    })
  }
  console.log(`${leistungen.length} Leistungen erstellt`)

  const existingPartner = await client.fetch(`*[_type == "partner"]._id`)
  for (const id of existingPartner) await client.delete(id)

  for (const p of partner) {
    await client.create({ _type: "partner", ...p, aktiv: true })
  }
  console.log(`${partner.length} Partner erstellt`)

  const existingZertifikate = await client.fetch(`*[_type == "zertifikat"]._id`)
  for (const id of existingZertifikate) await client.delete(id)

  for (const z of zertifikate) {
    await client.create({ _type: "zertifikat", ...z, aktiv: true })
  }
  console.log(`${zertifikate.length} Zertifikate erstellt`)

  console.log("Seed abgeschlossen!")
}

seed().catch(console.error)