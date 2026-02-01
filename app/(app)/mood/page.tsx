"use client"

import { useState, useMemo } from "react"
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { NeuCard } from "@/components/life-os"
import { useLifeOSData, addMoodEntry, getTodayString } from "@/lib/life-os-store"

const stressLevels = [
  { value: "low" as const, label: "Low", color: "bg-green-500" },
  { value: "medium" as const, label: "Medium", color: "bg-yellow-500" },
  { value: "high" as const, label: "High", color: "bg-red-500" },
]

export default function MoodPage() {
  const { data } = useLifeOSData()
  const [isAdding, setIsAdding] = useState(false)
  const [energy, setEnergy] = useState(70)
  const [stress, setStress] = useState<"low" | "medium" | "high">("low")
  const [focus, setFocus] = useState(80)

  const today = getTodayString()
  const todayEntry = data.moods.find((m) => m.date === today)

  const last7Days = useMemo(() => {
    const sorted = [...data.moods].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return sorted.slice(0, 7)
  }, [data.moods])

  const avgEnergy = useMemo(() => {
    if (last7Days.length === 0) return 75
    return Math.round(last7Days.reduce((acc, m) => acc + m.energy, 0) / last7Days.length)
  }, [last7Days])

  const handleAddEntry = () => {
    addMoodEntry({
      date: today,
      energy,
      stress,
      focus,
    })
    setIsAdding(false)
  }

  const getStressLabel = (s: string) => {
    if (s === "low") return "Low"
    if (s === "medium") return "Med"
    return "High"
  }

  const getTrend = () => {
    if (last7Days.length < 2) return null
    const recent = last7Days.slice(0, 3)
    const older = last7Days.slice(3, 6)
    if (older.length === 0) return null
    const recentAvg = recent.reduce((a, m) => a + m.energy, 0) / recent.length
    const olderAvg = older.reduce((a, m) => a + m.energy, 0) / older.length
    if (recentAvg > olderAvg + 5) return "up"
    if (recentAvg < olderAvg - 5) return "down"
    return "stable"
  }

  const trend = getTrend()

  return (
    <div className="stagger-children">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-black text-foreground sm:text-2xl">Mood Analyzer</h1>
        {!todayEntry && !isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white shadow-[4px_4px_8px_#d1d9e6]"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="mb-6 text-[10px] font-medium text-muted-foreground sm:mb-8 sm:text-xs">
        Real-time emotional telemetry.
      </p>

      {/* Add Entry Form */}
      {isAdding && (
        <NeuCard variant="pressed" className="mb-6 p-5">
          <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
            Log Today&apos;s Mood
          </h3>
          
          {/* Energy */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Energy Level</span>
              <span className="text-xs font-black text-foreground">{energy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-foreground"
            />
          </div>

          {/* Focus */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Focus Level</span>
              <span className="text-xs font-black text-foreground">{focus}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={focus}
              onChange={(e) => setFocus(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-foreground"
            />
          </div>

          {/* Stress */}
          <div className="mb-5">
            <span className="mb-2 block text-xs font-bold text-foreground">Stress Level</span>
            <div className="flex gap-2">
              {stressLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setStress(level.value)}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                    stress === level.value
                      ? "bg-[#111111] text-white"
                      : "bg-[#f2f2f2] text-foreground shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddEntry}
              className="flex-1 rounded-xl bg-[#111111] py-3 text-xs font-bold text-white"
            >
              Save Entry
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-xl bg-[#f2f2f2] px-4 py-3 text-xs font-bold text-muted-foreground shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]"
            >
              Cancel
            </button>
          </div>
        </NeuCard>
      )}

      {/* Chart */}
      <NeuCard variant="pressed" className="mb-6 flex h-36 items-end gap-1.5 p-4 sm:mb-8 sm:h-40 sm:gap-2 sm:p-6">
        {last7Days.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No mood data yet. Add your first entry.
          </div>
        ) : (
          [...last7Days].reverse().map((entry, i) => (
            <div
              key={entry.id}
              className="flex-1 rounded-t-lg bg-foreground transition-all hover:opacity-80"
              style={{ height: `${entry.energy}%` }}
              title={`${entry.date}: ${entry.energy}% energy`}
            />
          ))
        )}
      </NeuCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <NeuCard className="p-4 sm:p-5">
          <div className="mb-1 text-[9px] font-black uppercase text-muted-foreground sm:text-[10px]">
            Avg Energy
          </div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-black text-foreground sm:text-xl">{avgEnergy}%</div>
            {trend && (
              <div className="text-muted-foreground">
                {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                {trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                {trend === "stable" && <Minus className="h-4 w-4" />}
              </div>
            )}
          </div>
        </NeuCard>
        <NeuCard className="p-4 sm:p-5">
          <div className="mb-1 text-[9px] font-black uppercase text-muted-foreground sm:text-[10px]">
            Current Stress
          </div>
          <div className="text-lg font-black text-foreground sm:text-xl">
            {todayEntry ? getStressLabel(todayEntry.stress) : last7Days[0] ? getStressLabel(last7Days[0].stress) : "N/A"}
          </div>
        </NeuCard>
      </div>

      {/* Today's Entry */}
      {todayEntry && (
        <NeuCard className="mt-6 p-5 sm:mt-8 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Today&apos;s Check-in</span>
            <span className="text-[10px] font-black text-green-500">LOGGED</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-black text-foreground">{todayEntry.energy}%</div>
              <div className="text-[9px] font-bold uppercase text-muted-foreground">Energy</div>
            </div>
            <div>
              <div className="text-lg font-black text-foreground">{todayEntry.focus}%</div>
              <div className="text-[9px] font-bold uppercase text-muted-foreground">Focus</div>
            </div>
            <div>
              <div className="text-lg font-black text-foreground">{getStressLabel(todayEntry.stress)}</div>
              <div className="text-[9px] font-bold uppercase text-muted-foreground">Stress</div>
            </div>
          </div>
        </NeuCard>
      )}
    </div>
  )
}
