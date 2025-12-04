'use client'

import { useState } from 'react'
import { CreateTicketInput } from '@/types/ticket'

type TicketFormProps = {
  onSubmit: (data: CreateTicketInput) => Promise<void>
}

export default function TicketForm({ onSubmit }: TicketFormProps) {
  const [form, setForm] = useState<CreateTicketInput>({
    topic: '',
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Topic</label>
        <input
          name="topic"
          className="border p-2 w-full"
          value={form.topic}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium">Owner</label>
        <input
          name="owner"
          className="border p-2 w-full"
          value={form.owner}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="problem_description"
          className="border p-2 w-full"
          value={form.problem_description}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Ticket
      </button>
    </form>
  )
}
