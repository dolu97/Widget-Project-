import { Goal } from '../types';

const STORAGE_KEY = 'daily-goals-local-store';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function loadGoals(): Goal[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Goal[];
  } catch {
    return [];
  }
}

export function saveGoals(goals: Goal[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

export function hydrateDefaultGoals() {
  const current = loadGoals();
  if (current.length > 0) return current;

  const defaults: Goal[] = [
    {
      id: 'gym',
      title: 'Gym',
      category: 'Health & fitness',
      icon: 'dumbbell',
      emoji: '💪',
      recurrenceType: 'daily',
      sortOrder: 0,
      isActive: true,
      completedToday: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'reading',
      title: 'Reading',
      category: 'Personal development',
      icon: 'book-open',
      emoji: '📚',
      recurrenceType: 'daily',
      sortOrder: 1,
      isActive: true,
      completedToday: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  saveGoals(defaults);
  return defaults;
}
