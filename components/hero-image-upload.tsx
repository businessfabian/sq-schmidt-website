"use client"
import { useState, useRef, useEffect } from "react"
import { Upload, Loader2, CheckCircle, ImageIcon } from "lucide-react"

export function HeroImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [einstellungenId, setEinstellungenId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Einstellungen-Dokument ID und aktuelles Bild laden
    fetch("/api/admin/hero-image")
      .then(r => r.json())
      .then(data => {
        if (data.id) setEinstellungenId(data.id)
        if (data.url) setPreview(data.url)
      })
      .catch(() => {})
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !einstellungenId) return
    setUploading(true)
    setDone(false)

    // Lokale Vorschau
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", "hero")
    formData.append("id", einstellungenId)

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) setDone(true)
    } catch { } finally { setUploading(false) }
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative h-40 w-full bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden">
        {preview ? (
          <img src={preview} alt="Hero Hintergrund" className="h-full w-full object-cover" />
        ) : (
          <div className="text-center">
            <ImageIcon className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-xs text-zinc-500">Klicken zum Hochladen</p>
            <p className="text-xs text-zinc-600">Aktuell: Standard-Bild</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
        {done && !uploading && (
          <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      <p className="text-xs text-zinc-500 mt-1">JPG, PNG — dunkles Baubild empfohlen</p>
    </div>
  )
}
