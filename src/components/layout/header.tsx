// src/components/layout/header.tsx

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  variant?: 'default' | 'game' | 'minimal'
}

export default function Header({ variant = 'default' }: HeaderProps) {
  const isGameVariant = variant === 'game'
  const isMinimal = variant === 'minimal'

  return (
    <header className={`${
      isGameVariant 
        ? 'bg-gradient-to-r from-brand-navy via-brand-navy-dark to-brand-navy-light' 
        : 'bg-white border-b border-gray-100'
    } shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/images/memorymaker-logo.png"
                alt="MemoryMaker"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight ${
                isGameVariant ? 'text-white' : 'text-brand-navy'
              }`}>
                MemoryMaker
              </span>
              {!isMinimal && (
                <span className={`text-xs ${
                  isGameVariant ? 'text-brand-coral-light' : 'text-gray-500'
                }`}>
                  Create Beautiful Memories
                </span>
              )}
            </div>
          </Link>

          {/* Navigation */}
          {!isMinimal && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/create" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isGameVariant 
                    ? 'text-white hover:text-brand-coral-light' 
                    : 'text-gray-600 hover:text-brand-coral'
                }`}
              >
                Create
              </Link>
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isGameVariant 
                    ? 'text-white hover:text-brand-coral-light' 
                    : 'text-gray-600 hover:text-brand-coral'
                }`}
              >
                My Projects
              </Link>
              <Link 
                href="/games" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isGameVariant 
                    ? 'text-white hover:text-brand-coral-light' 
                    : 'text-gray-600 hover:text-brand-coral'
                }`}
              >
                Games
              </Link>
            </nav>
          )}

          {/* Actions */}
          {!isMinimal && (
            <div className="flex items-center space-x-4">
              {!isGameVariant && (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-brand-navy hover:text-brand-coral hover:bg-brand-coral/10"
                  >
                    Sign In
                  </Button>
                  <Button className="bg-gradient-to-r from-brand-coral to-brand-gold hover:from-brand-coral-dark hover:to-brand-gold-dark text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
                    Get Started
                  </Button>
                </>
              )}
              
              {isGameVariant && (
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                >
                  Exit Game
                </Button>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isMinimal && (
            <button className="md:hidden p-2">
              <svg className={`w-6 h-6 ${isGameVariant ? 'text-white' : 'text-brand-navy'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}