// Supabase client setup
// This file creates a connection to your Supabase database

import { createClient } from '@supabase/supabase-js'

// Get environment variables (they might be missing in UI-only mode)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Flag so the rest of the app can know if Supabase is configured
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey

// Create and export the Supabase client *only* if env vars are present.
// In \"UI preview\" mode (no env vars), this will be `null` and the pages
// will fall back to mock data.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null as any



