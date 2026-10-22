import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Goal } from '../types';

function toSnakeCase(key: string): string {
  return key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

function toCamelCase(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function mapGoalToDb(goal: Goal) {
  const row: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(goal)) {
    row[toSnakeCase(key)] = value;
  }

  return row;
}

function mapGoalFromDb(row: Record<string, unknown>): Goal {
  const mapped: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(row)) {
    mapped[toCamelCase(key)] = value;
  }

  return mapped as Goal;
}

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

  return (data ?? []).map((row) => mapGoalFromDb(row as Record<string, unknown>));
}

export async function saveGoalsToSupabase(goals: Goal[]): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  const rows = goals.map((goal) => mapGoalToDb(goal));
  const { error } = await client.from('goals').upsert(rows, { onConflict: 'id' });

  if (error) {
    console.warn('Supabase goals save failed', error.message);
  }
}
