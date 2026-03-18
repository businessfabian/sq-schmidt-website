import { getEinstellungen, getLeistungen, getSeminare } from "@/sanity/lib/queries"
import { HeaderClient } from "./header-client"

export async function Header({ einstellungen: einstellungenProp }: { einstellungen?: any }) {
  const einstellungen = einstellungenProp ?? await getEinstellungen()
  const leistungen = await getLeistungen()
  const seminare = await getSeminare()
  return <HeaderClient einstellungen={einstellungen} leistungen={leistungen} seminare={seminare} />
}