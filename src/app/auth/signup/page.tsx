// src/app/auth/signup/page.tsx

import { Suspense } from 'react';
import Link from 'next/link';
import { SignUpForm } from '@/components/auth/signup-form';

export default function SignUpPage() {
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

        {/* Sign Up Form wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="p-6 text-center bg-white/80 rounded-2xl shadow-sm">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-text-secondary text-sm">Loading sign-up…</p>
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}