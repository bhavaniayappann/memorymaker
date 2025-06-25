// src/app/auth/signin/page.tsx

import Link from 'next/link'
import { SignInForm } from '@/components/auth/signin-form'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-background-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <span className="text-3xl">💕</span>
            <span className="text-2xl font-bold text-text-primary">MemoryMaker</span>
          </Link>
        </div>

        {/* Sign In Form */}
        <SignInForm />
        
      </div>
    </div>
  )
}