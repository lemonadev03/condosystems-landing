"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedEZTextProps {
  className?: string
}

export default function AnimatedEZText({ className = "" }: AnimatedEZTextProps) {
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before rendering animations
  useEffect(() => {
    setIsClient(true)
  }, [])

  // SVG path for "EZ" - custom drawn for smooth animation
  const ezPath = "M10,10 H70 M10,40 H60 M10,70 H70 M80,10 H140 M80,70 H140 M80,10 L140,70"

  // Animation variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  const highlightVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 0.6,
      transition: {
        delay: 1.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  if (!isClient) return null

  return (
    <div className={`relative inline-block ${className}`}>
      {/* SVG for drawing animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          width="150"
          height="80"
          viewBox="0 0 150 80"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
        >
          <motion.path
            d="M10,10 H70 M10,40 H60 M10,70 H70 M80,10 H140 M80,70 H140 M80,10 L140,70"
            stroke="#407140"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            variants={pathVariants}
          />
        </motion.svg>
      </div>

      {/* Text that fades in after drawing */}
      <motion.span
        className="text-[#407140] text-6xl md:text-8xl lg:text-9xl italic relative z-10 tracking-wider inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        EZ
      </motion.span>

      {/* Highlighter effect */}
      <motion.div
        className="absolute h-6 md:h-8 bg-[#407140]/20 left-0 right-0 bottom-4 md:bottom-6 -rotate-2 z-0 transform-gpu origin-left"
        variants={highlightVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

      {/* Second highlighter line */}
      <motion.div
        className="absolute h-2 md:h-3 bg-[#407140] left-0 right-0 bottom-6 md:bottom-8 -rotate-1 z-0 transform-gpu origin-left"
        variants={highlightVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
      ></motion.div>

      {/* Third highlighter line */}
      <motion.div
        className="absolute h-1 md:h-2 bg-[#407140]/60 left-0 right-0 bottom-5 md:bottom-7 rotate-1 z-0 transform-gpu origin-left"
        variants={highlightVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.6 }}
      ></motion.div>

      {/* Sparkle effects */}
      <motion.div
        className="absolute -top-4 -right-4 text-[#407140] text-2xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -left-2 text-[#407140] text-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        ✦
      </motion.div>
    </div>
  )
}
