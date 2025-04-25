"use client"

import { useRef, forwardRef, type ReactNode, type ForwardedRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

const ParallaxSection = forwardRef<HTMLElement, ParallaxSectionProps>(
  ({ children, className, id }, ref: ForwardedRef<HTMLElement>) => {
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
      <section
        ref={(el) => {
          // Handle both the forwarded ref and the local ref
          if (typeof ref === "function") {
            ref(el)
          } else if (ref) {
            ref.current = el
          }
          if (sectionRef.current !== el) {
            sectionRef.current = el
          }
        }}
        id={id}
        className={className}
      >
        <motion.div style={{ y }} className="relative z-0">
          {children}
        </motion.div>
      </section>
    )
  },
)

ParallaxSection.displayName = "ParallaxSection"

export default ParallaxSection
