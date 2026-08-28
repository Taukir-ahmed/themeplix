import { useEffect } from 'react';
import { SITE_URL } from '../lib/config';

interface Props {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

/** Upsert <meta {key}="{id}" content="{value}">. */
function meta(key: 'name' | 'property', id: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${id}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, id);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Lightweight per-route document head — no helmet dependency. */
export default function Seo({ title, description, image, path }: Props) {
  useEffect(() => {
    const full = title.includes('Themeplix') ? title : `${title} · Themeplix`;
    document.title = full;
    const url = SITE_URL + (path ?? window.location.pathname);
    const img = image ?? `${SITE_URL}/og-default.jpg`;

    if (description) {
      meta('name', 'description', description);
      meta('property', 'og:description', description);
      meta('name', 'twitter:description', description);
    }
    meta('property', 'og:title', full);
    meta('name', 'twitter:title', full);
    meta('property', 'og:url', url);
    meta('property', 'og:image', img);
    meta('name', 'twitter:image', img);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, image, path]);

  return null;
}
