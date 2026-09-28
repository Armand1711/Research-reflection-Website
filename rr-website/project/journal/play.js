/* ============================================================
   play.js: play mode. Turns the journal into a game you play:
   a chapter select screen (each section is a chapter), a loading
   card between chapters, and an in-level HUD with next / back.
   The sections themselves are the ones app.js renders, so every
   bit of content, and every trophy in game.js, works the same.
   Reader mode (Options > Reader mode, or ?mode=read) is the plain
   scrolling journal. Depends on trophies.js; app.js calls
   RRPlay.onRender(sem) after each render.
   ============================================================ */
(function () {
  "use strict";
  var RR = window.RR;
  if (!RR) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };

  var SEM = 1, chapters = [], cur = -1, sel = 0, view = "none";   // view: none | hub | level
  var mode = readMode(), ui = null, loading = null, tickTimer = null;

  function readMode() {
    var q = /[?&]mode=(read|play)\b/.exec(location.search);
    if (q) return q[1];
    try { return localStorage.getItem("rr420.mode") === "read" ? "read" : "play"; } catch (e) { return "play"; }
  }
  function G() { return window.RRGame || {}; }
  function busy() { return G().busy ? G().busy() : false; }
  function sfx(n) { var s = G().sfx; if (s && s[n]) s[n](); }
  function quick() {
    try { if (localStorage.getItem("rr420.rm") === "1") return true; } catch (e) {}
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function lastKey() { return "rr420.p.last.s" + SEM; }

  /* ---------- styles ---------- */
  var css =
    "body.rrp-on{padding-left:0}" +
    "body.rrp-on .nav,body.rrp-on .foot{display:none}" +
    "body.rrp-on #app>.section{display:none}" +
    "body.rrp-on #app>.section.rrp-cur{display:block;border-top:0;padding-top:clamp(100px,15vh,150px)}" +
    "body.rrp-on #app>.section.cover.rrp-cur{display:flex}" +
    "body.rrp-on .rrp-cur .s-head .kicker{display:none}" +   /* the HUD names the chapter */
    "body.rrp-level .rrg-toasts{top:74px}" +                  /* trophy pop-ups sit below the HUD */
    "body.rrp-padnav .rrp-cur :focus{outline:2px solid var(--cream)!important;outline-offset:4px}" +
    "body.rrp-on .rrp-cur [data-rrp-start]:focus{outline:none!important}" +
    "@media (max-width:720px){body.rrp-on{padding-bottom:0}body.rrp-on .rrg-chip{bottom:18px}}" +

    ".rrp-k{display:inline-grid;place-items:center;min-width:24px;height:24px;padding:0 6px;border-radius:999px;border:1.5px solid currentColor;font:600 11px/1 var(--sans);letter-spacing:0}" +

    /* chapter select */
    ".rrp-hub{position:fixed;inset:0;z-index:800;background:#0a0705;color:#fff;font-family:var(--sans);overflow:hidden;opacity:0;visibility:hidden;transition:opacity .45s ease,visibility 0s .45s}" +
    ".rrp-hub.open{opacity:1;visibility:visible;transition:opacity .45s ease}" +
    ".rrp-art{position:absolute;inset:0}.rrp-art svg{position:absolute;inset:0;width:100%;height:100%}" +
    ".rrp-hub .rrp-art{transform:scale(1.03);transition:transform 1.6s cubic-bezier(.2,.8,.2,1)}.rrp-hub.open .rrp-art{transform:none}" +
    ".rrp-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.1) 36%,rgba(0,0,0,.35) 58%,rgba(0,0,0,.86))}" +
    ".rrp-top{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:clamp(18px,3vh,30px) clamp(20px,5vw,80px) 0}" +
    ".rrp-top small{display:block;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.66)}" +
    ".rrp-top b{display:block;font:400 clamp(17px,1.6vw,22px)/1.2 var(--serif);margin-top:3px}" +
    ".rrp-top__r{display:flex;align-items:center;gap:18px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}" +
    ".rrp-top__r svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;vertical-align:-3px;margin-right:6px}" +
    ".rrp-row{position:absolute;left:0;right:0;top:clamp(88px,14vh,140px);display:flex;gap:clamp(10px,1.2vw,18px);padding:16px clamp(20px,5vw,80px) 26px;overflow-x:auto;scrollbar-width:none}" +
    ".rrp-row::-webkit-scrollbar{display:none}" +
    ".rrp-card{position:relative;flex:none;width:clamp(118px,11vw,166px);height:clamp(150px,14vw,210px);border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(14,11,8,.5);backdrop-filter:blur(10px);color:#fff;text-align:left;padding:14px;display:flex;flex-direction:column;cursor:pointer;opacity:.82;transition:transform .45s cubic-bezier(.2,.8,.2,1),border-color .25s,background .25s,box-shadow .35s,opacity .25s}" +
    ".rrp-card:hover{opacity:1;border-color:rgba(255,255,255,.4)}" +
    ".rrp-card.sel{opacity:1;transform:scale(1.07);border-color:rgba(255,255,255,.92);background:rgba(255,255,255,.13);box-shadow:0 0 0 1px rgba(255,255,255,.3),0 18px 40px rgba(0,0,0,.5),0 0 34px color-mix(in srgb,var(--rrg-accent,#d4883a) 50%,transparent)}" +
    ".rrp-card:focus{outline:none}" +
    ".rrp-card__n{font:400 clamp(26px,2.5vw,38px)/1 var(--serif)}" +
    ".rrp-card__ic{margin-top:auto}.rrp-card__ic svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;opacity:.85}" +
    ".rrp-card__t{margin-top:8px;font:500 13.5px/1.25 var(--sans);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}" +
    ".rrp-bar{display:block;height:3px;border-radius:3px;background:rgba(255,255,255,.2);overflow:hidden}.rrp-bar i{display:block;height:100%;background:var(--rrg-accent,#d4883a);border-radius:3px;transition:width .6s}" +
    ".rrp-card .rrp-bar{margin-top:10px}" +
    ".rrp-card__ok{position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;background:var(--rrg-accent,#d4883a);color:#0d0a07;display:grid;place-items:center;font-size:12px;font-weight:700}" +
    ".rrp-info{position:absolute;left:clamp(20px,5vw,80px);right:clamp(20px,5vw,80px);bottom:clamp(84px,13vh,130px);max-width:780px}" +
    ".rrp-info__k{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.72)}" +
    ".rrp-info h1{margin:10px 0 12px;font:400 clamp(34px,5vw,76px)/1.02 var(--serif);letter-spacing:-.01em;text-shadow:0 2px 30px rgba(0,0,0,.5)}" +
    ".rrp-info p{margin:0;max-width:60ch;font-size:clamp(14px,1.2vw,17px);line-height:1.55;color:rgba(255,255,255,.84);text-shadow:0 1px 12px rgba(0,0,0,.6)}" +
    ".rrp-info__stat{display:flex;align-items:center;gap:12px;margin-top:14px;font-size:13px;color:rgba(255,255,255,.74)}.rrp-info__stat .rrp-bar{width:140px}" +
    ".rrp-play{margin-top:22px;height:48px;padding:0 28px 0 12px;border-radius:999px;border:0;background:rgba(255,255,255,.18);backdrop-filter:blur(10px);color:#fff;font:600 15px/1 var(--sans);display:inline-flex;align-items:center;gap:12px;cursor:pointer;transition:background .2s,color .2s,transform .25s}" +
    ".rrp-play:hover,.rrp-play:focus-visible{background:#fff;color:#0d0a07;outline:none;transform:scale(1.04)}" +
    ".rrp-hints{position:absolute;left:clamp(20px,5vw,80px);right:clamp(20px,5vw,80px);bottom:clamp(20px,4vh,38px);display:flex;flex-wrap:wrap;align-items:center;gap:6px 22px;font-size:13px;color:rgba(255,255,255,.72)}" +
    ".rrp-hints span,.rrp-hints button{display:inline-flex;align-items:center;gap:8px}" +
    ".rrp-hints button{background:none;border:0;color:inherit;font:inherit;padding:6px 4px;border-radius:8px;cursor:pointer}" +
    ".rrp-hints button:hover,.rrp-hints button:focus-visible{color:#fff;outline:none}" +
    ".rrp-hints .rrp-right{margin-left:auto}" +

    /* loading card */
    ".rrp-load{position:fixed;inset:0;z-index:850;background:#0a0705;color:#fff;font-family:var(--sans);opacity:0;visibility:hidden;transition:opacity .4s ease,visibility 0s .4s}" +
    ".rrp-load.on{opacity:1;visibility:visible;transition:opacity .22s ease}" +
    ".rrp-load.on .rrp-art{animation:rrpZoom 1.8s cubic-bezier(.2,.8,.2,1) both}" +
    "@keyframes rrpZoom{from{transform:scale(1.1)}to{transform:scale(1.02)}}" +
    ".rrp-load__body{position:absolute;left:clamp(24px,6vw,96px);bottom:clamp(96px,18vh,190px);max-width:min(88vw,860px)}" +
    ".rrp-load__body>*{animation:rrpUp .7s cubic-bezier(.2,.8,.2,1) both}" +
    ".rrp-load__body>:nth-child(2){animation-delay:.08s}.rrp-load__body>:nth-child(3){animation-delay:.16s}.rrp-load__body>:nth-child(4){animation-delay:.24s}" +
    "@keyframes rrpUp{from{opacity:0;transform:translateY(16px)}}" +
    ".rrp-load small{display:block;font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.72)}" +
    ".rrp-load h2{margin:12px 0 14px;font:400 clamp(40px,7vw,104px)/1 var(--serif);letter-spacing:-.01em;text-shadow:0 2px 30px rgba(0,0,0,.55)}" +
    ".rrp-load p{margin:0;max-width:58ch;font-size:clamp(14px,1.3vw,18px);line-height:1.55;color:rgba(255,255,255,.82)}" +
    ".rrp-load__obj{margin-top:18px!important;font-size:14px!important;color:rgba(255,255,255,.66)!important}" +
    ".rrp-spin{position:absolute;right:clamp(24px,4vw,56px);bottom:clamp(24px,4vh,48px);display:flex;align-items:center;gap:12px;font-size:13px;color:rgba(255,255,255,.75)}" +
    ".rrp-spin i{width:24px;height:24px;border-radius:50%;border:2px solid rgba(255,255,255,.22);border-top-color:#fff;animation:rrpSpin .9s linear infinite}" +
    "@keyframes rrpSpin{to{transform:rotate(360deg)}}" +
    ".rrp-skip{position:absolute;left:clamp(24px,6vw,96px);bottom:clamp(24px,4vh,48px);font-size:13px;color:rgba(255,255,255,.5)}" +

    /* in-level HUD */
    ".rrp-hud{position:fixed;top:0;left:0;right:0;z-index:80;display:flex;align-items:center;gap:clamp(10px,1.6vw,20px);height:62px;padding:0 clamp(14px,3vw,34px);background:linear-gradient(180deg,rgba(13,10,7,.95),rgba(13,10,7,.78));backdrop-filter:blur(12px);border-bottom:1px solid var(--hair);color:var(--cream);font-family:var(--sans)}" +
    ".rrp-hud[hidden]{display:none}" +
    ".rrp-hud button{flex:none;background:none;border:1px solid var(--hair-2);color:var(--cream);height:36px;padding:0 12px 0 7px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;font:500 13px/1 var(--sans);cursor:pointer;transition:background .2s,color .2s}" +
    ".rrp-hud button:hover,.rrp-hud button:focus-visible{background:var(--cream);color:var(--bg);outline:none}" +
    ".rrp-hud button[disabled]{opacity:.3;pointer-events:none}" +
    ".rrp-hud .rrp-k{min-width:22px;height:22px;font-size:10px}" +
    ".rrp-hud__t{flex:1;min-width:0;line-height:1.2}" +
    ".rrp-hud__t small{display:block;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand)}" +
    ".rrp-hud__t b{display:block;font:400 19px/1.25 var(--serif);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".rrp-obj{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--sand);white-space:nowrap}.rrp-obj .rrp-bar{width:90px;background:var(--hair-2)}" +
    ".rrp-obj.done span:first-child{color:var(--rrg-accent,#d4883a)}" +
    ".rrp-pager{display:flex;gap:6px}.rrp-pager button{padding:0 7px}" +
    "@media (max-width:720px){.rrp-obj,.rrp-hide-s{display:none}.rrp-hud button{padding:0 7px}.rrp-hud__t b{font-size:16px}}" +

    /* end of chapter */
    ".rrp-end{margin-top:clamp(48px,8vh,90px);padding:24px 28px;border:1px solid var(--hair-2);border-radius:14px;background:var(--bg-2);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;font-family:var(--sans)}" +
    ".rrp-end small{display:block;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand)}" +
    ".rrp-end b{display:block;margin-top:6px;font:400 22px/1.25 var(--serif);color:var(--cream)}" +
    ".rrp-end__act{display:flex;flex-wrap:wrap;gap:10px}" +
    ".rrp-end button{height:44px;padding:0 20px;border-radius:999px;border:1px solid var(--hair-2);background:transparent;color:var(--cream);font:500 14px/1 var(--sans);display:inline-flex;align-items:center;gap:10px;cursor:pointer;transition:background .2s,color .2s,border-color .2s}" +
    ".rrp-end button.pri{background:var(--rrg-accent,#d4883a);border-color:var(--rrg-accent,#d4883a);color:#0d0a07}" +
    ".rrp-end button:hover,.rrp-end button:focus-visible{background:var(--cream);border-color:var(--cream);color:var(--bg);outline:none}" +

    "@media (max-width:720px),(max-height:560px){" +
    ".rrp-hub{overflow-y:auto}.rrp-hub .rrp-art,.rrp-hub .rrp-shade{position:fixed}" +
    ".rrp-top,.rrp-row,.rrp-info,.rrp-hints{position:relative;top:auto;bottom:auto;left:auto;right:auto}" +
    ".rrp-row{margin-top:10px}.rrp-info{padding:0 20px 18px}.rrp-hints{padding:0 20px 30px}.rrp-hints .rrp-right{margin-left:0}}" +
    "@media (prefers-reduced-motion:reduce){.rrp-load.on .rrp-art,.rrp-load__body>*{animation:none}.rrp-spin i{animation-duration:2s}.rrp-card,.rrp-hub .rrp-art{transition:none}}";

  var TROPHY = '<svg viewBox="0 0 24 24"><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1.5A3 3 0 0 0 7 10.5M17 6h3v1.5a3 3 0 0 1-3 3"/><path d="M12 14v3.5M8.5 20h7M9.5 17.5h5"/></svg>';

  /* ---------- UI shell (built once) ---------- */
  function build() {
    if (ui) return;
    var s = document.createElement("style"); s.id = "rrp-css"; s.textContent = css; document.head.appendChild(s);
    ui = {};

    ui.hub = document.createElement("div");
    ui.hub.className = "rrp-hub rrp-ui"; ui.hub.setAttribute("role", "dialog"); ui.hub.setAttribute("aria-label", "Chapter select");
    ui.hub.innerHTML =
      '<div class="rrp-art" aria-hidden="true"></div><div class="rrp-shade" aria-hidden="true"></div>' +
      '<div class="rrp-top"><div><small id="rrp-sem"></small><b>Journal Development Project</b></div><div class="rrp-top__r"><span id="rrp-tro"></span><time id="rrp-clock"></time></div></div>' +
      '<div class="rrp-row" id="rrp-row" role="listbox" aria-label="Chapters"></div>' +
      '<div class="rrp-info" aria-live="polite"><div class="rrp-info__k" id="rrp-k"></div><h1 id="rrp-title"></h1><p id="rrp-desc"></p>' +
      '<div class="rrp-info__stat"><span class="rrp-bar"><i id="rrp-bar"></i></span><span id="rrp-stat"></span></div>' +
      '<button class="rrp-play" type="button" id="rrp-play"><span class="rrp-k">&#10005;</span><span id="rrp-play-l">Start chapter</span></button></div>' +
      '<div class="rrp-hints"><span><span class="rrp-k">&larr;</span><span class="rrp-k">&rarr;</span>Choose chapter</span>' +
      '<span><span class="rrp-k">&#10005;</span>Enter to play</span>' +
      '<button type="button" id="rrp-menu"><span class="rrp-k">Esc</span>Menu</button>' +
      '<button type="button" class="rrp-right" id="rrp-read"><span class="rrp-k">&#9636;</span>Reader mode</button></div>';
    document.body.appendChild(ui.hub);

    ui.load = document.createElement("div");
    ui.load.className = "rrp-load rrp-ui"; ui.load.setAttribute("aria-hidden", "true");
    document.body.appendChild(ui.load);

    ui.hud = document.createElement("header");
    ui.hud.className = "rrp-hud rrp-ui"; ui.hud.hidden = true;
    ui.hud.innerHTML =
      '<button type="button" data-hub aria-label="Back to chapter select" title="Backspace"><span class="rrp-k">&#9675;</span><span class="rrp-hide-s">Chapters</span></button>' +
      '<div class="rrp-hud__t"><small id="rrp-hud-k"></small><b id="rrp-hud-t"></b></div>' +
      '<div class="rrp-obj" id="rrp-obj"><span></span><span class="rrp-bar"><i></i></span></div>' +
      '<div class="rrp-pager"><button type="button" data-step="-1" aria-label="Previous chapter" title="Previous chapter (Q)"><span class="rrp-k">L1</span></button>' +
      '<button type="button" data-step="1" aria-label="Next chapter" title="Next chapter (E)"><span class="rrp-k">R1</span></button></div>';
    document.body.appendChild(ui.hud);

    $("#rrp-play").addEventListener("click", function () { play(sel); });
    $("#rrp-menu").addEventListener("click", function () { if (G().openMenu) G().openMenu("main"); });
    $("#rrp-read").addEventListener("click", function () { setMode("read"); });
    ui.hud.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.hasAttribute("data-hub")) openHub(true);
      else step(Number(b.dataset.step));
    });
    ui.load.addEventListener("click", function () { if (loading) loading(); });
    document.addEventListener("pointerdown", function () { document.body.classList.remove("rrp-padnav"); });

    setInterval(clock, 15000); clock();
  }
  function clock() { var c = $("#rrp-clock"); if (c) c.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }

  /* ---------- chapters (read from the journal's own nav) ---------- */
  function describe(id, sec) {
    var sub = $(".s-sub", sec); if (sub) return sub.textContent;
    if (id === "cover") { var p = $(".cover__intro", sec); return p ? p.textContent : ""; }
    if (id === "brief") return "The rules of the run: what the journal has to do, and the key word it is marked against.";
    if (/^artist/.test(id)) { var b = $(".artist__bio p", sec); return b ? b.textContent : ""; }
    if (id === "work") return "The practical projects these ideas shaped: " + $$(".theme h3", sec).map(function (h) { return h.textContent; }).join(" and ") + ".";
    return "";
  }
  function readChapters() {
    var n = 0;
    return $$(".nav__btn").map(function (b) {
      var id = b.dataset.target, sec = document.getElementById(id);
      if (!sec) return null;
      var prologue = id === "cover";
      if (!prologue) n++;
      var ic = $("svg", b);
      return { id: id, sec: sec, prologue: prologue, num: prologue ? "00" : (n < 10 ? "0" : "") + n,
        kicker: prologue ? "Prologue" : "Chapter " + (n < 10 ? "0" : "") + n,
        title: prologue ? "Prologue" : b.getAttribute("aria-label"), icon: ic ? ic.outerHTML : "", desc: describe(id, sec) };
    }).filter(Boolean);
  }
  function objective(c) {
    var st = RR.load("s" + SEM), sec = c.sec, have, total, label;
    if (c.id === "weeks") {
      var ns = $$(".week", sec).map(function (w) { return Number(w.dataset.week); });
      total = ns.length; have = ns.filter(function (n) { return st.weeks.indexOf(n) > -1; }).length;
      label = have + " of " + total + " entries opened";
    } else if (c.id === "synthesis") {
      total = $$(".flip", sec).length; have = Math.min(st.flips.length, total); label = have + " of " + total + " cards flipped";
    } else if (c.id === "wall") {
      total = $$(".note", sec).length; have = Math.min(st.notes.length, total); label = have + " of " + total + " notes collected";
    } else if (c.id === "report") {
      total = $$(".theme", sec).length; have = Math.min(st.evid.length, total); label = have + " of " + total + " pieces of evidence seen";
    } else {
      total = 1; have = st.seen[c.id] ? 1 : 0; label = have ? "Visited" : "Not visited yet";
    }
    return { have: have, total: total, pct: total ? Math.round(have / total * 100) : 0, label: label, done: total > 0 && have >= total };
  }

  /* ---------- chapter select ---------- */
  function renderHub() {
    var p = RR.progress("s" + SEM);
    $("#rrp-sem").textContent = "Semester " + SEM + " · Chapter select";
    $("#rrp-tro").innerHTML = TROPHY + p.earned + " / " + p.total;
    $(".rrp-art", ui.hub).innerHTML = G().art ? G().art(SEM, "H") : "";
    var row = $("#rrp-row");
    row.innerHTML = chapters.map(function (c, i) {
      var o = objective(c);
      return '<button class="rrp-card' + (o.done ? " is-done" : "") + '" type="button" role="option" data-i="' + i + '" aria-label="' + esc(c.kicker + ": " + c.title + ". " + o.label) + '">' +
        '<span class="rrp-card__n">' + c.num + '</span><span class="rrp-card__ic" aria-hidden="true">' + c.icon + '</span>' +
        '<span class="rrp-card__t">' + esc(c.title) + '</span><span class="rrp-bar"><i style="width:' + o.pct + '%"></i></span>' +
        (o.done ? '<span class="rrp-card__ok" aria-hidden="true">&#10003;</span>' : "") + "</button>";
    }).join("");
    $$(".rrp-card", row).forEach(function (b) {
      b.addEventListener("click", function () { var i = Number(b.dataset.i); if (i === sel) play(i); else select(i); });
    });
    select(sel, true);
  }
  function select(i, silent) {
    if (!chapters.length) return;
    sel = Math.max(0, Math.min(chapters.length - 1, i));
    var c = chapters[sel], o = objective(c), seen = RR.load("s" + SEM).seen[c.id];
    $$(".rrp-card", ui.hub).forEach(function (b, k) {
      b.classList.toggle("sel", k === sel); b.tabIndex = k === sel ? 0 : -1; b.setAttribute("aria-selected", k === sel ? "true" : "false");
    });
    $("#rrp-k").textContent = c.kicker;
    $("#rrp-title").textContent = c.title;
    $("#rrp-desc").textContent = c.desc;
    $("#rrp-bar").style.width = o.pct + "%";
    $("#rrp-stat").textContent = o.done ? o.label + " · Complete" : o.label;
    $("#rrp-play-l").textContent = o.done ? "Replay chapter" : (seen || o.have ? "Continue chapter" : "Start chapter");
    var card = $$(".rrp-card", ui.hub)[sel];
    if (card) {
      if (!busy() && view === "hub") card.focus({ preventScroll: true });
      card.scrollIntoView({ block: "nearest", inline: "center", behavior: quick() || silent ? "auto" : "smooth" });
    }
    if (!silent) sfx("move");
  }
  function openHub(back) {
    build();
    if (loading) { loading = null; ui.load.classList.remove("on"); }
    view = "hub"; cur = -1; markCurrent(); stopTick();
    document.body.classList.remove("rrp-level");
    ui.hud.hidden = true;
    renderHub();
    ui.hub.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    var app = $("#app"); if (app) app.inert = true;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    if (back) sfx("back");
    refocus();
  }
  function refocus() {
    if (view !== "hub" || busy()) return;
    var card = $$(".rrp-card", ui.hub)[sel]; if (card) card.focus({ preventScroll: true });
  }

  /* ---------- playing a chapter ---------- */
  function play(i) {
    var c = chapters[i]; if (!c) return;
    sfx("select");
    try { localStorage.setItem(lastKey(), c.id); } catch (e) {}
    showLoader(c, function () { enterLevel(i); });
  }
  function showLoader(c, done) {
    if (quick()) { done(); return; }
    var o = objective(c);
    ui.load.innerHTML =
      '<div class="rrp-art">' + (G().art ? G().art(SEM, "L") : "") + '</div><div class="rrp-shade"></div>' +
      '<div class="rrp-load__body"><small>Semester ' + SEM + " · " + esc(c.kicker) + "</small><h2>" + esc(c.title) + "</h2><p>" + esc(c.desc) + "</p>" +
      '<p class="rrp-load__obj">' + (o.done ? "Chapter complete · " : "Objective · ") + esc(o.label) + "</p></div>" +
      '<div class="rrp-skip">Press any button to skip</div><div class="rrp-spin"><i></i>Loading</div>';
    ui.load.classList.add("on");
    var t = null, fin = function () {
      if (loading !== fin) return;
      loading = null; clearTimeout(t);
      done();
      setTimeout(function () { ui.load.classList.remove("on"); }, 40);
    };
    loading = fin;
    t = setTimeout(fin, 1500);
  }
  function enterLevel(i) {
    var c = chapters[i]; if (!c) return;
    view = "level"; cur = i; sel = i;
    document.body.classList.add("rrp-level");
    ui.hub.classList.remove("open");
    document.documentElement.style.overflow = "";
    var app = $("#app"); if (app) app.inert = false;
    markCurrent();
    ensureEnd(c);
    window.scrollTo({ top: 0, behavior: "instant" });
    ui.hud.hidden = false;
    $("#rrp-hud-k").textContent = "Semester " + SEM + " · " + c.kicker;
    $("#rrp-hud-t").textContent = c.title;
    $('[data-step="-1"]', ui.hud).disabled = i === 0;
    $('[data-step="1"]', ui.hud).disabled = i === chapters.length - 1;
    try { history.replaceState(null, "", location.pathname + location.search + "#" + c.id); } catch (e) {}
    tick(); startTick();
    var h = $("h1, h2", c.sec);
    if (h) { h.tabIndex = -1; h.setAttribute("data-rrp-start", ""); h.focus({ preventScroll: true }); }
  }
  function step(d) {
    if (view !== "level") return;
    var n = cur + d;
    if (n < 0 || n >= chapters.length) return;
    play(n);
  }
  function markCurrent() {
    chapters.forEach(function (c, k) { c.sec.classList.toggle("rrp-cur", view === "level" && k === cur); });
  }
  function ensureEnd(c) {
    if ($(".rrp-end", c.sec)) return;
    var i = chapters.indexOf(c), next = chapters[i + 1];
    var box = document.createElement("div");
    box.className = "rrp-end";
    box.innerHTML = '<div><small>End of ' + (c.prologue ? "the prologue" : c.kicker.toLowerCase()) + '</small><b class="rrp-end__obj"></b></div><div class="rrp-end__act">' +
      (next ? '<button type="button" class="pri" data-go="next"><span class="rrp-k">&#10005;</span>Next: ' + esc(next.title) + "</button>"
            : '<button type="button" class="pri" data-go="home"><span class="rrp-k">&#10005;</span>Quit to home screen</button>') +
      '<button type="button" data-go="hub"><span class="rrp-k">&#9675;</span>Chapter select</button></div>';
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-go]"); if (!b) return;
      var g = b.dataset.go;
      if (g === "next") step(1); else if (g === "hub") openHub(true); else location.href = "../../index.html#s" + SEM;
    });
    c.sec.appendChild(box);
  }
  function tick() {
    if (view !== "level" || !chapters[cur]) return;
    var o = objective(chapters[cur]), el = $("#rrp-obj");
    el.classList.toggle("done", o.done);
    $("span", el).textContent = o.done ? "Complete" : o.label;
    $("i", el).style.width = o.pct + "%";
    var end = $(".rrp-end__obj", chapters[cur].sec);
    if (end) end.textContent = o.done ? "Chapter complete · " + o.label : o.label;
  }
  function startTick() { stopTick(); tickTimer = setInterval(tick, 1000); }
  function stopTick() { clearInterval(tickTimer); tickTimer = null; }

  /* ---------- controller: move between the things you can interact with ---------- */
  function levelItems() {
    var s = chapters[cur] && chapters[cur].sec; if (!s) return [];
    return $$(".week__head, .flip, .wall-filter, .wall .note, .rrp-end button", s).filter(function (el) { return el.offsetParent !== null; });
  }
  function moveFocus(d) {
    var items = levelItems(), a = document.activeElement, i = items.indexOf(a), vh = window.innerHeight, next = null;
    document.body.classList.add("rrp-padnav");
    if (i > -1) next = items[i + d];
    else {
      var vis = items.filter(function (el) { var r = el.getBoundingClientRect(); return r.bottom > 60 && r.top < vh; });
      next = d > 0 ? vis[0] : vis[vis.length - 1];
    }
    var r = next && next.getBoundingClientRect();
    if (next && r.top > -vh * 0.25 && r.bottom < vh * 1.25) {
      next.focus({ preventScroll: true });
      next.scrollIntoView({ block: "center", behavior: quick() ? "auto" : "smooth" });
      sfx("move");
    } else {
      window.scrollBy({ top: d * vh * 0.55, behavior: quick() ? "auto" : "smooth" });
    }
  }
  function activate() {
    var a = document.activeElement, s = chapters[cur] && chapters[cur].sec;
    if (a && s && s.contains(a) && a !== document.body) a.click();
  }

  /* ---------- input ---------- */
  document.addEventListener("keydown", function (e) {
    if (mode !== "play" || view === "none" || e.altKey || e.ctrlKey || e.metaKey || busy()) return;
    if (loading) { if (e.key !== "Shift" && e.key !== "Tab") { e.preventDefault(); loading(); } return; }
    if (view === "hub") {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(sel - 1); }
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(sel + 1); }
      else if (e.key === "Home") { e.preventDefault(); select(0); }
      else if (e.key === "End") { e.preventDefault(); select(chapters.length - 1); }
      else if (e.key === "Enter" || e.key === " ") {
        var a = document.activeElement;
        if (!(a && a.tagName === "BUTTON" && ui.hub.contains(a))) { e.preventDefault(); play(sel); }
      }
      return;   // Esc falls through to game.js and opens the pause menu
    }
    if (e.key === "Backspace") { e.preventDefault(); openHub(true); }
    else if (e.key === "q" || e.key === "Q") { e.preventDefault(); step(-1); }
    else if (e.key === "e" || e.key === "E") { e.preventDefault(); step(1); }
  });

  var held = {};
  function edge(n, on, now, repeat) {
    var h = held[n];
    if (on) { if (!h) { held[n] = { r: now + 350 }; return true; } if (repeat && now >= h.r) { h.r = now + 140; return true; } return false; }
    held[n] = null; return false;
  }
  (function loop() {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [], gp = null;
    for (var k = 0; k < pads.length; k++) if (pads[k]) { gp = pads[k]; break; }
    if (gp) {
      var b = function (i) { return !!(gp.buttons[i] && gp.buttons[i].pressed); };
      var ax = gp.axes[0] || 0, now = performance.now(), any = false;
      for (var j = 0; j < gp.buttons.length; j++) if (gp.buttons[j].pressed) any = true;
      var s = { left: b(14) || ax < -0.6, right: b(15) || ax > 0.6, up: b(12), down: b(13), ok: b(0), back: b(1), tri: b(3), l1: b(4), r1: b(5), any: any };
      var live = mode === "play" && view !== "none" && !busy();
      if (!live) { Object.keys(s).forEach(function (n) { if (s[n]) held[n] = held[n] || { r: Infinity }; else held[n] = null; }); }
      else if (loading) { if (edge("any", s.any, now)) loading(); Object.keys(s).forEach(function (n) { if (n !== "any") held[n] = s[n] ? held[n] || { r: Infinity } : null; }); }
      else {
        var fired = {};
        Object.keys(s).forEach(function (n) { fired[n] = edge(n, s[n], now, n === "left" || n === "right" || n === "up" || n === "down"); });
        if (view === "hub") {
          if (fired.left || fired.up) select(sel - 1);
          if (fired.right || fired.down) select(sel + 1);
          if (fired.ok) play(sel);
          if (fired.tri && G().openMenu) G().openMenu("trophies");
        } else {
          if (fired.back) openHub(true);
          else if (fired.l1) step(-1);
          else if (fired.r1) step(1);
          else if (fired.up || fired.left) moveFocus(-1);
          else if (fired.down || fired.right) moveFocus(1);
          else if (fired.ok) activate();
          else if (fired.tri && G().openMenu) G().openMenu("trophies");
        }
      }
    }
    requestAnimationFrame(loop);
  })();

  /* ---------- modes ---------- */
  function setMode(m) {
    mode = m === "read" ? "read" : "play";
    try { localStorage.setItem("rr420.mode", mode); } catch (e) {}
    try { history.replaceState(null, "", location.pathname + location.search.replace(/([?&])mode=(read|play)&?/, "$1").replace(/[?&]$/, "") + location.hash); } catch (e) {}
    apply(null);
  }
  function apply(hash) {
    build();
    document.body.classList.toggle("rrp-on", mode === "play");
    if (mode !== "play") {
      view = "none"; cur = -1; loading = null; stopTick();
      document.body.classList.remove("rrp-level");
      ui.hub.classList.remove("open"); ui.load.classList.remove("on"); ui.hud.hidden = true;
      chapters.forEach(function (c) { c.sec.classList.remove("rrp-cur"); var e = $(".rrp-end", c.sec); if (e) e.remove(); });
      document.documentElement.style.overflow = "";
      var app = $("#app"); if (app) app.inert = false;
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    var at = -1;
    if (hash) at = chapters.map(function (c) { return c.id; }).indexOf(hash);
    if (at > -1) { sel = at; view = "hub"; play(at); return; }
    var last = null; try { last = localStorage.getItem(lastKey()); } catch (e) {}
    var li = chapters.map(function (c) { return c.id; }).indexOf(last);
    if (li < 0) { li = 0; for (var i = 0; i < chapters.length; i++) if (!objective(chapters[i]).done) { li = i; break; } }
    sel = li;
    openHub(false);
  }

  /* ---------- entry point from app.js ---------- */
  function onRender(sem) {
    SEM = sem;
    chapters = readChapters();
    apply((location.hash || "").slice(1));
  }

  window.RRPlay = {
    onRender: onRender, setMode: setMode, refocus: refocus,
    hub: function () { openHub(true); },
    view: function () { return view; },
    active: function () { return mode === "play" && view !== "none"; }
  };
})();
