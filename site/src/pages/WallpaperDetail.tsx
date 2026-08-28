import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Spinner from '../components/Spinner';
import StateView from '../components/StateView';
import WallpaperGrid from '../components/WallpaperGrid';
import { useGetApp } from '../components/getAppContext';
import { useAsync } from '../hooks/useAsync';
import { downloadWebPreview } from '../lib/download';
import { playUrl } from '../lib/config';
import {
  displayCount,
  fetchWallpaperById,
  fetchWallpapers,
  recordDownload,
} from '../lib/wallpapers';

type DownloadState = 'idle' | 'working' | 'done' | 'error';

export default function WallpaperDetail() {
  const { id = '' } = useParams();
  const getApp = useGetApp();
  const { data: wp, loading } = useAsync(() => fetchWallpaperById(id), [id]);
  const related = useAsync(
    () =>
      wp
        ? fetchWallpapers({ categorySlug: wp.categorySlug, page: 0, pageSize: 9 })
        : Promise.resolve({ items: [], page: 0, hasMore: false }),
    [wp?.categorySlug]
  );

  const [dl, setDl] = useState<DownloadState>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDl('idle');
  }, [id]);

  const onWebDownload = useCallback(async () => {
    if (!wp) return;
    setDl('working');
    try {
      await downloadWebPreview(wp.thumbUrl, wp.id);
      recordDownload(wp.id);
      setDl('done');
    } catch {
      setDl('error');
      getApp.open('hd');
    }
  }, [wp, getApp]);

  const onShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ url, title: 'Themeplix wallpaper' });
        return;
      } catch {
        /* cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }, []);

  if (loading) return <Spinner label="Loading wallpaper" />;
  if (!wp)
    return (
      <StateView
        title="Wallpaper not found"
        body="It may have been removed."
        action={
          <Link to="/explore" className="text-sm font-medium text-accent">
            Back to Explore →
          </Link>
        }
      />
    );

  const catName = wp.categorySlug.replace(/-/g, ' ');

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Seo
        title={`${catName} wallpaper`}
        description="Free phone wallpaper on Themeplix. Browse on the web; download full resolution in the app."
        image={wp.thumbUrl}
        path={`/w/${wp.id}`}
      />

      <Link to="/explore" className="text-sm text-muted hover:text-text">
        ← All wallpapers
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,340px)_1fr] md:items-start">
        {/* Preview — always the small thumb, framed so the softness reads as design */}
        <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-3xl border border-line-strong">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
            style={{ backgroundImage: `url(${wp.thumbUrl})` }}
          />
          <img
            src={wp.thumbUrl}
            alt=""
            className="relative aspect-[9/19.5] w-full object-cover"
          />
        </div>

        {/* Actions */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {catName}
          </p>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted">
            <span className="flex items-center gap-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
              </svg>
              {displayCount(wp)} downloads
            </span>
            {wp.premium && (
              <span className="flex items-center gap-1 text-gold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1l3 6 6 .9-4.5 4.3L17 19l-5-2.7L7 19l1.5-6.8L4 7.9 10 7z" />
                </svg>
                Premium
              </span>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={onWebDownload}
              disabled={dl === 'working'}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-display text-sm font-bold text-text transition hover:bg-surface disabled:opacity-60 sm:w-auto"
            >
              {dl === 'working'
                ? 'Preparing…'
                : dl === 'done'
                  ? 'Saved — check your downloads'
                  : 'Download web preview'}
            </button>

            <button
              onClick={() => getApp.open('hd')}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-display text-sm font-bold text-white transition hover:brightness-105 sm:w-auto"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3l14 9-14 9V3z" />
              </svg>
              Download full resolution (app)
            </button>
          </div>

          <button
            onClick={onShare}
            className="mt-3 flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium text-muted transition hover:text-text"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
            </svg>
            {copied ? 'Link copied' : 'Share'}
          </button>

          <div className="mt-6 rounded-2xl border border-line bg-surface/50 p-4 text-xs leading-relaxed text-muted">
            The web preview is a small, watermarked image — fine for a quick look,
            soft on a real phone screen.{' '}
            {wp.premium
              ? 'This is a premium wallpaper: unlock it free in the app with a short video, or with Themeplix Pro.'
              : 'The clean, full-resolution file is a free download in the app.'}{' '}
            <a href={playUrl('web_detail_note')} target="_blank" rel="noreferrer" className="font-semibold text-accent">
              Get Themeplix →
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      {(related.data?.items.filter((r) => r.id !== wp.id).length ?? 0) > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-xl font-bold tracking-tight">More like this</h2>
          <WallpaperGrid items={(related.data?.items ?? []).filter((r) => r.id !== wp.id)} />
        </section>
      )}
    </div>
  );
}
