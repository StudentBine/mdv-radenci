'use client'

interface DeleteNewsButtonProps {
  newsId: number
  newsTitle: string
}

export default function DeleteNewsButton({ newsId, newsTitle }: DeleteNewsButtonProps) {
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

      // Refresh the page to show updated list
      window.location.reload()
    } catch (error) {
      alert('Napaka pri brisanju novice. Poskusite ponovno.')
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
