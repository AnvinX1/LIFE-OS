"use client"

import React from "react"

import { useEffect, useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [previousPath, setPreviousPath] = useState(pathname)

  const handleTransition = useCallback(() => {
    if (pathname !== previousPath) {
      setIsTransitioning(true)
      
      // Short delay before changing content
      const contentTimer = setTimeout(() => {
        setDisplayChildren(children)
        setPreviousPath(pathname)
      }, 150)

      // End transition
      const endTimer = setTimeout(() => {
        setIsTransitioning(false)
      }, 400)

      return () => {
        clearTimeout(contentTimer)
        clearTimeout(endTimer)
      }
    } else {
      setDisplayChildren(children)
    }
  }, [pathname, previousPath, children])

  useEffect(() => {
    handleTransition()
  }, [handleTransition])

  return (
    <div className="relative h-full w-full">
      {/* Content with fade transition */}
      <div
        className={cn(
          "h-full w-full transition-all duration-300 ease-out",
          isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
        )}
      >
        {displayChildren}
      </div>

      {/* Transition overlay with logo */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-[#f2f2f2]/80 backdrop-blur-sm transition-all duration-300",
          isTransitioning ? "opacity-100" : "opacity-0"
        )}
      >
        <div className={cn(
          "transition-all duration-300",
          isTransitioning ? "scale-100 opacity-100" : "scale-90 opacity-0"
        )}>
          <Logo size="lg" showText={false} loading />
        </div>
      </div>
    </div>
  )
}
