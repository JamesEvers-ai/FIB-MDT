# Phase 3.49 – Leitstellen-Auswahl stabilisieren

- Wiederherstellung des persönlichen Dienststatus wartet jetzt, bis sowohl die Personalprofil- als auch die Streifendaten verfügbar sind.
- Ein vorzeitig eintreffendes leeres Streifenergebnis kann eine aktive Streife nicht mehr fälschlich als dienstfrei melden.
- Bei erkannter aktiver Streife werden Einsatzort, Tätigkeit, Fahrzeug und Ten Code als zusammengehöriger Snapshot übernommen; veraltete lokale Werte werden nicht beigemischt.
- Die Auswahlleiste verwendet eindeutige Platzhalter und zeigt im Auswahlfenster einen Hinweis an, wenn bereits eine aktive Streife bearbeitet wird.

Hinweis: Der interne Bußgeldkatalog wird in dieser Phase noch nicht umgebaut. Vor dem Datenmodell muss geklärt werden, ob die bestehende Seite „Interne Bußgelder“ (Vorgangs-/Eintragsverwaltung) ersetzt oder um einen separaten modularen Katalog ergänzt werden soll.
