# FIB MDT migration map – Phase 3

## Completed in this phase
- Profile image upload/remove migrated from Google Drive to Supabase Storage bucket `fib-profile-images`.
- Dashboard statistics endpoint `getDashboardStatistics` added.
- External record sharing is implemented in the existing API; the session/share tables are included in the SQL migration.
- Functional baseline pages + CRUD for announcements, vacations, internal fines, calendar, gangs, bonuses, and read-only logs.
- Audit log entries are written for CRUD operations in the new modules.
- SQL migration adds the associated tables and permission keys.

## Deployment steps
1. Merge the contents into the root of the current GitHub repository, preserving `public/`, `functions/`, and `supabase/`.
2. Run the updated `supabase/migration_sessions.sql` in Supabase SQL Editor. Review before execution; it is designed to be re-runnable.
3. Ensure `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are set as Cloudflare encrypted variables in Production and Preview.
4. Redeploy. Test login, page changes, dashboard, image upload/remove, records and external shares, then test each new module.
5. In System → Permissions, assign the new module permissions to the appropriate ranks. Master users bypass module permission checks.

## Security notes
- The Supabase secret is only used server-side. Do not place it in `public/` or commit it.
- The profile image bucket is public-read for avatar display; write operations happen server-side only.
- Audit logging is best-effort so a log-table error does not block the user's primary operation.
- The supplied archive did not include original source pages for announcements, vacations, internal fines, calendar, gangs, bonuses, or logs. These pages are working baseline replacements using a shared schema, not a pixel-perfect recovery of the missing original modules.
- The SQL migration assumes `public.permissions` has columns `id`, `key`, `label`, `description`, `category`, as expected by the current system API. Confirm this matches your database before running it.
