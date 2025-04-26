"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedEZTextAdvancedProps {
  className?: string
}

export default function AnimatedEZTextAdvanced({ className = "" }: AnimatedEZTextAdvancedProps) {
  const [isClient, setIsClient] = useState(false)

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
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.15,
          duration: 0.8,
          ease: "easeInOut",
        },
        opacity: {
          delay: i * 0.15,
          duration: 0.3,
        },
      },
    }),
  }

  // Highlighter animation variant
  const highlighterVariants = {
    hidden: {
      scaleX: 0,
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: 1.6,
        duration: 0.6,
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
        delay: 2.2 + i * 0.2,
        duration: 0.5,
        type: "spring",
      },
    }),
  }

  if (!isClient) return null

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Highlighter background that appears behind the text */}
      <motion.div
        className="absolute inset-0 bg-[#407140]/20 rounded-md transform-gpu origin-center z-0"
        style={{
          borderRadius: "12px",
          clipPath: "polygon(0% 0%, 98% 2%, 100% 98%, 2% 100%)", // Rough edge effect
        }}
        variants={highlighterVariants}
        initial="hidden"
        animate="visible"
      />

      {/* SVG for drawing animation with rough edges */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 120"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
        >
          {/* E letter with rough edges */}
          <motion.path
            d="M20,20 C22,19 24,21 25,20 H78 C80,20 82,22 80,23"
            stroke="#407140"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={0}
            variants={pathVariants}
          />
          <motion.path
            d="M20,60 C22,59 24,61 25,60 H68 C70,60 72,62 70,63"
            stroke="#407140"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={1}
            variants={pathVariants}
          />
          <motion.path
            d="M20,100 C22,99 24,101 25,100 H78 C80,100 82,102 80,103"
            stroke="#407140"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={2}
            variants={pathVariants}
          />
          <motion.path
            d="M20,20 C19,22 21,24 20,25 V95 C20,97 22,99 21,100"
            stroke="#407140"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={3}
            variants={pathVariants}
          />

          {/* Z letter with rough edges */}
          <motion.path
            d="M110,20 C112,19 114,21 115,20 H168 C170,20 172,22 170,23"
            stroke="#407140"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={4}
            variants={pathVariants}
          />
          <motion.path
            d="M110,100 C112,99 114,101 115,100 H168 C170,100 172,102 170,103"
            stroke="#407140"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={5}
            variants={pathVariants}
          />
          <motion.path
            d="M168,20 C170,22 168,24 167,25 L113,95 C111,97 109,99 110,100"
            stroke="#407140"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={6}
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

      {/* Sparkle effects */}
      <motion.div
        className="absolute -top-4 -right-4 text-[#407140] text-2xl"
        variants={sparkleVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-0 text-[#407140] text-xl"
        variants={sparkleVariants}
        custom={1}
        initial="hidden"
        animate="visible"
      >
        ✧
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -left-2 text-[#407140] text-xl"
        variants={sparkleVariants}
        custom={2}
        initial="hidden"
        animate="visible"
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute top-0 left-1/4 text-[#407140] text-sm"
        variants={sparkleVariants}
        custom={3}
        initial="hidden"
        animate="visible"
      >
        ✧
      </motion.div>
    </div>
  )
}
