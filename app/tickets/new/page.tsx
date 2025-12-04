'use client'

import { useRouter } from 'next/navigation'
import TicketForm from '@/components/TicketForm'
import { CreateTicketInput } from '@/types/ticket'
import Link from 'next/link'
import { useState } from 'react'

export default function NewTicketPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: CreateTicketInput) => {
    setIsLoading(true)

    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const ticket = await response.json()

    router.push(`/tickets/${ticket.id}`)
    setIsLoading(false)
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
      </div>

      {/* Form block */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
        <TicketForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
