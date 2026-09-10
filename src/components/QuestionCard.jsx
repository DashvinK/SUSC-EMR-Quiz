const LETTERS = ["A", "B", "C", "D", "E"];

/**
 * Renders a single quiz question and its options.
 * @param {{
 *   question: { id: string, prompt: string, options: Array<{ text: string }> },
 *   selectedIndex: number | undefined,
 *   onSelect: (optionIndex: number) => void
 * }} props
 */
export default function QuestionCard({ question, selectedIndex, onSelect }) {
  return (
    <div className="animate-pop-in">
      <h2 className="mb-6 text-xl font-bold leading-snug text-navy sm:text-3xl">
        {question.prompt}
      </h2>

      <ul className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          return (
            <li
              key={index}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={isSelected}
                className={[
                  "flex w-full items-center gap-3 rounded-chunk border-[3px] border-navy px-4 py-4 text-left text-[15px] font-semibold transition-all duration-200 sm:text-base",
                  "hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/30",
                  isSelected
                    ? "scale-[1.01] bg-blue text-white shadow-hard"
                    : "bg-white text-navy shadow-hard-sm hover:bg-sky",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border-2 border-navy text-sm font-bold transition-all duration-200",
                    isSelected ? "rotate-6 scale-110 bg-white text-navy" : "bg-sky text-navy",
                  ].join(" ")}
                >
                  {isSelected ? "✓" : LETTERS[index]}
                </span>
                <span>{option.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
