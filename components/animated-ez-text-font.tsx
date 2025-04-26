"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface AnimatedEZTextFontProps {
  className?: string
}

export default function AnimatedEZTextFont({ className = "" }: AnimatedEZTextFontProps) {
  const [isClient, setIsClient] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Ensure we're on the client side before rendering animations
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Animation variants for SVG paths
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: prefersReducedMotion ? 1 : 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: prefersReducedMotion ? 0 : 0.1 + i * 0.1,
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: "easeInOut",
        },
        opacity: {
          delay: prefersReducedMotion ? 0 : 0.1 + i * 0.1,
          duration: prefersReducedMotion ? 0 : 0.2,
        },
      },
    }),
  }

  // Highlighter animation variant - now with stronger blue effect
  const highlighterVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 0.9, // Higher opacity for stronger effect
      transition: {
        delay: prefersReducedMotion ? 0 : 1.0,
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  // Sparkle animation variants
  const sparkleVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : 1.4 + i * 0.15,
        duration: prefersReducedMotion ? 0 : 0.4,
        type: "spring",
      },
    }),
  }

  if (!isClient) return null

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Highlighter background with stronger blue effect */}
      <motion.div
        className="absolute inset-0 bg-azure-500/70 z-0" // Increased opacity to 70%
        style={{
          clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
          transformOrigin: "center bottom",
        }}
        variants={highlighterVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
      />

      {/* SVG for drawing animation with white stroke */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 120"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="w-full h-full"
        >
          {/* E letter - now with white stroke */}
          <motion.path
            d="M20,20 L80,20 M20,60 L70,60 M20,100 L80,100 M20,20 L20,100"
            stroke="white" // Changed to white
            strokeWidth="20"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={0}
            variants={pathVariants}
          />

          {/* Z letter as a single path - now with white stroke */}
          <motion.path
            d="M110,20 L170,20 L110,100 L170,100"
            stroke="white" // Changed to white
            strokeWidth="20"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={1}
            variants={pathVariants}
          />
        </motion.svg>
      </div>

      {/* Text placeholder - invisible but maintains space */}
      <motion.span
        className="text-transparent text-6xl md:text-8xl lg:text-9xl font-black italic relative tracking-wider inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        EZ
      </motion.span>

      {/* Sparkle effects - now white to match the text */}
      <motion.div
        className="absolute -top-4 -right-4 text-white text-2xl" // Changed to white
        variants={sparkleVariants}
        custom={0}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-0 text-white text-xl" // Changed to white
        variants={sparkleVariants}
        custom={1}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
      >
        ✧
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -left-2 text-white text-xl" // Changed to white
        variants={sparkleVariants}
        custom={2}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute top-0 left-1/4 text-white text-sm" // Changed to white
        variants={sparkleVariants}
        custom={3}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
      >
        ✧
      </motion.div>
    </div>
  )
}
