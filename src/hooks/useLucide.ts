'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    lucide?: {
      createIcons: () => void
    }
  }
}

export function useLucide() {
  useEffect(() => {
    const initializeLucide = () => {
      if (typeof window !== 'undefined' && window.lucide) {
        try {
          window.lucide.createIcons()
        } catch (error) {
          console.warn('Failed to initialize Lucide icons:', error)
        }
      }
    }

    // Try to initialize immediately
    initializeLucide()

    // If lucide isn't available yet, wait for script to load
    if (typeof window !== 'undefined' && !window.lucide) {
      const checkLucide = () => {
        if (window.lucide) {
          initializeLucide()
          return true
        }
        return false
      }

      // Check every 100ms for up to 3 seconds
      const interval = setInterval(() => {
        if (checkLucide()) {
          clearInterval(interval)
        }
      }, 100)

      // Clean up interval after 3 seconds
      const timeout = setTimeout(() => {
        clearInterval(interval)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [])
}
