"use client"

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", backgroundColor: "#09090b", color: "#fafafa" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ textAlign: "center", maxWidth: "28rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Etwas ist schiefgelaufen</h1>
            <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
              Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#c8a55a",
                color: "#09090b",
                border: "none",
                borderRadius: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
