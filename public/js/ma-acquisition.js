(function () {
  "use strict";

  const BRAND = "Mané Mercado";
  const PIXEL_ID = "1304566921361961";
  const COOKIE_DAYS = 365;

  // rotas suprimidas (tela de seleção)
  const DISABLE_FLOW_ON_PATHS = ["/location-selection", "/selecionar-unidade", "/unidade"];

  const K = { consent: "ma_consent_v1", visits: "ma_visit_count_v1", first: "ma_first_seen_v1" };

  /* ===== PATH (hash-friendly) ===== */
  function getPath() {
    if (location.hash && location.hash.startsWith("#/")) return location.hash.substring(1);
    return location.pathname || "/";
  }
  function isSuppressed(path = getPath()) {
    return DISABLE_FLOW_ON_PATHS.some((p) => path.startsWith(p));
  }

  /* ===== Storage ===== */
  function isLocalhost(h) { return h === "localhost" || h === "127.0.0.1" || h.endsWith(".local"); }
  function setCookie(name, val, days) {
    const d = new Date(); d.setTime(d.getTime() + days * 864e5);
    const base = `${name}=${encodeURIComponent(val)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
    document.cookie = isLocalhost(location.hostname) ? base : `${base};domain=${location.hostname}`;
  }
  function getCookie(name) {
    const n = name + "=";
    for (const part of document.cookie.split(";")) { const c = part.trim(); if (c.indexOf(n) === 0) return decodeURIComponent(c.substring(n.length)); }
    return null;
  }
  function setLS(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  function getLS(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } }
  function setSS(k, v) { try { sessionStorage.setItem(k, v); } catch {} }
  function getSS(k) { try { return sessionStorage.getItem(k); } catch { return null; } }
  function saveKV(k, v) { setCookie(k, v, COOKIE_DAYS); setLS(k, v); }
  function readKV(k) {
    const c = getCookie(k); if (c !== null) { setLS(k, c); return c; }
    const l = getLS(k); if (l !== null) { setCookie(k, l, COOKIE_DAYS); return l; }
    return null;
  }

  /* ===== Unit (usa se existir) ===== */
  function setUnit(slug) {
    try {
      localStorage.setItem("ma_unit", slug);
      setSS("ma_unit", slug);
      console.log("[MA] unit", slug);
    } catch {}
  }
  function getUnit() { return localStorage.getItem("ma_unit") || getSS("ma_unit") || undefined; }

  /* ===== Visitas + envio ===== */
  function bumpVisitCount() {
    let visits = Number(readKV(K.visits) || 0);
    if (!readKV(K.first)) { saveKV(K.first, Date.now().toString()); visits = 1; }
    else { visits = Math.max(1, visits + 1); }
    saveKV(K.visits, String(visits));
    return visits;
  }

  function sendMetaEvent(eventName, params) {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params || {});
      console.log("[MA] fbq.trackCustom", eventName, params);
      return;
    }
    try {
      const q = new URLSearchParams();
      q.set("id", PIXEL_ID); q.set("ev", eventName);
      q.set("dl", location.href); q.set("rl", document.referrer || "");
      q.set("if", "false"); q.set("ts", String(Date.now()));
      if (params && typeof params === "object") for (const [k, v] of Object.entries(params)) q.set(`cd[${k}]`, String(v));
      const img = new Image(1, 1); img.src = `https://www.facebook.com/tr?${q.toString()}`;
      console.log("[MA] beacon", img.src);
    } catch (e) { console.warn("[MA] beacon error", e); }
  }

  async function waitForFbq(maxMs = 7000) {
    return new Promise((resolve) => {
      const t0 = Date.now();
      (function loop() {
        if (typeof window.fbq === "function") return resolve(true);
        if (Date.now() - t0 > maxMs) return resolve(false);
        setTimeout(loop, 50);
      })();
    });
  }

  async function fireEvents() {
    const path = getPath();
    if (isSuppressed(path)) { console.log("[MA] suppressed on", path); return; }

    const consent = readKV(K.consent);
    if (consent !== "granted") { console.log("[MA] abort: consent not granted"); return; }

    // unit agora é OPCIONAL — usamos se houver
    const unit = getUnit();

    if (sessionStorage.getItem("ma_fired_once") === "1") { console.log("[MA] skip: already fired"); return; }

    try { const ok = await (window.fbqReady || waitForFbq()); console.log("[MA] fbq ready:", !!ok); } catch {}

    sessionStorage.setItem("ma_fired_once", "1");

    const visits = bumpVisitCount();
    const status = visits === 1 ? "NewCustomer" : "RecurringCustomer";
    const base = { brand: BRAND, customerStatus: status, visitNumber: visits };
    if (unit) base.unit = unit;

    sendMetaEvent("MenuOpen", base);
    if (visits === 1) sendMetaEvent("NewCustomer", base);
    else              sendMetaEvent("RecurringCustomer", base);

    console.log("[MA] FIRED", base);
  }

  /* ===== Consent + URL ===== */
  function accept() { saveKV(K.consent, "granted"); console.log("[MA] consent=granted"); maybeFireNow(); }
  function deny()   { saveKV(K.consent, "denied");   console.log("[MA] consent=denied"); }
  function ensureFromUrl() {
    const m = getPath().match(/^\/cardapio\/([^\/?#]+)/i);
    if (!m) return;
    const slug = decodeURIComponent(m[1]);
    if (!getUnit()) setUnit(slug);
    if (readKV(K.consent) !== "granted") accept();
  }

  // dispara imediatamente quando já houver consent (e opcionalmente unit)
  function maybeFireNow() { setTimeout(() => { fireEvents(); }, 0); }

  // API pública
  function runIfConsented() { fireEvents(); }
  function fireNow() { sessionStorage.removeItem("ma_fired_once"); fireEvents(); }
  window.MA = Object.assign(window.MA || {}, { accept, deny, setUnit, runIfConsented, fireNow });

  /* ===== Boot ===== */
  (function boot() {
    ensureFromUrl();

    const path = getPath();
    const consent = readKV(K.consent);
    const unit = getUnit();
    console.log("[MA] boot", { path, suppressed: isSuppressed(path), consent, unit });

    if (consent === "granted" && !isSuppressed(path)) {
      maybeFireNow();
    }

    window.addEventListener("hashchange", () => { maybeFireNow(); });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") maybeFireNow();
    });
  })();
})();
