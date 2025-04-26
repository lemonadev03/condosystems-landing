"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, DollarSign, Home, Play, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedEZTextFont from "@/components/animated-ez-text-font"

interface HeroSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  scrollToSection: (sectionId: string) => void
  videoRef: React.RefObject<HTMLVideoElement>
  isVideoPlaying: boolean
  handleVideoPlay: () => void
  heroInViewRef: (node: Element | null) => void
}

export default function HeroSection({
  onMouseEnter,
  onMouseLeave,
  scrollToSection,
  videoRef,
  isVideoPlaying,
  handleVideoPlay,
  heroInViewRef,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      ref={heroInViewRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f8f8]"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-30" loop muted playsInline>
          <source src="/placeholder.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f8]/70 via-[#f8f8f8]/50 to-[#f8f8f8]/70"></div>

        <button
          className="absolute bottom-8 right-8 z-10 bg-[#407140]/20 backdrop-blur-sm p-3 rounded-full hover:bg-[#407140]/30 transition-colors"
          onClick={handleVideoPlay}
          onMouseEnter={() => onMouseEnter("button", isVideoPlaying ? "Pause" : "Play")}
          onMouseLeave={onMouseLeave}
        >
          <Play className="h-6 w-6 text-[#407140]" />
        </button>
      </div>

      <div className="container mx-auto px-4 z-10 mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-gray-800 mb-2">Real estate sales is hard, until it's</span>
              <div className="relative inline-block mt-4 px-4 mx-auto">
                <AnimatedEZTextFont className="w-48 h-24 md:w-64 md:h-32 lg:w-80 lg:h-40" />
              </div>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }} // Delay increased to wait for EZ animation
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Join the elite network of real estate professionals who are redefining success in the industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }} // Delay increased to wait for EZ animation
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-[#407140] hover:bg-[#345934] text-white px-8 py-6 text-lg"
              onMouseEnter={() => onMouseEnter("button", "Get Started")}
              onMouseLeave={onMouseLeave}
              onClick={() => scrollToSection("cta")}
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-[#407140] text-[#407140] hover:bg-[#407140]/10 px-8 py-6 text-lg"
              onMouseEnter={() => onMouseEnter("button", "Learn More")}
              onMouseLeave={onMouseLeave}
              onClick={() => scrollToSection("value")}
            >
              Discover Benefits
            </Button>
          </motion.div>
        </div>

        {/* Floating 3D elements with improved animations */}
        <motion.div
          className="absolute top-1/4 left-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [-20, 0, -20] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
          >
            <Home className="h-16 w-16 text-[#407140]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [-20, 0, -20] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
          >
            <DollarSign className="h-16 w-16 text-[#407140]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 3.6, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [-15, 0, -15] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 7, ease: "easeInOut" }}
          >
            <Users className="h-16 w-16 text-[#407140]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
