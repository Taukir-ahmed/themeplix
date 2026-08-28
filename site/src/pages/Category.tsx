import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Spinner from '../components/Spinner';
import StateView from '../components/StateView';
import WallpaperGrid from '../components/WallpaperGrid';
import CategoryChips from '../components/CategoryChips';
import InfiniteSentinel from '../components/InfiniteSentinel';
import { useAsync } from '../hooks/useAsync';
import { useWallpaperFeed } from '../hooks/useWallpaperFeed';
import { fetchCategories } from '../lib/wallpapers';
import { count } from '../lib/plural';

export default function Category() {
  const { slug = '' } = useParams();
  const cats = useAsync(() => fetchCategories(), []);
  const feed = useWallpaperFeed(slug);
  const current = cats.data?.find((c) => c.slug === slug);
  const name = current?.name ?? slug.replace(/-/g, ' ');

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Seo
        title={`${name} wallpapers`}
        description={`${name} phone wallpapers from Themeplix — free to browse, full resolution in the app.`}
        path={`/category/${slug}`}
      />

      <header className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Collection</span>
        <h1 className="mt-1 font-display text-3xl font-bold capitalize tracking-tight sm:text-4xl">
          {name}
        </h1>
        {current && <p className="mt-1 text-sm text-muted">{count(current.count, 'wallpaper')}</p>}
      </header>

      {cats.data && <CategoryChips categories={cats.data} activeSlug={slug} />}

      <div className="mt-8">
        {feed.error && feed.items.length === 0 ? (
          <StateView title="Could not load this collection" body="Try again in a moment." />
        ) : feed.isEmpty ? (
          <StateView
            title="This collection is empty"
            body="Nothing has been added here yet."
            action={
              <Link to="/explore" className="text-sm font-medium text-accent">
                Browse everything instead →
              </Link>
            }
          />
        ) : (
          <>
            <WallpaperGrid items={feed.items} />
            {feed.loading && <Spinner />}
            <InfiniteSentinel onHit={feed.loadMore} disabled={feed.loading || !feed.hasMore} />
            {!feed.hasMore && feed.items.length > 0 && (
              <p className="py-10 text-center text-sm text-faint">End of {name}.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
