# Phase 3.38 – Globale Einsatzleiste und Farbkonfiguration

- Der separate Ten-Code-Auswahlschalter im Seitenkopf wurde entfernt.
- Der Ten Code ist jetzt direkt in jeder Streifenzeile neben Callsign, Einsatzort und Fahrzeug auswählbar.
- Änderungen werden über `updatePatrol` am konkreten Streifendatensatz gespeichert und die Leitstellenliste wird danach aktualisiert.
- Die zentrale, Master-geschützte Farbkonfiguration enthält nun Callsign-Typ, Callsign-Nummer, Ten Code, Einsatzort, Rang und Agentenname (jeweils Hintergrund und Textfarbe).
- Farben bleiben in `fib_mdt_settings` unter `patrol_display_colors` gespeichert und gelten global für die Leitstellen-Streifenansicht.
- Die API-Validierung und die clientseitigen Standardwerte verwenden dieselbe Farbpalette.

## Prüfung
- JavaScript-Syntax der Inline-Skripte aus `public/pages/patrols.html` geprüft.
- JavaScript-Syntax von `functions/api/[[path]].js` geprüft.
- Live-Test gegen Cloudflare Pages und Supabase ist nicht erfolgt.
