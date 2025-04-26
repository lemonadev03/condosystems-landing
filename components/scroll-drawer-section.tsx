"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollDrawerSectionProps {
  children: ReactNode
  bgColor?: string
  id?: string
  className?: string
  zIndex?: number
  inViewRef?: (node: Element | null) => void
}

export default function ScrollDrawerSection({
  children,
  bgColor = "bg-white",
  id,
  className = "",
  zIndex = 10,
  inViewRef,
}: ScrollDrawerSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Transform for the drawer effect
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["100%", "0%", "0%", "-100%"])

  return (
    <motion.section
      id={id}
      ref={(node) => {
        sectionRef.current = node as HTMLDivElement | null
        if (inViewRef) inViewRef(node)
      }}
      className={`relative min-h-screen w-full ${className}`}
      style={{ zIndex }}
    >
      <motion.div className={`absolute inset-0 ${bgColor} shadow-lg`} style={{ y }}>
        <div className="min-h-screen w-full py-20 md:py-32">{children}</div>
      </motion.div>
    </motion.section>
  )
}
