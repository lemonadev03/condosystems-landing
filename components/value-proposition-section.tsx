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
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Modernize Your Condo Management with an All-in-One Platform"
          />
        </div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 group overflow-hidden">
            {/* Subtle background orb */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-azure-100/20 rounded-full blur-3xl pointer-events-none group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-100/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-azure-50/0 to-azure-100/0 group-hover:from-azure-50/30 group-hover:to-azure-100/20 transition-all duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 leading-[1.8] mb-6">
              Simplify operations and enhance resident satisfaction with powerful, easy-to-use management tools.{" "}
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-azure-600 to-blue-700">
                CondoSystems
              </span>
              {" "}offers a{" "}
              <span className="font-semibold text-gray-800">unified platform</span>
              {" "}for billing, communications, maintenance, support tickets, and more—making it the perfect solution for condos ready to{" "}
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-azure-500 to-blue-600">
                operate smarter
              </span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
