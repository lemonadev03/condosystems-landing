"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import dynamic from "next/dynamic"

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

// Import SmoothScroll with dynamic import to avoid SSR issues
const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"), {
  ssr: false,
})

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const videoRef = useRef<HTMLVideoElement>(null)

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
  const [faqInViewRef, faqInView] = useInView({ threshold: 0.3 })

  // Update active section based on which section is in view
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (valueInView) setActiveSection("value")
    else if (processInView) setActiveSection("process")
    else if (testimonialsInView) setActiveSection("testimonials")
    else if (calculatorInView) setActiveSection("calculator")
    else if (quizInView) setActiveSection("quiz")
    else if (faqInView) setActiveSection("faq")
    else if (ctaInView) setActiveSection("cta")
  }, [heroInView, valueInView, processInView, testimonialsInView, calculatorInView, quizInView, faqInView, ctaInView])

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

  // Scroll to section - modified to work with Lenis
  const scrollToSection = (sectionId: string) => {
    // @ts-ignore - Lenis is added to window in SmoothScroll component
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(document.getElementById(sectionId), {
        offset: 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      // Fallback to default scrolling
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <SmoothScroll>
      <div className="relative overflow-hidden bg-[#f8f8f8] font-sans">
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

        <main className="relative">
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
          <motion.section
            id="value"
            ref={valueInViewRef}
            className="py-20 md:py-32 bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
                >
                  Why Top Agents Choose <span className="text-[#407140]">EZ BIG</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-gray-600"
                >
                  We've reimagined the real estate affiliate experience to maximize your potential and elevate your
                  career.
                </motion.p>
              </div>
              <ValueSection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} valueInViewRef={() => {}} />
            </div>
          </motion.section>

          {/* Process Section */}
          <motion.section
            id="process"
            ref={processInViewRef}
            className="py-20 md:py-32 bg-[#f8f8f8]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-4">
              <ProcessSection processInViewRef={() => {}} />
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
            id="testimonials"
            ref={testimonialsInViewRef}
            className="py-20 md:py-32 bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-4">
              <TestimonialsSection
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                scrollToSection={scrollToSection}
                testimonialsInViewRef={() => {}}
                count1={count1}
                count2={count2}
                count3={count3}
              />
            </div>
          </motion.section>

          {/* Income Calculator Section */}
          <motion.section
            id="calculator"
            ref={calculatorInViewRef}
            className="py-20 md:py-32 bg-[#f8f8f8]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-4">
              <CalculatorSection
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                calculatorInViewRef={() => {}}
              />
            </div>
          </motion.section>

          {/* Agent Type Quiz Section */}
          <motion.section
            id="quiz"
            ref={quizInViewRef}
            className="py-20 md:py-32 bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-4">
              <QuizSection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} quizInViewRef={() => {}} />
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            id="faq"
            ref={faqInViewRef}
            className="py-20 md:py-32 bg-[#f8f8f8]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-4">
              <FAQSection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            id="cta"
            ref={ctaInViewRef}
            className="py-20 md:py-32 bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-4">
              <CTASection onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ctaInViewRef={() => {}} />
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
