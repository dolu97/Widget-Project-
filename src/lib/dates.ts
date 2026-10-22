import { useMemo, useState } from 'react';
import { BookOpen, Check, Dumbbell, Plus, Sparkles } from 'lucide-react';
import { computePercent, getCurrentDateLabel, getGreeting, toLocalDateKey } from './lib/dates';

const initialGoals = [
  { id: 'gym', title: 'Gym', category: 'Health & fitness', icon: 'dumbbell', completed: true },
  { id: 'reading', title: 'Reading', category: 'Personal development', icon: 'book-open', completed: false },
  { id: 'planning', title: 'Planning', category: 'Work', icon: 'sparkles', completed: false },
];

export default function App() {
  const [goals, setGoals] = useState(initialGoals);
  const [newGoal, setNewGoal] = useState('');
  const [locale, setLocale] = useState<'fr-CA' | 'en'>('fr-CA');

  const completed = goals.filter((goal) => goal.completed).length;
  const total = goals.length;
  const percent = computePercent(completed, total) ?? 0;

  const todayLabel = useMemo(() => getCurrentDateLabel(new Date(), locale), [locale]);

  const toggleGoal = (id: string) => {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  const addGoal = () => {
    const value = newGoal.trim();
    if (!value) return;

    setGoals((current) => [
      ...current,
      {
        id: `${value.toLowerCase().replace(/\s+/g, '-')}-${toLocalDateKey(new Date())}`,
        title: value,
        category: 'Other',
        icon: 'sparkles',
        completed: false,
      },
    ]);
    setNewGoal('');
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Daily Goals</p>
            <h1 className="mt-2 text-3xl font-bold">{getGreeting(new Date().getHours(), locale)}</h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as 'fr-CA' | 'en')}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none"
            >
              <option value="fr-CA">Français</option>
              <option value="en">English</option>
            </select>
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-soft">
              Export Excel
            </button>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
          <div className="card p-5">
            <p className="text-sm text-slate-400">{todayLabel}</p>
            <div className="relative mt-4 flex items-center justify-center">
              <svg width="180" height="180" viewBox="0 0 120 120" className="progress-ring">
                <circle cx="60" cy="60" r="48" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#7c9cff"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={301.59}
                  strokeDashoffset={301.59 - (301.59 * percent) / 100}
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-4xl font-bold">{percent}%</div>
                <div className="text-xs text-slate-400">{completed}/{total}</div>
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-slate-800/60 px-3 py-2">
                <span className="text-slate-300">Completed</span>
                <strong>{completed}/{total}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-800/60 px-3 py-2">
                <span className="text-slate-300">Streak</span>
                <strong>8 days</strong>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Today’s checklist</h2>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Plus size={16} />
                  <span>Add goal</span>
                </div>
              </div>

              <div className="space-y-3">
                {goals.map((goal) => {
                  const Icon =
                    goal.icon === 'dumbbell'
                      ? Dumbbell
                      : goal.icon === 'book-open'
                        ? BookOpen
                        : Sparkles;

                  return (
                    <div
                      key={goal.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleGoal(goal.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-primary"
                          aria-label={`Toggle ${goal.title}`}
                        >
                          {goal.completed ? <Check size={18} /> : <span className="block h-3 w-3 rounded-full border-2 border-slate-300" />}
                        </button>
                        <div>
                          <div className="flex items-center gap-2 font-medium text-slate-100">
                            <Icon size={16} />
                            <span>{goal.title}</span>
                          </div>
                          <div className="text-xs text-slate-400">{goal.category}</div>
                        </div>
                      </div>
                  
                      <span className="text-xs font-medium text-slate-300">{goal.completed ? 'Done' : 'Open'}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex gap-2">
                <input
                  value={newGoal}
                  onChange={(event) => setNewGoal(event.target.value)}
                  placeholder="Add a goal..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={addGoal}
                  className="rounded-xl bg-primary px-4 py-2 font-medium text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <aside className="card p-5">
            <h2 className="mb-4 text-lg font-semibold">iPhone widgets</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p>Scriptable shows today’s progress and goal list.</p>
              <p>Shortcuts complete a goal from the home screen without opening the app.</p>
              <p className="rounded-xl border border-dashed border-slate-600 bg-slate-800/60 p-3 text-xs text-slate-400">
                Important: a website or PWA cannot create a native iOS widget. Scriptable and Shortcuts are still required.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
