# Phase 3.19 – Dienstaufnahme über die Topbar

## Änderungen
- Das alte Fenster zur Streifenerstellung wird für die Dienstaufnahme nicht mehr geöffnet; der alte Button in der Streifen-Seite wird ausgeblendet.
- Die Topbar bietet jetzt Einsatzort, Tätigkeit/Status und Fahrzeug sowie den Button „In Dienst gehen“.
- Die Auswahl bleibt offen, bis alle drei Werte gesetzt und über „Status übernehmen“ bestätigt wurden.
- Der Vorgang nutzt `createPatrol` und speichert Einsatzort, Tätigkeit, Fahrzeug und Status serverseitig.
- Beim Anlegen wird der angemeldete Agent automatisch als Streifenführer/Mitglied hinzugefügt. Es ist keine manuelle Mitgliederauswahl erforderlich.
- Das Callsign wird aus dem Profil der Personalakte gelesen (`getMyPersonnelProfile`). Fehlt es, wird die Dienstaufnahme abgebrochen und eine verständliche Meldung angezeigt.
- „Aus dem Dienst gehen“ nutzt weiter `leavePatrol`, das den Agenten serverseitig entfernt und eine leere Streife beendet.

## Datenbank
Die vorhandene Migration `supabase/migration_patrols_duty_location_activity.sql` muss angewandt sein, damit `location` und `activity` in `patrols` gespeichert werden können.

## Deployment / Prüfung
Cloudflare Pages direkt hochladen/deployen wie bei den vorherigen Projektversionen. Die Syntax der Pages-API-Datei wurde mit `node --check` geprüft. Ein echter End-to-End-Test gegen die produktive Supabase-Instanz war in dieser Umgebung nicht möglich.
