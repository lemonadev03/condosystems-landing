"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  variant?: string
  text?: string
}

export default function CustomCursor({ variant = "default", text = "" }: CustomCursorProps) {
  // Custom cursor is disabled
  return null
}
