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
  hyperlinks = { SCHEDULE_CALL: "https://calendly.com/ezbig/intro" },
  useBlueHeader = false,
}: CTASectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const features = [
    "Complete Strategy & Planning",
    "Market Research & Analysis",
    "Dedicated Mentor Support",
    "Community Access & Networking",
    "Growth & Scaling Playbook",
    "Ongoing Updates & Resources",
  ]

  const benefits = [
    {
      title: "Industry-Leading Success Rate",
      description: "90% of our agents successfully grow their business within the first year.",
    },
    {
      title: "Expert-Led Community",
      description: "Connect with successful agents and get direct mentorship from industry experts.",
    },
    {
      title: "Continuous Support",
      description: "Weekly strategy calls and unlimited access to our thriving agent network.",
    },
  ]

  return (
    <section id="cta" ref={ctaInViewRef} className="relative bg-gradient-to-br from-azure-600 to-azure-700 rounded-2xl p-8 md:p-12">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Scale Your Real Estate Business?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Get everything you need to succeed as an EZ BIG agent. Access our proven framework, expert guidance, and thriving community.
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
              <h3 className="text-3xl font-bold text-white mb-2">Start Your Journey</h3>
              <p className="text-blue-100 mb-8">
                Schedule a call with our team to discuss how we can help you achieve your goals.
              </p>
            </div>
            <a href={hyperlinks.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full bg-white hover:bg-gray-100 text-azure-600 px-6 py-6 text-lg rounded-lg flex items-center justify-center gap-2 shadow-lg font-semibold"
                onMouseEnter={() => onMouseEnter("button", "Schedule Now")}
                onMouseLeave={onMouseLeave}
              >
                Schedule a Call
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>

          {/* Right: Features Grid */}
          <div>
            <p className="text-blue-100 text-sm font-semibold mb-6">Everything you get included:</p>
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
