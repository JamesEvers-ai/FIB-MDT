# Phase 3.13 – Opera GX Autofill & Aktenmodal

- Verstärkter Autofill-Schutz für Chromium-basierte Browser: Modal-Decoy-Felder, `autocomplete="new-password"` auf Nicht-Login-Feldern und Password-Manager-Hinweise.
- Das explizite Login-/Registrierungsverhalten bleibt anhand der bekannten Feld-IDs erhalten.
- Aktenmodal erhält eine eigene responsive Größenklasse: bis 1080px breit, dynamische Viewport-Höhe und scrollbarer Inhaltsbereich erst bei Platzmangel.
- Akteninhalt-Textarea ist standardmäßig deutlich größer (45vh, begrenzt durch Viewport), auf kleinen Displays angepasst.
- Bestehende APIs und Datenbankstruktur bleiben unverändert.

Hinweis: Browser und Erweiterungen können Autofill-Verhalten eigenständig steuern. Der Schutz ist robuster, kann aber bei Opera GX nicht für jede Version und jede Passwortmanager-Erweiterung garantiert werden.
