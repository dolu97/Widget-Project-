export default function handler(_req, res) {
  const date = new Date();
  const goals = [
    { id: 'gym', title: 'Gym', emoji: '💪', completed: true, sortOrder: 0 },
    { id: 'reading', title: 'Reading', emoji: '📚', completed: false, sortOrder: 1 },
    { id: 'learning', title: 'Learning', emoji: '🧠', completed: true, sortOrder: 2 },
    { id: 'walk', title: 'Walk', emoji: '🚶', completed: false, sortOrder: 3 },
  ];

  const completed = goals.filter((goal) => goal.completed).length;
  const percent = Math.round((completed / goals.length) * 100);

  res.status(200).json({
    date: date.toISOString().slice(0, 10),
    dateLabel: date.toLocaleDateString('fr-CA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    percent,
    completed,
    total: goals.length,
    remaining: goals.length - completed,
    allDone: completed === goals.length,
    message: percent >= 50 ? 'Bon travail !' : 'Encore un peu !',
    goals,
  });
}
