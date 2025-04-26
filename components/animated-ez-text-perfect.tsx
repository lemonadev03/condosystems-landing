"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedEZTextPerfectProps {
  className?: string
}

export default function AnimatedEZTextPerfect({ className = "" }: AnimatedEZTextPerfectProps) {
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

  // Define dimensions for precise positioning
  const strokeWidth = 20
  const eLeft = 20
  const eRight = 80
  const eMiddleRight = 70
  const eTop = 20
  const eMiddle = 60
  const eBottom = 100

  const zLeft = 110
  const zRight = 170
  const zTop = 20
  const zBottom = 100

  // Half stroke width for offset calculations
  const offset = strokeWidth / 2

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Highlighter background with clean geometric shape */}
      <motion.div
        className="absolute inset-0 bg-[#407140]/25 z-0"
        style={{
          clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
          transformOrigin: "center bottom",
        }}
        variants={highlighterVariants}
        initial="hidden"
        animate="visible"
      />

      {/* SVG for drawing animation with perfect connections */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 120"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
        >
          {/* E letter */}
          {/* Top horizontal line of E */}
          <motion.path
            d={`M${eLeft},${eTop} L${eRight},${eTop}`}
            stroke="#407140"
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={0}
            variants={pathVariants}
          />

          {/* Middle horizontal line of E */}
          <motion.path
            d={`M${eLeft},${eMiddle} L${eMiddleRight},${eMiddle}`}
            stroke="#407140"
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={1}
            variants={pathVariants}
          />

          {/* Bottom horizontal line of E */}
          <motion.path
            d={`M${eLeft},${eBottom} L${eRight},${eBottom}`}
            stroke="#407140"
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={2}
            variants={pathVariants}
          />

          {/* Vertical line of E */}
          <motion.path
            d={`M${eLeft},${eTop} L${eLeft},${eBottom}`}
            stroke="#407140"
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={3}
            variants={pathVariants}
          />

          {/* Z letter with perfect connections */}
          {/* Top horizontal line of Z */}
          <motion.path
            d={`M${zLeft},${zTop} L${zRight},${zTop}`}
            stroke="#407140"
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={4}
            variants={pathVariants}
          />

          {/* Bottom horizontal line of Z */}
          <motion.path
            d={`M${zLeft},${zBottom} L${zRight},${zBottom}`}
            stroke="#407140"
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="transparent"
            custom={5}
            variants={pathVariants}
          />

          {/* Diagonal line of Z - perfectly connecting at corners */}
          <motion.path
            d={`M${zRight - offset},${zTop + offset} L${zLeft + offset},${zBottom - offset}`}
            stroke="#407140"
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeLinejoin="miter"
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
