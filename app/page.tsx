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
import LoadingIndicator from "@/components/loading-indicator"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import SectionBackground from "@/components/section-background"
import SectionHeader from "@/components/section-header"

// Hyperlinks - centralized for easy management
const HYPERLINKS = {
  JOIN_EZBIG: "https://onboarding.ezbig.com",
  SIGN_IN: "https://signin.ezbig.com",
  SCHEDULE_CALL: "https://calendly.com/ezbig/intro",
  FACEBOOK: "https://facebook.com/ezbig",
  TWITTER: "https://twitter.com/ezbig",
  INSTAGRAM: "https://instagram.com/ezbig",
  LINKEDIN: "https://linkedin.com/company/ezbig",
  YOUTUBE: "https://youtube.com/c/ezbig",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  COOKIE_POLICY: "/cookie-policy",
  GDPR: "/gdpr",
  LICENSING: "/licensing",
  ABOUT_US: "/about-us",
  OUR_TEAM: "/our-team",
  CAREERS: "/careers",
  PRESS: "/press",
  CONTACT: "/contact",
  BLOG: "/blog",
  AGENT_RESOURCES: "/agent-resources",
  TRAINING: "/training",
  EVENTS: "/events",
  FAQ: "/faq",
}

// Feature flags - toggle these to enable/disable sections during development
const FEATURE_FLAGS = {
  SHOW_HERO: true,
  SHOW_VALUE: true,
  SHOW_PROCESS: true,
  SHOW_TESTIMONIALS: false, // Success Stories - disabled as requested
  SHOW_CALCULATOR: false, // Income Calculator - previously disabled
  SHOW_QUIZ: true,
  SHOW_FAQ: true,
  SHOW_CTA: true,
  SHOW_NATIONWIDE: false, // Nationwide Presence - disabled as requested
}

// Background images for sections
const SECTION_BACKGROUNDS = {
  VALUE: "/elegant-open-living.png",
  PROCESS: "/sleek-modern-villa.png",
  TESTIMONIALS: "/confident-agent-handshake.png",
  CALCULATOR: "/collaborative-strategy.png",
  QUIZ: "/tree-lined-avenue.png",
  FAQ: "/open-house-tour.png",
  CTA: "/real-estate-workshop.png",
}

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
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Handle initial loading
  useEffect(() => {
    // Set loading to false after a very short delay
    const timer = setTimeout(
      () => {
        setIsLoading(false)
      },
      prefersReducedMotion ? 50 : 150,
    )

    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  // Scroll progress for gradient background
  const { scrollYProgress } = useScroll()
  const backgroundBlue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["hsl(215, 47%, 15%)", "hsl(215, 47%, 20%)", "hsl(215, 47%, 25%)"],
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
    else if (FEATURE_FLAGS.SHOW_TESTIMONIALS && testimonialsInView) setActiveSection("testimonials")
    else if (FEATURE_FLAGS.SHOW_CALCULATOR && calculatorInView) setActiveSection("calculator")
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
        duration: prefersReducedMotion ? 0.25 : 0.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      // Fallback to default scrolling
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
      }
    }
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      <SmoothScroll>
        <div className="relative overflow-hidden bg-[#f8f8f8] font-sans">
          <CustomCursor variant={cursorVariant} text={cursorText} />

          {/* Background gradient overlay that changes with scroll */}
          <motion.div
            className="fixed inset-0 pointer-events-none opacity-10"
            style={{
              background: `linear-gradient(135deg, ${backgroundBlue}, transparent)`,
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
            featureFlags={FEATURE_FLAGS}
            hyperlinks={HYPERLINKS}
          />

          <main className="relative">
            {/* Hero Section */}
            {FEATURE_FLAGS.SHOW_HERO && (
              <HeroSection
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                scrollToSection={scrollToSection}
                videoRef={videoRef}
                isVideoPlaying={isVideoPlaying}
                handleVideoPlay={handleVideoPlay}
                heroInViewRef={heroInViewRef}
                hyperlinks={HYPERLINKS}
              />
            )}

            {/* Value Proposition Section */}
            {FEATURE_FLAGS.SHOW_VALUE && (
              <SectionBackground
                imageSrc={SECTION_BACKGROUNDS.VALUE}
                alt="Elegant open living space"
                overlayOpacity={0.92}
                fixedBackground={true}
              >
                <motion.section
                  id="value"
                  ref={valueInViewRef}
                  className="py-20 md:py-32"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="container mx-auto px-4">
                    <SectionHeader
                      title={
                        <>
                          Why Top Agents Choose <span className="text-white">EZ BIG</span>
                        </>
                      }
                      subtitle="We've reimagined the real estate affiliate experience to maximize your potential and elevate your career."
                    />
                    <ValueSection
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      valueInViewRef={() => {}}
                      showNationwide={FEATURE_FLAGS.SHOW_NATIONWIDE}
                      hyperlinks={HYPERLINKS}
                    />
                  </div>
                </motion.section>
              </SectionBackground>
            )}

            {/* Process Section */}
            {FEATURE_FLAGS.SHOW_PROCESS && (
              <SectionBackground
                imageSrc={SECTION_BACKGROUNDS.PROCESS}
                alt="Sleek modern villa"
                overlayOpacity={0.9}
                fixedBackground={true}
              >
                <motion.section
                  id="process"
                  ref={processInViewRef}
                  className="py-20 md:py-32"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="container mx-auto px-4">
                    <ProcessSection processInViewRef={() => {}} hyperlinks={HYPERLINKS} />
                  </div>
                </motion.section>
              </SectionBackground>
            )}

            {/* Testimonials Section */}
            {FEATURE_FLAGS.SHOW_TESTIMONIALS && (
              <SectionBackground
                imageSrc={SECTION_BACKGROUNDS.TESTIMONIALS}
                alt="Confident agent handshake"
                overlayOpacity={0.92}
              >
                <motion.section
                  id="testimonials"
                  ref={testimonialsInViewRef}
                  className="py-20 md:py-32"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                      hyperlinks={HYPERLINKS}
                    />
                  </div>
                </motion.section>
              </SectionBackground>
            )}

            {/* Income Calculator Section */}
            {FEATURE_FLAGS.SHOW_CALCULATOR && (
              <SectionBackground
                imageSrc={SECTION_BACKGROUNDS.CALCULATOR}
                alt="Collaborative strategy session"
                overlayOpacity={0.9}
              >
                <motion.section
                  id="calculator"
                  ref={calculatorInViewRef}
                  className="py-20 md:py-32"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="container mx-auto px-4">
                    <CalculatorSection
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      calculatorInViewRef={() => {}}
                      hyperlinks={HYPERLINKS}
                    />
                  </div>
                </motion.section>
              </SectionBackground>
            )}

            {/* Agent Type Quiz Section */}
            {FEATURE_FLAGS.SHOW_QUIZ && (
              <SectionBackground
                imageSrc={SECTION_BACKGROUNDS.QUIZ}
                alt="Tree lined avenue"
                overlayOpacity={0.75}
                blurAmount="5px"
                fixedBackground={true}
              >
                <motion.section
                  id="quiz"
                  ref={quizInViewRef}
                  className="py-20 md:py-32"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="container mx-auto px-4">
                    <QuizSection
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      quizInViewRef={() => {}}
                      hyperlinks={HYPERLINKS}
                      useBlueHeader={true}
                    />
                  </div>
                </motion.section>
              </SectionBackground>
            )}

            {/* FAQ Section */}
            {FEATURE_FLAGS.SHOW_FAQ && (
              <SectionBackground
                imageSrc={SECTION_BACKGROUNDS.FAQ}
                alt="Open house tour"
                overlayOpacity={0.9}
                fixedBackground={true}
              >
                <motion.section
                  id="faq"
                  ref={faqInViewRef}
                  className="py-20 md:py-32"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="container mx-auto px-4">
                    <FAQSection
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      hyperlinks={HYPERLINKS}
                      useBlueHeader={true}
                    />
                  </div>
                </motion.section>
              </SectionBackground>
            )}

            {/* CTA Section */}
            {FEATURE_FLAGS.SHOW_CTA && (
              <SectionBackground
                imageSrc={SECTION_BACKGROUNDS.CTA}
                alt="Real estate workshop"
                overlayOpacity={0.65}
                blurAmount="5px"
                fixedBackground={true}
              >
                <motion.section
                  id="cta"
                  ref={ctaInViewRef}
                  className="py-20 md:py-32"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="container mx-auto px-4">
                    <CTASection
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      ctaInViewRef={() => {}}
                      showMoreBackground={true}
                      hyperlinks={HYPERLINKS}
                      useBlueHeader={true}
                    />
                  </div>
                </motion.section>
              </SectionBackground>
            )}
          </main>

          <Footer hyperlinks={HYPERLINKS} />
        </div>
      </SmoothScroll>
    </>
  )
}
