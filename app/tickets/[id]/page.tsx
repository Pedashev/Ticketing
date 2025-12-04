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
          <h2 class
