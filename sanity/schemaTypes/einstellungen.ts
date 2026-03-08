import { defineType, defineField } from "sanity"

export default defineType({
  name: "einstellungen",
  title: "Einstellungen",
  type: "document",
  fields: [
    defineField({ name: "firmenname", title: "Firmenname", type: "string" }),
    defineField({ name: "tagline", title: "Tagline (Hero Untertitel)", type: "string" }),
    defineField({ name: "telefon", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-Mail", type: "string" }),
    defineField({ name: "adresse", title: "Adresse", type: "string" }),
    defineField({ name: "oeffnungszeiten", title: "Oeffnungszeiten", type: "string" }),
    defineField({ name: "heroTitel", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroBeschreibung", title: "Hero Beschreibung", type: "text", rows: 3 }),
    defineField({ name: "uebermichTitel", title: "Ueber uns Titel", type: "string" }),
    defineField({ name: "uebermichText", title: "Ueber uns Text", type: "text", rows: 5 }),
    defineField({ name: "seoTitel", title: "SEO Titel", type: "string" }),
    defineField({ name: "seoBeschreibung", title: "SEO Beschreibung", type: "text", rows: 2 }),
    defineField({ name: "jahreErfahrung", title: "Jahre Erfahrung", type: "number" }),
    defineField({ name: "anzahlProjekte", title: "Anzahl Projekte", type: "number" }),
  ],
})