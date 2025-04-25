"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Building2, ChevronDown, DollarSign, Home, MapPin, Play, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import CustomCursor from "@/components/custom-cursor"
import IncomeCalculator from "@/components/income-calculator"
import AgentTypeQuiz from "@/components/agent-type-quiz"
import InteractiveTimeline from "@/components/interactive-timeline"
import ParallaxSection from "@/components/parallax-section"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Refs for each section to track active section
  const heroRef = useRef(null)
  const valueRef = useRef(null)
  const processRef = useRef(null)
  const testimonialsRef = useRef(null)
  const calculatorRef = useRef(null)
  const quizRef = useRef(null)
  const ctaRef = useRef(null)

  // Scroll progress for gradient background
  const { scrollYProgress } = useScroll()
  const backgroundGreen = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["hsl(120, 28%, 15%)", "hsl(120, 28%, 20%)", "hsl(120, 28%, 25%)"],
  )

  // Counter animation values
  const count1 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1250])
  const count2 = useTransform(scrollYProgress, [0.3, 0.4], [0, 87])
  const count3 = useTransform(scrollYProgress, [0.3, 0.4], [0, 32])

  // Intersection observers for sections
  const [heroInViewRef, heroInView] = useInView({ threshold: 0.5 })
  const [valueInViewRef, valueInView] = useInView({ threshold: 0.3 })
  const [processInViewRef, processInView] = useInView({ threshold: 0.3 })
  const [testimonialsInViewRef, testimonialsInView] = useInView({ threshold: 0.3 })
  const [calculatorInViewRef, calculatorInView] = useInView({ threshold: 0.3 })
  const [quizInViewRef, quizInView] = useInView({ threshold: 0.3 })
  const [ctaInViewRef, ctaInView] = useInView({ threshold: 0.5 })

  // Update active section based on which section is in view
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (valueInView) setActiveSection("value")
    else if (processInView) setActiveSection("process")
    else if (testimonialsInView) setActiveSection("testimonials")
    else if (calculatorInView) setActiveSection("calculator")
    else if (quizInView) setActiveSection("quiz")
    else if (ctaInView) setActiveSection("cta")
  }, [heroInView, valueInView, processInView, testimonialsInView, calculatorInView, quizInView, ctaInView])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle video play/pause
  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  // Cursor handlers
  const handleMouseEnter = (variant: string, text = "") => {
    setCursorVariant(variant)
    setCursorText(text)
  }

  const handleMouseLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f8f8] font-sans">
      <CustomCursor variant={cursorVariant} text={cursorText} />

      {/* Background gradient overlay that changes with scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(135deg, ${backgroundGreen}, transparent)`,
          zIndex: 0,
        }}
      />

      {/* Subtle geometric patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/Interlocking Dimensions.png')] bg-repeat"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f8f8]/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-[#407140]" />
            <span className="text-xl font-bold text-[#407140]">EZ BIG Realty</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "hero", label: "Home" },
              { id: "value", label: "Benefits" },
              { id: "process", label: "Journey" },
              { id: "testimonials", label: "Success Stories" },
              { id: "calculator", label: "Earnings" },
              { id: "quiz", label: "Find Your Fit" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-sm font-medium relative px-1 py-2 text-gray-600 hover:text-[#407140] transition-colors",
                  activeSection === item.id && "text-[#407140]",
                )}
                onMouseEnter={() => handleMouseEnter("link")}
                onMouseLeave={handleMouseLeave}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#407140]"
                  />
                )}
              </button>
            ))}
          </nav>

          <Button
            className="bg-[#407140] hover:bg-[#345934] text-white"
            onMouseEnter={() => handleMouseEnter("button", "Join Now")}
            onMouseLeave={handleMouseLeave}
            onClick={() => scrollToSection("cta")}
          >
            Join Our Team
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          ref={(el) => {
            heroRef.current = el
            heroInViewRef(el)
          }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f8f8]"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              loop
              muted
              playsInline
            >
              <source src="/placeholder.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f8]/70 via-[#f8f8f8]/50 to-[#f8f8f8]/70"></div>

            <button
              className="absolute bottom-8 right-8 z-10 bg-[#407140]/20 backdrop-blur-sm p-3 rounded-full hover:bg-[#407140]/30 transition-colors"
              onClick={handleVideoPlay}
              onMouseEnter={() => handleMouseEnter("button", isVideoPlaying ? "Pause" : "Play")}
              onMouseLeave={handleMouseLeave}
            >
              <Play className="h-6 w-6 text-[#407140]" />
            </button>
          </div>

          <div className="container mx-auto px-4 z-10 mt-20">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-gray-800">Real estate sales is hard, unless</span>
                  <span className="block text-[#407140] mt-2 text-5xl md:text-7xl lg:text-8xl italic">
                    You're with the best team out there.
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 mb-8"
              >
                Join the elite network of real estate professionals who are redefining success in the industry.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-[#407140] hover:bg-[#345934] text-white px-8 py-6 text-lg"
                  onMouseEnter={() => handleMouseEnter("button", "Get Started")}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => scrollToSection("cta")}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#407140] text-[#407140] hover:bg-[#407140]/10 px-8 py-6 text-lg"
                  onMouseEnter={() => handleMouseEnter("button", "Learn More")}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => scrollToSection("value")}
                >
                  Discover Benefits
                </Button>
              </motion.div>
            </div>

            {/* Floating 3D elements */}
            <div className="absolute top-1/4 left-10 animate-float-slow opacity-60">
              <Home className="h-16 w-16 text-[#407140]" />
            </div>
            <div className="absolute bottom-1/4 right-10 animate-float opacity-60">
              <DollarSign className="h-16 w-16 text-[#407140]" />
            </div>
            <div className="absolute top-1/3 right-1/4 animate-float-medium opacity-60">
              <Users className="h-16 w-16 text-[#407140]" />
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="h-6 w-6 text-gray-500" />
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <ParallaxSection
          id="value"
          ref={(el) => {
            valueRef.current = el
            valueInViewRef(el)
          }}
          className="py-20 md:py-32 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Why Top Agents Choose <span className="text-[#407140]">EZ BIG</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                We've reimagined the real estate affiliate experience to maximize your potential and elevate your
                career.
              </motion.p>
            </div>

            <Tabs defaultValue="earnings" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="earnings"
                  className="text-lg py-3 data-[state=active]:bg-[#407140] data-[state=active]:text-white rounded-md"
                  onMouseEnter={() => handleMouseEnter("tab")}
                  onMouseLeave={handleMouseLeave}
                >
                  Earnings
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="text-lg py-3 data-[state=active]:bg-[#407140] data-[state=active]:text-white rounded-md"
                  onMouseEnter={() => handleMouseEnter("tab")}
                  onMouseLeave={handleMouseLeave}
                >
                  Support
                </TabsTrigger>
                <TabsTrigger
                  value="lifestyle"
                  className="text-lg py-3 data-[state=active]:bg-[#407140] data-[state=active]:text-white rounded-md"
                  onMouseEnter={() => handleMouseEnter("tab")}
                  onMouseLeave={handleMouseLeave}
                >
                  Lifestyle
                </TabsTrigger>
              </TabsList>

              <TabsContent value="earnings" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Industry-Leading Commission Splits</h3>
                    <p className="text-gray-600 mb-6">
                      Our innovative commission structure ensures you keep more of what you earn, with splits starting
                      at 80/20 and increasing based on performance.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Standard Agent</span>
                          <span className="text-[#407140]">80%</span>
                        </div>
                        <Progress value={80} className="h-2 bg-gray-200" indicatorClassName="bg-[#407140]" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Elite Agent</span>
                          <span className="text-[#407140]">90%</span>
                        </div>
                        <Progress value={90} className="h-2 bg-gray-200" indicatorClassName="bg-[#407140]" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Legacy Partner</span>
                          <span className="text-[#407140]">95%</span>
                        </div>
                        <Progress value={95} className="h-2 bg-gray-200" indicatorClassName="bg-[#407140]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/closing-deal-joy.png"
                      alt="Successful real estate agent"
                      width={800}
                      height={600}
                      className="rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Image
                      src="/collaborative-real-estate-strategy.png"
                      alt="Real estate team collaboration"
                      width={800}
                      height={600}
                      className="rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Support System</h3>
                    <p className="text-gray-600 mb-6">
                      Never feel alone in your business. Our dedicated support team and community of successful agents
                      are always available to help you overcome challenges.
                    </p>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-[#407140]/20 p-2 rounded-full mt-1">
                          <Users className="h-5 w-5 text-[#407140]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Dedicated Mentorship</h4>
                          <p className="text-gray-600">One-on-one guidance from top-performing agents</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="bg-[#407140]/20 p-2 rounded-full mt-1">
                          <Building2 className="h-5 w-5 text-[#407140]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Administrative Support</h4>
                          <p className="text-gray-600">Focus on selling while we handle the paperwork</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="bg-[#407140]/20 p-2 rounded-full mt-1">
                          <MapPin className="h-5 w-5 text-[#407140]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Lead Generation</h4>
                          <p className="text-gray-600">Cutting-edge marketing tools and qualified leads</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lifestyle" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Work-Life Balance Reimagined</h3>
                    <p className="text-gray-600 mb-6">
                      Our innovative approach allows you to build a thriving real estate career while maintaining the
                      lifestyle you desire.
                    </p>

                    <div className="space-y-6">
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#407140] to-transparent"></div>
                        <div className="pl-6">
                          <h4 className="font-medium text-gray-800">Flexible Scheduling</h4>
                          <p className="text-gray-600">
                            Build your business around your life, not the other way around
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#407140] to-transparent"></div>
                        <div className="pl-6">
                          <h4 className="font-medium text-gray-800">Remote Work Options</h4>
                          <p className="text-gray-600">State-of-the-art technology allows you to work from anywhere</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#407140] to-transparent"></div>
                        <div className="pl-6">
                          <h4 className="font-medium text-gray-800">Wellness Programs</h4>
                          <p className="text-gray-600">
                            Exclusive access to fitness, mental health, and lifestyle benefits
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/welcoming-real-estate-team.png"
                      alt="Real estate work-life balance"
                      width={800}
                      height={600}
                      className="rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ParallaxSection>

        {/* Process Section */}
        <section
          id="process"
          ref={(el) => {
            processRef.current = el
            processInViewRef(el)
          }}
          className="py-20 md:py-32 bg-[#f8f8f8]"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Your Journey to <span className="text-[#407140]">Excellence</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                We've designed a clear path to help you transform your real estate career and achieve unprecedented
                success.
              </motion.p>
            </div>

            <InteractiveTimeline />
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={(el) => {
            testimonialsRef.current = el
            testimonialsInViewRef(el)
          }}
          className="py-20 md:py-32 bg-white"
        >
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
                  onMouseEnter={() => handleMouseEnter("card")}
                  onMouseLeave={handleMouseLeave}
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

        {/* Income Calculator Section */}
        <section
          id="calculator"
          ref={(el) => {
            calculatorRef.current = el
            calculatorInViewRef(el)
          }}
          className="py-20 md:py-32 bg-[#f8f8f8]"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Calculate Your <span className="text-[#407140]">Potential</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                See how your income could transform with our industry-leading commission structure and support.
              </motion.p>
            </div>

            <IncomeCalculator onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </div>
        </section>

        {/* Agent Type Quiz Section */}
        <section
          id="quiz"
          ref={(el) => {
            quizRef.current = el
            quizInViewRef(el)
          }}
          className="py-20 md:py-32 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Discover Your <span className="text-[#407140]">Agent Type</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                Take our quick quiz to find out which path at EZ BIG is perfect for your skills and goals.
              </motion.p>
            </div>

            <AgentTypeQuiz onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-[#f8f8f8]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Frequently Asked <span className="text-[#407140]">Questions</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                Everything you need to know about joining the EZ BIG family.
              </motion.p>
            </div>

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
                      "Our commission structure starts at an 80/20 split in your favor and increases based on performance. Elite agents can earn up to 90%, and Legacy Partners can earn up to 95%. There are no desk fees, and we offer multiple paths to increase your commission split based on your individual goals.",
                  },
                  {
                    question: "Is EZ BIG available in my area?",
                    answer:
                      "EZ BIG is rapidly expanding across the country and currently operates in 32+ markets nationwide. If we're not in your area yet, we have expansion plans and would be happy to discuss bringing EZ BIG to your market.",
                  },
                  {
                    question: "What technology does EZ BIG provide?",
                    answer:
                      "Our proprietary technology platform includes CRM systems, transaction management software, marketing automation tools, lead generation systems, and virtual showing capabilities. We continuously invest in technology to ensure our agents have the most advanced tools available.",
                  },
                  {
                    question: "How do I get started?",
                    answer:
                      "Getting started is easy! Simply fill out the application form below, and one of our team members will contact you within 24 hours to schedule a consultation. We'll discuss your goals, answer any questions, and guide you through the onboarding process.",
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <AccordionTrigger
                      className="px-6 py-4 hover:bg-gray-50 text-gray-800 text-left"
                      onMouseEnter={() => handleMouseEnter("accordion")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          ref={(el) => {
            ctaRef.current = el
            ctaInViewRef(el)
          }}
          className="py-20 md:py-32 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-[#407140] rounded-3xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-6"
                  >
                    Ready to Transform Your Real Estate Career?
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white/90 mb-8"
                  >
                    Join the elite network of real estate professionals who are redefining success in the industry. Fill
                    out the form to get started on your journey to the next level.
                  </motion.p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Industry-leading commission splits",
                      "Comprehensive support system",
                      "Cutting-edge technology platform",
                      "Exclusive lead generation tools",
                      "Work-life balance focus",
                    ].map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2 text-white"
                      >
                        <div className="bg-white/20 p-1 rounded-full">
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-white mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-white mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-white mb-1">
                        Years of Experience
                      </label>
                      <select
                        id="experience"
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        <option value="" className="bg-gray-800">
                          Select experience
                        </option>
                        <option value="0-1" className="bg-gray-800">
                          0-1 years
                        </option>
                        <option value="1-3" className="bg-gray-800">
                          1-3 years
                        </option>
                        <option value="3-5" className="bg-gray-800">
                          3-5 years
                        </option>
                        <option value="5+" className="bg-gray-800">
                          5+ years
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                        Why are you interested in EZ BIG?
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Tell us a bit about your goals..."
                      ></textarea>
                    </div>

                    <Button
                      className="w-full bg-white text-[#407140] hover:bg-white/90 py-6 text-lg font-medium"
                      onMouseEnter={() => handleMouseEnter("button", "Submit")}
                      onMouseLeave={handleMouseLeave}
                    >
                      Start Your EZ BIG Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="text-white/70 text-sm text-center">
                      By submitting, you agree to our{" "}
                      <Link href="#" className="underline hover:text-white">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="underline hover:text-white">
                        Terms of Service
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8 text-[#407140]" />
                <span className="text-xl font-bold text-[#407140]">EZ BIG Realty</span>
              </div>
              <p className="text-gray-600 mb-4">
                Redefining success in real estate through innovation, support, and exceptional opportunities.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.23 15.23c-.399.4-.94.4-1.34 0l-3.89-3.89-3.89 3.89c-.4.4-.94.4-1.34 0-.4-.4-.4-.94 0-1.34l3.89-3.89-3.89-3.89c-.4-.4-.4-.94 0-1.34.4-.4.94-.4 1.34 0l3.89 3.89 3.89-3.89c.4-.4.94-.4 1.34 0 .4.4.4.94 0 1.34l-3.89 3.89 3.89 3.89c.4.4.4.94 0 1.34z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.25 15h-2.5v-8h2.5v8zm-1.25-9c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm8.75 9h-2.5v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V17h-2.5V9h2.5v1.5c.747-.908 1.8-1.5 3-1.5 2.209 0 4 1.791 4 4V17z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.5 7.5h-1.513c-.96 0-1.487.6-1.487 1.36v1.64h2.4l-.4 2.4h-2v6.2h-2.4v-6.2h-2v-2.4h2v-1.8c0-2 1.2-3.1 3-3.1 1.2 0 1.8.1 2.4.2v1.7z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Agent Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    GDPR
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#407140] transition-colors">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} EZ BIG Realty. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
