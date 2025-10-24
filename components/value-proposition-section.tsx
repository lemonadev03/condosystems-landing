"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import SectionHeader from "./section-header"

interface ValuePropositionSectionProps {
  onMouseEnter?: (variant: string, text?: string) => void
  onMouseLeave?: () => void
  valuePropositionInViewRef: (node: Element | null) => void
}

export default function ValuePropositionSection({
  onMouseEnter,
  onMouseLeave,
  valuePropositionInViewRef,
}: ValuePropositionSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="value-proposition" ref={valuePropositionInViewRef} className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Our Value Proposition"
          subtitle="Discover what makes us different and how we deliver exceptional value to our customers."
        />

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 group overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-azure-50/0 to-azure-100/0 group-hover:from-azure-50/30 group-hover:to-azure-100/20 transition-all duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
