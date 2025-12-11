// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Estas credenciales las encuentras en tu Dashboard de Supabase (Settings -> API)
const supabaseUrl = 'https://jwdbdlqmxpmmfiiwnftv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZGJkbHFteHBtbWZpaXduZnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTYyMTcsImV4cCI6MjA4MDM3MjIxN30.C98eVVBa2X7PYBz7s7-zZjRYWbN0rT5kPMX8WoCkch4'

export const supabase = createClient(supabaseUrl, supabaseKey)