'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TicketForm from '@/components/TicketForm'
import { CreateTicketInput, UpdateTicketInput } from '@/types/ticket'
import Link from 'next/link'

export default function NewTicketPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: CreateTicketInput | UpdateTicketInput) => {
    setIsLoading(true)

    // Мы знаем, что при создании нет update-полей — это нормально.
    const createData: CreateTicketInput = {
      topic: data.topic ?? '',
      owner: data.owner ?? '',
      problem_description: data.problem_description ?? '',
    }

    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createData),
    })

    const ticket = await response.json()
    router.push(`/tickets/${ticket.id}`)
    setIsLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
      >
        ← Back to Tickets
      </Link>

      <h2 className="text-3xl font-bold">Create New Ticket</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
        <TicketForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
