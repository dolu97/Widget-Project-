export default function handler(req: any, res: any) {
  res.status(200).json({
    averagePercent: 72,
    currentStreak: 8,
    comparison: 8,
    totalGoalsCompleted: 53,
    perfectDays: 12,
  });
}
