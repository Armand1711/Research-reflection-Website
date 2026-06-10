/* ============================================================
   app.js — render engine + interactions
   ============================================================ */
(function () {
  const J = window.JOURNAL;
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---- nav icons (simple line glyphs) ---- */
  const ICONS = {
    cover: '<path d="M3 4h18v16H3z"/><path d="M3 9h18"/>',
    brief: '<path d="M5 3h10l4 4v14H5z"/><path d="M15 3v4h4"/><path d="M8 12h8M8 16h6"/>',
    weeks: '<path d="M4 5h16v16H4z"/><path d="M4 9h16M9 5v16"/>',
    artist1: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/>',
    artist2: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/>',
    synthesis: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.5 8l3.5 8M16.5 8l-3.5 8M8.5 6h7"/>',
    work: '<path d="M3 7h18v13H3z"/><path d="M8 7V4h8v3"/><path d="M3 13h18"/>',
    wall: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  };

  /* ================= COVER ================= */
  function cover(c) {
    const tags = c.tags.map((t) =>
      `<span class="tag-pill reveal"><i style="background:var(--${t.c})"></i>${esc(t.k)}: <b>${esc(t.v)}</b></span>`).join("");
    return `<section class="section cover" id="cover" data-screen-label="Cover">
      <span class="kicker reveal">${esc(c.kicker)}</span>
      <h1 class="reveal rd1">Journal <span class="em">Development</span> Project</h1>
      <p class="author reveal rd2">${esc(c.author)}</p>
      <div class="cover__tags reveal rd2">${tags}</div>
      <p class="cover__intro reveal rd3">${esc(c.intro)}</p>
      ${c.img ? `<div class="cover__img reveal rd3"><image-slot id="cover-img" shape="rounded" radius="8" placeholder="${esc(c.img)}"></image-slot></div>` : ""}
    </section>`;
  }

  /* ================= BRIEF ================= */
  function brief(b) {
    const todo = b.todo.map((t, i) =>
      `<div class="todo-item reveal"><span class="ix">${i + 1}</span><p>${esc(t)}</p></div>`).join("");
    return `<section class="section" id="brief" data-screen-label="The Brief">
      <header class="s-head"><span class="kicker">Section 02</span><h2>The <em>Brief</em></h2></header>
      <div class="brief-grid">
        <div><h3 class="col-title reveal">What to do</h3>${todo}</div>
        <div>
          <div class="keyword reveal">
            <div class="kl">${esc(b.keyword.label)}</div>
            <div class="kw">${esc(b.keyword.word)}</div>
            <div class="kg">${esc(b.keyword.gloss)}</div>
          </div>
        </div>
      </div>
    </section>`;
  }

  /* ================= WEEKS ================= */
  function readingTime(w) {
    let words = 0;
    w.blocks.forEach((bl) => {
      (bl.paras || []).forEach((p) => words += p.split(/\s+/).length);
      (bl.items || []).forEach((q) => words += (q.t + " " + (q.a || "")).split(/\s+/).length);
    });
    return Math.max(1, Math.round(words / 200));
  }
  function blockHTML(bl) {
    const isRef = bl.kind === "reflection";
    let inner = "";
    if (bl.kind === "quotes") {
      inner = bl.items.map((q) =>
        `<div class="qitem"><div class="qt">${esc(q.t)}</div>${q.a ? `<span class="qa">— ${esc(q.a)}</span>` : ""}</div>`).join("");
    } else {
      inner = (bl.paras || []).map((p) => `<p class="note">${esc(p)}</p>`).join("");
    }
    return `<div class="block ${isRef ? "is-reflection" : ""}"><div class="blabel">${esc(bl.label)}</div>${inner}</div>`;
  }
  function weeks(list) {
    const items = list.map((w) => {
      const rt = readingTime(w);
      const blocks = w.blocks.map(blockHTML).join("");
      return `<div class="week" data-week="${w.n}">
        <button class="week__head" aria-expanded="false">
          <span class="week__num">${String(w.n).padStart(2, "0")}</span>
          <span class="week__title">${esc(w.title)}</span>
          <span class="week__meta"><span class="week__rt">${rt} min read</span>
          <span class="week__chev"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span></span>
        </button>
        <div class="week__body"><div class="week__inner"><div class="week__pad">
          ${w.source ? `<div class="week__source">${esc(w.source)}</div>` : ""}
          ${w.img ? `<div class="week__img"><image-slot id="wk-img-${w.n}" shape="rounded" radius="6" placeholder="${esc(w.img)}"></image-slot></div>` : ""}
          <div class="blocks">${blocks}</div>
        </div></div></div>
      </div>`;
    }).join("");
    return `<section class="section" id="weeks" data-screen-label="Weeks">
      <header class="s-head"><span class="kicker">Section 03 · Weekly Gathering</span><h2>The <em>Weeks</em></h2>
      <p class="s-sub">Twelve weeks of class notes, quotes and reflection. One opens at a time, so click any week to read it.</p></header>
      <div class="weeks">${items}</div>
    </section>`;
  }

  /* ================= ARTISTS ================= */
  function artistCol(col, hue) {
    let body = "";
    if (col.kind === "pull") {
      body = col.items.map((q) =>
        `<div class="pull"><div class="pt">${esc(q.t)}</div><span class="pa">${esc(q.a)}</span></div>`).join("");
    } else if (col.kind === "quotes") {
      body = col.items.map((q) => `<div class="crit-note"><p>${esc(q.t)}</p></div>`).join("");
    } else {
      body = col.items.map((q) => `<div class="obs-note"><p>${esc(q.t)}</p></div>`).join("");
    }
    return `<div class="acol hue-${hue} reveal"><div class="blabel">${esc(col.label)}</div>${body}</div>`;
  }
  function artist(a, idx) {
    const cols = a.columns.map((c) => artistCol(c, a.hue)).join("");
    return `<section class="section" id="${a.id}" data-screen-label="Artist ${idx} — ${esc(a.name)}">
      <header class="s-head"><span class="kicker">Artist 0${idx}</span><h2>${esc(a.name)}</h2></header>
      <div class="artist__bio reveal">
        <image-slot id="${esc(a.slot)}" shape="rounded" radius="6" placeholder="Drop a portrait of ${esc(a.name)}"></image-slot>
        <p>${esc(a.bio)}</p>
      </div>
      <div class="artist__cols">${cols}</div>
      ${a.sources ? `<div class="artist__sources reveal">${esc(a.sources)}</div>` : ""}
    </section>`;
  }

  /* ================= SYNTHESIS ================= */
  function synthesis(s) {
    const cards = s.threads.map((t) =>
      `<div class="flip reveal" tabindex="0"><div class="flip__in">
        <div class="flip__face flip__front">
          <span class="tn">${esc(t.n)}</span><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p>
          <span class="hint">Hover to connect &rarr;</span>
        </div>
        <div class="flip__face flip__back">
          <div class="bw">${esc(t.back.w)}</div><p>${esc(t.back.d)}</p>
        </div>
      </div></div>`).join("");
    return `<section class="section" id="synthesis" data-screen-label="Synthesis">
      <header class="s-head"><span class="kicker">Section 06 · Connecting Threads</span><h2>Synthesis</h2>
      <p class="s-sub">Six ideas that surface across every week and both artists. Hover a card to see the class week it ties back to.</p></header>
      <div class="threads">${cards}</div>
    </section>`;
  }

  /* ================= MY WORK ================= */
  function work(w) {
    const themes = w.themes.map((t) => {
      const rows = t.rows.map((r) =>
        `<div class="theme__row"><div class="rk">${esc(r.k)}</div><div class="rv">${esc(r.v)}</div></div>`).join("");
      return `<div class="theme hue-${t.hue} reveal">
        <div class="theme__k">${esc(t.k)}</div><h3>${esc(t.title)}</h3>
        <image-slot id="${esc(t.slot)}" shape="rounded" radius="6" placeholder="Drop a screenshot of ${esc(t.title)}"></image-slot>
        ${rows}
      </div>`;
    }).join("");
    return `<section class="section" id="work" data-screen-label="My Work">
      <header class="s-head"><span class="kicker">Section 07</span><h2>My Practical <em>Work</em></h2></header>
      <div class="themes">${themes}</div>
    </section>`;
  }

  /* ================= WALL ================= */
  function wall(notes) {
    const rots = [-2, 1.4, -1, 1.8, -1.5, 0.8, -2.1, 1.1, -0.7, 2, -1.3, 1.6, -1.8, 0.9];
    const cards = notes.map((n, i) =>
      `<div class="note cat-${n.cat} reveal" data-group="${n.group}" style="--rot:${rots[i % rots.length]}deg">
        <div class="wt">${esc(n.t)}</div>${n.a ? `<span class="wa">— ${esc(n.a)}</span>` : ""}
      </div>`).join("");
    const filters = [
      { id: "all", l: "Show all" },
      { id: "quotes", l: "Quotes only" },
      { id: "obs", l: "My observations" },
      { id: "texts", l: "Seminal texts" },
    ].map((f, i) =>
      `<button class="wall-filter ${i === 0 ? "active" : ""}" data-filter="${f.id}">${esc(f.l)}</button>`).join("");
    return `<section class="section" id="wall" data-screen-label="The Gathering Wall">
      <header class="s-head"><span class="kicker">Section 08</span><h2>The Gathering <em>Wall</em></h2>
      <p class="s-sub">Every voice that shaped the work, pinned to one wall. Filter by kind, and hover any note to lift it.</p></header>
      <div class="wall-bar">${filters}</div>
      <div class="wall" id="wallGrid">${cards}</div>
    </section>`;
  }

  /* ================= NAV ================= */
  const NAV = [
    { id: "cover", label: "Cover", icon: "cover" },
    { id: "brief", label: "The Brief", icon: "brief" },
    { id: "weeks", label: "The Weeks", icon: "weeks" },
    { id: "artist1", label: "Jenova Chen", icon: "artist1" },
    { id: "artist2", label: "Lauren Lee McCarthy", icon: "artist2" },
    { id: "synthesis", label: "Synthesis", icon: "synthesis" },
    { id: "work", label: "My Work", icon: "work" },
    { id: "wall", label: "Gathering Wall", icon: "wall" },
  ];
  function navHTML() {
    const btns = NAV.map((n) =>
      `<button class="nav__btn" data-target="${n.id}" aria-label="${esc(n.label)}">
        <svg viewBox="0 0 24 24">${ICONS[n.icon]}</svg>
        <span class="tip">${esc(n.label)}</span>
      </button>`).join("");
    return `<nav class="nav">
      <div class="nav__mark">A
        <svg class="nav__ring" viewBox="0 0 42 42"><circle class="bg" cx="21" cy="21" r="20"/>
        <circle class="fg" cx="21" cy="21" r="20" id="ring" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg>
      </div>
      <div class="nav__items">${btns}</div>
    </nav>`;
  }

  /* ================= MOUNT ================= */
  function render() {
    document.body.insertAdjacentHTML("afterbegin", navHTML());
    const app = $("#app");
    app.innerHTML =
      cover(J.cover) + brief(J.brief) + weeks(J.weeks) +
      artist(J.artists[0], 1) + artist(J.artists[1], 2) +
      synthesis(J.synthesis) + work(J.work) + wall(J.wall) +
      `<footer class="foot"><div class="fm reveal">Collected, connected, curated.</div>
       <div class="fmeta reveal rd1"><span>RR420 · Research &amp; Reflection</span><span>PGDip Interactive Development</span><span>Open Window · 2026</span></div></footer>`;

    setupReveal();
    setupNav();
    setupWeeks();
    setupFlip();
    setupWall();
    setupProgress();
  }

  function setupReveal() {
    const els = $$(".reveal");
    const show = (el) => el.classList.add("in");
    const showInstant = (el) => { el.classList.add("instant", "in"); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("instant"))); };
    const vh = window.innerHeight;
    els.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.95) showInstant(el); });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
      els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
    }
    function sweep() { const h = window.innerHeight; els.forEach((el) => { if (!el.classList.contains("in") && el.getBoundingClientRect().top < h * 0.92) show(el); }); }
    window.addEventListener("scroll", () => requestAnimationFrame(sweep), { passive: true });
    setTimeout(sweep, 500);
  }

  function setupNav() {
    const btns = $$(".nav__btn");
    btns.forEach((b) => b.addEventListener("click", () => {
      const t = document.getElementById(b.dataset.target);
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 6, behavior: "smooth" });
    }));
    const map = {}; btns.forEach((b) => map[b.dataset.target] = b);
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) { btns.forEach((b) => b.classList.remove("active")); if (map[e.target.id]) map[e.target.id].classList.add("active"); }
      });
    }, { rootMargin: "-45% 0px -55% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
  }

  function setupWeeks() {
    const weeks = $$(".week");
    function closeWk(wk) {
      const body = $(".week__body", wk);
      if (!wk.classList.contains("open")) return;
      body.style.height = body.scrollHeight + "px";
      void body.offsetHeight;            // reflow
      body.style.height = "0px";
      wk.classList.remove("open");
      $(".week__head", wk).setAttribute("aria-expanded", "false");
      // Guaranteed collapsed end-state even if the height transition stalls
      setTimeout(() => {
        if (!wk.classList.contains("open")) {
          body.style.transition = "none";
          body.style.height = "0px";
          void body.offsetHeight;
          body.style.transition = "";
        }
      }, 500);
    }
    function openWk(wk) {
      const body = $(".week__body", wk);
      const inner = $(".week__inner", wk);
      wk.classList.add("open");
      $(".week__head", wk).setAttribute("aria-expanded", "true");
      body.style.height = inner.offsetHeight + "px";
      const settle = () => { if (wk.classList.contains("open")) body.style.height = "auto"; };
      const onEnd = (e) => { if (e.target === body && e.propertyName === "height") { settle(); body.removeEventListener("transitionend", onEnd); } };
      body.addEventListener("transitionend", onEnd);
      // Guaranteed end-state even if the transition never advances (non-compositing stall)
      setTimeout(settle, 500);
    }
    weeks.forEach((wk) => {
      $(".week__head", wk).addEventListener("click", () => {
        const wasOpen = wk.classList.contains("open");
        weeks.forEach(closeWk);
        if (!wasOpen) openWk(wk);
      });
    });
  }

  function setupFlip() {
    $$(".flip").forEach((f) => {
      f.addEventListener("click", () => f.classList.toggle("flipped"));
      f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f.classList.toggle("flipped"); } });
    });
  }

  function setupWall() {
    const grid = $("#wallGrid");
    const notes = $$(".note", grid);
    $$(".wall-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".wall-filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        notes.forEach((n) => n.classList.toggle("hidden", f !== "all" && n.dataset.group !== f));
      });
    });
  }

  function setupProgress() {
    const ring = $("#ring");
    function update() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
      if (ring) ring.setAttribute("stroke-dashoffset", String(100 - p));
    }
    window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    update();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
