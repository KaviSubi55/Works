'use client'

import { useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

/**
 * Hook to sync Supabase authentication session with localStorage
 * This ensures that the user's login state is preserved across page refreshes
 */
export const useAuthSync = () => {
  const isSyncingRef = useRef(false)

  useEffect(() => {
    const supabase = createClient()

    // Single handler for auth state - handles both initial state and changes
    const handleAuthChange = async (event: string, session: any) => {
      // Prevent duplicate syncs from running simultaneously
      if (isSyncingRef.current) {
        return
      }

      isSyncingRef.current = true

      try {
        console.log('Auth state changed:', event)

        if (session?.user) {
          // User logged in, fetch username
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
            // User in Supabase but not in database - clear everything
            if (event !== 'INITIAL_SESSION') {
              await supabase.auth.signOut()
            }
            localStorage.removeItem('username')
            localStorage.removeItem('isLoggedIn')
            window.dispatchEvent(new Event('userLoggedIn'))
          }
        } else {
          // No session - clear localStorage
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
        localStorage.removeItem('username')
        localStorage.removeItem('isLoggedIn')
        window.dispatchEvent(new Event('userLoggedIn'))
      } finally {
        isSyncingRef.current = false
      }
    }

    // Listen for auth state changes (this also fires once for the initial state)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange)

    return () => {
      subscription.unsubscribe()
    }
  }, [])
}
