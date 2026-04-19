/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Useful mock data for preview if Supabase isn't configured
export const isMock = !import.meta.env.VITE_SUPABASE_URL;

// Helper to check and login anonymously if needed, or handle mock states
