"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface OutcomesSectionProps {
  outcomesInViewRef?: (node: Element | null) => void
}

export default function OutcomesSection({ outcomesInViewRef }: OutcomesSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const outcomes = [
    {
      category: "Time saved",
      stat: "1,250 hours",
      description: "Average time saved per year with our automation and workflow tools.",
    },
    {
      category: "Efficiency boost",
      stat: "Up to 85%",
      description: "Increase in productivity and operational efficiency for our customers.",
    },
    {
      category: "Customer satisfaction",
      stat: "98%",
      description: "Average satisfaction rate reported by users of our platform.",
    },
  ]

  return (
    <div ref={outcomesInViewRef} className="w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
          Achieve more, only with our platform.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: prefersReducedMotion ? 0 : index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    y: -8,
                    transition: { duration: 0.2 },
                  }
            }
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group cursor-pointer"
          >
            {/* Category */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-azure-600 transition-colors">
                {outcome.category}
              </h3>
            </div>

            {/* Stat */}
            <div className="mb-4">
              <p className="text-4xl md:text-5xl font-bold text-azure-500">{outcome.stat}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-600 leading-relaxed">{outcome.description}</p>
            </div>

            {/* Bottom accent bar */}
            <div className="h-1.5 w-12 bg-azure-500/70 rounded-full transform origin-left group-hover:scale-x-150 transition-transform"></div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 max-w-4xl mx-auto">
          These metrics are based on internal data from our customer base. Past performance does not guarantee future
          results, which may vary.
        </p>
      </div>
    </div>
  )
}
