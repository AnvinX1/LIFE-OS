"use client"

import { useState, useMemo } from "react"
import { Plus, Trash2 } from "lucide-react"
import { ActivityGrid, NeuCard } from "@/components/life-os"
import { useLifeOSData, addActivity, deleteActivity } from "@/lib/life-os-store"
import { cn } from "@/lib/utils"

const impactOptions = [
  { value: "low" as const, label: "Low" },
  { value: "moderate" as const, label: "Moderate" },
  { value: "high" as const, label: "High" },
]

const categoryOptions = [
  { value: "work", label: "Work" },
  { value: "health", label: "Health" },
  { value: "learning", label: "Learning" },
  { value: "personal", label: "Personal" },
]

export default function RecorderPage() {
  const { data } = useLifeOSData()
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState("")
  const [impact, setImpact] = useState<"low" | "moderate" | "high">("moderate")
  const [category, setCategory] = useState("work")

  const recentActivities = useMemo(() => {
    return [...data.activities]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
  }, [data.activities])

  const handleAddActivity = () => {
    if (title.trim() && duration.trim()) {
      addActivity({
        title: title.trim(),
        duration: duration.trim(),
        impact,
        category,
        date: new Date().toISOString(),
      })
      setTitle("")
      setDuration("")
      setImpact("moderate")
      setCategory("work")
      setIsAdding(false)
    }
  }

  const getImpactColor = (imp: string) => {
    if (imp === "high") return "text-green-500"
    if (imp === "moderate") return "text-yellow-600"
    return "text-muted-foreground"
  }

  return (
    <div className="stagger-children">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-black text-foreground sm:text-2xl">Life Recorder</h1>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-all",
            isAdding
              ? "bg-[#f2f2f2] text-muted-foreground shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]"
              : "bg-[#111111] text-white shadow-[4px_4px_8px_#d1d9e6]"
          )}
        >
          <Plus className={cn("h-4 w-4 transition-transform", isAdding && "rotate-45")} />
        </button>
      </div>
      <p className="mb-4 text-[10px] font-medium text-muted-foreground sm:mb-6 sm:text-xs">
        Historical activity mapping.
      </p>

      {/* Add Activity Form */}
      {isAdding && (
        <NeuCard variant="pressed" className="mb-6 p-4 sm:p-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Activity name..."
            className="mb-3 w-full bg-transparent text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (e.g., 2 hours, 45 mins)"
            className="mb-4 w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          {/* Impact */}
          <div className="mb-4">
            <span className="mb-2 block text-[10px] font-black uppercase text-muted-foreground">Impact</span>
            <div className="flex gap-2">
              {impactOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setImpact(opt.value)}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-[10px] font-bold transition-all",
                    impact === opt.value
                      ? "bg-[#111111] text-white"
                      : "bg-[#e8eef5] text-foreground shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <span className="mb-2 block text-[10px] font-black uppercase text-muted-foreground">Category</span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all",
                    category === opt.value
                      ? "bg-[#111111] text-white"
                      : "bg-[#e8eef5] text-foreground shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddActivity}
              disabled={!title.trim() || !duration.trim()}
              className="flex-1 rounded-xl bg-[#111111] py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              Log Activity
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

      {/* Activity Grid Card */}
      <NeuCard variant="pressed" className="mb-6 p-4 sm:mb-8 sm:p-5">
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <span className="text-[9px] font-black uppercase text-muted-foreground sm:text-[10px]">
            Activity Grid
          </span>
          <span className="text-[9px] font-bold text-foreground sm:text-[10px]">Last 28 Days</span>
        </div>
        <ActivityGrid days={28} />
        <div className="mt-3 flex items-center justify-end gap-2 text-[8px] text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="h-2.5 w-2.5 rounded-[2px] bg-[#e2e8f0]" />
            <div className="h-2.5 w-2.5 rounded-[2px] bg-[#d1d9e6]" />
            <div className="h-2.5 w-2.5 rounded-[2px] bg-[#a3aab6]" />
            <div className="h-2.5 w-2.5 rounded-[2px] bg-[#111111]" />
          </div>
          <span>More</span>
        </div>
      </NeuCard>

      {/* Activity List */}
      <div className="mb-2">
        <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Recent Activities
        </h3>
      </div>
      
      {recentActivities.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted-foreground">
          No activities logged yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {recentActivities.map((activity) => (
            <NeuCard key={activity.id} className="group flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="text-xs font-bold text-foreground">{activity.title}</div>
                <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                  <span>{activity.duration}</span>
                  <span className="text-[6px]">|</span>
                  <span className={getImpactColor(activity.impact)}>
                    {activity.impact.charAt(0).toUpperCase() + activity.impact.slice(1)} Impact
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                  <div className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    activity.impact === "high" ? "bg-green-500" : activity.impact === "moderate" ? "bg-yellow-500" : "bg-gray-400"
                  )} />
                </div>
                <button
                  type="button"
                  onClick={() => deleteActivity(activity.id)}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </NeuCard>
          ))}
        </div>
      )}
    </div>
  )
}
