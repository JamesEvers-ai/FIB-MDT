# Phase 3.21 – Schriftbild und Fehlerbehebung bei Dienstaufnahme

## Formatierung
- Die oberen Statusfelder und die Auswahlmenüs verwenden nun die geerbte MDT-Schriftfamilie.
- Schriftgrößen und Zeilenhöhe der Auswahloptionen wurden vereinheitlicht und leicht vergrößert.
- Eine undefinierte CSS-Schriftvariable wurde entfernt.

## HTTP 400 beim Erstellen einer Streife
Die API benötigt beim Anlegen weiterhin `callsign`, `number`, `vehicleType` und `status`. Der Topbar-Ablauf übergibt diese Werte und ergänzt `location` und `activity`.

Bitte zuerst in Supabase den SQL Editor öffnen und diese Datei ausführen:
`supabase/migration_patrols_duty_location_activity.sql`

Sie ergänzt `location` und `activity` auf `public.patrols`. Wenn die Migration schon ausgeführt wurde und der Fehler weiter auftritt, bitte im Browser DevTools → Network → `createPatrol` → Response den Antworttext prüfen. Der HTTP-Status allein verrät nicht, welche Datenbankspalte oder Berechtigung die Anfrage abweist.
