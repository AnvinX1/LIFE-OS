"use client"

import React from "react"

import { useState } from "react"
import { Brain, Target, Activity, BookOpen, Plus, Check, Flame, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLifeOSData, toggleHabitForDate, addHabit, deleteHabit, getTodayString } from "@/lib/life-os-store"
import { NeuCard } from "./neu-card"
import { useNative } from "@/components/native-provider"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  target: Target,
  activity: Activity,
  book: BookOpen,
}

export function HabitTracker() {
  const { data } = useLifeOSData()
  const [isAdding, setIsAdding] = useState(false)
  const [newHabitName, setNewHabitName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("brain")
  const { hapticMedium, hapticSuccess, hapticLight, hapticWarning } = useNative()

  const today = getTodayString()

  const handleToggleHabit = (habitId: string, isCurrentlyCompleted: boolean) => {
    toggleHabitForDate(habitId, today)
    // Success haptic when completing, light when uncompleting
    if (!isCurrentlyCompleted) {
      hapticSuccess()
    } else {
      hapticLight()
    }
  }

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit({
        name: newHabitName.trim(),
        icon: selectedIcon,
        frequency: "daily",
      })
      setNewHabitName("")
      setSelectedIcon("brain")
      setIsAdding(false)
      hapticSuccess()
    }
  }

  const handleDeleteHabit = (habitId: string) => {
    deleteHabit(habitId)
    hapticWarning()
  }

  const handleToggleAdd = () => {
    setIsAdding(!isAdding)
    hapticLight()
  }

  const handleSelectIcon = (icon: string) => {
    setSelectedIcon(icon)
    hapticLight()
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Daily Habits
        </h3>
        <button
          type="button"
          onClick={handleToggleAdd}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f2f2f2] text-muted-foreground shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all hover:text-foreground active:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Add Habit Form */}
      {isAdding && (
        <NeuCard variant="pressed" className="mb-4 p-4">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Habit name..."
            className="mb-3 w-full bg-transparent text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          <div className="mb-3 flex gap-2">
            {Object.entries(iconMap).map(([key, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectIcon(key)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
                  selectedIcon === key
                    ? "bg-[#111111] text-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]"
                    : "bg-[#f2f2f2] text-muted-foreground shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddHabit}
              disabled={!newHabitName.trim()}
              className="flex-1 rounded-xl bg-[#111111] py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              Add Habit
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-xl bg-[#f2f2f2] px-4 py-2 text-xs font-bold text-muted-foreground shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]"
            >
              Cancel
            </button>
          </div>
        </NeuCard>
      )}

      {/* Habit Grid */}
      <div className="grid grid-cols-2 gap-3">
        {data.habits.map((habit) => {
          const Icon = iconMap[habit.icon] || Brain
          const isCompletedToday = habit.completedDates.includes(today)

          return (
            <NeuCard
              key={habit.id}
              className={cn(
                "group relative p-4 transition-all",
                isCompletedToday && "bg-[#111111]"
              )}
            >
              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDeleteHabit(habit.id)}
                className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className={cn("h-3 w-3", isCompletedToday ? "text-white/50" : "text-muted-foreground")} />
              </button>

              <button
                type="button"
                onClick={() => handleToggleHabit(habit.id, isCompletedToday)}
                className="flex w-full flex-col items-start text-left"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
                      isCompletedToday
                        ? "bg-white/20 text-white"
                        : "bg-[#e8eef5] text-foreground shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]"
                    )}
                  >
                    {isCompletedToday ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold leading-tight",
                    isCompletedToday ? "text-white" : "text-foreground"
                  )}
                >
                  {habit.name}
                </span>
                {habit.streak > 0 && (
                  <div
                    className={cn(
                      "mt-1 flex items-center gap-1 text-[9px] font-bold",
                      isCompletedToday ? "text-white/70" : "text-orange-500"
                    )}
                  >
                    <Flame className="h-3 w-3" />
                    {habit.streak} day streak
                  </div>
                )}
              </button>
            </NeuCard>
          )
        })}
      </div>
    </div>
  )
}
