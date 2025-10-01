# Copilot Instructions for vfb05-koeln

## Project Architecture

- **Framework:** Next.js 14+ using `/app` directory and App Router. Bootstrapped with `create-next-app`.
- **Routing:** Organized by route groups: `(auth)`, `(protected)`, `(public)`. Parentheses indicate grouping, not URL path. Example: `app/(protected)/dashboard/page.tsx` is `/dashboard` (protected).
- **API Routes:** Colocated under `app/api/`, e.g., `app/api/auth/[...nextauth]/route.ts` for authentication endpoints.
- **Database:** MongoDB via Mongoose. Always use `lib/dbConnect.ts` for DB access. Credentials/secrets in `.env.local`.
- **Components:** Shared React components in `components/`, grouped by feature (e.g., `auth/`, `layout/`, `ui/`).
- **Models:** Mongoose schemas in `models/` (e.g., `models/User.ts`).
- **Assets:** SVGs and images in `public/`.

## Key Patterns & Conventions

- **Authentication:**
  - Auth pages: `app/(auth)/login/page.tsx`
  - Auth API: `app/api/auth/[...nextauth]/route.ts`
  - Use `AuthProvider` from `components/providers/AuthProvider.tsx` for context.
- **Protected Routes:** Place authenticated-only pages under `app/(protected)/`. Use `ProtectedNav` for navigation.
- **Public Pages:** Under `app/(public)/` (e.g., `news`, `teams`, `verein`).
- **Global Styles:** Defined in `app/globals.css`. Uses Tailwind (`tailwind.config.ts`).
- **SVG Usage:** Reference assets from `public/` in components/pages.
- **Data Mocking:** Use `lib/mock-data.ts` for local development/testing data.

## Developer Workflows

- **Start Dev Server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (config: `eslint.config.mjs`)
- **Type Check:** `tsc --noEmit` (config: `tsconfig.json`)
- **Seed Database:** Run `scripts/seed.ts` for initial data (see script for usage).
- **Environment Variables:** Set secrets/DB URI in `.env.local` (see example in repo).

## Integration Points

- **Fonts:** Uses `next/font` for font optimization (see `README.md`).
- **Database:** Always import from `lib/dbConnect.ts` for MongoDB access.
- **External Services:** No explicit third-party integrations; check `lib/` for custom logic.

## Examples & How-Tos

- **Add Protected Page:**
  1. Create folder under `app/(protected)/` (e.g., `app/(protected)/statistiken/`).
  2. Add `page.tsx`.
- **Add API Route:**
  1. Add file under `app/api/` (e.g., `app/api/example/route.ts`).
- **Connect to DB:**
  1. `import dbConnect from '../../lib/dbConnect'`
- **Use Auth Context:**
  1. Wrap components/pages with `AuthProvider`.

## Additional Notes

- Follow Next.js and TypeScript best practices unless overridden here.
- Prefer colocating logic with relevant route or feature group.
- For new features, mimic existing folder/component structure for consistency.
