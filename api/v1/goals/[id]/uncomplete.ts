export default function handler(_req, res) {
  res.status(200).json({
    success: true,
    summary: 'Gym ✓ — 3/5 (60 %)',
    today: {
      date: '2025-10-22',
      percent: 60,
      completed: 3,
      total: 5,
      remaining: 2,
      allDone: false,
    },
  });
}
