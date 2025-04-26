"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedEZTextFont from "@/components/animated-ez-text-font"
import Image from "next/image"

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
  // Define floating images with their properties
  const floatingImages = [
    {
      src: "/sleek-modern-villa.png",
      alt: "Modern luxury home",
      width: 300,
      height: 200,
      position: "left-[-5%] top-[20%]",
      delay: 3.2,
      duration: 6,
      blur: "blur-sm",
      zIndex: "z-[1]",
    },
    {
      src: "/tree-lined-avenue.png",
      alt: "Beautiful neighborhood",
      width: 280,
      height: 180,
      position: "left-[5%] bottom-[15%]",
      delay: 3.4,
      duration: 7,
      blur: "blur-[2px]",
      zIndex: "z-[2]",
    },
    {
      src: "/open-house-tour.png",
      alt: "Real estate agent with clients",
      width: 320,
      height: 210,
      position: "right-[5%] top-[25%]",
      delay: 3.6,
      duration: 8,
      blur: "blur-[3px]",
      zIndex: "z-[1]",
    },
    {
      src: "/elegant-open-living.png",
      alt: "Luxury home interior",
      width: 260,
      height: 170,
      position: "right-[-3%] bottom-[20%]",
      delay: 3.8,
      duration: 6.5,
      blur: "blur-sm",
      zIndex: "z-[2]",
    },
  ]

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
          className="absolute bottom-8 right-8 z-10 bg-azure-500/20 backdrop-blur-sm p-3 rounded-full hover:bg-azure-500/30 transition-colors"
          onClick={handleVideoPlay}
          onMouseEnter={() => onMouseEnter("button", isVideoPlaying ? "Pause" : "Play")}
          onMouseLeave={onMouseLeave}
        >
          <Play className="h-6 w-6 text-azure-500" />
        </button>
      </div>

      {/* Floating Images */}
      {floatingImages.map((image, index) => (
        <motion.div
          key={index}
          className={`absolute ${image.position} ${image.blur} ${image.zIndex} pointer-events-none`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: image.delay, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [-15, 5, -15] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: image.duration,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(69, 114, 173, 0.2)",
              transform: `rotate(${Math.random() * 6 - 3}deg)`,
            }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="rounded-2xl"
            />
          </motion.div>
        </motion.div>
      ))}

      <div className="container mx-auto px-4 z-10 mt-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative z-20">
              <span className="block text-gray-800 mb-2 drop-shadow-md">Real estate sales is hard, until it's</span>
              <div className="relative inline-block mt-4 px-4 mx-auto z-20">
                <AnimatedEZTextFont className="w-48 h-24 md:w-64 md:h-32 lg:w-80 lg:h-40" />
              </div>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }} // Delay increased to wait for EZ animation
            className="text-xl md:text-2xl text-gray-600 mb-8 relative z-20 drop-shadow-md"
          >
            Join the elite network of real estate professionals who are redefining success in the industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }} // Delay increased to wait for EZ animation
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-20"
          >
            <Button
              size="lg"
              className="bg-azure-500 hover:bg-azure-600 text-white px-8 py-6 text-lg shadow-lg"
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
              className="border-azure-500 text-azure-500 hover:bg-azure-500/10 px-8 py-6 text-lg shadow-md"
              onMouseEnter={() => onMouseEnter("button", "Learn More")}
              onMouseLeave={onMouseLeave}
              onClick={() => scrollToSection("value")}
            >
              Discover Benefits
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
