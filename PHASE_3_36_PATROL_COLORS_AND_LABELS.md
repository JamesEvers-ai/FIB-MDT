# FIB MDT – Phase 3.36

## Änderungen
- CallSign-Typ und CallSign-Nummer verwenden getrennte Farbwerte.
- Rang und Agentenname verwenden getrennte Farbwerte.
- Die Farben können in der Leitstelle über **Farben konfigurieren** geändert werden. Die Schaltfläche wird ausschließlich Master-Accounts angezeigt.
- Die API erzwingt Master-Berechtigung auch serverseitig; Nicht-Master können `savePatrolDisplayConfig` nicht ausführen.
- Rang-Kürzel stammen aus `ranks.short_name`.
- Bei älteren Streifen-Datensätzen, in denen `number` irrtümlich den vollständigen Callsign enthält, wird die Nummer aus dem Callsign-Suffix extrahiert.

## Einmalige Datenbankmigration
Vor Verwendung der persistenten Farbauswahl bitte `supabase/migration_patrol_display_colors.sql` im Supabase SQL Editor ausführen. Ohne Migration verwendet die Anzeige Standardfarben; das Speichern ist bis zur Migration nicht möglich.

## Hinweis
Die Änderungen wurden statisch geprüft; ein Live-Test gegen die konkrete Supabase-Instanz/Cloudflare-Umgebung war hier nicht möglich.
