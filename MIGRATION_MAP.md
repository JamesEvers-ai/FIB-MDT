# Current frontend calls and migration status

| Existing frontend method | Cloudflare route | Status |
|---|---|---|
| `login(username,password)` | `POST /api/auth/login` | Implemented |
| `requestAccount(username,name,password)` | `POST /api/auth/register` | Implemented |
| `getCurrentUser(token)` | `POST /api/auth/session` | Implemented |
| `getMyPermissions(token)` | `POST /api/auth/permissions` | Implemented |
| `logout(token)` | `POST /api/auth/logout` | Implemented |
| `changeOwnPassword(token,current,new)` | `POST /api/auth/password` | Implemented |
| `.include(fileName)` | `GET /api/pages?name=...` | Implemented for allowlisted static page fragments |
| `uploadOwnProfileImage(...)` | `POST /api/auth/profile-image` | Placeholder; requires R2 |
| `removeOwnProfileImage(token)` | `POST /api/auth/profile-image/remove` | Placeholder; requires R2 |
| `getExternalRecord(shareToken)` | `POST /api/records/external` | Placeholder; requires original share-token lookup |
| Patrols, records, wanted, classifications, admin functions | To be mapped | Next migration slice |

The current index still contains the original global modal manager and navigation logic. The adapter intentionally preserves its callback-shaped call pattern to reduce frontend churn in this first slice.
