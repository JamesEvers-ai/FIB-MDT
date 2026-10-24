# FIB MDT – Cloudflare Pages Migration (Phase 2)

## Deployment
- Cloudflare Pages project; repository root is this directory.
- No compilation step is needed; for a Pages deployment leave the build command blank and use `public` as output directory. For Workers Builds using a custom deploy command, use `npx wrangler pages deploy public --project-name=fib-mdt`.
- Build output directory: `public`.
- Pages Functions live in `functions/`; they must remain at repository root.
- Add `SUPABASE_URL` and `SUPABASE_SECRET_KEY` as encrypted Production and Preview variables. Never put the secret in `public/`.
- Run `supabase/migration_sessions.sql` in Supabase SQL Editor.

## API smoke test
Open `/api/health`; expected JSON includes `ok: true`. Then test login, page loading, and each module with a test account.

## Important
This phase replaces the page placeholders with the original page HTML available in the supplied RAR and adds a server API adapter for the core auth, personnel, patrol, records, wanted, classification, system, fines, lawyers and warrants calls. It has not been tested against the user's live Supabase project. Table/column names must match the existing schema. Profile-image storage, external share-token flows and some legacy calls are still explicitly reported as not migrated rather than silently succeeding. Do not switch production until the smoke tests pass.
