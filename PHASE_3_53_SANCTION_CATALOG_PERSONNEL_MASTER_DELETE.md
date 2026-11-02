# Phase 3.53 – Sanktionskatalog in Personalakten und Master-Verwaltung

- Die Personalakte besitzt jetzt getrennte Tabs für **Verhängte Sanktionen** und den **Sanktionskatalog**. Der Katalog-Tab zeigt die in der Verwaltung angelegten aktiven Sanktionen kategorisiert an; er vermischt diese nicht mit tatsächlich festgesetzten Sanktionen.
- Die Übersicht im Modul Interne Sanktionen bezieht sich auf angelegte Katalogeinträge. Master-Benutzer sehen dort auch inaktive Einträge; normale Benutzer sehen nur aktive Einträge.
- Katalogverwaltung, Bearbeitung und Löschung sind serverseitig ausschließlich Master-Benutzern vorbehalten. Master können Kategorien und Sanktionen löschen, ohne zusätzlich eine separate `ifines.manage`-Berechtigung zu benötigen.
- Bereits verhängte Sanktionen bleiben weiterhin separat in der Personalakte unter **Verhängte Sanktionen** dokumentiert.
- Keine Datenbankmigration erforderlich.
