"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface NeuCardProps {
  children: ReactNode
  variant?: "flat" | "pressed" | "convex"
  className?: string
  interactive?: boolean
  onClick?: () => void
}

export function NeuCard({ children, variant = "flat", className, interactive = false, onClick }: NeuCardProps) {
  const Component = onClick ? "button" : "div"
  
  return (
    <Component
      onClick={onClick}
      type={onClick ? "button" : undefined}
      className={cn(
        "rounded-2xl bg-[#f2f2f2] transition-all duration-200 sm:rounded-3xl",
        variant === "flat" && "shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] sm:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]",
        variant === "pressed" && "shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] sm:shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff]",
        variant === "convex" && "shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] bg-gradient-to-br from-[#ffffff] to-[#e8e8e8]",
        interactive && "cursor-pointer hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] active:scale-[0.99]",
        className
      )}
    >
      {children}
    </Component>
  )
}
