# FIB MDT – API-Migration Status

## In diesem Paket angepasst
- Bußgeldkatalog (`getFines`), Anwaltskammer (`getLawyers`) und Haftbefehle (`getWarrants`) werden nicht mehr aus Supabase gelesen.
- Diese Funktionen laufen über eine allowlist-basierte Apps-Script-Bridge zurück zu den bestehenden Google Sheets.
- Dashboard-Haftbefehlszahlen fragen die Live-Sheet-Quelle ab.
- Sheet-Reads werden nicht im Browser-API-Cache zwischengespeichert.
- Der Deep-Healthcheck erwartet `fines`, `lawyers` und `warrants` nicht mehr als Supabase-Tabellen; er meldet stattdessen, ob `GOOGLE_SHEETS_API_URL` konfiguriert ist.

## Vor dem produktiven Test erforderlich
1. `google-apps-script/CloudflareBridge.gs` in das bestehende Apps-Script-Projekt übernehmen. Bestehende `doPost(e)`-Funktionen gegebenenfalls zusammenführen.
2. Apps-Script-Web-App deployen.
3. `GOOGLE_SHEETS_API_URL` in Cloudflare Pages konfigurieren.
4. Cloudflare Pages erneut deployen.

## Noch nicht als Laufzeit geprüft
Die API-Methoden der übrigen Module wurden im Quellcode zugeordnet, aber ohne aktive Sitzung und Live-Datenbank nicht vollständig end-to-end getestet. Danach ist jedes Modul durch Network-Status, Response-Body und tatsächliche CRUD-Aktion zu validieren.


## Phase 3.6 – Funktionshärtung (25.10.2026)
- Personalakten normalisieren jetzt Datenbankfelder in das CamelCase-Format der bestehenden Oberfläche.
- Streifen speichern und liefern angereicherte Mitgliederdaten; aktive/freigegebene Benutzer und eindeutige Mitgliedschaft werden serverseitig validiert.
- `getWantedConfig`-Laufzeitfehler behoben.
- Systemberechtigungen berücksichtigen das erforderliche Feld `name`.
- Neue Master-only-Methode `getApiDiagnostics` prüft die wichtigsten Datenbanktabellen auf die tatsächlich benötigten Spalten.
- Siehe `API_PHASE_3_6_NOTES.md` für Tests und den Diagnoseaufruf.
