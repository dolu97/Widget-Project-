export type GoalCategory = 'Health & fitness' | 'Education' | 'Finance' | 'Personal development' | 'Work' | 'Other';
export type GoalRecurrence = 'daily' | 'specific_weekdays' | 'one_time';

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  icon: string;
  emoji?: string;
  color?: string;
  recurrenceType: GoalRecurrence;
  weekdays?: number[];
  dueDate?: string;
  targetValue?: number;
  targetUnit?: string;
  sortOrder: number;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  completedToday?: boolean;
}

export interface DailySummary {
  date: string;
  completed: number;
  total: number;
  percent: number | null;
  allDone: boolean;
  remaining: number;
  goals: Array<{ id: string; title: string; emoji?: string; completed: boolean; sortOrder: number }>;
}

export interface Profile {
  id: string;
  locale: 'fr-CA' | 'en';
  weekStart: 0 | 1;
  timezone: string;
  streakThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface GoalCompletion {
  id: string;
  goalId: string;
  userId: string;
  localDate: string;
  isCompleted: boolean;
  progressValue: number;
  completedAt?: string;
  timezone: string;
  source: 'app' | 'api';
  updatedAt: string;
}
