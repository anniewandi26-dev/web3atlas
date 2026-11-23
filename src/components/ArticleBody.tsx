type Section = { heading: string; body: string };

export function ArticleBody({
  intro,
  sections,
  keyPoints,
  tips,
  checklist,
  labels,
}: {
  intro?: string;
  sections?: Section[];
  keyPoints?: string[];
  tips?: string[];
  checklist?: string[];
  labels: {
    keyPoints: string;
    tips: string;
    checklist: string;
  };
}) {
  return (
    <div className="space-y-8">
      {intro ? (
        <p className="text-base leading-relaxed text-cyan-50/85">{intro}</p>
      ) : null}

      {sections?.map((s) => (
        <section key={s.heading} className="space-y-3">
          <h2 className="font-display text-lg text-white border-l-2 border-cyan-400/60 pl-3">
            {s.heading}
          </h2>
          <div className="space-y-3 text-base leading-relaxed text-[var(--muted)]">
            {s.body.split(/\n+/).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      {keyPoints && keyPoints.length > 0 ? (
        <section className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 sm:p-5">
          <h3 className="font-display text-sm tracking-wide text-cyan-200">
            {labels.keyPoints}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {keyPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tips && tips.length > 0 ? (
        <section className="rounded-xl border border-indigo-400/25 bg-indigo-500/10 p-4 sm:p-5">
          <h3 className="font-display text-sm tracking-wide text-indigo-200">
            {labels.tips}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="mt-0.5 shrink-0 text-indigo-300">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {checklist && checklist.length > 0 ? (
        <section className="rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-4 sm:p-5">
          <h3 className="font-display text-sm tracking-wide text-emerald-200">
            {labels.checklist}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-0.5 shrink-0 text-emerald-300">☑</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
