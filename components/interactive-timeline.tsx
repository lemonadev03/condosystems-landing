"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Lightbulb, Target, Trophy, Users } from "lucide-react"

export default function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Join the Team",
      description:
        "Complete our streamlined onboarding process and get immediate access to our platform and resources.",
      icon: <Users className="h-6 w-6 text-teal-400" />,
      image: "/placeholder.svg?height=400&width=600&query=real%20estate%20team%20welcome",
      details: [
        "Simple application process",
        "Fast approval (typically within 48 hours)",
        "Comprehensive welcome package",
        "Immediate access to our technology platform",
      ],
    },
    {
      title: "Personalized Growth Plan",
      description: "Work with your dedicated mentor to create a customized roadmap for your success.",
      icon: <Target className="h-6 w-6 text-teal-400" />,
      image: "/placeholder.svg?height=400&width=600&query=business%20planning%20session",
      details: [
        "One-on-one strategy session",
        "Goal setting and milestone creation",
        "Personalized training schedule",
        "Resource allocation based on your needs",
      ],
    },
    {
      title: "Skill Enhancement",
      description: "Access our exclusive training programs and resources to sharpen your skills and knowledge.",
      icon: <Lightbulb className="h-6 w-6 text-teal-400" />,
      image: "/placeholder.svg?height=400&width=600&query=real%20estate%20training%20session",
      details: [
        "On-demand video training library",
        "Weekly live masterclasses",
        "Role-playing and scenario practice",
        "Advanced negotiation techniques",
      ],
    },
    {
      title: "Market Domination",
      description: "Leverage our cutting-edge tools and support system to dominate your local market.",
      icon: <Trophy className="h-6 w-6 text-teal-400" />,
      image: "/placeholder.svg?height=400&width=600&query=successful%20real%20estate%20agent",
      details: [
        "Targeted marketing campaigns",
        "Exclusive lead generation systems",
        "Community building strategies",
        "Brand development support",
      ],
    },
  ]

  return (
    <div className="relative">
      {/* Timeline connector */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 transform -translate-x-1/2 hidden md:block"></div>

      {/* Timeline steps */}
      <div className="space-y-16 md:space-y-24 relative">
        {steps.map((step, index) => (
          <div key={index} className={`relative ${index % 2 === 0 ? "md:text-right" : ""}`}>
            {/* Timeline dot */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 border-2 border-teal-400 z-10 hidden md:flex items-center justify-center cursor-pointer hover:bg-teal-400/20 transition-colors"
              onClick={() => setActiveStep(index)}
            >
              {activeStep === index ? <div className="w-3 h-3 rounded-full bg-teal-400"></div> : null}
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`space-y-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="flex items-center gap-3 md:justify-start">
                  <div className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-teal-400/20">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                </div>

                <p className="text-white/80">{step.description}</p>

                <Button
                  variant="ghost"
                  className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10 p-0"
                  onClick={() => setActiveStep(index)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {activeStep === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 rounded-lg p-4 mt-4"
                  >
                    <h4 className="font-medium text-white mb-3">What to Expect:</h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={600}
                    height={400}
                    className="rounded-xl shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline navigation */}
      <div className="flex justify-center mt-16">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeStep === index ? "bg-teal-400" : "bg-white/20 hover:bg-white/40"
              }`}
              onClick={() => setActiveStep(index)}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
