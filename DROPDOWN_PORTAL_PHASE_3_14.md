# Phase 3.14 – Dropdowns im Vordergrund und Scroll-Fokus

- Zentrale Dropdown-Menüs werden beim Öffnen aus dem Modal in `document.body` verschoben. So werden sie nicht von `overflow`, `contain: paint` oder den Grenzen des Modal-Inhalts abgeschnitten.
- Das Menü wird anhand des verfügbaren Platzes ober- oder unterhalb des Auslösers positioniert und auf die verfügbare Viewporthöhe begrenzt.
- Während das Menü geöffnet ist, werden Wheel-/Touch-Scroll-Ereignisse innerhalb des Menüs nicht an den Modal-Inhalt weitergereicht; `overscroll-behavior: contain` verhindert das Scroll-Chaining an den Menügrenzen.
- Bei Fenstergrößenänderung und Scrollen wird die Position neu berechnet.
- Escape, Klick außerhalb, Tastaturnavigation und native Select-Events bleiben unterstützt.

Die Änderung benötigt keine Datenbankmigration.
