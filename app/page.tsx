"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"

import CustomCursor from "@/components/custom-cursor"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ValueSection from "@/components/value-section"
import ProcessSection from "@/components/process-section"
import TestimonialsSection from "@/components/testimonials-section"
import CalculatorSection from "@/components/calculator-section"
import QuizSection from "@/components/quiz-section"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Refs for each section to track active section
  const heroRef = useRef(null)
  const valueRef = useRef(null)
  const processRef = useRef(null)
  const testimonialsRef = useRef(null)
  const calculatorRef = useRef(null)
  const quizRef = useRef(null)
  const ctaRef = useRef(null)

  // Scroll progress for gradient background
  const { scrollYProgress } = useScroll()
  const backgroundGreen = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["hsl(120, 28%, 15%)", "hsl(120, 28%, 20%)", "hsl(120, 28%, 25%)"],
  )

  // Counter animation values
  const count1 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1250])
  const count2 = useTransform(scrollYProgress, [0.3, 0.4], [0, 87])
  const count3 = useTransform(scrollYProgress, [0.3, 0.4], [0, 32])

  // Intersection observers for sections
  const [heroInViewRef, heroInView] = useInView({ threshold: 0.5 })
  const [valueInViewRef, valueInView] = useInView({ threshold: 0.3 })
  const [processInViewRef, processInView] = useInView({ threshold: 0.3 })
  const [testimonialsInViewRef, testimonialsInView] = useInView({ threshold: 0.3 })
  const [calculatorInViewRef, calculatorInView] = useInView({ threshold: 0.3 })
  const [quizInViewRef, quizInView] = useInView({ threshold: 0.3 })
  const [ctaInViewRef, ctaInView] = useInView({ threshold: 0.5 })

  // Update active section based on which section is in view
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (valueInView) setActiveSection("value")
    else if (processInView) setActiveSection("process")
    else if (testimonialsInView) setActiveSection("testimonials")
    else if (calculatorInView) setActiveSection("calculator")
    else if (quizInView) setActiveSection("quiz")
    else if (ctaInView) setActiveSection("cta")
  }, [heroInView, valueInView, processInView, testimonialsInView, calculatorInView, quizInView, ctaInView])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle video play/pause
  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  // Cursor handlers
  const handleMouseEnter = (variant: string, text = "") => {
    setCursorVariant(variant)
    setCursorText(text)
  }

  const handleMouseLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f8f8] font-sans">
      <CustomCursor variant={cursorVariant} text={cursorText} />

      {/* Background gradient overlay that changes with scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(135deg, ${backgroundGreen}, transparent)`,
          zIndex: 0,
        }}
      />

      {/* Subtle geometric patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/Interlocking Dimensions.png')] bg-repeat"></div>
      </div>

      {/* Navigation */}
      <Navigation
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          scrollToSection={scrollToSection}
          videoRef={videoRef}
          isVideoPlaying={isVideoPlaying}
          handleVideoPlay={handleVideoPlay}
          heroInViewRef={heroInViewRef}
        />

        {/* Value Proposition Section */}
        <ValueSection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} valueInViewRef={valueInViewRef} />

        {/* Process Section */}
        <ProcessSection processInViewRef={processInViewRef} />

        {/* Testimonials Section */}
        <TestimonialsSection
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          scrollToSection={scrollToSection}
          testimonialsInViewRef={testimonialsInViewRef}
          count1={count1}
          count2={count2}
          count3={count3}
        />

        {/* Income Calculator Section */}
        <CalculatorSection
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          calculatorInViewRef={calculatorInViewRef}
        />

        {/* Agent Type Quiz Section */}
        <QuizSection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} quizInViewRef={quizInViewRef} />

        {/* FAQ Section */}
        <FAQSection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />

        {/* CTA Section */}
        <CTASection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ctaInViewRef={ctaInViewRef} />
      </main>

      <Footer />
    </div>
  )
}
