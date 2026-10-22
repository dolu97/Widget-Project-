export default function handler(_req, res) {
  res.status(200).json([
    { id: 'gym', title: 'Gym', completed: true },
    { id: 'reading', title: 'Reading', completed: false },
    { id: 'learning', title: 'Learning', completed: true },
  ]);
}
