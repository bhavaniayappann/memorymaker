// src/types/database.ts

// Database table types (matching Supabase schema)

export interface TimelinePuzzle {
    id: string
    user_id: string
    title: string
    description?: string
    share_code: string
    is_published: boolean
    created_at: string
    updated_at: string
  }
  
  export interface TimelinePhoto {
    id: string
    puzzle_id: string
    image_url: string
    actual_date: string // ISO date string (YYYY-MM-DD)
    caption?: string
    order_index: number
    created_at: string
  }
  
  export interface GameSession {
    id: string
    puzzle_id: string
    player_name?: string
    game_type: 'timeline_puzzle' | 'couples_trivia' | 'memory_match' | 'scavenger_hunt' // Future game types
    completed_at?: string
    attempts: number
    completion_time_seconds?: number
    score?: number
    difficulty?: string
    created_at: string
  }
  
  // Form types for creating/editing
  export interface CreatePuzzleData {
    title: string
    description?: string
    photos: CreatePhotoData[]
  }
  
  export interface CreatePhotoData {
    file: File
    actual_date: string
    caption?: string
  }
  
  // API response types
  export interface PuzzleWithPhotos extends TimelinePuzzle {
    photos: TimelinePhoto[]
  }
  
  export interface PublicPuzzle {
    id: string
    title: string
    description?: string
    photos: PublicPhoto[]
    created_at: string
  }
  
  export interface PublicPhoto {
    id: string
    image_url: string
    actual_date: string
    caption?: string
    order_index: number
  }
  
  // Game play types
  export interface GameState {
    puzzle_id: string
    photos: PublicPhoto[]
    current_order: string[] // Array of photo IDs in current order
    is_completed: boolean
    start_time: number
    attempts: number
  }
  
  export interface GameResult {
    puzzle_id: string
    completed: boolean
    completion_time_seconds: number
    attempts: number
    player_name?: string
  }
  
  // Database operation types
  export type DatabaseError = {
    message: string
    details?: string
    hint?: string
  }
  
  export type DatabaseResult<T> = {
    data: T | null
    error: DatabaseError | null
  }