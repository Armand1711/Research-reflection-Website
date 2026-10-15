/* ============================================================
   content3.js — Research Report · RR420 · 2026
   A reflective overview of the year's practical work, played like
   the journals (chapter select, levels, trophies). Rendered by app.js
   as "semester 3" (Interactive Journal.html?sem=3).
   Voice: plain first person, no dashes in own-voice sentences.
   In-text citations are APA 7; full entries are in `references`.
   DRAFT: the "Looking back" boxes (kind: "reflect") are the most
   personal parts. Rewrite them with what actually happened.
   ============================================================ */
window.REPORT = {

  cover: {
    kicker: "RR420 · Research & Reflection · Research Report 2026",
    heading: 'Research <span class="em">Report</span>',
    author: "Armand Naudé · Postgraduate Diploma in Creative Practice, Interactive Development · Open Window",
    tags: [
      { k: "Theme 1", v: "Storytelling", c: "amber" },
      { k: "Theme 2", v: "Identity", c: "teal" },
      { k: "PP420", v: "Communication Design", c: "coral" },
      { k: "Theme 4", v: "Signature style", c: "blue" },
    ],
    intro: "This report looks back at a year of making things, on the web and off it. Five projects, two journals and a manifesto, and one idea that kept coming back: I want to build websites that feel like places you visit.",
  },

  chapters: [
    /* ---------------------------------------------------------- */
    {
      id: "start", nav: "Where it started", icon: "brief",
      kicker: "Chapter 01 · Introduction",
      title: "Where the year <em>started</em>",
      sub: "What this report is, how it's built, and the question I kept asking all year.",
      blocks: [
        { type: "text", paras: [
          "At the start of the year I would have called myself a developer who builds websites. That's still true, but I see it a bit differently now. Over five projects I kept ending up in the same place. The work I liked most wasn't a page you read. It was a place you moved through.",
          "This report goes back over that year. Each chapter is one project or one part of the course. I look at what I made, how I made it, and which ideas from class and from the two artists I studied show up in it.",
          "I built the report the same way I built my manifesto and my journals, as something you play through. The chapters are levels, there's a chapter select, and you earn trophies for reading. That choice is part of the argument. If I'm saying my practice is about places instead of pages, the report should be one too.",
        ]},
        { type: "timeline", items: [
          { when: "Semester 1", what: "Connect the Hidden Bonds", tag: "Theme 1 · Storytelling" },
          { when: "Semester 1", what: "Lulama for CHOSA", tag: "Theme 2 · Identity" },
          { when: "Semester 1", what: "Journal: Jenova Chen and Lauren Lee McCarthy", tag: "RR420" },
          { when: "Semester 2", what: "Pirate Skulls and Bones · ORIGIN", tag: "Communication Design" },
          { when: "Semester 2", what: "Stack Studio website", tag: "Theme 4 · Signature style" },
          { when: "Semester 2", what: "Manifesto and this report", tag: "RR420" },
        ]},
        { type: "reflect", label: "The question", paras: [
          "The question I kept asking, sometimes without noticing, is the one that ended up in my manifesto: what would make someone want to stay a bit longer? This report is me checking whether my work actually answered it.",
        ]},
        { type: "links", items: [
          { k: "Manifesto", v: "“I want to build websites that feel like places you visit.”" },
        ]},
      ],
    },

    /* ---------------------------------------------------------- */
    {
      id: "hidden-bonds", nav: "Connect the Hidden Bonds", icon: "work",
      kicker: "Chapter 02 · Theme 1, Storytelling",
      title: "Connect the <em>Hidden Bonds</em>",
      sub: "A puzzle game about the Union Masonic Temple in Kimberley, and the first time I designed a website like a room.",
      blocks: [
        { type: "facts", items: [
          { k: "Brief", v: "Theme 1, Storytelling" },
          { k: "Built with", v: "HTML, CSS, vanilla JavaScript, GSAP, Firebase" },
          { k: "Form", v: "Three puzzles, a secret archive and a closing reflection" },
        ]},
        { type: "figure", src: "assets/report/masonic-landing.webp", cap: "The landing screen. The tone is a sealed archive, not a lesson.", wide: true },
        { type: "text", paras: [
          "The Union Masonic Temple on Du Toitspan Road was built in 1886 by seven lodges from English, Scottish and Dutch constitutions. They were men who had come to Kimberley from all over the world for the diamond rush. I wanted people to find out how those strangers ended up building something together, without me lecturing them about it.",
          "So I made it a game. You play an investigator. You rebuild a broken photograph of the temple, match old Masonic symbols to what they meant, and then draw the links between the lodges, the diamond traders and the Dutch and Scottish brethren. Each puzzle opens a page of a secret archive, and you lose a candle flame every time you get something wrong.",
          "The rule I set early was that the interface would never say “learn” or “complete”. Players unveil and decipher. That one rule did more for the feel of the project than any animation did.",
        ]},
        { type: "gallery", items: [
          { src: "assets/report/masonic-enigma1.webp", cap: "Enigma I, Shattered Sanctuary: rebuild the 1888 photograph." },
          { src: "assets/report/masonic-lodge.webp", cap: "The Lodge, where you choose an enigma." },
          { src: "assets/report/masonic-enigma3.webp", cap: "Enigma III, Web of Whispers: connect the lodges." },
          { src: "assets/report/masonic-archives.webp", cap: "The Secret Archives open one piece of research at a time." },
        ]},
        { type: "quote", t: "Mysterious, not instructional.", a: "Design principle, Connect the Hidden Bonds" },
        { type: "text", paras: [
          "This is where Jenova Chen came in. In his thesis on flow, Chen (2006) argues that a game should adjust to the player instead of pushing everyone through the same difficulty. Flow, as Csikszentmihalyi (1990) describes it, happens when a challenge sits just inside what you can do. My three puzzles step up for that reason: first you put a picture together, then you read symbols, then you map relationships.",
          "Henry Jenkins (2004) calls this kind of design narrative architecture. The story lives in the space, and you piece it together by moving through it. That is what the archive does. Nobody tells you the history. You collect it.",
        ]},
        { type: "reflect", paras: [
          "Looking at it now, the strongest decision wasn't technical. It was the language rule and the archive. Both of them treat the player as someone discovering something instead of someone being taught, and that's the thing I'd carry into anything else I build.",
        ]},
        { type: "links", items: [
          { k: "Artist", v: "Jenova Chen, restraint and flow" },
          { k: "Manifesto", v: "Question two: how much can a website get across without telling you what to do?" },
        ]},
      ],
    },

    /* ---------------------------------------------------------- */
    {
      id: "lulama", nav: "Lulama for CHOSA", icon: "artist2",
      kicker: "Chapter 03 · Theme 2, Identity",
      title: "Lulama, a voice for <em>CHOSA</em>",
      sub: "An AI character who stands in for a charity, and the first time I had to think hard about what a machine should say to a person.",
      blocks: [
        { type: "facts", items: [
          { k: "Brief", v: "Theme 2, Identity: an identity proxy for a South African NPO" },
          { k: "Client", v: "CHOSA, Children of South Africa" },
          { k: "Built with", v: "Three.js and the Claude API" },
          { k: "Audience", v: "Potential donors, 25 to 50" },
        ]},
        { type: "figure", src: "assets/report/lulama-avatar.webp", cap: "Lulama's 3D avatar next to the conversation.", wide: true },
        { type: "text", paras: [
          "CHOSA funds and supports the small community organisations that look after orphaned and vulnerable children. Because they work through other groups instead of with children directly, it's hard for the public to see what they actually do, and their reports read like grant applications (CHOSA, 2024). The brief asked for an identity proxy, something that stands in for the organisation and makes it easier to understand.",
          "My proxy was Lulama, a fictional 24 year old youth co-ordinator from Khayelitsha who grew up in a crèche supported by one of CHOSA's partners. You talk to her, and the conversation follows three steps I planned in the pitch: connection, revelation and the ask. She tells you about her community, then about what changed it, and only near the end does she mention that you can donate.",
          "Technically this was the hardest thing I built all year. She has a 3D face that blinks, moves and talks, and her personality comes from a long system prompt that goes to the Claude API with every message.",
        ]},
        { type: "figure", src: "assets/report/lulama-chat.webp", cap: "The chat interface, with the donation call to action in the sidebar." },
        { type: "text", paras: [
          "This project is where Lauren Lee McCarthy's work stopped being something I had only read about. In LAUREN, McCarthy (2017) replaced a smart home assistant with herself, watching over people's homes and doing what Alexa would do. It's a human pretending to be a machine. Lulama is the opposite: a machine pretending to be a human. Working on her made me think about who is responsible when a made-up person asks you for money, and how honest a character like that has to be about what she is.",
          "Stuart Hall's argument that identity is always in the process of becoming, never finished (Hall, 1990), helped me too. CHOSA's identity isn't really in its logo. It's in the people it reaches, and Lulama was my attempt to let you meet one of them.",
        ]},
        { type: "reflect", paras: [
          "The part I'm least sure about is the ask. A donation moment designed to land at the emotional peak of a conversation is close to the kind of thing my manifesto says I don't want to build, tech that works on people. It's the question from this year I most want to keep working on.",
        ]},
        { type: "links", items: [
          { k: "Artist", v: "Lauren Lee McCarthy, LAUREN" },
          { k: "Manifesto", v: "Question one: a person and a machine that's trying to understand them" },
          { k: "Manifesto", v: "Question three: making sure it deserves the trust" },
        ]},
      ],
    },

    /* ---------------------------------------------------------- */
    {
      id: "comms", nav: "Communication Design", icon: "synthesis",
      kicker: "Chapter 04 · Communication Design",
      title: "Type, posters and a <em>time machine</em>",
      sub: "Two print-first projects that pulled me away from code, and showed me the same instincts work on paper.",
      blocks: [
        { type: "facts", items: [
          { k: "Projects", v: "Pirate Skulls and Bones, an exploratory poster · ORIGIN, a campaign for ChronoVoyage" },
          { k: "Made with", v: "Hand-drawn lettering, InDesign, campaign mock-ups" },
        ]},
        { type: "figure", src: "assets/report/cd-poster.webp", cap: "Pirate Skulls and Bones. Every letter is built from something you'd find on a pirate ship.", tall: true },
        { type: "text", paras: [
          "The poster started from a line in M.I.A.'s Paper Planes (M.I.A., 2007), a song that mocks the way America sees immigrants. I drew each letter of the title out of an object: a flag, a cannon, crossed swords, an axe, an anchor, a rope. Then I set them on a dark grid with the lyric running between them. It's the most hand-made thing I made this year.",
          "ORIGIN was a campaign for ChronoVoyage, a made-up time travel agency. My idea was that the most personal trip back in time is into your own family's past. Instead of visiting history, you put on the Origin Glasses and relive a memory from one of your ancestors. Nothing in the past changes. Only the traveller does. The tagline was “Your ancestors remember. Now you can too.”",
        ]},
        { type: "gallery", items: [
          { src: "assets/report/origin-glasses.webp", cap: "The Origin Glasses, the campaign's central image." },
          { src: "assets/report/origin-billboard.webp", cap: "Out of home: “Meet where you began.”" },
          { src: "assets/report/origin-social.webp", cap: "A social teaser." },
          { src: "assets/report/origin-landing.webp", cap: "The landing page, built around a memory thread." },
        ]},
        { type: "text", paras: [
          "Both projects are about the same thing as the rest of my work: getting someone to step into a world. ORIGIN even makes the same promise as my puzzle game, that a story can be something you live through instead of something you read. Ellen Lupton (2017) argues that design works like storytelling, leading someone through a sequence of moments. A campaign made me do that with words and images only, with no code to lean on.",
        ]},
        { type: "reflect", paras: [
          "Print asks for a different kind of restraint. On a poster there's nothing to click and no animation to hide behind. If the idea doesn't land in a few seconds, it doesn't land at all.",
        ]},
        { type: "links", items: [
          { k: "Thread", v: "Stories you live through, not stories you read" },
          { k: "Class", v: "Semester 2, Week 7: form, function, voice and engagement" },
        ]},
      ],
    },

    /* ---------------------------------------------------------- */
    {
      id: "stack", nav: "Stack Studio", icon: "work",
      kicker: "Chapter 05 · Theme 4, Signature style",
      title: "Stack Studio, a site that <em>shows</em>",
      sub: "Building the website for my own company, and working out what my signature style actually is.",
      blocks: [
        { type: "facts", items: [
          { k: "Brief", v: "Theme 4, Personal consciousness: signature style" },
          { k: "Client", v: "Stack Studio, co-founded with Enzo De Vittorio" },
          { k: "Built with", v: "Next.js, React and TypeScript" },
          { k: "Featured work", v: "The GC Solar website and CRM integration" },
        ]},
        { type: "figure", src: "assets/report/stack-hero.webp", cap: "The home page: “A full dev team, from day one.”", wide: true },
        { type: "text", paras: [
          "Stack Studio is the development company I started with Enzo De Vittorio. We pitch ourselves to small South African businesses as an outsourced development team on a retainer. When I wrote the pitch, the problem was obvious: a company selling development skills had no website. A client had to take our word for it.",
          "So the brief became simple. The site had to prove the claim instead of describing it. It's built in Next.js and TypeScript, with interactive service cards, a case study of our real GC Solar project, and pricing laid out as a ladder of plans.",
        ]},
        { type: "gallery", items: [
          { src: "assets/report/stack-services.webp", cap: "Four disciplines, one team." },
          { src: "assets/report/stack-casestudy.webp", cap: "Case study: the GC Solar website and CRM integration." },
          { src: "assets/report/stack-webdev.webp", cap: "A service page." },
        ]},
        { type: "text", paras: [
          "Theme 4 asked for a signature style. When I lined up the year's work, my style turned out not to be a colour or a font. It was the habit of making the work demonstrate itself: a puzzle that teaches through play, a charity voice you can actually talk to, a studio site that behaves like software. That's what I mean in my manifesto by places instead of pages.",
        ]},
        { type: "reflect", paras: [
          "This was the first brief where the client was me. A real business would be judged by this site from the day it went live, so it had to work as a product as well as a hand-in.",
        ]},
        { type: "links", items: [
          { k: "Manifesto", v: "“I don't want to make things that are hard just to look clever.”" },
          { k: "Thread", v: "Work that shows instead of tells" },
        ]},
      ],
    },

    /* ---------------------------------------------------------- */
    {
      id: "writing", nav: "Writing about the work", icon: "weeks",
      kicker: "Chapter 06 · Research & Reflection",
      title: "Writing about the <em>work</em>",
      sub: "Two journals, a manifesto and this report, and why they all look like a games console.",
      blocks: [
        { type: "figure", src: "assets/report/site-home.webp", cap: "The home screen. The manifesto lives on the Welcome tile.", wide: true },
        { type: "text", paras: [
          "In Semester 1 the journal was about other people's work. I studied two artists closely. Jenova Chen showed me how much a game can say while explaining very little, in Journey above all (thatgamecompany, 2012). Lauren Lee McCarthy showed me how uncomfortable it should feel to let technology get close to someone. Both of them ended up inside my practical work, as the chapters before this one show.",
          "In Semester 2 the course turned the journal toward writing about my own practice. The workshop on form, function, voice and engagement changed how I approached this website. The idea was to decide what a piece needs to do, and for whom, before deciding how it looks. My work is interactive and a lot of it is game-like, so I made the journals, the manifesto and this report into one console-style site: a home screen with the manifesto, two journals you play like games, and this report as the last one.",
          "Tony Zhou and Taylor Ramos's postmortem on Every Frame a Painting (Zhou & Ramos, 2017), which we read in the first week of Semester 2, stuck with me because it's two people looking honestly at their own work years later. That's the tone I tried for here.",
        ]},
        { type: "gallery", items: [
          { src: "assets/report/site-s1.webp", cap: "Semester 1, played as a game: the chapter select." },
          { src: "assets/report/site-manifesto.webp", cap: "The manifesto, opened from the home screen." },
        ]},
        { type: "reflect", paras: [
          "Building the site was practice for the thing it's about. Every trophy pop-up, menu sound and loading screen was a small test of my own question: does this make someone want to stay a bit longer, or does it just get in the way?",
        ]},
        { type: "links", items: [
          { k: "Journal", v: "Semester 1 and Semester 2 journals, on the home screen" },
          { k: "Manifesto", v: "The Welcome tile" },
        ]},
      ],
    },

    /* ---------------------------------------------------------- */
    {
      id: "threads", nav: "What connects it all", icon: "synthesis",
      kicker: "Chapter 07 · Synthesis",
      title: "Places, not <em>pages</em>",
      sub: "The ideas that run through every project, and how they line up with my manifesto.",
      blocks: [
        { type: "threads", items: [
          { n: "01", t: "Saying less", d: "Chen's games explain almost nothing, and they're stronger for it (Chen, 2006). The puzzle game's language rule and the poster's single lyric come from the same place.", s: "Chen · Hidden Bonds · Pirate Skulls and Bones" },
          { n: "02", t: "Places you move through", d: "Jenkins (2004) describes stories built into spaces. The Masonic archive, ORIGIN's memory trip and this site all ask you to move through something instead of read it.", s: "Jenkins · Hidden Bonds · ORIGIN · this site" },
          { n: "03", t: "Careful when you get close", d: "McCarthy's LAUREN shows how strange it is to let something into your private life (McCarthy, 2017). Lulama and the Origin Glasses both get very close to a person.", s: "McCarthy · Lulama · ORIGIN" },
          { n: "04", t: "Identity you can meet", d: "Hall (1990) treats identity as something that keeps becoming. Lulama turned a charity into a person you can talk to, and the Stack Studio site turned a claim into something you can try.", s: "Hall · Lulama · Stack Studio" },
          { n: "05", t: "Work that shows", d: "Across the year the best work proved its point instead of explaining it: a puzzle that teaches by playing, a studio site that behaves like software.", s: "Hidden Bonds · Stack Studio · this report" },
        ]},
        { type: "text", paras: [
          "My manifesto ends with three questions I keep coming back to. Looking back over the year, each project answers at least one of them.",
        ]},
        { type: "questions", items: [
          { q: "What happens when a person talks to a machine that's trying to understand them?", a: "Lulama was a year-long answer to this. The conversation only works if she feels like a person, which is exactly what makes the donation ask something to handle carefully." },
          { q: "How much can a website get across without telling you what to do?", a: "Connect the Hidden Bonds never uses the words learn or complete, and you still come out knowing why seven lodges built one temple." },
          { q: "If people trust something I built with how they feel, how do I make sure it deserves that?", a: "Lulama, ORIGIN's Origin Glasses and the Stack Studio site all ask for trust in different ways: with a story, with a memory and with a business. I don't have a full answer yet, but I know now it's the question I need to ask at the start of a project, not the end." },
        ]},
      ],
    },

    /* ---------------------------------------------------------- */
    {
      id: "next", nav: "What I'm taking with me", icon: "cover",
      kicker: "Chapter 08 · Conclusion",
      title: "What I'm <em>taking with me</em>",
      sub: "The year as one body of work, and where it goes next.",
      blocks: [
        { type: "text", paras: [
          "When I started the year I thought of each project as its own brief. Writing this report is the first time I've seen them as one body of work. They're different in form, a puzzle, a chatbot, a poster, a campaign and a company website, but they all try to pull someone into a world and keep them there long enough to care.",
          "The two artists I studied in Semester 1 turned out to be the two sides of that. Chen is the part of me that wants to make the world quiet and good enough that you stay. McCarthy is the part that asks whether I should, and what I owe the person once they're there.",
          "Next year most of what I build will be for Stack Studio's clients. I want to bring this year's habits into that work: saying less, building places instead of pages, and being honest about what a piece of technology is doing to the person using it.",
        ]},
        { type: "quote", t: "This is where I am right now. Ask me again next year and some of it will probably have changed.", a: "Armand Naudé, Manifesto (2026)" },
      ],
    },
  ],

  references: [
    "Chen, J. (2006). <i>Flow in games</i> [Master's thesis, University of Southern California].",
    "CHOSA. (2024). <i>About us</i>. Children of South Africa. https://www.chosa.org.za/about",
    "Csikszentmihalyi, M. (1990). <i>Flow: The psychology of optimal experience</i>. Harper &amp; Row.",
    "Hall, S. (1990). Cultural identity and diaspora. In J. Rutherford (Ed.), <i>Identity: Community, culture, difference</i> (pp. 222–237). Lawrence &amp; Wishart.",
    "Jenkins, H. (2004). Game design as narrative architecture. In N. Wardrip-Fruin &amp; P. Harrigan (Eds.), <i>First person: New media as story, performance, and game</i> (pp. 118–130). MIT Press.",
    "Lupton, E. (2017). <i>Design is storytelling</i>. Cooper Hewitt, Smithsonian Design Museum.",
    "McCarthy, L. L. (2017). <i>LAUREN</i> [Performance]. https://lauren-mccarthy.com/LAUREN",
    "M.I.A. (2007). Paper planes [Song]. On <i>Kala</i>. Interscope Records.",
    "thatgamecompany. (2012). <i>Journey</i> [Video game]. Sony Computer Entertainment.",
    "Zhou, T., &amp; Ramos, T. (2017). <i>Postmortem: Every Frame a Painting</i>. Medium.",
  ],
};
