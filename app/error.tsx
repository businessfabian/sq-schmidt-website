"use client"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Etwas ist schiefgelaufen</h1>
        <p className="text-muted-foreground mb-6">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  )
}
