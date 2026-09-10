// QR source tracking (build plan §10).
// On app load, read `?src=` from the URL and persist it for the visit so it can be
// attached to the final submission. If absent, default to "direct".

const STORAGE_KEY = "susc_qr_source";
const DEFAULT_SOURCE = "direct";

function safeSessionGet(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* sessionStorage unavailable (private mode, etc.) — non-fatal */
  }
}

/**
 * Capture the `?src=` param once, on app load. Call from a top-level effect.
 * The first value seen in a session wins, so a later internal navigation that
 * drops the param doesn't overwrite the original placement.
 * @returns {string} the resolved source
 */
export function captureQrSource() {
  const existing = safeSessionGet(STORAGE_KEY);
  if (existing) return existing;

  let fromUrl = null;
  try {
    fromUrl = new URLSearchParams(window.location.search).get("src");
  } catch {
    fromUrl = null;
  }

  const resolved = (fromUrl && fromUrl.trim()) || DEFAULT_SOURCE;
  safeSessionSet(STORAGE_KEY, resolved);
  return resolved;
}

/** Read the captured source (defaults to "direct" if capture never ran). */
export function getQrSource() {
  return safeSessionGet(STORAGE_KEY) || DEFAULT_SOURCE;
}
