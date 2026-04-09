"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Props {
  text?: string
}

export function CookieBanner({ text }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = localStorage.getItem("cookies_accepted")
    if (!choice) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem("cookies_accepted", "true")
    setVisible(false)
  }

  function decline() {
    localStorage.setItem("cookies_accepted", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-zinc-300 flex-1 leading-relaxed">
          {text || "Diese Website verwendet funktionale Cookies und Vercel Analytics zur anonymen Auswertung. Es werden keine personenbezogenen Daten gespeichert."}
          {" "}
          <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={decline}
            className="px-5 py-2 bg-zinc-700 text-zinc-200 rounded-xl text-sm font-semibold hover:bg-zinc-600 transition-all">
            Ablehnen
          </button>
          <button onClick={accept}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all">
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
}
