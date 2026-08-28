/** App identity and public links — mirrors constants/app.ts in the phone app. */

export const PACKAGE_NAME = 'com.themeplix.wallpapers';
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;
export const SITE_URL = 'https://themeplix.app';
export const SUPPORT_EMAIL = 'support@themeplix.app';

/** A Play link tagged so installs from the site show up in the Play Console. */
export function playUrl(source: string): string {
  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(source)}`;
}

/**
 * Web download policy.
 *
 * The website only ever loads the small grid thumbnail (~400px WebP) — the
 * full-resolution 1080x1920 file is never embedded in a page or offered for
 * download here. The "download" button re-encodes even that thumbnail to a
 * watermarked JPEG. It is a preview, nothing more. Anyone who wants the clean,
 * full-size wallpaper is sent to the app.
 */
export const WEB_DOWNLOAD = {
  /** Hard cap on the longest edge, in px. Thumbnails are already ~400px wide. */
  maxEdge: 512,
  /** JPEG quality for the web download. */
  quality: 0.7,
  /** Stamp a faint themeplix.app mark on web downloads. Set false to remove. */
  watermark: true,
};

export interface ProPlan {
  id: 'monthly' | 'yearly' | 'lifetime';
  name: string;
  price: string;
  cadence: string;
  note?: string;
  badge?: string;
  highlight?: boolean;
}

export const PRO_PLANS: ProPlan[] = [
  { id: 'monthly', name: 'Monthly', price: '₹49', cadence: 'per month' },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '₹199',
    cadence: 'per year',
    note: 'Just ₹17/mo, billed yearly',
    badge: 'SAVE 66%',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '₹799',
    cadence: 'one payment',
    note: 'Pay once — yours forever',
    badge: 'BEST VALUE',
    highlight: true,
  },
];
