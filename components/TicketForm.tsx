'use client'

import { useState } from 'react'
import { CreateTicketInput, UpdateTicketInput, Ticket } from '@/types/ticket'

type TicketFormProps = {
  ticket?: Ticket
  onSubmit: (data: CreateTicketInput | UpdateTicketInput) => Promise<void>
}

export default function TicketForm({ ticket, onSubmit }: TicketFormProps) {
  const [form, setForm] = useState<CreateTicketInput | UpdateTicketInput>({
    topic: ticket?.topic ?? '',
    owner: ticket?.owner ?? '',
    problem_description: ticket?.problem_description ?? '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Topic</label>
        <input
          name="topic"
          className="border p-2 w-full"
          value={form.topic}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Owner</label>
        <input
          name="owner"
          className="border p-2 w-full"
          value={form.owner}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="problem_description"
          className="border p-2 w-full"
          value={form.problem_description}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save
      </button>
    </form>
  )
}
