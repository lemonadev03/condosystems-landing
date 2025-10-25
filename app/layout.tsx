import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Lexend } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "CondoSystems - All-In-One Property Management Platform",
  description: "Streamline condo and property management with CondoSystems. Manage operations, finances, and communications all in one place.",
  openGraph: {
    title: "CondoSystems - All-In-One Property Management Platform",
    description: "Streamline condo and property management with CondoSystems. Manage operations, finances, and communications all in one place.",
    type: "website",
    url: "https://CondoSystems.com",
    siteName: "CondoSystems",
  },
  twitter: {
    card: "summary_large_image",
    title: "CondoSystems - All-In-One Property Management Platform",
    description: "Streamline condo and property management with CondoSystems. Manage operations, finances, and communications all in one place.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/condosystems-square-logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
