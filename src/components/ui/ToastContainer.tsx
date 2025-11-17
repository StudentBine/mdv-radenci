'use client'

import { useToast, type Toast } from '@/contexts/ToastContext'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onRemove={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: () => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-gray-900'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
        return 'ℹ'
      default:
        return ''
    }
  }

  return (
    <div 
      className={`
        ${getToastStyles(toast.type)} 
        px-4 py-3 rounded-lg shadow-lg max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        animate-slide-in-right flex items-center justify-between
      `}
    >
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{getIcon(toast.type)}</span>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
      <button
        onClick={onRemove}
        className="ml-4 text-white hover:text-gray-200 font-bold text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}