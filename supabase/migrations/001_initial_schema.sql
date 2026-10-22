# Daily Goals Tracker

A minimalist daily goals tracker built with React + TypeScript, Vite, Tailwind CSS, and a browser-first local data layer with Supabase-ready modeling. This repository includes a PWA shell, Scriptable widget script, and the data model for widget API + Shortcuts integration.

## Overview

This project is designed to support:

- daily recurring goal tracking
- one-time goals with due dates
- progress percent and checklist management
- weekly, monthly and yearly summaries
- iPhone widget integration via Scriptable + Shortcuts
- export to Excel
- local-only fallback mode and optional Supabase backend

## Prerequisites

- Node.js 18+
- npm 10+
- optional: Supabase project
- optional: Vercel account
- optional: iPhone + Scriptable + Shortcuts app

## Installation

1. Install dependencies:

   npm install

2. Copy environment variables:

   cp .env.example .env.local

3. Start the app:

   npm run dev

4. Run tests:

   npm test

5. Build:

   npm run build

## Environment variables

See `.env.example`.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL`
- `VITE_I18N_DEFAULT_LOCALE`

## Supabase setup

1. Create a Supabase project.
2. Enable email auth or Sign in with Apple.
3. Apply all migrations in `supabase/migrations/`.
4. Add the service role key only in Vercel environment variables, never in frontend code.
5. In local-only mode, the app will work without Supabase credentials via IndexedDB and localStorage fallback.

## Vercel deployment

1. Import the project into Vercel.
2. Set the project root and framework to Vite.
3. Add the same env vars used by the app and serverless API.
4. Ensure `/api/*` is routed as serverless functions in the deployment settings.

## iPhone setup (French and English)

### 1. Install the PWA

- Open the app in Safari.
- Tap Share.
- Tap Add to Home Screen.

### 2. Generate an API token

- In Settings → iPhone widgets.
- Create a token, copy it once, and store it safely.
- The token is hashed before storage and is never exposed in client-side code.

### 3. Install Scriptable

- Install Scriptable from the App Store.
- Add `widgets/scriptable/daily-goals-widget.js`.
- Run it once to save the app URL and API token via Scriptable Keychain.
- Add the Scriptable widget to the home screen.

### 4. Create the Shortcuts

Use the instructions in the app’s Settings page to build:

- one shortcut per goal, using `POST /api/v1/goals/{id}/complete?format=text`
- one Daily Goals menu shortcut populated from `GET /api/v1/goals?status=pending`

### 5. Enable app icon badge

- Ensure the installed PWA is allowed to badge the icon.
- iOS may require a popup permission explanation before it can display a badge.

## Streak rules

- A day is successful if completion is at or above the configured threshold (default: 100%).
- Days without scheduled goals are skipped.
- Today does not break the streak until the day is over.
- Current streak and longest streak are calculated from completed days only.

## Security notes

- API tokens are used as `Authorization: Bearer <token>`.
- Only the hash of the token is stored.
- Tokens can be revoked by the user in Settings.
- A lost token should be revoked immediately.

## Known limitations

- A normal website or PWA cannot create a native iOS widget.
- Native widget behavior and badge behavior are limited by Apple’s platform rules.
- The project uses Scriptable + Shortcuts as the supported home screen integration approach.

## Scripts

- `npm run dev` — local development server
- `npm run build` — production build
- `npm test` — runs Vitest tests

## License

MIT
