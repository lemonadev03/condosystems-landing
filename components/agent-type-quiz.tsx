"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

interface AgentTypeQuizProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
}

export default function AgentTypeQuiz({ onMouseEnter, onMouseLeave }: AgentTypeQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<string | null>(null)

  const questions = [
    {
      question: "What's most important to you in your real estate career?",
      options: [
        "Maximum commission splits and earnings potential",
        "Support and mentorship from experienced agents",
        "Work-life balance and flexibility",
        "Advanced technology and marketing tools",
      ],
    },
    {
      question: "How would you describe your current experience level?",
      options: [
        "New to real estate (0-2 years)",
        "Established agent (2-5 years)",
        "Experienced professional (5-10 years)",
        "Veteran agent (10+ years)",
      ],
    },
    {
      question: "What's your preferred working style?",
      options: [
        "Independent with minimal oversight",
        "Collaborative with a supportive team",
        "Balanced mix of independence and collaboration",
        "Mentoring others while growing my business",
      ],
    },
    {
      question: "What are your long-term goals in real estate?",
      options: [
        "Build a high-volume individual business",
        "Create a team and expand my reach",
        "Achieve financial freedom with passive income",
        "Develop specialized expertise in a niche market",
      ],
    },
    {
      question: "What's your biggest challenge right now?",
      options: [
        "Generating consistent leads",
        "Administrative tasks and paperwork",
        "Time management and work-life balance",
        "Scaling my business to the next level",
      ],
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const resultType = calculateResult(newAnswers)
      setResult(resultType)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  const calculateResult = (userAnswers: number[]) => {
    // Simple algorithm to determine agent type based on answers
    const counts = [0, 0, 0, 0] // Count for each type

    userAnswers.forEach((answer) => {
      counts[answer]++
    })

    const maxCount = Math.max(...counts)
    const maxIndex = counts.indexOf(maxCount)

    switch (maxIndex) {
      case 0:
        return "Accelerator"
      case 1:
        return "Collaborator"
      case 2:
        return "Lifestyle Designer"
      case 3:
        return "Innovator"
      default:
        return "Balanced Agent"
    }
  }

  const getResultDetails = () => {
    switch (result) {
      case "Accelerator":
        return {
          title: "The Accelerator",
          description:
            "You're driven by results and focused on maximizing your earnings potential. You value independence and have a strong entrepreneurial spirit.",
          strengths: ["High earning potential", "Self-motivated", "Goal-oriented", "Business savvy"],
          nextLevelFit:
            "Our industry-leading commission splits starting at 80/20 and performance-based increases will fuel your drive for success. You'll thrive with our minimal oversight and maximum support model.",
        }
      case "Collaborator":
        return {
          title: "The Collaborator",
          description:
            "You value community and support in your real estate journey. You thrive in team environments and appreciate guidance from experienced professionals.",
          strengths: ["Team player", "Relationship builder", "Client-focused", "Continuous learner"],
          nextLevelFit:
            "Our mentorship program and collaborative culture will provide the support system you need to excel. You'll benefit from our team approach to problem-solving and shared resources.",
        }
      case "Lifestyle Designer":
        return {
          title: "The Lifestyle Designer",
          description:
            "You prioritize work-life balance and flexibility. You're looking to build a successful real estate career that complements your ideal lifestyle.",
          strengths: ["Adaptable", "Efficient", "Value-driven", "Balanced approach"],
          nextLevelFit:
            "Our flexible scheduling options and remote work capabilities will help you design the lifestyle you desire while building a thriving real estate business.",
        }
      case "Innovator":
        return {
          title: "The Innovator",
          description:
            "You're tech-savvy and forward-thinking. You embrace new tools and approaches to stay ahead of the competition and provide exceptional service.",
          strengths: ["Tech-savvy", "Forward-thinking", "Creative problem-solver", "Early adopter"],
          nextLevelFit:
            "Our cutting-edge technology platform and innovative marketing tools will give you the competitive edge you're looking for in today's digital real estate landscape.",
        }
      default:
        return {
          title: "Balanced Agent",
          description:
            "You have a well-rounded approach to real estate, valuing multiple aspects of the business equally.",
          strengths: ["Adaptable", "Versatile", "Well-rounded", "Balanced perspective"],
          nextLevelFit:
            "Our comprehensive approach to agent support will provide you with the perfect balance of resources, technology, and community to help you succeed in all aspects of your business.",
        }
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white shadow-md border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800 text-2xl">
            {result ? "Your Agent Type" : "What Type of Agent Are You?"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {result
              ? "Based on your answers, we've identified your agent personality type"
              : "Answer a few questions to discover which path at EZ BIG is perfect for you"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-azure-500 font-medium">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-azure-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-6">{questions[currentQuestion].question}</h3>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-gray-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(index)}
                      onMouseEnter={() => onMouseEnter("button")}
                      onMouseLeave={onMouseLeave}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <div className="inline-block bg-azure-500/20 p-4 rounded-full mb-4">
                    <CheckCircle2 className="h-12 w-12 text-azure-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{getResultDetails().title}</h3>
                  <p className="text-gray-600">{getResultDetails().description}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Your Key Strengths</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {getResultDetails().strengths.map((strength, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="bg-azure-500/20 p-1 rounded-full">
                          <CheckCircle2 className="h-4 w-4 text-azure-500" />
                        </div>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-azure-500/10 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Why You'll Thrive at EZ BIG</h4>
                  <p className="text-gray-700">{getResultDetails().nextLevelFit}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          {!result ? (
            <>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                onMouseEnter={() => onMouseEnter("button", "Back")}
                onMouseLeave={onMouseLeave}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="text-gray-500 text-sm">
                {currentQuestion + 1} of {questions.length}
              </div>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={resetQuiz}
                onMouseEnter={() => onMouseEnter("button", "Restart")}
                onMouseLeave={onMouseLeave}
              >
                Retake Quiz
              </Button>

              <Button
                className="bg-azure-500 hover:bg-azure-600 text-white"
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                onMouseEnter={() => onMouseEnter("button", "Join Now")}
                onMouseLeave={onMouseLeave}
              >
                Join EZ BIG
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
