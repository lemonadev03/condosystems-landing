"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  ctaInViewRef: (node: Element | null) => void
  showMoreBackground?: boolean
  hyperlinks?: Record<string, string>
  useBlueHeader?: boolean
}

export default function CTASection({
  onMouseEnter,
  onMouseLeave,
  ctaInViewRef,
  showMoreBackground = false,
  hyperlinks = { SCHEDULE_CALL: "https://calendly.com/CondoSystems/demo" },
  useBlueHeader = false,
}: CTASectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const features = [
    "Billing Management System",
    "Digital Maintenance Tracking",
    "Resident Mobile App",
    "Document Management System",
    "Amenity Booking System",
    "Financial Reporting & Analytics",
  ]

  const benefits = [
    {
      title: "Quick Setup",
      description: "Get started in days, not months. Our team assists with migration and trains your staff.",
    },
    {
      title: "Dedicated Support",
      description: "Direct access to our support team whenever you need help—no ticket queues or long waits.",
    },
    {
      title: "Regular Updates",
      description: "Continuous improvements and new features based on feedback from property managers like you.",
    },
  ]

  return (
    <section id="cta" ref={ctaInViewRef} className="relative bg-gradient-to-br from-azure-600 to-azure-700 rounded-2xl p-8 md:p-12">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Modernize Your Condo Management?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join forward-thinking condo communities that have simplified operations and elevated resident satisfaction.
          </p>
        </div>

        {/* Main CTA Component */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 mb-8 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left: CTA Card */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">See It in Action</h3>
              <p className="text-blue-100 mb-8">
                Book a personalized demo and discover how CondoSystems can transform your operations.
              </p>
            </div>
            <a href={hyperlinks.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full bg-white hover:bg-white text-azure-600 px-6 py-6 text-lg rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-semibold transition-shadow duration-200"
              >
                Book a Demo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>

          {/* Right: Features Grid */}
          <div>
            <p className="text-blue-100 text-sm font-semibold mb-6">What's included:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="h-5 w-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: features.length * 0.05 }}
              className="mt-4 pt-4 border-t border-white/20"
            >
              <p className="text-blue-100 text-sm italic">and many more...</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300"
            >
              <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
              <p className="text-blue-100 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}