import { toPng } from "html-to-image";

// Thin wrapper around html-to-image so the rest of the app doesn't depend on it directly.
// Renders a DOM node to a PNG data URL suitable for download or the Web Share API.

const DEFAULT_OPTIONS = {
  cacheBust: true,
  pixelRatio: 2, // crisp on high-DPI / retina phones
  backgroundColor: "#115C80",
};

/**
 * Render a node to a PNG data URL.
 * @param {HTMLElement} node
 * @param {object} [options] html-to-image overrides
 * @returns {Promise<string>} data URL
 */
export async function nodeToPng(node, options = {}) {
  if (!node) throw new Error("shareCard: no node provided");
  return toPng(node, { ...DEFAULT_OPTIONS, ...options });
}

// Convert a data URL to a File (for the Web Share API / uploads).
async function dataUrlToFile(dataUrl, filename) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}

/**
 * Trigger a browser download of the rendered card.
 * @param {HTMLElement} node
 * @param {string} [filename]
 */
export async function downloadShareCard(node, filename = "susc-result.png") {
  const dataUrl = await nodeToPng(node);
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Share the card via the native share sheet when available (mobile), falling back
 * to a download on desktop / unsupported browsers.
 * @param {HTMLElement} node
 * @param {{ title?: string, text?: string, filename?: string }} [meta]
 * @returns {Promise<"shared" | "downloaded">}
 */
export async function shareCard(node, meta = {}) {
  const {
    title = "My SUSC department match",
    text = "I found out which SUSC department suits me — take the quiz!",
    filename = "susc-result.png",
  } = meta;

  const dataUrl = await nodeToPng(node);
  const file = await dataUrlToFile(dataUrl, filename);

  if (
    typeof navigator !== "undefined" &&
    navigator.canShare &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({ files: [file], title, text });
      return "shared";
    } catch (err) {
      // User cancelled the share sheet, or it failed — fall through to download.
      if (err && err.name === "AbortError") return "shared";
    }
  }

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
  return "downloaded";
}
