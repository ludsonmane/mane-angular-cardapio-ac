(function () {
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  try {
    fbq("init", "1304566921361961");
    fbq("track", "PageView");
    console.log("[MA] Pixel init ok");
  } catch (e) {
    console.warn("[MA] Pixel init erro:", e);
  }

  // promessa para aguardar fbq (usada no outro arquivo)
  window.fbqReady = new Promise((resolve) => {
    const t0 = Date.now();
    (function loop() {
      if (typeof window.fbq === "function") return resolve(true);
      if (Date.now() - t0 > 8000) return resolve(false);
      setTimeout(loop, 50);
    })();
  });
})();
