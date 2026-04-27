"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface GalerieItem {
  url: string
  alt?: string
  caption?: string
}

export function ProjektGalerieLightbox({ galerie }: { galerie: GalerieItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(() => setOpen(i => i !== null ? (i - 1 + galerie.length) % galerie.length : null), [galerie.length])
  const next = useCallback(() => setOpen(i => i !== null ? (i + 1) % galerie.length : null), [galerie.length])

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = "hidden"
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", onKey)
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [open, close, prev, next])

  const current = open !== null ? galerie[open] : null

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {galerie.map((img, i) =>
          img.url ? (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="rounded-xl overflow-hidden border border-border group cursor-pointer text-left"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={img.url}
                  alt={img.alt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
              </div>
              {img.caption && (
                <p className="px-3 py-2 text-xs text-muted-foreground">{img.caption}</p>
              )}
            </button>
          ) : null
        )}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Schließen"
            className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {galerie.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Vorheriges Bild"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Nächstes Bild"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl w-full max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[85vh]">
              <Image
                src={current.url}
                alt={current.alt ?? ""}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {(current.caption || galerie.length > 1) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
                <div className="flex items-center justify-between">
                  {current.caption && <p className="text-sm text-white">{current.caption}</p>}
                  {galerie.length > 1 && (
                    <span className="text-xs text-white/60 ml-auto">{open! + 1} / {galerie.length}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
