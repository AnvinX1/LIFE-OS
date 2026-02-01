"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, Grid3X3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNative } from "@/components/native-provider"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/mood", icon: Activity, label: "Mood" },
  { href: "/recorder", icon: Grid3X3, label: "Log" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function Navigation() {
  const pathname = usePathname()
  const { hapticLight } = useNative()

  const handleNavClick = () => {
    hapticLight()
  }

  return (
    <nav className="mt-auto flex h-[72px] shrink-0 items-center justify-around bg-[#f2f2f2] px-4 pb-safe sm:h-[90px] sm:justify-between sm:rounded-b-[48px] sm:px-[30px] sm:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleNavClick}
            className={cn(
              "group relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 transition-all duration-300 sm:h-[50px] sm:w-[50px] sm:flex-row sm:gap-0 sm:rounded-full sm:px-0 sm:py-0",
              isActive
                ? "text-[#111111] sm:bg-[#111111] sm:text-white sm:shadow-[4px_4px_10px_rgba(0,0,0,0.2)]"
                : "text-[#888888] hover:text-[#111111] active:scale-95"
            )}
            aria-label={item.label}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isActive && "sm:scale-100",
                !isActive && "group-hover:scale-110 group-active:scale-95"
              )}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span
              className={cn(
                "text-[9px] font-semibold transition-all duration-200 sm:hidden",
                isActive ? "text-foreground font-bold" : "text-muted-foreground"
              )}
            >
              {item.label}
            </span>
            {/* Active indicator for mobile */}
            {isActive && (
              <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#111111] sm:hidden" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

