"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

interface FeaturesSectionProps {
  featuresInViewRef?: (node: Element | null) => void
  hyperlinks?: {
    SCHEDULE_CALL: string
  }
}

// Full-screen image lightbox component
interface ImageLightboxProps {
  images: string[]
  alt: string
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

function ImageLightbox({ images, alt, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Reset index when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Define navigation functions first
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Handle keyboard navigation (escape, arrow keys)
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        goToPrev()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }
    window.addEventListener("keydown", handleKeyboard)
    return () => window.removeEventListener("keydown", handleKeyboard)
  }, [isOpen, onClose, goToPrev, goToNext])

  // Prevent body scroll and hide navbar when open
  useEffect(() => {
    const header = document.querySelector("header")

    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (header) {
        header.style.opacity = "0"
        header.style.pointerEvents = "none"
      }
    } else {
      document.body.style.overflow = ""
      if (header) {
        header.style.opacity = ""
        header.style.pointerEvents = ""
      }
    }

    return () => {
      document.body.style.overflow = ""
      if (header) {
        header.style.opacity = ""
        header.style.pointerEvents = ""
      }
    }
  }, [isOpen])

  const handleImageClick = (e: React.MouseEvent) => {
    // Only cycle if clicking on the image itself, not the arrows or close button
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "IMG") {
      goToNext()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button - top left */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Previous arrow - only show if multiple images */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
              className="absolute left-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          {/* Next arrow - only show if multiple images */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}

          {/* Image container - clickable to cycle */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[90vh] cursor-pointer"
            onClick={handleImageClick}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${alt} - View ${currentIndex + 1}`}
                  width={3024}
                  height={1794}
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                  sizes="90vw"
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>

            {/* Image counter - only show if multiple images */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 rounded-full shadow-lg">
                <span className="text-sm font-medium text-gray-700">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Component to handle single or multiple images
function FeatureImage({ images, alt, position = "right" }: { images: string | string[]; alt: string; position?: "left" | "right" }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const imageArray = Array.isArray(images) ? images : [images]
  const isMultiple = imageArray.length > 1

  const openLightbox = () => {
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const cycleImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageArray.length)
  }

  // Single image display - now clickable to open lightbox
  if (!isMultiple) {
    return (
      <>
        <div
          className="relative w-full cursor-pointer"
          style={{ aspectRatio: "auto" }}
          onClick={openLightbox}
        >
          <div className="relative w-full h-auto rounded-xl overflow-hidden">
            <Image
              src={imageArray[0]}
              alt={alt}
              width={3024}
              height={1794}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={85}
            />
          </div>
        </div>
        <ImageLightbox
          images={imageArray}
          alt={alt}
          initialIndex={0}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
        />
      </>
    )
  }

  // Multiple images - stacked display - entire container is clickable to open lightbox
  return (
    <>
      <div
        className="relative w-full cursor-pointer"
        style={{
          aspectRatio: "3024 / 1794",
          paddingTop: "5%",
          paddingBottom: "5%",
          paddingLeft: position === "left" ? "10%" : "5%",
          paddingRight: position === "left" ? "5%" : "10%"
        }}
        onClick={openLightbox}
      >
        {imageArray.map((img, index) => {
          const isActive = index === currentIndex
          const isVisible = index <= currentIndex || index === currentIndex + 1

          // Calculate offset for each image in the stack - diagonal pattern that adapts to position
          const getOffset = (idx: number) => {
            const offsetAmount = idx * 6 // 6% offset for each image (smaller to stay within bounds)
            if (position === "left") {
              // When on left side: foreground top-right, background bottom-left
              return {
                top: `${offsetAmount}%`,
                right: `${offsetAmount}%`
              }
            } else {
              // When on right side: foreground top-left, background bottom-right
              return {
                top: `${offsetAmount}%`,
                left: `${offsetAmount}%`
              }
            }
          }

          return (
            <motion.div
              key={img}
              className="absolute w-[90%] h-[90%] shadow-2xl overflow-hidden rounded-xl"
              style={{
                ...getOffset(index),
                zIndex: isActive ? 20 : 10 + index,
              }}
              initial={{ opacity: 1 }}
              animate={{
                opacity: isVisible ? (isActive ? 1 : 0.7) : 0,
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
                loading="lazy"
                quality={85}
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
      <ImageLightbox
        images={imageArray}
        alt={alt}
        initialIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />
    </>
  )
}

export default function FeaturesSection({ featuresInViewRef, hyperlinks }: FeaturesSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [shouldPreload, setShouldPreload] = useState(false)

  const features = [
    {
      title: "Financial Operations",
      description:
        "Automate billing, track payments in real-time, and generate accurate financial reports. Keep cash flow healthy with on-time collections and complete visibility into your building's finances.",
      images: ["/features/billing-1.png", "/features/billing-2.png", "/features/billing-3.png"], // Array example
      alt: "Financial Operations Dashboard"
    },
    {
      title: "Maintenance Management and Ticketing",
      description:
        "Track every work order from submission to completion. Assign tasks to staff, monitor progress, and keep residents updated automatically—no request falls through the cracks.",
      images: ["/features/maintenance-1.png", "/features/maintenance-2.png", "/features/maintenance-3.png"], // Single image example
      alt: "Maintenance Management Interface"
    },
    {
      title: "Document Management System",
      description:
        "Store, organize, and share all building documents in one secure location. From contracts to compliance records, find what you need instantly with powerful search and categorization.",
      images: ["/features/documents-1.png", "/features/documents-2.png"],
      alt: "Document Management System"
    },
    {
      title: "Reporting and Analytics",
      description:
        "Make data-driven decisions with comprehensive dashboards and customizable reports. Track key metrics, identify trends, and optimize operations with actionable insights.",
      images: ["/features/reports-1.png", "/features/reports-2.png", "/features/reports-3.png"],
      alt: "Reporting and Analytics Dashboard"
    },
  ]

  // Smart delayed preload: Start loading images in background after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPreload(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
                  <FeatureImage images={feature.images} alt={feature.alt} position={isEven ? "left" : "right"} />

                  {/* Enhanced decorative elements with animation */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-azure-300/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-azure-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-azure-500/0 to-azure-600/0 group-hover:from-azure-500/5 group-hover:to-azure-600/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className={`${isEven ? "lg:col-start-2" : "lg:col-start-1"} relative z-10`}>
                <h3 className="text-3xl md:text-4xl font-bold text-azure-600 mb-4 select-text">
                  {feature.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed select-text">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          )
        })}

        {/* "And Many More" subtle callout */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-24 text-center relative z-10"
        >
          <div className="max-w-2xl mx-auto border-t border-b border-gray-200 py-8">
            <p className="text-xl text-gray-700 mb-3 select-text">
              <span className="font-semibold text-azure-600">And many more features...</span>
            </p>
            <p className="text-base text-gray-500 select-text">
              Looking for something specific?{" "}
              <a
                href={hyperlinks?.SCHEDULE_CALL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-azure-600 hover:text-azure-700 underline font-medium transition-colors cursor-pointer relative z-10"
              >
                Let's discuss your needs
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Hidden preload images - loads in background after 1 second */}
      {shouldPreload && (
        <div className="hidden" aria-hidden="true">
          {features.flatMap((feature) =>
            (Array.isArray(feature.images) ? feature.images : [feature.images]).map((img) => (
              <Image
                key={img}
                src={img}
                alt=""
                width={3024}
                height={1794}
                priority
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
