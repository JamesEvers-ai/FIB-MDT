# FIB MDT – API-Migrationsaudit

Stand: 24.10.2026 – statische Prüfung des Phase-3.4-Projekts.

## Architektur
- Frontend-Aufrufe laufen zentral über `public/js/cloud-api.js` (`CloudApi.run` / `runServer`).
- Anmeldung, Sitzung, Berechtigungen, Passwort und Profilbild werden über `/api/auth/*` geroutet.
- Fachmethoden laufen über `POST /api/legacy/<method>` und werden in `functions/api/[[path]].js` über `dispatch()` verarbeitet.
- Die zusätzlichen Module Bekanntmachungen, Urlaub, interne Bußgelder, Kalender, Gangs, Boni und Protokolle verwenden die generischen Modulmethoden.

## Statisch gefundene Frontend-Methoden
- `addClassifiedPerson` → `/api/legacy/addClassifiedPerson` — Handler vorhanden
- `approveClassificationRequest` → `/api/legacy/approveClassificationRequest` — Handler vorhanden
- `archiveRecord` → `/api/legacy/archiveRecord` — Handler vorhanden
- `changeOwnPassword` → `/api/auth/*` — Auth-Route
- `create` → `/api/legacy/create` — PRÜFEN: kein direkter Handler gefunden
- `createPersonnelNote` → `/api/legacy/createPersonnelNote` — Handler vorhanden
- `createPersonnelTraining` → `/api/legacy/createPersonnelTraining` — Handler vorhanden
- `createRecord` → `/api/legacy/createRecord` — Handler vorhanden
- `createWanted` → `/api/legacy/createWanted` — Handler vorhanden
- `deleteClassifiedPerson` → `/api/legacy/deleteClassifiedPerson` — Handler vorhanden
- `deletePatrol` → `/api/legacy/deletePatrol` — Handler vorhanden
- `deletePersonnelNote` → `/api/legacy/deletePersonnelNote` — Handler vorhanden
- `deletePersonnelTraining` → `/api/legacy/deletePersonnelTraining` — Handler vorhanden
- `deleteRecord` → `/api/legacy/deleteRecord` — Handler vorhanden
- `deleteWanted` → `/api/legacy/deleteWanted` — Handler vorhanden
- `getClassificationPermissions` → `/api/legacy/getClassificationPermissions` — Handler vorhanden
- `getClassifications` → `/api/legacy/getClassifications` — Handler vorhanden
- `getCurrentUser` → `/api/auth/*` — Auth-Route
- `getDashboardStatistics` → `/api/legacy/getDashboardStatistics` — Handler vorhanden
- `getFines` → `/api/legacy/getFines` — Handler vorhanden
- `getLawyers` → `/api/legacy/getLawyers` — Handler vorhanden
- `getMyPermissions` → `/api/auth/*` — Auth-Route
- `getPatrolEligibleUsers` → `/api/legacy/getPatrolEligibleUsers` — Handler vorhanden
- `getPatrols` → `/api/legacy/getPatrols` — Handler vorhanden
- `getPersonnelFileBundle` → `/api/legacy/getPersonnelFileBundle` — Handler vorhanden
- `getRankById` → `/api/legacy/getRankById` — Handler vorhanden
- `getRecord` → `/api/legacy/getRecord` — Handler vorhanden
- `getRecords` → `/api/legacy/getRecords` — Handler vorhanden
- `getWanted` → `/api/legacy/getWanted` — Handler vorhanden
- `getWantedConfig` → `/api/legacy/getWantedConfig` — Handler vorhanden
- `getWarrantStatistics` → `/api/legacy/getWarrantStatistics` — Handler vorhanden
- `getWarrants` → `/api/legacy/getWarrants` — Handler vorhanden
- `login` → `/api/auth/*` — Auth-Route
- `logout` → `/api/auth/*` — Auth-Route
- `refreshWarrantsCache` → `/api/legacy/refreshWarrantsCache` — Handler vorhanden
- `rejectClassificationRequest` → `/api/legacy/rejectClassificationRequest` — Handler vorhanden
- `removeOwnProfileImage` → `/api/auth/*` — Auth-Route
- `requestAccount` → `/api/auth/*` — Auth-Route
- `systemCreatePermission` → `/api/legacy/systemCreatePermission` — Handler vorhanden
- `systemCreateRank` → `/api/legacy/systemCreateRank` — Handler vorhanden
- `systemGetAllRanks` → `/api/legacy/systemGetAllRanks` — Handler vorhanden
- `systemGetPermissions` → `/api/legacy/systemGetPermissions` — Handler vorhanden
- `systemGetRankPermissions` → `/api/legacy/systemGetRankPermissions` — Handler vorhanden
- `systemSetRankPermissions` → `/api/legacy/systemSetRankPermissions` — Handler vorhanden
- `systemUpdatePermission` → `/api/legacy/systemUpdatePermission` — Handler vorhanden
- `systemUpdateRank` → `/api/legacy/systemUpdateRank` — Handler vorhanden
- `updateRecord` → `/api/legacy/updateRecord` — Handler vorhanden
- `updateWanted` → `/api/legacy/updateWanted` — Handler vorhanden
- `uploadOwnProfileImage` → `/api/auth/*` — Auth-Route

## Ergebnis und Grenzen
- In den aktuellen HTML-Seiten wurden 48 API-Methodenkandidaten erfasst.
- Davon sind 48 im aktuellen Backend statisch zuordenbar.
- Nicht direkt zuordenbare Kandidaten: keine (die verbleibende Erkennung `create` war ein JavaScript-False-Positive).
- Diese Prüfung bestätigt nur die Zuordnung im Quellcode. Sie beweist nicht, dass alle Supabase-Tabellen, Spalten, Berechtigungen und Laufzeitdaten korrekt sind.
- Für echte Laufzeittests müssen die Netzwerkantworten jedes Moduls geprüft werden. Ein `404` ist anhand von HTTP-Status und JSON-Antwort zu unterscheiden: fehlende Pages Function/Route, unbekannte Serverfunktion oder fehlende Supabase-Ressource sind unterschiedliche Fehler.

## Prüf-Reihenfolge
1. `GET /api/health` – API und Supabase-Verbindung.
2. `GET /api/health?deep=1` – Tabellenverfügbarkeit, sofern der Health-Endpunkt diese Prüfung aktiviert.
3. Anmeldung und Sitzung: `login`, `getCurrentUser`, `getSessionInfo`, `getMyPermissions`, `logout`.
4. CRUD pro Modul: Lesen, Erstellen, Ändern, Löschen/Archivieren und Berechtigungsfehler.
5. Supabase-Spalten mit den tatsächlich verwendeten Feldern vergleichen; nicht aufgrund eines einzelnen `404` neue Tabellen oder Spalten hinzufügen.
6. Browser-Konsole und Network-Tab für jeden Fehler sichern: Request-Methode, URL, Status und Response-Body; keine Secrets veröffentlichen.

## Deploy-Hinweis
Cloudflare Pages Functions werden nur mitdeployt, wenn `functions/` im Pages-Projektroot neben `public/` liegt und das Projekt über Wrangler oder Git-Build veröffentlicht wird. Ein reiner Upload des `public/`-Ordners enthält keine Functions.


## Datenquellenkorrektur (25.10.2026)
- `getFines`, `getLawyers`, `getWarrants`, `getWarrantStatistics` und `refreshWarrantsCache` werden über `GOOGLE_SHEETS_API_URL` an die allowlist-basierte Apps-Script-Bridge geleitet.
- `fines`, `lawyers` und `warrants` sind daher keine erforderlichen Supabase-Tabellen mehr.
- Streifenblatt/Patrols, Beamtenverwaltung, Akten und weitere migrierte Module bleiben bei ihren Cloudflare-/Supabase-Handlern.
- Die statische Methodenzuordnung ist kein Laufzeittest. Die drei Google-Sheet-Module müssen nach Bereitstellung der Apps-Script-Bridge praktisch getestet werden.


## Nachprüfung Phase 3.6
Die statische Prüfung hat konkrete Laufzeitprobleme in `getWantedConfig`, der Personalakten-Normalisierung und der Streifenmitglieder-Rückgabe ergeben; diese sind in Phase 3.6 korrigiert. Zusätzlich wurde `getApiDiagnostics` ergänzt, um reale Spaltenabweichungen aus der eigenen Supabase-Instanz zu erkennen. Die Methode muss nach Deployment mit einem Masterkonto ausgeführt werden; die Ausgabe ist anschließend für die weitere Laufzeitprüfung maßgeblich.
