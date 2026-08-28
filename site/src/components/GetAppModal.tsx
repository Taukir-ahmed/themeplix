import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PLAY_STORE_URL, playUrl } from '../lib/config';
import { GetAppContext, type GetAppReason } from './getAppContext';

const COPY: Record<GetAppReason, { title: string; body: string }> = {
  hd: {
    title: 'Full resolution lives in the app',
    body: 'The website only serves a compressed preview. Get the Themeplix app to download this wallpaper crisp and full-size, straight to your photos.',
  },
  premium: {
    title: 'This one is a premium wallpaper',
    body: 'Premium wallpapers unlock in the Themeplix app — free with a short rewarded video, or always-on with Themeplix Pro.',
  },
  generic: {
    title: 'Get the Themeplix app',
    body: 'Thousands of wallpapers, full-resolution downloads, one-tap set, and no ads on Pro. Free on Google Play.',
  },
};

export function GetAppProvider({ children }: { children: ReactNode }) {
  const [reason, setReason] = useState<GetAppReason | null>(null);

  const open = useCallback((r: GetAppReason = 'generic') => setReason(r), []);
  const close = useCallback(() => setReason(null), []);

  useEffect(() => {
    if (!reason) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [reason, close]);

  const api = useMemo(() => ({ open }), [open]);
  const copy = reason ? COPY[reason] : null;

  return (
    <GetAppContext.Provider value={api}>
      {children}
      {copy && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            className="animate-float-in w-full max-w-md overflow-hidden rounded-t-3xl border border-line-strong bg-surface sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 w-full bg-brand-gradient" />
            <div className="p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold tracking-tight">{copy.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{copy.body}</p>

              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-line bg-bg p-4">
                <div className="shrink-0 rounded-xl bg-white p-2">
                  <QRCodeSVG value={playUrl('web_modal_qr')} size={92} />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-text">Scan to install</p>
                  <p className="mt-1 text-muted">
                    Point your phone camera at the code, or use the button below.
                  </p>
                </div>
              </div>

              <a
                href={playUrl('web_modal')}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center rounded-full bg-brand-gradient px-6 py-3.5 font-display text-sm font-bold text-white transition hover:brightness-105"
              >
                Get it on Google Play
              </a>
              <button
                onClick={close}
                className="mt-2 w-full rounded-full px-6 py-2.5 text-sm font-medium text-muted transition hover:text-text"
              >
                Keep browsing the web
              </button>
              <p className="mt-3 text-center text-[11px] text-faint">{PLAY_STORE_URL}</p>
            </div>
          </div>
        </div>
      )}
    </GetAppContext.Provider>
  );
}
