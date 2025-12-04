// TicketForm component - Reusable form for creating and editing tickets

'use client'

import { useState, FormEvent } from 'react'
import { Ticket, TicketStatus, CreateTicketInput, UpdateTicketInput } from '@/types/ticket'
import StatusBadge from './StatusBadge'

interface TicketFormProps {
  ticket?: Ticket // If provided, this is an edit form
  onSubmit: (data: CreateTicketInput | UpdateTicketInput) => Promise<void>
  onCancel?: () => void
}

export default function TicketForm({ ticket, onSubmit, onCancel }: TicketFormProps) {
  const isEditing = !!ticket
  
  // Form state
  const [formData, setFormData] = useState({
    topic: ticket?.topic || '',
    status: ticket?.status || 'new',
    owner: ticket?.owner || '',
    problem_description: ticket?.problem_description || '',
    outcome: ticket?.outcome || '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.topic.trim() || !formData.owner.trim() || !formData.problem_description.trim()) {
        setError('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }

      // Prepare data for submission
      const submitData = {
        topic: formData.topic.trim(),
        status: formData.status as TicketStatus,
        owner: formData.owner.trim(),
        problem_description: formData.problem_description.trim(),
        outcome: formData.outcome.trim() || null,
      }

      await onSubmit(submitData)
    } catch (err) {
      setError('Failed to save ticket. Please try again.')
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const statusOptions: TicketStatus[] = ['new', 'in_progress', 'on_hold', 'resolved']

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Topic */}
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
          Topic <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="topic"
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief description of the issue"
          maxLength={200}
          required
        />
      </div>

      {/* Status and Owner Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as TicketStatus })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
            Owner <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="owner"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ticket owner/assignee"
            maxLength={100}
            required
          />
        </div>
      </div>

      {/* Problem Description */}
      <div>
        <label htmlFor="problem_description" className="block text-sm font-medium text-gray-700 mb-1">
          Problem Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="problem_description"
          value={formData.problem_description}
          onChange={(e) => setFormData({ ...formData, problem_description: e.target.value })}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Detailed description of the problem..."
          required
        />
      </div>

      {/* Outcome */}
      <div>
        <label htmlFor="outcome" className="block text-sm font-medium text-gray-700 mb-1">
          Outcome (Optional)
        </label>
        <textarea
          id="outcome"
          value={formData.outcome}
          onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Resolution or outcome..."
        />
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </div>
    </form>
  )
}


