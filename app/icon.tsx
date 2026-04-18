import { ImageResponse } from "next/og"

export const size = { width: 64, height: 64 }
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
            fontSize: 30,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -1,
            fontFamily: "sans-serif",
            marginBottom: 6,
          }}
        >
          SQ
        </span>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 5,
            background: "#FF6B00",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
