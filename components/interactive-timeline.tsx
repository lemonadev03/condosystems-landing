"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { CheckCircle2, Lightbulb, Target, Trophy, Users } from "lucide-react"

export default function InteractiveTimeline() {
  const steps = [
    {
      title: "Join the Team",
      description:
        "Complete our streamlined onboarding process and get immediate access to our platform and resources.",
      icon: <Users className="h-6 w-6 text-[#407140]" />,
      image: "/welcoming-real-estate-team.png",
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
      icon: <Target className="h-6 w-6 text-[#407140]" />,
      image: "/collaborative-strategy.png",
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
      icon: <Lightbulb className="h-6 w-6 text-[#407140]" />,
      image: "/real-estate-workshop.png",
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
      icon: <Trophy className="h-6 w-6 text-[#407140]" />,
      image: "/confident-agent-handshake.png",
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
      <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>

      {/* Timeline steps */}
      <div className="space-y-16 md:space-y-24 relative">
        {steps.map((step, index) => (
          <TimelineStep key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  )
}

function TimelineStep({ step, index }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={`relative ${index % 2 === 0 ? "md:text-right" : ""}`}>
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#407140] z-10 hidden md:flex items-center justify-center">
        {inView && <div className="w-3 h-3 rounded-full bg-[#407140]"></div>}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className={`space-y-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
          <div className="flex items-center gap-3 md:justify-start">
            <div className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-[#407140]/20">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
          </div>

          <p className="text-gray-600">{step.description}</p>

          {inView && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 rounded-lg p-4 mt-4 shadow-sm"
            >
              <h4 className="font-medium text-gray-800 mb-3">What to Expect:</h4>
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#407140] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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
  )
}
