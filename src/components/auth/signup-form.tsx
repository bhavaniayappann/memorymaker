// src/components/auth/signup-form.tsx

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

export function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirect') || '/create'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        setSuccess(true)
        // Redirect to intended page (defaults to create flow) after successful signup
        setTimeout(() => {
          router.push(redirectTo)
        }, 2000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Welcome to MemoryMaker!
          </h2>
          <p className="text-text-secondary mb-4">
            Your account has been created successfully.
          </p>
          <p className="text-sm text-text-secondary">
            Redirecting to create your first timeline puzzle...
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Create Your Account</CardTitle>
        <p className="text-center text-text-secondary">
          Start creating beautiful experiences for your loved ones
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full rounded-button border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-button border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-button border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none"
              placeholder="Create a password (min. 6 characters)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-text-secondary">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" disabled>
              📧 Google
            </Button>
            <Button variant="outline" type="button" disabled>
              📘 Facebook
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign In
            </Link>
          </p>
          
        </form>
      </CardContent>
    </Card>
  )
}