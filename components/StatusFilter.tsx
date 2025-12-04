// StatusFilter component - Filter tickets by status

'use client'

import { TicketStatus } from '@/types/ticket'

interface StatusFilterProps {
  selectedStatus: TicketStatus | 'all'
  onStatusChange: (status: TicketStatus | 'all') => void
  ticketCounts: {
    all: number
    new: number
    in_progress: number
    on_hold: number
    resolved: number
  }
}

export default function StatusFilter({
  selectedStatus,
  onStatusChange,
  ticketCounts,
}: StatusFilterProps) {
  const filterOptions: Array<{ value: TicketStatus | 'all'; label: string; color: string }> = [
    { value: 'all', label: 'All Tickets', color: 'gray' },
    { value: 'new', label: 'New', color: 'blue' },
    { value: 'in_progress', label: 'In Progress', color: 'yellow' },
    { value: 'on_hold', label: 'On Hold', color: 'orange' },
    { value: 'resolved', label: 'Resolved', color: 'green' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Filter by status:</span>
        {filterOptions.map((option) => {
          const count =
            option.value === 'all'
              ? ticketCounts.all
              : ticketCounts[option.value as TicketStatus]

          const isSelected = selectedStatus === option.value

          return (
            <button
              key={option.value}
              onClick={() => onStatusChange(option.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {option.label}
              <span className={`ml-2 text-xs ${isSelected ? 'opacity-90' : 'opacity-70'}`}>
                ({count})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

