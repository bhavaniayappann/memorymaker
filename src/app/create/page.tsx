// src/app/create/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { createTimelinePuzzle, addPhotosToTimeline } from '@/lib/database'
import { uploadPhotos, validateImageFile } from '@/lib/storage'
import type { CreatePuzzleData, CreatePhotoData } from '@/types/database'

import type { User } from '@supabase/supabase-js'

export default function CreatePuzzlePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [step, setStep] = useState(1) // 1: Details, 2: Photos, 3: Preview
  const [successShareCode, setSuccessShareCode] = useState<string | null>(null)
  const router = useRouter()

  // Form state
  const [puzzleData, setPuzzleData] = useState({
    title: '',
    description: ''
  })
  const [photos, setPhotos] = useState<CreatePhotoData[]>([])
  const [error, setError] = useState<string | null>(null)

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/auth/signin?redirect=/create&reason=auth-required')
        return
      }
      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      // Validate file
      const validation = validateImageFile(file)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }

      const newPhoto: CreatePhotoData = {
        file,
        actual_date: '', // User will set this
        caption: ''
      }

      setPhotos(prev => [...prev, newPhoto])
    })

    // Clear the input
    event.target.value = ''
  }

  // Remove photo
  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  // Update photo date
  const updatePhotoDate = (index: number, date: string) => {
    setPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, actual_date: date } : photo
    ))
  }

  // Update photo caption
  const updatePhotoCaption = (index: number, caption: string) => {
    setPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, caption } : photo
    ))
  }

  // Validate form
  const canProceed = () => {
    if (step === 1) {
      return puzzleData.title.trim().length > 0
    }
    if (step === 2) {
      return photos.length >= 3 && photos.every(photo => photo.actual_date)
    }
    return true
  }

  // Create puzzle
  const handleCreatePuzzle = async () => {
    setCreating(true)
    setError(null)
    setSuccessShareCode(null)

    try {
      // Step 1: Create the puzzle record
      const puzzleCreateData: CreatePuzzleData = {
        title: puzzleData.title,
        description: puzzleData.description,
        photos: [] // We'll add photos after upload
      }

      const puzzleResult = await createTimelinePuzzle(puzzleCreateData)

      if (puzzleResult.error || !puzzleResult.data) {
        setError(puzzleResult.error?.message || 'Failed to create puzzle')
        return
      }

      const puzzle = puzzleResult.data
      const puzzleId = puzzle.id

      // Step 2: Upload photos to storage
      if (!user) {
        setError('Your session expired. Please sign in again and retry.')
        return
      }

      const files = photos.map(photo => photo.file)
      const uploadResult = await uploadPhotos(files, user.id, puzzleId, (completed, total) => {
        // You could show upload progress here
        console.log(`Uploading: ${completed}/${total}`)
      })

      if (uploadResult.errors.length > 0) {
        setError(`Upload failed: ${uploadResult.errors.join(', ')}`)
        return
      }

      // Step 3: Save photo records to database
      const photoRecords = photos.map((photo, index) => ({
        image_url: uploadResult.urls[index],
        actual_date: photo.actual_date,
        caption: photo.caption || undefined
      }))

      const photosResult = await addPhotosToTimeline(puzzleId, photoRecords)

      if (photosResult.error) {
        setError(`Failed to save photo data: ${photosResult.error.message}`)
        return
      }

      // Success! Show share options in-page
      setSuccessShareCode(puzzle.share_code)
      // Reset form for next puzzle
      setStep(1)
      setPuzzleData({ title: '', description: '' })
      setPhotos([])
      
    } catch (err) {
      console.error('Create puzzle error:', err)
      setError('Failed to create puzzle. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
      
    <div className="min-h-screen bg-background-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Create Timeline Puzzle
          </h1>
          <p className="text-text-secondary">
            Upload photos and create an interactive timeline game
          </p>
        </div>

        {/* Success Message */}
        {successShareCode && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h2 className="font-semibold text-emerald-800 mb-1">
              Puzzle created successfully!
            </h2>
            <p className="text-sm text-emerald-700 mb-2">
              Share this code with your partner so they can play your timeline game:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <code className="px-3 py-2 rounded-md bg-white border border-emerald-200 text-emerald-900 font-mono text-sm">
                {successShareCode}
              </code>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const shareUrl = `${window.location.origin}/puzzle/${successShareCode}`
                    navigator.clipboard?.writeText(shareUrl)
                  }
                }}
              >
                Copy share link
              </Button>
              <Button
                type="button"
                onClick={() => router.push(`/puzzle/${successShareCode}`)}
              >
                Open puzzle
              </Button>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step > 1 ? 'bg-primary-500' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${step > 2 ? 'bg-primary-500' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Step 1: Puzzle Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Puzzle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Puzzle Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-button border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none"
                  placeholder="e.g., Our Love Story Timeline"
                  value={puzzleData.title}
                  onChange={(e) => setPuzzleData({ ...puzzleData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description (Optional)
                </label>
                <textarea
                  className="w-full rounded-button border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none"
                  rows={3}
                  placeholder="Arrange these photos in chronological order of our relationship!"
                  value={puzzleData.description}
                  onChange={(e) => setPuzzleData({ ...puzzleData, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!canProceed()}
                >
                  Next: Add Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Photos</CardTitle>
              <p className="text-text-secondary">Add 3-10 photos with dates</p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="text-4xl mb-4">📷</div>
                  <p className="text-lg font-medium text-text-primary mb-2">
                    Click to upload photos
                  </p>
                  <p className="text-text-secondary">
                    PNG, JPG up to 10MB each
                  </p>
                </label>
              </div>
              {/* Photo List */}
              {photos.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-text-primary">
                    Photos ({photos.length})
                  </h3>
                  
                  {photos.map((photo, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-text-primary">
                          {photo.file.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePhoto(index)}
                        >
                          ❌
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1">
                            Date taken *
                          </label>
                          <input
                            type="date"
                            required
                            className="w-full rounded-button border-2 border-gray-200 px-3 py-2 text-text-primary focus:border-primary-500 focus:outline-none"
                            value={photo.actual_date}
                            onChange={(e) => updatePhotoDate(index, e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1">
                            Caption (Optional)
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-button border-2 border-gray-200 px-3 py-2 text-text-primary focus:border-primary-500 focus:outline-none"
                            placeholder="Add a memory..."
                            value={photo.caption}
                            onChange={(e) => updatePhotoCaption(index, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!canProceed()}
                >
                  Next: Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preview & Create */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Preview & Create</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-background-50 p-4 rounded-lg">
                <h3 className="font-bold text-text-primary mb-2">
                  {puzzleData.title}
                </h3>
                {puzzleData.description && (
                  <p className="text-text-secondary mb-4">
                    {puzzleData.description}
                  </p>
                )}
                <p className="text-sm text-text-secondary">
                  {photos.length} photos • Timeline Puzzle Game
                </p>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">Photos Preview:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🖼️</div>
                      <p className="text-xs text-text-secondary truncate">
                        {photo.file.name}
                      </p>
                      <p className="text-xs text-text-primary">
                        {photo.actual_date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={handleCreatePuzzle}
                  loading={creating}
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create Puzzle'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}