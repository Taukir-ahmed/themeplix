# Themeplix — web

- **`site/`** — the public website (`themeplix.app`): wallpaper gallery, landing
  page, Pro info, privacy + data-deletion pages. Vite + React + Tailwind. See
  `site/README.md`. Deploys to Cloudflare **Pages**.
- **`w-share.worker.js`** — this file. A Cloudflare **Worker** that owns
  `themeplix.app/w/*` only, so shared wallpaper links get real link-preview
  tags. Everything below is about the worker.

---

One job: serve `https://themeplix.app/w/<id>` so that shared wallpapers show a
real preview and route people to the Play Store (or straight into the app if
it's installed).

```
Friend taps share in the app
      │
      ▼
"✨ Found this on Themeplix\nhttps://themeplix.app/w/ab12cd"   ← app: constants/app.ts
      │
      ├─ pasted in WhatsApp/Telegram/FB  → crawler reads OG tags → shows wallpaper thumb
      │
      └─ recipient taps the link
             ├─ app installed  → Android App Link opens app at that wallpaper (app/w/[id].tsx)
             └─ not installed  → w-share.worker.js page → Play Store (?referrer=w_<id>)
```

## 1. Deploy the page — `w-share.worker.js`

It's a Cloudflare Worker. (Vercel / Netlify Edge work too — same handler body.)

1. Cloudflare dashboard → Workers & Pages → **Create Worker**, paste
   `w-share.worker.js`.
2. Settings → **Variables**:
   - `SUPABASE_URL` = `https://zpfrguxtkahnzmntywln.supabase.co`
   - `SUPABASE_ANON_KEY` = the public anon key from `.env`
     (`EXPO_PUBLIC_SUPABASE_ANON_KEY`) — read-only, safe to expose.
3. Add the domain `themeplix.app` to Cloudflare (change nameservers at your
   registrar), then Worker → **Triggers → Routes**: `themeplix.app/w/*`.
4. (Optional) put a `1200×630` JPEG at `themeplix.app/og-default.jpg` for the
   fallback preview when an id is missing/unknown.

Test: open `https://themeplix.app/w/<any-real-wallpaper-id>` — you should see
the wallpaper and get bounced to Play. Check the preview with
<https://www.opengraph.xyz> or by pasting into a Telegram "Saved Messages".

## 2. Deep linking — open the app instead of the browser

So an installed app intercepts `https://themeplix.app/w/*`:

- **App side** is done: `app.json` has the `intentFilters` block and
  `app/w/[id].tsx` forwards to the wallpaper screen.
- **Domain side**: host Google's digital-asset link at
  **`https://themeplix.app/.well-known/assetlinks.json`**:

  ```json
  [{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.themeplix.wallpapers",
      "sha256_cert_fingerprints": ["<SHA-256 of your signing cert>"]
    }
  }]
  ```

  Get the fingerprint from **Play Console → your app → Test and release → App
  integrity → App signing** (use the *App signing key* SHA-256, and add the
  *upload key* one too while testing). Or `eas credentials` → Android.

  On Cloudflare, add a second Worker route or a Pages `_redirects` / static
  file that returns this JSON at that exact path with
  `content-type: application/json`.

- Rebuild the app after the `app.json` change; Android verifies the link on
  install. `adb shell pm get-app-links com.themeplix.wallpapers` shows the
  verification status.

## 3. Measuring it

The Play Store link carries `?referrer=w_<id>`. Read it via the **Play Install
Referrer API**, or just watch Play Console → Acquisition → *Google Play organic*
vs *third-party referrers* for the lift once share is live.
