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
  const output = new Date(date);
  const day = output.getDay();
  const diff = (day - weekStart + 7) % 7;
  output.setDate(output.getDate() - diff);
  output.setHours(0, 0, 0, 0);
  return output;
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
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

export function getStreak(days: Array<{ date: string; completed: number; total: number }>, threshold = 100): number {
  let streak = 0;
  const ordered = [...days].sort((a, b) => a.date.localeCompare(b.date));

  for (let i = ordered.length - 1; i >= 0; i--) {
    const item = ordered[i];
    const percent = item.total === 0 ? null : Math.round((item.completed / item.total) * 100);
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
  const phrases = locale.startsWith('fr')
    ? ['Bonjour', 'Bon après-midi', 'Bonsoir']
    : ['Good morning', 'Good afternoon', 'Good evening'];

  if (hour < 12) return phrases[0];
  if (hour < 18) return phrases[1];
  return phrases[2];
}
