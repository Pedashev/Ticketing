import { Ticket } from '@/types/ticket'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// Fetch a single ticket
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

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
