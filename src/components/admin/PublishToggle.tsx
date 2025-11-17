'use client'

import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { useRouter } from 'next/navigation'

interface PublishToggleProps {
  newsId: number
  isPublished: boolean
  newsTitle: string
}

export default function PublishToggle({ newsId, isPublished, newsTitle }: PublishToggleProps) {
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()
  const router = useRouter()

  const handleToggle = async () => {
    setLoading(true)
    
    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !isPublished
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      const newStatus = !isPublished
      addToast(
        `Novica "${newsTitle}" je bila ${newStatus ? 'objavljena' : 'shranjena kot osnutek'}`,
        'success'
      )
      
      // Refresh the page data
      router.refresh()
    } catch (error) {
      addToast('Napaka pri spreminjanju statusa novice', 'error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-all duration-200
        ${isPublished 
          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        }
        ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {loading ? 'Spreminjam...' : isPublished ? 'Objavljeno' : 'Osnutek'}
    </button>
  )
}