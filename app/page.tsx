"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import dynamic from "next/dynamic"

import CustomCursor from "@/components/custom-cursor"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ValuePropositionSection from "@/components/value-proposition-section"
import ValueSection from "@/components/value-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import CalculatorSection from "@/components/calculator-section"
import OutcomesSection from "@/components/outcomes-section"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import LoadingIndicator from "@/components/loading-indicator"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
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
  SHOW_VALUE_PROPOSITION: true,
  SHOW_VALUE: true,
  SHOW_FEATURES: true,
  SHOW_TESTIMONIALS: false, // Success Stories - disabled as requested
  SHOW_CALCULATOR: false, // Income Calculator - previously disabled
  SHOW_OUTCOMES: true,
  SHOW_FAQ: false,
  SHOW_CTA: true,
  SHOW_NATIONWIDE: false, // Nationwide Presence - disabled as requested
}

// Section background colors (replacing images for SaaS style)
const SECTION_COLORS = {
  VALUE_PROPOSITION: "#FDFDFD",
  VALUE: "#FAFAFA",
  FEATURES: "#FDFDFD",
  OUTCOMES: "#FAFAFA",
  FAQ: "#FDFDFD",
  CTA: "#FDFDFD",
}

// Import SmoothScroll with dynamic import to avoid SSR issues
const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"), {
  ssr: false,
})

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
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
  const [valuePropositionInViewRef, valuePropositionInView] = useInView({ threshold: 0.3 })
  const [valueInViewRef, valueInView] = useInView({ threshold: 0.3 })
  const [featuresInViewRef, featuresInView] = useInView({ threshold: 0.3 })
  const [testimonialsInViewRef, testimonialsInView] = useInView({ threshold: 0.3 })
  const [calculatorInViewRef, calculatorInView] = useInView({ threshold: 0.3 })
  const [outcomesInViewRef, outcomesInView] = useInView({ threshold: 0.3 })
  const [ctaInViewRef, ctaInView] = useInView({ threshold: 0.5 })
  const [faqInViewRef, faqInView] = useInView({ threshold: 0.3 })

  // Update active section based on which section is in view
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (valuePropositionInView) setActiveSection("value-proposition")
    else if (valueInView) setActiveSection("value")
    else if (featuresInView) setActiveSection("features")
    else if (FEATURE_FLAGS.SHOW_TESTIMONIALS && testimonialsInView) setActiveSection("testimonials")
    else if (FEATURE_FLAGS.SHOW_CALCULATOR && calculatorInView) setActiveSection("calculator")
    else if (outcomesInView) setActiveSection("outcomes")
    else if (faqInView) setActiveSection("faq")
    else if (ctaInView) setActiveSection("cta")
  }, [heroInView, valuePropositionInView, valueInView, featuresInView, testimonialsInView, calculatorInView, outcomesInView, faqInView, ctaInView])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

          {/* LAYER 1: Base gradient with subtle color variation */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(69, 114, 173, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(69, 114, 173, 0.04) 0%, transparent 50%),
                linear-gradient(180deg, #fafafa 0%, #f8f8f8 50%, #f5f5f5 100%)
              `,
            }}
          />

          {/* LAYER 2: Animated mesh gradient overlay */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(at 0% 0%, rgba(69, 114, 173, 0.08) 0%, transparent 50%)",
                "radial-gradient(at 100% 100%, rgba(69, 114, 173, 0.08) 0%, transparent 50%)",
                "radial-gradient(at 0% 0%, rgba(69, 114, 173, 0.08) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* LAYER 3: Noise texture for grain */}
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: "multiply",
            }}
          />

          {/* LAYER 4: Floating orbs for depth */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(69, 114, 173, 0.06) 0%, transparent 70%)",
                filter: "blur(60px)",
                top: "-20%",
                left: "-10%",
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(69, 114, 173, 0.04) 0%, transparent 70%)",
                filter: "blur(80px)",
                bottom: "-15%",
                right: "-5%",
              }}
              animate={{
                x: [0, -30, 0],
                y: [0, -50, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
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
                heroInViewRef={heroInViewRef}
                hyperlinks={HYPERLINKS}
              />
            )}

            {/* Value Proposition Section */}
            {FEATURE_FLAGS.SHOW_VALUE_PROPOSITION && (
              <section
                id="value-proposition"
                ref={valuePropositionInViewRef}
                className="py-20 md:py-32 min-h-screen flex items-center relative"
                style={{ backgroundColor: SECTION_COLORS.VALUE_PROPOSITION }}
              >
                {/* Radial gradient vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 0%, rgba(69, 114, 173, 0.02) 100%)",
                  }}
                />
                <ValuePropositionSection
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  valuePropositionInViewRef={() => {}}
                />
              </section>
            )}

            {/* Value Section */}
            {FEATURE_FLAGS.SHOW_VALUE && (
              <section
                id="value"
                ref={valueInViewRef}
                className="py-20 md:py-32 min-h-screen flex items-center"
                style={{ backgroundColor: SECTION_COLORS.VALUE }}
              >
                <div className="container mx-auto px-4 w-full">
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
              </section>
            )}

            {/* Features Section */}
            {FEATURE_FLAGS.SHOW_FEATURES && (
              <section
                id="features"
                ref={featuresInViewRef}
                className="py-20 md:py-32 min-h-screen flex items-center relative"
                style={{ backgroundColor: SECTION_COLORS.FEATURES }}
              >
                {/* Subtle geometric texture */}
                <div
                  className="absolute inset-0 opacity-[0.015]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(69, 114, 173, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(69, 114, 173, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                  }}
                />
                <div className="container mx-auto px-4 w-full">
                  <FeaturesSection featuresInViewRef={() => {}} />
                </div>
              </section>
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

            {/* Outcomes Section */}
            {FEATURE_FLAGS.SHOW_OUTCOMES && (
              <section
                id="outcomes"
                ref={outcomesInViewRef}
                className="py-20 md:py-32 min-h-screen flex items-center relative"
                style={{ backgroundColor: SECTION_COLORS.OUTCOMES }}
              >
                {/* Gradient accent overlay */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, rgba(69, 114, 173, 0.08) 0%, transparent 50%)",
                  }}
                />
                <div className="container mx-auto px-4 w-full">
                  <OutcomesSection outcomesInViewRef={() => {}} />
                </div>
              </section>
            )}

            {/* FAQ Section */}
            {FEATURE_FLAGS.SHOW_FAQ && (
              <section
                id="faq"
                ref={faqInViewRef}
                className="py-20 md:py-32 min-h-screen flex items-center"
                style={{ backgroundColor: SECTION_COLORS.FAQ }}
              >
                <div className="container mx-auto px-4 w-full">
                  <FAQSection
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    hyperlinks={HYPERLINKS}
                    useBlueHeader={true}
                  />
                </div>
              </section>
            )}

            {/* CTA Section */}
            {FEATURE_FLAGS.SHOW_CTA && (
              <section
                id="cta"
                ref={ctaInViewRef}
                className="py-20 md:py-32 min-h-screen flex items-center"
                style={{ backgroundColor: SECTION_COLORS.CTA }}
              >
                <div className="container mx-auto px-4 w-full">
                  <CTASection
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ctaInViewRef={() => {}}
                    showMoreBackground={true}
                    hyperlinks={HYPERLINKS}
                    useBlueHeader={true}
                  />
                </div>
              </section>
            )}
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </>
  )
}
