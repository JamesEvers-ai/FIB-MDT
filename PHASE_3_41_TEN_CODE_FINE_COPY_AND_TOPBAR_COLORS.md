# Phase 3.41 – Ten Code, Bußgeld-Zusatz und Leitstellenfarben

## Datenbankmigration
Vor dem Deployment `supabase/migration_patrol_ten_code_custom.sql` im Supabase SQL Editor ausführen. `patrols.status` bleibt kompatibel mit dem vorhandenen CHECK-Constraint; frei konfigurierbare Codes werden separat in `patrols.ten_code` gespeichert.

## Änderungen
- Neue API-Lese-/Schreiblogik verwendet `ten_code` für den frei konfigurierbaren Ten Code.
- `status` wird bei neuen/aktualisierten Streifen auf dem zulässigen Wert `10-1` belassen, damit der bestehende Check-Constraint nicht verletzt wird.
- Der Kopiervorgang einer Straftat fragt optional nach einem Zusatz (z. B. `StA n.V.`) und hängt ihn in Klammern an.
- Die vorhandene Farbkonfiguration wird auf die Auswahl-Chips der Leitstellenleiste übertragen.

## Deployment-Reihenfolge
1. SQL-Migration ausführen.
2. ZIP entpacken und den Inhalt des Ordners `fib337` wie bisher bei Cloudflare Pages hochladen.
3. Browser hart neu laden.
