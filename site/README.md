# themeplix.app — website

Public wallpaper gallery + landing page for Themeplix. Vite + React + Tailwind v4,
talking to the same Supabase project as the phone app with the **anon key only**.

Not to be confused with `web/w-share.worker.js` (the shareable `/w/<id>` link
preview) — that is a separate Cloudflare Worker.

## Run locally

```bash
cd web/site
cp .env.example .env      # fill in VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
npm install
npm run dev               # http://localhost:5190
```

`npm run build` → `dist/` · `npm run lint` · `npm run typecheck`

## What it does

| Route | |
|---|---|
| `/` | Landing: hero, trending, collections, fresh drops, app CTA, Pro plans |
| `/explore` | Full gallery, category filter, infinite scroll |
| `/categories`, `/category/:slug` | Collections |
| `/w/:id` | Wallpaper detail + download. `/wallpaper/:id` redirects here (matches the app's App Link path) |
| `/pro` | Pro plans + FAQ (no billing — points to the app) |
| `/privacy` | Mirror of `app/privacy.tsx`. **Keep the two in sync.** |
| `/delete-data` | Data-deletion page required by the Play listing |

## Download policy (the important bit)

The site **never loads the full-resolution file**. Grids, hero and the detail
preview all use the ~400px WebP thumbnail. The "Download web preview" button
re-encodes *that thumbnail* in-browser to a small, watermarked JPEG
(~15–40 kB, ~290–500px). Anyone who wants the clean 1080×1920 file is sent to
the app.

Tune in `src/lib/config.ts` → `WEB_DOWNLOAD`:

- `maxEdge` — hard cap on the longest edge (default 512)
- `quality` — JPEG quality (default 0.7)
- `watermark` — faint `themeplix.app` stamp, bottom-right (default `true`; set
  `false` to remove)

The "Download full resolution (app)" button and every premium tap open the
**Get the app** modal (`src/components/GetAppModal.tsx`) with a Play link and a
QR code.

## Deploy — Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
   (or `npx wrangler pages deploy dist` for a direct upload).
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `web/site` (if the repo root is the Expo app)
3. Environment variables (Production **and** Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. `public/_redirects` (`/* /index.html 200`) ships in the build, so client-side
   routes resolve on refresh. Nothing else to configure.
5. Add the custom domain `themeplix.app` in the Pages project once Cloudflare
   shows the zone as active.

### Coexisting with the /w/ worker

`web/w-share.worker.js` should own `themeplix.app/w/*` so shared links get real
OG tags. Add that route to the Worker; Pages serves everything else. The site's
own `/w/:id` route still works for in-site navigation — the Worker only
intercepts the initial request from a link crawler / cold load.

## After deploy

- Put the live URL into the Play Console listing + BillDesk verification.
- Set `SHARE_LANDING_LIVE = true` in `constants/app.ts` once the worker is up.
- Replace `public/og-default.jpg` (referenced by `index.html`; not committed yet).
- Swap `public/favicon.svg` for real branding if desired.
