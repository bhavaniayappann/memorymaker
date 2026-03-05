// src/components/marketing/features-section.tsx

import { Card, CardContent } from '@/components/ui/card'

const FEATURES = [
  {
    icon: '🕒',
    title: 'Timeline Puzzle Game',
    description: 'Turn a handful of photos into an interactive challenge to see who remembers your story best.',
  },
  {
    icon: '📷',
    title: 'Built Around Your Memories',
    description: 'Each puzzle is powered by your own photos, dates, and captions — no stock content here.',
  },
  {
    icon: '📱',
    title: 'Share via Simple Link',
    description: 'Send a link over text or email. Your partner can play instantly on their phone, tablet, or laptop.',
  },
  {
    icon: '💝',
    title: 'Perfect for Special Moments',
    description: 'Anniversaries, birthdays, long‑distance surprises, or just because — make ordinary days feel cinematic.',
  },
  {
    icon: '✨',
    title: 'Delightful, Not Complicated',
    description: 'A guided 3‑step flow keeps creation simple so you can focus on the memories, not the tech.',
  },
  {
    icon: '🔒',
    title: 'Private by Default',
    description: 'Your puzzles are tied to your account and only accessible to people you share the link or code with.',
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
            A focused, joyful way to turn your relationship memories into a small interactive moment they&apos;ll remember.
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
              Start with one timeline puzzle today — it only takes a few minutes to create something they&apos;ll talk about for weeks.
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