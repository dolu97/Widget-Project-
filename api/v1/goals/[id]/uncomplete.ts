export default function handler(req: any, res: any) {
  const payload = {
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
  };

  if (req.query.format === 'text') {
    res.status(200).send(payload.summary);
    return;
  }

  res.status(200).json(payload);
}
