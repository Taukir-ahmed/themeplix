import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Spinner from '../components/Spinner';
import StateView from '../components/StateView';
import { useAsync } from '../hooks/useAsync';
import { fetchCategories } from '../lib/wallpapers';
import { count } from '../lib/plural';

export default function Categories() {
  const cats = useAsync(() => fetchCategories(), []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Seo
        title="Wallpaper collections"
        description="Browse Themeplix wallpapers by collection — abstract, nature, minimal, and more."
        path="/categories"
      />

      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Explore</span>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Collections
        </h1>
      </header>

      {cats.loading ? (
        <Spinner />
      ) : !cats.data || cats.data.length === 0 ? (
        <StateView title="No collections yet" />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cats.data.map((c) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-base font-bold text-white">{c.name}</p>
                <p className="text-xs text-white/60">{count(c.count, 'wallpaper')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
