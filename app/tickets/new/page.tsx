'use client'

import { useState } from 'react'
import { CreateTicketInput } from '@/types/ticket'

interface TicketFormProps {
  onSubmit: (data: CreateTicketInput) => Promise<void>
}

export default function TicketForm({ onSubmit }: TicketFormProps) {
  const [form, setForm] = useState<CreateTicketInput>({
    topic: '',
    status: 'new',
    owner: '',
    problem_description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
        <input
          name="topic"
          value={form.topic}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
        <input
          name="owner"
          value={form.owner}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Problem Description</label>
        <textarea
          name="problem_description"
          value={form.problem_description}
          onChange={handleChange}
          className="w-full border rounded-md p-2 h-28"
          required
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Ticket
      </button>
    </form>
  )
}
