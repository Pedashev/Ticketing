// TicketDashboard component - Client-side dashboard with filtering

'use client'

import { useState, useMemo } from 'react'
import { Ticket, TicketStatus } from '@/types/ticket'
import TicketTable from './TicketTable'
import StatusFilter from './StatusFilter'
import Link from 'next/link'

interface TicketDashboardProps {
  initialTickets: Ticket[]
}

export default function TicketDashboard({ initialTickets }: TicketDashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | 'all'>('all')

  // Calculate ticket counts by status
  const ticketCounts = useMemo(() => {
    return {
      all: initialTickets.length,
      new: initialTickets.filter((t) => t.status === 'new').length,
      in_progress: initialTickets.filter((t) => t.status === 'in_progress').length,
      on_hold: initialTickets.filter((t) => t.status === 'on_hold').length,
      resolved: initialTickets.filter((t) => t.status === 'resolved').length,
    }
  }, [initialTickets])

  // Filter tickets based on selected status
  const filteredTickets = useMemo(() => {
    if (selectedStatus === 'all') {
      return initialTickets
    }
    return initialTickets.filter((ticket) => ticket.status === selectedStatus)
  }, [initialTickets, selectedStatus])

  return (
    <div>
      {/* Stats Dashboard */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{ticketCounts.all}</div>
          <div className="text-sm text-gray-600">Total Tickets</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{ticketCounts.new}</div>
          <div className="text-sm text-gray-600">New</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {ticketCounts.in_progress}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">
            {ticketCounts.on_hold}
          </div>
          <div className="text-sm text-gray-600">On Hold</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {ticketCounts.resolved}
          </div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          ticketCounts={ticketCounts}
        />
      </div>

      {/* Tickets Table */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedStatus === 'all'
                ? 'All Tickets'
                : `${selectedStatus.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Tickets`}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Showing {filteredTickets.length} of {initialTickets.length} tickets
            </p>
          </div>
          <Link
            href="/tickets/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            + New Ticket
          </Link>
        </div>
        <TicketTable tickets={filteredTickets} />
      </div>
    </div>
  )
}

