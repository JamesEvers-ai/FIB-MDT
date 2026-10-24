/* FIB MDT notification fallback for the Cloudflare build.
   Keeps the frontend resilient if a page calls one of the common notification helpers. */
(() => {
  const hostId = "fibToastHost";
  function host() {
    let el = document.getElementById(hostId);
    if (!el) {
      el = document.createElement("div");
      el.id = hostId;
      el.style.cssText = "position:fixed;right:18px;top:18px;z-index:30000;display:grid;gap:8px;max-width:min(420px,calc(100vw - 36px))";
      document.body.appendChild(el);
    }
    return el;
  }
  function notify(message, type = "info", title = "") {
    const el = document.createElement("div");
    el.style.cssText = "padding:12px 14px;border-radius:9px;border:1px solid #334155;background:#0f172a;color:#e2e8f0;box-shadow:0 12px 32px #0007;font:12px/1.5 Inter,system-ui,sans-serif";
    const color = type === "error" ? "#f87171" : type === "success" ? "#4ade80" : type === "warning" ? "#fbbf24" : "#60a5fa";
    el.style.borderLeft = "3px solid " + color;
    if (title) {
      const strong = document.createElement("strong");
      strong.textContent = title;
      strong.style.display = "block";
      strong.style.marginBottom = "3px";
      el.appendChild(strong);
    }
    const text = document.createElement("div");
    text.textContent = String(message ?? "");
    el.appendChild(text);
    host().appendChild(el);
    setTimeout(() => el.remove(), 4500);
  }
  window.FIB_MDT_Notifications = { show: notify, success: m => notify(m,"success"), error: m => notify(m,"error"), warning: m => notify(m,"warning"), info: m => notify(m,"info") };
  window.showNotification ||= (message, type) => notify(message, type);
})();
