import { NavLink } from 'react-router-dom';
import type { Category } from '../lib/types';
import { cn } from '../lib/cn';

export default function CategoryChips({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <NavLink
        to="/explore"
        end
        className={cn(
          'rounded-full border px-4 py-1.5 text-sm font-medium transition',
          !activeSlug
            ? 'border-transparent bg-text text-bg'
            : 'border-line text-muted hover:border-line-strong hover:text-text'
        )}
      >
        All
      </NavLink>
      {categories.map((c) => (
        <NavLink
          key={c.slug}
          to={`/category/${c.slug}`}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition',
            activeSlug === c.slug
              ? 'border-transparent bg-text text-bg'
              : 'border-line text-muted hover:border-line-strong hover:text-text'
          )}
        >
          {c.name}
        </NavLink>
      ))}
    </div>
  );
}
