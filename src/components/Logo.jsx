import { useState } from "react";

/**
 * SUSC logo — the official Sunway University Student Council lockup, framed as a
 * chunky sticker badge to match the playful theme. The PNG already contains the
 * wordmark, so no extra text is rendered next to it. Falls back to a text "S"
 * sticker if the asset ever fails to load.
 *
 * @param {{ className?: string, size?: string }} props
 *   `size` is a Tailwind height utility (default "h-11"); width is auto.
 */
export default function Logo({ className = "", size = "h-11" }) {
  const [imgOk, setImgOk] = useState(true);

  if (!imgOk) {
    return (
      <span
        aria-label="SUSC"
        className={`grid ${size} aspect-square -rotate-6 place-items-center rounded-xl border-[3px] border-navy bg-blue text-lg font-bold text-white shadow-hard-sm ${className}`}
      >
        S
      </span>
    );
  }

  return (
    <img
      src="/assets/logo.png"
      alt="Sunway University Student Council"
      className={`${size} inline-block w-auto rounded-lg ${className}`}
      onError={() => setImgOk(false)}
    />
  );
}
