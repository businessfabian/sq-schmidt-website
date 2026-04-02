"use client"
import { useRef, useEffect, type ReactNode } from "react"

let gsapPromise: Promise<typeof import("gsap")> | null = null

function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = import("gsap").then(async (gsapModule) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsapModule.gsap.registerPlugin(ScrollTrigger)
      return gsapModule
    })
  }
  return gsapPromise
}

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
  stagger?: number
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  stagger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1"
      return
    }

    // Set initial state immediately to prevent flash
    const from = getTransform(direction)
    el.style.opacity = "0"
    el.style.transform = from.transform

    let ctx: any

    loadGsap().then(({ gsap }) => {
      if (!el.isConnected) return

      ctx = gsap.context(() => {
        const targets = stagger ? el.children : el

        gsap.fromTo(
          targets,
          { opacity: 0, ...getGsapFrom(direction) },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay: delay / 1000,
            ease: "power2.out",
            stagger: stagger ? stagger / 1000 : undefined,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        )
      }, el)
    })

    return () => {
      ctx?.revert()
    }
  }, [direction, delay, duration, stagger])

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

function getTransform(direction: string) {
  switch (direction) {
    case "left":
      return { transform: "translateX(-40px)" }
    case "right":
      return { transform: "translateX(40px)" }
    default:
      return { transform: "translateY(30px)" }
  }
}

function getGsapFrom(direction: string) {
  switch (direction) {
    case "left":
      return { x: -40 }
    case "right":
      return { x: 40 }
    default:
      return { y: 30 }
  }
}
