import Seo from '../components/Seo';
import Spinner from '../components/Spinner';
import StateView from '../components/StateView';
import WallpaperGrid from '../components/WallpaperGrid';
import CategoryChips from '../components/CategoryChips';
import InfiniteSentinel from '../components/InfiniteSentinel';
import { useAsync } from '../hooks/useAsync';
import { useWallpaperFeed } from '../hooks/useWallpaperFeed';
import { fetchCategories } from '../lib/wallpapers';

export default function Explore() {
  const cats = useAsync(() => fetchCategories(), []);
  const feed = useWallpaperFeed();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Seo
        title="Explore wallpapers"
        description="The full Themeplix gallery — hundreds of AI-crafted phone wallpapers, free to browse."
        path="/explore"
      />

      <header className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Explore</span>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Every wallpaper
        </h1>
      </header>

      {cats.data && <CategoryChips categories={cats.data} />}

      <div className="mt-8">
        {feed.error && feed.items.length === 0 ? (
          <StateView
            title="Could not load wallpapers"
            body="The gallery service did not respond. Try again in a moment."
          />
        ) : feed.isEmpty ? (
          <StateView title="Nothing here yet" body="Wallpapers are on the way." />
        ) : (
          <>
            <WallpaperGrid items={feed.items} />
            {feed.loading && <Spinner />}
            <InfiniteSentinel onHit={feed.loadMore} disabled={feed.loading || !feed.hasMore} />
            {!feed.hasMore && feed.items.length > 0 && (
              <p className="py-10 text-center text-sm text-faint">That is all of them.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
