'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

/**
 * Hook to sync Supabase authentication session with localStorage
 * This ensures that the user's login state is preserved across page refreshes
 */
export const useAuthSync = () => {
  useEffect(() => {
    const syncAuthState = async () => {
      const supabase = createClient()

      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error fetching session:', error)
        return
      }

      if (session?.user) {
        // User is authenticated, fetch their data from database
        const { data: userData, error: dbError } = await supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single()

        if (!dbError && userData) {
          // Update localStorage
          localStorage.setItem('username', userData.username)
          localStorage.setItem('isLoggedIn', 'true')

          // Notify components
          window.dispatchEvent(new Event('userLoggedIn'))
        }
      } else {
        // No session, clear localStorage
        localStorage.removeItem('username')
        localStorage.removeItem('isLoggedIn')
        window.dispatchEvent(new Event('userLoggedIn'))
      }
    }

    syncAuthState()

    // Listen for auth state changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // User logged in, fetch username
        supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single()
          .then(({ data: userData, error }) => {
            if (!error && userData) {
              localStorage.setItem('username', userData.username)
              localStorage.setItem('isLoggedIn', 'true')
              window.dispatchEvent(new Event('userLoggedIn'))
            }
          })
      } else {
        // User logged out
        localStorage.removeItem('username')
        localStorage.removeItem('isLoggedIn')
        window.dispatchEvent(new Event('userLoggedIn'))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
}
