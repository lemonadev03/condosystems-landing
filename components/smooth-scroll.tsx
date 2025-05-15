"use client"

import type React from "react"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // We're disabling the smooth scrolling functionality while keeping the component structure
  // This allows for easy re-enabling if needed in the future

  return <>{children}</>
}
