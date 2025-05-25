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
    SHOW_VALUE: boolean
    SHOW_PROCESS: boolean
    SHOW_TESTIMONIALS: boolean
    SHOW_CALCULATOR: boolean
    SHOW_QUIZ: boolean
    SHOW_FAQ: boolean
    SHOW_CTA: boolean
    SHOW_NATIONWIDE: boolean
  }
}

export default function Navigation({
  onMouseEnter,
  onMouseLeave,
  scrollToSection,
  activeSection,
  featureFlags = {
    SHOW_HERO: true,
    SHOW_VALUE: true,
    SHOW_PROCESS: true,
    SHOW_TESTIMONIALS: true,
    SHOW_CALCULATOR: true,
    SHOW_QUIZ: true,
    SHOW_FAQ: true,
    SHOW_CTA: true,
    SHOW_NATIONWIDE: true,
  },
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
    { id: "value", label: "Benefits", enabled: featureFlags.SHOW_VALUE },
    { id: "process", label: "Journey", enabled: featureFlags.SHOW_PROCESS },
    { id: "testimonials", label: "Success Stories", enabled: featureFlags.SHOW_TESTIMONIALS },
    { id: "calculator", label: "Earnings", enabled: featureFlags.SHOW_CALCULATOR },
    { id: "quiz", label: "Find Your Fit", enabled: featureFlags.SHOW_QUIZ },
    { id: "faq", label: "FAQ", enabled: featureFlags.SHOW_FAQ },
  ]

  // Filter out disabled navigation items
  const enabledNavigationItems = navigationItems.filter((item) => item.enabled)

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
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
            <div className="relative h-10 w-32 md:h-12 md:w-40">
              <Image
                src="/ez-big-banner-logo.png"
                alt="EZ BIG"
                fill
                sizes="(max-width: 768px) 128px, 160px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {enabledNavigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-azure-600 bg-azure-50"
                    : "text-gray-700 hover:text-azure-600 hover:bg-gray-100"
                }`}
                onMouseEnter={() => onMouseEnter("link", item.label)}
                onMouseLeave={onMouseLeave}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("cta")}
              className="ml-2 px-4 py-2 bg-azure-500 text-white rounded-md text-sm font-medium hover:bg-azure-600 transition-colors"
              onMouseEnter={() => onMouseEnter("button", "Sign Up Now")}
              onMouseLeave={onMouseLeave}
            >
              Sign Up Now
            </button>
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
              {enabledNavigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`px-4 py-2 rounded-md text-left ${
                    activeSection === item.id
                      ? "text-azure-600 bg-azure-50"
                      : "text-gray-700 hover:text-azure-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollToSection("cta")
                  setIsMenuOpen(false)
                }}
                className="px-4 py-2 bg-azure-500 text-white rounded-md text-center hover:bg-azure-600 transition-colors"
              >
                Sign Up Now
              </button>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
