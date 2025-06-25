// src/lib/timeline-game-logic.ts

import type { 
    TimelinePhoto, 
    TimelineGameState, 
    TimelineGameSettings, 
    TimelineGameResult 
  } from '@/types/timeline-game'
  
  // Determine timeline game difficulty based on photo count
  export function calculateTimelineDifficulty(photoCount: number): TimelineGameSettings {
    if (photoCount <= 4) {
      return {
        timeLimit: 180, // 3 minutes
        maxAttempts: 5,
        maxHints: 2,
        difficulty: 'easy',
        showDateHints: true,
        showYearOnly: true
      }
    } else if (photoCount <= 8) {
      return {
        timeLimit: 300, // 5 minutes
        maxAttempts: 3,
        maxHints: 1,
        difficulty: 'medium',
        showDateHints: false,
        showYearOnly: true
      }
    } else {
      return {
        timeLimit: 480, // 8 minutes
        maxAttempts: 2,
        maxHints: 1,
        difficulty: 'hard',
        showDateHints: false,
        showYearOnly: false
      }
    }
  }
  
  // Check if timeline arrangement is correct
  export function checkTimelineSolution(photos: TimelinePhoto[]): boolean {
    return photos.every((photo, index) => photo.correct_order === index)
  }
  
  // Calculate timeline puzzle score
  export function calculateTimelineScore(
    gameState: TimelineGameState, 
    settings: TimelineGameSettings
  ): number {
    const {
      currentTime,
      startTime,
      attemptsUsed,
      hintsUsed,
      photos
    } = gameState
  
    const timeTaken = (currentTime - startTime) / 1000 // Convert to seconds
    const baseScore = 1000
  
    // Time bonus (faster = higher score)
    const timeRatio = Math.max(0, (settings.timeLimit - timeTaken) / settings.timeLimit)
    const timeBonus = Math.round(timeRatio * 500)
  
    // Attempts penalty
    const attemptsPenalty = (attemptsUsed - 1) * 100
  
    // Hints penalty  
    const hintsPenalty = hintsUsed * 150
  
    // Difficulty multiplier
    const difficultyMultiplier = {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    }[settings.difficulty]
  
    // Photo count bonus (more photos = higher score)
    const photoCountBonus = photos.length * 25
  
    const finalScore = Math.max(0, Math.round(
      (baseScore + timeBonus + photoCountBonus - attemptsPenalty - hintsPenalty) * difficultyMultiplier
    ))
  
    return finalScore
  }
  
  // Provide timeline hint by revealing one correct position
  export function getTimelineHint(photos: TimelinePhoto[]): { hintPhoto: TimelinePhoto; targetIndex: number } | null {
    // Find a photo that's not in the correct position
    const incorrectPhoto = photos.find((photo, index) => photo.correct_order !== index)
    
    if (!incorrectPhoto) {
      return null // All photos are already correct
    }
  
    return {
      hintPhoto: incorrectPhoto,
      targetIndex: incorrectPhoto.correct_order
    }
  }
  
  // Move timeline photo from one position to another
  export function moveTimelinePhoto(photos: TimelinePhoto[], fromIndex: number, toIndex: number): TimelinePhoto[] {
    const newPhotos = [...photos]
    const [movedPhoto] = newPhotos.splice(fromIndex, 1)
    newPhotos.splice(toIndex, 0, movedPhoto)
    
    // Update display_order for all photos
    return newPhotos.map((photo, index) => ({
      ...photo,
      display_order: index
    }))
  }
  
  // Get timeline-specific encouragement message
  export function getTimelineEncouragement(attemptNumber: number, maxAttempts: number): string {
    const remaining = maxAttempts - attemptNumber
  
    if (remaining <= 0) {
      return "Time's up! Don't worry, you can try the timeline again anytime."
    }
  
    const messages = [
      "Great effort! Look closely at the details in each photo for timeline clues.",
      "You're getting closer! Think about seasons, clothing styles, or photo quality.",
      "Almost there! Consider the lighting and backgrounds as timeline hints.",
      "Final attempt! Trust your instincts about when each photo was taken."
    ]
  
    return messages[Math.min(attemptNumber - 1, messages.length - 1)] || "Keep trying the timeline!"
  }
  
  // Generate timeline game result for saving
  export function createTimelineGameResult(
    puzzleId: string,
    gameState: TimelineGameState,
    playerName?: string
  ): TimelineGameResult {
    const timeTaken = gameState.endTime 
      ? (gameState.endTime - gameState.startTime) / 1000 
      : 0
  
    return {
      puzzleId,
      playerName,
      gameType: 'timeline_puzzle',
      completed: gameState.status === 'completed',
      finalScore: gameState.score,
      timeTaken,
      attemptsUsed: gameState.attemptsUsed,
      hintsUsed: gameState.hintsUsed,
      difficulty: gameState.difficulty,
      completedAt: new Date().toISOString()
    }
  }
  
  // Timeline-specific utility functions
  export function formatTimelineTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  export function getTimelineDifficultyColor(difficulty: string): string {
    return {
      easy: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700', 
      hard: 'bg-red-100 text-red-700'
    }[difficulty] || 'bg-gray-100 text-gray-700'
  }