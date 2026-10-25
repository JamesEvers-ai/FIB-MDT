# FIB MDT Phase 3.7 – zentrales Modal und Dropdowns

## Enthalten
- Zentraler Modal-Shell in `public/index.html` bleibt appweit erhalten.
- Gemeinsamer Dropdown-Manager wertet dynamisch eingefügte native `<select>`-Felder auf der gesamten App auf. Die ursprünglichen Select-Elemente bleiben erhalten, damit vorhandene `.value`-Zugriffe und `change`-Handler funktionieren.
- Einheitliche Gestaltung der zentralen Modal-Aktionsbuttons und Eingabefelder.
- SQL-Migration für die von der Leitstellen-API erwarteten `patrols`-Spalten.

## Bereitstellen
1. `supabase/migration_patrols_callsign_and_columns.sql` im Supabase SQL Editor ausführen.
2. Das gesamte Projektverzeichnis bereitstellen, nicht nur `public`: `functions/`, `public/`, `wrangler.toml` und `package.json` müssen im Projekt-Root liegen.
3. Im Projekt-Root `npm run deploy` ausführen oder `npx wrangler pages deploy public --project-name=fib-mdt`.
4. Browser mit Strg+F5 neu laden und Leitstelle sowie weitere Module prüfen.

## Hinweise
Die drei weiterhin an Google Sheets angebundenen Module (Haftbefehle, Bußgeldkatalog und Anwaltskammer) werden durch diese UI-Änderung nicht auf Supabase umgestellt.
