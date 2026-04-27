"use client"
import { useState, useRef } from "react"
import { ImagePlus, Loader2, Trash2, X } from "lucide-react"

interface GalerieItem {
  _key: string
  url: string
  alt?: string
  caption?: string
}

interface Props {
  projektId: string
  galerie: GalerieItem[]
  onUpdate: (galerie: GalerieItem[]) => void
}

export function ProjektGalerieUpload({ projektId, galerie, onUpdate }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    setError("")

    const newItems: GalerieItem[] = []
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("projektId", projektId)
      formData.append("alt", file.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "))

      try {
        const res = await fetch("/api/admin/projekte/galerie", { method: "POST", body: formData })
        if (!res.ok) throw new Error()
        const data = await res.json()
        newItems.push({ _key: data.key, url: data.url, alt: "", caption: "" })
      } catch {
        setError(`Fehler beim Hochladen von ${file.name}`)
      }
    }

    onUpdate([...galerie, ...newItems])
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  async function handleDelete(key: string) {
    if (!confirm("Bild aus Galerie entfernen?")) return
    try {
      const res = await fetch("/api/admin/projekte/galerie", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projektId, imageKey: key }),
      })
      if (!res.ok) throw new Error()
      onUpdate(galerie.filter(g => g._key !== key))
    } catch {
      setError("Fehler beim Löschen")
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">Bildergalerie</label>

      {galerie.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {galerie.map((img) => (
            <div key={img._key} className="relative group rounded-xl overflow-hidden bg-zinc-800 aspect-[4/3]">
              <img src={img.url} alt={img.alt || ""} className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(img._key)}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3.5 w-3.5 text-white" />
              </button>
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                  <p className="text-xs text-white truncate">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full h-24 border-2 border-dashed border-zinc-700 rounded-xl flex items-center justify-center gap-2 text-zinc-500 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
      >
        {uploading ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Wird hochgeladen...</>
        ) : (
          <><ImagePlus className="h-5 w-5" /> Bilder hinzufügen</>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      <p className="text-xs text-zinc-500 mt-1">JPG, PNG, WebP — max. 5MB pro Bild. Mehrfachauswahl möglich.</p>
    </div>
  )
}
