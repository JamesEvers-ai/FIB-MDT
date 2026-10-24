# FIB MDT – Cloudflare Pages Migration (Phase 3)

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
This phase adds server-side Supabase Storage for profile images, dashboard statistics, a generic CRUD API for the modules whose original source files were not included, audit logs, and SQL tables/permissions for those modules. The modules built from scratch are functional baseline replacements, not exact reproductions of unavailable original source. Test with a staging project first. Existing records/fines/lawyers/warrants still depend on their existing tables and schema.

## Performance: Seiten- und Daten-Cache (Phase 3.3)

- `public/js/cloud-api.js` lädt die statischen HTML-Vorlagen aller registrierten MDT-Seiten direkt nach dem Start parallel vor.
- Navigation verwendet danach die im Arbeitsspeicher gehaltene Vorlage; falls ein Vorladen fehlschlägt, wird beim Öffnen automatisch erneut geladen.
- Wiederholte, nicht-live lesende API-Abfragen werden zentral für 20 Sekunden im Arbeitsspeicher gecacht und nach erfolgreicher Schreiboperation invalidiert.
- Sitzungs-/Berechtigungsabfragen sowie Leitstelle/Streifen- und Dashboard-Livedaten werden nicht gecacht.
- Der Cache enthält keine Daten über Sitzungen hinweg und ersetzt keine serverseitige Berechtigungsprüfung.
- Optional kann die Oberfläche `window.FIBMDTCache.preloadPages()`, `window.FIBMDTCache.clear()` und `window.FIBMDTCache.getPageTemplateStatus()` aufrufen.


## Phase 3.4 – Supabase-Verbindungsdiagnose und Script-Isolation

Nach dem Deployment:
- `https://DEINE-DOMAIN/api/health` prüft die Cloudflare-Secrets und den Zugriff auf `users` sowie `fib_mdt_sessions`.
- `https://DEINE-DOMAIN/api/health?deep=1` prüft zusätzlich die Tabellen, die die migrierte API erwartet. `failedTables` nennt nur Tabellennamen, niemals Zugangsdaten.
- In Cloudflare Pages müssen `SUPABASE_URL` und `SUPABASE_SECRET_KEY` für die tatsächlich verwendete Umgebung gesetzt sein. Danach neu deployen.
- `supabase/migration_sessions.sql` im SQL Editor des richtigen Supabase-Projekts ausführen. Die übrigen Kern-Tabellen (z. B. `users`, `ranks`, `permissions`, `fib_records`, `patrols`, `warrants`) müssen bereits existieren und zu den von der API verwendeten Spalten passen; diese Datei erstellt sie bewusst nicht blind neu, damit bestehende Daten nicht überschrieben oder mit inkompatiblen Spalten angelegt werden.

Die Seitenscripts werden bei der Navigation explizit in einen eigenen Funktions-Scope gekapselt. Wenn die Konsole danach weiterhin `appendChild` mit `sessionToken` meldet und der Stack weiterhin bei Zeile ~4176 statt im aktualisierten Renderer liegt, wird sehr wahrscheinlich noch ein älterer Build ausgeliefert oder ein anderes Cloudflare-Pages-Projekt geöffnet. Prüfe dann die aktive Deployment-Version/Build-Ausgabe und mache einen Hard-Refresh.
