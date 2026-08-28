import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Wallpaper } from '../lib/types';

/**
 * A gallery card. Always renders the small WebP thumb — the website never
 * embeds the full-resolution file anywhere, for anyone. Premium wallpapers are
 * browsable here too; they just carry a badge and, like every wallpaper, only
 * hand out a compressed preview on the web.
 */
export default function WallpaperCard({ wp, rank }: { wp: Wallpaper; rank?: number }) {
  const [loaded, setLoaded] = useState(false);
  const ratio = Math.min(Math.max(wp.aspectRatio, 1.2), 2.2);

  return (
    <Link
      to={`/w/${wp.id}`}
      className="group mb-4 block overflow-hidden rounded-2xl border border-line transition hover:border-line-strong"
    >
      <div
        className="relative w-full overflow-hidden bg-surface-2"
        style={{ paddingTop: `${ratio * 100}%` }}
      >
        <img
          src={wp.thumbUrl}
          alt=""
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {wp.premium && (
          <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-gold px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-fg">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1l3 6 6 .9-4.5 4.3L17 19l-5-2.7L7 19l1.5-6.8L4 7.9 10 7z" />
            </svg>
            Premium
          </span>
        )}

        {rank != null && (
          <span className="absolute bottom-1 right-2 font-display text-2xl font-bold text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,.5)]">
            {rank}
          </span>
        )}
      </div>
    </Link>
  );
}
