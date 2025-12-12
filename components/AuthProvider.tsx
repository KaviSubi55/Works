'use client'

import { useAuthSync } from '@/hooks/useAuthSync'

/**
 * Client component that syncs authentication state
 * Must be used in the root layout to work across all pages
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthSync()

  return <>{children}</>
}
