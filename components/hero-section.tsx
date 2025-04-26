"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, DollarSign, Home, Play, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

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
                <motion.span
                  className="text-[#407140] text-6xl md:text-8xl lg:text-9xl italic relative z-10 tracking-wider inline-block"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.3,
                  }}
                >
                  EZ
                </motion.span>
                <div className="absolute h-6 md:h-8 bg-[#407140]/20 left-0 right-0 bottom-4 md:bottom-6 -rotate-2 z-0 transform-gpu"></div>
                <div className="absolute h-2 md:h-3 bg-[#407140] left-0 right-0 bottom-6 md:bottom-8 -rotate-1 z-0 transform-gpu"></div>
                <motion.div
                  className="absolute h-1 md:h-2 bg-[#407140]/60 left-0 right-0 bottom-5 md:bottom-7 rotate-1 z-0 transform-gpu"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Join the elite network of real estate professionals who are redefining success in the industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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

        {/* Floating 3D elements */}
        <div className="absolute top-1/4 left-10 animate-float-slow opacity-60">
          <Home className="h-16 w-16 text-[#407140]" />
        </div>
        <div className="absolute bottom-1/4 right-10 animate-float opacity-60">
          <DollarSign className="h-16 w-16 text-[#407140]" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-medium opacity-60">
          <Users className="h-16 w-16 text-[#407140]" />
        </div>
      </div>
    </section>
  )
}
