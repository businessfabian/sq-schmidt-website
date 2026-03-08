import { Scale, ClipboardList, LineChart, FileSearch, Wrench, GraduationCap } from "lucide-react"

export const servicesData = [
  {
    slug: "baumediation",
    icon: Scale,
    title: "Baumediation",
    shortDescription: "Professionelle Mediation bei Baustreitigkeiten für eine außergerichtliche Konfliktlösung.",
    fullDescription: "Als neutrale Vermittler unterstützen wir Sie bei der Lösung von Konflikten im Bauwesen. Durch professionelle Mediation erreichen wir eine einvernehmliche Lösung zwischen allen Parteien – schneller und kostengünstiger als langwierige Gerichtsverfahren.",
    image: "/images/services/baumediation.jpg",
    features: [
      "Neutrale Vermittlung zwischen Bauherren und Unternehmen",
      "Außergerichtliche Streitbeilegung",
      "Dokumentation und Protokollierung",
      "Erarbeitung von Kompromisslösungen",
      "Zeitnahe Konfliktlösung",
      "Kostenersparnis gegenüber Gerichtsverfahren"
    ],
    process: [
      { step: "1", title: "Erstgespräch", description: "Erfassung der Situation und aller Beteiligten" },
      { step: "2", title: "Analyse", description: "Untersuchung der Streitpunkte und Interessen" },
      { step: "3", title: "Mediation", description: "Moderierte Verhandlungen mit allen Parteien" },
      { step: "4", title: "Einigung", description: "Dokumentation der vereinbarten Lösung" }
    ]
  },
  {
    slug: "maengelmanagement",
    icon: ClipboardList,
    title: "Mängelmanagement",
    shortDescription: "Systematische Erfassung, Dokumentation und Nachverfolgung von Baumängeln.",
    fullDescription: "Unser professionelles Mängelmanagement sorgt für eine lückenlose Erfassung und Nachverfolgung aller Baumängel. Mit modernen digitalen Tools dokumentieren wir jeden Mangel und überwachen die fristgerechte Beseitigung.",
    image: "/images/services/maengelmanagement.jpg",
    features: [
      "Digitale Mängelerfassung vor Ort",
      "Fotografische Dokumentation",
      "Fristenüberwachung",
      "Nachverfolgung der Mängelbeseitigung",
      "Regelmäßige Statusberichte",
      "Integration mit Bauprojektmanagement"
    ],
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
    title: "Baucontrolling",
    shortDescription: "Kontinuierliche Überwachung von Kosten, Terminen und Qualität Ihres Bauprojekts.",
    fullDescription: "Mit unserem Baucontrolling behalten Sie alle wichtigen Projektkennzahlen im Blick. Wir überwachen kontinuierlich Kosten, Termine und Qualität und warnen frühzeitig vor Abweichungen.",
    image: "/images/services/baucontrolling.jpg",
    features: [
      "Kostenüberwachung und -prognose",
      "Termincontrolling",
      "Qualitätssicherung",
      "Regelmäßige Projektberichte",
      "Risikomanagement",
      "Baustellenbesuche und Kontrollen"
    ],
    process: [
      { step: "1", title: "Planung", description: "Festlegung der Kontrollparameter" },
      { step: "2", title: "Monitoring", description: "Kontinuierliche Überwachung aller Kennzahlen" },
      { step: "3", title: "Reporting", description: "Regelmäßige Statusberichte" },
      { step: "4", title: "Steuerung", description: "Empfehlungen bei Abweichungen" }
    ]
  },
  {
    slug: "schadensgutachten",
    icon: FileSearch,
    title: "Schadensgutachten",
    shortDescription: "Professionelle Gutachten zur Bewertung von Bauschäden und deren Ursachen.",
    fullDescription: "Unsere Sachverständigen erstellen fundierte Gutachten zu allen Arten von Bauschäden. Von Feuchtigkeitsschäden über Risse bis hin zu Schimmelbefall – wir analysieren Ursachen und empfehlen Sanierungsmaßnahmen.",
    image: "/images/services/schadensgutachten.jpg",
    features: [
      "Schadensaufnahme vor Ort",
      "Ursachenanalyse",
      "Feuchtigkeitsmessungen",
      "Thermografische Untersuchungen",
      "Gerichtsfeste Gutachten",
      "Sanierungsempfehlungen"
    ],
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
    features: [
      "Individuelle Konzepterstellung",
      "Technische Lösungsvarianten",
      "Kostenermittlung",
      "Zeitplanung",
      "Ausschreibungsunterlagen",
      "Baubegleitung auf Wunsch"
    ],
    process: [
      { step: "1", title: "Analyse", description: "Bewertung des Schadensbildes" },
      { step: "2", title: "Konzeption", description: "Entwicklung von Lösungsvarianten" },
      { step: "3", title: "Kalkulation", description: "Kosten- und Zeitplanung" },
      { step: "4", title: "Umsetzung", description: "Begleitung der Sanierung" }
    ]
  },
  {
    slug: "seminare",
    icon: GraduationCap,
    title: "Seminare",
    shortDescription: "Fortbildungen und Schulungen rund um Bauqualität und Schadensprävention.",
    fullDescription: "Wir bieten praxisnahe Seminare und Fortbildungen für Bauherren, Handwerker und Planer. Profitieren Sie von unserer langjährigen Erfahrung und erweitern Sie Ihr Fachwissen.",
    image: "/images/services/seminare.jpg",
    features: [
      "Praxisorientierte Schulungen",
      "Erfahrene Referenten",
      "Aktuelle Themen aus dem Bauwesen",
      "Inhouse-Schulungen möglich",
      "Teilnahmezertifikate",
      "Individuelle Themengestaltung"
    ],
    process: [
      { step: "1", title: "Bedarfsanalyse", description: "Ermittlung der Schulungsthemen" },
      { step: "2", title: "Konzeption", description: "Erstellung des Seminarplans" },
      { step: "3", title: "Durchführung", description: "Praxisnahe Wissensvermittlung" },
      { step: "4", title: "Zertifikat", description: "Teilnahmebestätigung" }
    ]
  }
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
  { name: "TÜV Rheinland", description: "Technische Prüfung und Zertifizierung" }
]

export const certificatesData = [
  {
    name: "TÜV Rheinland",
    description: "Zertifizierter Sachverständiger",
    image: "/images/certificates/tuev.jpg"
  },
  {
    name: "IHK Konstanz",
    description: "Öffentlich bestellter und vereidigter Sachverständiger",
    image: "/images/certificates/ihk.jpg"
  },
  {
    name: "IQ-ZERT",
    description: "Institut für Qualitätssicherung & Zertifizierung",
    image: "/images/certificates/iq-zert.jpg"
  },
  {
    name: "BVS",
    description: "Bundesverband öffentlich bestellter Sachverständiger",
    image: "/images/certificates/bvs.jpg"
  }
]

export function getServiceBySlug(slug: string) {
  return servicesData.find((service) => service.slug === slug)
}

export function getAllServiceSlugs() {
  return servicesData.map((service) => service.slug)
}
