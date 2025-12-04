// StatusBadge component - Visual indicator for ticket status

'use client'

import { TicketStatus } from '@/types/ticket'

interface StatusBadgeProps {
  status: TicketStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Different colors for each status
  const statusStyles: Record<TicketStatus, string> = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    on_hold: 'bg-orange-100 text-orange-800 border-orange-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
  }

  // Format status text for display
  const statusText: Record<TicketStatus, string> = {
    new: 'New',
    in_progress: 'In Progress',
    on_hold: 'On Hold',
    resolved: 'Resolved',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      {statusText[status]}
    </span>
  )
}


