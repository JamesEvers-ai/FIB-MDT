# Phase 3.22 – Fehlerbehebung beim Anlegen einer Streife

## Ursache
Die neue Dienstaufnahme hat als technischen Streifenstatus `10-8` gesendet. Dieser Wert gehört nicht zu den in der bestehenden Leitstelle definierten Statuswerten (`10-1`, `10-3`, `10-6`, `10-23`, `10-76`) und kann von der Datenbank mit HTTP 400 abgewiesen werden.

## Änderung
- Normale Dienstaufnahme sendet jetzt den gültigen technischen Status `10-1`.
- Bei Aktivität `OOV` wird weiterhin `10-6` verwendet.
- Die ausgewählte Tätigkeit (z. B. Streifenfahrt, Geiselnahme, Ausbildung) bleibt separat im Feld `activity` gespeichert und wird nicht durch den technischen Funkstatus ersetzt.

## Installation
Wie gewohnt den Inhalt des ZIP-Archivs in Cloudflare Pages hochladen und neu deployen. Für `location` und `activity` muss die Migration `supabase/migration_patrols_duty_location_activity.sql` bereits ausgeführt worden sein.

Falls danach weiterhin ein HTTP 400 auftritt, in den Entwicklertools > Network > `createPatrol` > Response den JSON-Antworttext prüfen; dieser enthält die vom API-Handler gemeldete Ursache.
