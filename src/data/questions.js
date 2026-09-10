// Quiz questions. Option `weights` keys MUST match department slugs in src/data/departments.js:
// secretarial, treasury, academic-affairs, external-relations, extracurricular,
// public-relations, student-relations
//
// Quick mode  = coreQuestions (10).
// Thorough mode = coreQuestions.concat(extendedQuestions) (14).

// Quick set — Questions 1–10 (used in both Quick and Thorough).
export const coreQuestions = [
  {
    id: "q1",
    prompt:
      "A club exec messages you at 11pm asking for last-minute help sourcing a sponsor for tomorrow's event. You...",
    options: [
      { text: "Start drafting a sponsor pitch right then", weights: { "external-relations": 3 } },
      { text: "Reply calmly, offer to help first thing tomorrow", weights: { secretarial: 2, "student-relations": 1 } },
      { text: "Loop in whoever normally handles club logistics", weights: { extracurricular: 3 } },
      { text: "Ask what the event actually needs before deciding anything", weights: { "academic-affairs": 2, "student-relations": 2 } },
    ],
  },
  {
    id: "q2",
    prompt: "Pick the task that sounds most satisfying to finish:",
    options: [
      { text: "A perfectly reconciled expense sheet", weights: { treasury: 3 } },
      { text: "A caption that gets shared everywhere", weights: { "public-relations": 3 } },
      { text: "A student complaint that finally got resolved", weights: { "academic-affairs": 2, "student-relations": 2 } },
      { text: "A signed sponsorship deal", weights: { "external-relations": 3 } },
    ],
  },
  {
    id: "q3",
    prompt: "A meeting is running long and going nowhere. You're most likely to...",
    options: [
      { text: "Quietly take notes so nothing gets lost", weights: { secretarial: 3 } },
      { text: "Redirect it back to the actual agenda", weights: { "academic-affairs": 2, treasury: 1 } },
      { text: "Crack a joke to lighten the room", weights: { extracurricular: 2, "public-relations": 1 } },
      { text: "Wait, then follow up 1-on-1 with the key person after", weights: { "student-relations": 2 } },
    ],
  },
  {
    id: "q4",
    prompt:
      "A friend asks what you'd actually be good at in SUSC. Which answer feels most true?",
    options: [
      { text: '"I notice when something\'s off before anyone else does"', weights: { treasury: 2, "academic-affairs": 1 } },
      { text: '"I can talk to literally anyone"', weights: { "external-relations": 2, "public-relations": 1 } },
      { text: '"People tell me things they wouldn\'t tell others"', weights: { "student-relations": 2 } },
      { text: '"I keep things running even when no one\'s watching"', weights: { secretarial: 2, extracurricular: 1 } },
    ],
  },
  {
    id: "q5",
    prompt: "A student comes to you confused about a campus policy. You...",
    options: [
      { text: "Walk them through it patiently, step by step", weights: { "student-relations": 3 } },
      { text: "Escalate it to whoever can actually fix the policy", weights: { "academic-affairs": 3 } },
      { text: "Make a note to raise it in the next feedback session", weights: { "academic-affairs": 2, "student-relations": 1 } },
      { text: "Point them to the right department calmly", weights: { secretarial: 2 } },
    ],
  },
  {
    id: "q6",
    prompt: "Which frustrates you more?",
    options: [
      { text: "Messy, disorganized paperwork", weights: { secretarial: 2, treasury: 2 } },
      { text: "A partnership opportunity nobody followed up on", weights: { "external-relations": 3 } },
      { text: "A caption/post that goes out with typos", weights: { "public-relations": 3 } },
      { text: "A student issue nobody's tracking", weights: { "academic-affairs": 1, "student-relations": 1 } },
    ],
  },
  {
    id: "q7",
    prompt: "You're most energized after a day of...",
    options: [
      { text: "Closing out a stack of admin tasks", weights: { secretarial: 3 } },
      { text: "Landing a new sponsor", weights: { "external-relations": 3 } },
      { text: "Making something visually excellent", weights: { "public-relations": 3 } },
      { text: "Actually helping someone with a real problem", weights: { "student-relations": 3 } },
    ],
  },
  {
    id: "q8",
    prompt: "A club wants help but doesn't know who to ask. You're the one who...",
    options: [
      { text: "Already knows exactly who to connect them to", weights: { extracurricular: 3 } },
      { text: "Just handles it yourself", weights: { "external-relations": 1, "student-relations": 1 } },
      { text: "Documents the request properly first", weights: { secretarial: 2, treasury: 1 } },
    ],
  },
  {
    id: "q9",
    prompt: "Forced choice: would you rather...",
    options: [
      { text: "Manage money carefully", weights: { treasury: 3 } },
      { text: "Manage people's feelings carefully", weights: { "student-relations": 3 } },
    ],
  },
  {
    id: "q10",
    prompt: "Forced choice: would you rather...",
    options: [
      { text: "Design something people will screenshot", weights: { "public-relations": 3 } },
      { text: "Negotiate something people will sign", weights: { "external-relations": 3 } },
    ],
  },
];

// Thorough-only additions — Questions 11–14 (differentiate close pairs).
export const extendedQuestions = [
  {
    id: "q11",
    prompt: "Forced choice: would you rather...",
    options: [
      { text: "Pitch a sponsor on why they should partner with SUSC", weights: { "external-relations": 3 } },
      { text: "Design the campaign announcing that partnership", weights: { "public-relations": 3 } },
    ],
  },
  {
    id: "q12",
    prompt: "Forced choice: would you rather...",
    options: [
      { text: "Represent students in a meeting about an academic policy", weights: { "academic-affairs": 3 } },
      { text: "Sit with a student one-on-one to hear out their concern", weights: { "student-relations": 3 } },
    ],
  },
  {
    id: "q13",
    prompt: "Forced choice: would you rather...",
    options: [
      { text: "Keep the books balanced down to the ringgit", weights: { treasury: 3 } },
      { text: "Keep every meeting's minutes and admin airtight", weights: { secretarial: 3 } },
    ],
  },
  {
    id: "q14",
    prompt: "Forced choice: would you rather...",
    options: [
      { text: "Be the one clubs call when they need something sorted", weights: { extracurricular: 3 } },
      { text: "Be the one keeping SUSC's own internal operations tidy", weights: { secretarial: 3 } },
    ],
  },
];

export const QUIZ_LENGTHS = {
  quick: { key: "quick", label: "Quick", count: coreQuestions.length },
  thorough: {
    key: "thorough",
    label: "Thorough",
    count: coreQuestions.length + extendedQuestions.length,
  },
};

// Returns the ordered question list for a given quiz length.
export function getQuestions(length) {
  return length === "thorough"
    ? coreQuestions.concat(extendedQuestions)
    : coreQuestions;
}
