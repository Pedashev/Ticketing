'use client'

import { useState } from 'react'
import { CreateTicketInput, UpdateTicketInput } from '@/types/ticket'

interface TicketFormProps {
  initialData?: CreateTicketInput | UpdateTicketInput
  onSubmit: (data: CreateTicketInput | UpdateTicketInput) => Promise<void>
}

export default function TicketForm({ initialData, onSubmit }: TicketFormProps) {
  const [topic, setTopic] = useState(initialData?.topic || '')
  const [owner, setOwner] = useState(initialData?.owner || '')
  const [problemDescription, setProblemDescription] = useState(
    initialData?.problem_description || ''
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit({
        topic,
        owner,
        problem_description: problemDescription,
      })
    } catch (err: any) {
      setError(err.message || 'Submit failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topic
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Owner
        </label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Problem Description
        </label>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 h-32"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isSubmitting ? 'Saving…' : 'Save Ticket'}
      </button>
    </form>
  )
}
