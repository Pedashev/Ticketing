// API Route: /api/tickets
// Handles: GET (all tickets) and POST (create new ticket)

import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { CreateTicketInput } from '@/types/ticket'

// GET /api/tickets - Fetch all tickets
export async function GET() {
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

    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tickets:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tickets', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST /api/tickets - Create a new ticket
export async function POST(request: NextRequest) {
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

    const body: CreateTicketInput = await request.json()

    // Validate required fields
    if (!body.topic || !body.owner || !body.problem_description) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, owner, problem_description' },
        { status: 400 }
      )
    }

    // Set default status if not provided
    const ticketData = {
      topic: body.topic,
      status: body.status || 'new',
      owner: body.owner,
      problem_description: body.problem_description,
      outcome: body.outcome || null,
    }

    const { data, error } = await supabase
      .from('tickets')
      .insert([ticketData])
      .select()
      .single()

    if (error) {
      console.error('Error creating ticket:', error)
      return NextResponse.json(
        { error: 'Failed to create ticket', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}


