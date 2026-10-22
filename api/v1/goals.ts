export default function handler(req: any, res: any) {
  const payload = {
    date: '2025-10-22',
    dateLabel: 'mercredi 22 octobre',
    percent: 60,
    completed: 3,
    total: 5,
    remaining: 2,
    allDone: false,
    message: 'Encore un peu !',
    goals: [
      { id: 'goal-gym', title: 'Gym', emoji: '💪', completed: true, sortOrder: 0 },
      { id: 'goal-reading', title: 'Reading', emoji: '📚', completed: false, sortOrder: 1 },
      { id: 'goal-learning', title: 'Learning', emoji: '🧠', completed: true, sortOrder: 2 },
      { id: 'goal-planning', title: 'Planning', emoji: '📝', completed: false, sortOrder: 3 },
    ],
  };

  if (req.query.format === 'text') {
    res.status(200).send(`${payload.completed}/${payload.total} — ${payload.percent}%`);
    return;
  }

  res.status(200).json(payload);
}
