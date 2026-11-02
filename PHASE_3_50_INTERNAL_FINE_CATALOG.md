# Phase 3.50 – Interner Bußgeldkatalog

## Oberfläche
- Der bisherige interne Bußgeldbereich ist in zwei direkt umschaltbare Tabs gegliedert: „Bußgeld erfassen“ und „Katalogverwaltung“.
- Die Katalogansicht ist visuell an den externen Bußgeldkatalog angelehnt (dunkle Oberfläche, Kategorien, Suche, strukturierte Positionen und hervorgehobene Beträge).
- Kategorien und Bußgeldpositionen können ohne Codeänderung angelegt, bearbeitet und gelöscht werden.
- Positionen enthalten Kategorie, Bezeichnung, Beschreibung, Geldbetrag, Aktivstatus und Sortierreihenfolge.
- Die Erfassung verwendet ein Dropdown mit den aktiven Katalogpositionen.
- Betroffene Agents werden aus `users` und `personnel` zusammengeführt. Rang, Dienstnummer, Callsign, Abteilung und Einheit werden als Momentaufnahme zur Festsetzung gespeichert.
- Bereits erstellte Festsetzungen behalten ihren damaligen Betrag und Text, auch wenn die Katalogposition später angepasst wird.

## Datenbankmigration
Vor dem Deployment einmal in Supabase SQL Editor ausführen:
`supabase/migration_internal_fine_catalog.sql`

## API
- `getInternalFineCatalog`
- `saveInternalFineCatalogItem`
- `deleteInternalFineCatalogItem`
- `getInternalFinePersonnel`
- `getInternalFineCases`
- `createInternalFineCase`

Lesen erfordert `ifines.view`; Katalogverwaltung und Festsetzung erfordern `ifines.manage`.
