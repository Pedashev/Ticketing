import { Ticket } from '@/types/ticket'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// Fetch single ticket
async function getTicket(id: string): Promise<Ticket | null> {
  if (!isSupabaseConfigured) return null

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data ?? null
  } catch {
    return null
  }
}

// Format date
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default async function TicketDetailPage({
  params
}: {
  params: { id: string }
}) {
  const ticket = await getTicket(params.id)

  if (!ticket) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white border rounded-lg p-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ticket Not Found</h2>
          <p className="text-gray-600 mb-6">
            The ticket you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link href="/" className="text-blue-600 text-sm block mb-2">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold">{ticket.topic}</h1>
          <p className="text-gray-600 text-sm mt-1">
            Created: {formatDate(ticket.created_at)}
          </p>
        </div>

        <StatusBadge status={ticket.status} />
      </div>

      {/* Ticket Details */}
      <div className="bg-white border rounded-lg p-6 space-y-6 mb-6">
        <div>
          <p className="text-sm font-medium text-gray-700">Owner</p>
          <p>{ticket.owner}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Problem Description</p>
          <p className="whitespace-pre-wrap">{ticket.problem_description}</p>
        </div>

        {ticket.outcome && (
          <div>
            <p className="text-sm font-medium text-gray-700">Outcome</p>
            <p className="whitespace-pre-wrap">{ticket.outcome}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        <DeleteButton ticketId={ticket.id} />
        <Link
          href={`/tickets/${ticket.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Ticket
        </Link>
      </div>
    </div>
  )
}
