interface Props {
  size?: number
  className?: string
}

/**
 * SQ Schmidt Logo -- Variante D (Klassisch & Dezent)
 * Dunkles Quadrat, "SQ" weiss, orangener Unterstrich-Akzent
 */
export function SqLogo({ size = 40, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SQ Schmidt Logo"
    >
      <rect width="200" height="200" fill="#121212" rx="24" />
      <text
        x="100"
        y="104"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="76"
        letterSpacing="-1.5"
      >
        SQ
      </text>
      {/* Akzent-Balken: position 82%, breite 50%, staerke 6 */}
      <rect x="50" y="161" width="100" height="6" fill="#FF6B00" rx="1.5" />
    </svg>
  )
}
