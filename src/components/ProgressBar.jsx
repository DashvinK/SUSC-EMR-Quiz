/**
 * Playful quiz progress indicator.
 * @param {{ current: number, total: number }} props  `current` is 1-based.
 */
export default function ProgressBar({ current, total }) {
  const clamped = Math.min(Math.max(current, 0), total);
  const pct = total > 0 ? (clamped / total) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="sticker -rotate-2">
          Q{clamped} / {total}
        </span>
        <span className="text-sm font-bold text-navy/70">
          {Math.round(pct)}% there!
        </span>
      </div>
      <div
        className="relative h-4 w-full overflow-hidden rounded-full border-[3px] border-navy bg-white"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Quiz progress"
      >
        <div
          className="relative h-full overflow-hidden rounded-full bg-blue transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        >
          {/* moving glint */}
          <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/40 blur-sm" />
        </div>
      </div>
    </div>
  );
}
