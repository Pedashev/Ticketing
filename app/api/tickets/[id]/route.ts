// API Route: /api/tickets/[id]
// Handles: GET (one ticket), PUT (update ticket), DELETE (delete ticket)

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { UpdateTicketInput } from '@/types/ticket'

// GET /api/tickets/[id] - Fetch a single ticket
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json(
        { 
          error: 'Supabase is not configured. Please set up your .env.local file with Supabase credentials.',
          details: 'See ENV_SETUP_GUIDE.md for instructions'
        },
        { status: 503 }
      )
    }

    const { id } = params

    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return NextResponse.json(
          { error: 'Ticket not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching ticket:', error)
      return NextResponse.json(
        { error: 'Failed to fetch ticket' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/tickets/[id] - Update a ticket
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json(
        { 
          error: 'Supabase is not configured. Please set up your .env.local file with Supabase credentials.',
          details: 'See ENV_SETUP_GUIDE.md for instructions'
        },
        { status: 503 }
      )
    }

    const { id } = params
    const body: UpdateTicketInput = await request.json()

    // Prepare update data (only include fields that are provided)
    const updateData: Partial<UpdateTicketInput> = {}
    
    if (body.topic !== undefined) updateData.topic = body.topic
    if (body.status !== undefined) updateData.status = body.status
    if (body.owner !== undefined) updateData.owner = body.owner
    if (body.problem_description !== undefined) updateData.problem_description = body.problem_description
    if (body.outcome !== undefined) updateData.outcome = body.outcome

    // Add updated_at timestamp
    const { data, error } = await supabase
      .from('tickets')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Ticket not found' },
          { status: 404 }
        )
      }
      console.error('Error updating ticket:', error)
      return NextResponse.json(
        { error: 'Failed to update ticket' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/tickets/[id] - Delete a ticket
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json(
        { 
          error: 'Supabase is not configured. Please set up your .env.local file with Supabase credentials.',
          details: 'See ENV_SETUP_GUIDE.md for instructions'
        },
        { status: 503 }
      )
    }

    const { id } = params

    console.log('Attempting to delete ticket with ID:', id)

    // First, verify the ticket exists
    const { data: existingTicket, error: fetchError } = await supabase
      .from('tickets')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError || !existingTicket) {
      console.error('Ticket not found:', fetchError)
      return NextResponse.json(
        { error: 'Ticket not found', details: fetchError?.message },
        { status: 404 }
      )
    }

    // Now delete the ticket
    const { data, error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error deleting ticket:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { 
          error: 'Failed to delete ticket', 
          details: error.message,
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      )
    }

    // Check if any rows were deleted
    if (!data || data.length === 0) {
      console.warn('Delete operation returned no data - ticket may not have been deleted')
      // This could mean RLS is blocking the delete
      return NextResponse.json(
        { 
          error: 'Ticket could not be deleted. This may be due to Row Level Security (RLS) policies.',
          details: 'Please check your Supabase RLS policies allow DELETE operations'
        },
        { status: 403 }
      )
    }

    console.log('Ticket deleted successfully:', data)

    // Revalidate the home page cache so it shows updated data
    revalidatePath('/')

    return NextResponse.json(
      { message: 'Ticket deleted successfully', deletedId: id, deletedData: data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}


