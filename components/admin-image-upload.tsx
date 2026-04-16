"use client"
import { useState, useRef } from "react"
import { Upload, Loader2, CheckCircle, ImageIcon } from "lucide-react"

interface Props {
  documentId: string
  type: "partner" | "zertifikat" | "hero" | "leistung" | "ueber"
  currentImage?: string
  onUploaded: (url: string) => void
}

export function AdminImageUpload({ documentId, type, currentImage, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setDone(false)

    // Lokale Vorschau
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)
    formData.append("id", documentId)

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) { onUploaded(data.url); setDone(true) }
    } catch { } finally { setUploading(false) }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">Bild / Logo</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative h-32 w-full bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden">
        {preview ? (
          <img src={preview} alt="Vorschau" className="h-full w-full object-contain p-2" />
        ) : (
          <div className="text-center">
            <ImageIcon className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-xs text-zinc-500">Klicken zum Hochladen</p>
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
      <p className="text-xs text-zinc-500 mt-1">PNG, JPG, SVG — max. 5MB</p>
    </div>
  )
}