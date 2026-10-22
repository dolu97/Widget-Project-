import { Goal } from '../types';

const GOAL_KEY = 'daily-goals-goals';

export function loadGoals(): Goal[] {
  const raw = window.localStorage.getItem(GOAL_KEY);
  if (!raw) {
    return [
      {
        id: crypto.randomUUID(),
        title: 'Gym',
        category: 'Health & fitness',
        icon: 'dumbbell',
        emoji: '💪',
        recurrenceType: 'daily',
        sortOrder: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Reading',
        category: 'Personal development',
        icon: 'book-open',
        emoji: '📚',
        recurrenceType: 'specific_weekdays',
        weekdays: [1, 3, 5],
        sortOrder: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  try {
    return JSON.parse(raw) as Goal[];
  } catch {
    return [];
  }
}

export function saveGoals(goals: Goal[]) {
  window.localStorage.setItem(GOAL_KEY, JSON.stringify(goals));
}

export function toggleGoalCompletion(goals: Goal[], id: string): Goal[] {
  return goals.map((goal) => {
    if (goal.id !== id) return goal;
    return {
      ...goal,
      completedToday: !goal.completedToday,
      updatedAt: new Date().toISOString(),
    };
  });
}
