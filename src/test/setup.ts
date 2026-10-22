import { describe, expect, it } from 'vitest';
import {
  computePercent,
  getCurrentDateLabel,
  getDayKeyForTZ,
  getGreeting,
  getStreak,
  getWeekDates,
  toLocalDateKey,
} from './dates';

describe('date helpers', () => {
  it('creates a local date key', () => {
    expect(toLocalDateKey(new Date('2025-03-09T12:00:00Z'))).toBe('2025-03-09');
  });

  it('handles DST transitions in Toronto', () => {
    const beforeSpring = new Date('2025-03-09T05:30:00Z');
    const afterSpring = new Date('2025-03-09T07:30:00Z');
    const beforeFall = new Date('2025-11-02T05:30:00Z');
    const afterFall = new Date('2025-11-02T06:30:00Z');

    expect(getDayKeyForTZ(beforeSpring, 'America/Toronto')).toBe('2025-03-09');
    expect(getDayKeyForTZ(afterSpring, 'America/Toronto')).toBe('2025-03-09');
    expect(getDayKeyForTZ(beforeFall, 'America/Toronto')).toBe('2025-11-02');
    expect(getDayKeyForTZ(afterFall, 'America/Toronto')).toBe('2025-11-02');
  });

  it('rounds percentage correctly', () => {
    expect(computePercent(3, 8)).toBe(38);
    expect(computePercent(0, 0)).toBeNull();
  });

  it('builds week dates with Monday start', () => {
    const dates = getWeekDates(new Date('2025-03-09T12:00:00Z'), 1);
    expect(dates[0].getDate()).toBe(3);
    expect(dates[6].getDate()).toBe(9);
  });

  it('computes streaks', () => {
    const days = [
      { date: '2025-03-01', completed: 5, total: 5 },
      { date: '2025-03-02', completed: 4, total: 5 },
      { date: '2025-03-03', completed: 3, total: 5 },
    ];
    expect(getStreak(days, 100)).toBe(0);
    expect(getStreak(days, 80)).toBe(3);
  });

  it('formats locale labels and greetings', () => {
    expect(getCurrentDateLabel(new Date('2025-10-22T12:00:00Z'), 'fr-CA')).toContain('22');
    expect(getGreeting(9, 'fr-CA')).toBe('Bonjour');
    expect(getGreeting(13, 'en')).toBe('Good afternoon');
  });
});
