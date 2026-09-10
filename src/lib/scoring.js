import { departments } from "../data/departments.js";

const ALL_SLUGS = departments.map((d) => d.slug);

// Build a fresh { slug: 0 } map for all departments.
function emptyScores() {
  return ALL_SLUGS.reduce((acc, slug) => {
    acc[slug] = 0;
    return acc;
  }, {});
}

/**
 * Score a completed quiz.
 *
 * @param {Array<{ weights: Record<string, number> }>} answeredOptions
 *   The option objects the visitor selected (one per answered question).
 * @returns {{
 *   top2: Array<{ slug: string, score: number }>,
 *   scores: Record<string, number>
 * }}
 *   `top2` is always exactly two departments (highest score first), regardless of
 *   the gap between them. `scores` is the full breakdown for every department,
 *   used for analytics / the submission payload.
 */
export function scoreQuiz(answeredOptions) {
  const scores = emptyScores();

  for (const option of answeredOptions) {
    if (!option || !option.weights) continue;
    for (const [slug, weight] of Object.entries(option.weights)) {
      if (slug in scores) {
        scores[slug] += weight;
      }
    }
  }

  // Sort by score descending. Ties fall back to the canonical department order
  // so results are deterministic rather than dependent on object key ordering.
  const ranked = ALL_SLUGS
    .map((slug) => ({ slug, score: scores[slug] }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return ALL_SLUGS.indexOf(a.slug) - ALL_SLUGS.indexOf(b.slug);
    });

  return {
    top2: ranked.slice(0, 2),
    scores,
  };
}
