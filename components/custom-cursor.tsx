"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  variant?: string
  text?: string
}

export default function CustomCursor({ variant = "default", text = "" }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setVisible(true)
    const handleMouseLeave = () => setVisible(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const variants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference" as const,
    },
    button: {
      x: position.x - 40,
      y: position.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(69, 114, 173, 0.3)",
      mixBlendMode: "normal" as const,
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference" as const,
    },
    card: {
      x: position.x - 30,
      y: position.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(69, 114, 173, 0.2)",
      mixBlendMode: "normal" as const,
    },
    tab: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(69, 114, 173, 0.2)",
      mixBlendMode: "normal" as const,
    },
    accordion: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference" as const,
    },
  }

  // Only show custom cursor on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none flex items-center justify-center"
      animate={variant}
      variants={variants}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {text && variant === "button" && <span className="text-white text-sm font-medium">{text}</span>}
    </motion.div>
  )
}
