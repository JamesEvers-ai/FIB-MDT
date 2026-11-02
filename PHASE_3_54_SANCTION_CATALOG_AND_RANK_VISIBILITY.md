# Phase 3.54 – Sanktionskatalog und rangabhängige Sanktionshistorie

## Änderungen

- Die Personalakte enthält ausschließlich den Tab **Verhängte Sanktionen**; der Katalog wird dort nicht mehr angezeigt.
- Verhängte Sanktionen werden serverseitig nur geliefert, wenn der betrachtete Agent einen niedrigeren Rang als der angemeldete Benutzer hat.
- Master-Benutzer sehen die verhängten Sanktionen unabhängig vom Rang des betrachteten Agenten.
- Die Prüfung erfolgt anhand der Rangstufe (`ranks.level`). Fehlt eine eindeutige Rangzuordnung, werden Sanktionen für Nicht-Master nicht angezeigt.
- Die Übersicht im Bereich **Sanktionskatalog** zeigt angelegte Paragraphen nach Kategorien in einer tabellarischen Darstellung, optisch an den externen Bußgeldkatalog angelehnt.
- Die Katalogverwaltung bleibt die zentrale Stelle für Kategorien und Paragraphen. Inaktive Einträge sind nur für Master in der Übersicht sichtbar.

## Datenbank

Keine Migration erforderlich. Es werden die bestehenden Tabellen `ranks`, `fib_internal_fine_catalog` und `fib_internal_fines` verwendet.

## Prüfung

JavaScript-Syntaxprüfung der API sowie der Inline-Skripte von `agents.html` und `ifines.html`; ZIP-Integritätsprüfung. Kein Live-Test gegen Cloudflare Pages oder Supabase.
