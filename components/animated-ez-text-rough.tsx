"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedEZTextRoughProps {
  className?: string
}

export default function AnimatedEZTextRough({ className = "" }: AnimatedEZTextRoughProps) {
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
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 0.8,
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
      {/* Highlighter background with rough edges */}
      <motion.div
        className="absolute inset-0 bg-[#407140]/25 z-0"
        style={{
          clipPath: "polygon(2% 15%, 98% 5%, 97% 90%, 3% 95%)",
          transformOrigin: "center bottom",
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
          {/* E letter with rough, hand-drawn edges */}
          <motion.path
            d="M22,18 C20,17 18,19 17,20 H75 C79,19 83,21 82,24"
            stroke="#407140"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={0}
            variants={pathVariants}
          />
          <motion.path
            d="M21,58 C19,57 17,59 16,60 H65 C69,59 73,61 72,64"
            stroke="#407140"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={1}
            variants={pathVariants}
          />
          <motion.path
            d="M22,98 C20,97 18,99 17,100 H75 C79,99 83,101 82,104"
            stroke="#407140"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={2}
            variants={pathVariants}
          />
          <motion.path
            d="M20,20 C18,22 16,24 17,26 V94 C17,96 19,98 18,100"
            stroke="#407140"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={3}
            variants={pathVariants}
          />

          {/* Z letter with rough, hand-drawn edges */}
          <motion.path
            d="M112,18 C110,17 108,19 107,20 H165 C169,19 173,21 172,24"
            stroke="#407140"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={4}
            variants={pathVariants}
          />
          <motion.path
            d="M112,98 C110,97 108,99 107,100 H165 C169,99 173,101 172,104"
            stroke="#407140"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            custom={5}
            variants={pathVariants}
          />
          <motion.path
            d="M165,20 C167,22 169,24 168,26 L112,94 C110,96 108,98 109,100"
            stroke="#407140"
            strokeWidth="18"
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
