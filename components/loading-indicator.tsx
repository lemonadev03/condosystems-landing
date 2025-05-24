"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface LoadingIndicatorProps {
  isLoading: boolean
}

export default function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
  const prefersReducedMotion = useReducedMotion()

  if (!isLoading) return null

  // If user prefers reduced motion, show a simpler loading indicator
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white z-50"
        style={{ opacity: isLoading ? 1 : 0 }}
      >
        <div className="text-azure-500 font-medium">Loading...</div>
      </div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: 0.25 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-4 border-azure-500/20 rounded-full"
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.2 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 0.6,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-azure-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 0.5,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  )
}
