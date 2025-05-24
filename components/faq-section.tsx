"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SectionHeader from "./section-header"

interface FAQSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  inViewRef?: (node: Element | null) => void
  hyperlinks?: Record<string, string>
  useBlueHeader?: boolean
}

export default function FAQSection({
  onMouseEnter,
  onMouseLeave,
  inViewRef,
  hyperlinks,
  useBlueHeader = false,
}: FAQSectionProps) {
  return (
    <section ref={inViewRef} className="w-full">
      <SectionHeader
        title={
          <>
            Frequently Asked <span className="text-white">Questions</span>
          </>
        }
        subtitle="Everything you need to know about joining the EZ BIG family."
      />

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              question: "What makes EZ BIG different from other brokerages?",
              answer:
                "EZ BIG combines industry-leading commission splits with comprehensive support systems, cutting-edge technology, and a collaborative culture. We focus on agent success through personalized mentorship, advanced marketing tools, and a commitment to work-life balance that's unmatched in the industry.",
            },
            {
              question: "What kind of support will I receive?",
              answer:
                "You'll receive one-on-one mentorship from top-performing agents, administrative support for transaction management, lead generation assistance, advanced marketing tools, and access to our proprietary technology platform. We also provide ongoing training and professional development opportunities.",
            },
            {
              question: "How does the commission structure work?",
              answer:
                "Our industry-leading commission structure is designed to maximize your earnings and grows with your success. We offer multiple paths to increase your commission split based on your individual goals and performance, with no desk fees.",
            },
            {
              question: "What technology does EZ BIG provide?",
              answer:
                "Our proprietary technology platform includes CRM systems, transaction management software, marketing automation tools, lead generation systems, and virtual showing capabilities. We continuously invest in technology to ensure our agents have the most advanced tools available.",
            },
            {
              question: "How do I get started?",
              answer:
                "Getting started is easy! Simply click the 'Join Our Team' button below, and you'll be directed to our onboarding site where you can complete the application process. One of our team members will contact you within 24 hours to schedule a consultation.",
            },
          ].map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger
                className="px-6 py-4 hover:bg-gray-50 text-gray-800 text-left"
                onMouseEnter={() => onMouseEnter("accordion")}
                onMouseLeave={onMouseLeave}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
