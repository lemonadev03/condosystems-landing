"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestimonialsSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  scrollToSection: (sectionId: string) => void
  testimonialsInViewRef: (node: Element | null) => void
  count1: any
  count2: any
  count3: any
}

export default function TestimonialsSection({
  onMouseEnter,
  onMouseLeave,
  scrollToSection,
  testimonialsInViewRef,
  count1,
  count2,
  count3,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" ref={testimonialsInViewRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Success <span className="text-[#407140]">Stories</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Hear from agents who transformed their careers with EZ BIG Realty.
          </motion.p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-gray-50 shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
            whileHover={{ y: -10 }}
          >
            <h3 className="text-5xl font-bold text-gray-800 mb-2">
              <motion.span>{Math.round(count1.get())}</motion.span>
              <span className="text-[#407140]">+</span>
            </h3>
            <p className="text-gray-600 text-lg">Successful Affiliates</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
            whileHover={{ y: -10 }}
          >
            <h3 className="text-5xl font-bold text-gray-800 mb-2">
              <motion.span>{Math.round(count2.get())}</motion.span>
              <span className="text-[#407140]">%</span>
            </h3>
            <p className="text-gray-600 text-lg">Average Income Increase</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
            whileHover={{ y: -10 }}
          >
            <h3 className="text-5xl font-bold text-gray-800 mb-2">
              <motion.span>{Math.round(count3.get())}</motion.span>
              <span className="text-[#407140]">+</span>
            </h3>
            <p className="text-gray-600 text-lg">Markets Nationwide</p>
          </motion.div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Elite Agent, 3 Years",
              image: "/confident-agent.png",
              quote:
                "Joining EZ BIG was the best career decision I've ever made. My income doubled in the first year, and the support system is unmatched in the industry.",
              before: "$85K/year",
              after: "$210K/year",
            },
            {
              name: "Michael Rodriguez",
              role: "Legacy Partner, 5 Years",
              image: "/confident-agent.png",
              quote:
                "The innovative tools and mentorship program accelerated my growth beyond what I thought possible. I now have the freedom to work on my terms while earning more.",
              before: "$120K/year",
              after: "$350K/year",
            },
            {
              name: "Jennifer Lee",
              role: "Elite Agent, 2 Years",
              image: "/confident-asian-agent.png",
              quote:
                "I was skeptical at first, but the results speak for themselves. The collaborative culture and cutting-edge marketing support transformed my business.",
              before: "$95K/year",
              after: "$245K/year",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative h-[450px] perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => onMouseEnter("card")}
              onMouseLeave={onMouseLeave}
            >
              <div className="relative h-full w-full transition-all duration-500 preserve-3d group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-[#407140]">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                  <p className="text-[#407140] mb-4">{testimonial.role}</p>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <p className="text-gray-500 text-sm mt-4">Click to see transformation</p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#407140] to-[#4c8a4c] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <h3 className="text-2xl font-bold text-white mb-6">Income Transformation</h3>

                  <div className="w-full max-w-xs mx-auto mb-8">
                    <div className="bg-white/20 p-4 rounded-t-lg">
                      <p className="text-white/80 mb-1">Before EZ BIG</p>
                      <p className="text-3xl font-bold text-white">{testimonial.before}</p>
                    </div>
                    <div className="h-12 flex items-center justify-center bg-white/10">
                      <ArrowRight className="h-8 w-8 text-white" />
                    </div>
                    <div className="bg-white/20 p-4 rounded-b-lg">
                      <p className="text-white/80 mb-1">After EZ BIG</p>
                      <p className="text-3xl font-bold text-white">{testimonial.after}</p>
                    </div>
                  </div>

                  <p className="text-white/90">Ready to write your success story?</p>
                  <Button
                    className="mt-4 bg-white text-[#407140] hover:bg-white/90"
                    onClick={() => scrollToSection("cta")}
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map showing team presence */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8"
          >
            Our <span className="text-[#407140]">Nationwide</span> Presence
          </motion.h3>

          <div className="relative h-[400px] md:h-[500px] bg-gray-50 shadow-md rounded-2xl overflow-hidden">
            <Image
              src="/usa-map-locations.png"
              alt="Map showing team presence"
              fill
              className="object-cover opacity-90"
            />

            {/* Interactive map pins would go here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-800 text-lg bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                Join our growing network of 1,250+ agents across 32+ markets
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
