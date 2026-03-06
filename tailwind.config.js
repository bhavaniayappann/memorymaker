/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // MemoryMaker Brand Colors (extracted from your logo)
        brand: {
          // Navy/Dark Blue (main background from logo)
          navy: '#2D3561',
          'navy-dark': '#1E2442',
          'navy-light': '#3A4270',
          
          // Coral/Pink (heart colors from logo)
          coral: '#FF7B94',
          'coral-light': '#FF9FB0',
          'coral-dark': '#E55C78',
          
          // Golden Yellow (accent from logo)
          gold: '#FFD93D',
          'gold-light': '#FFE066',
          'gold-dark': '#E5C135',
          
          // Soft Pink/Rose (gift box from logo)
          pink: '#FFB5C1',
          'pink-light': '#FFCDD5',
          'pink-dark': '#E59CAD',
          
          // Professional backgrounds
          cream: '#FFF8F0',
          'warm-white': '#FEFCF8',
          'professional-gray': '#F8FAFC',
        },
        
        // Semantic Color System
        primary: {
          50: '#FFF8F0',   // Lightest cream
          100: '#FFE066',  // Light gold
          200: '#FFD93D',  // Main gold
          300: '#FF9FB0',  // Light coral
          400: '#FF7B94',  // Main coral
          500: '#E55C78',  // Dark coral
          600: '#2D3561',  // Main navy
          700: '#1E2442',  // Dark navy
          800: '#15192E',  // Darker navy
          900: '#0C0E1A',  // Darkest navy
        },
        
        // Background Colors
        background: {
          primary: '#FEFCF8',     // Warm white
          secondary: '#FFF8F0',   // Cream
          accent: '#2D3561',      // Navy
          card: '#FFFFFF',        // Pure white for cards
        },
        
        // Text Colors
        text: {
          primary: '#2D3561',     // Navy for main text
          secondary: '#6B7280',   // Gray for secondary text
          accent: '#FF7B94',      // Coral for accent text
          light: '#FFFFFF',       // White for dark backgrounds
          muted: '#9CA3AF',       // Muted gray
        },
        
        // Interactive Elements
        interactive: {
          primary: '#FF7B94',     // Coral buttons
          'primary-hover': '#E55C78',
          secondary: '#FFD93D',   // Gold buttons
          'secondary-hover': '#E5C135',
          accent: '#FFB5C1',      // Pink accents
          'accent-hover': '#E59CAD',
        },
        
        // Status Colors (maintaining brand harmony)
        status: {
          success: '#10B981',     // Green
          warning: '#F59E0B',     // Orange
          error: '#EF4444',       // Red
          info: '#3B82F6',        // Blue
        },
        
        // Game-specific Colors
        game: {
          timer: '#FFD93D',       // Gold for timers
          score: '#FF7B94',       // Coral for scores
          hint: '#FFB5C1',        // Pink for hints
          correct: '#10B981',     // Green for correct
          incorrect: '#EF4444',   // Red for incorrect
        },
      },
      
      // Custom Gradients
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF7B94 0%, #FFD93D 100%)',
        'brand-gradient-reverse': 'linear-gradient(135deg, #FFD93D 0%, #FF7B94 100%)',
        'navy-gradient': 'linear-gradient(135deg, #2D3561 0%, #1E2442 100%)',
        'coral-gradient': 'linear-gradient(135deg, #FF9FB0 0%, #FF7B94 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFE066 0%, #FFD93D 100%)',
        'pink-gradient': 'linear-gradient(135deg, #FFCDD5 0%, #FFB5C1 100%)',
        'hero-gradient': 'linear-gradient(135deg, #2D3561 0%, #FF7B94 50%, #FFD93D 100%)',
      },
      
      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      
      // Spacing (maintaining current spacing scale)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border Radius
      borderRadius: {
        'brand': '12px',
        'card': '16px',
        'button': '8px',
        'input': '8px',
      },
      
      // Box Shadows
      boxShadow: {
        'brand': '0 10px 30px rgba(45, 53, 97, 0.1)',
        'brand-lg': '0 20px 40px rgba(45, 53, 97, 0.15)',
        'coral': '0 10px 30px rgba(255, 123, 148, 0.2)',
        'gold': '0 10px 30px rgba(255, 217, 61, 0.2)',
        'game': '0 5px 15px rgba(45, 53, 97, 0.08)',
      },
      
      // Animation
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}