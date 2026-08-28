import { cn } from '../lib/cn';
import { PRO_PLANS, playUrl } from '../lib/config';

const PERKS = [
  'Every ad gone — banners and rewarded videos',
  'The entire premium shelf unlocked',
  'Full-resolution saves, no compression',
  'One-tap set as home or lock screen',
];

export default function ProPlans({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn('mx-auto max-w-6xl px-5', compact ? 'py-14' : 'py-20')}>
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Themeplix Pro
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Go ad-free. Unlock everything.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          Pro is bought inside the app through Google Play. Prices shown in INR;
          Google localises at checkout.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {PRO_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'relative rounded-card border p-6',
              plan.highlight
                ? 'border-accent bg-surface'
                : 'border-line bg-surface/50'
            )}
          >
            {plan.badge && (
              <span className="absolute -top-2.5 left-6 rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {plan.badge}
              </span>
            )}
            <p className="font-display text-sm font-semibold text-muted">{plan.name}</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight">{plan.price}</p>
            <p className="text-sm text-muted">{plan.cadence}</p>
            {plan.note && <p className="mt-1 text-xs text-accent">{plan.note}</p>}
          </div>
        ))}
      </div>

      <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
        {PERKS.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5 text-sm text-muted">
            <svg
              className="mt-0.5 shrink-0 text-accent"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <a
          href={playUrl('web_pro')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-display text-sm font-bold text-white transition hover:brightness-105"
        >
          Get the app to go Pro
        </a>
      </div>
    </section>
  );
}
