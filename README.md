# Next.js + Better Auth + Turso Starter

This boilerplate now includes:

- `better-auth` for authentication
- `drizzle-orm` for typed DB access
- Turso/libSQL for local (`file:./dev.db`) and production databases

## 1) Install dependencies

```bash
pnpm install
```

## 2) Configure environment variables

If this is a fresh clone, copy `.env.example` to `.env.local`.
If you already have `.env.local`, merge in the auth/database variables instead of overwriting it.

```bash
cp .env.example .env.local
```

Required variables:

- `BETTER_AUTH_URL` - your app URL (`http://localhost:3000` in development)
- `BETTER_AUTH_SECRET` - random long secret
- `TURSO_DATABASE_URL` - local file in dev (`file:./dev.db`) or Turso URL in production
- `TURSO_AUTH_TOKEN` - blank for local file DB, required for Turso remote DB

## 3) Generate auth schema + migrate tables

```bash
pnpm db:setup
```

This runs:

- `pnpm auth:generate` to generate Better Auth schema at `lib/db/schema.ts`
- `pnpm db:generate` to generate SQL migrations
- `pnpm db:migrate` to apply migrations to the configured DB

## 4) Start dev server

```bash
pnpm dev
```

Open `http://localhost:3000` and use the auth card on the homepage.
For reliable cookie/session behavior, keep `BETTER_AUTH_URL` and your browser URL on the same host (for example both `localhost`).

## Project files

- `lib/auth.ts` - Better Auth server config
- `lib/auth-client.ts` - Better Auth React client
- `lib/db.ts` - Drizzle + libSQL client
- `app/api/auth/[...all]/route.ts` - Better Auth API handler
- `drizzle.config.ts` - Drizzle kit config

## Turso production setup (CLI)

```bash
turso auth signup
turso db create my-app-prod
turso db show my-app-prod --url
turso db tokens create my-app-prod
```

Set production env vars with these values:

- `TURSO_DATABASE_URL=libsql://...`
- `TURSO_AUTH_TOKEN=...`
- `BETTER_AUTH_URL=https://your-domain.com`
- `BETTER_AUTH_SECRET=<strong-random-secret>`

## Vercel deployment (CLI)

```bash
vercel
vercel --prod
```

Set env vars in Vercel once, then deploy from CLI or CI.

## Automation examples

- DB setup in CI: `pnpm db:setup`
- Production deploy: `vercel --prod`

This gives you local-first DX and a straightforward path to production.
