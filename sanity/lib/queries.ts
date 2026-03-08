import { client } from "./client"

export async function getEinstellungen() {
  return client.fetch(`*[_type == "einstellungen"][0]`)
}

export async function getLeistungen() {
  return client.fetch(`*[_type == "leistung"] | order(reihenfolge asc) {
    _id, titel, slug, kurzBeschreibung, beschreibung,
    "bild": bild.asset->url
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