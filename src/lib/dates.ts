import { Goal } from '../types';
import { loadGoals, saveGoals } from './localStore';
import { getSupabaseClient, loadGoalsFromSupabase, saveGoalsToSupabase } from './supabaseData';

export async function loadGoalsRepository(): Promise<Goal[]> {
  const client = getSupabaseClient();

  if (client) {
    const remote = await loadGoalsFromSupabase();
    if (remote.length > 0) {
      saveGoals(remote);
      return remote;
    }
  }

  return loadGoals();
}

export async function saveGoalsRepository(goals: Goal[]): Promise<void> {
  saveGoals(goals);

  const client = getSupabaseClient();
  if (client) {
    await saveGoalsToSupabase(goals);
  }
}
