"use client"

import type React from "react"
import { motion, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface HeroSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  scrollToSection: (sectionId: string) => void
  heroInViewRef: (node: Element | null) => void
  hyperlinks: {
    SCHEDULE_CALL: string
  }
}

export default function HeroSection({
  onMouseEnter,
  onMouseLeave,
  scrollToSection,
  heroInViewRef,
  hyperlinks,
}: HeroSectionProps) {
  const controls = useAnimation()
  const prefersReducedMotion = useReducedMotion()

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : delay * 0.2,
        duration: prefersReducedMotion ? 0.05 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  // Start animations when component mounts
  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set("visible")
    } else {
      const startAnimations = async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        controls.start("visible")
      }
      startAnimations()
    }
  }, [controls, prefersReducedMotion])

  return (
    <section
      id="hero"
      ref={heroInViewRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f8f8]"
    >
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            custom={0.5}
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="text-left space-y-6"
          >
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              The All-In-One System for Managing Your Property
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600">Property Management Made Easy</p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-azure-500 hover:bg-azure-600 text-white px-8 py-6 text-lg shadow-lg"
                onMouseEnter={() => onMouseEnter("button", "Schedule a Demo")}
                onMouseLeave={onMouseLeave}
                asChild
              >
                <a href={hyperlinks.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer">
                  Schedule a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Product Screenshots */}
          <motion.div
            custom={1.0}
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            {/* Background Screenshot (Back Layer) */}
            <div className="absolute top-[5%] left-[5%] w-[85%] h-[75%] bg-gradient-to-br from-azure-100 to-azure-200 rounded-2xl shadow-2xl overflow-hidden border border-white/50">
              <div className="w-full h-full bg-white/50 backdrop-blur-sm flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-azure-500/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-azure-500/40 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 font-medium">Product Screenshot 1</p>
                  <p className="text-gray-400 text-sm mt-2">Add your product image here</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-azure-300/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-azure-400/15 rounded-full blur-3xl"></div>
            </div>

            {/* Foreground Screenshot (Front Layer - overlapping) */}
            <div className="absolute bottom-[5%] right-[5%] w-[85%] h-[75%] bg-gradient-to-br from-azure-200 to-azure-300 rounded-2xl shadow-2xl overflow-hidden border-2 border-white">
              <div className="w-full h-full bg-white/60 backdrop-blur-sm flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-azure-500/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-azure-500/50 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 font-medium">Product Screenshot 2</p>
                  <p className="text-gray-500 text-sm mt-2">Add your product image here</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-azure-400/25 rounded-full blur-2xl"></div>
              <div className="absolute bottom-6 left-6 w-28 h-28 bg-azure-300/20 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8]/30 via-transparent to-transparent pointer-events-none z-[1]"></div>
    </section>
  )
}
