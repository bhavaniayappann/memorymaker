## MemoryMaker

MemoryMaker is a small Next.js app that turns your relationship photos into an interactive, drag‑and‑drop timeline game you can share with someone special.

You sign up, create a \"timeline puzzle\" by uploading 3–10 photos with dates and captions, then share a link or code so your partner can play by arranging the memories in the correct order.

---

## Tech stack

- Next.js (App Router, TypeScript)
- React
- Tailwind CSS
- Supabase (auth, Postgres, and storage for photos)

---

## Environment setup

Create a `.env.local` file in the project root with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these in the Supabase dashboard under **Project Settings → API**.

The database tables expected by this app include:

- `timeline_puzzles`
- `timeline_photos`
- `game_sessions`

There is a helper page at `/test-db` that can be used during development to verify connectivity and basic schema.

---

## Running the app locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Main routes

- `/` – Landing page and marketing site.
- `/auth/signup` – Create an account.
- `/auth/signin` – Sign in to your account.
- `/create` – Create a new timeline puzzle (authenticated).
- `/puzzle/[shareCode]` – Public page to preview and play a shared puzzle.
- `/test-db` – Development-only database connectivity check.

---

## Typical flow

1. Visit `/auth/signup`, create an account, and you will be redirected to `/create`.
2. On `/create`, give your puzzle a title and optional description, then upload 3–10 photos and assign each a date (and optional caption).
3. Click **Create Puzzle** to save it. You’ll see a success message with a share code and a button to open the puzzle.
4. Share the puzzle link or code with your partner. When they visit `/puzzle/[shareCode]`, they can play the drag‑and‑drop timeline game.

---

## Deployment

MemoryMaker is a standard Next.js app and can be deployed to platforms like Vercel. Make sure your production environment has the same Supabase environment variables configured as in `.env.local`.
