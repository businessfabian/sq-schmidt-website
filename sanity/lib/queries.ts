import { client } from "./client"

export async function getEinstellungen() {
  return client.fetch(`*[_type == "einstellungen"][0]{
    ...,
    "heroBildUrl": heroBild.asset->url
  }`)
}
export async function getLeistungen() {
  return client.fetch(`*[_type == "leistung"] | order(reihenfolge asc) {
    _id, titel, slug, kurzBeschreibung, beschreibung, icon, aktiv, reihenfolge
  }`)
}
export async function getPartner() {
  return client.fetch(`*[_type == "partner"] | order(reihenfolge asc) {
    _id, name, beschreibung, webseite,
    "logo": logo.asset->url
  }`)
}
export async function getZertifikate() {
  return client.fetch(`*[_type == "zertifikat"] | order(reihenfolge asc) {
    _id, name, beschreibung,
    "bild": bild.asset->url
  }`)
}
export async function getSeminare() {
  return client.fetch(`*[_type == "seminartermin" && aktiv == true] | order(datum asc) {
    _id, titel, slug, kategorie, datum, uhrzeit, ort, beschreibung, preis, anmeldeLink
  }`)
}
export async function getSeminarBySlug(slug: string) {
  return client.fetch(`*[_type == "seminartermin" && slug.current == $slug][0]`, { slug })
}
export async function getReferenzen() {
  return client.fetch(`*[_type == "referenz" && aktiv == true] | order(reihenfolge asc) {
    _id, titel, beschreibung, kategorie, reihenfolge,
    "bild": bild.asset->url
  }`)
}
export async function getNavigation() {
  return client.fetch(`*[_type == "navigation"][0]`)
}