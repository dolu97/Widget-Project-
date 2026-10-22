import { describe, expect, it } from 'vitest';
import { computePercent, getCurrentDateLabel, getDayKeyForTZ, getStreak, getWeekDates, toLocalDateKey } from './dates';

describe('date helpers', () => {
  it('creates a YYYY-MM-DD key in local time', () => {
    expect(toLocalDateKey(new Date('2025-03-09T12:00:00'))).toBe('2025-03-09');
  });

  it('handles DST transitions in Toronto', () => {
    const beforeSpring = new Date('2025-03-09T00:30:00');
    const afterSpring = new Date('2025-03-09T03:30:00');
    expect(getDayKeyForTZ(beforeSpring, 'America/Toronto')).toBe('2025-03-08');
    expect(getDayKeyForTZ(afterSpring, 'America/Toronto')).toBe('2025-03-09');
  });

  it('rounds percentage correctly', () => {
    expect(computePercent(3, 8)).toBe(38);
    expect(computePercent(0, 0)).toBeNull();
  });

  it('builds a week with Monday as start', () => {
    const week = getWeekDates(new Date('2025-03-09T12:00:00'), 1);
    expect(week[0].getDate()).toBe(3);
    expect(week[6].getDate()).toBe(9);
  });

  it('computes streaks with a threshold', () => {
    const days = [
      { date: '2025-03-01', completed: 5, total: 5 },
      { date: '2025-03-02', completed: 4, total: 5 },
      { date: '2025-03-03', completed: 3, total: 5 },
    ];
    expect(getStreak(days, 100)).toBe(0);
    expect(getStreak(days, 80)).toBe(3);
  });

  it('formats current date label in locale', () => {
    expect(getCurrentDateLabel(new Date('2025-10-22T12:00:00'), 'fr-CA')).toContain('22');
  });
});
