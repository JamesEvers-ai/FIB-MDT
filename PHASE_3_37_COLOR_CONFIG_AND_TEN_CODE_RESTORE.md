# Phase 3.37 – Farbkonfiguration und Ten-Code-Auswahl

- Master-only patrol roster color settings remain persisted in `fib_mdt_settings` under `patrol_display_colors`.
- Color configuration now provides color pickers, editable HEX values, a live preview, and cancel/revert behavior.
- The Leitstelle header again provides a Ten-Code selector. Codes are loaded from `fib_mdt_settings` keys `patrol_ten_codes`, `ten_codes`, or `patrol_status_codes` (array or `{ codes: [...] }`); the existing default codes are used if none is configured.
- Selecting a Ten Code sets the patrol modal's status when it is open; status choices are populated from the same loaded list.

Apply the existing `supabase/migration_patrol_display_colors.sql` migration if `fib_mdt_settings` is not yet present. This package has had archive integrity and JavaScript syntax checks; it has not been live-tested against the user's Cloudflare/Supabase deployment.
