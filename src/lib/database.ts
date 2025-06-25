// src/lib/database.ts

import { supabase } from '@/lib/supabase'
import type { 
  TimelinePuzzle, 
  TimelinePhoto, 
  CreatePuzzleData,
  PuzzleWithPhotos,
  PublicPuzzle,
  DatabaseResult,
  GameResult 
} from '@/types/database'

// Generate a random share code
function generateShareCode(): string {
  return Math.random().toString(36).substring(2, 10) + 
         Math.random().toString(36).substring(2, 6)
}

// 1. CREATE PUZZLE
export async function createTimelinePuzzle(
  puzzleData: CreatePuzzleData
): Promise<DatabaseResult<TimelinePuzzle>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } }
    }

    // Create the puzzle
    const { data: puzzle, error: puzzleError } = await supabase
      .from('timeline_puzzles')
      .insert({
        user_id: user.id,
        title: puzzleData.title,
        description: puzzleData.description,
        share_code: generateShareCode(),
        is_published: true
      })
      .select()
      .single()

    if (puzzleError) {
      return { data: null, error: { message: puzzleError.message } }
    }

    return { data: puzzle, error: null }
  } catch (error) {
    return { 
      data: null, 
      error: { message: error instanceof Error ? error.message : 'Unknown error' } 
    }
  }
}

// 2. ADD PHOTOS TO PUZZLE
export async function addPhotosToTimeline(
  puzzleId: string,
  photos: { image_url: string; actual_date: string; caption?: string }[]
): Promise<DatabaseResult<TimelinePhoto[]>> {
  try {
    const photosWithOrder = photos.map((photo, index) => ({
      puzzle_id: puzzleId,
      image_url: photo.image_url,
      actual_date: photo.actual_date,
      caption: photo.caption,
      order_index: index
    }))

    const { data, error } = await supabase
      .from('timeline_photos')
      .insert(photosWithOrder)
      .select()

    if (error) {
      return { data: null, error: { message: error.message } }
    }

    return { data, error: null }
  } catch (error) {
    return { 
      data: null, 
      error: { message: error instanceof Error ? error.message : 'Unknown error' } 
    }
  }
}

// 3. GET USER'S PUZZLES
export async function getUserPuzzles(): Promise<DatabaseResult<PuzzleWithPhotos[]>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } }
    }

    const { data, error } = await supabase
      .from('timeline_puzzles')
      .select(`
        *,
        photos:timeline_photos(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: { message: error.message } }
    }

    return { data, error: null }
  } catch (error) {
    return { 
      data: null, 
      error: { message: error instanceof Error ? error.message : 'Unknown error' } 
    }
  }
}

// 4. PUBLISH PUZZLE (make it shareable)
export async function publishPuzzle(puzzleId: string): Promise<DatabaseResult<TimelinePuzzle>> {
  try {
    const { data, error } = await supabase
      .from('timeline_puzzles')
      .update({ is_published: true })
      .eq('id', puzzleId)
      .select()
      .single()

    if (error) {
      return { data: null, error: { message: error.message } }
    }

    return { data, error: null }
  } catch (error) {
    return { 
      data: null, 
      error: { message: error instanceof Error ? error.message : 'Unknown error' } 
    }
  }
}

// 5. GET PUBLIC PUZZLE (for playing)
export async function getPublicPuzzle(shareCode: string): Promise<DatabaseResult<PublicPuzzle>> {
  try {
    const { data, error } = await supabase
      .from('timeline_puzzles')
      .select(`
        id,
        title,
        description,
        created_at,
        photos:timeline_photos(
          id,
          image_url,
          actual_date,
          caption,
          order_index
        )
      `)
      .eq('share_code', shareCode)
      .eq('is_published', true)
      .single()

    if (error) {
      return { data: null, error: { message: error.message } }
    }

    return { data, error: null }
  } catch (error) {
    return { 
      data: null, 
      error: { message: error instanceof Error ? error.message : 'Unknown error' } 
    }
  }
}

// 6. SAVE GAME RESULT
export async function saveGameResult(result: GameResult): Promise<DatabaseResult<void>> {
  try {
    const { error } = await supabase
      .from('game_sessions')
      .insert({
        puzzle_id: result.puzzle_id,
        player_name: result.player_name,
        completed_at: result.completed ? new Date().toISOString() : null,
        attempts: result.attempts,
        completion_time_seconds: result.completion_time_seconds
      })

    if (error) {
      return { data: null, error: { message: error.message } }
    }

    return { data: null, error: null }
  } catch (error) {
    return { 
      data: null, 
      error: { message: error instanceof Error ? error.message : 'Unknown error' } 
    }
  }
}

// 7. TEST DATABASE CONNECTION
export async function testDatabaseConnection(): Promise<DatabaseResult<string>> {
  try {
    const { data, error } = await supabase
      .from('timeline_puzzles')
      .select('count')
      .limit(1)

    if (error && !error.message.includes('permission denied')) {
      return { data: null, error: { message: error.message } }
    }

    return { data: 'Database connection successful!', error: null }
  } catch (error) {
    return { 
      data: null, 
      error: { message: error instanceof Error ? error.message : 'Unknown error' } 
    }
  }
}