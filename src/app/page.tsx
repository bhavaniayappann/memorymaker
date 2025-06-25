// src/app/page.tsx

import { Navbar } from '@/components/layout/navbar'
import { HeroSection } from '@/components/marketing/hero-section'
import { DemoCards } from '@/components/marketing/demo-cards'
import { FeaturesSection } from '@/components/marketing/features-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <DemoCards />
        <FeaturesSection />
      </main>
    </div>
  )
}