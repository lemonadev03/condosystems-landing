"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Lenis from "@studio-freight/lenis"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Don't initialize smooth scrolling if user prefers reduced motion
    if (prefersReducedMotion) {
      document.documentElement.classList.remove("lenis-smooth")
      return
    }

    // Initialize Lenis smooth scrolling with enhanced settings
    const lenisInstance = new Lenis({
      duration: 1.5, // Longer duration for more weight
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2,
      wheelMultiplier: 1.2, // Slightly increase wheel sensitivity
      lerp: 0.08, // Linear interpolation factor - lower = smoother
    })

    // Set up RAF loop for Lenis
    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    setLenis(lenisInstance)

    // Add class to html for styling
    document.documentElement.classList.add("lenis-smooth")

    return () => {
      lenisInstance.destroy()
      document.documentElement.classList.remove("lenis-smooth")
    }
  }, [prefersReducedMotion])

  // Expose lenis instance to window for debugging
  useEffect(() => {
    if (lenis && typeof window !== "undefined") {
      // @ts-ignore
      window.lenis = lenis
    }
  }, [lenis])

  return <>{children}</>
}
