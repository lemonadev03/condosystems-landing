import type React from "react"
import Image from "next/image"

interface SectionBackgroundProps {
  imageSrc: string
  alt: string
  children: React.ReactNode
  className?: string
  overlayOpacity?: number
  blurAmount?: string
  fixedBackground?: boolean
}

export default function SectionBackground({
  imageSrc,
  alt,
  children,
  className = "",
  overlayOpacity = 0.85,
  blurAmount = "8px",
  fixedBackground = false,
}: SectionBackgroundProps) {
  // For fixed background, we use a div with background-image instead of Image component
  if (fixedBackground) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Fixed Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundAttachment: "fixed",
            filter: `blur(${blurAmount})`,
          }}
        ></div>

        {/* Overlay to ensure content readability */}
        <div className="absolute inset-0 w-full h-full bg-white" style={{ opacity: overlayOpacity }}></div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }

  // Default behavior with Image component
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ filter: `blur(${blurAmount})`, transform: "scale(1.05)" }}
        />
        {/* Overlay to ensure content readability */}
        <div className="absolute inset-0 w-full h-full bg-white" style={{ opacity: overlayOpacity }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
