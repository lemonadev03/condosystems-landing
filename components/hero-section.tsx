"use client"

import type React from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
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

  // Parallax scroll effects
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 150])
  const y2 = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 80])

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
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-center justify-items-center lg:justify-items-start max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            custom={0.5}
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="text-left space-y-6"
          >

            {/* Main Headline with gradient text */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                The All-In-One System for Managing Your Property
              </span>
            </h1>

            {/* Subheadline with emphasis */}
            <p className="text-lg md:text-xl lg:text-xl font-light text-gray-600 leading-relaxed">
              We Make Property Management {" "}
              <span className="relative inline-block font-semibold text-azure-600">
                <span className="relative z-10">Easy</span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-3 bg-azure-200/50 -z-10 rounded"
                  style={{ transform: "skewY(-1deg)" }}
                ></span>
              </span>
            </p>

            {/* CTA Button */}
            <div className="pt-4 space-y-4">
              <Button
                size="lg"
                className="bg-azure-500 hover:bg-azure-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                onMouseEnter={() => onMouseEnter("button", "Book a Demo")}
                onMouseLeave={onMouseLeave}
                asChild
              >
                <a href={hyperlinks.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              {/* Social proof */}
              {/* <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-azure-400 to-azure-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p>
                  <span className="font-semibold text-gray-800">2,500+</span> property managers joined this month
                </p>
              </div> */}
            </div>
          </motion.div>

          {/* Right Column - Product Screenshots */}
          <motion.div
            custom={1.0}
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="relative w-full"
            style={{ aspectRatio: "auto" }}
          >
            {/* Desktop: Absolute positioning layout */}
            <div className="hidden lg:block relative w-full" style={{ aspectRatio: "3024 / 1794" }}>
              {/* Background Image with Glow */}
              <motion.div
                className="absolute top-[5%] left-[-5%] w-[100%] h-[100%] rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ y: y1 }}
              >
                <Image src="/hero/hero-2.png" alt="Dashboard Overview" fill className="object-cover" />
                {/* Background Glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 w-24 h-24 bg-azure-300/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-azure-400/15 rounded-full blur-3xl"></div>
                </div>
              </motion.div>

              {/* Foreground Image with Glow */}
              <motion.div
                className="absolute bottom-[5%] right-[10%] w-[100%] h-[100%] rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ y: y2 }}
              >
                <Image src="/hero/hero-1.png" alt="Property Management Interface" fill className="object-cover" priority />
                {/* Foreground Glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-6 right-6 w-20 h-20 bg-azure-400/25 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-6 left-6 w-28 h-28 bg-azure-300/20 rounded-full blur-3xl"></div>
                </div>
              </motion.div>
            </div>

            {/* Mobile: Layered layout with container */}
            <div className="lg:hidden relative" style={{ width: "85%", aspectRatio: "3024 / 1794", margin: "0 auto" }}>
              {/* Background Image with Glow */}
              <motion.div
                className="absolute top-[5%] left-[-5%] w-[100%] h-[100%] rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ y: y1 }}
              >
                <Image src="/hero/hero-2.png" alt="Dashboard Overview" fill className="object-cover" />
                {/* Background Glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-azure-300/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-azure-400/15 rounded-full blur-3xl"></div>
                </div>
              </motion.div>

              {/* Foreground Image with Glow */}
              <motion.div
                className="absolute bottom-[5%] right-[10%] w-[100%] h-[100%] rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ y: y2 }}
              >
                <Image src="/hero/hero-1.png" alt="Property Management Interface" fill className="object-cover" priority />
                {/* Foreground Glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-azure-400/25 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-azure-300/20 rounded-full blur-3xl"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8]/30 via-transparent to-transparent pointer-events-none z-[1]"></div>
    </section>
  )
}
