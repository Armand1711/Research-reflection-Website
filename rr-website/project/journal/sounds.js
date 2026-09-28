/* ============================================================
   sounds.js: the console sound set in assets/Sounds, shared by the
   home screen (index.html) and the journals (game.js, play.js).
   Effects follow the "Navigation sounds" setting (rr420.sound) and the
   sign-in music follows "Music" (rr420.music); both are on unless set to "0".
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
  var MUSIC = ["002. Select User.mp3", 0.35];

  function url(f) { return BASE + encodeURIComponent(f); }
  function pref(k) { try { return localStorage.getItem("rr420." + k) !== "0"; } catch (e) { return true; } }
  function quiet(p) { if (p && p.catch) p.catch(function () {}); }

  var cache = {};
  function base(file) {
    if (!cache[file]) { var a = new Audio(url(file)); a.preload = "auto"; cache[file] = a; }
    return cache[file];
  }
  function play(name) {
    var fx = FX[name];
    if (!fx || !pref("sound")) return;
    try { var a = base(fx[0]).cloneNode(); a.volume = fx[1]; quiet(a.play()); } catch (e) {}
  }
  // warm the cache so the first press is not late
  Object.keys(FX).forEach(function (k) { base(FX[k][0]); });

  /* sign-in music: streamed (the file is large), looped, faded in and out */
  var music = null, fadeTimer = null;
  function fade(to, ms, done) {
    clearInterval(fadeTimer);
    var from = music.volume, steps = Math.max(1, Math.round(ms / 40)), n = 0;
    fadeTimer = setInterval(function () {
      n++; music.volume = Math.max(0, Math.min(1, from + (to - from) * n / steps));
      if (n >= steps) { clearInterval(fadeTimer); if (done) done(); }
    }, 40);
  }
  function startMusic() {
    if (!pref("music")) return;
    if (!music) { music = new Audio(url(MUSIC[0])); music.loop = true; music.preload = "none"; music.volume = 0; }
    if (!music.paused) { fade(MUSIC[1], 600); return; }   // already playing (or fading out): bring it back up
    var p = music.play();
    if (p && p.then) p.then(function () { fade(MUSIC[1], 1200); }, function () {});
    else fade(MUSIC[1], 1200);
  }
  function stopMusic(ms) {
    if (!music || music.paused) return;
    fade(0, ms == null ? 900 : ms, function () { music.pause(); });
  }

  window.RRSound = {
    play: play, startMusic: startMusic, stopMusic: stopMusic,
    musicPlaying: function () { return !!music && !music.paused; }
  };
})();
