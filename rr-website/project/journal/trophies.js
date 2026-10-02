/* ============================================================
   trophies.js: one source of truth for trophies and progress.
   Loaded by the home screen (index.html) and by the journal page.
   Progress lasts for the current session only: it is kept in sessionStorage under
   "rr420.g.s1" / "rr420.g.s2", so it survives reloads and trips between the home
   screen and the journals, and every new visit starts from zero.
   Nothing is locked: every trophy is earned by exploring content that is
   always open, so the journal reads the same with or without the game layer.
   ============================================================ */
(function () {
  var DEFS = {
    s1: [
      { id: "platinum", g: "platinum", name: "Journal Complete", desc: "Earn every other trophy in this journal." },
      { id: "weeksAll", g: "gold", name: "Every Week", desc: "Open every weekly entry." },
      { id: "weeks5", g: "silver", name: "Regular", desc: "Open five weekly entries." },
      { id: "flipAll", g: "silver", name: "Full Circle", desc: "Flip every card in the synthesis." },
      { id: "collectMost", g: "silver", name: "Curator", desc: "Collect fifteen notes on the Gathering Wall.", n: 15 },
      { id: "map", g: "silver", name: "Cartographer", desc: "Visit every section of the journal." },
      { id: "start", g: "bronze", name: "Press Start", desc: "Start the journal." },
      { id: "brief", g: "bronze", name: "Know the Rules", desc: "Read the brief." },
      { id: "week1", g: "bronze", name: "First Entry", desc: "Open your first weekly entry." },
      { id: "chen", g: "bronze", name: "Meet Jenova Chen", desc: "Read the Jenova Chen section." },
      { id: "mccarthy", g: "bronze", name: "Meet Lauren Lee McCarthy", desc: "Read the Lauren Lee McCarthy section." },
      { id: "flip1", g: "bronze", name: "Connect the Dots", desc: "Flip a card in the synthesis." },
      { id: "work", g: "bronze", name: "Hands On", desc: "Look at the practical work." },
      { id: "collect5", g: "bronze", name: "Collector", desc: "Collect five notes on the Gathering Wall.", n: 5 },
      { id: "sequel", g: "bronze", name: "Both Chapters", desc: "Open the Semester 2 journal." },
      { id: "cheat", g: "bronze", name: "Cheat Code", desc: "Enter the code. Some habits never die.", hidden: true }
    ],
    s2: [
      { id: "platinum", g: "platinum", name: "Journal Complete", desc: "Earn every other trophy in this journal." },
      { id: "weeksAll", g: "gold", name: "Every Week", desc: "Open every weekly entry." },
      { id: "weeks4", g: "silver", name: "Halfway There", desc: "Open four weekly entries." },
      { id: "evidence", g: "silver", name: "Show Your Work", desc: "See every piece of evidence in the Research Report section." },
      { id: "collectMost", g: "silver", name: "Curator", desc: "Collect eight notes on the Gathering Wall.", n: 8 },
      { id: "map", g: "silver", name: "Cartographer", desc: "Visit every section of the journal." },
      { id: "start", g: "bronze", name: "Press Start", desc: "Start the journal." },
      { id: "brief", g: "bronze", name: "Know the Rules", desc: "Read the brief." },
      { id: "week1", g: "bronze", name: "First Entry", desc: "Open your first weekly entry." },
      { id: "report", g: "bronze", name: "Progress Report", desc: "Read the Research Report progress section." },
      { id: "collect5", g: "bronze", name: "Collector", desc: "Collect five notes on the Gathering Wall.", n: 5 },
      { id: "sequel", g: "bronze", name: "Both Chapters", desc: "Open the Semester 1 journal." },
      { id: "cheat", g: "bronze", name: "Cheat Code", desc: "Enter the code. Some habits never die.", hidden: true }
    ]
  };

  /* Milestones from the year itself (shown on the home screen). state: done | progress | locked */
  var YEAR = [
    { g: "platinum", name: "The Whole Year", desc: "Present the finished Research Report (Week 15).", state: "locked" },
    { g: "gold", name: "Research Report", desc: "Progress mark presented in Week 9. The report itself is in progress.", state: "progress" },
    { g: "silver", name: "Lulama", desc: "Built a 3D AI avatar with Three.js and the Claude API for CHOSA.", state: "done" },
    { g: "silver", name: "The Ritual Room", desc: "Built the Masonic Temple puzzle experience for Union Lodge No. 1 Kimberley.", state: "done" },
    { g: "bronze", name: "Founder", desc: "Co-founded Stack Studio.", state: "done" },
    { g: "bronze", name: "Gatherer", desc: "Shipped the Semester 1 journal.", state: "done" },
    { g: "bronze", name: "Statement of Intent", desc: "Wrote this manifesto.", state: "done" },
    { g: "bronze", name: "Second Semester", desc: "Semester 2 journal: six of eight weeks logged so far.", state: "progress" }
  ];

  /* Whether someone has signed in on the home screen this tab (sessionStorage), so reloads skip the sign-in. */
  function user() { try { return sessionStorage.getItem("rr420.user"); } catch (e) { return null; } }
  function setUser(u) { try { if (u) sessionStorage.setItem("rr420.user", u); else sessionStorage.removeItem("rr420.user"); } catch (e) {} }
  function store() { try { return window.sessionStorage; } catch (e) { return null; } }
  // progress used to be kept for good in localStorage; clear any left over from before
  try { localStorage.removeItem("rr420.g.s1"); localStorage.removeItem("rr420.g.s2"); localStorage.removeItem("rr420.p.last.s1"); localStorage.removeItem("rr420.p.last.s2"); } catch (e) {}
  function key(sem) { return "rr420.g." + sem; }
  function blank() { return { earned: {}, weeks: [], flips: [], notes: [], evid: [], seen: {}, started: 0, cheat: 0, opened: 0 }; }
  function load(sem) {
    var o = null;
    try { o = JSON.parse(store().getItem(key(sem)) || "null"); } catch (e) {}
    var b = blank();
    if (o && typeof o === "object") for (var k in b) if (o[k] !== undefined && o[k] !== null) b[k] = o[k];
    return b;
  }
  function save(sem, st) { try { store().setItem(key(sem), JSON.stringify(st)); } catch (e) {} }
  function progress(sem) {
    var st = load(sem), c = { platinum: 0, gold: 0, silver: 0, bronze: 0 }, n = 0;
    DEFS[sem].forEach(function (d) { if (st.earned[d.id]) { c[d.g]++; n++; } });
    var t = DEFS[sem].length;
    return { earned: n, total: t, pct: Math.round(n / t * 100), counts: c };
  }

  window.RR = { defs: DEFS, year: YEAR, load: load, save: save, progress: progress, blank: blank, user: user, setUser: setUser };
})();
