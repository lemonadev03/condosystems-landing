"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenisInstance = new Lenis({
      duration: 1.2, // Longer duration gives more weight
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2,
    })

    // Set up RAF loop for Lenis
    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  // Expose lenis instance to window for debugging
  useEffect(() => {
    if (lenis && typeof window !== "undefined") {
      // @ts-ignore
      window.lenis = lenis
    }
  }, [lenis])

  return <>{children}</>
}
