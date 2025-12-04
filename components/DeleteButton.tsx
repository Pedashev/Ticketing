// DeleteButton component - Handles ticket deletion with confirmation

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface DeleteButtonProps {
  ticketId: string
}

export default function DeleteButton({ ticketId }: DeleteButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
        cache: 'no-store', // Ensure we don't use cached response
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to delete ticket')
      }

      // Success! Show success message and redirect
      console.log('Ticket deleted successfully:', data)
      
      // Show success message
      alert('Ticket deleted successfully!')
      
      // Redirect to dashboard with cache busting to ensure fresh data
      // Using replace instead of href to avoid adding to browser history
      window.location.replace('/?refresh=' + Date.now())
    } catch (error) {
      console.error('Error deleting ticket:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete ticket. Please try again.'
      alert('Error: ' + errorMessage)
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Are you sure?</span>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
    >
      Delete Ticket
    </button>
  )
}


