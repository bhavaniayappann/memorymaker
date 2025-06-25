// src/components/marketing/hero-section.tsx

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-background-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Emoji Illustration */}
          <div className="flex justify-center space-x-4 mb-8">
            <span className="text-6xl animate-bounce">💝</span>
            <span className="text-6xl animate-bounce" style={{ animationDelay: '0.1s' }}>📱</span>
            <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎮</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Create{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Love Stories
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Build interactive apps with games for your special someone in minutes.
            No coding required.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200">
              <span className="text-primary-600 font-medium">🎮 12+ Interactive Games</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-success-200">
              <span className="text-success-600 font-medium">⚡ Ready in 30 Minutes</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-accent-200">
              <span className="text-accent-600 font-medium">📱 Works on Any Device</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Get Started
              </Button>
            </Link>
            <Link href="#examples">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                See Examples
              </Button>
            </Link>
          </div>

          {/* Trust Signal */}
          <p className="text-sm text-text-secondary mt-6">
            Free to start • No credit card required • Create unlimited memories
          </p>
          
        </div>
      </div>
    </section>
  )
}