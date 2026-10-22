# Daily Goals Tracker

This repository is the Phase 2 scaffold for the Daily Goals Tracker project.

## Phase 2 status

- Supabase dependency added for future project data integration.
- Supabase client helper created for optional remote backend access.
- Local fallback storage implemented with browser storage as the default backend.
- Repository abstraction added to switch between local and Supabase sources without changing the app logic.
- Database migration starter included for the project schema.

## Local development

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Run tests:
   npm test
4. Build the app:
   npm run build

## Data layer design

The application supports two interchangeable backends:

- Local fallback: `src/data/localStore.ts`
- Optional remote backend: `src/data/supabaseData.ts`

The repository layer in `src/data/repository.ts` keeps the app logic stable regardless of which backend is active.

## Supabase setup

1. Create a Supabase project.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your environment.
3. Apply the migration in `supabase/migrations/001_initial_schema.sql`.
4. Keep the service-role key only in server-side environment variables.

## Important note

This phase adds the data-layer foundation and migration scaffold. The full widget API, PWA, and daily goal logic will be implemented in subsequent phases.
