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

      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error fetching session:', error)
          // Clear localStorage on error to prevent stale data
          localStorage.removeItem('username')
          localStorage.removeItem('isLoggedIn')
          window.dispatchEvent(new Event('userLoggedIn'))
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
            // Update localStorage with fresh data
            localStorage.setItem('username', userData.username)
            localStorage.setItem('isLoggedIn', 'true')

            // Notify components
            window.dispatchEvent(new Event('userLoggedIn'))
          } else {
            // User in Supabase but not in database - clear everything
            console.error('User not found in database:', dbError)
            await supabase.auth.signOut()
            localStorage.removeItem('username')
            localStorage.removeItem('isLoggedIn')
            window.dispatchEvent(new Event('userLoggedIn'))
          }
        } else {
          // No session - force clear any stale localStorage data
          const hasStaleData = localStorage.getItem('username') || localStorage.getItem('isLoggedIn')
          if (hasStaleData) {
            console.log('Clearing stale localStorage data...')
          }
          localStorage.removeItem('username')
          localStorage.removeItem('isLoggedIn')
          window.dispatchEvent(new Event('userLoggedIn'))
        }
      } catch (err) {
        console.error('Auth sync error:', err)
        // On any error, clear localStorage to prevent issues
        localStorage.removeItem('username')
        localStorage.removeItem('isLoggedIn')
        window.dispatchEvent(new Event('userLoggedIn'))
      }
    }

    syncAuthState()

    // Listen for auth state changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)

      if (session?.user) {
        // User logged in, fetch username
        try {
          const { data: userData, error } = await supabase
            .from('users')
            .select('username')
            .eq('id', session.user.id)
            .single()

          if (!error && userData) {
            localStorage.setItem('username', userData.username)
            localStorage.setItem('isLoggedIn', 'true')
            window.dispatchEvent(new Event('userLoggedIn'))
          } else {
            console.error('Failed to fetch user data:', error)
            localStorage.removeItem('username')
            localStorage.removeItem('isLoggedIn')
            window.dispatchEvent(new Event('userLoggedIn'))
          }
        } catch (err) {
          console.error('Error in auth state change:', err)
          localStorage.removeItem('username')
          localStorage.removeItem('isLoggedIn')
          window.dispatchEvent(new Event('userLoggedIn'))
        }
      } else {
        // User logged out
        console.log('User logged out, clearing localStorage')
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
