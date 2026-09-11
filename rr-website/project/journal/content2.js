/* ============================================================
   content2.js — Journal Development Project · RR420 · Semester 2
   Term 3–4: Writing about one's own practice.
   SA/British English. Prose written in plain voice (no dashes in
   own-voice sentences). Direct quotations kept verbatim as citations.
   "Your reflection" blocks are intentionally left as prompts —
   fill these in with your own voice before submission.
   ============================================================ */
window.JOURNAL2 = {

  cover: {
    kicker: "RR420 · Research & Reflection · Semester 2, 2026",
    title: "Journal Development Project",
    author: "Armand · PGDip Interactive Development · Open Window",
    tags: [
      { k: "Term 3", v: "Writing for an audience", c: "amber" },
      { k: "Term 4", v: "Writing about one's own practice", c: "teal" },
      { k: "Assignment 1", v: "Journal Development Project", c: "blue" },
      { k: "Assignment 2", v: "Manifesto", c: "coral" },
    ],
    intro: "This journal continues the gleaning, gathering and connecting begun in Semester 1, now aimed at a specific outcome: planning and developing the text that becomes the Research Report, and the statement of intent that becomes the Manifesto.",
    img: "Drop a Semester 2 cover image",
  },

  brief: {
    todo: [
      "Throughout the semester, gather and glean bits and pieces from texts engaged with in class and in your own research time.",
      "Track your own creative processes alongside your practical creative work.",
      "Every week, collect anything that inspires you or feels relevant to your work as an artist or your creative process — words, images, links.",
      "Use the journal space in any way you like. Don't let the hand-in get in the way of the creative flow or the stream of consciousness.",
      "Use your journals to plan and develop a text which is a reflection on your own practical work.",
      "Progress and feedback session in class, Week 12.",
      "Week 13: present the journal development project to the class — Google Slides (12–25), a well-designed Miro board, a sketchnote video essay (3–8 min), or a physical journal (10–20 pages).",
    ],
    keyword: {
      label: "Key word from the brief",
      word: "Curatorship",
      gloss: "Is there a sense of an interested mind gleaning and gathering, and is there evidence that ideas are developing and connecting across the semester?",
    },
  },

  weeks: [
    {
      n: 1, title: "Writing alongside what you're making", hue: "amber",
      img: "A page from your journal written while you were still mid-build",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Session opened with Nick Cave's The Red Hand Files, a site he started in September 2018 as a place to answer questions from fans. It has since outgrown that original idea and become something closer to a public journal, written in response to other people.",
          "Cross-disciplinary thinkers (Leonardo da Vinci, Oliver Sacks, Maria Popova) were held up as models for the kind of synthesis writing can do: connecting things from different worlds with each other to make new ideas, a skill increasingly outsourced to machines.",
          "The postmortem essay by Tony Zhao and Taylor Ramos (Every Frame a Painting) was read closely as an example of writing alongside a practice: two people thinking and disagreeing with each other in public about their own work, years after making it.",
          "Practical instruction repeated from the essay: 'your work is only as good as your research' — read, watch, borrow from libraries and archives, test ideas out loud before committing to them.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "The Red Hand Files began in September of 2018 as a simple idea, a place where I would answer questions from my fans.", a: "Nick Cave" },
          { t: "These videos were made by the both of us — written and edited by Taylor Ramos and Tony Zhao.", a: "Tony Zhao & Taylor Ramos, Every Frame a Painting" },
          { t: "Your work is only as good as your research.", a: "Every Frame a Painting, postmortem" },
        ]},
        { kind: "reflection", label: "Your reflection", paras: [
          "[Add your own reflection: where in your own commit history, sketches or notes have you already been writing alongside the work without calling it that?]",
        ]},
      ],
    },
    {
      n: 2, title: "Manifesto writing", hue: "coral",
      img: "A working draft or scribble of your own statement of intent",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Manifesto distinguished from an artist bio: a bio describes what you have done, a manifesto is a statement of intent about what you stand for and where you are going.",
          "Marina Abramović's manifesto was worked through in class as a structural model: short, repeated, declarative lines, organised by category (life, love, the erotic, suffering, depression, inspiration), building a clear rhythm and a standpoint rather than an explanation.",
          "Discussed as a counterpoint: David Lynch's rejection of the suffering-artist idea, against Abramović's own line that an artist should suffer. The lecturer noted these can genuinely disagree, a manifesto does not need to align with anyone else's.",
          "Referenced Stuart Hall's idea that cultural identity is a constant becoming — used as a prompt for the manifesto's central questions: who are you now, who do you want to become.",
          "Noted that a manifesto can change over time; it is a snapshot of an artist's position at a given point, not a fixed document.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "An artist should not lie to himself or to others. An artist should not steal ideas from other artists.", a: "Marina Abramović, An Artist's Life Manifesto" },
          { t: "An artist should avoid falling in love with another artist.", a: "Marina Abramović" },
          { t: "Cultural identity is a matter of 'becoming' as well as of 'being'.", a: "Stuart Hall" },
        ]},
        { kind: "reflection", label: "Your reflection", paras: [
          "[Add your own reflection: what is your current statement of intent, in one or two sentences, before it gets refined into the final Manifesto?]",
        ]},
      ],
    },
    {
      n: 3, title: "Discourses: connecting ideas to work", hue: "teal",
      img: "A diagram or note linking your work to a theoretical text",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Central idea: no work made on a tertiary programme exists in isolation from theory. The session worked to de-mystify 'discourse' and 'theory' as words that provoke anxiety, by showing how they connect directly to visual and material practice.",
          "Faith Ringgold discussed as an African-American artist whose work sits at the intersection of painting, quilting and storytelling, and who argued for craft materials as equally capable of carrying serious content as fine art materials.",
          "Textile artist Anne Wilson's 2019 interview was used to unpack the hierarchy between craft and fine art: her answer to 'does everyday use help or hinder textiles' standing as a fine art material' framed the same tension Ringgold's work also pushes against.",
          "Womanhouse (1972) presented as a landmark feminist art exhibition: a group of artists took over an actual house and each took a room, turning domestic space itself into gallery space and subject matter.",
          "Clement Greenberg's writing on textiles as metaphorically foundational to all the arts was used to connect craft discourse back to formalist art criticism.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "None of the work we make, especially on a tertiary programme, exists in isolation from theory.", a: "Lecturer, W3" },
          { t: "Everyone uses textiles in their daily life. Does that help or hinder their standing as a fine art material?", a: "Interviewer, on Anne Wilson, 2019" },
        ]},
        { kind: "reflection", label: "Your reflection", paras: [
          "[Add your own reflection: which existing discourse (craft vs fine art, interface vs experience, or another) does your practical work already sit inside, whether or not you named it before?]",
        ]},
      ],
    },
    {
      n: 4, title: "Presenting ideas clearly", hue: "amber",
      img: "",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "No auto-generated subtitles were available for this session's recording, so this entry is currently a placeholder.",
        ]},
        { kind: "reflection", label: "Your reflection", paras: [
          "[Fill this week in from your own class notes, or leave it noted as a gap in the gathering.]",
        ]},
      ],
    },
    {
      n: 5, title: "Online presentations of research by artists", hue: "blue",
      img: "A screenshot of an artist website that has influenced your own presentation format",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Jonathan Harris's body of work was looked at as a model for presenting research and personal projects as interactive, artist-made websites rather than static portfolios.",
          "Painter Joan Mitchell's words on landscape and memory were read alongside her paintings: 'landscapes that I carry with me and remembered feelings of them, which of course become transformed.' Used to discuss how research online can present felt, remembered material rather than only documentary fact.",
          "Illustrator Pat Perry's book A River Is Home was examined page by page as an example of interweaving image and short text to build an argument (a river is a meeting place, a river is a connection) across spreads.",
          "The film Holy Motors was raised as a personal touchstone for the lecturer, used to model how a favourite text can be folded into one's own presented research without needing to be the ostensible subject of it.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "Landscapes that I carry with me and remembered feelings of them, which of course become transformed. Do you see leaves moving on trees and water flowing? Do you see a tangle of shapes? The painting is both.", a: "Joan Mitchell" },
          { t: "A river is a meeting place. A river is a connection.", a: "Pat Perry, A River Is Home" },
        ]},
        { kind: "reflection", label: "Your reflection", paras: [
          "[Add your own reflection: which artist websites or presentation formats are you actually modelling your own interactive journal on?]",
        ]},
      ],
    },
    {
      n: 7, title: "Workshop: form | function | voice | engagement", hue: "coral",
      img: "A sketch of the form your own text or presentation will take",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Bob Dylan raised as the only musician to have won the Nobel Prize for Literature, credited specifically for the weight and craft of his writing, not his musicianship. Used to argue that voice and form can carry as much weight in a 'non-literary' medium as in a literary one.",
          "Rory Sutherland's line about King Louis XIV was used to illustrate perspective and scale in writing: framing an ordinary modern life against an unimaginable historical one to make a point land.",
          "Illustrator Pat Perry returned to as an example of a consistent journal voice sustained across years of work, described by the lecturer as someone they'd 'checked in with' after a decade away and found still recognisably the same voice.",
          "Workshop instruction: match form to function and audience before matching form to personal taste. Ask what the piece needs to do, and to whom, before deciding how it should look or sound.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "If King Louis XIV had to come visit our times, he would lose his mind when he sees the technology we own, while living in a two-bedroom in a mediocre area.", a: "Rory Sutherland (as read in class)" },
        ]},
        { kind: "reflection", label: "Your reflection", paras: [
          "[Add your own reflection: what form, function, voice and engagement does your own Research Report actually need, given who will read or watch it?]",
        ]},
      ],
    },
    {
      n: 8, title: "Around the fire: \"when\"", hue: "teal",
      img: "",
      blocks: [
        { kind: "notes", label: "Class notes", paras: [
          "Robert Waldinger's Harvard longevity research was referenced for its central finding: the key to a happy life is good relationships, more than any other single factor measured over decades.",
          "Rilke's Letters to a Young Poet was introduced as a model for how advice and reflection can travel between people across time, in the form of correspondence.",
          "Electronic musician Rival Consoles' ninth album, Landscape from Memory, was used as a recent example of an artist directly addressing memory and time as subject matter.",
          "Session closed on 'when' as a creative question: not just what you make or why, but the timing and patience the making actually required, and whether that timing can be honestly reflected in the final text.",
        ]},
        { kind: "quotes", label: "Quotes", items: [
          { t: "The key to a happy life is good relationships. That's it.", a: "Robert Waldinger (as discussed in class)" },
        ]},
        { kind: "reflection", label: "Your reflection", paras: [
          "[Add your own reflection: what is the honest timeline of your own practical work this year — where did it stall, and when did it actually move?]",
        ]},
      ],
    },
  ],

  wall: [
    { cat: "class", group: "quotes", t: "The Red Hand Files began in September of 2018 as a simple idea, a place where I would answer questions from my fans.", a: "Nick Cave" },
    { cat: "class", group: "quotes", t: "Your work is only as good as your research.", a: "Every Frame a Painting, postmortem" },
    { cat: "class", group: "quotes", t: "An artist should not lie to himself or to others.", a: "Marina Abramović" },
    { cat: "class", group: "quotes", t: "Cultural identity is a matter of 'becoming' as well as of 'being'.", a: "Stuart Hall" },
    { cat: "class", group: "quotes", t: "None of the work we make exists in isolation from theory.", a: "Lecturer, W3" },
    { cat: "class", group: "quotes", t: "Landscapes that I carry with me and remembered feelings of them, which of course become transformed.", a: "Joan Mitchell" },
    { cat: "class", group: "quotes", t: "A river is a meeting place. A river is a connection.", a: "Pat Perry" },
    { cat: "class", group: "quotes", t: "The key to a happy life is good relationships. That's it.", a: "Robert Waldinger" },
    { cat: "text", group: "texts", t: "Every Frame a Painting: the postmortem essay, two people thinking and disagreeing in public about their own work." },
    { cat: "text", group: "texts", t: "Womanhouse (1972): a house turned into a gallery, one room per artist." },
    { cat: "text", group: "texts", t: "Letters to a Young Poet (Rilke): advice as correspondence across time." },
    { cat: "text", group: "texts", t: "A River Is Home (Pat Perry): image and short text interwoven across spreads." },
  ],
};
