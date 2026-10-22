export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function computePercent(completed: number, total: number): number | null {
  if (total === 0) return null;
  return Math.round((completed / total) * 100);
}

export function getWeekStart(date: Date, weekStart: 0 | 1 = 1): Date {
  const next = new Date(date);
  const day = next.getDay();
  const diff = (day - weekStart + 7) % 7;
  next.setDate(next.getDate() - diff);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function getWeekDates(date: Date, weekStart: 0 | 1 = 1): Date[] {
  const start = getWeekStart(date, weekStart);
  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(start);
    next.setDate(start.getDate() + index);
    return next;
  });
}

export function getDayKeyForTZ(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

export function getStreak(days: Array<{ date: string; completed: number; total: number }>, threshold = 100): number {
  let streak = 0;
  const ordered = [...days].sort((a, b) => a.date.localeCompare(b.date));

  for (let index = ordered.length - 1; index >= 0; index -= 1) {
    const item = ordered[index];
    const percent = item.total === 0 ? null : computePercent(item.completed, item.total);

    if (percent === null) continue;
    if (percent >= threshold) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

export function getCurrentDateLabel(date: Date, locale = 'fr-CA'): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getGreeting(hour: number, locale = 'fr-CA'): string {
  const greetings = locale.startsWith('fr')
    ? ['Bonjour', 'Bon après-midi', 'Bonsoir']
    : ['Good morning', 'Good afternoon', 'Good evening'];

  if (hour < 12) return greetings[0];
  if (hour < 18) return greetings[1];
  return greetings[2];
}
