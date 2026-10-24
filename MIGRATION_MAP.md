# Migration map – Phase 2

- `public/index.html`: latest patched shell; notification include replaced; Cloud API adapter loaded.
- `public/pages/`: latest provided Agents/System/Patrols/Records pages plus original Dashboard/Classifications/Fines/Lawyers/Wanted/Warrants pages extracted from the supplied RAR.
- `public/js/cloud-api.js`: Google Apps Script callback adapter, static allow-listed page loading, Promise-compatible `window.runServer`.
- `functions/api/[[path]].js`: Pages Function routing auth + compatibility endpoints; server-side session and permission checks; CRUD for core modules.
- `functions/_lib/auth.js`, `functions/_lib/supabase.js`: Supabase REST + hashed sessions/password verification.
- `supabase/migration_sessions.sql`: session table.

Still to finish/verify: profile image migration (Google Drive -> R2), external record share token creation/revocation/public view, remaining legacy server functions (API returns HTTP 501 for unsupported calls), and integration testing against the actual Supabase schema.
