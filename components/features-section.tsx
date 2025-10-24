"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface FeaturesSectionProps {
  featuresInViewRef?: (node: Element | null) => void
}

export default function FeaturesSection({ featuresInViewRef }: FeaturesSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const features = [
    {
      title: "Powerful Analytics",
      description:
        "Track and analyze your performance with real-time data insights. Make informed decisions with comprehensive dashboards and reporting tools.",
    },
    {
      title: "Seamless Integration",
      description:
        "Connect with your existing tools and workflows effortlessly. Our platform integrates with all the services you already use.",
    },
    {
      title: "Advanced Automation",
      description:
        "Automate repetitive tasks and focus on what matters most. Set up workflows that run on autopilot and save hours every week.",
    },
    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with your team members. Share insights, assign tasks, and communicate all in one place.",
    },
  ]

  return (
    <div ref={featuresInViewRef} className="w-full">
      <div className="text-center mb-20">
        <h2 className="inline-block bg-azure-500 text-white px-6 py-3 rounded-lg text-3xl md:text-5xl font-bold mb-6">
          Features
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to succeed, all in one powerful platform.
        </p>
      </div>

      <div className="space-y-24 md:space-y-32">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                isEven ? "" : "lg:grid-flow-dense"
              }`}
            >
              {/* Screenshot Container */}
              <div
                className={`relative ${isEven ? "lg:col-start-1" : "lg:col-start-2"}`}
              >
                <div className="relative rounded-2xl bg-gradient-to-br from-azure-100 to-azure-200 p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  {/* Placeholder for screenshot - you'll replace this with actual images */}
                  <div className="aspect-[4/3] bg-white/90 backdrop-blur-sm rounded-lg shadow-inner flex items-center justify-center border border-white/50 group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-azure-500/20 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-azure-500/40 rounded-full"></div>
                      </div>
                      <p className="text-gray-400 font-medium">Screenshot Placeholder</p>
                    </div>
                  </div>

                  {/* Enhanced decorative elements with animation */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-azure-300/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-azure-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-azure-500/0 to-azure-600/0 group-hover:from-azure-500/5 group-hover:to-azure-600/10 transition-all duration-500 rounded-2xl"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className={isEven ? "lg:col-start-2" : "lg:col-start-1"}>
                <h3 className="text-3xl md:text-4xl font-bold text-azure-600 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
