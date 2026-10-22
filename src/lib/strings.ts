export async function fetchToday(): Promise<any> {
  const response = await fetch('/api/v1/today');
  return response.json();
}

export async function toggleGoal(id: string): Promise<any> {
  const response = await fetch(`/api/v1/goals/${id}/toggle`, { method: 'POST' });
  return response.json();
}

export async function exportCsv(): Promise<void> {
  const data = await fetch('/api/v1/today');
  const payload = await data.json();
  const csv = ['date,goal,completed', ...payload.goals.map((goal: any) => `${payload.date},${goal.title},${goal.completed ? 'yes' : 'no'}`)].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'daily-goals.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}

export function formatToken(token: string): string {
  return token.slice(0, 6) + '…';
}
