export default function handler(_req, res) {
  res.status(200).json({
    date: '2025-10-22',
    dateLabel: 'mercredi 22 octobre',
    percent: 60,
    completed: 3,
    total: 5,
    remaining: 2,
    allDone: false,
    message: 'Encore un peu !',
    goals: [
      { id: 'gym', title: 'Gym', emoji: '💪', completed: true, sortOrder: 0 },
      { id: 'reading', title: 'Reading', emoji: '📚', completed: false, sortOrder: 1 },
      { id: 'learning', title: 'Learning', emoji: '🧠', completed: true, sortOrder: 2 },
    ],
  });
}
