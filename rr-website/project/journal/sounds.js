/* ============================================================
   sounds.js: the console sound set in assets/Sounds, shared by the
   home screen (index.html) and the journals (game.js, play.js).
   Effects follow the "Navigation sounds" setting (rr420.sound) and the
   music (sign-in and home screen) follows "Music" (rr420.music); both are on unless set to "0".
   Browsers only allow audio after a click or key press on the page,
   so nothing plays until the visitor has interacted.
   ============================================================ */
(function () {
  var src = document.currentScript && document.currentScript.src;
  var BASE = new URL("../assets/Sounds/", src || location.href).href;

  /* name: [file, volume] */
  var FX = {
    move: ["17. Focus Move Psfx Focus Move.mp3", 0.45],
    back: ["17. Focus Move Psfx Focus Move.mp3", 0.3],
    select: ["11. Enter Psfx Enter.mp3", 0.6],
    menu: ["29. Open Option Menu Psfx Open Option.mp3", 0.6],
    home: ["28. Open Home Psfx Open Home.mp3", 0.6],
    logout: ["22. Log Out Psfx Log Out.mp3", 0.6],
    trophy: ["39. Trophy Toast Psfx Trophy Toas.mp3", 0.7],
    platinum: ["32. Platinum Trophy Toast Psfx Platinum Tr.mp3", 0.75]
  };
  /* looping background music: name: [file, volume] */
  var TRACKS = {
    signin: ["002. Select User.mp3", 0.35],
    home: ["003. Home Menu.mp3", 0.3],
    sm2: ["01. Main Menu Spiderman2.mp3", 0.4]   // Marvel's Spider-Man 2 tile on the home screen
  };

  function url(f) { return BASE + encodeURIComponent(f); }
  function pref(k) { try { return localStorage.getItem("rr420." + k) !== "0"; } catch (e) { return true; } }
  function quiet(p) { if (p && p.catch) p.catch(function () {}); }

  var cache = {};
  function base(file) {
    if (!cache[file]) { var a = new Audio(url(file)); a.preload = "auto"; cache[file] = a; }
    return cache[file];
  }
  var lastMove = 0, pendingSelect = null;
  function raw(name) {
    var fx = FX[name];
    if (!fx || !pref("sound")) return;
    if (name === "move" || name === "back") { var now = Date.now(); if (now - lastMove < 70) return; lastMove = now; }
    try { var a = base(fx[0]).cloneNode(); a.volume = fx[1]; quiet(a.play()); } catch (e) {}
  }
  /* Every selection plays Enter (see selectSoon below). An action with its own console sound
     (open a menu, go home, log out) plays that instead, so a press never sounds twice. */
  function play(name) {
    if ((name === "back" || name === "move") && pendingSelect) return;   // clicked Back / Next / a tile: Enter wins
    if (pendingSelect && name !== "trophy" && name !== "platinum") { clearTimeout(pendingSelect); pendingSelect = null; }
    raw(name);
  }
  function selectSoon() {
    if (pendingSelect) return;
    pendingSelect = setTimeout(function () { pendingSelect = null; raw("select"); }, 0);
  }
  // warm the cache so the first press is not late
  Object.keys(FX).forEach(function (k) { base(FX[k][0]); });

  /* ---------- sounds for every move and every selection, on both pages ---------- */
  /* things you can select (clicked, or confirmed with Enter / Space / cross) */
  var SELECTABLE = "button, a[href], [role=button], [role=switch], [role=menuitem], [role=option], .flip";
  /* things focus can move onto (mouse hover plays Focus Move, like the cursor on the console) */
  var FOCUSABLE = SELECTABLE + ", .wall .note, .week__head";
  function target(e, sel) {
    var el = e.target && e.target.closest ? e.target.closest(sel) : null;
    return el && !el.disabled ? el : null;
  }
  document.addEventListener("click", function (e) { if (target(e, SELECTABLE)) selectSoon(); }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") tabAt = Date.now();
    // Enter / Space on a focusable card that is not a real button (buttons fire a click, handled above)
    if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
      var a = document.activeElement;
      if (a && a.matches && a.matches(".flip, .wall .note") && !a.matches("button")) selectSoon();
    }
  }, true);
  var tabAt = 0, hovered = null;
  document.addEventListener("focusin", function (e) {
    if (Date.now() - tabAt < 200 && target(e, FOCUSABLE)) play("move");
  });
  document.addEventListener("pointerover", function (e) {
    if (e.pointerType !== "mouse") return;
    var el = target(e, FOCUSABLE);
    if (el === hovered) return;
    hovered = el;
    if (el) play("move");
  });

  /* music: streamed (the files are large), looped, faded in and out, one track at a time */
  var tracks = {}, current = null;
  function track(name) {
    if (!tracks[name]) { var a = new Audio(url(TRACKS[name][0])); a.loop = true; a.preload = "none"; a.volume = 0; tracks[name] = a; }
    return tracks[name];
  }
  function fade(a, to, ms, done) {
    clearInterval(a._fade);
    var from = a.volume, steps = Math.max(1, Math.round(ms / 40)), n = 0;
    a._fade = setInterval(function () {
      n++; a.volume = Math.max(0, Math.min(1, from + (to - from) * n / steps));
      if (n >= steps) { clearInterval(a._fade); if (done) done(); }
    }, 40);
  }
  function stopTrack(name, ms) {
    var a = tracks[name];
    if (a && !a.paused) fade(a, 0, ms, function () { a.pause(); });
  }
  function startMusic(name) {
    name = name || "signin";
    if (!TRACKS[name] || !pref("music")) return;
    Object.keys(tracks).forEach(function (k) { if (k !== name) stopTrack(k, 900); });   // crossfade
    current = name;
    var a = track(name), vol = TRACKS[name][1];
    if (!a.paused) { fade(a, vol, 600); return; }   // already playing (or fading out): bring it back up
    var p = a.play();
    if (p && p.then) p.then(function () { if (current === name) fade(a, vol, 1200); else a.pause(); }, function () {});
    else fade(a, vol, 1200);
  }
  function stopMusic(ms) {
    current = null;
    Object.keys(tracks).forEach(function (k) { stopTrack(k, ms == null ? 900 : ms); });
  }

  window.RRSound = {
    play: play, startMusic: startMusic, stopMusic: stopMusic,
    musicPlaying: function (name) {
      return Object.keys(tracks).some(function (k) { return (!name || k === name) && !tracks[k].paused; });
    }
  };
})();
