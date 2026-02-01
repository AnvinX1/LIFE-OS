"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
  animate?: boolean
  loading?: boolean
}

export function Logo({ size = "md", showText = true, className, animate = true, loading = false }: LogoProps) {
  const sizeClasses = {
    sm: { container: "h-8 w-8", ring: "h-6 w-6", core: "h-3 w-3", orbit: "h-1 w-1", text: "text-xs" },
    md: { container: "h-12 w-12", ring: "h-9 w-9", core: "h-4 w-4", orbit: "h-1.5 w-1.5", text: "text-sm" },
    lg: { container: "h-16 w-16", ring: "h-12 w-12", core: "h-6 w-6", orbit: "h-2 w-2", text: "text-base" },
    xl: { container: "h-24 w-24", ring: "h-18 w-18", core: "h-8 w-8", orbit: "h-2.5 w-2.5", text: "text-lg" },
  }

  const s = sizeClasses[size]

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Mark */}
      <div
        className={cn(
          "logo-container relative flex items-center justify-center rounded-full bg-[#f2f2f2]",
          s.container,
          loading ? "shadow-none" : "shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]"
        )}
      >
        {/* Outer ring */}
        <div
          className={cn(
            "logo-ring absolute flex items-center justify-center rounded-full",
            s.ring,
            loading 
              ? "shadow-none border-2 border-[#d1d9e6]" 
              : "shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff]"
          )}
        >
          {/* Orbit dot */}
          <div 
            className={cn(
              "logo-orbit absolute rounded-full bg-[#111111]",
              s.orbit,
              animate && "animate-orbit"
            )} 
            style={{ 
              top: "-2px",
              transformOrigin: "center 200%",
            }} 
          />
        </div>
        
        {/* Core with morphing effect */}
        <div
          className={cn(
            "logo-core z-10 bg-[#111111]",
            s.core,
            animate && !loading && "animate-logo-morph",
            loading && "animate-logo-loading"
          )}
        />
        
        {/* Loading ring effect */}
        {loading && (
          <div 
            className={cn(
              "absolute rounded-full border-2 border-transparent border-t-[#111111] animate-spin",
              s.container
            )}
            style={{ animationDuration: "1s" }}
          />
        )}
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-black tracking-tight text-foreground leading-none", s.text)}>
            LIFE OS
          </span>
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Universal Intelligence
          </span>
        </div>
      )}
    </div>
  )
}
