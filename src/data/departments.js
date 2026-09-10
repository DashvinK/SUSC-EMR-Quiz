// 8 SUSC departments. Slugs are the canonical keys used by the scoring engine
// (src/lib/scoring.js) and the quiz question weights (src/data/questions.js).
// Short blurbs / long descriptions are draft placeholders pending sign-off (build plan §11).

export const departments = [
  {
    slug: "secretarial",
    name: "Secretarial",
    shortBlurb: "The ones who keep SUSC running smoothly behind the scenes.",
    longDescription:
      "Handles all day-to-day admin, meeting minutes, project management tools, and internal events like bonding sessions and farewells.",
    traits: ["organized", "detail-oriented", "low-drama"],
    photos: [],
    applyLink: "", // pending EMR form link
  },
  {
    slug: "treasury",
    name: "Treasury",
    shortBlurb: "Keeps every ringgit accounted for.",
    longDescription:
      "Manages claims approval, expense records, subsidy requests to Student LIFE, and budget alignment across departments.",
    traits: ["meticulous", "trustworthy", "process-driven"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "academic-affairs",
    name: "Academic Affairs",
    shortBlurb: "The voice for student academic concerns.",
    longDescription:
      "Represents schools/faculties on academic issues, gathers feedback, compiles evidence for resolution, and represents students in management meetings.",
    traits: ["advocate", "discreet", "detail-oriented"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "external-relations",
    name: "External Relations",
    shortBlurb: "Builds the partnerships that make events happen.",
    longDescription:
      "Negotiates partnerships, co-hosts events with external parties, sources sponsors, and manages sponsorship documentation and fulfillment.",
    traits: ["networker", "persuasive", "resourceful"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "extracurricular",
    name: "Extracurricular",
    shortBlurb: "The bridge between SUSC and every club on campus.",
    longDescription:
      "Supports Clubs & Societies, collaborates with Student LIFE on C&S activities, and keeps club-related paperwork in order.",
    traits: ["connector", "upbeat", "reliable"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "public-relations",
    name: "Public Relations",
    shortBlurb: "The creative force behind SUSC's online presence.",
    longDescription:
      "Creates and manages SUSC's social media content, promotional materials, and community engagement across platforms.",
    traits: ["creative", "trend-aware", "social-fluent"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "student-relations",
    name: "Student Relations",
    shortBlurb: "Champions student welfare and feedback.",
    longDescription:
      "Plans welfare initiatives like townhalls and feedback channels, collects and summarizes student feedback, and coordinates student-centric collaborations.",
    traits: ["empathetic", "welfare-focused", "composed"],
    photos: [],
    applyLink: "",
  },
  {
    slug: "international-student-relations",
    name: "International Student Relations",
    shortBlurb: "The dedicated support system for international students.",
    longDescription:
      "Supports international students through a complaint/feedback pipeline, policy advocacy, and dedicated ISR initiatives and events.",
    traits: ["cross-cultural", "policy-minded", "patient"],
    photos: [],
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
