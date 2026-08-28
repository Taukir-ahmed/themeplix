import type { ReactNode } from 'react';

export function LegalPage({
  title,
  updated,
  lede,
  children,
}: {
  title: string;
  updated?: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {lede && <p className="mt-3 text-muted">{lede}</p>}
      {updated && (
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-faint">
          {updated}
        </p>
      )}
      <div className="mt-8 space-y-7">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-base font-bold tracking-tight">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-muted [&_a]:font-medium [&_a]:text-accent">
        {children}
      </div>
    </section>
  );
}

export function Callout({
  tag,
  tone,
  children,
}: {
  tag: string;
  tone: 'good' | 'warn';
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-4">
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
          tone === 'good' ? 'text-[#4ADE9D]' : 'text-gold'
        }`}
      >
        {tag}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text">{children}</p>
    </div>
  );
}
