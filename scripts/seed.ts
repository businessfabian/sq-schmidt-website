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
  { titel: "Baubegleitende Qualitätssicherung", icon: "ShieldCheck", reihenfolge: 1, kurzBeschreibung: "Professionelle Qualitätssicherung während aller Bauphasen — von der Planung bis zur Abnahme.", beschreibung: "Unsere baubegleitende Qualitätssicherung stellt sicher, dass alle Bauleistungen den vereinbarten Standards entsprechen. Wir überwachen kontinuierlich die Ausführungsqualität und greifen frühzeitig ein, bevor Mängel entstehen." },
  { titel: "Projektleitung / Bauleitung", icon: "HardHat", reihenfolge: 2, kurzBeschreibung: "Professionelle Projektleitung und Bauleitung für reibungslose Abläufe auf Ihrer Baustelle.", beschreibung: "Als erfahrene Bauleiter koordinieren wir alle am Bau beteiligten Gewerke und sorgen für einen reibungslosen Ablauf. Wir übernehmen die Verantwortung für Kosten, Termine und Qualität." },
  { titel: "Mängelmanagement", icon: "ClipboardList", reihenfolge: 3, kurzBeschreibung: "Systematische Erfassung, Dokumentation und Nachverfolgung von Baumängeln.", beschreibung: "Unser professionelles Mängelmanagement sorgt für eine lückenlose Erfassung und Nachverfolgung aller Baumängel. Mit modernen digitalen Tools dokumentieren wir jeden Mangel und überwachen die fristgerechte Beseitigung." },
  { titel: "Baucontrolling / Bauabnahmen", icon: "LineChart", reihenfolge: 4, kurzBeschreibung: "Kontinuierliche Überwachung von Kosten, Terminen und Qualität Ihres Bauprojekts.", beschreibung: "Mit unserem Baucontrolling behalten Sie alle wichtigen Projektkennzahlen im Blick. Wir überwachen kontinuierlich Kosten, Termine und Qualität und warnen frühzeitig vor Abweichungen." },
  { titel: "Beweissicherungsverfahren", icon: "Briefcase", reihenfolge: 5, kurzBeschreibung: "Professionelle Betreuung von Beweissicherungsverfahren für rechtssichere Dokumentation.", beschreibung: "Wir begleiten selbstständige Beweisverfahren und erstellen gerichtsverwertbare Dokumentationen. Unsere Gutachten halten den aktuellen Zustand von Bauwerken rechtskonform fest." },
  { titel: "Schadensgutachten", icon: "FileSearch", reihenfolge: 6, kurzBeschreibung: "Professionelle Gutachten zur Bewertung von Bauschäden und deren Ursachen.", beschreibung: "Unsere Sachverständigen erstellen fundierte Gutachten zu allen Arten von Bauschaden. Von Feuchtigkeitsschäden über Risse bis hin zu Schimmelbefall — wir analysieren Ursachen und empfehlen Sanierungsmaßnahmen." },
  { titel: "Sanierungskonzepte", icon: "Wrench", reihenfolge: 7, kurzBeschreibung: "Maßgeschneiderte Sanierungskonzepte für die fachgerechte Schadensbeseitigung.", beschreibung: "Basierend auf unserer Schadensanalyse entwickeln wir individuelle Sanierungskonzepte. Wir berücksichtigen technische, wirtschaftliche und zeitliche Aspekte für eine optimale Lösung." },
  { titel: "Blower-Door-Tests", icon: "Wind", reihenfolge: 8, kurzBeschreibung: "Messung der Luftdichtheit von Gebäuden nach DIN EN 13829.", beschreibung: "Mit dem Blower-Door-Test messen wir die Luftdichtheit von Gebäuden und decken Schwachstellen in der Gebäudehülle auf. Der Test ist Voraussetzung für KfW-Förderungen und Energieeffizienznachweise." },
  { titel: "SiGeKo", icon: "HardHat", reihenfolge: 9, kurzBeschreibung: "Sicherheits- und Gesundheitskoordination auf Baustellen gemäß BaustellV.", beschreibung: "Als zertifizierter SiGeKo übernehmen wir die Koordination der Sicherheits- und Gesundheitsschutzmaßnahmen auf Ihrer Baustelle gemäß Baustellenverordnung (BaustellV)." },
  { titel: "Schimmelpilzbelastungen", icon: "Bug", reihenfolge: 10, kurzBeschreibung: "Erkennung, Bewertung und Sanierungsbegleitung bei Schimmelpilzbefall.", beschreibung: "Schimmelpilzbefall ist ein ernstes Problem, das gesundheitliche und bauliche Schäden verursacht. Wir erkennen, bewerten und begleiten die fachgerechte Sanierung von Schimmelpilzschäden." },
  { titel: "Baumediation", icon: "Scale", reihenfolge: 11, kurzBeschreibung: "Professionelle Mediation bei Baustreitigkeiten für eine außergerichtliche Konfliktlösung.", beschreibung: "Als neutrale Vermittler unterstützen wir Sie bei der Lösung von Konflikten im Bauwesen. Durch professionelle Mediation erreichen wir eine einvernehmliche Lösung zwischen allen Parteien." },
  { titel: "Seminare / Beratung / Coaching", icon: "GraduationCap", reihenfolge: 12, kurzBeschreibung: "Fortbildungen, Schulungen und Coaching rund um Bauqualität und Schadensprävention.", beschreibung: "Wir bieten praxisnahe Seminare und Fortbildungen für Bauherren, Handwerker und Planer. Profitieren Sie von unserer langjährigen Erfahrung und erweitern Sie Ihr Fachwissen." },
]

// ── Partner ───────────────────────────────────────────────────────────────
const partner = [
  { name: "GABI Planungsbüro", beschreibung: "Gabi Bisceglia GABI Planungsbüro", reihenfolge: 1 },
  { name: "SAUR", beschreibung: "Automation Elektrotechnik", reihenfolge: 2 },
  { name: "Axel Spreter", beschreibung: "Bausachverständigenbüro", reihenfolge: 3 },
  { name: "Jürgen Erne", beschreibung: "Unabhängiger Energieberater, Blower-Door-Tests", reihenfolge: 4 },
  { name: "Michael Weinmann", beschreibung: "Sachverständiger für Fliesen und Platten", reihenfolge: 5 },
  { name: "Planungs-Gruppe Technik", beschreibung: "Qualitätsmanagement im Bauwesen", reihenfolge: 6 },
  { name: "Dipl.-Ing. Isolde Elkan", beschreibung: "Bauingenieurwesen", reihenfolge: 7 },
  { name: "Reitul VBS Isolierbautechnik", beschreibung: "Raster-Feuchtigkeitsmessungen", reihenfolge: 8 },
  { name: "Klaus Steppacher", beschreibung: "Ingenieurbüro für Brandschutz", reihenfolge: 9 },
  { name: "Labor Urbanus", beschreibung: "Innenraumdiagnostik Schimmelschäden", reihenfolge: 10 },
  { name: "IQ-ZERT", beschreibung: "Institut für Qualitätssicherung & Zertifizierung", reihenfolge: 11 },
  { name: "Verlag Dashöfer", beschreibung: "Seminare und Fachliteratur", reihenfolge: 12 },
  { name: "schimmeldoktor höer", beschreibung: "Schimmelsanierung", reihenfolge: 13 },
  { name: "Bildungsakademie Rottweil", beschreibung: "Fortbildung im Bauwesen", reihenfolge: 14 },
  { name: "Architektenbüro Falch", beschreibung: "Architekturplanung", reihenfolge: 15 },
  { name: "Bauphysik-Mannheim", beschreibung: "Ingenieurbüro für Bauphysik", reihenfolge: 16 },
  { name: "gripsware", beschreibung: "Mängelmanagement & Bautagebuch", reihenfolge: 17 },
  { name: "BiolytiQs", beschreibung: "Labor für biologische Analysen", reihenfolge: 18 },
  { name: "Handelskammer Konstanz", beschreibung: "Industrie- und Handelskammer", reihenfolge: 19 },
  { name: "DEKRA", beschreibung: "Technische Prüfung und Zertifizierung", reihenfolge: 20 },
]

// ── Zertifikate ───────────────────────────────────────────────────────────
const zertifikate = [
  { name: "Beratender Ingenieur", beschreibung: "Ingenieurkammer Baden-Württemberg Nr. 2333 — seit 22. Juli 2020", reihenfolge: 1 },
  { name: "IQ-ZERT Sachverständiger", beschreibung: "Bau-Sachverständiger für Schäden an Gebäuden nach DIN EN ISO/IEC 17024 — Zertifikat Nr. S 465", reihenfolge: 2 },
  { name: "TÜV Rheinland", beschreibung: "Sachverständiger für Erkennung, Bewertung und Sanierung von Schimmelpilzbelastungen (TÜV PersCert) — Nr. 62172", reihenfolge: 3 },
  { name: "SiGeKo", beschreibung: "Sicherheits- und Gesundheitsschutzkoordinator nach Baustellenverordnung — Ingenieurakademie BW, April 2001", reihenfolge: 4 },
  { name: "Sachverständigen Akademie Aachen", beschreibung: "Zertifizierung gemäß DIN EN ISO/IEC 17024 im Bereich Schäden an Gebäuden — Dezember 2009", reihenfolge: 5 },
  { name: "Vorsitzender Meisterprüfungsausschuss", beschreibung: "Handwerkskammer Konstanz — Maurer- und Betonbauer-Handwerk, berufen durch Regierungspräsidium Freiburg 2025-2029", reihenfolge: 6 },
  { name: "Dipl.-Ing. (FH) Baubetrieb", beschreibung: "Fachhochschule Karlsruhe — Bauingenieurwesen, Studiengang Baubetrieb, Januar 1992", reihenfolge: 7 },
  { name: "Maurer Gesellenprüfung", beschreibung: "Handwerkskammer Konstanz — Baugewerks-Innung Schwarzwald-Baar, Gesamtnote gut, September 1984", reihenfolge: 8 },
]

// ── Einstellungen ─────────────────────────────────────────────────────────
const einstellungen = {
  _type: "einstellungen",
  firmenname: "SQ Schmidt Qualitätssicherung",
  tagline: "Wohnen und Leben Sie schon, oder bemängeln Sie noch?",
  telefon: "07726 / 929394",
  email: "sqs@sq-sv.de",
  adresse: "Marktplatz 21, 78647 Trossingen",
  oeffnungszeiten: "Mo-Fr 8:00-18:00 Uhr",
  heroTitel: "Präzision und Qualität für Ihr Bauprojekt",
  heroBeschreibung: "Öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz — gerichtsfeste Gutachten und professionelle Baubegleitung.",
  uebermichTitel: "Seit 2001 Ihr Experte für Bauqualität",
  uebermichText: "Seit 2001 beschäftigt sich das Ingenieurbüro Schmidt Qualitätssicherung mit der Beseitigung von Bauschaden und Baumängeln. Unser Ziel ist es, Rechtsstreitigkeiten durch präventive Maßnahmen zu vermeiden.",
  jahreErfahrung: 25,
  anzahlProjekte: 500,
  seoTitel: "SQ Schmidt Qualitätssicherung | Sachverständiger Bauwesen Trossingen",
  seoBeschreibung: "Öffentlich bestellter und vereidigter Sachverständiger für Schäden an Gebäuden. Gerichtsfeste Gutachten, Baubegleitung und Qualitätssicherung — bundesweit tätig.",
  inhaberName: "Dipl.-Ing. Gerhard Schmidt",
  strasseHausnummer: "Marktplatz 21",
  plzOrt: "78647 Trossingen",
  kleinunternehmer: true,
  berufsbezeichnung: "Öffentlich bestellter und vereidigter Sachverständiger",
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

  // Bestehende löschen und neu anlegen
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