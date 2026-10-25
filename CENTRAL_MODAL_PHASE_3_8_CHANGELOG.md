# FIB MDT – Phase 3.8 Central Modal

## Fixes
- The global modal manager now supports both the current `saveVisible/onSave` API and the older `buttons: [...]` API. This restores the create/save/cancel actions in the Fahndungsregister, which were being ignored by the manager.
- Systemverwaltung now opens its dialogs through `FIB_MDT_MODAL` instead of its separate local modal shell. Async callback errors reset the shared busy state so the dialog can be retried.
- Personalakte now mounts its existing live modal content inside the shared global shell, preserving element IDs, listeners and state. Closing through X/Escape restores the content to its host instead of discarding it.
- The Streifenpartner picker and partner-position controls have consistent styling; the previously unstyled browser-default buttons have been styled to match the MDT.
- The shared select enhancement continues to handle dynamically injected select elements, including selects inside modals.

## Validation
- JavaScript syntax check passed for all 21 inline scripts found in `public/index.html` and `public/pages/*.html`.
- `functions/api/[[path]].js` passes `node --check`.
- Live Supabase / deployed browser tests were not available in this local build. The exact database error, if Fahndungen still fail after this update, should be captured from the API response/console because it may then be a table-schema issue rather than a modal action issue.

## Deployment
Use the same deployment command as the previous phase from the project root:

```bash
npm run deploy
```

Keep `functions/`, `public/`, and `wrangler.toml` together at the project root. Do not upload only the `public` folder through the dashboard if you want the Pages Functions deployed.
