/* Cloudflare Pages adapter for the legacy callback-shaped frontend.
   No Google Apps Script runtime is required. */
(() => {
  const tokenKey = "fib_mdt_session";
  const endpoints = {
    login: "/api/auth/login",
    requestAccount: "/api/auth/register",
    getCurrentUser: "/api/auth/session",
    getMyPermissions: "/api/auth/permissions",
    logout: "/api/auth/logout",
    changeOwnPassword: "/api/auth/password",
    uploadOwnProfileImage: "/api/auth/profile-image",
    removeOwnProfileImage: "/api/auth/profile-image/remove",
    getExternalRecord: "/api/records/external"
  };
  function apiError(payload, status) {
    const e = new Error(payload?.message || payload?.error || `API-Fehler (HTTP ${status})`);
    e.status = status;
    e.code = payload?.code;
    return e;
  }
  async function invoke(method, args) {
    if (method === "include") {
      const rawName = String(args[0] || "").replace(/\\.html$/i, "");
      const pages = {
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
      const filename = pages[rawName];
      if (!filename) throw new Error(`Diese Seite ist nicht freigegeben: ${rawName}`);
      // These files contain only the client-side page shell. Data and mutations must be served by authenticated APIs.
      const response = await fetch(`/pages/${filename}`, { credentials: "same-origin", headers: { "Accept": "text/html" } });
      const body = await response.text();
      if (!response.ok) {
        let parsed; try { parsed = JSON.parse(body); } catch {}
        throw apiError(parsed || {message: body || "Seite konnte nicht geladen werden."}, response.status);
      }
      return body;
    }
    const url = endpoints[method];
    if (!url) throw new Error(`Noch nicht migrierte Serverfunktion: ${method}`);
    const body = { args };
    // The legacy client explicitly supplies the token for most functions; add it for the new API contract.
    body.token = sessionStorage.getItem(tokenKey) || "";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(body)
    });
    let payload = {};
    try { payload = await response.json(); } catch {}
    if (!response.ok) throw apiError(payload, response.status);
    return payload;
  }
  function makeRunner() {
    let success = null;
    let failure = null;
    let used = false;
    const proxy = new Proxy({}, {
      get(_target, property) {
        if (property === "withSuccessHandler") return fn => { success = fn; return proxy; };
        if (property === "withFailureHandler") return fn => { failure = fn; return proxy; };
        if (property === "then") return undefined;
        return (...args) => {
          if (used) throw new Error("Ein CloudApi-Runner kann nur einen Aufruf ausführen.");
          used = true;
          invoke(String(property), args)
            .then(result => { if (typeof success === "function") success(result); })
            .catch(error => {
              if (typeof failure === "function") failure(error);
              else console.error("Cloud API:", error);
            });
        };
      }
    });
    return proxy;
  }
  window.CloudApi = { run: makeRunner() };
  // Each chain must get fresh callback state; expose a getter rather than one shared runner.
  Object.defineProperty(window.CloudApi, "run", { configurable: false, get: makeRunner });
})();
