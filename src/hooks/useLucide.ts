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
    // Initialize lucide icons after component mounts
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons()
    }
  }, [])
}
