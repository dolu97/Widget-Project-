import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Goal } from '../types';

export function getSupabaseClient(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export async function loadGoalsFromSupabase(): Promise<Goal[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client.from('goals').select('*');
  if (error) {
    console.warn('Supabase goals load failed', error.message);
    return [];
  }

  return (data ?? []) as Goal[];
}

export async function saveGoalsToSupabase(goals: Goal[]): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  const { error } = await client.from('goals').upsert(
    goals.map((goal) => ({
      ...goal,
      updated_at: goal.updatedAt,
    })),
    { onConflict: 'id' },
  );

  if (error) {
    console.warn('Supabase goals save failed', error.message);
  }
}
