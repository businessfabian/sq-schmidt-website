import { defineType, defineField } from "sanity"

export default defineType({
  name: "einstellungen",
  title: "Einstellungen",
  type: "document",
  groups: [
    { name: "allgemein", title: "Allgemein" },
    { name: "hero", title: "Hero" },
    { name: "ueber", title: "Über uns" },
    { name: "impressum", title: "Impressum & Rechtliches" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Allgemein
    defineField({ name: "firmenname", title: "Firmenname", type: "string", group: "allgemein" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "allgemein" }),
    defineField({ name: "telefon", title: "Telefon", type: "string", group: "allgemein" }),
    defineField({ name: "email", title: "E-Mail", type: "string", group: "allgemein" }),
    defineField({ name: "adresse", title: "Adresse (einzeilig)", type: "string", group: "allgemein" }),
    defineField({ name: "oeffnungszeiten", title: "Öffnungszeiten", type: "string", group: "allgemein" }),
    defineField({ name: "jahreErfahrung", title: "Jahre Erfahrung", type: "number", group: "allgemein" }),
    defineField({ name: "anzahlProjekte", title: "Anzahl Projekte", type: "number", group: "allgemein" }),

    // Hero
    defineField({ name: "heroTitel", title: "Hero Titel", type: "string", group: "hero" }),
    defineField({ name: "heroBeschreibung", title: "Hero Beschreibung", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroBild", title: "Hero Hintergrundbild", type: "image", group: "hero",
      description: "Dunkles Baubild empfohlen — wird als Fullscreen-Hintergrund angezeigt" }),

    // Über uns
    defineField({ name: "uebermichTitel", title: "Über uns Titel", type: "string", group: "ueber" }),
    defineField({ name: "uebermichText", title: "Über uns Text", type: "text", rows: 5, group: "ueber" }),

    // Impressum
    defineField({ name: "inhaberName", title: "Inhaber Name", type: "string", group: "impressum",
      description: "z.B. Dipl.-Ing. Gerhard Schmidt" }),
    defineField({ name: "strasseHausnummer", title: "Straße & Hausnummer", type: "string", group: "impressum",
      description: "z.B. Marktplatz 21" }),
    defineField({ name: "plzOrt", title: "PLZ & Ort", type: "string", group: "impressum",
      description: "z.B. 78647 Trossingen" }),
    defineField({ name: "ustId", title: "USt-ID (optional)", type: "string", group: "impressum",
      description: "z.B. DE123456789 — leer lassen wenn Kleinunternehmer" }),
    defineField({ name: "kleinunternehmer", title: "Kleinunternehmer nach Par. 19 UStG", type: "boolean", group: "impressum",
      initialValue: true }),
    defineField({ name: "berufsbezeichnung", title: "Berufsbezeichnung", type: "string", group: "impressum",
      description: "z.B. Öffentlich bestellter und vereidigter Sachverständiger" }),
    defineField({ name: "bestellendeKammer", title: "Bestellende Körperschaft", type: "string", group: "impressum",
      description: "z.B. IHK Konstanz" }),
    defineField({ name: "berufshaftpflichtVersicherer", title: "Berufshaftpflicht Versicherer", type: "string", group: "impressum" }),
    defineField({ name: "berufshaftpflichtOrt", title: "Berufshaftpflicht Sitz", type: "string", group: "impressum" }),
    defineField({ name: "verantwortlicherInhalte", title: "Verantwortlicher für Inhalte", type: "string", group: "impressum",
      description: "Falls abweichend vom Inhaber" }),

    // Extras
    defineField({ name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string', group: 'extras',
      description: 'z.B. G-XXXXXXXXXX' }),
    defineField({ name: 'cookieBannerAktiv', title: 'Cookie Banner anzeigen', type: 'boolean', group: 'extras', initialValue: true }),
    defineField({ name: 'cookieBannerText', title: 'Cookie Banner Text', type: 'text', rows: 2, group: 'extras' }),

    // SEO
    defineField({ name: "seoTitel", title: "SEO Titel", type: "string", group: "seo" }),
    defineField({ name: "seoBeschreibung", title: "SEO Beschreibung", type: "text", rows: 2, group: "seo" }),
  ],
})