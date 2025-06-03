import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for server-side
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseKey)
}

// Create a singleton client for client-side
let clientSupabase: any

export const createClientSupabaseClient = () => {
  if (clientSupabase) return clientSupabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  clientSupabase = createClient(supabaseUrl, supabaseAnonKey)
  return clientSupabase
}
