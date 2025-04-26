"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  ctaInViewRef: (node: Element | null) => void
}

export default function CTASection({ onMouseEnter, onMouseLeave, ctaInViewRef }: CTASectionProps) {
  return (
    <section id="cta" ref={ctaInViewRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-[#407140] rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Ready to Transform Your Real Estate Career?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/90 text-xl mb-8"
              >
                Join the elite network of real estate professionals who are redefining success in the industry.
              </motion.p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center">
              <div className="bg-white/10 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Take the Next Step</h3>
                <p className="text-white/90 mb-6">
                  Click below to visit our onboarding site where you can complete your application and begin your
                  journey with EZ BIG Realty.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Simple online application",
                    "Fast approval process",
                    "Immediate access to resources",
                    "Dedicated onboarding specialist",
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 text-white"
                    >
                      <div className="bg-white/20 p-1 rounded-full">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <a href="https://onboarding.ezbig.com" target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  className="w-full bg-white text-[#407140] hover:bg-white/90 py-6 text-xl font-medium"
                  onMouseEnter={() => onMouseEnter("button", "Join Now")}
                  onMouseLeave={onMouseLeave}
                >
                  Join Our Team Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
