import { supabase } from './supabase';
import type { Category, Page, Wallpaper } from './types';

/**
 * Web data layer. Deliberately mirrors services/wallpapers.supabase.ts in the
 * phone app so both read the catalogue the same way — same ordering, same
 * "hide empty categories" rule, same trending logic.
 */

export const PAGE_SIZE = 24;

type WallpaperRow = {
  id: string;
  title: string;
  thumb_url: string;
  full_url: string;
  category_slug: string;
  aspect_ratio: number | null;
  premium: boolean | null;
  downloads: number | null;
  downloads_seed: number | null;
  downloads_label: string | null;
};

type CategoryRow = {
  slug: string;
  name: string;
  cover_url: string | null;
  count: number | null;
};

function toWallpaper(row: WallpaperRow): Wallpaper {
  return {
    id: row.id,
    title: row.title,
    thumbUrl: row.thumb_url,
    fullUrl: row.full_url,
    categorySlug: row.category_slug,
    aspectRatio: Number(row.aspect_ratio) || 1.777,
    premium: row.premium ?? false,
    downloads: row.downloads ?? 0,
    downloadsSeed: row.downloads_seed ?? 0,
    downloadsLabel: row.downloads_label ?? null,
  };
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('category_stats')
    .select('slug, name, cover_url, count')
    .order('priority', { ascending: false })
    .order('name', { ascending: true });

  if (error || !data) throw error ?? new Error('No categories');

  return (data as CategoryRow[])
    .filter((row) => (row.count ?? 0) > 0)
    .map((row) => ({
      slug: row.slug,
      name: row.name,
      count: row.count ?? 0,
      coverUrl: row.cover_url ?? '',
    }));
}

export async function fetchWallpapers(options: {
  categorySlug?: string;
  page?: number;
  pageSize?: number;
} = {}): Promise<Page<Wallpaper>> {
  const { categorySlug, page = 0, pageSize = PAGE_SIZE } = options;
  const from = page * pageSize;

  let query = supabase
    .from('wallpapers')
    .select(
      'id,title,thumb_url,full_url,category_slug,aspect_ratio,premium,downloads,downloads_seed,downloads_label'
    )
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, from + pageSize - 1);

  if (categorySlug) query = query.eq('category_slug', categorySlug);

  const { data, error } = await query;
  if (error || !data) throw error ?? new Error('No wallpapers');

  const items = (data as WallpaperRow[]).map(toWallpaper);
  return { items, page, hasMore: items.length === pageSize };
}

export async function fetchTrending(limit = 12): Promise<Wallpaper[]> {
  const { data: pinnedData, error: pinnedError } = await supabase
    .from('wallpapers')
    .select(
      'id,title,thumb_url,full_url,category_slug,aspect_ratio,premium,downloads,downloads_seed,downloads_label,trending_priority'
    )
    .eq('is_active', true)
    .not('trending_priority', 'is', null)
    .order('trending_priority', { ascending: true })
    .limit(limit);

  if (pinnedError) throw pinnedError;
  const pinned = (pinnedData as WallpaperRow[]).map(toWallpaper);
  if (pinned.length >= limit) return pinned.slice(0, limit);

  const remaining = limit - pinned.length;
  const { data, error } = await supabase
    .from('wallpapers')
    .select(
      'id,title,thumb_url,full_url,category_slug,aspect_ratio,premium,downloads,downloads_seed,downloads_label'
    )
    .eq('is_active', true)
    .order('downloads', { ascending: false })
    .limit(remaining * 4 + pinned.length);

  if (error || !data) throw error ?? new Error('No trending');

  const pinnedIds = new Set(pinned.map((w) => w.id));
  const rest = (data as WallpaperRow[]).map(toWallpaper).filter((w) => !pinnedIds.has(w.id));
  const ranked = rest.some((w) => w.downloads > 0) ? rest : shuffle(rest);

  return [...pinned, ...ranked.slice(0, remaining)];
}

export async function fetchHero(limit = 6): Promise<Wallpaper[]> {
  const { data: pinnedData, error: pinnedError } = await supabase
    .from('wallpapers')
    .select(
      'id,title,thumb_url,full_url,category_slug,aspect_ratio,premium,downloads,downloads_seed,downloads_label,hero_rank'
    )
    .eq('is_active', true)
    .not('hero_rank', 'is', null)
    .order('hero_rank', { ascending: true })
    .limit(limit);

  if (pinnedError) throw pinnedError;
  const pinned = (pinnedData as WallpaperRow[]).map(toWallpaper);
  if (pinned.length > 0) return pinned;

  const { data, error } = await supabase
    .from('wallpapers')
    .select(
      'id,title,thumb_url,full_url,category_slug,aspect_ratio,premium,downloads,downloads_seed,downloads_label'
    )
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error || !data) throw error ?? new Error('No hero');
  return (data as WallpaperRow[]).map(toWallpaper);
}

export async function fetchWallpaperById(id: string): Promise<Wallpaper | null> {
  const { data, error } = await supabase
    .from('wallpapers')
    .select(
      'id,title,thumb_url,full_url,category_slug,aspect_ratio,premium,downloads,downloads_seed,downloads_label'
    )
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) return null;
  return toWallpaper(data as WallpaperRow);
}

/** Fire-and-forget: bumps the counter Trending ranks on. Web downloads count too. */
export async function recordDownload(id: string): Promise<void> {
  const { error } = await supabase.rpc('increment_downloads', { wallpaper_id: id });
  if (error) console.warn('[recordDownload]', error.message);
}

export function displayCount(
  w: Pick<Wallpaper, 'downloads' | 'downloadsSeed' | 'downloadsLabel'>
): string {
  if (w.downloadsLabel && w.downloadsLabel.trim()) return w.downloadsLabel.trim();
  // Seed (a head start set at upload) + real downloads. Grows with every download.
  const n = (w.downloadsSeed ?? 0) + w.downloads;
  if (n <= 0) return 'New';
  if (n >= 1000) {
    const k = Math.floor(n / 100) / 10;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}K+`;
  }
  return String(n);
}
