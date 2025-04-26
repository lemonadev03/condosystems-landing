"use client"

import { motion } from "framer-motion"
import InteractiveTimeline from "@/components/interactive-timeline"

interface ProcessSectionProps {
  processInViewRef: (node: Element | null) => void
}

export default function ProcessSection({ processInViewRef }: ProcessSectionProps) {
  return (
    <section id="process" ref={processInViewRef} className="py-20 md:py-32 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Your Journey to <span className="text-azure-500">Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            We've designed a clear path to help you transform your real estate career and achieve unprecedented success.
          </motion.p>
        </div>

        <InteractiveTimeline />
      </div>
    </section>
  )
}
