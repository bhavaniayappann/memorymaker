// src/app/puzzle/[shareCode]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { getPublicPuzzle } from '@/lib/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { PublicPuzzle } from '@/types/database'
import TimelineGame from '@/components/games/timeline-game'
import Header from '@/components/layout/header'

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
      <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy-light">
        <Header variant="game" />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md mx-auto border-brand-coral/20 bg-white/95 backdrop-blur shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand-coral to-brand-gold rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Loading Puzzle</h3>
              <p className="text-gray-600">Please wait while we prepare your memory experience...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !puzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy-light">
        <Header variant="game" />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md mx-auto border-red-200 bg-white/95 backdrop-blur shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-red-800 mb-2">
                Puzzle Not Found
              </h2>
              <p className="text-red-600 mb-4">
                This puzzle doesn&apos;t exist or hasn&apos;t been published yet.
              </p>
              <Button 
                onClick={() => window.history.back()}
                className="bg-brand-coral hover:bg-brand-coral-dark text-white"
              >
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showGame) {
    return (
      <div>
        <Header variant="game" />
        <TimelineGame 
          puzzle={puzzle} 
          onGameComplete={(score) => {
            console.log('Game completed with score:', score)
            // Show success and return to preview after delay
            setTimeout(() => {
              setShowGame(false)
            }, 3000)
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy-light">
      <Header variant="minimal" />
      
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block p-1 bg-gradient-to-r from-brand-coral to-brand-gold rounded-full mb-6">
              <div className="bg-white rounded-full px-6 py-2">
                <span className="text-sm font-medium text-brand-navy">Memory Experience</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {puzzle.title}
            </h1>
            {puzzle.description && (
              <p className="text-xl text-brand-coral-light max-w-2xl mx-auto">
                {puzzle.description}
              </p>
            )}
          </div>

          {/* Main Content Card */}
          <Card className="border-brand-coral/20 bg-white/95 backdrop-blur shadow-2xl mb-8">
            <CardHeader className="bg-gradient-to-r from-brand-coral/10 to-brand-gold/10 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-brand-navy mb-2">
                    Timeline Puzzle Challenge
                  </CardTitle>
                  <p className="text-gray-600">
                    Test your memory by arranging these special moments in chronological order
                  </p>
                </div>
                
                <div className="hidden sm:block">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-coral to-brand-gold rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Challenge Info */}
              <div className="bg-brand-professional-gray/50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-brand-coral to-brand-coral-dark rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-brand-coral mb-1">{puzzle.photos.length}</div>
                    <div className="text-sm text-gray-600">Memory Photos</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-brand-gold mb-1">
                      {puzzle.photos.length <= 5 ? 'Easy' : puzzle.photos.length <= 8 ? 'Medium' : 'Hard'}
                    </div>
                    <div className="text-sm text-gray-600">Difficulty Level</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-brand-navy to-brand-navy-dark rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-brand-navy mb-1">Timed</div>
                    <div className="text-sm text-gray-600">Challenge Mode</div>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="text-center">
                <Button 
                  onClick={() => setShowGame(true)}
                  className="bg-gradient-to-r from-brand-coral to-brand-gold hover:from-brand-coral-dark hover:to-brand-gold-dark text-white font-semibold px-12 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Start Timeline Challenge
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  Drag and drop photos to arrange them chronologically
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Photo Preview */}
          <Card className="border-brand-coral/20 bg-white/95 backdrop-blur shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-brand-navy">Memory Preview</CardTitle>
              <p className="text-gray-600">Here are the memories you&apos;ll be working with</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {puzzle.photos.map((photo, index) => (
                  <div key={photo.id} className="group">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      <img
                        src={photo.image_url}
                        alt={photo.caption || 'Memory photo'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xs font-medium text-brand-navy">
                        {new Date(photo.actual_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      {photo.caption && (
                        <p className="text-xs text-gray-600 truncate">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}