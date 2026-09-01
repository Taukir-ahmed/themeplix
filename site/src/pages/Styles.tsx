import Seo from '../components/Seo';
import Spinner from '../components/Spinner';
import StateView from '../components/StateView';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import { useAsync } from '../hooks/useAsync';
import { fetchProducts, recordAffiliateClick } from '../lib/affiliate';

/**
 * /styles — a grid of tappable product images. Landing page for the Instagram
 * bio link and post/story links. Every image opens its affiliate link in a new
 * tab; price and details live on the store.
 */
export default function Styles() {
  const products = useAsync(() => fetchProducts(), []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Seo
        title="Shop"
        description="Shop the products we feature on Instagram — tap any item to buy."
        path="/styles"
      />

      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Shop</span>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Shop our picks
        </h1>
        <p className="mt-2 text-sm text-muted">
          Tap any item to shop it — prices are shown on the store.
        </p>
      </header>

      {products.loading ? (
        <Spinner />
      ) : products.error ? (
        <StateView title="Could not load" body="Try again in a moment." />
      ) : !products.data || products.data.length === 0 ? (
        <StateView title="Nothing here yet" body="Picks are on the way." />
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {products.data.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              onClick={() => recordAffiliateClick(p.id)}
              aria-label="Shop this item"
              className="group block aspect-square overflow-hidden rounded-xl border border-line bg-surface-2 transition hover:border-line-strong active:scale-[0.98]"
            >
              <img
                src={p.imageUrl}
                alt="Shop this item"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      )}

      <AffiliateDisclosure className="mt-10" />
    </div>
  );
}
