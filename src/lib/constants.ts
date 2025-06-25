// src/components/layout/navbar.tsx

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">💕</span>
            <span className="text-xl font-bold text-text-primary">
              MemoryMaker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/examples" 
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Examples
            </Link>
            <Link 
              href="/games" 
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Games
            </Link>
            <Link 
              href="/pricing" 
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/help" 
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Help
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-text-secondary hover:text-text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  )
}