# Phase 3.11 – Live Refresh & Responsive Modal

- Successful API writes clear the response cache and emit `fib-mdt:data-changed`.
- The app emits `fib-mdt:refresh-request` every 20 seconds while visible and idle; it does not reload the browser document.
- Lightweight CRUD modules refresh their data automatically when idle; key modules (patrols, wanted, records, agents, classifications) subscribe to refresh events.
- Cache TTL reduced from 20 to 8 seconds and concurrent identical reads are deduplicated.
- Global modal now grows to content height and only constrains/scrolls the body when it reaches the viewport limit; mobile padding is responsive.

The refresh coordinator deliberately pauses while a modal is open, the user has interacted recently, or a form field has focus, to avoid overwriting unsaved input. External live updates are polling-based (20-second interval), not server push.
