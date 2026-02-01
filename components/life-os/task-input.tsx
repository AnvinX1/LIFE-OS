"use client"

import React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { addTask } from "@/lib/life-os-store"
import { NeuCard } from "./neu-card"

export function TaskInput() {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = () => {
    if (title.trim()) {
      addTask({
        title: title.trim(),
        time: time || "No time set",
        status: "pending",
      })
      setTitle("")
      setTime("")
      setIsExpanded(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f2f2f2] p-4 text-muted-foreground shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] transition-all hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]"
      >
        <Plus className="h-4 w-4" />
        <span className="text-xs font-bold">Add Task</span>
      </button>
    )
  }

  return (
    <NeuCard variant="pressed" className="mb-4 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Task title..."
        className="mb-3 w-full bg-transparent text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none"
        autoFocus
      />
      <div className="flex items-center gap-3">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="flex-1 rounded-lg bg-[#e8eef5] px-3 py-2 text-xs font-bold text-foreground shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="rounded-xl bg-[#111111] px-4 py-2 text-xs font-bold text-white shadow-[4px_4px_8px_#d1d9e6] transition-all hover:shadow-[2px_2px_4px_#d1d9e6] disabled:opacity-50"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            setIsExpanded(false)
            setTitle("")
            setTime("")
          }}
          className="rounded-xl bg-[#f2f2f2] px-4 py-2 text-xs font-bold text-muted-foreground shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]"
        >
          Cancel
        </button>
      </div>
    </NeuCard>
  )
}
