/* ============================================================
   content.js — Journal Development Project · RR420 · Armand
   All real content from the brief. SA/British English.
   Prose written in plain voice (no dashes in own-voice sentences).
   Direct quotations are kept verbatim as citations.
   ============================================================ */
window.JOURNAL = {

  cover: {
    kicker: "RR420 · Research & Reflection · Semester 1, 2026",
    title: "Journal Development Project",
    author: "Armand · PGDip Interactive Development · Open Window",
    tags: [
      { k: "Artist 1", v: "Jenova Chen", c: "coral" },
      { k: "Artist 2", v: "Lauren Lee McCarthy", c: "blue" },
      { k: "Theme 1", v: "Masonic interactive website", c: "amber" },
      { k: "Theme 2", v: "Lulama / CHOSA", c: "teal" },
    ],
    intro: "This journal maps a continuous process of conceptual gleaning, gathering, connection, ideation and creative development across Semester 1, 2026.",
    img: "Drop a cover image that feels like the inside of a designed system",
  },

  brief: {
    todo: [
      "Throughout the semester gather and glean bits and pieces from various texts, both class and own research. Track your own creative processes alongside practical work.",
      "Every week collect anything that inspires you or is relevant to your work as an artist. Words, images, links.",
      "Use the space in any way you like. Don't let the hand-in get in the way of creative flow.",
      "Identify two artists working in a similar or closely related field to your own practical work.",
      "Find interviews with each artist about their work and creative process. Extract meaningful quotes.",
      "Find articles and reviews where others discuss the artists' work. Extract meaningful quotes.",
      "Write your own observations: what draws you to their work? What themes do they explore?",
      "Progress sessions: Week 7, Week 13, Week 15.",
      "Week 16 presentation: Google Slides, Miro board, sketchnote video essay, or physical journal.",
    ],
    keyword: {
      label: "Key word from the lecturer",
      word: "Curatorship",
      gloss: "Can I tell there is a mind behind the gathering?",
    },
  },

  weeks: [
    {
      n: 1, title: "The Power of Journalling", hue: "amber",
      img: "A practitioner's journal, your desk, or your own handwriting",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "A journal is a ready-to-hand dispensable surface. Always near you, no viewer, no pressure. Not for display. For the process.",
          "Six reasons to journal: a scratchpad; freedom from judgement; a place that stores and develops ideas; a way to build identity; a means of increasing creativity through repetition; a vehicle that carries work from potentiality to realised form.",
          "Real practitioner journals were shown in class: filmmakers, fine artists, sculptors, poets, interactive developers.",
          "Key marking criterion: CURATORSHIP. Can I tell there is a mind behind the gathering?",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "The act of writing is an integral part of my mental life; ideas emerge, are shaped, in the act of writing.", a: "Oliver Sacks" },
          { t: "In the journal I do not just express myself more openly than I could to any person; I create myself.", a: "Susan Sontag, age 24" },
          { t: "We are well advised to keep on nodding terms with the people we used to be.", a: "Joan Didion" },
        ]},
        { kind: "reflection", label: "My reflection", paras: [
          "I've been journalling in code all along: commit messages, README files, commented-out experiments I never delete. That's a journal in a syntax nobody reads as reflection.",
        ]},
      ],
    },
    {
      n: 2, title: "Digital Journalling & Capturing Your Process", hue: "teal",
      img: "A commit history, a dev log, or a wireframe iteration",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Documentation isn't a changelog. It's a mirror held up to the making process itself.",
          "Key question: what does capturing your process look like for your medium? For interactive development that means commit history, screen recordings, wireframe iterations, dev logs.",
        ]},
        { kind: "reflection", label: "My reflection", paras: [
          "A commit message says what changed. It doesn't say why I changed my mind three times before landing there. That gap is the actual journal.",
        ]},
        { kind: "reflection", label: "Practical work note", paras: [
          "Theme 1 (Masonic site): started sketching information architecture. Challenge: how do you make a site feel like a ritual without explaining the ritual?",
        ]},
      ],
    },
    {
      n: 3, title: "Everyday Creativity", hue: "coral",
      source: "Rick Rubin, On Being with Krista Tippett. David Lynch on firewood.",
      img: "Your firewood pile: a saved UI screenshot or reference that gives you goosebumps",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Rubin: creativity is not manufactured, it's tuned into. A signal always broadcasting. Your job is to get your own noise out of the way.",
          "Pay attention to what gives you goosebumps. Not what should move you, but what actually does something to your body.",
          "David Lynch, from Catching the Big Fish: gathering firewood, stockpiles of references so when you need fuel, it's already there.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "Creativity is a way of being rather than doing that beckons to all of us in everything we do.", a: "Rick Rubin" },
          { t: "I'm always trying to gather what I call firewood. You just pop one thing in, and you realise right away — oh, that is not working.", a: "David Lynch" },
        ]},
        { kind: "reflection", label: "My goosebumps list", paras: [
          "A UI that disappears when you don't need it. Metal Gear codec calls. Death Stranding's likes system. Loading screens that belong to the world.",
        ]},
        { kind: "reflection", label: "My firewood pile", paras: [
          "Saved UI screenshots, open tabs, game screenshot folders, GDC talk bookmarks. I never thought of this as part of the work. It is.",
        ]},
      ],
    },
    {
      n: 4, title: "The Humanities as an Interconnected Space", hue: "blue",
      img: "Something that pulls in many threads at once: a book, a place, a system",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Humanities encompasses literature, philosophy, history, linguistics, arts, cultural studies and ethics, all trying to articulate what it means to be human.",
          "Qualitative research equals words, meaning, depth: the why. Quantitative research equals numbers, patterns, breadth: the what.",
          "Blindboy podcast on a lost Irish stone-lifting tradition: one curiosity pulled in Celtic history, oral culture, geology, anthropology. You can't follow one thread without pulling the whole weave.",
        ]},
        { kind: "reflection", label: "My reflections", paras: [
          "UI/UX design IS humanities work. Decisions about how people feel and how they move are cultural practice, not just engineering.",
          "My industry defaults to quantitative: click rates, heatmaps. That tells me what happened. Qualitative research tells me why. I've been missing the why.",
        ]},
      ],
    },
    {
      n: 5, title: "Research Into Your Field", hue: "amber",
      img: "An interface you keep circling back to, your psychological preoccupation",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "What are your psychological preoccupations? Not what you make, but what you always circle back to subconsciously.",
          "Becoming aware of your preoccupations is what takes you from maker to artist. Identity is not a fixed essence. It's a constant becoming.",
        ]},
        { kind: "reflection", label: "My preoccupations", paras: [
          "The threshold between using an interface and being inside an experience. The moment someone stops being aware they're operating a system and just starts living inside it.",
          "What is irreducibly human in a system designed to simulate humanity? Lulama is an AI designed to feel human. What does that cost?",
        ]},
      ],
    },
    {
      n: 6, title: "Humanities as Interdisciplinary Research, Part 2", hue: "teal",
      img: "A membrane, a threshold, a doorway: your word INTERFACE, made visual",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Harvard Study of Adult Development, running since 1938, 80 years. Finding: quality of relationships is the single strongest predictor of a long, healthy, happy life. Not wealth. Not status. Connection.",
          "Doing humanities work means unpacking your key words for yourself.",
        ]},
        { kind: "reflection", label: "Unpacking my key words", paras: [
          "INTERFACE: a threshold. The place where two worlds meet. Not a barrier but a membrane. Something deliberately permeable.",
          "CONNECTION: felt connection. When someone reading a donor story feels something real even though it's mediated by AI. That's the Lulama challenge.",
        ]},
      ],
    },
    {
      n: 7, title: "Unpacking the Word \u201CText\u201D", hue: "coral",
      img: "A seminal text: a film still, album art, or game that is a chapter title for you",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Texere (Latin) equals to weave, to join, to construct, to build. Textus equals thing woven.",
          "Any artwork is a text: film, game, interface, poem. Interpretation is a negotiation between what the artist encodes and what the viewer brings.",
          "Collect seminal texts: films, songs, games that are chapter titles in your narrative.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "Interpretation is a process of negotiation between what is in the text and what people bring to it.", a: "Carter & Godard" },
          { t: "Authenticity is invaluable; originality is nonexistent. Select only things to steal that speak directly to your soul.", a: "Jim Jarmusch" },
        ]},
        { kind: "reflection", label: "My reflection", paras: [
          "Every interface I build is a woven thing. I am technically a weaver. I can't control the meaning, only shape the conditions for it.",
        ]},
      ],
    },
    {
      n: 8, title: "Around the Fire", hue: "amber",
      img: "A piece of your creative-life Venn diagram: a game, a build, a moment",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Your whole goal is to gather bits and pieces from various texts. Hopefully you're sitting with a physical journal in front of you.",
          "Week 9 equals progress check. Include everything in your creative life this year: gaming, building, music, activities outside school. It all forms a Venn diagram of your life as a creative person.",
        ]},
        { kind: "reflection", label: "Key takeaways", paras: [
          "What the journal is NOT: not class notes, not a summary. It is YOUR gathering, the things that speak to you personally.",
          "The Division 2 is part of this journal. The cyberdeck build is part of this journal. The way Death Stranding made me feel connection through silence is part of this journal.",
        ]},
      ],
    },
    {
      n: 11, title: "Your Job as an Artist", hue: "blue",
      img: "Your ikigai, your calling, your desk at 2am, what you can't not do",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "The class unpacked the word job, pushing past it toward role (responsibility), duty (moral conscience, discipline), calling (spiritual impulse), and point (existential meaning). Each word gives a completely different angle on what it means to be a creative person.",
          "During lockdown, a national South African survey ranked artists as the least important profession. Yet art was what got people through: series, music, films, podcasts. The contradiction is worth sitting with.",
          "Ikigai has four quadrants: what you love, what the world needs, what you can be paid for, what you are good at. Your ikigai sits at the intersection of all four.",
          "Tim Minchin's life lessons: you don't have to have a dream, just be micro-ambitious; don't seek happiness; it's all luck; exercise; be hard on your opinions, take them out and hit them with a cricket bat. Cultural identity is not a fixed essence, it is a constant becoming (Stuart Hall). E.B. White, 1969: writers do not merely reflect and interpret life, they inform and shape life.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "An artist's duty, as far as I'm concerned, is to reflect the times.", a: "Nina Simone" },
          { t: "I only write when inspiration strikes. Thankfully it strikes every morning at 6am when I sit down at my desk. The discipline is the inspiration.", a: "W. Somerset Maugham" },
          { t: "Be micro-ambitious. Put your head down and work with pride on whatever is in front of you. The next worthy pursuit will probably appear in your periphery.", a: "Tim Minchin" },
          { t: "Your job as an artist is to create meaning, create beauty, create transformative experience. You are an agent of culture, not a functionary of the social order. No matter how insignificant you think its impact, you cannot know down the channels of time what it will touch.", a: "The Instagram poem" },
        ]},
        { kind: "reflection", label: "My reflections", paras: [
          "Stack Studio ticks all four ikigai quadrants. But the ikigai is not the company. It is the specific kind of work: building systems that make people feel something. Lulama and the Masonic site tick all four in a way a standard SME website project doesn't.",
          "I've always thought of what I do as a job. This class made me uncomfortable in a useful way. The moment I describe it as a calling, something I can't not do, the frame shifts completely. I notice I think about interface design at 2am. That's data.",
        ]},
      ],
    },
    {
      n: 12, title: "Creativity as Gleaning", hue: "teal",
      source: "Agnès Varda, The Gleaners and I (2000). Montaigne · Maria Popova · Austin Kleon · Everything is a Remix.",
      img: "A gleaned fragment, something from your old material you're seeing fresh",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Gleaning comes from the agricultural practice of going through a harvested field after the farmers have left, picking up the useful fragments left behind. Agnès Varda's documentary The Gleaners and I extends this to creative practice: a gleaner works backwards through what has already been harvested to find what's still useful.",
          "Montaigne's central idea: all creativity is combinatorial. We take existing things, weave them together with our own thread, and call the result original. The thread is the only thing that is actually ours.",
          "Maria Popova (The Marginalian): creativity is Lego-like. We assemble building blocks of existing knowledge into new formations. The magpie mind collects shiny things from everywhere and takes them back to the nest.",
          "Austin Kleon: you need two systems, one for collecting and one for going back through your old material. Without both, the collection is useless. Stephen King writes three hours every morning and reads all afternoon; the ratio of input to output must be at least 1:1.",
          "The Books are a band built entirely from found sound. Everything is a Remix (Kirby Ferguson): copy, transform, combine. Oliver Sacks on the creative self: children learn through copying and imitating, and the copies accumulate until a new voice emerges.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "I have gathered a posy of other people's flowers and nothing but the thread that binds them is mine own.", a: "Montaigne" },
          { t: "The assemblage of existing ideas is nothing without the critical thinking of the assembler.", a: "Maria Popova" },
          { t: "You've got to have a system for collecting things and then a system for going back through them.", a: "Austin Kleon" },
          { t: "I love the idea of emergence. Instead of trying to plan anything, you just set up a situation where something is bound to happen.", a: "Nick Zamuto, The Books" },
          { t: "All creative ideas are derivative of another. Copy, transform, combine.", a: "Kirby Ferguson" },
        ]},
        { kind: "reflection", label: "My reflections", paras: [
          "I've been collecting for years: bookmarks, screenshots, GDC talk folders, UI reference libraries. I've never thought of this as creative work. This class named it. But the collection is nothing without the thread. My thread is the question: what does it feel like to be inside a designed system?",
          "Austin Kleon's second system, going back through old material, is the part I've never done. My commit history goes back years. I've never treated it as a source. That's where the good work actually lives: in the thing you made two years ago that you didn't understand yet.",
        ]},
        { kind: "reflection", label: "Connection to artists", paras: [
          "Jenova Chen spent three years prototyping Journey before anything worked, gleaning his own failed experiments. Lauren McCarthy's LAUREN was built from years of accumulated research. Both artists are systematic gleaners. The work that looks spontaneous is built on accumulated material.",
        ]},
      ],
    },
  ],

  artists: [
    {
      id: "artist1", name: "Jenova Chen", hue: "coral", slot: "portrait-chen",
      bio: "Co-founder of thatgamecompany. Creator of Flow, Flower, Journey, Sky. MFA from USC. BAFTA winner.",
      columns: [
        { label: "From his own interviews", kind: "pull", items: [
          { t: "Entertainment is the food for emotion. When humans are hungry, they look for food. But they are also hungry for certain feelings.", a: "Fast Company, 2012" },
          { t: "There is an emotion missing in modern society — a sense of wonder, a sense of awe at the fact that you are so small and not empowered.", a: "Fast Company, 2012" },
          { t: "We build our games like a Japanese garden — the design is perfect when you cannot remove anything else.", a: "Game Developer" },
          { t: "Can games make you and another human experience an emotion deep enough to touch adults?", a: "Game Developer" },
          { t: "Music is the most effective and powerful medium that can create emotion. Prototyping always begins with music.", a: "GDC, 2013" },
        ]},
        { label: "What critics say", kind: "quotes", items: [
          { t: "Chen designed his games around the idea that the primary purpose of entertainment was the feelings evoked in the audience, and that the emotional range of most games was very limited." },
          { t: "Journey's skeletal mechanics are at the core of his philosophy. By removing power and tasks, he forced players to care about each other through action rather than words." },
        ]},
        { label: "My observations", kind: "notes", items: [
          { t: "Chen starts from feeling: what should the player feel? Then works backwards to mechanics, UI, visual language. I start from the system. Flipping this is one of the most useful ideas from this semester." },
          { t: "Journey's multiplayer removes power and tasks so players feel connection. That's structurally what Lulama does: strip back the clinical donation experience and leave only the human story." },
          { t: "Chen lists Ico and Shadow of the Colossus as greatest influences. His work and McCarthy's both trace back to the same root question: what does it mean to connect through a designed system?" },
        ]},
      ],
      sources: "Sources to find: GDC 2013 “Designing Journey” on GDC Vault. Fast Company interview, 2012. Game Developer magazine profile. His USC MFA thesis on flow theory.",
    },
    {
      id: "artist2", name: "Lauren Lee McCarthy", hue: "blue", slot: "portrait-mccarthy",
      bio: "Artist and developer. UCLA Design Media Arts. Creator of p5.js (1.5 million users). Stanford AI Artist in Residence 2022–23. Whitney Museum collection. Ars Electronica Golden Nica winner.",
      columns: [
        { label: "From her own interviews", kind: "pull", items: [
          { t: "The systems we build — both technical and social — shape the way we live together. Apps and tools are not a neutral presence.", a: "Stanford HAI, 2022" },
          { t: "The algorithmic world is a mirror; it reflects back how we understand and see ourselves. I'm always looking for the glitches that break us out of the feedback loop.", a: "Beyond Automation, 2025" },
          { t: "I'm often making work that is really just about what's most confusing to me at the moment.", a: "Stanford Arts" },
          { t: "Who is prioritised? Who is marginalised? How can we build technology that does not just reinforce existing hierarchies?", a: "Just Tech, 2022" },
        ]},
        { label: "Key projects & what critics say", kind: "quotes", items: [
          { t: "LAUREN (2019): McCarthy became a human Alexa in strangers' homes for 3 days, watching 24/7, controlling everything. “The last remaining role for people may be performing the emotional labour to act as human interface to AI.” (Barbican)" },
          { t: "Follower (2015): physically followed participants for a day without being seen." },
          { t: "p5.js: open-source creative coding for 1.5 million users. Her values baked into the tool itself." },
        ]},
        { label: "My observations", kind: "notes", items: [
          { t: "McCarthy is a developer who makes art about the ethical questions inside her own tools. That's the move I want to make: not just build the thing, but ask what it costs." },
          { t: "LAUREN equals human performing as AI. Lulama equals AI performing as human. Same question, mirrored." },
          { t: "She created p5.js because creative coding was inaccessible. Same impulse behind Lulama: technology that meets people where they are." },
        ]},
      ],
    },
  ],

  synthesis: {
    threads: [
      { n: "01", t: "Interface as feeling", d: "Chen: no UI equals pure emotion. McCarthy: human as interface equals exposed intimacy. Masonic site: hidden structure equals ritual feeling. All three design for what cannot be said directly.",
        back: { w: "W1 · Journalling", d: "Both artists' practices are rooted in obsessive documentation. Chen spent three years prototyping Journey; McCarthy's research for LAUREN took months of preparation. The journal precedes the work." } },
      { n: "02", t: "The human in the system", d: "McCarthy asks what happens when AI replaces the human. Chen asks what happens when you remove human power. Both circle the same question: what is irreducibly human? Lulama lives exactly inside that question.",
        back: { w: "W3 · Firewood", d: "Chen starts every game with music, building emotional firewood. McCarthy describes her work as coming from “what's most confusing to me at the moment”, and she makes the confusion the material." } },
      { n: "03", t: "Code as creative practice", d: "Both practitioners who code. McCarthy made p5.js. Chen programmed Cloud as a student. Neither separates the technical from the artistic. That's how I want to work.",
        back: { w: "W4 · Humanities", d: "Chen's work crosses game design, psychology, film theory, music theory. McCarthy's crosses computer science, feminist theory, performance art, surveillance studies. Both are humanities practitioners." } },
      { n: "04", t: "Design by subtraction", d: "Chen removes until perfect. McCarthy strips the smart home of its techno-utopian veneer. W7 texere connection: weaving by choosing which threads to leave out.",
        back: { w: "W7 · Text as weave", d: "Chen's Journey is woven from the Jungian hero's journey, online multiplayer psychology, colour theory and musical structure. McCarthy's LAUREN is woven from feminist theory, surveillance studies and domestic labour literature." } },
      { n: "05", t: "Ethics of representation", d: "McCarthy: whose values are baked into the tool? Chen: whose emotions does the industry cater for? Lulama: who gets to tell CHOSA's story? Design is always a political act.",
        back: { w: "W11 · Calling", d: "Chen's lifelong preoccupation equals the emotional range of games. McCarthy's equals the ethics of systems we build without questioning. Both have one deep question they return to in every project." } },
      { n: "06", t: "Woven texts", d: "Chen weaves Journey from Jungian theory, psychology, music, colour theory. McCarthy weaves LAUREN from feminist theory, surveillance studies, domestic labour literature. Both are weavers in the W7 sense.",
        back: { w: "W12 · Gleaning", d: "Chen gleaned three years of failed prototypes before Journey worked. McCarthy gleaned years of research before LAUREN was possible. Both are systematic gleaners." } },
    ],
  },

  work: {
    themes: [
      { k: "Theme 1", title: "Masonic interactive website", hue: "amber", slot: "work-masonic",
        rows: [
          { k: "Concept", v: "An interactive web experience exploring Masonic symbolism and ritual. Design challenge: how do you make a site feel ritualistic through withholding, not showing? The symbol works because of what it withholds." },
          { k: "Chen connection", v: "Japanese garden principle: perfect when nothing more can be removed. The Masonic aesthetic demands the same." },
          { k: "Current state", v: "Working through information architecture. Figma explorations underway." },
        ]},
      { k: "Theme 2", title: "Lulama / CHOSA AI chatbot", hue: "teal", slot: "work-lulama",
        rows: [
          { k: "Concept", v: "AI identity proxy for CHOSA (Children of South Africa). Lulama is a fictional 24-year-old youth coordinator from Khayelitsha guiding donors through Connection → Revelation → The Ask." },
          { k: "Technical", v: "Three.js avatar with blinking, idle movement, mouth animation. Claude API integration. Core features working." },
          { k: "McCarthy connection", v: "LAUREN equals human performing as AI. Lulama equals AI performing as human. Same ethical question, mirrored." },
          { k: "Chen connection", v: "If you remove power and tasks, people connect. Lulama removes the clinical donation interface and replaces it with a story. The ask comes last." },
        ]},
    ],
  },

  /* cat → colour. group → filter bucket (quotes / obs / texts) */
  wall: [
    { cat: "class", group: "quotes", t: "In the journal I do not just express myself more openly than I could to any person; I create myself.", a: "Susan Sontag" },
    { cat: "obs", group: "obs", t: "The threshold between using an interface and being inside an experience. That's what I keep studying." },
    { cat: "mccarthy", group: "quotes", t: "The algorithmic world is a mirror.", a: "McCarthy" },
    { cat: "text", group: "texts", t: "Journey: emotional multiplayer." },
    { cat: "mccarthy", group: "quotes", t: "The last remaining role for people may be performing the emotional labour to act as human interface to AI.", a: "Barbican, on McCarthy" },
    { cat: "class", group: "quotes", t: "Authenticity is invaluable; originality is nonexistent.", a: "Jim Jarmusch" },
    { cat: "chen", group: "quotes", t: "Entertainment is the food for emotion.", a: "Chen" },
    { cat: "class", group: "quotes", t: "Interpretation is a process of negotiation between what is in the text and what people bring to it.", a: "Carter & Godard" },
    { cat: "obs", group: "obs", t: "A commit message says what changed. It doesn't say why I changed my mind three times. That gap is the actual journal." },
    { cat: "chen", group: "quotes", t: "We build our games like a Japanese garden.", a: "Chen" },
    { cat: "obs", group: "obs", t: "Every interface I build is a woven thing. I am technically a weaver." },
    { cat: "lecturer", group: "quotes", t: "Include everything in your creative life this year: it all forms a Venn diagram of your life as a creative person.", a: "Lecturer, W8" },
    { cat: "obs", group: "obs", t: "UI/UX design IS humanities work. I've been doing humanities without calling it that." },
    { cat: "class", group: "quotes", t: "I'm always trying to gather what I call firewood.", a: "David Lynch" },
    { cat: "class", group: "quotes", t: "We are well advised to keep on nodding terms with the people we used to be.", a: "Joan Didion" },
    { cat: "text", group: "texts", t: "Metal Gear codec calls: interface as fourth wall." },
    { cat: "text", group: "texts", t: "Death Stranding: connection through silence." },
    { cat: "text", group: "texts", t: "Death Stranding: likes as love language." },
    { cat: "text", group: "texts", t: "p5.js: code as access." },
    { cat: "class", group: "quotes", t: "Creativity is a way of being rather than doing.", a: "Rick Rubin" },
    { cat: "mccarthy", group: "quotes", t: "The systems we build shape the way we live together. They are not neutral.", a: "McCarthy" },
    { cat: "class", group: "quotes", t: "An artist's duty, as far as I'm concerned, is to reflect the times.", a: "Nina Simone" },
    { cat: "class", group: "quotes", t: "I have gathered a posy of other people's flowers and nothing but the thread that binds them is mine own.", a: "Montaigne" },
    { cat: "class", group: "quotes", t: "You've got to have a system for collecting things and then a system for going back through them.", a: "Austin Kleon" },
    { cat: "class", group: "quotes", t: "I love the idea of emergence. Instead of trying to plan anything, you just set up a situation where something is bound to happen.", a: "Nick Zamuto, The Books" },
    { cat: "class", group: "quotes", t: "Writers do not merely reflect and interpret life — they inform and shape life.", a: "E.B. White" },
    { cat: "obs", group: "obs", t: "My thread is the question: what does it feel like to be inside a designed system?" },
    { cat: "obs", group: "obs", t: "The collection is nothing without the thread. Collecting is not curating. The connection is the creative act." },
    { cat: "class", group: "quotes", t: "Your job as an artist is to create meaning, create beauty, create transformative experience. You are an agent of culture, not a functionary of the social order." },
  ],
};
