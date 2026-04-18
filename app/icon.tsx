import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

// Variante D: Klassisch & Dezent -- dunkles Quadrat, SQ weiss, oranger Unterstrich
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121212",
          borderRadius: 4,
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -0.5,
            fontFamily: "sans-serif",
            marginBottom: 2,
          }}
        >
          SQ
        </span>
        {/* Unterstrich-Akzent bei ~82% Position */}
        <div
          style={{
            position: "absolute",
            bottom: 5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 14,
            height: 2,
            background: "#FF6B00",
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
