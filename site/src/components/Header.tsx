import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/cn';
import { playUrl } from '../lib/config';
import Wordmark from './Wordmark';

const LINKS = [
  { to: '/explore', label: 'Explore' },
  { to: '/categories', label: 'Categories' },
  { to: '/pro', label: 'Pro' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Wordmark />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition',
                  isActive ? 'text-text' : 'text-muted hover:text-text'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={playUrl('web_header')}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-brand-gradient px-4 py-2 font-display text-sm font-bold text-white transition hover:brightness-105 sm:block"
          >
            Get the app
          </a>
          <button
            aria-label="Menu"
            onClick={() => setMenu((m) => !m)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-text md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-line bg-bg px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenu(false)}
              className="block rounded-lg px-2 py-2.5 text-sm font-medium text-muted"
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={playUrl('web_header')}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block rounded-full bg-brand-gradient px-4 py-2.5 text-center font-display text-sm font-bold text-white"
          >
            Get it on Google Play
          </a>
        </div>
      )}
    </header>
  );
}
