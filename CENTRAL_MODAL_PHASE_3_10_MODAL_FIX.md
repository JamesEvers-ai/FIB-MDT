# Phase 3.10 — Modal action-state fix

## Fixes
- Reset the central modal Cancel button to enabled whenever a modal opens or closes.
- The Patrols module no longer disables Cancel while an async save is running; only the submit action is locked to prevent duplicate submissions.
- Reset stale disabled states from prior modal sessions.
- `setFooterButtons(buttons, options)` now respects `keepSave` and `keepCancel`.
- Refined modal header/body/footer spacing and normalized button height, font size and line-height.

## Deployment
Use the complete project folder and deploy with `npm run deploy`. No database migration is required for these UI-only changes.
