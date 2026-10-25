# Phase 3.9 – Zentrale Modal- und Dropdown-Konsistenz

- Der globale Modal-Manager bietet `FIB_MDT_MODAL.confirm()` für einheitliche Bestätigungsdialoge.
- Das Entfernen einer Streife verwendet nun den zentralen Bestätigungsdialog statt `window.confirm()`.
- Der Button zum Entfernen eines Streifenpartners hat eine vollständige eigene MDT-Optik und Fokuszustand.
- Der globale Select-Manager überspringt versteckte Backing-Selects aus bestehenden benutzerdefinierten Controls, damit keine zusätzlichen/duplizierten Dropdowns entstehen.
- Modal-Abstände, Typografie, Header/Footer und die Dropdown-Optik in Personalakte/Systemverwaltung wurden angeglichen.

Hinweis: Der Live-Test gegen die produktive Cloudflare-/Supabase-Instanz ist nicht Bestandteil dieser lokalen Prüfung.
