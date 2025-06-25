// src/components/marketing/demo-cards.tsx

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const EXAMPLE_APPS = [
  {
    id: 1,
    title: 'Our 5th Anniversary',
    description: 'Timeline puzzle + scavenger hunt',
    occasion: '💕 Anniversary',
    games: ['Timeline Puzzle', 'Scavenger Hunt'],
    preview: '📅🗺️',
    color: 'from-pink-100 to-rose-100',
  },
  {
    id: 2,
    title: "Dad's 60th Birthday",
    description: 'Memory game + photo gallery',
    occasion: '🎂 Birthday',
    games: ['Memory Match', 'Photo Stories'],
    preview: '🧠📸',
    color: 'from-blue-100 to-indigo-100',
  },
  {
    id: 3,
    title: 'My Valentine',
    description: 'Love letter reveals + playlist',
    occasion: '💝 Valentine\'s Day',
    games: ['Love Letters', 'Music Quiz'],
    preview: '💌🎵',
    color: 'from-red-100 to-pink-100',
  },
  {
    id: 4,
    title: 'Graduation Surprise',
    description: 'Achievement timeline + trivia',
    occasion: '🎓 Graduation',
    games: ['Timeline', 'Achievement Quiz'],
    preview: '🏆❓',
    color: 'from-green-100 to-emerald-100',
  },
]

export function DemoCards() {
  return (
    <section id="examples" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            See What You Can Create
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Get inspired by these examples and imagine what you'll build for your loved ones
          </p>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {EXAMPLE_APPS.map((app) => (
            <Card key={app.id} hover className="overflow-hidden">
              
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-br ${app.color} p-6 text-center`}>
                <div className="text-4xl mb-2">{app.preview}</div>
                <div className="text-sm font-medium text-gray-600">{app.occasion}</div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-text-primary mb-2">
                  {app.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {app.description}
                </p>
                
                {/* Games List */}
                <div className="space-y-1 mb-4">
                  {app.games.map((game, index) => (
                    <div key={index} className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full inline-block mr-1">
                      {game}
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  👁️ Preview
                </Button>
              </CardContent>
              
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link href="/auth/signin">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <p className="text-sm text-text-secondary mt-4">
            Choose from 12+ interactive games and experiences
          </p>
        </div>
        
      </div>
    </section>
  )
}