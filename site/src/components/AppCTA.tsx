import { QRCodeSVG } from 'qrcode.react';
import { playUrl } from '../lib/config';

const POINTS = [
  { t: 'Full resolution', d: 'The web hands out a compressed preview. The app saves the real file, up to 1080 x 1920, straight to your gallery.' },
  { t: 'Set without leaving', d: 'Home screen, lock screen, or both, in one tap.' },
  { t: 'Works offline', d: 'Your saved wallpapers stay on the phone. No account, no sign-in.' },
];

export default function AppCTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="relative overflow-hidden rounded-card border border-line bg-surface p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-gradient opacity-20 blur-3xl" />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              The full-quality wallpapers are in the app
            </h2>
            <p className="mt-3 max-w-lg text-muted">
              Everything you see here is browsable free. Downloading the crisp,
              full-size file — and skipping ads with Pro — happens in Themeplix
              for Android.
            </p>

            <dl className="mt-8 space-y-4">
              {POINTS.map((p) => (
                <div key={p.t} className="flex gap-3">
                  <svg
                    className="mt-1 shrink-0 text-accent" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <dt className="font-display text-sm font-semibold">{p.t}</dt>
                    <dd className="text-sm text-muted">{p.d}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <a
              href={playUrl('web_cta')}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-display text-sm font-bold text-white transition hover:brightness-105"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3l14 9-14 9V3z" />
              </svg>
              Get it on Google Play
            </a>
          </div>

          <div className="mx-auto rounded-2xl border border-line bg-bg p-5 text-center">
            <div className="mx-auto w-fit rounded-xl bg-white p-3">
              <QRCodeSVG value={playUrl('web_cta_qr')} size={132} />
            </div>
            <p className="mt-3 text-sm font-semibold">Scan to install</p>
            <p className="text-xs text-muted">Android 8 and up</p>
          </div>
        </div>
      </div>
    </section>
  );
}
