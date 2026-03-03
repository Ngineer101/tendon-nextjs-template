# Next.js + Better Auth + Turso Starter

This guide is for AI agents and humans using this repository as a SaaS/product starter.

## Purpose

Use this repo to ship quickly with clean defaults, then opt into extra capabilities only when your product needs them.

## Current Stack Snapshot

- Runtime/build: Next.js + React + TypeScript with vinext (`pnpm dev`, `pnpm build`)
- UI: Tailwind CSS v4 + shared primitives in `components/ui/*`
- Auth: Better Auth (`lib/auth.ts`, `app/api/auth/[...all]/route.ts`)
- Database: SQLite/libSQL via Turso driver (`lib/db.ts`)
- ORM/migrations: Drizzle ORM + Drizzle Kit (`lib/db/schema.ts`, `drizzle/*`)

## How to Use This Boilerplate

Treat features as modules. Start minimal, add only what is needed.

- Landing page only: customize `app/page.tsx` and keep everything else untouched.
- App with auth: keep Better Auth wiring, add sign-in/up UI and protected routes.
- App with data: add domain tables/migrations and server-side queries/mutations.
- Email: add provider adapter only when transactional email is needed.
- Billing: add Stripe only when charging users is needed.

## Ground Rules for Contributors

1. Keep changes small and reversible.
2. Prefer existing patterns over new abstractions.
3. Avoid speculative infrastructure.
4. Update docs whenever setup or behavior changes.
5. Never commit secrets.

## Repo Map

- `app/`: routes, layouts, pages, API endpoints
- `app/api/auth/[...all]/route.ts`: Better Auth handler
- `lib/auth.ts`: Better Auth server config
- `lib/auth-client.ts`: Better Auth client helper
- `lib/db.ts`: Drizzle database client
- `lib/db/schema.ts`: Drizzle schema source of truth
- `drizzle/`: generated SQL migrations
- `components/ui/`: reusable UI components
- `.env.example`: baseline env vars for enabled features

## Architecture Conventions

### Feature-first layout

For new product features, prefer:

- `features/<feature>/server/*` for server logic
- `features/<feature>/schema/*` for zod/input schemas
- `features/<feature>/ui/*` for UI components

Only move code to `lib/*` when reused by multiple features.

### Server-first data and auth

- Keep DB access in server contexts.
- Keep auth checks near mutations and protected reads.
- Keep client components focused on presentation and interaction.

### Typed boundaries

- Validate external inputs (forms, params, webhooks) with `zod`.
- Reuse schemas/types instead of redefining shapes.

## Optional Feature Policy

- Do not require env vars for capabilities that are not enabled.
- When adding a capability, document exactly which env vars become required.
- Keep fallback/local behavior where possible.

When adding env vars:

1. Add placeholders to `.env.example`.
2. Mark each var as required or optional for a specific capability.
3. Document setup in `README.md` and/or `architecture.md`.

## Database and Migration Rules

- Treat `lib/db/schema.ts` as schema source of truth.
- After schema changes: run `pnpm db:generate` then `pnpm db:migrate`.
- Keep migrations focused and named clearly.

## Done Criteria for Changes

- Smallest intended user flow works end-to-end.
- Lint/build checks pass for touched areas (or limitations are documented).
- Docs are updated for any setup or architecture impact.

## If You Hit an Undecided Architecture Choice

- Add a thin interface first (do not hard-couple too early).
- Choose the simplest default that can be swapped later.
