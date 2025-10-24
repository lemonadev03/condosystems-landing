"use client"

import type React from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            custom={0.5}
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="text-left space-y-6"
          >

            {/* Main Headline with gradient text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                The All-In-One System for Managing Your Property
              </span>
            </h1>

            {/* Subheadline with emphasis */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-600 leading-relaxed">
              We Make Property Management {" "}
              <span className="relative inline-block font-semibold text-azure-600">
                <span className="relative z-10">Easy</span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-3 bg-azure-200/50 -z-10 rounded"
                  style={{ transform: "skewY(-1deg)" }}
                ></span>
              </span>
            </p>

            {/* CTA Button with gradient */}
            <div className="pt-4 space-y-4">
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-azure-500 to-azure-600 hover:from-azure-600 hover:to-coral-500 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                onMouseEnter={() => onMouseEnter("button", "Schedule a Demo")}
                onMouseLeave={onMouseLeave}
                asChild
              >
                <a href={hyperlinks.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">Schedule a Demo</span>
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
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            {/* Background device frame (Back Layer) */}
            <motion.div
              className="absolute top-[5%] left-[5%] w-[85%] h-[75%] rounded-2xl shadow-2xl overflow-hidden border border-white/50"
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                boxShadow: "0 25px 50px -12px rgba(69, 114, 173, 0.25)",
                y: y1,
              }}
            >
              {/* TODO: Replace with your actual product screenshot */}
              {/* <Image src="/product-screenshot-1.png" alt="Dashboard Overview" fill className="object-cover" /> */}
              <div className="w-full h-full bg-white/70 backdrop-blur-sm flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-azure-500/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-azure-500/40 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 font-medium">Product Screenshot 1</p>
                  <p className="text-gray-400 text-sm mt-2">Replace with /product-screenshot-1.png</p>
                </div>
              </div>

              {/* Floating status badge */}
              <motion.div
                className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-medium text-gray-700">Live Updates</span>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-azure-300/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-azure-400/15 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Foreground device frame (Front Layer - with 3D perspective) */}
            <motion.div
              className="absolute bottom-[5%] right-[5%] w-[85%] h-[75%] rounded-2xl shadow-2xl overflow-hidden border-2 border-white"
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 30px 60px -15px rgba(69, 114, 173, 0.4)",
                y: y2,
              }}
            >
              {/* TODO: Replace with your actual product screenshot */}
              {/* <Image src="/product-screenshot-2.png" alt="Property Management Interface" fill className="object-cover" /> */}
              <div className="w-full h-full bg-white/80 backdrop-blur-sm flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-azure-500/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-azure-500/50 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 font-medium">Product Screenshot 2</p>
                  <p className="text-gray-500 text-sm mt-2">Replace with /product-screenshot-2.png</p>
                </div>
              </div>

              {/* Data visualization floating element */}
              <motion.div
                className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              >
                <div className="flex items-end gap-1">
                  <div className="w-2 h-8 bg-azure-500 rounded"></div>
                  <div className="w-2 h-12 bg-azure-400 rounded"></div>
                  <div className="w-2 h-6 bg-azure-300 rounded"></div>
                  <div className="w-2 h-14 bg-azure-500 rounded"></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">Revenue Growth</p>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-azure-400/25 rounded-full blur-2xl"></div>
              <div className="absolute bottom-6 left-6 w-28 h-28 bg-azure-300/20 rounded-full blur-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8]/30 via-transparent to-transparent pointer-events-none z-[1]"></div>
    </section>
  )
}
