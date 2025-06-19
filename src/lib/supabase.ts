// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.\n' +
    'Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable session persistence
    persistSession: true,
    // Auto refresh tokens
    autoRefreshToken: true,
    // Detect session in URL (for magic links, etc.)
    detectSessionInUrl: true,
  },
})

// Type-safe user helper
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error fetching user:', error.message)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Unexpected error fetching user:', error)
    return null
  }
}

// Sign out helper
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error signing out:', error)
    return { success: false, error }
  }
}

// Test connection helper
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('nonexistent_table')
      .select('*')
      .limit(1)
    
    // If we get a "table doesn't exist" error, connection is working!
    // Different error codes for "table not found"
    if (error && (
      error.code === 'PGRST116' || 
      error.message.includes('does not exist') ||
      error.message.includes('relation') 
    )) {
      return { connected: true, message: 'Supabase connected successfully!' }
    }
    
    // Other errors indicate connection issues
    if (error) {
      return { connected: false, message: error.message }
    }
    
    return { connected: true, message: 'Connected!' }
  } catch (error) {
    return { 
      connected: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}