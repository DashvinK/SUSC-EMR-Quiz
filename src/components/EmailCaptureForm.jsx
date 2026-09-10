import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASS =
  "rounded-2xl border-[3px] border-navy bg-white px-4 py-3 text-base font-medium text-navy shadow-hard-sm focus:-translate-y-0.5 focus:shadow-hard focus:outline-none transition-all placeholder:text-navy/40";

/**
 * Post-result email capture. Collects name + email + opt-in and hands them to
 * `onSubmit` (the parent decides what to do — §9.4: a second lightweight call).
 *
 * @param {{ onSubmit: (data: { name: string, email: string, emailOptIn: boolean }) => (void | Promise<void>) }} props
 */
export default function EmailCaptureForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!EMAIL_RE.test(email.trim())) {
      setError("Hmm, that email looks off — mind checking it? 🤔");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        emailOptIn: optIn,
      });
      setDone(true);
    } catch {
      setDone(true); // best-effort (§9); still show a friendly done state
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card animate-bounce-in bg-sky p-6 text-center">
        <p className="text-4xl">🎉</p>
        <p className="mt-2 text-xl font-bold text-navy">You're on the list!</p>
        <p className="mt-1 text-sm font-medium text-navy/70">
          We'll be in touch about EMR. See you soon!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h3 className="text-xl font-bold text-navy">
        Want a nudge when EMR opens? 🔔
      </h3>
      <p className="mt-1 text-sm font-medium text-navy/70">
        Drop your details and we'll remind you to apply. Totally optional.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold text-navy/80">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold text-navy/80">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex items-start gap-2 text-sm font-medium text-navy/80">
          <input
            type="checkbox"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-blue"
          />
          <span>Email me updates about SUSC recruitment.</span>
        </label>

        {error ? (
          <p
            className="rounded-xl border-2 border-navy bg-white px-3 py-2 text-sm font-bold text-blue-dark"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn-primary mt-1" disabled={submitting}>
          {submitting ? "Saving…" : "Keep me posted 🚀"}
        </button>
      </div>
    </form>
  );
}
