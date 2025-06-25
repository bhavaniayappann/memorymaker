// src/components/marketing/features-section.tsx

import { Card, CardContent } from '@/components/ui/card'

const FEATURES = [
  {
    icon: '🎮',
    title: '12+ Interactive Games',
    description: 'Timeline puzzles, scavenger hunts, trivia, memory games, and creative tools',
  },
  {
    icon: '⚡',
    title: 'Ready in 30 Minutes',
    description: 'Simple drag-and-drop interface gets your app ready faster than making dinner',
  },
  {
    icon: '📱',
    title: 'Works on Any Device',
    description: 'Share via link - no app store downloads needed. Works on phones, tablets, and computers',
  },
  {
    icon: '💝',
    title: 'Share via Link',
    description: 'Send your creation through text, email, or QR code. Recipients can play instantly',
  },
  {
    icon: '🎨',
    title: 'Personalize Everything',
    description: 'Add your photos, videos, voice messages, and custom content to make it uniquely yours',
  },
  {
    icon: '🏆',
    title: 'Occasion Templates',
    description: 'Pre-designed templates for anniversaries, birthdays, graduations, and special moments',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            What Makes MemoryMaker Special
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Everything you need to create meaningful, interactive experiences for the people you love
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                
                {/* Feature Icon */}
                <div className="text-5xl mb-4">
                  {feature.icon}
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
                
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Create Something Amazing?
            </h3>
            <p className="text-text-secondary mb-6">
              Join thousands of people who've created unforgettable experiences for their loved ones
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-text-secondary">Loved by 10,000+ users</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}