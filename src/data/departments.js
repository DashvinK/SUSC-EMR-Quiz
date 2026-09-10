// 8 SUSC departments. Slugs are the canonical keys used by the scoring engine
// (src/lib/scoring.js) and the quiz question weights (src/data/questions.js).
//
// Content shape:
//   shortBlurb      one-liner for cards / share card
//   longDescription the intro paragraph ("what they do", the hook)
//   eventsTitle     optional heading for the events/initiatives section
//   events          [{ title, tagline, points: [] }] initiatives / teams
//   closing         recruitment call-to-action line
//   traits          display tags
//   photos          past-event photos (pending)
//   applyLink       EMR form link (pending)

export const departments = [
  {
    slug: "secretarial",
    name: "Secretarial",
    shortBlurb: "Holds the whole council together, one detail at a time.",
    longDescription:
      `The department holding the whole council together. The General Secretary keeps records straight, plans internal events and handles Student Hub bookings and all the SUSC email queries.`,
    eventsTitle: "What we run",
    events: [
      {
        title: "General Meetings",
        tagline: `The heartbeat of the council — keeping everyone aligned, updated, and on the same page.`,
        points: [],
      },
      {
        title: "Internal Bondings",
        tagline: `Because a council that vibes together, works together. Just good times and stronger friendships within the team.`,
        points: [],
      },
    ],
    closing: `If you're organized, dependable, and want to be right at the center of how the council operates, Secretary is your department. Come help keep SUSC running like clockwork, one detail at a time.`,
    traits: ["organized", "detail-oriented", "low-drama"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "treasury",
    name: "Treasury",
    shortBlurb: "Keeps the council's money in check so every idea gets funded.",
    longDescription:
      `Numbers people, this one's for you. The General Treasurer and team keep the council's finances in check — reviewing purchases, reimbursements, subsidies, and approving the budgets and invoices that make everything else possible.`,
    events: [],
    closing: `If you're detail-oriented, trustworthy with money, and want real hands-on exposure to how a student organization actually runs financially, Treasury's got your seat waiting. Come be the reason every great idea in council actually gets funded.`,
    traits: ["meticulous", "trustworthy", "process-driven"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "academic-affairs",
    name: "Academic Affairs",
    shortBlurb: "Speaks up for students on grades, rights, and how things run.",
    longDescription:
      `Got beef with your grades, your lecturers, or the way things are run academically? This is the department that actually does something about it. Academic Affairs speaks up for students on everything from academic quality to student rights, sitting down with student reps to make sure your voice actually reaches management.`,
    events: [
      {
        title: "Freshman Fiesta",
        tagline: `The ultimate "welcome to Sunway" party.`,
        points: [
          "Team-based station games all around campus",
          "Rack up points, win prizes, make friends fast",
          "Perfect for breaking the ice before uni life even starts",
        ],
      },
      {
        title: "InternEdge: Mastering Internships, LinkedIn & Resumes",
        tagline: `Your career glow-up starts here.`,
        points: [
          "Guest speaker Joselyn Lau spills the tea on impressing recruiters",
          "Resume roasts (the helpful kind) and LinkedIn makeovers",
          "Networking practice + an e-cert to flex",
        ],
      },
      {
        title: "Study With Me",
        tagline: `Silent study, but make it a whole vibe.`,
        points: [
          "Multi-day study marathon, exam-hall energy",
          "Come and go as you please, work at your own pace",
          "Breaks built in so you don't burn out",
        ],
      },
    ],
    closing: `Got an idea to make academic life less of a headache? We're all ears. Come join Academic Affairs and let's fix things together.`,
    traits: ["advocate", "discreet", "detail-oriented"],
    photos: [
      { src: "/assets/departments/academic-affairs/freshman-fiesta-1.jpg", alt: "Freshman Fiesta" },
      { src: "/assets/departments/academic-affairs/freshman-fiesta-2.jpg", alt: "Freshman Fiesta" },
      { src: "/assets/departments/academic-affairs/internedge-1.jpg", alt: "InternEdge" },
      { src: "/assets/departments/academic-affairs/internedge-2.jpg", alt: "InternEdge" },
      { src: "/assets/departments/academic-affairs/internedge-3.jpg", alt: "InternEdge" },
      { src: "/assets/departments/academic-affairs/internedge-4.jpg", alt: "InternEdge" },
    ],
    applyLink: "",
  },
  {
    slug: "external-relations",
    name: "External Relations",
    shortBlurb: "The connectors and dealmakers — sponsors and perks for students.",
    longDescription:
      `The connectors and dealmakers live here. External Relations works with outside organizations and sponsors to bring real perks back to Sunway students, all while making SUSC and Sunway look good out there.`,
    events: [
      {
        title: "Battle of The Brains",
        tagline: `Family Feud energy, but it's SUSC's version.`,
        points: [
          "Prelims, semis, and a grand finale",
          "Fun intermission games to keep the crowd hyped",
          "A wholesome test of trivia, teamwork, and quick thinking",
        ],
      },
      {
        title: "Sip and Stretch",
        tagline: `Stretch it out with Dimples Pilates Studio.`,
        points: [
          "Separate sessions for students and staff/faculty",
          "A proper reset for the body and mind",
          "Zero pressure, all chill",
        ],
      },
      {
        title: "Once Upon A Bean Bazaar",
        tagline: `A whimsical bazaar that doubles as a fundraiser for future student programmes.`,
        points: [
          "Food, accessories, and lifestyle vendors galore",
          "Bonus: networking with employers and alumni",
          "The start of bigger things for future events",
        ],
      },
    ],
    closing: `If you're the type who spots an opportunity and immediately thinks "let's make this happen," External Relations is calling your name. Bring your network, bring your ideas, let's go.`,
    traits: ["networker", "persuasive", "resourceful"],
    photos: [
      { src: "/assets/departments/external-relations/battle-of-the-brains-1.jpg", alt: "Battle of The Brains" },
      { src: "/assets/departments/external-relations/battle-of-the-brains-2.jpg", alt: "Battle of The Brains" },
      { src: "/assets/departments/external-relations/battle-of-the-brains-3.jpg", alt: "Battle of The Brains" },
      { src: "/assets/departments/external-relations/battle-of-the-brains-4.jpg", alt: "Battle of The Brains" },
    ],
    applyLink: "",
  },
  {
    slug: "extracurricular",
    name: "Extracurricular",
    shortBlurb: "The glue between clubs, societies, and Student LIFE.",
    longDescription:
      `Live and breathe clubs and societies? This is your department. Extracurricular is the glue between C&S and Student LIFE, sorting out lockers, solving C&S problems, and running the initiatives that make club life way more fun — Clubs & Societies Carnival included.`,
    events: [
      {
        title: "Council Royale",
        tagline: `Big leagues energy — an inter-university showdown with SUSC, Monash (MUSA), Taylor's (TUSC), APU, INTI, and UCSI, bringing together 70+ student leaders.`,
        points: [
          "Fun games with a competitive edge",
          "A space to swap leadership stories across unis",
          "New friendships and future collabs, guaranteed",
        ],
      },
      {
        title: "Cuppa Coffee",
        tagline: `Coffee, conversation, and campus tea straight from the top.`,
        points: [
          "Open Q&A with Prof. Dato Elizabeth Lee",
          "Management team joins in for extra transparency",
          "Real answers about where Sunway is headed",
        ],
      },
      {
        title: "C&S Leaders Bonding",
        tagline: `Chill vibes for the leaders who run the club scene.`,
        points: [
          "Games designed to build teamwork and trust",
          "Refreshments and good conversation",
          "The perfect setting for cross-club collabs to happen",
        ],
      },
    ],
    closing: `Got a vision for how clubs and societies could be even better? Don't just talk about it, come build it with us. Join Extracurricular and let's give C&S the spotlight it deserves.`,
    traits: ["connector", "upbeat", "reliable"],
    photos: [
      { src: "/assets/departments/extracurricular/council-royale-1.jpg", alt: "Council Royale" },
      { src: "/assets/departments/extracurricular/council-royale-2.jpg", alt: "Council Royale" },
      { src: "/assets/departments/extracurricular/cuppa-coffee-1.jpg", alt: "Cuppa Coffee" },
      { src: "/assets/departments/extracurricular/cuppa-coffee-2.jpg", alt: "Cuppa Coffee" },
      { src: "/assets/departments/extracurricular/cuppa-coffee-3.jpg", alt: "Cuppa Coffee" },
      { src: "/assets/departments/extracurricular/cns-carnival-1.jpg", alt: "Clubs & Societies Carnival" },
      { src: "/assets/departments/extracurricular/cns-carnival-2.jpg", alt: "Clubs & Societies Carnival" },
    ],
    applyLink: "",
  },
  {
    slug: "public-relations",
    name: "Public Relations",
    shortBlurb: "The creative engine behind everything SUSC puts out.",
    longDescription:
      `Every poster, caption, and campaign you've ever scrolled past from SUSC? That's this department. PR is the creative engine behind SUSC's entire brand presence, making sure everything the council does actually reaches students in a way that looks good and feels authentic.`,
    eventsTitle: "The three teams",
    events: [
      {
        title: "Design & Content",
        tagline: `The visuals that make people stop scrolling.`,
        points: [
          "Posters, banners, and social media content for every SUSC event and initiative",
          "Keeping a consistent, recognizable look across everything SUSC puts out",
          "Turning ideas from other departments into content students actually want to engage with",
        ],
      },
      {
        title: "Brand & Communication",
        tagline: `Making sure SUSC's voice is clear, consistent, and actually sounds like us.`,
        points: [
          "Shaping SUSC's overall tone, identity, and how the council presents itself online",
          "Responding to inquiries on official platforms quickly and in a way that feels genuine",
          "Keeping students updated on progress, announcements, and everything happening around campus",
        ],
      },
      {
        title: "Event Coverage & Storytelling",
        tagline: `Because moments deserve to be remembered, not forgotten.`,
        points: [
          "Capturing photos and content during SUSC events for recaps and highlights",
          "Telling the story behind each event, not just showing that it happened",
          "Making sure every department's hard work actually gets the spotlight it deserves",
        ],
      },
    ],
    closing: `Got a creative eye, a way with words, or big ideas on how SUSC should show up online? Public Relations is where your voice becomes the council's voice. Come tell Sunway's story your way.`,
    traits: ["creative", "trend-aware", "social-fluent"],
    photos: [
      { src: "/assets/departments/public-relations/public-relations-1.jpg", alt: "Public Relations in action" },
      { src: "/assets/departments/public-relations/public-relations-2.jpg", alt: "Public Relations in action" },
    ],
    applyLink: "",
  },
  {
    slug: "student-relations",
    name: "Student Relations",
    shortBlurb: "Has your back on welfare, campus life, and events that matter.",
    longDescription:
      `The department that's got your back on campus life. Student Relations mediates between students and staff/management on welfare, facilities, health, and safety — and throws the events that actually make campus fun.`,
    events: [
      {
        title: "Freshman Fiesta",
        tagline: `Co-run with Academic Affairs — icebreakers, team games, and instant friendships for the new kids on campus.`,
        points: [],
      },
      {
        title: "Welfare Wave: Side Questing",
        tagline: `Time to try something new.`,
        points: [
          "Sessions like painting, flower making, and more",
          "Fun, hands-on activities with friends",
          "A break from academics that's actually good for your mental health",
        ],
      },
      {
        title: "Startup Street: From Booth to Business",
        tagline: `Small business energy, big lessons.`,
        points: [
          "Real SME vendors sharing their business journeys",
          "Milestones, struggles, and the lessons behind them",
          "A crash course in entrepreneurship, bazaar-style",
        ],
      },
      {
        title: "Heartfelt Haven",
        tagline: `A celebration of the women who make our everyday lives better.`,
        points: [
          "Flower sales for a good cause",
          "Student Relations' very first-ever event",
          "Heartfelt, meaningful, and one for the books",
        ],
      },
    ],
    closing: `If welfare, advocacy, and events that actually mean something sound like your thing, Student Relations is where you belong. Bring your ideas and let's keep making campus life better, together.`,
    traits: ["empathetic", "welfare-focused", "composed"],
    photos: [
      { src: "/assets/departments/student-relations/freshman-fiesta-1.jpg", alt: "Freshman Fiesta" },
      { src: "/assets/departments/student-relations/freshman-fiesta-2.jpg", alt: "Freshman Fiesta" },
      { src: "/assets/departments/student-relations/welfare-wave-1.jpg", alt: "Welfare Wave: Side Questing" },
      { src: "/assets/departments/student-relations/welfare-wave-2.jpg", alt: "Welfare Wave: Side Questing" },
    ],
    applyLink: "",
  },
];

// Convenience lookups.
export const departmentsBySlug = Object.fromEntries(
  departments.map((d) => [d.slug, d])
);

export function getDepartment(slug) {
  return departmentsBySlug[slug];
}
