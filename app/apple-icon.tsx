import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// Variante D: Klassisch & Dezent
export default function AppleIcon() {
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
          borderRadius: 40,
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -3,
            fontFamily: "sans-serif",
            marginBottom: 8,
          }}
        >
          SQ
        </span>
        {/* Unterstrich-Akzent bei ~82% Position */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
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
