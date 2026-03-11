// src/components/games/timeline-game.tsx

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PublicPuzzle, PublicPhoto } from '@/types/database'

interface Props {
  puzzle: PublicPuzzle
  onGameComplete?: (score: number) => void
}

export default function TimelineGame({ puzzle, onGameComplete }: Props) {
  // Critical: Track if component has mounted to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [photos, setPhotos] = useState<
    Array<PublicPhoto & { currentPosition: number; correctPosition: number }>
  >([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Handle mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize photos when mounted (client-side only)
  useEffect(() => {
    if (isMounted && puzzle?.photos) {
      // Shuffle photos for the game (client-side only)
      const shuffledPhotos = [...puzzle.photos]
        .map((photo, index) => ({
          ...photo,
          currentPosition: index,
          correctPosition: index
        }))
        .sort(() => Math.random() - 0.5) // Safe: only runs on client
      
      setPhotos(shuffledPhotos)
    }
  }, [isMounted, puzzle])

  // Timer effect (client-side only)
  useEffect(() => {
    if (!gameStarted || !isMounted) return

    const interval = setInterval(() => {
      if (startTime) {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStarted, startTime, isMounted])

  // Start game
  const handleStartGame = () => {
    setGameStarted(true)
    setStartTime(Date.now()) // Safe: only runs on user interaction
    setAttempts(0)
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex === null) return

    const newPhotos = [...photos]
    const draggedPhoto = newPhotos[draggedIndex]
    
    // Remove from original position
    newPhotos.splice(draggedIndex, 1)
    // Insert at new position
    newPhotos.splice(dropIndex, 0, draggedPhoto)
    
    setPhotos(newPhotos)
    setDraggedIndex(null)
  }

  // Check if solution is correct
  const checkSolution = () => {
    const correctOrder = [...puzzle.photos].sort((a, b) =>
      new Date(a.actual_date).getTime() - new Date(b.actual_date).getTime()
    )

    const isCorrect = photos.every((photo, index) => photo.id === correctOrder[index].id)

    setAttempts(prev => prev + 1)

    if (isCorrect) {
      const nextAttempts = attempts + 1
      const finalScore = Math.max(100 - (nextAttempts * 10) - timeElapsed, 10)
      onGameComplete?.(finalScore)
      setFeedback({
        type: 'success',
        message: `You solved it in ${nextAttempts} attempts and ${timeElapsed} seconds. Score: ${finalScore}.`
      })
    } else {
      setFeedback({
        type: 'error',
        message: `Not quite right yet. Adjust the order and try again (attempt ${attempts + 1}).`
      })
    }
  }

  // Show loading until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">🎮</div>
          <p className="text-lg">Loading Timeline Game...</p>
        </CardContent>
      </Card>
    )
  }

  // Show start screen
  if (!gameStarted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🕒 Timeline Puzzle</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-lg mb-6">
            Arrange these {puzzle.photos.length} photos in chronological order!
          </p>
          <p className="text-sm text-gray-600 mb-8">
            Drag and drop the photos to arrange them from oldest to newest.
          </p>
          <Button 
            onClick={handleStartGame}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          >
            🚀 Start Game
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Game interface
  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">🕒 Timeline Puzzle</CardTitle>
          <div className="flex gap-4 text-sm">
            <span>⏱️ Time: {timeElapsed}s</span>
            <span>🎯 Attempts: {attempts}</span>
            <span>📊 Photos: {photos.length}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`relative cursor-move border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-blue-400 transition-colors ${
                draggedIndex === index ? 'opacity-50' : ''
              }`}
            >
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2">
                <img
                  src={photo.image_url}
                  alt={photo.caption || 'Timeline photo'}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">
                  Position {index + 1}
                </p>
                {photo.caption && (
                  <p className="text-xs truncate">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            onClick={checkSolution}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            ✅ Check My Answer
          </Button>
        </div>

        {feedback && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}
          >
            {feedback.message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}