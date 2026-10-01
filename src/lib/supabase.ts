import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tgqvzxlkbmcihxghzqwq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncXZ6eGxrYm1jaWh4Z2h6cXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MTQyMTMsImV4cCI6MjEwNjM5MDIxM30.dM5mfRKSBdeTv23WNfrYVIB-gldl3wKovmfuGtG6v6I';

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'ADMIN1223';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
