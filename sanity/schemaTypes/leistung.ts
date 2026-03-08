import { defineType, defineField } from "sanity"

export default defineType({
  name: "leistung",
  title: "Leistungen",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "slug", title: "URL Slug", type: "slug", options: { source: "titel" } }),
    defineField({ name: "kurzBeschreibung", title: "Kurzbeschreibung", type: "text", rows: 2 }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "text", rows: 6 }),
    defineField({ name: "bild", title: "Bild", type: "image", options: { hotspot: true } }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "reihenfolgeAsc", by: [{ field: "reihenfolge", direction: "asc" }] }],
})