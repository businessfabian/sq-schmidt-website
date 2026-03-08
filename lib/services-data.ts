import { Scale, ClipboardList, LineChart, FileSearch, Wrench, GraduationCap, HardHat, Wind, ShieldCheck, Bug, Building2, Briefcase } from "lucide-react"

export const servicesData = [
  {
    slug: "baubegleitende-qualitaetssicherung",
    icon: ShieldCheck,
    title: "Baubegleitende Qualitätssicherung",
    shortDescription: "Professionelle Qualitätssicherung während aller Bauphasen — von der Planung bis zur Abnahme.",
    fullDescription: "Unsere baubegleitende Qualitätssicherung stellt sicher, dass alle Bauleistungen den vereinbarten Standards entsprechen. Wir überwachen kontinuierlich die Ausführungsqualität und greifen frühzeitig ein, bevor Mängel entstehen.",
    image: "/images/services/baucontrolling.jpg",
    features: ["Kontinuierliche Baustellenüberwachung", "Qualitätsprüfung aller Gewerke", "Dokumentation und Berichterstattung", "Frühzeitige Mängelerkennung", "Abnahmebegleitung", "Gerichtsfeste Dokumentation"],
    process: [
      { step: "1", title: "Planung", description: "Festlegung der Qualitätsziele" },
      { step: "2", title: "Überwachung", description: "Kontinuierliche Kontrolle der Ausführung" },
      { step: "3", title: "Dokumentation", description: "Lückenlose Protokollierung" },
      { step: "4", title: "Abnahme", description: "Begleitung der Schlussabnahme" }
    ]
  },
  {
    slug: "projektleitung-bauleitung",
    icon: HardHat,
    title: "Projektleitung / Bauleitung",
    shortDescription: "Professionelle Projektleitung und Bauleitung für reibungslose Abläufe auf Ihrer Baustelle.",
    fullDescription: "Als erfahrene Bauleiter koordinieren wir alle am Bau beteiligten Gewerke und sorgen für einen reibungslosen Ablauf. Wir übernehmen die Verantwortung für Kosten, Termine und Qualität.",
    image: "/images/services/baucontrolling.jpg",
    features: ["Koordination aller Gewerke", "Termin- und Kostenkontrolle", "Behördenkommunikation", "Abnahme von Bauleistungen", "Nachtragsmanagement", "Bautagebuch"],
    process: [
      { step: "1", title: "Planung", description: "Projektstruktur und Ablaufplanung" },
      { step: "2", title: "Koordination", description: "Steuerung aller Beteiligten" },
      { step: "3", title: "Kontrolle", description: "Überwachung von Kosten und Terminen" },
      { step: "4", title: "Abschluss", description: "Abnahme und Übergabe" }
    ]
  },
  {
    slug: "maengelmanagement",
    icon: ClipboardList,
    title: "Mängelmanagement",
    shortDescription: "Systematische Erfassung, Dokumentation und Nachverfolgung von Baumängeln.",
    fullDescription: "Unser professionelles Mängelmanagement sorgt für eine lückenlose Erfassung und Nachverfolgung aller Baumängel. Mit modernen digitalen Tools dokumentieren wir jeden Mangel und überwachen die fristgerechte Beseitigung.",
    image: "/images/services/maengelmanagement.jpg",
    features: ["Digitale Mängelerfassung vor Ort", "Fotografische Dokumentation", "Fristenüberwachung", "Nachverfolgung der Mängelbeseitigung", "Regelmäßige Statusberichte", "Integration mit Bauprojektmanagement"],
    process: [
      { step: "1", title: "Begehung", description: "Systematische Objektbegehung und Erfassung" },
      { step: "2", title: "Dokumentation", description: "Detaillierte Mängelbeschreibung mit Fotos" },
      { step: "3", title: "Verfolgung", description: "Überwachung der Mängelbeseitigung" },
      { step: "4", title: "Abnahme", description: "Kontrolle und Freigabe nach Beseitigung" }
    ]
  },
  {
    slug: "baucontrolling",
    icon: LineChart,
    title: "Baucontrolling / Bauabnahmen",
    shortDescription: "Kontinuierliche Überwachung von Kosten, Terminen und Qualität Ihres Bauprojekts.",
    fullDescription: "Mit unserem Baucontrolling behalten Sie alle wichtigen Projektkennzahlen im Blick. Wir überwachen kontinuierlich Kosten, Termine und Qualität und warnen frühzeitig vor Abweichungen.",
    image: "/images/services/baucontrolling.jpg",
    features: ["Kostenüberwachung und -prognose", "Termincontrolling", "Qualitätssicherung", "Regelmäßige Projektberichte", "Risikomanagement", "Baustellenbesuche und Kontrollen"],
    process: [
      { step: "1", title: "Planung", description: "Festlegung der Kontrollparameter" },
      { step: "2", title: "Monitoring", description: "Kontinuierliche Überwachung aller Kennzahlen" },
      { step: "3", title: "Reporting", description: "Regelmäßige Statusberichte" },
      { step: "4", title: "Steuerung", description: "Empfehlungen bei Abweichungen" }
    ]
  },
  {
    slug: "beweissicherungsverfahren",
    icon: Briefcase,
    title: "Beweissicherungsverfahren",
    shortDescription: "Professionelle Betreuung von Beweissicherungsverfahren für rechtssichere Dokumentation.",
    fullDescription: "Wir begleiten selbstständige Beweisverfahren und erstellen gerichtsverwertbare Dokumentationen. Unsere Gutachten halten den aktuellen Zustand von Bauwerken rechtskonform fest.",
    image: "/images/services/schadensgutachten.jpg",
    features: ["Zustandsdokumentation", "Fotografische Beweissicherung", "Gerichtsfeste Gutachten", "Koordination mit Rechtsanwälten", "Fristgerechte Bearbeitung", "Neutrale Begutachtung"],
    process: [
      { step: "1", title: "Beauftragung", description: "Klärung des Verfahrensumfangs" },
      { step: "2", title: "Begehung", description: "Vor-Ort-Aufnahme und Dokumentation" },
      { step: "3", title: "Gutachten", description: "Erstellung des Beweissicherungsgutachtens" },
      { step: "4", title: "Übergabe", description: "Vorlage beim Gericht oder der Gegenseite" }
    ]
  },
  {
    slug: "schadensgutachten",
    icon: FileSearch,
    title: "Schadensgutachten",
    shortDescription: "Professionelle Gutachten zur Bewertung von Bauschäden und deren Ursachen.",
    fullDescription: "Unsere Sachverständigen erstellen fundierte Gutachten zu allen Arten von Bauschäden. Von Feuchtigkeitsschäden über Risse bis hin zu Schimmelbefall – wir analysieren Ursachen und empfehlen Sanierungsmaßnahmen.",
    image: "/images/services/schadensgutachten.jpg",
    features: ["Schadensaufnahme vor Ort", "Ursachenanalyse", "Feuchtigkeitsmessungen", "Thermografische Untersuchungen", "Gerichtsfeste Gutachten", "Sanierungsempfehlungen"],
    process: [
      { step: "1", title: "Besichtigung", description: "Vor-Ort-Termin und Schadensaufnahme" },
      { step: "2", title: "Untersuchung", description: "Technische Messungen und Analysen" },
      { step: "3", title: "Auswertung", description: "Ursachenermittlung und Bewertung" },
      { step: "4", title: "Gutachten", description: "Erstellung des schriftlichen Gutachtens" }
    ]
  },
  {
    slug: "sanierungskonzepte",
    icon: Wrench,
    title: "Sanierungskonzepte",
    shortDescription: "Maßgeschneiderte Sanierungskonzepte für die fachgerechte Schadensbeseitigung.",
    fullDescription: "Basierend auf unserer Schadensanalyse entwickeln wir individuelle Sanierungskonzepte. Wir berücksichtigen technische, wirtschaftliche und zeitliche Aspekte für eine optimale Lösung.",
    image: "/images/services/sanierungskonzepte.jpg",
    features: ["Individuelle Konzepterstellung", "Technische Lösungsvarianten", "Kostenermittlung", "Zeitplanung", "Ausschreibungsunterlagen", "Baubegleitung auf Wunsch"],
    process: [
      { step: "1", title: "Analyse", description: "Bewertung des Schadensbildes" },
      { step: "2", title: "Konzeption", description: "Entwicklung von Lösungsvarianten" },
      { step: "3", title: "Kalkulation", description: "Kosten- und Zeitplanung" },
      { step: "4", title: "Umsetzung", description: "Begleitung der Sanierung" }
    ]
  },
  {
    slug: "blower-door-test",
    icon: Wind,
    title: "Blower-Door-Tests",
    shortDescription: "Messung der Luftdichtheit von Gebäuden nach DIN EN 13829.",
    fullDescription: "Mit dem Blower-Door-Test messen wir die Luftdichtheit von Gebäuden und decken Schwachstellen in der Gebäudehülle auf. Der Test ist Voraussetzung für KfW-Förderungen und Energieeffizienznachweise.",
    image: "/images/services/baucontrolling.jpg",
    features: ["Messung nach DIN EN 13829", "Leckageortung", "Protokoll für KfW-Förderung", "Vor- und Nachmessung", "Beratung zur Verbesserung", "Zertifizierter Blower-Door-Test"],
    process: [
      { step: "1", title: "Vorbereitung", description: "Gebäudevorbereitung und Einbau der Messanlage" },
      { step: "2", title: "Messung", description: "Über- und Unterdruckmessung" },
      { step: "3", title: "Ortung", description: "Lokalisierung von Leckagen" },
      { step: "4", title: "Protokoll", description: "Erstellung des Messprotokolls" }
    ]
  },
  {
    slug: "sigeko",
    icon: HardHat,
    title: "SiGeKo",
    shortDescription: "Sicherheits- und Gesundheitskoordination auf Baustellen gemäß BaustellV.",
    fullDescription: "Als zertifizierter SiGeKo übernehmen wir die Koordination der Sicherheits- und Gesundheitsschutzmaßnahmen auf Ihrer Baustelle gemäß Baustellenverordnung (BaustellV).",
    image: "/images/services/baucontrolling.jpg",
    features: ["Erstellung des Sicherheits- und Gesundheitsschutzplans", "Koordination während der Planungsphase", "Baustellenbegehungen", "Unterweisung der Beteiligten", "Pflege der Unterlage für spätere Arbeiten", "Behördliche Vorankündigung"],
    process: [
      { step: "1", title: "Beauftragung", description: "Festlegung des Koordinationsumfangs" },
      { step: "2", title: "Planung", description: "Erstellung des SiGe-Plans" },
      { step: "3", title: "Koordination", description: "Begleitung der Bauausführung" },
      { step: "4", title: "Abschluss", description: "Übergabe der Unterlage" }
    ]
  },
  {
    slug: "schimmelpilz",
    icon: Bug,
    title: "Schimmelpilzbelastungen",
    shortDescription: "Erkennung, Bewertung und Sanierungsbegleitung bei Schimmelpilzbefall.",
    fullDescription: "Schimmelpilzbefall ist ein ernstes Problem, das gesundheitliche und bauliche Schäden verursacht. Wir erkennen, bewerten und begleiten die fachgerechte Sanierung von Schimmelpilzschäden.",
    image: "/images/services/schadensgutachten.jpg",
    features: ["Visuelle Inspektion", "Probenahme und Laboranalyse", "Ursachenermittlung", "Sanierungskonzept", "Begleitung der Sanierung", "Erfolgskontrolle nach Sanierung"],
    process: [
      { step: "1", title: "Inspektion", description: "Vor-Ort-Untersuchung und Probenahme" },
      { step: "2", title: "Analyse", description: "Laboruntersuchung und Ursachenfindung" },
      { step: "3", title: "Konzept", description: "Erstellung des Sanierungskonzepts" },
      { step: "4", title: "Kontrolle", description: "Erfolgskontrolle nach der Sanierung" }
    ]
  },
  {
    slug: "baumediation",
    icon: Scale,
    title: "Baumediation",
    shortDescription: "Professionelle Mediation bei Baustreitigkeiten für eine außergerichtliche Konfliktlösung.",
    fullDescription: "Als neutrale Vermittler unterstützen wir Sie bei der Lösung von Konflikten im Bauwesen. Durch professionelle Mediation erreichen wir eine einvernehmliche Lösung zwischen allen Parteien.",
    image: "/images/services/baumediation.jpg",
    features: ["Neutrale Vermittlung", "Außergerichtliche Streitbeilegung", "Dokumentation und Protokollierung", "Erarbeitung von Kompromisslösungen", "Zeitnahe Konfliktlösung", "Kostenersparnis gegenüber Gerichtsverfahren"],
    process: [
      { step: "1", title: "Erstgespräch", description: "Erfassung der Situation und aller Beteiligten" },
      { step: "2", title: "Analyse", description: "Untersuchung der Streitpunkte und Interessen" },
      { step: "3", title: "Mediation", description: "Moderierte Verhandlungen mit allen Parteien" },
      { step: "4", title: "Einigung", description: "Dokumentation der vereinbarten Lösung" }
    ]
  },
  {
    slug: "seminare",
    icon: GraduationCap,
    title: "Seminare / Beratung / Coaching",
    shortDescription: "Fortbildungen, Schulungen und Coaching rund um Bauqualität und Schadensprävention.",
    fullDescription: "Wir bieten praxisnahe Seminare und Fortbildungen für Bauherren, Handwerker und Planer. Profitieren Sie von unserer langjährigen Erfahrung und erweitern Sie Ihr Fachwissen.",
    image: "/images/services/seminare.jpg",
    features: ["Praxisorientierte Schulungen", "Erfahrene Referenten", "Aktuelle Themen aus dem Bauwesen", "Inhouse-Schulungen möglich", "Teilnahmezertifikate", "Individuelle Themengestaltung"],
    process: [
      { step: "1", title: "Bedarfsanalyse", description: "Ermittlung der Schulungsthemen" },
      { step: "2", title: "Konzeption", description: "Erstellung des Seminarplans" },
      { step: "3", title: "Durchführung", description: "Praxisnahe Wissensvermittlung" },
      { step: "4", title: "Zertifikat", description: "Teilnahmebestätigung" }
    ]
  },
]

export const partnersData = [
  { name: "GABI Planungsbüro", description: "Gabi Bisceglia GABI Planungsbüro" },
  { name: "SAUR", description: "Automation Elektrotechnik" },
  { name: "Axel Spreter", description: "Bausachverständigerbüro" },
  { name: "Jürgen Erne", description: "Unabhängiger Energieberater, Blower-Door-Tests" },
  { name: "Michael Weinmann", description: "Sachverständiger für Fliesen und Platten" },
  { name: "Planungs-Gruppe Technik", description: "Qualitätsmanagement im Bauwesen" },
  { name: "Dipl.-Ing. Isolde Elkan", description: "Bauingenieurwesen" },
  { name: "Reitul VBS Isolierbautechnik", description: "Raster-Feuchtigkeitsmessungen" },
  { name: "Klaus Steppacher", description: "Ingenieurbüro für Brandschutz" },
  { name: "Labor Urbanus", description: "Innenraumdiagnostik Schimmelschäden" },
  { name: "IQ-ZERT", description: "Institut für Qualitätssicherung & Zertifizierung" },
  { name: "Verlag Dashöfer", description: "Medienpark Kampnagel" },
  { name: "schimmeldoktor hör", description: "Schimmelsanierung" },
  { name: "Bildungsakademie Rottweil", description: "Fortbildung im Bauwesen" },
  { name: "Architektenbüro Falch", description: "Architekturplanung" },
  { name: "Bauphysik-Mannheim", description: "Ingenieurbüro für Bauphysik" },
  { name: "gripsware", description: "Mängelmanagement & Bautagebuch" },
  { name: "BiolytiQs", description: "Labor für biologische Analysen" },
  { name: "Handelskammer Konstanz", description: "Industrie- und Handelskammer" },
  { name: "TÜV Rheinland", description: "Technische Prüfung und Zertifizierung" },
]

export const certificatesData = [
  { name: "TÜV Rheinland", description: "Zertifizierter Sachverständiger", image: "/images/certificates/tuev.jpg" },
  { name: "IHK Konstanz", description: "Öffentlich bestellter und vereidigter Sachverständiger", image: "/images/certificates/ihk.jpg" },
  { name: "IQ-ZERT", description: "Institut für Qualitätssicherung & Zertifizierung", image: "/images/certificates/iq-zert.jpg" },
  { name: "BVS", description: "Bundesverband öffentlich bestellter Sachverständiger", image: "/images/certificates/bvs.jpg" },
]

export function getServiceBySlug(slug: string) {
  return servicesData.find((s) => s.slug === slug)
}

export function getAllServiceSlugs() {
  return servicesData.map((s) => s.slug)
}