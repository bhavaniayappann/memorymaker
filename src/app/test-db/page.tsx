// src/app/test-db/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { testDatabaseConnection, createTimelinePuzzle } from '@/lib/database'

export default function DatabaseTestPage() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [testResult, setTestResult] = useState<string>('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const testConnection = async () => {
      const result = await testDatabaseConnection()
      if (result.error) {
        setConnectionStatus('error')
        setTestResult(result.error.message)
      } else {
        setConnectionStatus('connected')
        setTestResult(result.data || 'Connected')
      }
    }

    testConnection()
  }, [])

  const handleCreateTestPuzzle = async () => {
    setIsCreating(true)
    
    const testPuzzle = {
      title: 'Test Timeline Puzzle',
      description: 'A test puzzle to verify database operations',
      photos: []
    }

    const result = await createTimelinePuzzle(testPuzzle)
    
    if (result.error) {
      setTestResult(`Error creating puzzle: ${result.error.message}`)
    } else {
      setTestResult(`✅ Puzzle created successfully! ID: ${result.data?.id}`)
    }
    
    setIsCreating(false)
  }

  return (
    <div className="min-h-screen bg-background-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            🗄️ Database Test
          </h1>
          <p className="text-text-secondary">
            Testing our database schema and operations
          </p>
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle>Database Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              connectionStatus === 'checking' 
                ? 'bg-yellow-50 border border-yellow-200' 
                : connectionStatus === 'connected'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
            }`}>
              <span className="text-lg">
                {connectionStatus === 'checking' ? '🔄' : 
                 connectionStatus === 'connected' ? '✅' : '❌'}
              </span>
              <span>{testResult}</span>
            </div>
          </CardContent>
        </Card>

        {/* Database Schema Info */}
        <Card>
          <CardHeader>
            <CardTitle>Database Schema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span><strong>timeline_puzzles</strong> - Main puzzle projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span><strong>timeline_photos</strong> - Photos with dates</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span><strong>game_sessions</strong> - Play analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span><strong>Row Level Security</strong> - User data isolation</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Test Database Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div>
              <p className="text-sm text-text-secondary mb-3">
                Test creating a timeline puzzle (requires authentication)
              </p>
              
              <Button 
                onClick={handleCreateTestPuzzle}
                disabled={isCreating || connectionStatus !== 'connected'}
                loading={isCreating}
                className="w-full"
              >
                {isCreating ? 'Creating...' : 'Create Test Puzzle'}
              </Button>
            </div>

            {connectionStatus === 'connected' && (
              <div className="text-sm text-text-secondary">
                ℹ️ Note: Creating puzzles requires user authentication. 
                We'll build the auth flow next!
              </div>
            )}
            
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>✅ Ready for Next Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>🗄️ Database schema created</div>
              <div>🔗 TypeScript types defined</div>
              <div>🛠️ Database operations ready</div>
              <div>🔒 Row Level Security configured</div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <strong>Next:</strong> Build authentication flow so users can sign up and create puzzles!
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}