"use client"

import { Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toggleTaskStatus, deleteTask } from "@/lib/life-os-store"
import { NeuCard } from "./neu-card"

interface PriorityItemProps {
  id: string
  title: string
  time: string
  status?: "active" | "pending" | "completed"
  onToggle?: () => void
  onDelete?: () => void
}

export function PriorityItem({ id, title, time, status = "pending", onToggle, onDelete }: PriorityItemProps) {
  const handleToggle = () => {
    if (onToggle) {
      onToggle()
    } else {
      toggleTaskStatus(id)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
    } else {
      deleteTask(id)
    }
  }

  return (
    <NeuCard className={cn("group mb-3 flex items-center justify-between p-4 transition-all", status === "completed" && "opacity-60")}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
            status === "completed"
              ? "border-green-500 bg-green-500 text-white"
              : status === "active"
              ? "border-green-500 bg-transparent"
              : "border-gray-300 bg-transparent"
          )}
        >
          {status === "completed" && <Check className="h-3 w-3" />}
        </button>
        <span className={cn("text-sm font-bold text-foreground", status === "completed" && "line-through")}>{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-muted-foreground">{time}</span>
        <button
          type="button"
          onClick={handleDelete}
          className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </NeuCard>
  )
}
