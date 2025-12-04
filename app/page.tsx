// Home page - Displays list of all tickets with dashboard and filters

import { Ticket } from '@/types/ticket'
import Link from 'next/link'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import TicketDashboard from '@/components/TicketDashboard'

// Some mock tickets so you can preview the UI without Supabase
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
  {
    id: 'mock-4',
    topic: 'Password reset not working',
    status: 'new',
    owner: 'Alice Johnson',
    problem_description:
      'Users are unable to reset their passwords. The reset email is not being sent.',
    outcome: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'mock-5',
    topic: 'Payment processing error',
    status: 'on_hold',
    owner: 'Bob Williams',
    problem_description:
      'Some customers reported payment processing errors during checkout. Waiting for payment gateway provider response.',
    outcome: null,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

// Fetch tickets on the server (faster than client-side)
// Force fresh data by not caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getTickets(): Promise<Ticket[]> {
  // If Supabase is not configured, return mock data so you can see the UI
  if (!isSupabaseConfigured) {
    return MOCK_TICKETS
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tickets:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error fetching tickets:', error)
    return []
  }
}

export default async function HomePage() {
  const tickets = await getTickets()

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Support Tickets Dashboard
        </h2>
        <p className="text-gray-600">
          Manage and track all support requests in one place
        </p>
      </div>

      {/* Dashboard with Filters and Table */}
      {tickets.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tickets yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first support ticket
            </p>
            <Link
              href="/tickets/new"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Your First Ticket
            </Link>
          </div>
        </div>
      ) : (
        <TicketDashboard initialTickets={tickets} />
      )}
    </div>
  )
}

