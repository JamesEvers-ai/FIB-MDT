# Phase 3.55 – Mehrteilige Sanktionen und Bußgeldkatalog-Design

- Eine Katalogsanktion kann jetzt mehrere Strafmaßnahmen enthalten (z. B. 30.000 $ Geldstrafe und 2 HQ-Runden).
- Maßnahmen werden einzeln mit Art, Umfang und Einheit verwaltet und als Momentaufnahme in verhängten Sanktionen gespeichert.
- Vorschau, Festsetzungsliste und Personalakten zeigen alle Bestandteile einer verhängten Sanktion.
- Die Sanktionskatalog-Übersicht verwendet für Tabellen, Kategorien, Trennlinien, Typografie und Abstände die vorhandenen CSS-Regeln des externen Bußgeldkatalogs.
- Einzelmaßnahmen aus dem bisherigen Katalog bleiben kompatibel.

## Datenbank
Vor dem Deployment einmalig `supabase/migration_internal_fine_catalog_composite_components.sql` in Supabase ausführen. Die Migration ergänzt `sanction_components`, überführt bestehende Einzelmaßnahmen und erweitert die Prüfbeschränkung für zusammengesetzte Sanktionen.
