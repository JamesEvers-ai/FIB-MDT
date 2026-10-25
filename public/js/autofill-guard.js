/* FIB MDT – Autofill guard
 * Prevents saved login credentials from being copied into unrelated MDT fields.
 * Login and account-creation credentials keep explicit, correct autocomplete semantics.
 */
(function () {
  "use strict";

  const authAutocomplete = new Map([
    ["username", "username"],
    ["password", "current-password"],
    ["registrationUsername", "username"],
    ["registrationPassword", "new-password"],
    ["registrationPasswordConfirm", "new-password"],
    ["profileCurrentPassword", "current-password"],
    ["profileNewPassword", "new-password"],
    ["profileConfirmPassword", "new-password"],
    ["createUserPassword", "new-password"]
  ]);

  const processed = new WeakSet();

  function isTextEntry(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (el instanceof HTMLTextAreaElement) return true;
    if (!(el instanceof HTMLInputElement)) return el.isContentEditable;
    return ["text", "search", "email", "tel", "url", "password", "number"].includes((el.type || "text").toLowerCase());
  }

  function protect(el) {
    if (!isTextEntry(el) || processed.has(el)) return;
    processed.add(el);

    const id = el.id || "";
    const form = el.closest("form");
    const isLoginCredential = id === "username" || id === "password";
    const isRegistrationCredential = id === "registrationUsername" || id === "registrationPassword" || id === "registrationPasswordConfirm";
    const isProfilePassword = id === "profileCurrentPassword" || id === "profileNewPassword" || id === "profileConfirmPassword";

    if (authAutocomplete.has(id) && (isLoginCredential || isRegistrationCredential || isProfilePassword || id === "createUserPassword")) {
      el.setAttribute("autocomplete", authAutocomplete.get(id));
    } else if (el instanceof HTMLInputElement && el.type.toLowerCase() === "password") {
      // Non-login password fields are creation/reset fields, never saved-login targets.
      el.setAttribute("autocomplete", "new-password");
    } else {
      el.setAttribute("autocomplete", "off");
    }

    // Hints for common password managers; these are harmless to ordinary form logic.
    el.setAttribute("data-lpignore", "true");
    el.setAttribute("data-1p-ignore", "true");
    el.setAttribute("data-bwignore", "true");
    el.setAttribute("data-form-type", "other");

    if (el.isContentEditable) el.setAttribute("spellcheck", "false");
    if (form && form.id !== "loginForm" && form.id !== "registrationForm") {
      form.setAttribute("autocomplete", "off");
    }
  }

  function scan(root) {
    if (!root) return;
    if (root instanceof HTMLElement && isTextEntry(root)) protect(root);
    if (root.querySelectorAll) {
      root.querySelectorAll("input, textarea, [contenteditable='true']").forEach(protect);
    }
  }

  function init() {
    scan(document);
    const observer = new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) scan(node);
        });
      });
    });
    if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
