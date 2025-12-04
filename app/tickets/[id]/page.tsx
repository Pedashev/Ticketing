async function getTicket(id: string): Promise<Ticket | null> {
  if (!isSupabaseConfigured) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching ticket:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error fetching ticket:', error)
    return null
  }
}
