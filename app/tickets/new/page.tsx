// New Ticket page - Create a new support ticket

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TicketForm from '@/components/TicketForm'
import { CreateTicketInput } from '@/types/ticket'
import Link from 'next/link'

export default function NewTicketPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (data: CreateTicketInput) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create ticket')
      }

      const ticket = await response.json()

      // Redirect to the new ticket's page
      router.push(`/tickets/${ticket.id}`)
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
        >
          ← Back to Tickets
        </Link>
        <h2 className="text-3xl font-bold text-gray-900">Create New Ticket</h2>
        <p className="text-gray-600 mt-1">
          Fill out the form below to create a new support ticket
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
        <TicketForm onSubmit={(data) => { void handleSubmit(data) }} />
      </div>
    </div>
  )
}
