import { Link } from 'react-router-dom';
import { useAppConfig } from '../hooks/useAppConfig';
import { SUPPORT_EMAIL, playUrl } from '../lib/config';
import Wordmark from './Wordmark';

export default function Footer() {
  const { instagram_url } = useAppConfig();

  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Hand-curated, AI-crafted wallpapers for modern phone screens.
              Inspired, not copied.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <Link to="/explore" className="text-muted hover:text-text">Explore</Link>
            <Link to="/categories" className="text-muted hover:text-text">Categories</Link>
            <Link to="/pro" className="text-muted hover:text-text">Themeplix Pro</Link>
            <a href={instagram_url} target="_blank" rel="noreferrer" className="text-muted hover:text-text">
              Instagram
            </a>
            <Link to="/privacy" className="text-muted hover:text-text">Privacy</Link>
            <Link to="/terms" className="text-muted hover:text-text">Terms</Link>
            <Link to="/refund" className="text-muted hover:text-text">Refunds</Link>
            <Link to="/delete-data" className="text-muted hover:text-text">Delete my data</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted hover:text-text">Support</a>
            <a href={playUrl('web_footer')} target="_blank" rel="noreferrer" className="text-muted hover:text-text">
              Google Play
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Themeplix. All wallpapers are original AI compositions.</p>
          <p>{SUPPORT_EMAIL}</p>
        </div>
      </div>
    </footer>
  );
}
