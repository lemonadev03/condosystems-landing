"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface AnimatedTextHighlightProps {
  children: React.ReactNode
  className?: string
  highlightColor?: string
  delay?: number
}

export default function AnimatedTextHighlight({
  children,
  className = "",
  highlightColor = "bg-azure-500/20",
  delay = 0,
}: AnimatedTextHighlightProps) {
  const prefersReducedMotion = useReducedMotion()

  const highlightVariants = {
    hidden: {
      width: "0%",
      opacity: 0,
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : delay,
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className={`absolute bottom-0 left-0 h-[0.2em] ${highlightColor} rounded-full`}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
        variants={highlightVariants}
      />
    </span>
  )
}
