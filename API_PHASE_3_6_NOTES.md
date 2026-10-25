# FIB MDT – Phase 3.6: API-Funktionshärtung

Diese Version baut auf Phase 3.5 auf. Die Google-Sheets-Bridge für Bußgeldkatalog, Anwaltskammer und Haftbefehle bleibt erhalten.

## Behobene konkrete Fehler

- `getWantedConfig` verwendete `au`, ohne das Ergebnis von `authz()` einer Variablen zuzuweisen. Die Methode brach deshalb zur Laufzeit ab. Die Authentifizierungsantwort wird jetzt korrekt übernommen.
- Personalakten liefern jetzt zusätzlich die CamelCase-Felder, die die bestehende Oberfläche verwendet (`serviceNumber`, `callSign`, `entryDate`, `personnelStatus`, `personnelNote`, `profileImage`).
- Die Beamtenliste lädt nur aktive und freigegebene Benutzer und gibt Profilbilder sowie Personalstammdaten in einem einheitlichen Format zurück.
- Schulungen werden mit einer expliziten Feld-Allowlist geschrieben; `expiryDate` wird auf das Datenbankfeld `expiry_date` abgebildet. Vermerke und Schulungen werden bei Rückgabe normalisiert.
- Streifen-Mitglieder werden gegen aktive, freigegebene Benutzer geprüft; doppelte Mitglieder und mehrere Streifenführer werden serverseitig verhindert. Nach dem Speichern gibt die API angereicherte Mitgliederobjekte zurück, die die Oberfläche direkt darstellen kann.
- Das Anlegen und Bearbeiten von Berechtigungen berücksichtigt nun auch das in der vorhandenen `permissions`-Tabelle erforderliche Feld `name`.
- `supabase/migration_sessions.sql` enthält für neu anzulegende Berechtigungen sowohl `name` als auch `label`.

## Diagnose der tatsächlich verwendeten Spalten

Die Methode `getApiDiagnostics` ist nur für einen Master verfügbar. Nach dem Deploy kann sie nach Anmeldung über die Browser-Konsole ausgeführt werden:

```js
runServer("getApiDiagnostics").then(console.table).catch(console.error)
```

Die Rückgabe enthält `checks` und `failed`. Bei einer fehlenden oder abweichenden Spalte steht der Fehler beim betreffenden Tabelleneintrag. Die Diagnose führt ausschließlich lesende Abfragen mit `limit=0` aus; sie erstellt, ändert oder löscht keine Datensätze.

## Validierung

- `node --check` für Cloudflare-Function- und API-Adapter-Dateien erfolgreich.
- 20 eingebettete JavaScript-Blöcke der HTML-Seiten auf Syntax geprüft; keine Syntaxfehler.
- Die Prüfung ist statisch. Eine Live-Validierung der Datenbankoperationen erfordert den Deploy in der eigenen Cloudflare-/Supabase-Umgebung und den anschließenden Diagnoseaufruf.

## Bereitstellung

Vom Projektstamm aus wie gehabt:

```bash
npx wrangler pages deploy public --project-name=fib-mdt
```

Der Ordner `functions/` muss im Projektstamm neben `public/` liegen. `GOOGLE_SHEETS_API_URL` bleibt als Cloudflare-Variable konfiguriert.
