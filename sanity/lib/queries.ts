import { client } from "./client"

export async function getEinstellungen() {
  return client.fetch(`*[_type == "einstellungen"][0]{
    ...,
    "heroBildUrl": heroBild.asset->url,
    "uebermichBildUrl": uebermichBild.asset->url
  }`)
}
export async function getLeistungen() {
  return client.fetch(`*[_type == "leistung"] | order(reihenfolge asc) {
    _id, titel, slug, kurzBeschreibung, beschreibung, icon, aktiv, reihenfolge,
    "bildUrl": bild.asset->url,
    leistungsumfang,
    prozess[]{ titel, beschreibung }
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
  return client.fetch(`*[_type == "seminartermin" && aktiv == true] | order(datumVon asc) {
    _id, titel, slug, kategorie, datumVon, datumBis, uhrzeit, ort, beschreibung, preis, anmeldeLink
  }`)
}
export async function getSeminarBySlug(slug: string) {
  return client.fetch(`*[_type == "seminartermin" && slug.current == $slug][0]`, { slug })
}
export async function getNavigation() {
  return client.fetch(`*[_type == "navigation"][0]`)
}
export async function getFortbildungen() {
  return client.fetch(`*[_type == "fortbildung"] | order(datum desc) {
    _id, titel, datum, veranstalter, ort, themenbereich, unterrichtseinheiten, hervorgehoben
  }`)
}
export async function getProjekte() {
  return client.fetch(`*[_type == "projekt" && !(_id in path("drafts.**"))] | order(projektDatum desc) {
    _id, titel, slug, projektDatum, kategorie, ort, kurzbeschreibung,
    "titelbildUrl": titelbild.asset->url,
    "titelbildAlt": titelbild.alt
  }`)
}