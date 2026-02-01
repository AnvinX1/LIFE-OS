"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "expanding" | "done">("loading")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 25
        if (next >= 100) {
          clearInterval(interval)
          // Start expansion animation
          setTimeout(() => setPhase("expanding"), 300)
          // Complete after expansion
          setTimeout(() => {
            setPhase("done")
            setTimeout(onComplete, 500)
          }, 800)
          return 100
        }
        return next
      })
    }, 180)

    return () => clearInterval(interval)
  }, [onComplete])

  if (phase === "done") return null

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f2f2f2] transition-all",
        phase === "expanding" ? "duration-500 ease-out" : "duration-300"
      )}
      style={{ 
        opacity: phase === "expanding" ? 0 : 1,
        transform: phase === "expanding" ? "scale(1.1)" : "scale(1)",
      }}
    >
      {/* Logo with animated entrance */}
      <div 
        className={cn(
          "mb-8 transition-all duration-700 ease-out",
          progress > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <Logo size="xl" showText={false} loading={progress < 100} />
      </div>

      {/* Brand text with staggered animation */}
      <div className="flex flex-col items-center gap-2">
        <h1 
          className={cn(
            "text-2xl font-black tracking-tight text-foreground transition-all duration-500 delay-100",
            progress > 20 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          LIFE OS
        </h1>
        <p 
          className={cn(
            "text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground transition-all duration-500 delay-200",
            progress > 40 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          Universal Intelligence
        </p>
      </div>

      {/* Progress bar with smooth fill */}
      <div 
        className={cn(
          "mt-10 h-[3px] w-40 overflow-hidden rounded-full bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] transition-all duration-500 delay-300",
          progress > 60 ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#111111] to-[#333333] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status text */}
      <p 
        className={cn(
          "mt-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 transition-all duration-500 delay-400",
          progress > 80 ? "opacity-100" : "opacity-0"
        )}
      >
        {progress < 100 ? "Initializing..." : "Ready"}
      </p>
    </div>
  )
}
