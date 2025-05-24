"use client"
import { motion } from "framer-motion"
import { Home, DollarSign, Users, Clock, MapPin } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import Image from "next/image"

type ValueSectionProps = {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  valueInViewRef: any
  showNationwide?: boolean
}

export default function ValueSection({
  onMouseEnter,
  onMouseLeave,
  valueInViewRef,
  showNationwide = true,
}: ValueSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const benefits = [
    {
      icon: <Home className="h-10 w-10 text-azure-500" />,
      title: "Work From Home (WFH)",
      description:
        "Enjoy the flexibility of working from your home office with our cutting-edge virtual tools and support.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-azure-500" />,
      title: "Industry-leading Commission Splits",
      description:
        "Maximize your earnings with our industry-leading commission structure designed to reward your success.",
    },
    {
      icon: <Users className="h-10 w-10 text-azure-500" />,
      title: "Mentorship from Experts",
      description:
        "Learn from top-performing agents and industry veterans who are committed to your professional growth.",
    },
    {
      icon: <Clock className="h-10 w-10 text-azure-500" />,
      title: "Flexible Scheduling",
      description: "Create your own schedule and achieve the work-life balance you've always wanted.",
    },
  ]

  return (
    <div ref={valueInViewRef} className="w-full">
      {/* Main Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.15,
              delay: prefersReducedMotion ? 0 : index * 0.025,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => onMouseEnter("card")}
            onMouseLeave={onMouseLeave}
          >
            <div className="flex items-start gap-5">
              <div className="p-4 bg-azure-50 rounded-full flex-shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 relative">
                  <span className="relative z-10">
                    {benefit.title}
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-azure-200 opacity-50 -z-10 rounded-sm"></span>
                  </span>
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nationwide Presence Section - Conditionally rendered */}
      {showNationwide && (
        <motion.div
          className="mt-16 bg-white rounded-xl shadow-md overflow-hidden"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : 0.15 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-azure-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800 relative">
                  <span className="relative z-10">
                    Our Nationwide Presence
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-azure-200 opacity-50 -z-10 rounded-sm"></span>
                  </span>
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                With agents across all 50 states, EZ BIG Realty provides you with a vast network of professionals and
                resources no matter where you're located.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-azure-500 rounded-full mr-2"></span>
                  Access to nationwide referral opportunities
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-azure-500 rounded-full mr-2"></span>
                  Regional training and networking events
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-azure-500 rounded-full mr-2"></span>
                  Local market expertise and support
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="/usa-map-locations.png"
                alt="EZ BIG Realty nationwide presence map"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
