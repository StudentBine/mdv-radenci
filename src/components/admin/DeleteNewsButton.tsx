'use client'

import { useToast } from '@/contexts/ToastContext'
import { useRouter } from 'next/navigation'

interface DeleteNewsButtonProps {
  newsId: number
  newsTitle: string
}

export default function DeleteNewsButton({ newsId, newsTitle }: DeleteNewsButtonProps) {
  const { addToast } = useToast()
  const router = useRouter()
  const handleDelete = async () => {
    if (!confirm(`Ali ste prepričani, da želite izbrisati novico "${newsTitle}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Napaka pri brisanju')
      }

      addToast(`Novica "${newsTitle}" je bila uspešno izbrisana`, 'success')
      router.refresh()
    } catch (error) {
      addToast('Napaka pri brisanju novice. Poskusite ponovno.', 'error')
      console.error('Delete error:', error)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 transition-colors duration-200"
    >
      Izbriši
    </button>
  )
}
