import { getEinstellungen, getLeistungen, getSeminare, getNavigation } from "@/sanity/lib/queries"
import { HeaderClient } from "./header-client"

export async function Header({ einstellungen: einstellungenProp }: { einstellungen?: any }) {
  const [einstellungen, leistungen, seminare, navigation] = await Promise.all([
    einstellungenProp ? Promise.resolve(einstellungenProp) : getEinstellungen(),
    getLeistungen(),
    getSeminare(),
    getNavigation(),
  ])
  return <HeaderClient einstellungen={einstellungen} leistungen={leistungen} seminare={seminare} navigation={navigation} />
}