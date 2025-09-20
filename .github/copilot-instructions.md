# Copilot Instructions for vfb05-koeln

## Project Overview

- This is a Next.js 14+ project using the `/app` directory structure, bootstrapped with `create-next-app`.
- The app is organized by route groups: `(auth)`, `(protected)`, and `(public)`, each with their own subroutes (e.g., `/login`, `/dashboard`, `/news`, `/teams`).
- API routes are colocated under `app/api/`.
- Database connection logic is in `lib/dbConnect.ts`.

## Key Patterns & Conventions

- **Routing:** Uses Next.js App Router. Route groups are named with parentheses, e.g., `(auth)`, and are not part of the URL path.
- **Authentication:** Auth logic is in `app/(auth)/login/` and `app/api/auth/`. Use these as entry points for auth-related features.
- **Protected Routes:** Place authenticated-only pages under `app/(protected)/`.
- **Public Content:** Public-facing pages are under `app/(public)/`.
- **Global Styles:** Defined in `app/globals.css`.
- **SVG Assets:** Stored in `public/`.
- **Database:** Use `lib/dbConnect.ts` for MongoDB connection logic. Always import from this file for DB access.

## Developer Workflows

- **Start Dev Server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (uses `eslint.config.mjs`)
- **Type Checking:** `tsc --noEmit` (uses `tsconfig.json`)
- **Config Files:**
  - ESLint: `eslint.config.mjs`
  - TypeScript: `tsconfig.json`
  - PostCSS: `postcss.config.mjs`
  - Next.js: `next.config.ts`

## Integration Points

- **Fonts:** Uses `next/font` for font optimization (see `README.md`).
- **External Services:** No explicit integrations found; check `lib/` for custom logic.

## Examples

- To add a new protected page: create a folder under `app/(protected)/` and add a `page.tsx`.
- To add a new API route: add a file under `app/api/` (e.g., `app/api/example/route.ts`).
- To connect to the database: `import dbConnect from '../lib/dbConnect'`.

## Additional Notes

- Follow Next.js and TypeScript best practices unless a local convention is documented here.
- For new patterns, prefer colocating logic with the relevant route or feature group.
