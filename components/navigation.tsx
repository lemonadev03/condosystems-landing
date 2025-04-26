"use client"

import { motion } from "framer-motion"
import { Building2 } from "lucide-react"
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
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-[#407140]" />
          <span className="text-xl font-bold text-[#407140]">EZ BIG Realty</span>
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
                "text-sm font-medium relative px-1 py-2 text-gray-600 hover:text-[#407140] transition-colors",
                activeSection === item.id && "text-[#407140]",
              )}
              onMouseEnter={() => onMouseEnter("link")}
              onMouseLeave={onMouseLeave}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="activeSection" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#407140]" />
              )}
            </button>
          ))}
        </nav>

        <Button
          className="bg-[#407140] hover:bg-[#345934] text-white"
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
