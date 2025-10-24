"use client"

import { motion, useMotionValue, animate } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface OutcomesSectionProps {
  outcomesInViewRef?: (node: Element | null) => void
}

export default function OutcomesSection({ outcomesInViewRef }: OutcomesSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const outcomes = [
    {
      category: "Time saved",
      stat: "1,250 hours",
      statNumber: 1250,
      suffix: " hours",
      description: "Average time saved per year with our automation and workflow tools.",
    },
    {
      category: "Efficiency boost",
      stat: "Up to 85%",
      statNumber: 85,
      prefix: "Up to ",
      suffix: "%",
      description: "Increase in productivity and operational efficiency for our customers.",
    },
    {
      category: "Customer satisfaction",
      stat: "98%",
      statNumber: 98,
      suffix: "%",
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
          <OutcomeCard key={index} outcome={outcome} index={index} prefersReducedMotion={prefersReducedMotion} />
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

// Animated counter component
function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  prefersReducedMotion,
}: {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  prefersReducedMotion: boolean
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const count = useMotionValue(from)
  const [displayValue, setDisplayValue] = useState(from)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration: prefersReducedMotion ? 0.5 : duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest))
        },
      })
      return () => controls.stop()
    }
  }, [inView, count, to, duration, prefersReducedMotion])

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

// Separate component for individual outcome card
function OutcomeCard({
  outcome,
  index,
  prefersReducedMotion,
}: {
  outcome: {
    category: string
    stat: string
    statNumber: number
    prefix?: string
    suffix: string
    description: string
  }
  index: number
  prefersReducedMotion: boolean
}) {
  return (
    <motion.div
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
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        backgroundPosition: "0 0",
      }}
      className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100/50 group cursor-pointer overflow-hidden
                 before:absolute before:inset-0 before:bg-gradient-to-br before:from-azure-50/30 before:to-transparent before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500
                 after:absolute after:inset-0 after:opacity-[0.02] after:pointer-events-none"
    >
      {/* Category */}
      <div className="mb-4 relative">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-azure-600 transition-colors">
          {outcome.category}
        </h3>
      </div>

      {/* Stat with animated counter */}
      <div className="mb-4 relative">
        <p className="text-4xl md:text-5xl font-bold text-azure-500">
          <AnimatedCounter
            to={outcome.statNumber}
            prefix={outcome.prefix}
            suffix={outcome.suffix}
            prefersReducedMotion={prefersReducedMotion}
          />
        </p>
      </div>

      {/* Description */}
      <div className="mb-6 relative">
        <p className="text-base text-gray-600 leading-relaxed">{outcome.description}</p>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1.5 w-12 bg-azure-500/70 rounded-full transform origin-left group-hover:scale-x-150 transition-transform relative"></div>
    </motion.div>
  )
}
