"use client"

import { useState } from "react"
import { Droplets, Layers, Building2, Zap, Scale, ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react"

interface Fortbildung {
  _id: string
  titel: string
  datum: string
  veranstalter: string
  ort?: string
  themenbereich?: string
  unterrichtseinheiten?: number
  hervorgehoben?: boolean
}

interface ThemaConfig {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Lucide-Icon-Typ ist nicht direkt importierbar ohne komplexen Wrapper
  icon: any
  colorClass: string
  badgeClass: string
}

const THEMEN: Record<string, ThemaConfig> = {
  "feuchte-schimmel": {
    label: "Feuchte & Schimmel",
    icon: Droplets,
    colorClass: "text-blue-500",
    badgeClass: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  "abdichtung": {
    label: "Abdichtung",
    icon: Layers,
    colorClass: "text-emerald-500",
    badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  "wdvs-fassade": {
    label: "WDVS & Fassade",
    icon: Building2,
    colorClass: "text-amber-500",
    badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  "energieeffizienz": {
    label: "Energieeffizienz",
    icon: Zap,
    colorClass: "text-violet-500",
    badgeClass: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
  "recht-sachverstaendigenwesen": {
    label: "Recht & Sachverstaendigenwesen",
    icon: Scale,
    colorClass: "text-rose-500",
    badgeClass: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
}

const THEMA_KEYS = Object.keys(THEMEN)

function formatDatum(datum: string): string {
  return new Date(datum).toLocaleDateString("de-DE", { year: "numeric", month: "long" })
}

interface FortbildungClusterProps {
  fortbildungen: Fortbildung[]
}

export function FortbildungCluster({ fortbildungen }: FortbildungClusterProps) {
  const [openThema, setOpenThema] = useState<string | null>(null)

  function toggle(key: string) {
    setOpenThema((prev) => (prev === key ? null : key))
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {THEMA_KEYS.map((key) => {
        const config = THEMEN[key]
        const Icon = config.icon
        const items = fortbildungen.filter((f) => f.themenbereich === key)
        const isOpen = openThema === key

        return (
          <div
            key={key}
            className={`bg-card border rounded-2xl overflow-hidden transition-all ${
              isOpen ? "border-primary/30" : "border-border hover:border-border/80"
            }`}
          >
            {/* Kachel-Header */}
            <button
              onClick={() => toggle(key)}
              className="w-full flex items-center gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isOpen ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <Icon className={`h-5 w-5 ${isOpen ? "" : config.colorClass}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm leading-tight">{config.label}</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {items.length === 0
                    ? "Keine Eintraege"
                    : items.length === 1
                    ? "1 Fortbildung"
                    : `${items.length} Fortbildungen`}
                </p>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>

            {/* Ausgeklappte Liste */}
            {isOpen && (
              <div className="border-t border-border bg-muted/30">
                {items.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-muted-foreground">
                    Noch keine Fortbildungen in diesem Bereich erfasst.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {items.map((f) => (
                      <li key={f._id} className="px-5 py-3">
                        <p className="text-sm font-medium text-foreground leading-snug">{f.titel}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDatum(f.datum)}
                          </span>
                          {f.ort && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {f.ort}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{f.veranstalter}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
