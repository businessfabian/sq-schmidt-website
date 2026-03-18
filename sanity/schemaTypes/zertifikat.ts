import { defineType, defineField } from "sanity"

export default defineType({
  name: "zertifikat",
  title: "Zertifikat",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "string" }),
    defineField({ name: "bild", title: "Bild / Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "aktiv", title: "Aktiv", type: "boolean", initialValue: true }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number", initialValue: 99 }),
  ],
  preview: { select: { title: "name", subtitle: "beschreibung" } },
})