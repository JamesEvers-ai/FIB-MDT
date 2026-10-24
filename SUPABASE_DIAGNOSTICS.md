# Supabase-Diagnose

1. Deploye den kompletten Ordner mit `public/` und `functions/` am Projekt-Root.
2. Setze Cloudflare Pages Secrets `SUPABASE_URL` und `SUPABASE_SECRET_KEY` für Production (und Preview, wenn dort getestet wird). Die Secret-Key-Variable bleibt ausschließlich serverseitig.
3. Öffne `/api/health`, dann `/api/health?deep=1`.
4. Wenn `failedTables` nicht leer ist, prüfe die Tabellen im selben Supabase-Projekt und führe `supabase/migration_sessions.sql` im SQL Editor aus. Für bestehende Kern-Tabellen sind Schema und Spaltennamen abzugleichen; fehlende Kerntabellen nicht ungeprüft mit geratenen Spalten neu erstellen.
5. Erst wenn `/api/health` `ok: true` zurückgibt, Login und danach die Seiten testen.
