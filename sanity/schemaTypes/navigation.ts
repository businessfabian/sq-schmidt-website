import { defineType, defineField } from "sanity"

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "punkte",
      title: "Menuepunkte",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Bezeichnung", type: "string" }),
          defineField({ name: "href", title: "Link (optional bei Dropdown)", type: "string" }),
          defineField({ name: "aktiv", title: "Sichtbar", type: "boolean", initialValue: true }),
          defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number" }),
          defineField({
            name: "typ", title: "Typ", type: "string",
            options: { list: [
              { title: "Direktlink", value: "link" },
              { title: "Dropdown", value: "dropdown" },
              { title: "Leistungen (automatisch)", value: "leistungen" },
              { title: "Seminare (automatisch)", value: "seminare" },
            ]}
          }),
          defineField({
            name: "unterpunkte", title: "Unterpunkte (bei Dropdown)", type: "array",
            of: [{
              type: "object",
              fields: [
                defineField({ name: "label", title: "Bezeichnung", type: "string" }),
                defineField({ name: "href", title: "Link", type: "string" }),
              ]
            }]
          }),
        ],
        preview: { select: { title: "label", subtitle: "typ" } }
      }]
    })
  ]
})