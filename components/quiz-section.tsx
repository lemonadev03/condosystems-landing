"use client"

import { motion } from "framer-motion"
import AgentTypeQuiz from "@/components/agent-type-quiz"

interface QuizSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  quizInViewRef: (node: Element | null) => void
}

export default function QuizSection({ onMouseEnter, onMouseLeave, quizInViewRef }: QuizSectionProps) {
  return (
    <section id="quiz" ref={quizInViewRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Discover Your <span className="text-azure-500">Agent Type</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Take our quick quiz to find out which path at EZ BIG is perfect for your skills and goals.
          </motion.p>
        </div>

        <AgentTypeQuiz onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      </div>
    </section>
  )
}
