'use client'

import { useState } from 'react'
import { Ticket, CreateTicketInput, UpdateTicketInput } from '@/types/ticket'

export type TicketFormProps = {
  ticket?: Ticket
  onSubmit: (data: CreateTicketInput | UpdateTicketInput) => Promise<void>
  onCancel?: () => void
}

export default function TicketForm({ ticket, onSubmit, onCancel }: TicketFormProps) {
  const isEdit = !!ticket

  const [form, setForm] = useState<CreateTicketInput | UpdateTicketInput>({
    topic: ticket?.topic ?? '',
    owner: ticket?.owner ?? '',
    problem_description: ticket?.problem_description ?? '',
    ...(isEdit ? { id: ticket!.id, status: ticket!.status } : {}),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Topic */}
      <div>
        <label className="block font-medium">Topic</label>
        <input
          name="topic"
          className="border p-2 w-full"
          value={form.topic}
          onChange={handleChange}
        />
      </div>

      {/* Owner */}
      <div>
        <label className="block font-medium">Owner</label>
        <input
          name="owner"
          className="border p-2 w-full"
          value={form.owner}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="problem_description"
          className="border p-2 w-full"
          value={form.problem_description}
          onChange={handleChange}
        />
      </div>

      {/* Status only in edit mode */}
      {isEdit && (
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            className="border p-2 w-full"
            value={'status' in form ? form.status : 'open'}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isEdit ? 'Update Ticket' : 'Create Ticket'}
        </button>

        {onCancel && (
          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
