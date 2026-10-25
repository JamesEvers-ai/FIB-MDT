# Phase 3.12 – Live Refresh + Autofill-Guard

This release combines the Phase 3.11 live-refresh/responsive-modal work with a global autofill guard.

## Autofill behavior

- Login username and password fields use explicit `autocomplete="username"` and `autocomplete="current-password"`.
- Registration and password creation fields use `username` / `new-password` semantics.
- Other text inputs, textareas and editable fields default to `autocomplete="off"` and receive best-effort ignore hints for common password managers.
- A `MutationObserver` applies the same rules to fields injected later by dynamically loaded pages and modals.
- The guard does not change field values, IDs, event handlers, or API payload construction.

## Deployment

Deploy the full project as usual. No database migration is required for this frontend-only change.

## Limitations

Some browser autofill systems and password-manager extensions may ignore `autocomplete="off"` or their own ignore hints. The app now supplies correct field semantics and best-effort hints, but no website can universally disable user-controlled password-manager behavior.
