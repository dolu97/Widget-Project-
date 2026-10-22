export default function handler(req: any, res: any) {
  const goals = [
    { id: 'goal-gym', title: 'Gym', completed: true },
    { id: 'goal-reading', title: 'Reading', completed: false },
    { id: 'goal-learning', title: 'Learning', completed: false },
  ];

  if (req.query.status === 'pending') {
    res.status(200).json(goals.filter((goal) => !goal.completed));
    return;
  }

  res.status(200).json(goals);
}
