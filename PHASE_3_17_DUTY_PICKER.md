# Phase 3.17 – Leitstellen-Diensteinschub

- Status-/Einsatzort-Chips in der globalen Kopfzeile öffnen in der Leitstelle einen schwebenden Auswahlbereich.
- Auswahlraster ist in blaue Einsatzorte/Gebiete und gelb-orange Tätigkeiten gegliedert.
- Auswahlfläche hat eigene Scrollfläche, `overscroll-behavior: contain`, passt Position/Höhe an den Viewport an und schließt per Escape, X oder Klick außerhalb.
- Der Button „Aus dem Dienst gehen“ steht beim Filterbereich der Leitstelle.
- Der Auswahlzustand wird lokal im Browser gespeichert.

**Wichtiger Integrationshinweis:** Diese Version stellt die modulare Auswahloberfläche bereit und aktualisiert die Kopfzeile. Sie ist noch nicht an einen serverseitigen Dienststatus-Endpunkt gebunden, weil in der bisherigen Phase 3.16 kein entsprechender Dienststatus-Endpunkt erkennbar ist. Die Auswahl ist daher zunächst UI-/Browserzustand und kein verbindlicher, zwischen Benutzern synchronisierter Dienststatus. Die bestehende Streifenverwaltung bleibt separat erhalten.
