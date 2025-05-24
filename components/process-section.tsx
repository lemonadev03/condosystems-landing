"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import SectionHeader from "./section-header"

interface ProcessSectionProps {
  processInViewRef: (node: Element | null) => void
  hyperlinks?: Record<string, string>
}

export default function ProcessSection({ processInViewRef, hyperlinks }: ProcessSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      description:
        "We start with a personalized call to understand your goals, experience, and what you're looking for in a brokerage.",
    },
    {
      number: "02",
      title: "Personalized Plan",
      description:
        "Our team creates a custom success roadmap tailored to your specific strengths, goals, and market opportunities.",
    },
    {
      number: "03",
      title: "Seamless Onboarding",
      description: "Our streamlined process gets you set up with all systems, tools, and resources.",
    },
    {
      number: "04",
      title: "Launch & Growth",
      description:
        "Hit the ground running with immediate support, leads, and a community ready to help you succeed from day one.",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto" ref={processInViewRef}>
      <SectionHeader
        title="Your Journey to Excellence"
        subtitle="Our proven process transforms ambitious agents into market leaders through personalized support and strategic guidance."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <span className="text-5xl font-black text-azure-500/20 group-hover:text-azure-500/30 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-azure-500 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 flex-grow">{step.description}</p>
              <div className="mt-4 h-1.5 w-12 bg-azure-500/70 rounded-full transform origin-left group-hover:scale-x-150 transition-transform"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
