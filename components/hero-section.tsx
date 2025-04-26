"use client"

import type React from "react"
import { motion, useAnimation, useScroll } from "framer-motion"
import { ArrowRight, Play, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedEZTextFont from "@/components/animated-ez-text-font"
import Image from "next/image"
import { useEffect, useState } from "react"

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
  // State for expanded image
  const [expandedImage, setExpandedImage] = useState<number | null>(null)

  // Animation controls for coordinated animations
  const controls = useAnimation()

  // Get scroll progress for parallax effects
  const { scrollYProgress } = useScroll()

  // Define floating images with their properties
  const floatingImages = [
    {
      src: "/sleek-modern-villa.png",
      alt: "Modern luxury home",
      width: 300,
      height: 200,
      position: "left-[-5%] md:left-[5%] top-[20%]",
      delay: 2.0,
      duration: 5,
      blur: "blur-sm",
      zIndex: "z-[1]",
      rotate: -2,
      parallaxFactor: 0.1,
    },
    {
      src: "/tree-lined-avenue.png",
      alt: "Beautiful neighborhood",
      width: 280,
      height: 180,
      position: "left-[5%] md:left-[10%] bottom-[15%]",
      delay: 2.1,
      duration: 5.5,
      blur: "blur-[2px]",
      zIndex: "z-[2]",
      rotate: 3,
      parallaxFactor: 0.15,
    },
    {
      src: "/open-house-tour.png",
      alt: "Real estate agent with clients",
      width: 320,
      height: 210,
      position: "right-[5%] md:right-[10%] top-[25%]",
      delay: 2.2,
      duration: 6,
      blur: "blur-[3px]",
      zIndex: "z-[1]",
      rotate: -1,
      parallaxFactor: 0.2,
    },
    {
      src: "/elegant-open-living.png",
      alt: "Luxury home interior",
      width: 260,
      height: 170,
      position: "right-[-3%] md:right-[5%] bottom-[20%]",
      delay: 2.3,
      duration: 5,
      blur: "blur-sm",
      zIndex: "z-[2]",
      rotate: 2,
      parallaxFactor: 0.12,
    },
  ]

  // Calculate parallax values outside the map function
  const parallaxValues = floatingImages.map((image, index) => {
    return {
      y: scrollYProgress.get(), // Initialize with the current scroll progress
      parallaxFactor: image.parallaxFactor,
      index: index,
    }
  })

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (delay: number) => ({
      opacity: 0.8,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hover: {
      opacity: 1,
      scale: 1.05,
      filter: "blur(0px)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 40px rgba(69, 114, 173, 0.3)",
      transition: {
        duration: 0.3,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  // Tagline animation variants
  const taglineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.8,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  // Modal variants for expanded image
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Handle image click to expand
  const handleImageClick = (index: number) => {
    setExpandedImage(index)
  }

  // Close expanded image
  const closeExpandedImage = () => {
    setExpandedImage(null)
  }

  // Start animations when component mounts
  useEffect(() => {
    const startAnimations = async () => {
      // Small delay before starting animations
      await new Promise((resolve) => setTimeout(resolve, 500))
      controls.start("visible")
    }

    startAnimations()

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      // If user prefers reduced motion, show all elements immediately
      controls.set("visible")
    }
  }, [controls])

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
      {floatingImages.map((image, index) => {
        const y = scrollYProgress.get()
        const parallaxFactor = floatingImages[index].parallaxFactor
        const parallaxOffset = parallaxFactor * 100 * (index % 2 === 0 ? -1 : 1)

        return (
          <motion.div
            key={index}
            className={`absolute ${image.position} ${image.blur} ${image.zIndex} pointer-events-none hidden sm:block`}
            custom={image.delay}
            variants={imageVariants}
            initial="hidden"
            animate={controls}
            style={{ y: y * parallaxOffset }}
          >
            <motion.div
              animate={{ y: [-15, 5, -15] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: image.duration,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
              className="rounded-2xl overflow-hidden shadow-2xl cursor-pointer pointer-events-auto"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(69, 114, 173, 0.2)",
                transform: `rotate(${image.rotate}deg)`,
              }}
              whileHover="hover"
              variants={imageVariants}
              onClick={() => handleImageClick(index)}
              onMouseEnter={() => onMouseEnter("card")}
              onMouseLeave={onMouseLeave}
            >
              <div className="relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="rounded-2xl"
                  priority={index < 2} // Prioritize loading the first two images
                />
                <div className="absolute inset-0 bg-azure-500/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white drop-shadow-lg h-8 w-8" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      })}

      <div className="container mx-auto px-4 z-10 mt-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={0.5} variants={contentVariants} initial="hidden" animate={controls}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative z-20">
              <span className="block text-gray-800 mb-2 drop-shadow-md">Real estate sales is hard, until it's</span>
              <div className="relative inline-block mt-4 px-4 mx-auto z-20">
                <AnimatedEZTextFont className="w-48 h-24 md:w-64 md:h-32 lg:w-80 lg:h-40" />
              </div>
            </h1>
          </motion.div>

          {/* More subtle tagline with gentle highlight - back to the original version */}
          <motion.div variants={taglineVariants} initial="hidden" animate="visible" className="relative z-20 mb-8">
            <div className="relative inline-block max-w-2xl">
              {/* Subtle glow behind text */}
              <div className="absolute -inset-1 bg-azure-500/10 rounded-lg blur-md"></div>

              {/* Text with subtle background */}
              <p className="relative text-xl md:text-2xl text-gray-700 bg-white/50 backdrop-blur-sm py-3 px-6 rounded-lg shadow-sm">
                Join the <span className="text-azure-600 font-medium">elite network</span> of real estate professionals
                who are <span className="text-azure-600 font-medium">redefining success</span> in the industry.
              </p>

              {/* Subtle underline */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-azure-500/30 blur-[1px]"></div>
            </div>
          </motion.div>

          <motion.div
            custom={2.0}
            variants={contentVariants}
            initial="hidden"
            animate={controls}
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

      {/* Subtle gradient overlay to enhance text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8]/50 via-transparent to-transparent pointer-events-none z-[1]"></div>

      {/* Expanded image modal */}
      {expandedImage !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-10"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={closeExpandedImage}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-azure-300 transition-colors"
              onClick={closeExpandedImage}
            >
              Close
            </button>
            <div className="bg-white p-2 rounded-xl shadow-2xl">
              <Image
                src={floatingImages[expandedImage].src || "/placeholder.svg"}
                alt={floatingImages[expandedImage].alt}
                width={floatingImages[expandedImage].width * 2}
                height={floatingImages[expandedImage].height * 2}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-white text-center mt-4">{floatingImages[expandedImage].alt}</p>
          </div>
        </motion.div>
      )}
    </section>
  )
}
