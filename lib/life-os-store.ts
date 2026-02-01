"use client"

import useSWR, { mutate } from "swr"

// Types
export interface Task {
  id: string
  title: string
  time: string
  status: "active" | "pending" | "completed"
  createdAt: string
}

export interface Habit {
  id: string
  name: string
  icon: string
  frequency: "daily" | "weekly"
  completedDates: string[]
  streak: number
  createdAt: string
}

export interface MoodEntry {
  id: string
  date: string
  energy: number
  stress: "low" | "medium" | "high"
  focus: number
  notes?: string
}

export interface Activity {
  id: string
  title: string
  duration: string
  impact: "low" | "moderate" | "high"
  date: string
  category: string
}

export interface Settings {
  hapticFeedback: boolean
  neuralSync: boolean
  brightness: number
  userName: string
}

export interface LifeOSData {
  tasks: Task[]
  habits: Habit[]
  moods: MoodEntry[]
  activities: Activity[]
  settings: Settings
}

const STORAGE_KEY = "life-os-data"

const defaultData: LifeOSData = {
  tasks: [
    { id: "1", title: "Neural Mapping", time: "14:00", status: "active", createdAt: new Date().toISOString() },
    { id: "2", title: "Data Synthesis", time: "16:30", status: "pending", createdAt: new Date().toISOString() },
  ],
  habits: [
    { id: "1", name: "Morning Meditation", icon: "brain", frequency: "daily", completedDates: [], streak: 0, createdAt: new Date().toISOString() },
    { id: "2", name: "Deep Work", icon: "target", frequency: "daily", completedDates: [], streak: 0, createdAt: new Date().toISOString() },
    { id: "3", name: "Exercise", icon: "activity", frequency: "daily", completedDates: [], streak: 0, createdAt: new Date().toISOString() },
    { id: "4", name: "Reading", icon: "book", frequency: "daily", completedDates: [], streak: 0, createdAt: new Date().toISOString() },
  ],
  moods: [],
  activities: [
    { id: "1", title: "Deep Work Session", duration: "3 hours", impact: "high", date: new Date().toISOString(), category: "work" },
    { id: "2", title: "Physical Reboot", duration: "45 mins", impact: "moderate", date: new Date().toISOString(), category: "health" },
  ],
  settings: {
    hapticFeedback: true,
    neuralSync: false,
    brightness: 50,
    userName: "ARCHITECT-01",
  },
}

// Data fetcher
function getStoredData(): LifeOSData {
  if (typeof window === "undefined") return defaultData
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore
  }
  return defaultData
}

function saveData(data: LifeOSData) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// SWR hooks
export function useLifeOSData() {
  const { data, error, isLoading } = useSWR<LifeOSData>("life-os", getStoredData, {
    fallbackData: defaultData,
    revalidateOnFocus: false,
  })

  return {
    data: data ?? defaultData,
    error,
    isLoading,
  }
}

// Task actions
export function addTask(task: Omit<Task, "id" | "createdAt">) {
  const data = getStoredData()
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  data.tasks.push(newTask)
  saveData(data)
  mutate("life-os", data)
  return newTask
}

export function updateTask(id: string, updates: Partial<Task>) {
  const data = getStoredData()
  const index = data.tasks.findIndex((t) => t.id === id)
  if (index !== -1) {
    data.tasks[index] = { ...data.tasks[index], ...updates }
    saveData(data)
    mutate("life-os", data)
  }
}

export function deleteTask(id: string) {
  const data = getStoredData()
  data.tasks = data.tasks.filter((t) => t.id !== id)
  saveData(data)
  mutate("life-os", data)
}

export function toggleTaskStatus(id: string) {
  const data = getStoredData()
  const task = data.tasks.find((t) => t.id === id)
  if (task) {
    task.status = task.status === "completed" ? "pending" : "completed"
    saveData(data)
    mutate("life-os", data)
  }
}

// Habit actions
export function addHabit(habit: Omit<Habit, "id" | "createdAt" | "completedDates" | "streak">) {
  const data = getStoredData()
  const newHabit: Habit = {
    ...habit,
    id: Date.now().toString(),
    completedDates: [],
    streak: 0,
    createdAt: new Date().toISOString(),
  }
  data.habits.push(newHabit)
  saveData(data)
  mutate("life-os", data)
  return newHabit
}

export function toggleHabitForDate(habitId: string, date: string) {
  const data = getStoredData()
  const habit = data.habits.find((h) => h.id === habitId)
  if (habit) {
    const dateIndex = habit.completedDates.indexOf(date)
    if (dateIndex === -1) {
      habit.completedDates.push(date)
      habit.streak = calculateStreak(habit.completedDates)
    } else {
      habit.completedDates.splice(dateIndex, 1)
      habit.streak = calculateStreak(habit.completedDates)
    }
    saveData(data)
    mutate("life-os", data)
  }
}

export function deleteHabit(id: string) {
  const data = getStoredData()
  data.habits = data.habits.filter((h) => h.id !== id)
  saveData(data)
  mutate("life-os", data)
}

function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0
  const sorted = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const today = new Date().toISOString().split("T")[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diffDays = Math.floor((prev.getTime() - curr.getTime()) / 86400000)
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }
  return streak
}

// Mood actions
export function addMoodEntry(entry: Omit<MoodEntry, "id">) {
  const data = getStoredData()
  const newEntry: MoodEntry = {
    ...entry,
    id: Date.now().toString(),
  }
  data.moods.push(newEntry)
  saveData(data)
  mutate("life-os", data)
  return newEntry
}

// Activity actions
export function addActivity(activity: Omit<Activity, "id">) {
  const data = getStoredData()
  const newActivity: Activity = {
    ...activity,
    id: Date.now().toString(),
  }
  data.activities.push(newActivity)
  saveData(data)
  mutate("life-os", data)
  return newActivity
}

export function deleteActivity(id: string) {
  const data = getStoredData()
  data.activities = data.activities.filter((a) => a.id !== id)
  saveData(data)
  mutate("life-os", data)
}

// Settings actions
export function updateSettings(updates: Partial<Settings>) {
  const data = getStoredData()
  data.settings = { ...data.settings, ...updates }
  saveData(data)
  mutate("life-os", data)
}

// Reset all data
export function resetAllData() {
  if (typeof window === "undefined") return

  // Create fresh data with empty arrays (no mock data)
  const freshData: LifeOSData = {
    tasks: [],
    habits: [],
    moods: [],
    activities: [],
    settings: {
      hapticFeedback: true,
      neuralSync: false,
      brightness: 50,
      userName: "USER",
    },
  }

  // Clear localStorage
  localStorage.removeItem(STORAGE_KEY)

  // Save fresh data
  saveData(freshData)

  // Update SWR cache
  mutate("life-os", freshData)
}

// Utility functions
export function getTodayString(): string {
  return new Date().toISOString().split("T")[0]
}

export function getWeekDays(): { day: string; date: string; dateStr: string; isToday: boolean }[] {
  const today = new Date()
  const days = []
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"]

  for (let i = -3; i <= 3; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      day: dayNames[d.getDay()],
      date: d.getDate().toString().padStart(2, "0"),
      dateStr: d.toISOString().split("T")[0],
      isToday: i === 0,
    })
  }
  return days
}
