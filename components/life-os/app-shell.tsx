"use client"

import type { ReactNode } from "react"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
      {/* Mobile: full screen, Tablet/Desktop: contained card */}
      <div className="relative flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden bg-[#f2f2f2] sm:h-[90vh] sm:max-h-[900px] sm:rounded-[48px] sm:shadow-[30px_30px_60px_#d1d9e6,-30px_-30px_60px_#ffffff] md:max-w-[420px] lg:max-w-[400px]">
        {children}
      </div>
    </div>
  )
}
