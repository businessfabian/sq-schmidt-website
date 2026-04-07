"use client"
import { useEffect } from "react"

interface Props {
  propertyId?: string | null
}

export function TawkChat({ propertyId }: Props) {
  useEffect(() => {
    if (!propertyId) return

    // Nur laden wenn Cookies akzeptiert
    const accepted = localStorage.getItem("cookies_accepted")
    if (!accepted) return

    // Pruefen ob schon geladen
    if (document.getElementById("tawk-script")) return

    const s = document.createElement("script")
    s.id = "tawk-script"
    s.async = true
    s.src = `https://embed.tawk.to/${propertyId}/default`
    s.charset = "UTF-8"
    s.setAttribute("crossorigin", "*")
    document.head.appendChild(s)

    return () => {
      const el = document.getElementById("tawk-script")
      if (el) el.remove()
    }
  }, [propertyId])

  return null
}
