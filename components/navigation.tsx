"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

type NavigationProps = {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  scrollToSection: (sectionId: string) => void
  activeSection: string
  featureFlags?: {
    SHOW_HERO: boolean
    SHOW_VALUE_PROPOSITION: boolean
    SHOW_VALUE: boolean
    SHOW_FEATURES: boolean
    SHOW_TESTIMONIALS: boolean
    SHOW_CALCULATOR: boolean
    SHOW_OUTCOMES: boolean
    SHOW_FAQ: boolean
    SHOW_CTA: boolean
    SHOW_NATIONWIDE: boolean
  }
  hyperlinks?: Record<string, string>
}

export default function Navigation({
  onMouseEnter,
  onMouseLeave,
  scrollToSection,
  activeSection,
  featureFlags = {
    SHOW_HERO: true,
    SHOW_VALUE_PROPOSITION: true,
    SHOW_VALUE: true,
    SHOW_FEATURES: true,
    SHOW_TESTIMONIALS: true,
    SHOW_CALCULATOR: true,
    SHOW_OUTCOMES: true,
    SHOW_FAQ: true,
    SHOW_CTA: true,
    SHOW_NATIONWIDE: true,
  },
  hyperlinks,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Check if scrolled past threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when section is clicked
  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  // Navigation items based on feature flags
  const navigationItems = [
    { id: "hero", label: "Home", enabled: featureFlags.SHOW_HERO },
    { id: "value-proposition", label: "Value Proposition", enabled: featureFlags.SHOW_VALUE_PROPOSITION },
    { id: "value", label: "Benefits", enabled: featureFlags.SHOW_VALUE },
    { id: "features", label: "Features", enabled: featureFlags.SHOW_FEATURES },
    { id: "testimonials", label: "Success Stories", enabled: featureFlags.SHOW_TESTIMONIALS },
    { id: "calculator", label: "Earnings", enabled: featureFlags.SHOW_CALCULATOR },
    { id: "outcomes", label: "Outcomes", enabled: featureFlags.SHOW_OUTCOMES },
    { id: "faq", label: "FAQ", enabled: featureFlags.SHOW_FAQ },
  ]

  // Filter out disabled navigation items
  const enabledNavigationItems = navigationItems.filter((item) => item.enabled)

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-5" : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onMouseEnter={() => onMouseEnter("logo")}
            onMouseLeave={onMouseLeave}
          >
            <div className="relative h-10 w-48 md:h-12 md:w-56">
              <Image
                src="/condo-systems-text.png"
                alt="Condo Systems"
                fill
                sizes="(max-width: 768px) 192px, 224px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a
              href={hyperlinks?.SCHEDULE_CALL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-azure-500 text-white rounded-md text-sm font-medium hover:bg-azure-600 transition-colors"
              onMouseEnter={() => onMouseEnter("button", "Book a Demo")}
              onMouseLeave={onMouseLeave}
            >
              Book a Demo
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              <a
                href={hyperlinks?.SCHEDULE_CALL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-azure-500 text-white rounded-md text-center hover:bg-azure-600 transition-colors"
              >
                Book a Demo
              </a>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
    </>
  )
}
