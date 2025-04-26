"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Building2, MapPin, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface ValueSectionProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
  valueInViewRef: (node: Element | null) => void
}

export default function ValueSection({ onMouseEnter, onMouseLeave, valueInViewRef }: ValueSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <Tabs defaultValue="earnings" className="w-full">
        <div className="px-6 pt-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/70 p-1.5 rounded-xl">
            <TabsTrigger
              value="earnings"
              className="text-lg py-3 data-[state=active]:bg-[#407140] data-[state=active]:text-white rounded-lg transition-all duration-300 hover:bg-gray-200/70"
              onMouseEnter={() => onMouseEnter("tab")}
              onMouseLeave={onMouseLeave}
            >
              Earnings
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="text-lg py-3 data-[state=active]:bg-[#407140] data-[state=active]:text-white rounded-lg transition-all duration-300 hover:bg-gray-200/70"
              onMouseEnter={() => onMouseEnter("tab")}
              onMouseLeave={onMouseLeave}
            >
              Support
            </TabsTrigger>
            <TabsTrigger
              value="lifestyle"
              className="text-lg py-3 data-[state=active]:bg-[#407140] data-[state=active]:text-white rounded-lg transition-all duration-300 hover:bg-gray-200/70"
              onMouseEnter={() => onMouseEnter("tab")}
              onMouseLeave={onMouseLeave}
            >
              Lifestyle
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="earnings" className="mt-0 space-y-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100 group">
                <div className="mb-6">
                  <span className="inline-block bg-[#407140]/10 text-[#407140] font-medium px-3 py-1 rounded-full text-sm mb-2">
                    Industry Leading
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#407140] transition-colors">
                    Commission Splits That Reward Success
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our innovative commission structure ensures you keep more of what you earn, with splits starting at
                    80/20 and increasing based on performance.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Standard Agent</span>
                      <span className="text-[#407140] font-medium">80%</span>
                    </div>
                    <Progress value={80} className="h-2.5 bg-gray-200" indicatorClassName="bg-[#407140]" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Elite Agent</span>
                      <span className="text-[#407140] font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2.5 bg-gray-200" indicatorClassName="bg-[#407140]" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Legacy Partner</span>
                      <span className="text-[#407140] font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2.5 bg-gray-200" indicatorClassName="bg-[#407140]" />
                  </div>
                </div>
              </div>

              <div>
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Image
                    src="/closing-deal-joy.png"
                    alt="Successful real estate agent"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-0 space-y-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Image
                    src="/collaborative-real-estate-strategy.png"
                    alt="Real estate team collaboration"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-lg"
                  />
                </motion.div>
              </div>

              <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100 group">
                <div className="mb-6">
                  <span className="inline-block bg-[#407140]/10 text-[#407140] font-medium px-3 py-1 rounded-full text-sm mb-2">
                    Always Available
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#407140] transition-colors">
                    Comprehensive Support System
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Never feel alone in your business. Our dedicated support team and community of successful agents are
                    always available to help you overcome challenges.
                  </p>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
                    <div className="bg-[#407140]/20 p-2 rounded-full mt-1">
                      <Users className="h-5 w-5 text-[#407140]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Dedicated Mentorship</h4>
                      <p className="text-gray-600">One-on-one guidance from top-performing agents</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
                    <div className="bg-[#407140]/20 p-2 rounded-full mt-1">
                      <Building2 className="h-5 w-5 text-[#407140]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Administrative Support</h4>
                      <p className="text-gray-600">Focus on selling while we handle the paperwork</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
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

          <TabsContent value="lifestyle" className="mt-0 space-y-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100 group">
                <div className="mb-6">
                  <span className="inline-block bg-[#407140]/10 text-[#407140] font-medium px-3 py-1 rounded-full text-sm mb-2">
                    Work-Life Balance
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#407140] transition-colors">
                    Lifestyle Designed For You
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our innovative approach allows you to build a thriving real estate career while maintaining the
                    lifestyle you desire.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="relative bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#407140] to-transparent"></div>
                    <div className="pl-4">
                      <h4 className="font-medium text-gray-800">Flexible Scheduling</h4>
                      <p className="text-gray-600">Build your business around your life, not the other way around</p>
                    </div>
                  </div>

                  <div className="relative bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#407140] to-transparent"></div>
                    <div className="pl-4">
                      <h4 className="font-medium text-gray-800">Remote Work Options</h4>
                      <p className="text-gray-600">State-of-the-art technology allows you to work from anywhere</p>
                    </div>
                  </div>

                  <div className="relative bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#407140] to-transparent"></div>
                    <div className="pl-4">
                      <h4 className="font-medium text-gray-800">Wellness Programs</h4>
                      <p className="text-gray-600">
                        Exclusive access to fitness, mental health, and lifestyle benefits
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Image
                    src="/welcoming-real-estate-team.png"
                    alt="Real estate work-life balance"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
