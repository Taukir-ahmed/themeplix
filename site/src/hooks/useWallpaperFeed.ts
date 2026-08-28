import { useCallback, useEffect, useRef, useState } from 'react';
import type { Wallpaper } from '../lib/types';
import { fetchWallpapers } from '../lib/wallpapers';

/** Paginated wallpaper feed with a "load more" that an IntersectionObserver
 *  can drive. Resets when `categorySlug` changes. */
export function useWallpaperFeed(categorySlug?: string) {
  const [items, setItems] = useState<Wallpaper[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const loadingRef = useRef(false);

  const load = useCallback(
    async (nextPage: number, replace: boolean) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setLoading(true);
      try {
        const res = await fetchWallpapers({ categorySlug, page: nextPage });
        setItems((prev) => (replace ? res.items : [...prev, ...res.items]));
        setPage(nextPage);
        setHasMore(res.hasMore);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    },
    [categorySlug]
  );

  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    load(0, true);
  }, [load]);

  const loadMore = useCallback(() => {
    if (!loadingRef.current && hasMore) load(page + 1, false);
  }, [hasMore, page, load]);

  return { items, loading, error, hasMore, loadMore, isEmpty: !loading && items.length === 0 };
}
