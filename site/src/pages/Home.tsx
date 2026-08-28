import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import AppCTA from '../components/AppCTA';
import ProPlans from '../components/ProPlans';
import WallpaperGrid from '../components/WallpaperGrid';
import Spinner from '../components/Spinner';
import { useAsync } from '../hooks/useAsync';
import { fetchCategories, fetchHero, fetchTrending, fetchWallpapers } from '../lib/wallpapers';
import { count } from '../lib/plural';

export default function Home() {
  const hero = useAsync(() => fetchHero(5), []);
  const trending = useAsync(() => fetchTrending(9), []);
  const fresh = useAsync(() => fetchWallpapers({ page: 0, pageSize: 12 }), []);
  const cats = useAsync(() => fetchCategories(), []);

  return (
    <>
      <Seo
        title="Themeplix — Free AI wallpapers for your phone"
        description="Hand-curated, AI-crafted wallpapers for modern phone screens. Browse free on the web, or get the app for full-resolution downloads."
        path="/"
      />

      <Hero showcase={hero.data ?? fresh.data?.items ?? []} />

      {/* Trending */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Trending now
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Most downloaded this week
            </h2>
          </div>
          <Link to="/explore" className="shrink-0 text-sm font-medium text-muted hover:text-text">
            See all →
          </Link>
        </div>
        {trending.loading ? (
          <Spinner />
        ) : (
          <WallpaperGrid items={trending.data ?? []} ranked />
        )}
      </section>

      {/* Categories */}
      {(cats.data?.length ?? 0) > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Browse by collection
            </h2>
            <Link to="/categories" className="shrink-0 text-sm font-medium text-muted hover:text-text">
              All collections →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {cats.data!.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line"
              >
                {c.coverUrl && (
                  <img
                    src={c.coverUrl}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="font-display text-sm font-bold text-white">{c.name}</p>
                  <p className="text-[11px] text-white/60">{count(c.count, 'wallpaper')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Fresh drops */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Fresh drops
        </h2>
        {fresh.loading ? <Spinner /> : <WallpaperGrid items={fresh.data?.items ?? []} />}
      </section>

      <AppCTA />
      <ProPlans compact />
    </>
  );
}
