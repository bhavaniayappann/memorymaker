// src/lib/constants.ts

// App Configuration
export const APP_CONFIG = {
  name: 'MemoryMaker',
  description: 'Create interactive apps with games for your loved ones',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const

// Design System Constants
export const DESIGN_TOKENS = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#ff6b6b',
    success: '#4ecdc4',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    card: '12px',
    button: '8px',
  },
} as const

// Game Types
export const GAME_TYPES = {
  TIMELINE_PUZZLE: 'timeline_puzzle',
  MEMORY_MATCH: 'memory_match',
  COUPLES_TRIVIA: 'couples_trivia',
  SCAVENGER_HUNT: 'scavenger_hunt',
} as const

// Relationship Types
export const RELATIONSHIP_TYPES = {
  PARTNER: 'partner',
  FAMILY: 'family',
  FRIEND: 'friend',
  SPOUSE: 'spouse',
} as const

// Occasion Types
export const OCCASION_TYPES = {
  ANNIVERSARY: 'anniversary',
  BIRTHDAY: 'birthday',
  VALENTINES: 'valentines',
  FATHERS_DAY: 'fathers_day',
  MOTHERS_DAY: 'mothers_day',
  GRADUATION: 'graduation',
  CUSTOM: 'custom',
} as const

// Navigation Links
export const NAV_LINKS = [
  { href: '/examples', label: 'Examples' },
  { href: '/games', label: 'Games' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/help', label: 'Help' },
] as const

// Example Apps for Homepage
export const EXAMPLE_APPS = [
  {
    id: 1,
    title: 'Our 5th Anniversary',
    description: 'Timeline puzzle + scavenger hunt',
    image: '/images/examples/anniversary.jpg',
    occasion: 'Anniversary',
    games: ['Timeline Puzzle', 'Scavenger Hunt'],
  },
  {
    id: 2,
    title: "Dad's 60th Birthday",
    description: 'Memory game + photo gallery',
    image: '/images/examples/birthday.jpg',
    occasion: 'Birthday',
    games: ['Memory Match', 'Photo Stories'],
  },
  {
    id: 3,
    title: 'My Valentine',
    description: 'Love letter reveals + playlist',
    image: '/images/examples/valentine.jpg',
    occasion: "Valentine's Day",
    games: ['Love Letters', 'Music Quiz'],
  },
  {
    id: 4,
    title: 'Graduation Surprise',
    description: 'Achievement timeline + trivia',
    image: '/images/examples/graduation.jpg',
    occasion: 'Graduation',
    games: ['Timeline', 'Achievement Quiz'],
  },
] as const