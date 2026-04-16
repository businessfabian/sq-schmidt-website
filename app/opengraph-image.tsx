import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "SQ Schmidt Qualitätssicherung"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "64px",
          position: "relative",
        }}
      >
        {/* Akzent-Linie links */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "#2563eb", display: "flex" }} />

        {/* Logo Badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          borderRadius: 16,
          background: "#2563eb",
          marginBottom: 32,
        }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>SQ</span>
        </div>

        {/* Firma */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 20, color: "#60a5fa", fontWeight: 600, margin: 0, letterSpacing: 2, textTransform: "uppercase" }}>
            Qualitätssicherung im Bauwesen
          </p>
          <h1 style={{ fontSize: 56, fontWeight: 800, color: "#ffffff", margin: 0, lineHeight: 1.1 }}>
            SQ Schmidt
          </h1>
          <p style={{ fontSize: 22, color: "#94a3b8", margin: 0, marginTop: 8 }}>
            Öffentlich bestellter Sachverständiger · IHK Konstanz
          </p>
        </div>

        {/* Website */}
        <p style={{ position: "absolute", bottom: 48, right: 64, fontSize: 18, color: "#475569", margin: 0 }}>
          sq-sv.de
        </p>
      </div>
    ),
    { ...size },
  )
}
