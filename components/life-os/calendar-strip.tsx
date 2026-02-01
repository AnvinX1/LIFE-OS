"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { getWeekDays } from "@/lib/life-os-store"

interface CalendarStripProps {
  selectedDate?: string
  onSelectDate?: (dateStr: string) => void
}

export function CalendarStrip({ selectedDate, onSelectDate }: CalendarStripProps) {
  const days = useMemo(() => getWeekDays(), [])
  const selected = selectedDate || days.find((d) => d.isToday)?.dateStr

  return (
    <div className="my-4 flex justify-between gap-1 sm:my-5 sm:gap-2">
      {days.map((item) => {
        const isActive = item.dateStr === selected

        return (
          <button
            key={item.dateStr}
            type="button"
            onClick={() => onSelectDate?.(item.dateStr)}
            className={cn(
              "flex h-[50px] flex-1 flex-col items-center justify-center rounded-xl text-[10px] transition-all sm:h-[55px] sm:text-[11px]",
              isActive
                ? "bg-[#111111] text-white shadow-[4px_4px_8px_rgba(0,0,0,0.15)]"
                : "bg-[#f2f2f2] text-foreground shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]",
              item.isToday && !isActive && "ring-1 ring-[#111111]/20"
            )}
          >
            <span className="font-medium">{item.day}</span>
            <span className="font-bold">{item.date}</span>
          </button>
        )
      })}
    </div>
  )
}
