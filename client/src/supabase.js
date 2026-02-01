
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail gracefully if keys are missing (prevents white screen)
const isConfigured = supabaseUrl && supabaseUrl !== 'your_supabase_url' && supabaseAnonKey;

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: async () => ({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signUp: async () => ({ error: { message: "Supabase keys missing in .env file!" } }),
            signInWithPassword: async () => ({ error: { message: "Supabase keys missing in .env file!" } }),
            signOut: async () => { },
        }
    };
