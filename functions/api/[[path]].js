import { db, json, readJson } from "../_lib/supabase.js";
import { bearer, createSession, getPermissions, publicUser, requireSession, sha256, verifyPassword } from "../_lib/auth.js";

const MIN_PASSWORD_LENGTH = 8;
const publicPages = {
  Page_Dashboard: "dashboard.html",
  Page_Agents: "agents.html",
  Page_System: "system.html",
  Page_Patrols: "patrols.html",
  Page_Records: "records.html",
  Page_Records_2: "records.html",
  Page_Announcements: "announcements.html",
  Page_Vacations: "vacations.html",
  Page_IFines: "ifines.html",
  Page_Fines: "fines.html",
  Page_Lawyers: "lawyers.html",
  Page_Warrants: "warrants.html",
  Page_Wanted: "wanted.html",
  Page_Calendar: "calendar.html",
  Page_Classification: "classification.html",
  Page_Gangs: "gangs.html",
  Page_Bonuses: "bonuses.html",
  Page_Logs: "logs.html"
};
const bad = (message, status = 400, code) => json({ success: false, message, ...(code ? { code } : {}) }, status);

async function handleAuth(path, request, env, payload) {
  const args = Array.isArray(payload.args) ? payload.args : [];
  if (path === "/api/auth/login") {
    const username = String(args[0] ?? "").trim();
    const password = String(args[1] ?? "");
    if (!username || !password) return bad("Benutzername und Passwort erforderlich.");
    const users = await db(env, "users", { query: { select: "id,username,name,rank,password_salt,password_hash,active,approved,master,profile_image", username: `ilike.${username.replace(/[%_,]/g, "")}`, limit: "1" } });
    const user = Array.isArray(users) ? users[0] : null;
    // Same generic message for unknown username and wrong password.
    if (!user || !(await verifyPassword(password, user.password_salt, user.password_hash))) return bad("Benutzername oder Passwort ist falsch.", 401, "INVALID_CREDENTIALS");
    if (user.approved !== true) return bad("Dieser Account wartet noch auf die Freigabe durch einen Master.", 403, "ACCOUNT_PENDING");
    if (user.active !== true) return bad("Dieser Benutzer ist deaktiviert.", 403, "ACCOUNT_DISABLED");
    const session = await createSession(env, user.id);
    return json({ success: true, token: session.token, expiresAt: session.expiresAt, user: publicUser(user) });
  }

  if (path === "/api/auth/register") {
    const [rawUsername, rawName, rawPassword] = args;
    const username = String(rawUsername || "").trim();
    const name = String(rawName || "").trim();
    const password = String(rawPassword || "");
    if (!username || !name || !password) return bad("Benutzername, Name und Passwort sind erforderlich.");
    if (username.length > 64 || name.length > 120) return bad("Benutzername oder Name ist zu lang.");
    if (password.length < MIN_PASSWORD_LENGTH) return bad(`Das Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen lang sein.`);
    const existing = await db(env, "users", { query: { select: "id", username: `ilike.${username.replace(/[%_,]/g, "")}`, limit: "1" } });
    if (Array.isArray(existing) && existing.length) return bad("Dieser Benutzername existiert bereits.", 409);
    const salt = [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, "0")).join("");
    const passwordHash = await sha256(salt + password);
    const id = "U" + [...crypto.getRandomValues(new Uint8Array(8))].map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase().slice(0, 12);
    const now = new Date().toISOString();
    await db(env, "users", { method: "POST", query: { select: "id" }, body: { id, username, name, rank: null, password_salt: salt, password_hash: passwordHash, active: false, approved: false, master: false, profile_image: null, created_at: now, updated_at: now }, prefer: "return=minimal" });
    return json({ success: true, message: "Der Account wurde beantragt. Ein Master muss ihn vor der ersten Anmeldung freigeben.", id });
  }

  const token = bearer(request, payload);
  if (path === "/api/auth/session") {
    const auth = await requireSession(env, args[0] || token);
    return auth ? json(publicUser(auth.user)) : json({ success: false, message: "Deine Sitzung ist abgelaufen. Bitte erneut anmelden." }, 401);
  }
  if (path === "/api/auth/permissions") {
    const auth = await requireSession(env, args[0] || token);
    if (!auth) return json({ success: false, message: "Deine Sitzung ist abgelaufen. Bitte erneut anmelden." }, 401);
    return json(await getPermissions(env, auth.user));
  }
  if (path === "/api/auth/logout") {
    const activeToken = String(args[0] || token || "");
    if (activeToken) await db(env, "fib_mdt_sessions", { method: "DELETE", query: { token_hash: `eq.${await sha256(activeToken)}` }, prefer: "return=minimal" });
    return json({ success: true });
  }
  if (path === "/api/auth/password") {
    const activeToken = String(args[0] || token || "");
    const currentPassword = args[1];
    const newPassword = args[2];
    const auth = await requireSession(env, activeToken);
    if (!auth) return json({ success: false, message: "Deine Sitzung ist abgelaufen. Bitte erneut anmelden." }, 401);
    if (!currentPassword || !newPassword) return bad("Das aktuelle und das neue Passwort müssen angegeben werden.");
    if (String(newPassword).length < MIN_PASSWORD_LENGTH) return bad(`Das neue Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen lang sein.`);
    const rows = await db(env, "users", { query: { select: "password_salt,password_hash", id: `eq.${auth.user.id}`, limit: "1" } });
    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user || !(await verifyPassword(currentPassword, user.password_salt, user.password_hash))) return bad("Das aktuelle Passwort ist falsch.", 403);
    if (currentPassword === newPassword) return bad("Das neue Passwort muss sich vom bisherigen Passwort unterscheiden.");
    const salt = [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, "0")).join("");
    await db(env, "users", { method: "PATCH", query: { id: `eq.${auth.user.id}` }, body: { password_salt: salt, password_hash: await sha256(salt + newPassword), updated_at: new Date().toISOString() }, prefer: "return=minimal" });
    return json({ success: true, message: "Passwort erfolgreich geändert." });
  }
  if (path === "/api/auth/profile-image" || path === "/api/auth/profile-image/remove") {
    return json({ success: false, message: "Profilbildverwaltung wird im nächsten Migrationsschritt von Google Drive auf Cloudflare R2 umgestellt." }, 501);
  }
  return null;
}

export async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type,Authorization" } });
  const url = new URL(request.url);
  const path = url.pathname;
  try {
    if (path.startsWith("/api/auth/")) {
      if (request.method !== "POST") return bad("Methode nicht erlaubt.", 405);
      const payload = await readJson(request);
      const response = await handleAuth(path, request, env, payload);
      if (response) return response;
    }

    if (path === "/api/pages") {
      if (request.method !== "GET") return bad("Methode nicht erlaubt.", 405);
      const token = bearer(request);
      const auth = await requireSession(env, token);
      if (!auth) return json({ message: "Deine Sitzung ist abgelaufen. Bitte erneut anmelden." }, 401);
      const name = String(url.searchParams.get("name") || "");
      const filename = publicPages[name];
      if (!filename) return json({ message: "Diese Seite ist nicht freigegeben." }, 404);
      // Page fragments are static assets. The API endpoint only authenticates and resolves an allowlisted name.
      const assetUrl = new URL(`/pages/${filename}`, url.origin);
      const response = await fetch(new Request(assetUrl, { method: "GET", headers: { "Accept": "text/html" } }));
      if (!response.ok) return json({ message: "Die Seite konnte nicht gefunden werden." }, 404);
      return new Response(await response.text(), { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
    }

    if (path === "/api/records/external") {
      return json({ success: false, message: "Die öffentliche Aktenfreigabe wird im nächsten Schritt an die bestehende Freigabelogik angepasst." }, 501);
    }

    return json({ success: false, message: "API-Endpunkt nicht gefunden." }, 404);
  } catch (error) {
    console.error("FIB MDT API error:", error);
    return json({ success: false, message: error?.message || "Interner Serverfehler." }, error?.status || 500);
  }
}
