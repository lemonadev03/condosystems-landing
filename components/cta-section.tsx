"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"
import SectionHeader from "./section-header"

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
  hyperlinks = { JOIN_EZBIG: "https://onboarding.ezbig.com" },
  useBlueHeader = false,
}: CTASectionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="cta" ref={ctaInViewRef} className="relative">
      <div
        className={`max-w-4xl mx-auto ${
          showMoreBackground
            ? "bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-lg"
            : "bg-white rounded-xl p-10 shadow-lg"
        }`}
      >
        <div className="text-center">
          <SectionHeader
            title={
              <>
                Ready to Transform Your <span className="text-white">Real Estate Career</span>?
              </>
            }
            subtitle="Join EZ BIG today and experience the difference that comes with our innovative approach, supportive community, and industry-leading resources."
            className="mb-8"
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className={cn("relative inline-block", !prefersReducedMotion && "animate-attention-pulse")}>
              <div
                className={cn(
                  "absolute inset-0 bg-azure-400/30 rounded-lg -m-1",
                  !prefersReducedMotion && "animate-attention-glow",
                )}
              ></div>
              <a href={hyperlinks.JOIN_EZBIG} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className={cn(
                    "bg-azure-500 hover:bg-azure-600 text-white px-10 py-6 text-lg rounded-lg flex items-center gap-2 shadow-lg relative z-10",
                    !prefersReducedMotion && "animate-subtle-bounce",
                  )}
                  onMouseEnter={() => onMouseEnter("button", "Join Now")}
                  onMouseLeave={onMouseLeave}
                >
                  Join EZ BIG Today
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
