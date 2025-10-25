"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Header */}
      <header className="bg-[#f8f8f8]/70 backdrop-blur-xl shadow-sm border-b border-gray-200/20 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <div className="flex items-center">
            <div className="relative h-8 w-56">
              <Image src="/condo-systems-text.png" alt="Condo Systems" fill sizes="224px" style={{ objectFit: "contain" }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          <div className="w-16 h-1 bg-azure-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 mb-8">Work in Progress</p>
          <p className="text-gray-500 mb-8">This page is currently under development. Please check back later.</p>
          <Link href="/">
            <Button className="bg-azure-500 hover:bg-azure-600 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} EZ BIG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
