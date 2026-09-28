/* Console-style way out of the journal: a "Home" chip, Esc / controller circle button,
   and a short fade-in that continues the tile-expand transition from the home screen. */
(function () {
  var sem2 = /[?&]sem=2/.test(location.search);
  var home = "../../index.html#" + (sem2 ? "s2" : "s1");

  var css = document.createElement("style");
  css.textContent =
    ".ps5-veil{position:fixed;inset:0;z-index:999;pointer-events:none;opacity:1;transition:opacity .6s ease}" +
    ".ps5-veil.out{opacity:0}" +
    ".ps5-home{position:fixed;z-index:60;right:18px;bottom:18px;display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 16px 0 12px;" +
    "border-radius:999px;border:1px solid rgba(240,232,208,.22);background:rgba(20,16,11,.82);backdrop-filter:blur(10px);" +
    "color:#F0E8D0;font:500 13px/1 Inter,system-ui,sans-serif;text-decoration:none;transition:background .2s,color .2s,transform .25s}" +
    ".ps5-home:hover,.ps5-home:focus-visible{background:#F0E8D0;color:#0D0A07;outline:none;transform:scale(1.04)}" +
    ".ps5-home kbd{font:inherit;opacity:.6;margin-left:4px}" +
    "@media (max-width:720px){.ps5-home{bottom:74px}.ps5-home kbd{display:none}}" +
    "@media (prefers-reduced-motion:reduce){.ps5-veil{transition:none}}";
  document.head.appendChild(css);

  var veil = document.createElement("div");
  veil.className = "ps5-veil";
  veil.style.background = sem2 ? "#06302f" : "#5a2a10";
  document.body.appendChild(veil);
  requestAnimationFrame(function () { requestAnimationFrame(function () { veil.classList.add("out"); }); });
  setTimeout(function () { veil.remove(); }, 800);

  var a = document.createElement("a");
  a.className = "ps5-home";
  a.href = home;
  a.setAttribute("aria-label", "Back to the home screen");
  a.innerHTML = "&#9675; Home <kbd>Esc</kbd>";
  document.body.appendChild(a);

  function go() { location.href = home; }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !e.defaultPrevented && !e.altKey && !e.ctrlKey && !e.metaKey) go();
  });

  var held = false;
  (function poll() {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < pads.length; i++) {
      var p = pads[i];
      if (p && p.buttons[1] && p.buttons[1].pressed) { if (!held) { held = true; go(); } return requestAnimationFrame(poll); }
    }
    held = false;
    requestAnimationFrame(poll);
  })();
})();
