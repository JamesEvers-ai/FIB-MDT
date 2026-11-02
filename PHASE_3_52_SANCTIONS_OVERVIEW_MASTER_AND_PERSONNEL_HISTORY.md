# Phase 3.52 – Sanktionsübersicht, Master-Verwaltung und Personalhistorie

## Interner Sanktionskatalog
- Neue öffentliche Leseansicht „Sanktionskatalog“ mit kategorisierter, durchsuchbarer Darstellung aktiver Sanktionspositionen.
- „Sanktion festsetzen“ bleibt als separater Tab erhalten.
- „Katalogverwaltung“ wird nur für Benutzer mit `users.master = true` angezeigt.
- Die Master-Beschränkung wird zusätzlich serverseitig für Lesen der vollständigen Verwaltungsliste, Erstellen, Bearbeiten und Löschen geprüft; ein ausgeblendeter Tab ist damit nicht die einzige Schutzmaßnahme.
- Die Übersicht zeigt nur aktive Katalogpositionen. Inaktive Positionen bleiben in der Master-Verwaltung erhalten.

## Personalakte
- Neuer Tab „Sanktionen“ in jeder Personalakte.
- Zeigt die zum Agenten gehörenden internen Festsetzungen mit Sanktion, Wert, Datum, Begründung und festsetzender Person.
- Die Daten werden über das bestehende Personalakten-Bundle geladen; keine zusätzliche Browser-Anfrage beim Tabwechsel.
- Es werden Momentaufnahmen der bei Festsetzung gespeicherten Personal- und Sanktionsdaten angezeigt.

## Datenbank
- Keine zusätzliche Migration erforderlich. Verwendet werden die bestehenden Tabellen `fib_internal_fine_catalog` und `fib_internal_fines`.
