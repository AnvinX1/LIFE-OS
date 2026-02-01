"use client"

import { useState } from "react"
import { Edit3, Check, X, RotateCcw } from "lucide-react"
import { NeuCard, ToggleSwitch } from "@/components/life-os"
import { useLifeOSData, updateSettings, resetAllData } from "@/lib/life-os-store"
import { useNative } from "@/components/native-provider"

export default function SettingsPage() {
  const { data } = useLifeOSData()
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(data.settings.userName)
  const { hapticWarning, hapticLight } = useNative()

  const handleToggleHaptic = () => {
    updateSettings({ hapticFeedback: !data.settings.hapticFeedback })
  }

  const handleToggleNeural = () => {
    updateSettings({ neuralSync: !data.settings.neuralSync })
  }

  const handleBrightnessChange = (value: number) => {
    updateSettings({ brightness: value })
  }

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateSettings({ userName: tempName.trim() })
      setIsEditingName(false)
    }
  }

  const handleCancelEdit = () => {
    setTempName(data.settings.userName)
    setIsEditingName(false)
  }

  const handleResetData = async () => {
    await hapticWarning()
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      await hapticWarning()
      resetAllData()
    }
  }

  // Stats
  const totalTasks = data.tasks.length
  const completedTasks = data.tasks.filter((t) => t.status === "completed").length
  const totalHabits = data.habits.length
  const activeStreaks = data.habits.filter((h) => h.streak > 0).length

  return (
    <div className="stagger-children">
      {/* Header */}
      <h1 className="mb-6 text-xl font-black text-foreground sm:mb-8 sm:text-2xl">System</h1>

      {/* Settings */}
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Haptic Feedback */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-foreground">Haptic Feedback</span>
            <p className="text-[9px] text-muted-foreground">Enable vibrations on interactions</p>
          </div>
          <ToggleSwitch
            enabled={data.settings.hapticFeedback}
            onToggle={handleToggleHaptic}
          />
        </div>

        {/* Neural Sync */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-foreground">Neural Sync</span>
            <p className="text-[9px] text-muted-foreground">Sync with external devices</p>
          </div>
          <ToggleSwitch
            enabled={data.settings.neuralSync}
            onToggle={handleToggleNeural}
          />
        </div>

        {/* Brightness Slider */}
        <div className="mt-2 sm:mt-4">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Interface Brightness
            </span>
            <span className="text-xs font-bold text-foreground">{data.settings.brightness}%</span>
          </div>
          <div className="relative h-2 rounded-full shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff]">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${data.settings.brightness}%` }}
            />
            <input
              type="range"
              min="10"
              max="100"
              value={data.settings.brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
            />
            <div
              className="absolute -ml-3 h-6 w-6 -translate-y-1/2 rounded-full bg-[#f2f2f2] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]"
              style={{ left: `${data.settings.brightness}%`, top: "50%" }}
            />
          </div>
        </div>

        {/* User Profile */}
        <NeuCard className="mt-6 p-5 text-center sm:mt-10 sm:p-6">
          <div className="mb-1 text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
            User Profile
          </div>
          {isEditingName ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full max-w-[150px] border-b-2 border-foreground bg-transparent text-center text-lg font-black text-foreground focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white"
              >
                <Check className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingName(true)}
              className="group flex w-full items-center justify-center gap-2"
            >
              <span className="text-lg font-black text-foreground">{data.settings.userName}</span>
              <Edit3 className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )}
        </NeuCard>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          <NeuCard variant="pressed" className="p-4 text-center">
            <div className="text-xl font-black text-foreground">{completedTasks}/{totalTasks}</div>
            <div className="text-[9px] font-bold uppercase text-muted-foreground">Tasks Done</div>
          </NeuCard>
          <NeuCard variant="pressed" className="p-4 text-center">
            <div className="text-xl font-black text-foreground">{activeStreaks}/{totalHabits}</div>
            <div className="text-[9px] font-bold uppercase text-muted-foreground">Active Streaks</div>
          </NeuCard>
        </div>

        {/* Reset Data */}
        <button
          type="button"
          onClick={handleResetData}
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#f2f2f2] p-4 text-sm font-bold text-red-500 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] transition-all hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All Data
        </button>

        {/* Version */}
        <div className="mt-4 text-center text-[10px] text-muted-foreground">
          Life OS v1.0.0
        </div>
      </div>
    </div>
  )
}
