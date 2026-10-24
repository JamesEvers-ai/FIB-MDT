# FIB MDT – Deployment unter Windows (Cloudflare Pages + Supabase)

## Warum die Seite bisher keine Daten zeigt

Diese Version enthält eine Pages Function unter `functions/api/[[path]].js`. Sie muss zusammen mit `public/` von Wrangler veröffentlicht werden. Ein direkter Upload nur der statischen Dateien über die Cloudflare-Upload-Oberfläche veröffentlicht diese Function nicht.

## Einmalige Einrichtung

1. Installiere Node.js LTS: https://nodejs.org/
2. Entpacke dieses komplette ZIP in einen normalen Ordner.
3. Öffne den Ordner `FIB_MDT_Cloudflare_Migration_Phase3_4`.
4. Stelle sicher, dass dort `functions`, `public`, `package.json` und `wrangler.toml` nebeneinander liegen.
5. Öffne in diesem Ordner ein Terminal (Explorer-Adressleiste: `cmd`, dann Enter).
6. Führe aus:
   ```bat
   npm install
   npx wrangler login
   ```
   Schließe die Browser-Autorisierung ab.

## Cloudflare Secrets

Im Cloudflare-Dashboard das Pages-Projekt `fib-mdt` öffnen und für die Production-Umgebung die serverseitigen Variablen/Secrets setzen:

- `SUPABASE_URL` – URL des richtigen Supabase-Projekts
- `SUPABASE_SECRET_KEY` – serverseitiger Supabase Secret Key

Diese Werte gehören nicht in Dateien unter `public/` und sollen nicht in Chats geteilt werden. Wenn du auch Preview-Deployments testest, setze die Variablen dort separat.

## Veröffentlichen

Im selben Terminal und weiterhin im Projektstamm ausführen:

```bat
npm run deploy
```

Wenn Wrangler nach dem Projekt fragt, verwende das bestehende Projekt `fib-mdt`. Bestätige keine Erstellung eines zweiten Projekts, falls versehentlich ein anderer Name angezeigt wird.

Alternativ kann `DEPLOY_WINDOWS.bat` per Doppelklick ausgeführt werden, nachdem die einmalige Einrichtung abgeschlossen ist.

## Danach prüfen

1. Öffne `https://fib-mdt.pages.dev/api/health`.
2. Bei korrekt bereitgestellter Function erscheint eine JSON-Antwort mit `service` und `supabase`. `ok: true` bedeutet, dass die von diesem einfachen Test geprüften Tabellen erreichbar sind.
3. Öffne anschließend `https://fib-mdt.pages.dev/api/health?deep=1`. `failedTables` zeigt Tabellennamen, die fehlen oder auf die die API nicht zugreifen kann.
4. Erst danach in der MDT-Oberfläche anmelden und Systemseite testen.

### Wie Antworten zu deuten sind

- `{"success":false,"message":"API-Endpunkt nicht gefunden."}`: Die Function wird nicht von diesem Deployment/Pfad bedient. Noch kein Beweis für einen Supabase-Fehler.
- Meldung über `SUPABASE_URL` oder `SUPABASE_SECRET_KEY`: Function läuft, aber die benötigte Variable fehlt.
- `ok: false` und `failedTables`: Function läuft und hat Supabase erreicht, aber mindestens eine abgefragte Tabelle ist nicht erreichbar oder existiert nicht.
- `ok: true`: Die Tabellen `users` und `fib_mdt_sessions` sind erreichbar. Das beweist nicht automatisch, dass alle übrigen Tabellen/Spalten oder Berechtigungen korrekt sind.

## Wichtige Hinweise

- Das Skript veröffentlicht den Inhalt von `public/` und bündelt Pages Functions aus `functions/`. Führe es unbedingt aus dem Projektstamm aus.
- Die SQL-Datei `supabase/migration_sessions.sql` muss im SQL Editor des richtigen Supabase-Projekts ausgeführt werden. Sie erstellt nicht blind alle ursprünglichen MDT-Kerntabellen.
- Ein Supabase-Schlüssel wird nicht für Wrangler benötigt; Cloudflare-Anmeldung und Supabase-Zugangsdaten sind zwei getrennte Dinge.
- Die vorherige Fehlermeldung `Identifier 'sessionToken' has already been declared` ist ein separater Frontend-JavaScript-Fehler. Erst nach korrektem Deployment lässt sich zuverlässig prüfen, ob er weiterhin auftritt.
