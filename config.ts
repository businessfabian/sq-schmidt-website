/**
 * MEYSO TEMPLATE CONFIG
 * ─────────────────────
 * Diese Datei beim Klonen fuer neuen Kunden anpassen.
 * Kein anderer Code muss veraendert werden.
 */

export const config = {
  // ── Firma ──────────────────────────────────────────────────────────────
  firma: {
    name: "SQ Schmidt Qualitaetssicherung",
    branche: "sachverstaendiger" as "sachverstaendiger" | "handwerker" | "dienstleister" | "gastronomie",
    logoText: "SQ",           // Kuerzel im Header-Logo
    logoSubtitle: "Qualitaetssicherung", // Untertitel im Header
  },

  // ── Homepage Sections (true = sichtbar) ────────────────────────────────
  sections: {
    hero: true,
    leistungen: true,
    ueber: true,
    partner: true,
    zertifikate: true,
    kontakt: true,
  },

  // ── Dashboard Tabs (true = sichtbar fuer Kunde) ────────────────────────
  dashboard: {
    kontakt: true,
    hero: true,
    ueber: true,
    leistungen: true,
    seminare: true,
    partner: true,
    zertifikate: true,
    navigation: true,
    seo: true,
  },

  // ── Features ───────────────────────────────────────────────────────────
  features: {
    kontaktformular: true,
    seminare: true,
    newsletter: false,
    buchung: false,
    blog: false,
    referenzen: false,
  },
}