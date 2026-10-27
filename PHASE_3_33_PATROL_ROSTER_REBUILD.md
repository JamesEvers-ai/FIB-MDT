# Phase 3.33 – Streifenliste neu aufgebaut

- Reihenfolge: Callsign-Chip, Nummer-Chip, 10-Code, Einsatzort, Fahrzeug-Chip, Rangkürzel und Kurzname.
- 10-Code, Einsatzort und Fahrzeug stammen aus dem Streifeneintrag; Callsign/Nummer sowie Rang/Name werden aus den vorhandenen Streifen-/Besatzungsdaten verwendet.
- Größere abgerundete Flächen mit Graphit-/Cyan-Farbgestaltung.
- Streifenkarte rendert den 10-Code (`patrol.status`) statt die Aktivitätsbezeichnung.
- Hinweis: Die Seite nutzt weiterhin die bereits gelieferten Besatzungsdaten der Patrol-API; ein separater globaler Personalakten-Vorabruf beim initialen Tablet-Start wurde nicht ohne Verifikation der API-Struktur ergänzt.
