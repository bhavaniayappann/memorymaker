/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          900: '#2d3748',
        },
        secondary: {
          500: '#764ba2',
          600: '#6b46c1',
        },
        accent: {
          500: '#ff6b6b',
          600: '#e53e3e',
        },
        success: {
          500: '#4ecdc4',
          600: '#38b2ac',
        },
        background: {
          50: '#f5f7fa',
          100: '#edf2f7',
        },
        text: {
          primary: '#2c3e50',
          secondary: '#7f8c8d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0,0,0,0.1)',
        'card-hover': '0 20px 40px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}