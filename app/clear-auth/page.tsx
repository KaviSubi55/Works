'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function ClearAuthPage() {
  const router = useRouter()
  const [status, setStatus] = useState<string>('Clearing authentication data...')

  useEffect(() => {
    const clearAuth = async () => {
      try {
        setStatus('Signing out from Supabase...')

        // Sign out from Supabase
        const supabase = createClient()
        await supabase.auth.signOut()

        setStatus('Clearing localStorage...')

        // Clear all auth-related localStorage
        localStorage.removeItem('username')
        localStorage.removeItem('isLoggedIn')

        // Notify components
        window.dispatchEvent(new Event('userLoggedIn'))
        window.dispatchEvent(new Event('cartUpdated'))

        setStatus('Authentication data cleared successfully!')

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      } catch (error) {
        console.error('Error clearing auth:', error)
        setStatus('Error occurred, but localStorage has been cleared. Redirecting...')

        // Still redirect even on error
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      }
    }

    clearAuth()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Clearing Authentication
          </h1>
          <p className="text-gray-600">{status}</p>
        </div>
        <div className="text-sm text-gray-500">
          You will be redirected to the login page shortly...
        </div>
      </div>
    </div>
  )
}
