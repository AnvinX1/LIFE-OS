"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface ActivityGridProps {
  days?: number
}

export function ActivityGrid({ days = 28 }: ActivityGridProps) {
  const squares = useMemo(() => {
    return Array.from({ length: days }, () => {
      const r = Math.random()
      if (r > 0.8) return "sq-high"
      if (r > 0.5) return "sq-mid"
      if (r > 0.2) return "sq-low"
      return ""
    })
  }, [days])

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {squares.map((level, index) => (
        <div
          key={index}
          className={cn(
            "aspect-square rounded-[3px]",
            level === "sq-high" && "bg-[#111111]",
            level === "sq-mid" && "bg-[#a3aab6]",
            level === "sq-low" && "bg-[#d1d9e6]",
            !level && "bg-[#e2e8f0]"
          )}
        />
      ))}
    </div>
  )
}
