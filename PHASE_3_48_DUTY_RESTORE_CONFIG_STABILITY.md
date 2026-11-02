# Phase 3.48 – Leitstelle: Dienstwiederherstellung, Konfigurationssynchronisierung und Stabilität

## Änderungen
- Aktive Dienstzuordnung wird nach dem Laden der Personal- und Streifendaten wiederhergestellt. Der Agent muss nach Reload/erneutem Öffnen nicht erneut „In Dienst gehen“.
- Gespeicherte Auswahlwerte werden vor dem asynchronen Laden der Ten-Code-Liste wiederhergestellt. Eine verspätete Antwort überschreibt gültige Auswahlwerte nicht mehr.
- Ten-Code-Liste aus dem Auswahl-Konfigurationsdialog wird zentral in `fib_mdt_settings` gespeichert und von allen Clients geladen.
- Farbkonfiguration erzeugt die Eingabefelder dynamisch anhand der zentral konfigurierten Ten Codes, statt nur fünf fest codierte Werte zu zeigen.
- Die Speicherung globaler Farben übergibt die Argumente in der vom API-Endpunkt erwarteten Reihenfolge.
- Duty-Änderungen aus der oberen Leiste werden serialisiert, damit mehrere schnelle Änderungen nicht gleichzeitig die Streifen-Mitgliedschaften ersetzen.
- Lokale Auswahllisten und Auswahlwerte werden bei Änderungen in anderen Tabs synchronisiert.

## Hinweise
- `savePatrolTenCodes` benötigt die Berechtigung `patrols.edit`.
- Die globale Farbanpassung bleibt Master-only.
- Die vorhandene Tabelle `fib_mdt_settings` wird für `patrol_ten_codes` und `patrol_display_colors` verwendet.
