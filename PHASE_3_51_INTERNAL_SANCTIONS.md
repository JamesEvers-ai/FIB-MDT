# Phase 3.51 – Interner Sanktionskatalog

## Änderungen
- Interne Verwaltung optisch an das FIB-MDT angepasst: dunkle Slate-Oberflächen und blaue Akzente; keine orangefarbenen Primäraktionen.
- Katalog unterstützt die Sanktionstypen Geldstrafe, HQ-Runden, Fort-Runden, Human Labs (Medikamente herstellen), Suspendierung und Kündigung.
- Sanktionen werden modular unter frei verwaltbaren Kategorien angelegt, bearbeitet und gelöscht.
- Festsetzungen übernehmen Agent, Rang, Dienstnummer, Callsign, Abteilung und Einheit aus `users`/`personnel` als Momentaufnahme.
- Bereits gespeicherte Festsetzungen behalten ihre ursprünglichen Sanktionsdaten.
- Rassismus und rassistische Äußerungen sind als Kündigungsgrund abgesichert: Standardkatalogeintrag wird mit der Migration angelegt; API und Oberfläche verhindern eine abweichende Einstufung.
- Bestehende Geldstrafen werden bei der Migration in den Sanktionstyp `fine` überführt.

## Datenbankmigration
Vor dem Deployment einmal ausführen:
`supabase/migration_internal_fine_catalog_v2.sql`

Die Migration erweitert die vorhandene Tabelle und übernimmt alte Geldstrafen. Sie ersetzt nicht die vorherige Migration; Version 3.50 muss bereits migriert worden sein.

## API
Unveränderte Methoden:
- `getInternalFineCatalog`
- `saveInternalFineCatalogItem`
- `deleteInternalFineCatalogItem`
- `getInternalFinePersonnel`
- `getInternalFineCases`
- `createInternalFineCase`

Die Sanktionstypen werden serverseitig validiert. Rassistische Tatbestände können ausschließlich mit `termination` gespeichert und festgesetzt werden.
