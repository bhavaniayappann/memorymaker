// src/app/puzzle/[shareCode]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { getPublicPuzzle } from '@/lib/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { PublicPuzzle } from '@/types/database'
import TimelineGame from '@/components/games/timeline-game'

interface Props {
  params: {
    shareCode: string
  }
}

export default function PuzzlePage({ params }: Props) {
  const [puzzle, setPuzzle] = useState<PublicPuzzle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    const loadPuzzle = async () => {
      const result = await getPublicPuzzle(params.shareCode)
      
      if (result.error || !result.data) {
        setError(result.error?.message || 'Puzzle not found')
      } else {
        setPuzzle(result.data)
      }
      setLoading(false)
    }

    loadPuzzle()
  }, [params.shareCode])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p>Loading puzzle...</p>
        </div>
      </div>
    )
  }

  if (error || !puzzle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-6">
            <div className="text-4xl mb-4">😞</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Puzzle Not Found
            </h2>
            <p className="text-gray-600">
              This puzzle doesn't exist or hasn't been published yet.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {puzzle.title}
          </h1>
          {puzzle.description && (
            <p className="text-gray-600">
              {puzzle.description}
            </p>
          )}
        </div>

        {/* Show either puzzle info OR game, not both */}
        {!showGame ? (
          <>
            {/* Puzzle Info */}
            <Card className="mb-8">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Timeline Puzzle Ready!
                </h2>
                <p className="text-gray-600 mb-4">
                  Arrange the photos in chronological order. Can you get them all right?
                </p>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Photos to arrange:</strong> {puzzle.photos.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Difficulty:</strong> {puzzle.photos.length <= 5 ? 'Easy' : puzzle.photos.length <= 8 ? 'Medium' : 'Hard'}
                  </p>
                </div>
                
                <Button 
                  onClick={() => setShowGame(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
                >
                  🎮 Start Timeline Puzzle
                </Button>
              </CardContent>
            </Card>

            {/* Photos Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Photo Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {puzzle.photos.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={photo.image_url}
                          alt={photo.caption || 'Timeline photo'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">
                          {new Date(photo.actual_date).toLocaleDateString()}
                        </p>
                        {photo.caption && (
                          <p className="text-xs text-gray-900 truncate">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Game Mode */
          <div className="space-y-4">
            {/* Back Button */}
            <div className="flex justify-between items-center">
              <Button 
                onClick={() => setShowGame(false)}
                variant="outline"
                className="flex items-center gap-2"
              >
                ← Back to Preview
              </Button>
              <div className="text-sm text-gray-600">
                Timeline Puzzle Game
              </div>
            </div>
            
            {/* Timeline Game Component */}
            <TimelineGame 
              puzzle={puzzle} 
              onGameComplete={(score) => {
                console.log('Game completed with score:', score)
                // Show success message and return to preview after a delay
                setTimeout(() => {
                  setShowGame(false)
                }, 2000)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}