// Client-side submission flow (build plan §9).
// Fire-and-forget POST to the serverless route with silent retry. The result UI
// must never block on, or surface errors from, this call.

const ENDPOINT = "/api/submit-result";
const RETRY_DELAYS_MS = [1000, 3000]; // after the first attempt: wait 1s, then 3s

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postOnce(payload) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`submit failed: ${res.status}`);
  }
  return res;
}

/**
 * Submit a quiz result in the background, retrying up to two more times on failure
 * (delays: 1s, 3s), then giving up silently. Never throws.
 *
 * @param {{
 *   qrSource: string,
 *   quizLength: string,
 *   dept1: string,
 *   dept2: string,
 *   scoreBreakdown: Record<string, number>,
 *   name?: string,
 *   email?: string,
 *   emailOptIn?: boolean
 * }} payload
 * @returns {Promise<boolean>} whether a submission eventually succeeded
 */
export async function submitResult(payload) {
  const attempts = 1 + RETRY_DELAYS_MS.length;
  for (let i = 0; i < attempts; i += 1) {
    try {
      await postOnce(payload);
      return true;
    } catch {
      if (i < RETRY_DELAYS_MS.length) {
        await delay(RETRY_DELAYS_MS[i]);
      }
    }
  }
  return false; // gave up silently
}
