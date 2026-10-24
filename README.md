# FIB MDT – Cloudflare Pages migration (Phase 1)

This package begins the migration of the existing FIB MDT frontend to Cloudflare Pages + Pages Functions while retaining Supabase as the database.

## Included
- Existing `Index_SessionSync_current_patched.html` copied to `public/index.html`; its existing callback chains are routed through `CloudApi.run`.
- Existing Agents, System, Patrols and Records HTML fragments copied into `public/pages/`; navigation targets without a supplied source file get explicit placeholder pages so initial navigation does not fail.
- Pages Functions for login, account request, session validation, permissions, logout, password change and authenticated page-fragment loading.
- Supabase session table migration SQL.
- Notification fallback to replace the unavailable Apps Script HTML include.

## Important before deployment
1. Run `supabase/migration_sessions.sql` in the Supabase SQL Editor.
2. Set `SUPABASE_URL` and the server-only `SUPABASE_SECRET_KEY` in Cloudflare Pages > Settings > Variables and Secrets for both Preview and Production.
3. Do not expose the Supabase secret key in frontend JavaScript, HTML, git, or `wrangler.toml`.
4. Deploy with `npm install -D wrangler`, then `npm run dev` for local preview or `npm run deploy` after linking the Pages project.

## Known scope boundaries
This is the first migration slice, not a claim that every MDT server function is already ported. The original modules still call many Apps Script functions for records, patrols, wanted lists, system administration and profile images. Those require dedicated API endpoints before those actions can be used in production. Profile image endpoints currently return an explicit 501 response pending the Google Drive → R2 migration. The public shared-record endpoint also needs its original share-token lookup ported before public links are re-enabled.

## Security / compatibility notes
- Sessions are random 256-bit bearer tokens; only SHA-256 token hashes are stored in Supabase.
- Session duration is 8 hours, matching the existing app setting.
- Password verification uses the current database convention: SHA-256 of `salt + password`, so existing accounts remain compatible.
- New account requests are inserted as inactive and unapproved, matching the current approval workflow.
- The API currently resolves rank permissions by matching `users.rank` to `ranks.name` or `ranks.id`. Verify your actual data convention and adjust if needed.
- A production hardening pass should add rate limiting for login/register, tighter generic error messages, and a scheduled session cleanup job.
