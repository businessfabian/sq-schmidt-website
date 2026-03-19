"use client"
import { useEffect, useRef, useState } from "react"

/**
 * Hook: Element faded rein wenn es in den Viewport scrollt.
 * Gibt ref und className zurueck.
 */
export function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    } as React.CSSProperties,
  }
}

/**
 * Wrapper-Komponente fuer Scroll-Reveal
 */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, style } = useScrollReveal(delay)
  return <div ref={ref} style={style} className={className}>{children}</div>
}

/**
 * Animierter Zaehler der hochzaehlt wenn sichtbar
 */
export function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
