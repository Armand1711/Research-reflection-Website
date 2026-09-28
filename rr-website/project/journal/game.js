/* ============================================================
   game.js: the game layer on top of the journal.
   Title screen, trophies, trophy pop-ups, pause menu (Esc / Options),
   chapter select, collectible Gathering Wall notes, controller support.
   Nothing here locks or hides content; it only adds to it.
   Depends on trophies.js (window.RR). app.js calls RRGame.onRender(sem).
   ============================================================ */
(function () {
  "use strict";
  var RR = window.RR;
  if (!RR) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var SEM = 1, KEY = "s1", DEFS = [], st = RR.blank();
  var titleOpen = false, menuOpen = false, menuView = "main", lastFocus = null;
  var toastQ = [], toastBusy = false;
  var observers = [], timers = {};
  var launched = false, firstRender = true;
  try { launched = sessionStorage.getItem("rr420.launch") === "1"; sessionStorage.removeItem("rr420.launch"); } catch (e) {}
  var HOME = "../../index.html";
  var GRADE_NAME = { platinum: "Platinum", gold: "Gold", silver: "Silver", bronze: "Bronze" };
  var GRADES = ["platinum", "gold", "silver", "bronze"];
  var TROPHY = '<svg viewBox="0 0 24 24"><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1.5A3 3 0 0 0 7 10.5M17 6h3v1.5a3 3 0 0 1-3 3"/><path d="M12 14v3.5M8.5 20h7M9.5 17.5h5"/></svg>';

  /* ---------- sound (shares the home screen's setting) ---------- */
  function soundOn() { try { return localStorage.getItem("rr420.sound") === "1"; } catch (e) { return false; } }
  function setSound(v) { try { localStorage.setItem("rr420.sound", v ? "1" : "0"); } catch (e) {} }
  var AC = null;
  function tone(f, d, v, delay) {
    if (!soundOn()) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === "suspended") AC.resume();
      var t = AC.currentTime + (delay || 0), o = AC.createOscillator(), g = AC.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d + 0.03);
    } catch (e) {}
  }
  var sfx = {
    move: function () { tone(660, 0.06, 0.04); },
    select: function () { tone(520, 0.09, 0.05); tone(780, 0.14, 0.045, 0.07); },
    back: function () { tone(420, 0.09, 0.045); tone(300, 0.13, 0.035, 0.06); },
    trophy: function () { tone(880, 0.18, 0.05); tone(1175, 0.18, 0.05, 0.12); tone(1568, 0.34, 0.05, 0.24); }
  };

  /* ---------- styles ---------- */
  var css =
    ".rrg-toasts{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:900;pointer-events:none;width:max-content;max-width:94vw}" +
    ".rrg-toast{display:flex;align-items:center;gap:14px;min-width:280px;max-width:min(94vw,440px);padding:11px 24px 11px 14px;border-radius:999px;background:rgba(14,12,9,.95);border:1px solid rgba(240,232,208,.22);box-shadow:0 14px 40px rgba(0,0,0,.55);color:var(--cream);animation:rrgToast 4.6s cubic-bezier(.2,.8,.2,1) both}" +
    "@keyframes rrgToast{0%{transform:translateY(-140%);opacity:0}9%{transform:none;opacity:1}88%{transform:none;opacity:1}100%{transform:translateY(-140%);opacity:0}}" +
    "@keyframes rrgFade{0%,100%{opacity:0}10%,88%{opacity:1}}" +
    ".rrg-toast svg{width:36px;height:36px;flex:none;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}" +
    ".rrg-toast small{display:block;font:500 11.5px/1.2 var(--sans);color:var(--sand);margin-bottom:2px}" +
    ".rrg-toast b{display:block;font:600 15px/1.25 var(--sans)}" +
    ".rrg-g-platinum{color:#b9c7ff}.rrg-g-gold{color:#e6b84a}.rrg-g-silver{color:#c4c9d6}.rrg-g-bronze{color:#cd8544}" +

    ".rrg-chip{position:fixed;right:18px;bottom:18px;z-index:70;display:inline-flex;align-items:center;gap:10px;height:42px;padding:0 16px 0 7px;border-radius:999px;border:1px solid var(--hair-2);background:rgba(20,16,11,.88);backdrop-filter:blur(10px);color:var(--cream);font:500 13px/1 var(--sans);cursor:pointer;transition:background .2s,color .2s,transform .25s}" +
    ".rrg-chip:hover,.rrg-chip:focus-visible{background:var(--cream);color:var(--bg);outline:none;transform:scale(1.04)}" +
    ".rrg-ring{position:relative;width:30px;height:30px;display:grid;place-items:center}" +
    ".rrg-ring svg.p{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}" +
    ".rrg-ring circle{fill:none;stroke-width:2.4}.rrg-ring .bg{stroke:currentColor;opacity:.2}.rrg-ring .fg{stroke:var(--rrg-accent);stroke-linecap:round;transition:stroke-dasharray .6s}" +
    ".rrg-chip:hover .fg,.rrg-chip:focus-visible .fg{stroke:var(--bg)}" +
    ".rrg-ring svg.t{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}" +
    ".rrg-chip kbd{font:inherit;opacity:.55;margin-left:2px}" +
    "@media (max-width:720px){.rrg-chip{bottom:74px}.rrg-chip kbd{display:none}}" +

    ".rrg-title{position:fixed;inset:0;z-index:950;background:#0a0705;color:#fff;overflow:hidden;transition:opacity .55s ease}" +
    ".rrg-title.out{opacity:0;pointer-events:none}" +
    ".rrg-title__art{position:absolute;inset:0;transform:scale(1.02);transition:transform 2.4s cubic-bezier(.2,.8,.2,1)}" +
    ".rrg-title.out .rrg-title__art{transform:scale(1.08)}" +
    ".rrg-title__art svg{position:absolute;inset:0;width:100%;height:100%}" +
    ".rrg-title__shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,0) 30%,rgba(0,0,0,.2) 55%,rgba(0,0,0,.78))}" +
    ".rrg-title__body{position:absolute;left:clamp(24px,6vw,96px);bottom:clamp(110px,22vh,220px);max-width:min(88vw,900px)}" +
    ".rrg-title__sem{display:inline-block;padding:.2em .7em;border:1px solid rgba(255,255,255,.3);border-radius:6px;font:500 14px/1.4 var(--sans);margin-bottom:16px}" +
    ".rrg-title h1{margin:0 0 14px;font:400 clamp(38px,7vw,104px)/1 var(--serif);letter-spacing:-.01em;text-shadow:0 2px 30px rgba(0,0,0,.55)}" +
    ".rrg-title p{margin:0;font:400 clamp(14px,1.4vw,18px)/1.5 var(--sans);color:rgba(255,255,255,.8)}" +
    ".rrg-title__stat{margin-top:18px!important;font-size:14px!important;color:rgba(255,255,255,.62)!important}" +
    ".rrg-start{position:absolute;left:50%;bottom:clamp(36px,8vh,84px);transform:translateX(-50%);border:0;background:transparent;color:#fff;font:500 clamp(15px,1.5vw,19px)/1 var(--sans);padding:14px 26px;border-radius:999px;cursor:pointer;animation:rrgPulse 2.2s ease-in-out infinite}" +
    ".rrg-start:focus-visible{outline:2px solid #fff;outline-offset:3px}" +
    ".rrg-start b{display:inline-grid;place-items:center;width:1.7em;height:1.7em;margin:0 .35em;border:1.5px solid #fff;border-radius:50%;font-weight:500}" +
    "@keyframes rrgPulse{50%{opacity:.4}}" +
    ".rrg-title__esc{position:absolute;right:clamp(18px,3vw,40px);bottom:clamp(18px,3vh,34px);font:400 13px/1 var(--sans);color:rgba(255,255,255,.55)}" +

    ".rrg-menu{position:fixed;inset:0;z-index:940;visibility:hidden;opacity:0;transition:opacity .25s,visibility 0s .25s}" +
    ".rrg-menu.open{visibility:visible;opacity:1;transition:opacity .25s}" +
    ".rrg-scrim{position:absolute;inset:0;background:rgba(6,4,2,.6);backdrop-filter:blur(14px)}" +
    ".rrg-panel{position:absolute;left:0;top:0;bottom:0;width:min(440px,100vw);padding:clamp(20px,4vh,40px) clamp(20px,3vw,34px);background:rgba(16,12,8,.9);border-right:1px solid var(--hair-2);overflow:auto;transform:translateX(-24px);transition:transform .4s cubic-bezier(.2,.8,.2,1);color:var(--cream);font-family:var(--sans)}" +
    ".rrg-menu.open .rrg-panel{transform:none}" +
    ".rrg-head small{display:block;font-size:12.5px;color:var(--sand);margin-bottom:6px}" +
    ".rrg-head h2{margin:0 0 18px;font:400 30px/1.1 var(--serif)}" +
    ".rrg-prog{display:flex;gap:28px}.rrg-prog span{display:block;font-size:12px;color:var(--sand)}.rrg-prog b{display:block;font:600 26px/1.2 var(--sans);font-variant-numeric:tabular-nums}" +
    ".rrg-bar{height:5px;border-radius:9px;background:rgba(240,232,208,.14);margin:14px 0;overflow:hidden}.rrg-bar i{display:block;height:100%;background:var(--rrg-accent);border-radius:9px}" +
    ".rrg-counts{display:flex;gap:18px;margin-bottom:22px}.rrg-counts span{display:inline-flex;align-items:center;gap:6px;font:500 14px/1 var(--sans);font-variant-numeric:tabular-nums}" +
    ".rrg-counts svg,.rrg-row svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}" +
    ".rrg-list{display:grid;gap:6px}" +
    ".rrg-item{display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;text-align:left;border:0;background:transparent;color:var(--cream);padding:14px 16px;border-radius:10px;font:500 16px/1.2 var(--sans);cursor:pointer;transition:background .15s,color .15s}" +
    ".rrg-item:hover{background:rgba(240,232,208,.09)}" +
    ".rrg-item:focus-visible,.rrg-item:focus{outline:none;background:var(--cream);color:var(--bg)}" +
    ".rrg-item em{font-style:normal;font-size:13px;opacity:.7}" +
    ".rrg-sw{width:38px;height:22px;border-radius:99px;background:rgba(240,232,208,.25);position:relative;flex:none}" +
    ".rrg-sw::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .25s}" +
    "[aria-checked=true] .rrg-sw{background:var(--rrg-accent)}[aria-checked=true] .rrg-sw::after{transform:translateX(16px)}" +
    ".rrg-back{margin-bottom:14px}" +
    ".rrg-row{display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:center;padding:12px 14px;border:1px solid var(--hair);border-radius:10px;background:rgba(240,232,208,.03)}" +
    ".rrg-row.locked{opacity:.5}" +
    ".rrg-row svg{width:30px;height:30px}" +
    ".rrg-row h4{margin:0;font:600 15px/1.3 var(--sans)}.rrg-row p{margin:2px 0 0;font:400 13px/1.4 var(--sans);color:var(--sand)}" +
    ".rrg-row small{font:400 12px/1.2 var(--sans);color:var(--sand);white-space:nowrap;text-align:right}" +
    ".rrg-row.done small{color:#7fe0a8}" +
    ".rrg-chap{display:flex;justify-content:space-between}.rrg-chap i{font-style:normal;color:var(--rrg-accent)}" +

    ".rrg-collect{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline;margin:-10px 0 22px;font:400 14px/1.4 var(--sans);color:var(--sand)}" +
    ".rrg-collect b{color:var(--rrg-accent);font-weight:600;font-variant-numeric:tabular-nums}" +
    ".wall .note{cursor:pointer}" +
    ".wall .note:focus-visible{outline:2px solid var(--cream);outline-offset:3px}" +
    ".wall .note.rrg-got{box-shadow:0 0 0 2px var(--rrg-accent),0 10px 26px -14px rgba(0,0,0,.7)}" +
    ".wall .note.rrg-got::after{content:'\\2726';position:absolute;top:8px;right:11px;font-size:15px;color:var(--rrg-accent);text-shadow:0 0 1px rgba(0,0,0,.4)}" +
    ".week.rrg-read .week__title::after{content:' \\2713';color:var(--rrg-accent);font-size:.75em}" +
    "@media (prefers-reduced-motion:reduce){.rrg-toast{animation-name:rrgFade}.rrg-start{animation:none}.rrg-panel,.rrg-title__art{transition:none}}";

  function injectCSS() {
    if ($("#rrg-css")) return;
    var s = document.createElement("style"); s.id = "rrg-css"; s.textContent = css; document.head.appendChild(s);
  }

  /* ---------- persistent UI (built once) ---------- */
  var toastHost, chip, menuEl, panelEl;
  function buildShell() {
    if (toastHost) return;
    toastHost = document.createElement("div"); toastHost.className = "rrg-toasts"; toastHost.setAttribute("aria-live", "polite");
    document.body.appendChild(toastHost);

    chip = document.createElement("button"); chip.className = "rrg-chip"; chip.type = "button";
    chip.setAttribute("aria-label", "Open game menu");
    chip.addEventListener("click", function () { openMenu("main"); });
    document.body.appendChild(chip);

    menuEl = document.createElement("div"); menuEl.className = "rrg-menu"; menuEl.setAttribute("role", "dialog"); menuEl.setAttribute("aria-modal", "true"); menuEl.setAttribute("aria-label", "Game menu");
    menuEl.innerHTML = '<div class="rrg-scrim"></div><div class="rrg-panel" id="rrg-panel"></div>';
    document.body.appendChild(menuEl);
    panelEl = $("#rrg-panel");
    $(".rrg-scrim", menuEl).addEventListener("click", closeMenu);
    panelEl.addEventListener("click", onPanelClick);
  }

  /* ---------- state helpers ---------- */
  function save() { RR.save(KEY, st); }
  function counts() { return RR.progress(KEY); }
  function updateHUD() {
    if (!chip) return;
    var p = counts(), c = 2 * Math.PI * 12, dash = (p.pct / 100 * c).toFixed(1);
    chip.innerHTML =
      '<span class="rrg-ring"><svg class="p" viewBox="0 0 30 30"><circle class="bg" cx="15" cy="15" r="12"/><circle class="fg" cx="15" cy="15" r="12" stroke-dasharray="' + dash + " " + c.toFixed(1) + '"/></svg>' + TROPHY.replace("<svg", '<svg class="t"') + "</span>" +
      "<span>" + p.earned + "/" + p.total + "</span><span>Menu <kbd>Esc</kbd></span>";
  }

  /* ---------- trophies ---------- */
  function cond(d) {
    var totalWeeks = $$(".week").length, totalFlips = $$(".flip").length, totalNotes = $$("#wallGrid .note").length;
    var totalEvid = $$("#report .theme").length;
    var other = SEM === 1 ? "s2" : "s1";
    switch (d.id) {
      case "start": return !!st.started;
      case "brief": return !!st.seen.brief;
      case "week1": return st.weeks.length >= 1;
      case "weeks5": return st.weeks.length >= 5;
      case "weeks4": return st.weeks.length >= 4;
      case "weeksAll": return totalWeeks > 0 && st.weeks.length >= totalWeeks;
      case "chen": return !!st.seen.artist1;
      case "mccarthy": return !!st.seen.artist2;
      case "flip1": return st.flips.length >= 1;
      case "flipAll": return totalFlips > 0 && st.flips.length >= totalFlips;
      case "work": return !!st.seen.work;
      case "report": return !!st.seen.report;
      case "evidence": return totalEvid > 0 && st.evid.length >= totalEvid;
      case "collect5": return st.notes.length >= Math.min(d.n || 5, totalNotes || 5);
      case "collectMost": return totalNotes > 0 && st.notes.length >= Math.min(d.n || 8, totalNotes);
      case "map": var ids = $$(".nav__btn").map(function (b) { return b.dataset.target; }); return ids.length > 0 && ids.every(function (i) { return st.seen[i]; });
      case "sequel": return !!RR.load(other).opened;
      case "cheat": return !!st.cheat;
    }
    return false;
  }
  function evaluate() {
    if (titleOpen) return;
    var all = true;
    DEFS.forEach(function (d) {
      if (d.id === "platinum") return;
      if (st.earned[d.id]) return;
      if (cond(d)) earn(d); else all = false;
    });
    if (all && !st.earned.platinum) earn(DEFS.filter(function (d) { return d.id === "platinum"; })[0]);
  }
  function earn(d) {
    if (!d || st.earned[d.id]) return;
    st.earned[d.id] = Date.now(); save(); updateHUD();
    toastQ.push(d); nextToast();
    setTimeout(evaluate, 60);
  }
  function nextToast() {
    if (toastBusy || !toastQ.length) return;
    toastBusy = true;
    var d = toastQ.shift(), t = document.createElement("div");
    t.className = "rrg-toast rrg-g-" + d.g; t.setAttribute("role", "status");
    t.innerHTML = TROPHY + "<div><small>" + GRADE_NAME[d.g] + " trophy earned</small><b>" + d.name + "</b></div>";
    toastHost.appendChild(t);
    sfx.trophy();
    setTimeout(function () { t.remove(); toastBusy = false; setTimeout(nextToast, 250); }, 4700);
  }

  /* ---------- tracking ---------- */
  function clearObservers() { observers.forEach(function (o) { o.disconnect(); }); observers = []; Object.keys(timers).forEach(function (k) { clearTimeout(timers[k]); }); timers = {}; }
  function dwell(key, el, onDone) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { if (!timers[key]) timers[key] = setTimeout(function () { onDone(); io.unobserve(el); }, 1100); }
        else { clearTimeout(timers[key]); timers[key] = null; }
      });
    }, { rootMargin: "-25% 0px -25% 0px" });
    io.observe(el); observers.push(io);
  }
  function trackSections() {
    $$(".nav__btn").forEach(function (b) {
      var id = b.dataset.target, el = document.getElementById(id);
      if (!el) return;
      if (st.seen[id]) return;
      dwell("sec-" + id, el, function () { st.seen[id] = 1; save(); evaluate(); });
    });
    $$("#report .theme").forEach(function (el, i) {
      if (st.evid.indexOf(i) > -1) return;
      dwell("ev-" + i, el, function () { st.evid.push(i); save(); evaluate(); });
    });
  }
  function markWeek(wk) {
    var n = Number(wk.dataset.week);
    wk.classList.add("rrg-read");
    if (st.weeks.indexOf(n) < 0) { st.weeks.push(n); save(); evaluate(); }
  }
  function markFlip(f) {
    var i = $$(".flip").indexOf(f);
    if (i > -1 && st.flips.indexOf(i) < 0) { st.flips.push(i); save(); evaluate(); }
  }
  function decorateWeeks() {
    $$(".week").forEach(function (wk) { if (st.weeks.indexOf(Number(wk.dataset.week)) > -1) wk.classList.add("rrg-read"); });
  }
  function decorateWall() {
    var grid = $("#wallGrid"); if (!grid) return;
    var notes = $$(".note", grid);
    var bar = document.createElement("div"); bar.className = "rrg-collect";
    bar.innerHTML = '<span>Collected <b id="rrg-n">' + st.notes.length + "</b> of " + notes.length + '</span><span>Click a note to collect it. Curators keep the ones that matter.</span>';
    grid.parentNode.insertBefore(bar, grid);
    notes.forEach(function (n, i) {
      n.tabIndex = 0; n.setAttribute("role", "button");
      var got = st.notes.indexOf(i) > -1;
      n.classList.toggle("rrg-got", got); n.setAttribute("aria-pressed", got ? "true" : "false");
      function toggle() {
        var at = st.notes.indexOf(i);
        if (at > -1) st.notes.splice(at, 1); else { st.notes.push(i); sfx.select(); }
        n.classList.toggle("rrg-got", at < 0); n.setAttribute("aria-pressed", at < 0 ? "true" : "false");
        $("#rrg-n").textContent = st.notes.length; save(); evaluate();
      }
      n.addEventListener("click", toggle);
      n.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    });
  }

  /* ---------- title screen ---------- */
  var ART = {
    s1: '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c0d07"/><stop offset=".42" stop-color="#6e3413"/><stop offset=".7" stop-color="#d4883a"/><stop offset="1" stop-color="#f3c987"/></linearGradient><radialGradient id="gb"><stop offset="0" stop-color="#ffe6b0" stop-opacity=".95"/><stop offset=".4" stop-color="#ffc06a" stop-opacity=".5"/><stop offset="1" stop-color="#ffc06a" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#ga)"/><circle cx="1180" cy="470" r="260" fill="url(#gb)"/><path d="M-40 640 C 250 560, 450 600, 700 650 S 1200 700, 1650 600 L1650 940 L-40 940Z" fill="#9c4f1c" opacity=".92"/><path d="M-40 725 C 300 650, 560 725, 860 745 S 1350 725, 1650 690 L1650 940 L-40 940Z" fill="#5c2b10"/><path d="M-40 815 C 400 770, 700 830, 1000 830 S 1450 800, 1650 810 L1650 940 L-40 940Z" fill="#24100a"/></svg>',
    s2: function () {
      var s = "";
      for (var i = 0; i < 16; i++) { var y = 90 + i * 52; s += '<path d="M-50 ' + y + ' C 300 ' + (y - 70 + i * 3) + ', 600 ' + (y + 80) + ', 900 ' + (y - 10) + ' S 1400 ' + (y + 60) + ', 1700 ' + (y - 40) + '" fill="none" stroke="#5ff0c0" stroke-opacity="' + (0.08 + i * 0.012).toFixed(3) + '" stroke-width="1.6"/>'; }
      return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="gc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#04141a"/><stop offset=".5" stop-color="#06302f"/><stop offset="1" stop-color="#0d4a44"/></linearGradient><radialGradient id="gd" cx=".2" cy=".2" r=".7"><stop offset="0" stop-color="#3fe0b0" stop-opacity=".35"/><stop offset="1" stop-color="#3fe0b0" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#gc)"/><rect width="1600" height="900" fill="url(#gd)"/>' + s + "</svg>";
    }
  };
  var titleEl = null;
  function showTitle() {
    var p = counts();
    titleOpen = true;
    document.documentElement.style.overflow = "hidden";
    titleEl = document.createElement("div"); titleEl.className = "rrg-title"; titleEl.setAttribute("role", "dialog"); titleEl.setAttribute("aria-label", "Title screen");
    titleEl.innerHTML =
      '<div class="rrg-title__art">' + (SEM === 1 ? ART.s1 : ART.s2()) + '</div><div class="rrg-title__shade"></div>' +
      '<div class="rrg-title__body"><span class="rrg-title__sem">Semester ' + SEM + "</span><h1>Journal Development Project</h1><p>RR420 · Research &amp; Reflection · Armand</p>" +
      '<p class="rrg-title__stat">' + (p.earned ? "Progress " + p.pct + "% · " + p.earned + " of " + p.total + " trophies" : "New game · " + p.total + " trophies to find") + "</p></div>" +
      '<button class="rrg-start" type="button">Press <b>&#10005;</b> or Enter to start</button><div class="rrg-title__esc">Esc &nbsp;Home screen</div>';
    document.body.appendChild(titleEl);
    $(".rrg-start", titleEl).focus();
    titleEl.addEventListener("click", dismissTitle);
  }
  function dismissTitle() {
    if (!titleOpen) return;
    titleOpen = false; sfx.select();
    document.documentElement.style.overflow = "";
    if (!st.started) { st.started = Date.now(); save(); }
    var el = titleEl; titleEl = null;
    el.classList.add("out");
    setTimeout(function () { el.remove(); }, 650);
    setTimeout(evaluate, 500);
    if (play()) play().refocus();
  }

  /* play.js (chapter select + levels), when play mode is on */
  function play() { return window.RRPlay && window.RRPlay.active() ? window.RRPlay : null; }

  /* ---------- pause menu ---------- */
  function gradeRow(p) {
    return GRADES.map(function (g) { return '<span class="rrg-g-' + g + '">' + TROPHY + p.counts[g] + "</span>"; }).join("");
  }
  function renderMenu() {
    var p = counts(), html = "";
    var head = '<div class="rrg-head"><small>Semester ' + SEM + '</small><h2>Journal Development Project</h2><div class="rrg-prog"><div><span>Progress</span><b>' + p.pct + '%</b></div><div><span>Earned</span><b>' + p.earned + "/" + p.total + '</b></div></div><div class="rrg-bar"><i style="width:' + p.pct + '%"></i></div><div class="rrg-counts">' + gradeRow(p) + "</div></div>";
    if (menuView === "main") {
      html = head + '<div class="rrg-list">' +
        '<button class="rrg-item" data-act="resume">Resume</button>' +
        '<button class="rrg-item" data-act="chapters">Chapter select<em>' + $$(".nav__btn").length + " chapters</em></button>" +
        '<button class="rrg-item" data-act="trophies">Trophies<em>' + p.earned + " of " + p.total + "</em></button>" +
        '<button class="rrg-item" role="switch" aria-checked="' + (soundOn() ? "true" : "false") + '" data-act="sound">Navigation sounds<i class="rrg-sw"></i></button>' +
        (window.RRPlay ? '<button class="rrg-item" role="switch" aria-checked="' + (play() ? "false" : "true") + '" data-act="mode">Reader mode<i class="rrg-sw"></i></button>' : "") +
        '<button class="rrg-item" data-act="quit">Quit to home screen</button></div>';
    } else if (menuView === "chapters") {
      html = '<button class="rrg-item rrg-back" data-act="main">&#9664; Back</button><div class="rrg-head"><h2>Chapter select</h2></div><div class="rrg-list">' +
        $$(".nav__btn").map(function (b) {
          return '<button class="rrg-item rrg-chap" data-goto="' + b.dataset.target + '"><span>' + b.getAttribute("aria-label") + "</span>" + (st.seen[b.dataset.target] ? "<i>&#10003; visited</i>" : "") + "</button>";
        }).join("") + "</div>";
    } else {
      var rank = { platinum: 0, gold: 1, silver: 2, bronze: 3 };
      var list = DEFS.map(function (d, i) { return { d: d, i: i }; }).sort(function (a, b) { return rank[a.d.g] - rank[b.d.g] || a.i - b.i; });
      html = '<button class="rrg-item rrg-back" data-act="main">&#9664; Back</button>' + head + '<div class="rrg-list">' + list.map(function (x) {
        var d = x.d, got = st.earned[d.id], hide = d.hidden && !got;
        var date = got ? "Earned " + new Date(got).toLocaleDateString([], { day: "numeric", month: "short" }) : "Locked";
        return '<div class="rrg-row ' + (got ? "done" : "locked") + '"><span class="rrg-g-' + d.g + '">' + TROPHY + "</span><div><h4>" + (hide ? "Hidden trophy" : d.name) + "</h4><p>" + (hide ? "Keep exploring." : d.desc) + "</p></div><small>" + date + "</small></div>";
      }).join("") + "</div>";
    }
    panelEl.innerHTML = html;
    var first = $(".rrg-item", panelEl); if (first) first.focus({ preventScroll: true });
  }
  function setInert(on) {
    var app = $("#app"), nav = $(".nav"), hub = play() && play().view() === "hub";
    if (app) app.inert = on || hub; if (nav) nav.inert = on; if (chip) chip.inert = on;
    $$(".rrp-ui").forEach(function (el) { el.inert = on; });
  }
  function openMenu(view) {
    if (titleOpen) return;
    lastFocus = document.activeElement;
    menuOpen = true; menuView = view || "main";
    document.documentElement.style.overflow = "hidden";
    setInert(true); menuEl.classList.add("open"); renderMenu(); sfx.select();
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false; menuEl.classList.remove("open"); setInert(false);
    document.documentElement.style.overflow = play() && play().view() === "hub" ? "hidden" : "";
    sfx.back();
    if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus({ preventScroll: true }); else if (chip) chip.focus({ preventScroll: true });
  }
  function goHome() { location.href = HOME + "#s" + SEM; }
  function onPanelClick(e) {
    var g = e.target.closest("[data-goto]");
    if (g) { var el = document.getElementById(g.dataset.goto); closeMenu(); if (el) setTimeout(function () { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 6, behavior: "smooth" }); }, 80); return; }
    var b = e.target.closest("[data-act]"); if (!b) return;
    var a = b.dataset.act;
    if (a === "resume") closeMenu();
    else if (a === "chapters" && play()) { var p = play(); closeMenu(); p.hub(); }
    else if (a === "chapters" || a === "trophies" || a === "main") { menuView = a; sfx.select(); renderMenu(); }
    else if (a === "mode") { var readNow = !play(); closeMenu(); window.RRPlay.setMode(readNow ? "play" : "read"); }
    else if (a === "sound") { setSound(!soundOn()); b.setAttribute("aria-checked", soundOn() ? "true" : "false"); sfx.select(); }
    else if (a === "quit") { sfx.back(); goHome(); }
  }
  function menuBack() { if (menuView !== "main") { menuView = "main"; renderMenu(); sfx.back(); } else closeMenu(); }
  function moveMenuFocus(d) {
    var items = $$("button", panelEl), i = items.indexOf(document.activeElement);
    var n = items[Math.max(0, Math.min(items.length - 1, (i < 0 ? 0 : i + d)))];
    if (n) { n.focus({ preventScroll: false }); sfx.move(); }
  }

  /* ---------- input ---------- */
  var KONAMI = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a", buf = [];
  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (titleOpen) {
      if (e.key === "Escape") { e.preventDefault(); goHome(); }
      else if (e.key !== "Shift" && e.key !== "Tab") { e.preventDefault(); dismissTitle(); }
      return;
    }
    if (menuOpen) {
      if (e.key === "Escape" || e.key === "Backspace") { e.preventDefault(); menuBack(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); moveMenuFocus(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveMenuFocus(-1); }
      else if (e.key === "Tab") {
        var items = $$("button", panelEl); if (!items.length) return;
        var i = items.indexOf(document.activeElement), n = e.shiftKey ? i - 1 : i + 1;
        if (n < 0) n = items.length - 1; if (n >= items.length) n = 0;
        e.preventDefault(); items[n].focus();
      }
      return;
    }
    if (e.key === "Escape" && !e.defaultPrevented) { e.preventDefault(); openMenu("main"); return; }
    buf.push(e.key.length === 1 ? e.key.toLowerCase() : e.key); if (buf.length > 10) buf.shift();
    if (buf.join(",") === KONAMI && !st.cheat) { st.cheat = Date.now(); save(); evaluate(); }
  });
  document.addEventListener("click", function (e) {
    var wk = e.target.closest && e.target.closest(".week__head");
    if (wk) { var w = wk.closest(".week"); setTimeout(function () { if (w.classList.contains("open")) markWeek(w); }, 0); }
    var f = e.target.closest && e.target.closest(".flip"); if (f) markFlip(f);
  });
  document.addEventListener("mouseover", function (e) { var f = e.target.closest && e.target.closest(".flip"); if (f) markFlip(f); });
  document.addEventListener("focusin", function (e) { var f = e.target.closest && e.target.closest(".flip"); if (f) markFlip(f); });

  // controller: Options = menu, d-pad / stick = move, cross = select, circle = back, stick scrolls the page
  var held = {};
  function pad(n, on, now, repeat) {
    var h = held[n];
    if (on) { if (!h) { held[n] = { r: now + 350 }; return true; } if (repeat && now >= h.r) { h.r = now + 130; return true; } return false; }
    held[n] = null; return false;
  }
  (function loop() {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [], gp = null;
    for (var k = 0; k < pads.length; k++) if (pads[k]) { gp = pads[k]; break; }
    if (gp) {
      var b = function (i) { return gp.buttons[i] && gp.buttons[i].pressed; };
      var ax = gp.axes[0] || 0, ay = gp.axes[1] || 0, now = performance.now();
      var anyBtn = false; for (var j = 0; j < gp.buttons.length; j++) if (gp.buttons[j].pressed) anyBtn = true;
      if (titleOpen) { if (pad("any", anyBtn, now, false)) { if (b(1)) goHome(); else dismissTitle(); } }
      else if (menuOpen) {
        if (pad("up", b(12) || ay < -0.6, now, true)) moveMenuFocus(-1);
        if (pad("down", b(13) || ay > 0.6, now, true)) moveMenuFocus(1);
        if (pad("ok", b(0), now, false) && document.activeElement) document.activeElement.click();
        if (pad("back", b(1) || b(9), now, false)) menuBack();
      } else {
        if (pad("opt", b(9), now, false)) openMenu("main");
        if (Math.abs(ay) > 0.25 && !b(12) && !b(13)) window.scrollBy(0, ay * 22);
        if (!play()) { if (b(12)) window.scrollBy(0, -18); if (b(13)) window.scrollBy(0, 18); }
      }
    }
    requestAnimationFrame(loop);
  })();

  /* ---------- entry point from app.js ---------- */
  function onRender(sem) {
    injectCSS(); buildShell();
    SEM = sem; KEY = "s" + sem; DEFS = RR.defs[KEY]; st = RR.load(KEY);
    if (!st.opened) st.opened = Date.now();
    save();
    document.documentElement.style.setProperty("--rrg-accent", sem === 2 ? "var(--teal)" : "var(--amber)");
    if (menuOpen) closeMenu();
    clearObservers();
    decorateWeeks(); decorateWall(); trackSections(); updateHUD();
    var deepLinked = !!location.hash;
    if (firstRender && launched && !deepLinked) showTitle();
    else if (!st.started) { setTimeout(function () { st.started = Date.now(); save(); evaluate(); }, 900); }
    else setTimeout(evaluate, 900);
    firstRender = false;
  }

  function art(sem, prefix) {
    var s = sem === 1 ? ART.s1 : ART.s2();
    return prefix ? s.replace(/id="(\w+)"/g, 'id="' + prefix + '$1"').replace(/url\(#(\w+)\)/g, "url(#" + prefix + "$1)") : s;
  }

  window.RRGame = {
    onRender: onRender, art: art, sfx: sfx, openMenu: openMenu,
    busy: function () { return titleOpen || menuOpen; }
  };
  if ($("#cover")) onRender(/[?&]sem=2/.test(location.search) ? 2 : 1);
})();
