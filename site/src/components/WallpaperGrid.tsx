import type { Wallpaper } from '../lib/types';
import WallpaperCard from './WallpaperCard';

/** CSS-columns masonry. Cheap, no layout library, good enough up to a few
 *  hundred cards — past that the Explore page paginates. */
export default function WallpaperGrid({
  items,
  ranked = false,
}: {
  items: Wallpaper[];
  ranked?: boolean;
}) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:break-inside-avoid">
      {items.map((wp, i) => (
        <WallpaperCard key={wp.id} wp={wp} rank={ranked ? i + 1 : undefined} />
      ))}
    </div>
  );
}
