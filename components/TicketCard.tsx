// TicketCard component - Displays a ticket in a card format

'use client'

import Link from 'next/link'
import { Ticket } from '@/types/ticket'
import StatusBadge from './StatusBadge'

interface TicketCardProps {
  ticket: Ticket
}

export default function TicketCard({ ticket }: TicketCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Truncate long descriptions
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 hover:border-blue-300"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {ticket.topic}
        </h3>
        <StatusBadge status={ticket.status} />
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {truncateText(ticket.problem_description, 150)}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">Owner: {ticket.owner}</span>
        <span>{formatDate(ticket.created_at)}</span>
      </div>
    </Link>
  )
}


