# FIB MDT – Phase 3.39: Ten Code in der oberen Leiste

- Ten-Code-Auswahl sitzt in der globalen oberen Einsatzleiste neben Status, Einsatzort und Fahrzeug.
- Ten Code wird beim Dienstantritt an die Streife übergeben und bei Auswahlwechsel separat gespeichert.
- Ten Code wird in der Leitstellenliste als nicht-editierbare Anzeige dargestellt; Änderung erfolgt über die obere Leiste.
- Neuer API-Endpunkt `setPatrolTenCode` ändert ausschließlich `patrols.status` und `updated_at`. Dadurch werden beim Wechsel keine anderen Streifenfelder/Mitglieder erneut geschrieben.
- Beim Wechsel von Einsatzort, Tätigkeit oder Fahrzeug wird der vorhandene Ten Code beibehalten, statt aus Tätigkeit oder Funkrufname abgeleitet zu werden.

## Teststatus
- JavaScript-Syntax der Cloudflare Pages Function geprüft.
- Inline-JavaScript der Hauptseite syntaktisch geprüft.
- Live-Test gegen Cloudflare/Supabase nicht durchgeführt.
