'use client'

import { useEffect, useState } from 'react'
import { testConnection } from '@/lib/supabase'

type ConnectionStatus = {
  connected: boolean
  message: string
  loading: boolean
}

export default function HomePage() {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    message: 'Testing connection...',
    loading: true
  })

  useEffect(() => {
    const checkConnection = async () => {
      const result = await testConnection()
      setStatus({
        connected: result.connected,
        message: result.message,
        loading: false
      })
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen bg-background-50 p-8">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Tailwind Test */}
        <div className="bg-primary-500 text-white p-4 rounded-card">
          ✅ Tailwind CSS is working!
        </div>
        
        {/* Supabase Connection Test */}
        <div className={`p-4 rounded-card border-2 ${
          status.loading 
            ? 'border-yellow-300 bg-yellow-50' 
            : status.connected 
              ? 'border-green-300 bg-green-50' 
              : 'border-red-300 bg-red-50'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {status.loading ? '🔄' : status.connected ? '✅' : '❌'}
            </span>
            <span className="font-medium">
              Supabase Connection
            </span>
          </div>
          <p className="text-sm mt-1 text-gray-600">
            {status.message}
          </p>
        </div>
        
        {/* App Info */}
        <div className="bg-white p-6 rounded-card shadow-card">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            💕 MemoryMaker
          </h1>
          
          <p className="text-text-secondary mb-4">
            Create interactive apps with games for your loved ones
          </p>
          
          <div className="space-y-2 text-sm text-text-secondary">
            <div>🚀 Next.js 14 with Turbopack</div>
            <div>🎨 Tailwind CSS v3</div>
            <div>🗄️ Supabase {status.connected ? 'Connected' : 'Pending'}</div>
            <div>📱 TypeScript + App Router</div>
          </div>
          
          <button 
            className="btn-primary mt-4 w-full"
            onClick={() => window.location.reload()}
          >
            Test Again
          </button>
        </div>
        
      </div>
    </div>
  )
}