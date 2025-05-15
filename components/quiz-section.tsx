"use client"
import AgentTypeQuiz from "@/components/agent-type-quiz"
import SectionHeader from "./section-header"

interface QuizSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  quizInViewRef: (node: Element | null) => void
  showMoreBackground?: boolean
  hyperlinks?: Record<string, string>
  useBlueHeader?: boolean
}

export default function QuizSection({
  onMouseEnter,
  onMouseLeave,
  quizInViewRef,
  showMoreBackground = false,
  hyperlinks,
  useBlueHeader = false,
}: QuizSectionProps) {
  return (
    <section id="quiz" ref={quizInViewRef}>
      <SectionHeader
        title={
          <>
            Discover Your <span className="text-white">Agent Type</span>
          </>
        }
        subtitle="Find the perfect EZ BIG path for your unique skills and career goals."
      />

      <AgentTypeQuiz onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    </section>
  )
}
