import type { ReactNode } from "react"

interface SectionHeaderProps {
  title: ReactNode
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="inline-block bg-azure-500 text-white px-6 py-3 rounded-lg text-3xl md:text-5xl font-bold mb-6">
        {title}
      </h2>

      {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  )
}
