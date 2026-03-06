// src/lib/storage.ts

import { supabase } from '@/lib/supabase'

// Storage bucket name
const BUCKET_NAME = 'timeline-photos'

// Upload a single photo
export async function uploadPhoto(
  file: File, 
  userId: string, 
  puzzleId: string
): Promise<{ url: string | null; error: string | null }> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${puzzleId}/${Date.now()}.${fileExt}`

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      return { url: null, error: error.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    return { url: urlData.publicUrl, error: null }
  } catch (err) {
    console.error('Upload error:', err)
    return { 
      url: null, 
      error: err instanceof Error ? err.message : 'Upload failed' 
    }
  }
}

// Upload multiple photos
export async function uploadPhotos(
  files: File[], 
  userId: string, 
  puzzleId: string,
  onProgress?: (completed: number, total: number) => void
): Promise<{ urls: string[]; errors: string[] }> {
  const urls: string[] = []
  const errors: string[] = []

  for (let i = 0; i < files.length; i++) {
    const result = await uploadPhoto(files[i], userId, puzzleId)
    
    if (result.url) {
      urls.push(result.url)
    } else {
      errors.push(result.error || 'Unknown error')
    }

    // Report progress
    if (onProgress) {
      onProgress(i + 1, files.length)
    }
  }

  return { urls, errors }
}

// Delete a photo
export async function deletePhoto(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Delete error:', err)
    return false
  }
}

// Get optimized image URL with transformations
export function getOptimizedImageUrl(originalUrl: string): string {
  // Supabase doesn't have built-in image transformations like Cloudinary
  // For now, return original URL. In future, we can add image processing
  return originalUrl
}

// Validate file before upload
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' }
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 10MB' }
  }

  // Check file format
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' }
  }

  return { valid: true }
}