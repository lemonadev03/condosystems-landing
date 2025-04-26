"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StackSectionProps {
  children: ReactNode
  bgColor?: string
  id?: string
  className?: string
  inViewRef?: (node: Element | null) => void
  index: number
}

export default function StackSection({
  children,
  bgColor = "bg-white",
  id,
  className = "",
  inViewRef,
  index,
}: StackSectionProps) {
  // Calculate the z-index based on the index
  // Higher index = higher z-index to ensure proper stacking
  const zIndex = 10 + index

  return (
    <motion.section
      id={id}
      ref={inViewRef}
      className={`${bgColor} ${className} sticky w-full overflow-hidden`}
      style={{
        zIndex,
        // This is the key to the stacking effect
        // Each section will stick at a different point based on its index
        top: `${index * 10}vh`,
      }}
      initial={{ opacity: 0.8 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-20% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="min-h-screen w-full py-20 md:py-32">
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </motion.section>
  )
}
