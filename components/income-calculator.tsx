"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface IncomeCalculatorProps {
  onMouseEnter: (variant: string, text?: string) => void
  onMouseLeave: () => void
}

export default function IncomeCalculator({ onMouseEnter, onMouseLeave }: IncomeCalculatorProps) {
  const [transactions, setTransactions] = useState(12)
  const [avgPrice, setAvgPrice] = useState(350000)
  const [avgCommission, setAvgCommission] = useState(3)
  const [splitType, setSplitType] = useState("nextlevel")

  // Calculate earnings
  const calculateEarnings = () => {
    const totalVolume = transactions * avgPrice
    const totalCommission = totalVolume * (avgCommission / 100)

    let agentSplit = 0
    if (splitType === "traditional") {
      agentSplit = 0.5 // 50/50 split
    } else if (splitType === "nextlevel") {
      // NextLevel tiered structure
      if (transactions < 10) {
        agentSplit = 0.8 // 80/20 split
      } else if (transactions < 20) {
        agentSplit = 0.85 // 85/15 split
      } else if (transactions < 30) {
        agentSplit = 0.9 // 90/10 split
      } else {
        agentSplit = 0.95 // 95/5 split
      }
    }

    const agentEarnings = totalCommission * agentSplit
    return {
      totalVolume,
      totalCommission,
      agentEarnings,
      brokerEarnings: totalCommission - agentEarnings,
      agentSplit: agentSplit * 100,
    }
  }

  const earnings = calculateEarnings()

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white shadow-md border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800 text-2xl">Income Potential Calculator</CardTitle>
          <CardDescription className="text-gray-600">
            Adjust the sliders to see how your income could change with EZ BIG Realty
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="nextlevel" onValueChange={setSplitType}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger
                value="nextlevel"
                className="data-[state=active]:bg-azure-500 data-[state=active]:text-white"
                onMouseEnter={() => onMouseEnter("tab")}
                onMouseLeave={onMouseLeave}
              >
                EZ BIG Realty
              </TabsTrigger>
              <TabsTrigger
                value="traditional"
                className="data-[state=active]:bg-azure-500 data-[state=active]:text-white"
                onMouseEnter={() => onMouseEnter("tab")}
                onMouseLeave={onMouseLeave}
              >
                Traditional Brokerage
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-gray-800 font-medium">Number of Transactions per Year</label>
                <span className="text-azure-500 font-bold">{transactions}</span>
              </div>
              <Slider
                value={[transactions]}
                min={1}
                max={50}
                step={1}
                onValueChange={(value) => setTransactions(value[0])}
                className="py-4"
                onMouseEnter={() => onMouseEnter("button")}
                onMouseLeave={onMouseLeave}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-gray-800 font-medium">Average Sale Price</label>
                <span className="text-azure-500 font-bold">${avgPrice.toLocaleString()}</span>
              </div>
              <Slider
                value={[avgPrice]}
                min={100000}
                max={1000000}
                step={10000}
                onValueChange={(value) => setAvgPrice(value[0])}
                className="py-4"
                onMouseEnter={() => onMouseEnter("button")}
                onMouseLeave={onMouseLeave}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$100k</span>
                <span>$500k</span>
                <span>$1M</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-gray-800 font-medium">Average Commission Rate</label>
                <span className="text-azure-500 font-bold">{avgCommission}%</span>
              </div>
              <Slider
                value={[avgCommission]}
                min={1}
                max={6}
                step={0.1}
                onValueChange={(value) => setAvgCommission(value[0])}
                className="py-4"
                onMouseEnter={() => onMouseEnter("button")}
                onMouseLeave={onMouseLeave}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1%</span>
                <span>3%</span>
                <span>6%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <motion.div className="bg-gray-50 rounded-xl p-6 text-center shadow-sm" whileHover={{ y: -5 }}>
              <h3 className="text-gray-600 mb-2">Total Sales Volume</h3>
              <p className="text-3xl font-bold text-gray-800">${earnings.totalVolume.toLocaleString()}</p>
            </motion.div>

            <motion.div className="bg-gray-50 rounded-xl p-6 text-center shadow-sm" whileHover={{ y: -5 }}>
              <h3 className="text-gray-600 mb-2">Your Commission Split</h3>
              <p className="text-3xl font-bold text-gray-800">{earnings.agentSplit}%</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-azure-500 to-azure-400 rounded-xl p-6 text-center shadow-sm"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-white/90 mb-2">Your Annual Income</h3>
              <p className="text-3xl font-bold text-white">${Math.round(earnings.agentEarnings).toLocaleString()}</p>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Your Income with EZ BIG</span>
              <span className="text-azure-500 font-bold">
                ${Math.round(calculateEarnings().agentEarnings).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Your Income with Traditional Brokerage</span>
              <span className="text-gray-700 font-bold">
                ${Math.round(transactions * avgPrice * (avgCommission / 100) * 0.5).toLocaleString()}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-800 font-medium">Potential Additional Income</span>
                <span className="text-azure-500 font-bold">
                  $
                  {Math.round(
                    calculateEarnings().agentEarnings - transactions * avgPrice * (avgCommission / 100) * 0.5,
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-azure-500 hover:bg-azure-600 text-white py-6 text-lg"
            onMouseEnter={() => onMouseEnter("button", "Join Now")}
            onMouseLeave={onMouseLeave}
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
          >
            <DollarSign className="mr-2 h-5 w-5" />
            Start Earning More Today
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
