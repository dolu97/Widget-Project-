export function summariseGoals(goals: Array<{ completedToday?: boolean; title: string }>): string {
  const total = goals.length;
  const done = goals.filter((goal) => goal.completedToday).length;
  return `${done}/${total} completed`;
}
