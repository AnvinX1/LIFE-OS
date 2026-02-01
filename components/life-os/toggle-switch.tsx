"use client"

import { cn } from "@/lib/utils"
import { useNative } from "@/components/native-provider"

interface ToggleSwitchProps {
  enabled: boolean
  onToggle: () => void
}

export function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
  const { hapticMedium } = useNative()

  const handleToggle = () => {
    hapticMedium()
    onToggle()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "relative h-[26px] w-[50px] cursor-pointer rounded-[13px] transition-all duration-300 shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff]",
        enabled ? "bg-[#111111]" : "bg-[#f2f2f2]"
      )}
      aria-pressed={enabled}
    >
      <span
        className={cn(
          "absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-[2px_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300",
          enabled ? "left-[27px]" : "left-[3px]"
        )}
      />
    </button>
  )
}

