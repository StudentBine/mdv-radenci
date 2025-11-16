'use client'

import { useEffect } from 'react'

export function useLucide() {
  useEffect(() => {
    // Initialize lucide icons after component mounts
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons()
    }
  }, [])
}
