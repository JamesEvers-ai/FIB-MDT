# FIB MDT – Vorladen und Cache

## Seitentemplates
`public/js/cloud-api.js` kennt die erlaubten HTML-Seiten und lädt jede eindeutige Vorlage beim Start parallel. Die Vorlagen bleiben nur im Arbeitsspeicher des aktuellen Tabs. Die Navigation verwendet `fetchTemplate()` und damit dieselbe Cache-Schicht.

## Datencache
- API-Leseantworten werden nach Methode, Argumenten und aktuellem Session-Token getrennt gespeichert.
- Cache-TTL: 20 Sekunden.
- Erfolgreiche Schreibaufrufe leeren den Datencache, damit nach Speichern/Löschen kein alter Stand weiterverwendet wird.
- Leitstelle/Streifen, Dashboard-Livewerte, Sitzung und Berechtigungen sind ausgenommen.
- Tokenwechsel leert den Cache. Logout leert ihn ebenfalls.

## Grenzen
Der Cache ist eine Performance-Optimierung im Browser, keine Sicherheitsgrenze und keine persistente Datenbank. Der Server prüft weiterhin Berechtigungen für jeden API-Aufruf. Änderungen anderer Agents können bis zum Ablauf der kurzen TTL sichtbar verzögert sein; Live-Bereiche werden nicht zwischengespeichert.
