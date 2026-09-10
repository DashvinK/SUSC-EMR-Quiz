import { forwardRef } from "react";
import Logo from "./Logo.jsx";

/**
 * The visual card rendered to a PNG by html-to-image (src/lib/shareCard.js).
 * Self-contained styling so the captured image matches what's on screen.
 * The ref points at the capture root.
 *
 * @param {{
 *   dept1: { name: string, shortBlurb: string },
 *   dept2: { name: string, shortBlurb: string }
 * }} props
 */
const ShareCardPreview = forwardRef(function ShareCardPreview(
  { dept1, dept2 },
  ref
) {
  return (
    <div
      ref={ref}
      className="w-full max-w-sm rounded-chunk border-[3px] border-navy bg-blue p-6 font-sans text-white shadow-hard-lg"
    >
      <div className="mb-5 flex items-center">
        {/* Tinted sticker plate (not white) gives the logo a defined charcoal
            edge so its blue band doesn't dissolve into the blue card. */}
        <span className="inline-flex rounded-xl border-[3px] border-navy bg-sky p-1.5 shadow-hard-sm">
          <Logo size="h-10" />
        </span>
      </div>

      <p className="inline-block rounded-full border-2 border-navy bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
        My department match ✨
      </p>

      <div className="mt-4 space-y-3">
        <MatchRow rank={1} dept={dept1} />
        <MatchRow rank={2} dept={dept2} />
      </div>

      <p className="mt-6 font-display text-base font-semibold text-white">
        Which SUSC department suits you? Take the quiz 👀
      </p>
    </div>
  );
});

function MatchRow({ rank, dept }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border-[3px] border-navy bg-white/10 p-3">
      <span className="grid h-9 w-9 flex-shrink-0 -rotate-6 place-items-center rounded-xl border-2 border-navy bg-white text-sm font-bold text-navy">
        #{rank}
      </span>
      <div>
        <p className="font-display text-lg font-bold leading-tight text-white">
          {dept.name}
        </p>
        <p className="text-sm font-medium leading-snug text-white/85">
          {dept.shortBlurb}
        </p>
      </div>
    </div>
  );
}

export default ShareCardPreview;
