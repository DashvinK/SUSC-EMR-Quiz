# SUSC EMR — "What Department Suits You"

A two-sided recruitment site for SUSC's Executive Member Recruitment (EMR):

- **Quiz** — a weighted personality quiz (Quick = 10 questions, Thorough = 15) that matches
  a visitor to their **top 2** of 8 SUSC departments.
- **Departments** — a directory plus a page per department with descriptions and event photos.

Built with React 18 + Vite + Tailwind + React Router. Deploys to Vercel with a single serverless
route (`/api/submit-result`) that appends each submission as a row to a Google Sheet.

## Local development

```bash
npm install
npm run dev
```

The app runs at the URL Vite prints (default http://localhost:5173).

### The `/api/submit-result` route locally

In production this is a Vercel serverless function. For local dev, `vite.config.js` mounts the same
handler as dev middleware, so the full submit flow works under `npm run dev` — no `vercel dev`
needed. It reads credentials from `.env.local` (below). Without those, the quiz still works end to
end and submission fails silently by design (see §9 of the build plan); the endpoint returns `502`.

Before deploying, validate your Google setup:

```bash
npm run check:sheets
```

This authenticates with your service account, confirms it can reach the Sheet, and prints the tab
names — catching the usual mistakes (wrong Sheet ID, Sheet not shared with the service account,
malformed key) with a clear message. It only reads metadata; it never writes to your Sheet.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values (see the build plan §2 for the
one-time Google Cloud setup):

| Variable | Source |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | service account JSON |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | service account JSON (newlines escaped as `\n`) |
| `GOOGLE_SHEET_ID` | target spreadsheet's URL |

Set the same three variables in **Vercel → Project → Settings → Environment Variables** before deploying.

The destination Sheet's header row should be:

```
timestamp | qr_source | quiz_length | dept_1 | dept_2 | score_breakdown | name | student_id
```

## QR source tracking

Append `?src=<placement>` to any link (e.g. `?src=poster-lobby`). The value is captured on load,
persisted for the visit, and recorded with the submission. No param defaults to `direct`.

## Project structure

See `build-plan.md` for the full spec. Key directories:

- `src/data/` — department and question data
- `src/lib/` — scoring engine and share-card helper
- `src/pages/` — one component per route
- `src/components/` — shared UI
- `api/` — the Vercel serverless function

## Deploy

Push to a Vercel-connected Git repo (or `vercel --prod`). Vercel serves the Vite build and the
`api/` function together. After deploy, set the environment variables and run one end-to-end test
submission to confirm the Sheet receives rows.
