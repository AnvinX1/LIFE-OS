"use client"

import { useMemo } from "react"
import { MorphOrb, CalendarStrip, PriorityItem, TaskInput, HabitTracker } from "@/components/life-os"
import { useLifeOSData } from "@/lib/life-os-store"

export default function DashboardPage() {
  const { data } = useLifeOSData()

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()
  }, [])

  const completedToday = useMemo(() => {
    return data.tasks.filter((t) => t.status === "completed").length
  }, [data.tasks])

  const totalTasks = data.tasks.length
  const focusScore = totalTasks > 0 ? Math.round((completedToday / totalTasks) * 100) : 100

  return (
    <div className="stagger-children">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground sm:text-xs">
          Dashboard
        </span>
        <span className="text-[10px] font-bold text-foreground sm:text-xs">{todayFormatted}</span>
      </div>

      {/* Orb Visualization */}
      <div>
        <MorphOrb />
      </div>

      {/* Focus State */}
      <div className="mb-4 text-center sm:mb-6">
        <h1 className="text-2xl font-black text-foreground text-balance sm:text-3xl">
          {focusScore >= 80 ? "Focus State" : focusScore >= 50 ? "Building Up" : "Getting Started"}
        </h1>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground sm:text-[10px]">
          {completedToday}/{totalTasks} tasks completed
        </p>
      </div>

      {/* Calendar Strip */}
      <div>
        <CalendarStrip />
      </div>

      {/* Task Input */}
      <div>
        <TaskInput />
      </div>

      {/* Priority Stack */}
      <div className="mt-2">
        <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground sm:mb-4">
          Priority Stack
        </h3>
        {data.tasks.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">
            No tasks yet. Add your first task above.
          </div>
        ) : (
          <div className="space-y-0">
            {data.tasks.map((task, index) => (
              <div 
                key={task.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PriorityItem
                  id={task.id}
                  title={task.title}
                  time={task.time}
                  status={task.status}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Habit Tracker */}
      <div>
        <HabitTracker />
      </div>
    </div>
  )
}
