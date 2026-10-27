# Phase 3.20 – Topbar-Dienstaufnahme

## Änderungen
- Einsatzort, Status/Tätigkeit und Fahrzeug besitzen jeweils ein eigenes schwebendes Auswahlmenü, das über den jeweiligen Chip in der oberen Leiste geöffnet wird.
- „In Dienst gehen“ öffnet kein Auswahlmenü mehr. Es validiert die drei gewählten Werte und sendet sie an den bestehenden `fib-mdt:duty-start-request`-Ablauf.
- Der bestehende Leitstellen-API-Ablauf lädt das Callsign aus der Personalakte und erstellt die Streife über `createPatrol`; die API ordnet den angemeldeten Benutzer automatisch als Streifenführer zu.
- Die Status-Chips behalten die ausgewählten Werte bei und aktualisieren sich nach erfolgreicher Dienstaufnahme bzw. Dienstbeendigung.
- Die Streifenkarte zeigt bereits Tätigkeit/Status, Einsatzort, Fahrzeug und die untergeordnete Besatzung.

## Prüfung
- API-Datei mit `node --check` geprüft.
- Inline-JavaScript in `public/index.html` syntaktisch geprüft.
- Kein Live-Test gegen Cloudflare/Supabase durchgeführt. Die Datenbank muss die Spalten `location` und `activity` in `patrols` besitzen; dafür liegt die Migration `supabase/migration_patrols_duty_location_activity.sql` bei.
