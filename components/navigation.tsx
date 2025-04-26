"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  scrollToSection: (sectionId: string) => void
  activeSection: string
}

export default function Navigation({ onMouseEnter, onMouseLeave, scrollToSection, activeSection }: NavigationProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f8f8]/90 backdrop-blur-xl shadow-md border-b border-gray-200/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/ez-big-realty-logo.png"
            alt="EZ BIG Realty Logo"
            width={150}
            height={40}
            className="h-auto"
            priority
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: "hero", label: "Home" },
            { id: "value", label: "Benefits" },
            { id: "process", label: "Journey" },
            { id: "testimonials", label: "Success Stories" },
            { id: "calculator", label: "Earnings" },
            { id: "quiz", label: "Find Your Fit" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm font-medium relative px-1 py-2 text-gray-600 hover:text-azure-500 transition-colors",
                activeSection === item.id && "text-azure-500",
              )}
              onMouseEnter={() => onMouseEnter("link")}
              onMouseLeave={onMouseLeave}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="activeSection" className="absolute bottom-0 left-0 right-0 h-0.5 bg-azure-500" />
              )}
            </button>
          ))}
        </nav>

        <Button
          className="bg-azure-500 hover:bg-azure-600 text-white"
          onMouseEnter={() => onMouseEnter("button", "Join Now")}
          onMouseLeave={onMouseLeave}
          onClick={() => scrollToSection("cta")}
        >
          Join Our Team
        </Button>
      </div>
    </header>
  )
}
