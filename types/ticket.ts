// Ticket data structure matching our database schema

export type TicketStatus = 'new' | 'in_progress' | 'on_hold' | 'resolved'

export interface Ticket {
  id: string
  topic: string
  status: TicketStatus
  owner: string
  problem_description: string
  outcome: string | null
  created_at: string
  updated_at: string
}

// For creating a new ticket (without auto-generated fields)
export interface CreateTicketInput {
  topic: string
  status?: TicketStatus  // Optional, defaults to 'new'
  owner: string
  problem_description: string
  outcome?: string | null
}

// For updating a ticket (all fields optional except id)
export interface UpdateTicketInput {
  topic?: string
  status?: TicketStatus
  owner?: string
  problem_description?: string
  outcome?: string | null
}


