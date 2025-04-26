"use client"

import { motion } from "framer-motion"
import IncomeCalculator from "@/components/income-calculator"

interface CalculatorSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  calculatorInViewRef: (node: Element | null) => void
}

export default function CalculatorSection({ onMouseEnter, onMouseLeave, calculatorInViewRef }: CalculatorSectionProps) {
  return (
    <section id="calculator" ref={calculatorInViewRef} className="py-20 md:py-32 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Calculate Your <span className="text-[#407140]">Potential</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            See how your income could transform with our industry-leading commission structure and support.
          </motion.p>
        </div>

        <IncomeCalculator onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      </div>
    </section>
  )
}
