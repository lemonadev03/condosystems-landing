"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import Image from "next/image"
import { useState } from "react"

interface FeaturesSectionProps {
  featuresInViewRef?: (node: Element | null) => void
}

// Component to handle single or multiple images
function FeatureImage({ images, alt }: { images: string | string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const imageArray = Array.isArray(images) ? images : [images]
  const isMultiple = imageArray.length > 1

  const cycleImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageArray.length)
  }

  // Single image display
  if (!isMultiple) {
    return (
      <div className="relative w-full" style={{ aspectRatio: "auto" }}>
        <div className="relative w-full h-auto">
          <Image
            src={imageArray[0]}
            alt={alt}
            width={3024}
            height={1794}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    )
  }

  // Multiple images - stacked display - entire container is clickable
  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ aspectRatio: "3024 / 1794", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "5%", paddingRight: "10%" }}
      onClick={cycleImage}
    >
      {imageArray.map((img, index) => {
        const isActive = index === currentIndex
        const offset = index === 0 ? { top: "0%", left: "0%" } : { bottom: "0%", right: "0%" }

        return (
          <motion.div
            key={img}
            className="absolute w-[90%] h-[90%] shadow-2xl overflow-hidden"
            style={{
              ...offset,
              zIndex: isActive ? 20 : 10 + index,
            }}
            initial={{ opacity: 1 }}
            animate={{
              opacity: isActive ? 1 : 0.7,
              scale: isActive ? 1 : 0.98,
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={img}
              alt={`${alt} - View ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Glow effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 right-4 w-20 h-20 bg-azure-300/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-azure-400/15 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function FeaturesSection({ featuresInViewRef }: FeaturesSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const features = [
    {
      title: "Financial Operations",
      description:
        "Automate billing, track payments in real-time, and generate accurate financial reports. Keep cash flow healthy with on-time collections and complete visibility into your building's finances.",
      images: ["/hero/hero-1.png", "/hero/hero-2.png"], // Array example
      alt: "Financial Operations Dashboard"
    },
    {
      title: "Maintenance Management and Ticketing",
      description:
        "Track every work order from submission to completion. Assign tasks to staff, monitor progress, and keep residents updated automatically—no request falls through the cracks.",
      images: "/features/maintenance-management.png", // Single image example
      alt: "Maintenance Management Interface"
    },
    {
      title: "Document Management System",
      description:
        "Store, organize, and share all building documents in one secure location. From contracts to compliance records, find what you need instantly with powerful search and categorization.",
      images: "/features/document-management.png",
      alt: "Document Management System"
    },
    {
      title: "Reporting and Analytics",
      description:
        "Make data-driven decisions with comprehensive dashboards and customizable reports. Track key metrics, identify trends, and optimize operations with actionable insights.",
      images: "/features/reporting-analytics.png",
      alt: "Reporting and Analytics Dashboard"
    },
  ]

  return (
    <div ref={featuresInViewRef} className="w-full">
      <div className="text-center mb-20">
        <h2 className="inline-block bg-azure-500 text-white px-6 py-3 rounded-lg text-3xl md:text-5xl font-bold mb-6">
          Every feature you need, all in one place.
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Connected systems that eliminate busywork and keep your entire operation in sync. No silos, just seamless integration.
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
                  {/* Feature Screenshot */}
                  <FeatureImage images={feature.images} alt={feature.alt} />

                  {/* Enhanced decorative elements with animation */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-azure-300/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-azure-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-azure-500/0 to-azure-600/0 group-hover:from-azure-500/5 group-hover:to-azure-600/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
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
