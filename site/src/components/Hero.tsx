import { Link } from 'react-router-dom';
import type { Wallpaper } from '../lib/types';
import { playUrl } from '../lib/config';

export default function Hero({ showcase }: { showcase: Wallpaper[] }) {
  const strip = showcase.slice(0, 5);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-20 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_1fr] lg:pb-24 lg:pt-20">
        <div className="animate-float-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            New wallpapers every week
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Wallpapers made for the <span className="text-gradient">screen in your hand</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Hand-curated, AI-crafted, and cut to fit a modern phone. Browse the
            whole gallery free right here. Want the crisp, full-resolution file
            saved straight to your photos? That is what the app is for.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={playUrl('web_hero')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-display text-sm font-bold text-white transition hover:brightness-105"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3l14 9-14 9V3z" />
              </svg>
              Get it on Google Play
            </a>
            <Link
              to="/explore"
              className="rounded-full border border-line-strong px-6 py-3.5 font-display text-sm font-bold text-text transition hover:bg-surface"
            >
              Browse wallpapers
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-3 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            {strip.map((wp, i) => (
              <div
                key={wp.id}
                className="relative aspect-[9/19] flex-1 overflow-hidden rounded-2xl border border-line"
                style={{
                  transform: `translateY(${i % 2 === 0 ? '-10px' : '14px'})`,
                }}
              >
                <img src={wp.thumbUrl} alt="" className="h-full w-full object-cover" loading="eager" />
              </div>
            ))}
            {strip.length === 0 &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[9/19] flex-1 rounded-2xl bg-surface-2" />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
