# Phase 3.24 – kompakte Streifenzeilen und Live-Abgleich

- Streifenkarte, Callsign, Status, Standort, Fahrzeug und Besatzung sind enger gesetzt und bleiben in einer horizontalen Zeile.
- Streifenliste aktualisiert den gespeicherten Datenbestand alle fünf Sekunden, sofern kein Modal geöffnet ist und keine Änderung gespeichert wird. Damit werden bereits serverseitig gespeicherte Änderungen anderer Agents automatisch sichtbar.
- Diese Aktualisierung macht eine reine lokale Auswahländerung nicht automatisch zu einer serverseitigen Änderung. Status-/Fahrzeug-/Standortänderungen müssen über einen API-Endpunkt gespeichert werden; das regelmäßige Aktualisieren zeigt diese gespeicherten Änderungen anschließend an.
