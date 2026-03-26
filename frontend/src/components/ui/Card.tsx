export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-surface-border bg-surface-card p-5 shadow-lg shadow-black/20 ${className}`}
    >
      {title ? (
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
