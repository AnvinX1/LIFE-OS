"use client"

import React, { useState } from "react"
import { AppShell, Navigation, LoadingScreen, Logo, PageTransition } from "@/components/life-os"
import { NativeProvider } from "@/components/native-provider"
import { cn } from "@/lib/utils"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <NativeProvider>
      <AppShell>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

        {/* Header with Logo - animated entrance */}
        <header
          className={cn(
            "flex shrink-0 items-center justify-between px-5 pt-6 transition-all duration-500 sm:px-[30px] sm:pt-8",
            isLoading ? "opacity-0 translate-y-[-10px]" : "opacity-100 translate-y-0"
          )}
          style={{ transitionDelay: isLoading ? "0ms" : "200ms" }}
        >
          <Logo size="sm" animate={!isLoading} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f2f2] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] neu-transition">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </header>

        <main
          className={cn(
            "flex flex-1 flex-col overflow-y-auto px-5 pb-2 pt-4 transition-all duration-500 sm:px-[30px] sm:pt-6",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          style={{ transitionDelay: isLoading ? "0ms" : "400ms" }}
        >
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        {/* Navigation with animated entrance */}
        <div
          className={cn(
            "transition-all duration-500",
            isLoading ? "opacity-0 translate-y-[20px]" : "opacity-100 translate-y-0"
          )}
          style={{ transitionDelay: isLoading ? "0ms" : "300ms" }}
        >
          <Navigation />
        </div>
      </AppShell>
    </NativeProvider>
  )
}

