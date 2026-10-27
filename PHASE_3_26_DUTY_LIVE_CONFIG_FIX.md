# Phase 3.26 – Live-Dienststatus und Auswahllisten

## Änderungen
- Der Button **„In Dienst gehen“** wird nach erfolgreicher Diensterfassung ausgeblendet und erst nach **„Aus dem Dienst gehen“** wieder eingeblendet.
- Änderungen an Einsatzort, Tätigkeit/Status oder Fahrzeug lösen im aktiven Dienst ein Update derselben Streife aus; sie legen keinen zweiten Eintrag an.
- Die Konfiguration der aktuell gewählten Liste erfolgt über einen MDT-Dialog statt über eine JSON-Eingabe. Einträge lassen sich hinzufügen und entfernen.
- Die Streifenkennung wird in der kompakten Leitstellenzeile nicht doppelt angezeigt, wenn Callsign und Nummer identisch sind.

## Hinweis zur Konfiguration
Die Auswahloptionen werden in dieser Version weiterhin im Browser (`localStorage`) gespeichert. Das bedeutet, dass die Listen nicht automatisch zwischen verschiedenen Agents synchronisiert werden. Eine organisationsweit gemeinsame Konfiguration benötigt eine passende Supabase-Tabelle samt Berechtigungsprüfung und ist nicht Bestandteil dieses Frontend-Fixes.

## Bereitstellung
Den Inhalt des ZIP-Ordners wie bisher in Cloudflare Pages hochladen. Für die hier vorgenommenen Änderungen ist keine Datenbankmigration vorgesehen.
