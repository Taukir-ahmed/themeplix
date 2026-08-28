/**
 * Themeplix — shareable wallpaper landing page.
 *
 * Serves https://themeplix.app/w/<id> : a tiny HTML page that
 *   1. carries Open Graph tags so WhatsApp / Telegram / Facebook show the
 *      wallpaper thumbnail as the link preview (not a generic app icon),
 *   2. redirects to the Play Store after ~1s (with an install-referrer so you
 *      can see which wallpapers drive installs),
 *   3. is bypassed entirely when the app is installed — Android App Links open
 *      the app straight to that wallpaper (see web/README.md).
 *
 * Written as a Cloudflare Worker. For Vercel/Netlify Edge the handler body is
 * the same — export a `default { fetch }` or a `GET` function respectively.
 *
 * Required env vars (Worker → Settings → Variables):
 *   SUPABASE_URL       e.g. https://zpfrguxtkahnzmntywln.supabase.co
 *   SUPABASE_ANON_KEY  the public anon key (read-only, safe to ship)
 */

const APP_NAME = 'Themeplix';
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.themeplix.wallpapers';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').filter(Boolean).pop() || '';

    let wp = null;
    if (id) {
      try {
        const res = await fetch(
          `${env.SUPABASE_URL}/rest/v1/wallpapers` +
            `?id=eq.${encodeURIComponent(id)}` +
            `&is_active=eq.true&limit=1` +
            `&select=id,thumb_url,full_url,category_slug`,
          {
            headers: {
              apikey: env.SUPABASE_ANON_KEY,
              authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
            },
          }
        );
        const rows = await res.json();
        wp = Array.isArray(rows) ? rows[0] ?? null : null;
      } catch {
        /* fall through to the generic page */
      }
    }

    const referrer = id ? `&referrer=${encodeURIComponent('w_' + id)}` : '';
    const play = PLAY_URL + referrer;

    // JPEG, not the webp thumb — link crawlers handle JPEG far more reliably.
    const image = wp?.full_url || `${url.origin}/og-default.jpg`;
    const title = wp
      ? `${titleCase(wp.category_slug)} wallpaper · ${APP_NAME}`
      : `${APP_NAME} — free wallpapers`;
    const desc = `Tap to get this wallpaper free in the ${APP_NAME} app.`;

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="canonical" href="${esc(url.href)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${APP_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:url" content="${esc(url.href)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(image)}">
<meta http-equiv="refresh" content="1;url=${esc(play)}">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #08080C; color: #F6F4F1; min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 22px; padding: 28px 22px;
  }
  img.wp {
    width: min(74vw, 280px); aspect-ratio: 9 / 16; object-fit: cover;
    border-radius: 22px; border: 1px solid rgba(255,255,255,0.1);
  }
  h1 { font-size: 18px; font-weight: 800; letter-spacing: -0.3px; text-align: center; }
  a.btn {
    background: linear-gradient(135deg, #FF9A2E, #FF3D8A);
    color: #fff; text-decoration: none; font-weight: 700; font-size: 15px;
    padding: 14px 28px; border-radius: 999px;
  }
  p { color: rgba(246,244,241,0.5); font-size: 12px; text-align: center; }
</style>
</head>
<body>
  ${wp ? `<img class="wp" src="${esc(wp.thumb_url)}" alt="">` : ''}
  <h1>Get this wallpaper in ${APP_NAME}</h1>
  <a class="btn" href="${esc(play)}">Get it on Google Play</a>
  <p>Taking you to the Play Store…</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300',
      },
    });
  },
};

function titleCase(s) {
  return (s || 'Wallpaper').replace(/(^|[-\s])(\w)/g, (_, sep, ch) => sep + ch.toUpperCase());
}

function esc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
