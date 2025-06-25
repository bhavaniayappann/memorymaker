// src/types/timeline-game.ts

import type { PublicPhoto } from '@/types/database'

export interface TimelinePhoto {
  id: string
  image_url: string
  actual_date: string
  caption?: string
  display_order: number // Current position in player's arrangement
  correct_order: number // Actual chronological position
}

export interface TimelineGameState {
  status: 'not_started' | 'playing' | 'paused' | 'completed' | 'failed'
  photos: TimelinePhoto[]
  startTime: number
  endTime?: number
  currentTime: number
  attemptsUsed: number
  maxAttempts: number
  hintsUsed: number
  maxHints: number
  score: number
  difficulty: 'easy' | 'medium' | 'hard'
  timeBonus: number
  accuracyBonus: number
}

export interface TimelineGameSettings {
  timeLimit: number // seconds
  maxAttempts: number
  maxHints: number
  difficulty: 'easy' | 'medium' | 'hard'
  showDateHints: boolean
  showYearOnly: boolean
}

export interface TimelineGameResult {
  puzzleId: string
  playerName?: string
  gameType: 'timeline_puzzle'
  completed: boolean
  finalScore: number
  timeTaken: number // seconds
  attemptsUsed: number
  hintsUsed: number
  difficulty: string
  completedAt: string
}

export interface TimelineDragItem {
  id: string
  originalIndex: number
  currentIndex: number
}

// Convert database photos to timeline game photos
export function prepareTimelinePhotos(photos: PublicPhoto[]): TimelinePhoto[] {
  // Sort by actual date to determine correct order
  const sortedPhotos = [...photos].sort((a, b) => 
    new Date(a.actual_date).getTime() - new Date(b.actual_date).getTime()
  )

  // Shuffle for initial display order
  const shuffled = [...sortedPhotos].sort(() => Math.random() - 0.5)

  return shuffled.map((photo, index) => ({
    id: photo.id,
    image_url: photo.image_url,
    actual_date: photo.actual_date,
    caption: photo.caption,
    display_order: index,
    correct_order: sortedPhotos.findIndex(p => p.id === photo.id)
  }))
}