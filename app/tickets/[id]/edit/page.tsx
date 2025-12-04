// Edit Ticket page - Update an existing ticket

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import TicketForm from '@/components/TicketForm'
import { Ticket, UpdateTicketInput } from '@/types/ticket'
import Link from 'next/link'

export default function EditTicketPage() {
  const router = useRouter()
  const params = useParams()
  const ticketId = params.id as string

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch ticket data on mount
  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await fetch(`/api/tickets/${ticketId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Ticket not found')
          } else {
            setError('Failed to load ticket')
          }
          return
        }

        const data = await response.json()
        setTicket(data)
      } catch (err) {
        console.error('Error fetching ticket:', err)
        setError('Failed to load ticket')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTicket()
  }, [ticketId])

  // Handle form submission
  const handleSubmit = async (data: UpdateTicketInput) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update ticket')
      }

      // Redirect to ticket detail page
      router.push(`/tickets/${ticketId}`)
    } catch (error) {
      console.error('Error updating ticket:', error)
      throw error // Re-throw to let TicketForm handle it
    }
  }

  // Handle cancel
  const handleCancel = () => {
    router.push(`/tickets/${ticketId}`)
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading ticket...</p>
        </div>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {error || 'Ticket Not Found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {error || "The ticket you're trying to edit doesn't exist."}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/tickets/${ticketId}`}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
        >
          ← Back to Ticket
        </Link>
        <h2 className="text-3xl font-bold text-gray-900">Edit Ticket</h2>
        <p className="text-gray-600 mt-1">
          Update the ticket information below
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
        <TicketForm
          ticket={ticket}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}


