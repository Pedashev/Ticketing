// View Ticket page - Display ticket details

import { Ticket } from '@/types/ticket'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// Simple mock lookup so detail page also works in UI-only mode
const MOCK_TICKETS: Ticket[] = [
  {
    id: 'mock-1',
    topic: 'Cannot login to system',
    status: 'new',
    owner: 'Jane Doe',
    problem_description:
      'User reports being unable to login despite correct credentials. Password reset was attempted but issue persists.',
    outcome: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    topic: 'Email notifications delayed',
    status: 'in_progress',
    owner: 'John Smith',
    problem_description:
      'Email notifications are delayed by 30+ minutes for some users.',
    outcome: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    topic: 'Slow dashboard loading',
    status: 'resolved',
    owner: 'Support Bot',
    problem_description:
      'Dashboard page was taking over 10 seconds to load for several customers.',
    outcome:
      'Optimized database queries and enabled caching. Load times are now under 2 seconds.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Fetch a single ticket
async function getTicket(id: string): Promise<Ticket | null> {
  // In UI-only mode, look up from mock tickets
  if (!isSupabaseConfigured) {
    return MOCK_TICKETS.find((t) => t.id === id) ?? MOCK_TICKETS[0] ?? null
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null
      }
      console.error('Error fetching ticket:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error fetching ticket:', error)
    return null
  }
}

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function TicketDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const ticket = await getTicket(params.id)

  if (!ticket) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ticket Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            The ticket you're looking for doesn't exist or has been deleted.
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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
        >
          ← Back to Tickets
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {ticket.topic}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Created: {formatDate(ticket.created_at)}</span>
              {ticket.updated_at !== ticket.created_at && (
                <span>Updated: {formatDate(ticket.updated_at)}</span>
              )}
            </div>
          </div>
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      {/* Ticket Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-6">
        <div className="space-y-6">
          {/* Owner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner
            </label>
            <p className="text-gray-900">{ticket.owner}</p>
          </div>

          {/* Problem Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Problem Description
            </label>
            <p className="text-gray-900 whitespace-pre-wrap">
              {ticket.problem_description}
            </p>
          </div>

          {/* Outcome */}
          {ticket.outcome && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outcome
              </label>
              <p className="text-gray-900 whitespace-pre-wrap">
                {ticket.outcome}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <DeleteButton ticketId={ticket.id} />
        <Link
          href={`/tickets/${ticket.id}/edit`}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Edit Ticket
        </Link>
      </div>
    </div>
  )
}

