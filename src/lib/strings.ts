export async function fetchToday() {
  const response = await fetch('/api/v1/today');
  if (!response.ok) throw new Error('Failed to fetch today');
  return response.json();
}

export async function toggleGoal(id: string) {
  const response = await fetch(`/api/v1/goals/${id}/complete`, { method: 'POST' });
  if (!response.ok) throw new Error('Failed to toggle goal');
  return response.json();
}

export function formatToken(token: string) {
  return token.length <= 8 ? token : `${token.slice(0, 6)}…`;
}
